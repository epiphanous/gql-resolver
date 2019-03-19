import { CharStream, TokenStream } from 'antlr4ts';
import { Failure, None, Option, Some, Success, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { pickBy } from 'lodash';
import { QueryModificationLexer } from '../../antlr4/generated/QueryModificationLexer';
import * as QMP from '../../antlr4/generated/QueryModificationParser';
import {
  ComparisonPredicateContext,
  InVarPredicateContext,
  ParenPredicateContext,
  QueryModificationParser,
} from '../../antlr4/generated/QueryModificationParser';
import { ID_KEY, SUBJECT_BINDING } from '../../models/Constants';
import * as QME from '../../models/GQLObjectQueryModifierExpression';
import {
  GQLObjectQueryModifierConjunction,
  GQLObjectQueryModifierExpression,
  GQLObjectQueryModifierPrimitiveExpression,
} from '../../models/GQLObjectQueryModifierExpression';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import BuilderBase from '../BuilderBase';

/* tslint:disable */
export default abstract class GQLObjectQueryModifierBuilder extends BuilderBase<
  any
> {
  public result: any;
  public PREFIXED_IRI_PATTERN: string;
  public rPREFIXED_IRI_PATTERN: RegExp;
  public validFields: Map<string, string>;
  public validVariables: Set<GQLVariableDefinition>;
  public vars: Map<any, string>;
  public source: string;

  constructor(
    validFields: Map<string, string>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<any, string>,
    prefixes: Set<string>,
    source: string
  ) {
    super();
    this.validFields = validFields;
    this.validVariables = validVariables;
    this.vars = vars;
    this.source = source;
    this.PREFIXED_IRI_PATTERN = `(${prefixes.join('|')})_(.*)`;
    this.rPREFIXED_IRI_PATTERN = new RegExp(this.PREFIXED_IRI_PATTERN);
  }

  public parser(tokenStream: TokenStream) {
    return new QMP.QueryModificationParser(tokenStream);
  }

  public lexer(input: CharStream) {
    return new QueryModificationLexer(input);
  }

  public parseWith(parser: QueryModificationParser) {
    return null;
  }

  public build(parser: QueryModificationParser) {
    const tryParse = Try.of(this.parseWith(parser));

    if (tryParse.isSuccess()) {
      if (this.errorReport.hasErrors) {
        return Failure(this.errorReport.asThrowable());
      } else {
        if (this.errorReport.hasWarnings) {
          this.errorReport.warnings.forEach(warn => console.warn(warn));
        }
        return Success(this.result);
      }
    }
  }

  public simplifyConjunction(
    conjunction: QME.GQLObjectQueryModifierConjunction
  ): QME.GQLObjectQueryModifierConjunction {
    const newConjunctives = conjunction.conjunctives.flatMap(conjunctive => {
      if (!conjunctive.hasNot) {
        let disjunctionOpt: Option<QME.GQLObjectQueryModifierDisjunction> =
          conjunctive.expr.expr;
        if (
          conjunctive.expr instanceof QME.GQLObjectQueryModifierParensExpression
        ) {
          if (
            conjunctive.expr.expr.expr instanceof
            QME.GQLObjectQueryModifierDisjunction
          ) {
            disjunctionOpt = Some(conjunctive.expr.expr.expr);
          } else {
            disjunctionOpt = None;
          }
        } else if (
          conjunctive.expr.expr instanceof QME.GQLObjectQueryModifierDisjunction
        ) {
          disjunctionOpt = Some(conjunctive.expr.expr);
        } else {
          disjunctionOpt = None;
        }
        if (disjunctionOpt.nonEmpty()) {
          const disjunction = this.simplifyDisjunction(disjunctionOpt.value);
          if (
            disjunction.disjunctives.size === 1 &&
            disjunction.values.isEmpty()
          ) {
            return disjunction.disjunctives.get(0).conjunctives;
          } else {
            return List([conjunctive]);
          }
        } else {
          return List([conjunctive]);
        }
      } else {
        return List([conjunctive]);
      }
    });
    return new GQLObjectQueryModifierConjunction(newConjunctives);
  }

  public simplifyDisjunction(
    disjunction: QME.GQLObjectQueryModifierDisjunction
  ): QME.GQLObjectQueryModifierDisjunction {
    if (disjunction.values.isEmpty()) {
      const newDisjunctives: List<
        GQLObjectQueryModifierConjunction
      > = disjunction.disjunctives
        .map(a => this.simplifyConjunction(a))
        .flatMap(disjunctive => {
          const conjunction = disjunctive;
          if (
            conjunction.conjunctives.size === 1 &&
            !!conjunction.conjunctives.get(0)
          ) {
            let disjunctionOpt: Option<any>;
            if (
              conjunction.conjunctives.get(0).expr.expr instanceof
              QME.GQLObjectQueryModifierParensExpression
            ) {
              if (
                conjunction.conjunctives.get(0).expr.expr.expr instanceof
                QME.GQLObjectQueryModifierDisjunction
              ) {
                disjunctionOpt = Some(
                  conjunction.conjunctives.get(0).expr.expr.expr
                );
              } else {
                disjunctionOpt = None;
              }
            } else if (
              conjunction.conjunctives.get(0).expr.expr instanceof
              QME.GQLObjectQueryModifierDisjunction
            ) {
              disjunctionOpt = Some(conjunction.conjunctives.get(0).expr.expr);
            } else {
              return None;
            }
            if (!disjunctionOpt.isEmpty()) {
              return disjunctionOpt.get().disjunctives;
            } else {
              return List<GQLObjectQueryModifierConjunction>([disjunctive]);
            }
          } else {
            return List<GQLObjectQueryModifierConjunction>([disjunctive]);
          }
        });
      return new QME.GQLObjectQueryModifierDisjunction(newDisjunctives, List());
    } else {
      return disjunction;
    }
  }

  public processSearchCondition(
    context: QMP.SearchConditionContext,
    isRoot: boolean = false
  ): QME.GQLObjectQueryModifierDisjunction {
    const basicDisjunction = this.simplifyDisjunction(
      new QME.GQLObjectQueryModifierDisjunction(
        List(context.searchConditionAnd()).map(a =>
          this.processSearchConditionAnd(a)
        ),
        List().clear()
      )
    );

    const getValidEqualityTermsInconjunction = (
      con: QME.GQLObjectQueryModifierConjunction
    ): Map<
      QME.GQLObjectQueryModifierField,
      QME.GQLObjectQueryModifierPrimitiveExpression
    > => {
      return Map(
        con.conjunctives
          .filterNot((a: any) => a.hasNot())
          .map(a => a.expr.expr)
          .flatMap(a =>
            a instanceof QME.GQLObjectQueryBasicComparisonPredicate
              ? List.of(a)
              : List()
          )
          .flatMap((b: any) => {
            if (b.op === '=') {
              if (
                b.lhs instanceof QME.GQLObjectQueryModifierField &&
                b.rhs instanceof
                  QME.GQLObjectQueryModifierPrimitiveExpression &&
                !(b.rhs instanceof QME.GQLObjectQueryModifierField)
              ) {
                if (!(b.rhs instanceof QME.GQLObjectQueryModifierField)) {
                  return List().set(0, [b.lhs, b.rhs]);
                }
              } else if (
                b.lhs instanceof
                  QME.GQLObjectQueryModifierPrimitiveExpression &&
                b.rhs instanceof QME.GQLObjectQueryModifierField
              ) {
                if (!(b.rhs instanceof QME.GQLObjectQueryModifierField)) {
                  return List().set(0, [b.lhs, b.rhs]);
                }
              } else {
                return List();
              }
            }
          })
      );
    };

    if (isRoot) {
      const terms: List<QME.GQLObjectQueryModifierConjunction> =
        basicDisjunction.disjunctives;
      const fieldsInEachconjunction: () => Set<string> = () => {
        if (terms.isEmpty()) {
          return Set();
        } else {
          const fieldsInHead = Set(
            List(getValidEqualityTermsInconjunction(terms.first()).keys()).map(
              a => a.expression
            )
          );
          terms.slice(1).reduce((acc, current) => {
            if (
              acc instanceof Set &&
              current instanceof QME.GQLObjectQueryModifierConjunction
            ) {
              return acc.intersect(
                List(getValidEqualityTermsInconjunction(current).keys())
                  .map(a => a.expression)
                  .toSet()
              );
            }
          }, fieldsInHead);
        }
      };

      const values: () => List<
        Map<
          QME.GQLObjectQueryModifierField,
          QME.GQLObjectQueryModifierPrimitiveExpression
        >
      > = () => {
        if (!fieldsInEachconjunction().isEmpty()) {
          return terms.map(x =>
            pickBy(getValidEqualityTermsInconjunction(x), (val, key) =>
              fieldsInEachconjunction().contains(key)
            )
          );
        } else {
          return List();
        }
      };

      const valuesIsComplete = () =>
        terms
          .map((x: GQLObjectQueryModifierConjunction) => x.conjunctives.size)
          .every(r => r === fieldsInEachconjunction().size);

      const finalTerms = () => (valuesIsComplete() ? List() : terms);

      return new QME.GQLObjectQueryModifierDisjunction(finalTerms(), values());
    } else {
      return basicDisjunction;
    }
  }

  public processSearchConditionAnd(
    context: QMP.SearchConditionAndContext
  ): QME.GQLObjectQueryModifierConjunction {
    return this.simplifyConjunction(
      new QME.GQLObjectQueryModifierConjunction(
        List(context.searchConditionNot()).map(x =>
          this.processSearchConditionNot(x)
        )
      )
    );
  }

  public processSearchConditionNot(
    context: QMP.SearchConditionNotContext
  ): QME.GQLObjectQueryModifierOptionalNegation {
    const predicate = this.processPredicate(context.predicate());
    return new QME.GQLObjectQueryModifierOptionalNegation(
      Option.of(context.NOT()).nonEmpty(),
      predicate
    );
  }

  public processPredicate(
    context: QMP.PredicateContext
  ): QME.GQLObjectQueryModifierPredicate {
    let predicate;

    switch (context.constructor.name) {
      case 'ComparisonPredicateContext':
        predicate = this.processComparisonPredicate(
          context as ComparisonPredicateContext
        );
        break;
      case 'InPredicateContext':
        predicate = this.processInPredicate(context as InVarPredicateContext);
        break;
      case 'InVarPredicateContext':
        predicate = this.processInVarPredicate(
          context as InVarPredicateContext
        );
        break;
      case 'ParenPredicateContext':
        predicate = this.processParenPredicate(
          context as ParenPredicateContext
        );
        break;
    }
    return new QME.GQLObjectQueryModifierPredicate(predicate);
  }

  public processComparisonPredicate(
    context: QMP.ComparisonPredicateContext
  ): QME.GQLObjectQueryModifierExpression {
    const lhs = this.processExpression(context.expression(0));
    const rhs = this.processExpression(context.expression(1));
    const op = context.comparisonOp().text;

    List([
      GQLObjectQueryModifierBuilderTypes.numeric,
      GQLObjectQueryModifierBuilderTypes.string,
      GQLObjectQueryModifierBuilderTypes.bool,
      GQLObjectQueryModifierBuilderTypes.dateTime,
    ]).forEach(el => {
      if (el.contains(lhs.dataType)) {
        this.check(
          el.contains(rhs.dataType),
          `${op} comparison predicate contains incompatible types`,
          context
        );
      }
    });

    // tslint:disable
    switch (op) {
      case '~':
        this.check(
          GQLObjectQueryModifierBuilderTypes.string.contains(lhs.dataType),
          `${op} pattern match predicate contains invalid types`,
          context
        );
        return new QME.GQLObjectQueryModifierBasicExpression(
          `regex(${lhs.expression}, ${rhs.expression})`,
          'xsd:boolean'
        );
      case '!~':
        this.check(
          GQLObjectQueryModifierBuilderTypes.string.contains(lhs.dataType),
          `${op} pattern match predicate contains invalid types`,
          context
        );
        return new QME.GQLObjectQueryModifierBasicExpression(
          `!regex(${lhs.expression}, ${rhs.expression})`,
          'xsd:boolean'
        );
      case '~*':
        this.check(
          GQLObjectQueryModifierBuilderTypes.string.contains(lhs.dataType),
          `${op} pattern match predicate contains invalid types`,
          context
        );
        return new QME.GQLObjectQueryModifierBasicExpression(
          `regex(${lhs.expression}, ${rhs.expression}, 'i')`,
          'xsd:boolean'
        );
      case '!~*':
        this.check(
          GQLObjectQueryModifierBuilderTypes.string.contains(lhs.dataType),
          `${op} pattern match predicate contains invalid types`,
          context
        );
        return new QME.GQLObjectQueryModifierBasicExpression(
          `!regex(${lhs.expression}, ${rhs.expression}, 'i')`,
          'xsd:boolean'
        );
      default:
        new QME.GQLObjectQueryBasicComparisonPredicate(lhs, op, rhs);
    }
    // tslint:enable
  }

  public processInPredicate(context: QMP.InVarPredicateContext) {
    const not = Option.of(context.NOT()).nonEmpty() ? 'NOT' : '';
    const lhs = this.processExpression(context.expression());
    const rhs = List.of(context.expression()).map(a =>
      this.processExpression(a)
    );

    List([
      GQLObjectQueryModifierBuilderTypes.numeric,
      GQLObjectQueryModifierBuilderTypes.string,
      GQLObjectQueryModifierBuilderTypes.bool,
      GQLObjectQueryModifierBuilderTypes.dateTime,
    ]).forEach(el => {
      if (el.contains(lhs.dataType)) {
        this.check(
          rhs.every(m => el.contains(m.dataType)),
          'IN predicate contains incompatible types',
          context
        );
      }
    });

    return new QME.GQLObjectQueryModifierBasicExpression(
      `${lhs.expression} ${not} in (${rhs.map(a => a.expression).join(', ')})`,
      'xsd:boolean'
    );
  }

  public processInVarPredicate(context: QMP.InVarPredicateContext) {
    const not = Option.of(context.NOT()).nonEmpty() ? 'NOT' : '';
    const lhs = this.processExpression(context.expression());
    const rhsVar = this.processVarRef(context.varRef());

    List([
      GQLObjectQueryModifierBuilderTypes.numeric,
      GQLObjectQueryModifierBuilderTypes.string,
      GQLObjectQueryModifierBuilderTypes.bool,
      GQLObjectQueryModifierBuilderTypes.dateTime,
    ]).forEach(el => {
      if (el.contains(lhs.dataType)) {
        this.check(
          rhsVar.dataType === lhs.dataType,
          'IN predicate contains incompatible types',
          context
        );
      }
    });
    return new QME.GQLObjectQueryModifierBasicExpression(
      `${lhs.expression} ${not} IN (${rhsVar.expression})`,
      'xsd: boolean'
    );
  }

  public processParenPredicate(
    context: QMP.ParenPredicateContext
  ): QME.GQLObjectQueryModifierParensExpression {
    return new QME.GQLObjectQueryModifierParensExpression(
      this.processSearchCondition(context.searchCondition())
    );
  }

  public processExpression(context: any): QME.GQLObjectQueryModifierExpression {
    switch (context.constructor.name) {
      case 'PrimitiveExpressionContext':
        return this.processPrimitiveExpression(context);
      case 'ParenExpressionContext':
        return this.processParenExpression(context);
      case 'UnaryExpressionContext':
        return this.processUnaryExpression(context);
      case 'FactorExpressionContext':
        return this.processFactorExpression(context);
      case 'TermExpressionContext':
        return this.processTermExpression(context);
      default:
        return new QME.GQLObjectQueryModifierBasicExpression(
          context.text,
          'error'
        );
    }
  }

  public processPrimitiveExpression(
    context: any
  ):
    | QME.GQLObjectQueryModifierPrimitiveExpression
    | QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    switch (context.expressionAtom().constructor.name) {
      case 'BuiltinCallAtomContext':
        return this.processBuiltInCallAtom(context.expressionAtom());
      case 'FunctionCallAtomContext':
        return this.processFunctionCallAtom(context.expressionAtom());
      case 'RdfLiteralAtomContext':
        return this.processRdfLiteralAtom(context.expressionAtom());
      case 'StringLiteralAtomContext':
        return this.processStringLiteralAtom(context.expressionAtom());
      case 'BooleanLiteralAtomContext':
        return this.processBooleanLiteralAtom(context.expressionAtom());
      case 'NumericLiteralAtomContext':
        return this.processNumericLiteralAtom(context.expressionAtom());
      case 'IriRefAtomContext':
        return this.processIriRefAtom(context.expressionAtom());
      case 'FieldRefAtomContext':
        return this.processFieldRefAtom(context.expressionAtom());
      case 'VarRefAtomContext':
        return this.processVarRefAtom(context.expressionAtom());
    }
  }

  public processBuiltInCallAtom(
    context: any
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    switch (context.builtinCall().constructor.name) {
      case 'AbsFuncContext':
        return this.processAbsFunction(context.builtinCall());
      // case 'BnodeFuncContext'        : return this.processBnodeFunction(context.builtinCall());
      case 'BoundFuncContext':
        return this.processBoundFunc(context.builtinCall());
      case 'CeilFuncContext':
        return this.processCeilFunc(context.builtinCall());
      case 'CoalesceFuncContext':
        return this.processCoalesceFunc(context.builtinCall());
      case 'ConcatFuncContext':
        return this.processConcatFunc(context.builtinCall());
      case 'ContainsFuncContext':
        return this.processContainsFunc(context.builtinCall());
      case 'DatatypeFuncContext':
        return this.processDatatypeFunc(context.builtinCall());
      case 'DayFuncContext':
        return this.processDayFunc(context.builtinCall());
      // case 'EncodeForUriFuncContext' : return this.processEncodeForUriFunction(context.builtinCall());
      case 'ExistsFuncContext':
        return this.processExistsFunc(context.builtinCall());
      case 'FloorFuncContext':
        return this.processFloorFunc(context.builtinCall());
      case 'HoursFuncContext':
        return this.processHoursFunc(context.builtinCall());
      case 'IfFuncContext':
        return this.processIfFunc(context.builtinCall());
      case 'IriFuncContext':
        return this.processIriFunc(context.builtinCall());
      case 'IsBlankFuncContext':
        return this.processIsBlankFunc(context.builtinCall());
      case 'IsIriFuncContext':
        return this.processIsIriFunc(context.builtinCall());
      case 'IsLiteralFuncContext':
        return this.processIsLiteralFunc(context.builtinCall());
      case 'IsNumericFuncContext':
        return this.processIsNumericFunc(context.builtinCall());
      case 'IsURIFuncContext':
        return this.processIsURIFunc(context.builtinCall());
      case 'LangFuncContext':
        return this.processLangFunc(context.builtinCall());
      case 'LangMatchesFuncContext':
        return this.processLangMatchesFunc(context.builtinCall());
      case 'LcaseFuncContext':
        return this.processLcaseFunc(context.builtinCall());
      case 'Md5FuncContext':
        return this.processMd5Func(context.builtinCall());
      case 'MinutesFuncContext':
        return this.processMinutesFunc(context.builtinCall());
      case 'MonthFuncContext':
        return this.processMonthFunc(context.builtinCall());
      case 'NowFuncContext':
        return this.processNowFunc(context.builtinCall());
      case 'RandFuncContext':
        return this.processRandFunc(context.builtinCall());
      case 'RegexFuncContext':
        return this.processRegexFunc(context.builtinCall());
      case 'ReplaceFuncContext':
        return this.processReplaceFunc(context.builtinCall());
      case 'RoundFuncContext':
        return this.processRoundFunc(context.builtinCall());
      case 'SameTermFuncContext':
        return this.processSameTermFunc(context.builtinCall());
      case 'SecondsFuncContext':
        return this.processSecondsFunc(context.builtinCall());
      case 'Sha1FuncContext':
        return this.processSha1Func(context.builtinCall());
      case 'Sha256FuncContext':
        return this.processSha256Func(context.builtinCall());
      case 'Sha384FuncContext':
        return this.processSha384Func(context.builtinCall());
      case 'Sha512FuncContext':
        return this.processSha512Func(context.builtinCall());
      case 'StrFuncContext':
        return this.processStrFunc(context.builtinCall());
      case 'StrAfterFuncContext':
        return this.processStrAfterFunc(context.builtinCall());
      case 'StrBeforeFuncContext':
        return this.processStrBeforeFunc(context.builtinCall());
      // case 'StrDtFuncContext'        : return this.processStrDtFunc(context.builtinCall());
      case 'StrEndsFuncContext':
        return this.processStrEndsFunc(context.builtinCall());
      case 'StrLangFuncContext':
        return this.processStrLangFunc(context.builtinCall());
      case 'StrLenFuncContext':
        return this.processStrLenFunc(context.builtinCall());
      case 'StrStartsFuncContext':
        return this.processStrStartsFunc(context.builtinCall());
      case 'StrUuidFuncContext':
        return this.processStrUuidFunc(context.builtinCall());
      case 'SubstrFuncContext':
        return this.processSubstrFunc(context.builtinCall());
      case 'TimezoneFuncContext':
        return this.processTimezoneFunc(context.builtinCall());
      case 'TzFuncContext':
        return this.processTzFunc(context.builtinCall());
      case 'UcaseFuncContext':
        return this.processUcaseFunc(context.builtinCall());
      case 'UriFuncContext':
        return this.processUriFunc(context.builtinCall());
      case 'UuidFuncContext':
        return this.processUuidFunc(context.builtinCall());
      case 'YearFuncContext':
        return this.processYearFunc(context.builtinCall());
    }
  }

  public NArgBuiltin(
    context: QMP.BuiltinCallContext,
    expressions: QMP.ExpressionContext[],
    name: string,
    inTypes: List<List<string>>,
    outType: string
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const expr = List(expressions).map(ex => this.processExpression(ex));
    expr
      .map((a, index) => [a, index])
      .forEach((elem: [GQLObjectQueryModifierExpression, number]) => {
        const it: number = elem[1];
        const tl = inTypes.size < it ? inTypes.last : inTypes[it];
        this.check(
          tl.contains(elem[0].dataType),
          // tslint: disable-next-line
          `wrong type for argument #${elem[1] +
            1} of ${name} builtin; expecting one of {${tl.join(',')}}, got '${
            elem[0].dataType
          }'`,
          context
        );
      });
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `${name}(${expr.map(el => el.expression).join(', ')})`,
      outType
    );
  }

  public oneArgBuiltin(
    context: QMP.BuiltinCallContext,
    expression: QMP.ExpressionContext,
    name: string,
    inTypes: List<string>,
    outType: Option<string> = None
  ) {
    const expr = this.processExpression(expression);
    if (!inTypes.isEmpty()) {
      this.check(
        inTypes.contains(expr.dataType),
        `wrong type for ${name} builtin; expecting one of
            {${inTypes.join(',')}},' got '${expr.dataType}'`,
        context
      );
    }
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `${name}(${expr.expression})`,
      outType.value || expr.dataType
    );
  }

  public zeroArgBuiltin(
    context: QMP.BuiltinCallContext,
    name: string,
    outType: string
  ) {
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `${name}()`,
      outType
    );
  }

  public processAbsFunction(
    context: QMP.AbsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'ABS',
      GQLObjectQueryModifierBuilderTypes.numeric
    );
  }

  public processBoundFunc(
    context: QMP.BoundFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const expr = this.processFieldRef(context.fieldRef());
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `BOUND(${expr.expression})`,
      expr.dataType
    );
  }

  public processCeilFunc(
    context: QMP.CeilFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'CEIL',
      GQLObjectQueryModifierBuilderTypes.numeric
    );
  }

  public processCoalesceFunc(
    context: QMP.CoalesceFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expressionList().expression(),
      'COALESCE',
      List(),
      context.iriRefOrVarRef().text
    );
  }

  public processConcatFunc(
    context: QMP.ConcatFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expressionList().expression(),
      'CONCAT',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:string'
    );
  }
  public processContainsFunc(
    context: QMP.ContainsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'CONTAINS',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:boolean'
    );
  }
  public processDatatypeFunc(
    context: QMP.DatatypeFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'DATATYPE',
      GQLObjectQueryModifierBuilderTypes.string
    );
  }
  public processDayFunc(
    context: QMP.DayFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'DAY',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:integer')
    );
  }

  //   public processEncopublicorUriFunc(
  //     context: QMP.EncopublicorUriFuncContext
  //   ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
  //     return this.oneArgBuiltin(
  //       context,
  //       context.expression(),
  //       'ENCODE_FOR_URI',
  //       GQLObjectQueryModifierBuilderTypes.string
  //     );
  //   }

  public processExistsFunc(
    context: QMP.ExistsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const [s, o, p] = List(context.expression())
      .map(a => this.processExpression(a))
      .toArray();
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `EXISTS { ${s} ${p} ${o} }`,
      'xsd:boolean'
    );
  }

  public processFloorFunc(
    context: QMP.FloorFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'FLOOR',
      GQLObjectQueryModifierBuilderTypes.numeric
    );
  }
  public processHoursFunc(
    context: QMP.HoursFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'HOURS',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:integer')
    );
  }

  public processIfFunc(
    context: QMP.IfFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const predicate = this.processPredicate(context.predicate());
    const trueExpr = this.processExpression(context.expression(0));
    const falseExpr = this.processExpression(context.expression(1));
    this.check(
      trueExpr.dataType === falseExpr.dataType,
      'mismatched return types for true and false branches of IF() builtin',
      context
    );
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `IF(${predicate.expression}, ${trueExpr.expression}, ${
        falseExpr.expression
      })`,
      trueExpr.dataType
    );
  }

  public processIriFunc(
    context: QMP.IriFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IRI',
      List(['xsd:string', 'iri']),
      Some('iri')
    );
  }

  public processIsBlankFunc(
    context: QMP.IsBlankFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IsBLANK',
      List(),
      Some('xsd:boolean')
    );
  }

  public processIsIriFunc(
    context: QMP.IsIriFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IsIRI',
      List(),
      Some('xsd:boolean')
    );
  }

  public processIsLiteralFunc(
    context: QMP.IsLiteralFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IsLITERAL',
      List(),
      Some('xsd:boolean')
    );
  }

  public processIsNumericFunc(
    context: QMP.IsNumericFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IsNUMERIC',
      List(),
      Some('xsd:boolean')
    );
  }

  public processIsURIFunc(
    context: QMP.IsURIFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'IsURI',
      List(),
      Some('xsd:boolean')
    );
  }

  public processLangFunc(
    context: QMP.LangFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'LANG',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processLangMatchesFunc(
    context: QMP.LangMatchesFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'LANGMATCHES',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:boolean'
    );
  }

  public processLcaseFunc(
    context: QMP.LcaseFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'LCASE',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processMd5Func(
    context: QMP.Md5FuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'MD5',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processMinutesFunc(
    context: QMP.MinutesFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'MINUTES',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:integer')
    );
  }

  public processMonthFunc(
    context: QMP.MonthFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'MONTH',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:integer')
    );
  }

  public processNowFunc(
    context: QMP.NowFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.zeroArgBuiltin(context, 'NOW', 'xsd:dateTime');
  }

  public processRandFunc(
    context: QMP.RandFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.zeroArgBuiltin(context, 'RAND', 'xsd:double');
  }

  public processRegexFunc(
    context: QMP.RegexFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'REGEX',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:boolean'
    );
  }

  public processReplaceFunc(
    context: QMP.ReplaceFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'REPLACE',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:string'
    );
  }

  public processRoundFunc(
    context: QMP.RoundFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'ROUND',
      GQLObjectQueryModifierBuilderTypes.numeric
    );
  }

  public processSameTermFunc(
    context: QMP.SameTermFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `sameTerm(${List(context.fieldRef())
        .map(a => this.processFieldRef(a))
        .join(', ')}
)`,
      'xsd:boolean'
    );
  }

  public processSecondsFunc(
    context: QMP.SecondsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'SECONDS',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:double')
    );
  }

  public processSha1Func(
    context: QMP.Sha1FuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'SHA1',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processSha256Func(
    context: QMP.Sha256FuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'SHA256',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processSha384Func(
    context: QMP.Sha384FuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'SHA384',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processSha512Func(
    context: QMP.Sha512FuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'SHA512',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processStrFunc(
    context: QMP.StrFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'STR',
      List(),
      Some('xsd:string')
    );
  }

  public processStrAfterFunc(
    context: QMP.StrAfterFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'STRAFTER',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:string'
    );
  }

  public processStrBeforeFunc(
    context: QMP.StrBeforeFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'STRBEFORE',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:string'
    );
  }

  public StrDtFunc(
    context: QMP.StrDtFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const str = this.processExpression(context.expression());
    this.check(
      GQLObjectQueryModifierBuilderTypes.string.contains(str.dataType),
      `wrong type for argument #1 of STRDT() builtin; expecting one of {xsd:string}, got '${
        str.dataType
      }'`,
      context
    );
    const iriDef = context.iriRefOrVarRef().text;
    return new QME.GQLObjectQueryModifierPrimitiveExpression(
      `STRDT(${str.expression}, ${iriDef})`,
      iriDef
    );
  }

  public processStrEndsFunc(
    context: QMP.StrEndsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'STRENDS',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:boolean'
    );
  }

  public processStrLangFunc(
    context: QMP.StrLangFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'STRLANG',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:string'
    );
  }

  public processStrLenFunc(
    context: QMP.StrLenFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'STRLEN',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:integer')
    );
  }

  public processStrStartsFunc(
    context: QMP.StrStartsFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'STRSTARTS',
      List([GQLObjectQueryModifierBuilderTypes.string]),
      'xsd:boolean'
    );
  }

  public processStrUuidFunc(
    context: QMP.StrUuidFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.zeroArgBuiltin(context, 'STRUUID', 'xsd:string');
  }

  public processSubstrFunc(
    context: QMP.SubstrFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.NArgBuiltin(
      context,
      context.expression(),
      'SUBSTR',
      List([
        GQLObjectQueryModifierBuilderTypes.string,
        GQLObjectQueryModifierBuilderTypes.integer,
      ]),
      'xsd:string'
    );
  }

  public processTimezoneFunc(
    context: QMP.TimezoneFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'TIMEZONE',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:dayTimeDuration')
    );
  }

  public processTzFunc(
    context: QMP.TzFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'TZ',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('xsd:string')
    );
  }

  public processUcaseFunc(
    context: QMP.UcaseFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'UCASE',
      GQLObjectQueryModifierBuilderTypes.string,
      Some('xsd:string')
    );
  }

  public processUriFunc(
    context: QMP.UriFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'URI',
      List(['xsd:string', 'iri']),
      Some('iri')
    );
  }

  public processUuidFunc(
    context: QMP.UuidFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.zeroArgBuiltin(context, 'UUID', 'iri');
  }

  public processYearFunc(
    context: QMP.YearFuncContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.oneArgBuiltin(
      context,
      context.expression(),
      'YEAR',
      GQLObjectQueryModifierBuilderTypes.dateTime,
      Some('integer')
    );
  }

  public processFunctionCallAtom(context: QMP.FunctionCallAtomContext) {
    const val = context.functionCall();
    if (val instanceof QMP.FuncWithoutArgsContext) {
      return this.processFuncWithoutArgs(val);
    }
    if (val instanceof QMP.FuncWithArgsContext) {
      return this.processFuncWithArgs(val);
    }
  }

  public processRdfLiteralAtom(context: QMP.RdfLiteralAtomContext) {
    const val = context.rdfLiteral();
    if (val instanceof QMP.LangRdfLiteralContext) {
      return new QME.GQLObjectQueryModifierPrimitiveExpression(
        val.text,
        'xsd:string'
      );
    }
    if (val instanceof QMP.DtRdfLiteralContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        val.text,
        val.iriRef().text
      );
    }
  }

  public processStringLiteralAtom(context: QMP.StringLiteralAtomContext) {
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      context.text,
      'xsd:string'
    );
  }

  public processStringLiteralOrVarRef(
    context: QMP.StringLiteralOrVarRefContext
  ) {
    const optOfStrLit = Option.of(context.stringLiteral());
    if (optOfStrLit.nonEmpty()) {
      return Option.of(optOfStrLit.value.text).getOrElse('');
    } else {
      const optOfVarRef = Option.of(context.varRef());
      if (optOfVarRef.nonEmpty()) {
        return this.processVarRef(optOfVarRef.value).expression;
      } else {
        return '';
      }
    }
  }

  public processIriRefOrVarRef(context: QMP.IriRefOrVarRefContext) {
    const optOfIriRef = Option.of(context.iriRef());
    if (optOfIriRef.nonEmpty()) {
      return this.processIriRef(optOfIriRef.value);
    } else {
      const optOfVarRef = Option.of(context.varRef());
      if (optOfVarRef.nonEmpty()) {
        return this.processVarRef(optOfVarRef.value);
      } else {
        return new QME.GQLObjectQueryModifierBasicExpression(
          context.text,
          'error'
        );
      }
    }
  }

  public processNumericLiteralAtom(context: QMP.NumericLiteralAtomContext) {
    return this.processNumericLiteral(context.numericLiteral());
  }

  public processNumericLiteral(context: QMP.NumericLiteralContext) {
    if (context instanceof QMP.IntegerLiteralContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        context.text,
        'xsd:integer'
      );
    }
    if (context instanceof QMP.DecimalLiteralContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        context.text,
        'xsd:decimal'
      );
    }
    if (context instanceof QMP.DoubleLiteralContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        context.text,
        'xsd:doubel'
      );
    }
  }

  public processBooleanLiteralAtom(context: QMP.BooleanLiteralAtomContext) {
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      context.booleanLiteral().text,
      'xsd:boolean'
    );
  }

  public processIriRefAtom(context: QMP.IriRefAtomContext) {
    return this.processIriRef(context.iriRef());
  }

  public processIriRef(context: QMP.IriRefContext) {
    if (context instanceof QMP.LiteralIriRefContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        context.text,
        'iri'
      );
    }
    if (context instanceof QMP.PrefixedNameIriRefContext) {
      return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
        context.prefixedName().text,
        'iri'
      );
    }
  }

  public processFieldRefAtom(
    context: QMP.FieldRefAtomContext
  ): QME.GQLObjectQueryModifierPrimitiveExpression {
    return this.processFieldRef(context.fieldRef());
  }

  public processFieldRef(context: QMP.FieldRefContext) {
    const field = context.text;
    if (this.validFields.get(field)) {
      return new QME.GQLObjectQueryModifierField(
        field === ID_KEY ? `?${SUBJECT_BINDING}` : `?${field}`,
        typeof field
      );
    } else {
      this.check(false, `invalid field reference '${field}'`, context);
    }
  }

  public processVarRefAtom(
    context: QMP.VarRefAtomContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    return this.processVarRef(context.varRef());
  }

  public processVarRef(
    context: QMP.VarRefContext
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const variable = context.VARNAME().text;
    const vd = this.validVariables.find(a => a.name === variable);
    this.check(!!vd, `unknown variable reference '${variable}'`, context);
    const value = this.vars.get(variable);
    this.check(
      value.isDefined(),
      `no value provided for referenced variable '${variable}', vars: ${
        this.vars
      }`,
      context
    );
    const filterExpr = this.asDataType(value.getOrElse('error'));
    const t = vd ? vd[0].gqlType.xsdType : 'error';
    // TODO this.check() whether filterExpr.dataType == t
    return filterExpr;
  }

  public processFuncWithArgs(context: QMP.FuncWithArgsContext) {
    const returnType = context.prefixedName().text;
    const funcName = context.iriRef().text;
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `${funcName}(
            ${List(context.expressionList().expression())
              .map(a => this.processExpression(a))
              .map(a => a.expression)
              .join(', ')}
        )`,
      returnType
    );
  }

  public processFuncWithoutArgs(context: QMP.FuncWithoutArgsContext) {
    const returnType = context.prefixedName().text;
    const funcName = context.iriRef().text;
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      `${funcName}()`,
      returnType
    );
  }

  public quotedDataType(
    value: any,
    dataType: Option<string>
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    const s = `"${value}"${dataType.nonEmpty() ? `^^${dataType.value}` : ''}`;
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      s,
      dataType.getOrElse('xsd:string'),
      Some(value)
    );
  }

  public asDataType(
    value: any
  ): QME.GQLObjectQueryModifierBasicPrimitiveExpression {
    if (value instanceof Number) {
      if (value.toString().includes('.')) {
        return this.quotedDataType(value, Some('xsd:double'));
      }
      return this.quotedDataType(value, Some('xsd:integer'));
    }
    if (value instanceof List) {
      const recValue = (value as List<any>).map(a => this.asDataType(a));
      if (recValue instanceof List && recValue.isEmpty()) {
        return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
          '',
          'xsd:string'
        );
      }
      if (recValue instanceof List) {
        return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
          recValue.map(a => a.expression).join(', '),
          (recValue.first() as GQLObjectQueryModifierPrimitiveExpression).dataType
        );
      }
    }
    if (typeof value === 'string') {
      if (GQLObjectQueryModifierBuilderTypes.rDATETIME_PATTERN.test(value)) {
        const regexed = GQLObjectQueryModifierBuilderTypes.rDATETIME_PATTERN
          .exec(value)[0]
          .split('-');
        // tslint:disable-next-line
        return this.quotedDataType(
          `${regexed[0]}T${regexed[1]}${Option.of(regexed[2]).getOrElse('')}`,
          Some('xsd:dateTime')
        );
      }
      if (GQLObjectQueryModifierBuilderTypes.rDATE_PATTERN.test(value)) {
        return this.quotedDataType(value, Some('xsd:date'));
      }
      if (GQLObjectQueryModifierBuilderTypes.rTIME_PATTERN.test(value)) {
        return this.quotedDataType(value, Some('xsd:time'));
      }
      if (GQLObjectQueryModifierBuilderTypes.rURI_PATTERN.test(value)) {
        return this.quotedDataType(value, Some('xsd:anyURI'));
      }
      if (this.rPREFIXED_IRI_PATTERN.test(value)) {
        const regexed = this.rPREFIXED_IRI_PATTERN.exec(value)[0].split('_');
        return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
          `${regexed[0]}:${regexed[1]}`,
          'iri'
        );
      }
      if (GQLObjectQueryModifierBuilderTypes.rIRI_PATTERN.test(value)) {
        return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
          value,
          'iri'
        );
      } else {
        return this.quotedDataType(value, None);
      }
    }
  }

  public processParenExpression(context: QMP.ParenExpressionContext) {
    const expr = this.processExpression(context.expression());
    return new QME.GQLObjectQueryModifierBasicExpression(
      `(${expr.expression})`,
      expr.dataType
    );
  }

  public processUnaryExpression(context: QMP.UnaryExpressionContext) {
    const op = context.unaryOp().text === '-' ? '-' : '';
    const expr = this.processExpression(context.expression());
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(expr.dataType),
      `invalid unary expression; expecting numeric but got ${
        expr.dataType
      } expression`,
      context
    );
    return new QME.GQLObjectQueryModifierBasicExpression(
      `${op}${expr.expression}`,
      expr.dataType
    );
  }

  public processFactorExpression(context: QMP.FactorExpressionContext) {
    const op = context.factorOp().text;
    const lhs = this.processExpression(context.expression(0));
    const rhs = this.processExpression(context.expression(1));
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(lhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${
        lhs.dataType
      } left operand`,
      context
    );
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${
        rhs.dataType
      } right operand`,
      context
    );
    return new QME.GQLObjectQueryModifierBasicExpression(
      `${lhs.expression} ${op} ${rhs.expression}`,
      this.resolveTypes(lhs.dataType, rhs.dataType)
    );
  }

  public processTermExpression(context: QMP.TermExpressionContext) {
    const op = context.termOp().text;
    const lhs = this.processExpression(context.expression(0));
    const rhs = this.processExpression(context.expression(1));
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(lhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${
        lhs.dataType
      } left operand`,
      context
    );
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${
        rhs.dataType
      } right operand`,
      context
    );
    return new QME.GQLObjectQueryModifierBasicExpression(
      `${lhs.expression}, ${op} ${rhs.expression}`,
      this.resolveTypes(lhs.dataType, rhs.dataType)
    );
  }

  public resolveTypes(t1: string, t2: string): string {
    const typeSize = Map({ integer: 0, decimal: 1, double: 2 });
    const s1 = typeSize.get(t1) || -1;
    const s2 = typeSize.get(t2) || -2;
    return s1 >= s2 ? t1 : t2;
  }
}

const GQLObjectQueryModifierBuilderTypesBasePatterns = {
  DATE_PATTERN: '(\\d{4}-\\d{2}-\\d{2})',
  TIME_PATTERN: '(\\d{2}:\\d{2}:\\d{2})',
  TZ_PATTERN: '(Z|[-+]\\d{2}:\\d{2})',
  URI_PATTERN: '(https?://.*)',
  IRI_PATTERN: '(<https?://.*>)',
  DATETIME_PATTERN: `(\\d{4}-\\d{2}-\\d{2})[T | ]
    (\d{2}:\d{2}:\d{2})(Z|[-+]\\d{2}:\\d{2})?`,
};

const GQLObjectQueryModifierBuilderTypes = {
  double: List('xsd:double'),
  integer: List('xsd:integer'),
  decimal: List('xsd:decimal'),
  get numeric() {
    return this.integer.concat(this.double).concat(this.decimal);
  },
  string: List('xsd:string'),
  bool: List('xsd:boolean'),
  dateTime: List('xsd:dateTime'),
  iri: List('xsd:ID'),
  any: List(),

  rDATETIME_PATTERN: new RegExp(
    GQLObjectQueryModifierBuilderTypesBasePatterns.DATETIME_PATTERN
  ),
  rDATE_PATTERN: new RegExp(
    GQLObjectQueryModifierBuilderTypesBasePatterns.DATE_PATTERN
  ),
  rTIME_PATTERN: new RegExp(
    GQLObjectQueryModifierBuilderTypesBasePatterns.TIME_PATTERN
  ),
  rURI_PATTERN: new RegExp(
    GQLObjectQueryModifierBuilderTypesBasePatterns.URI_PATTERN
  ),
  rIRI_PATTERN: new RegExp(
    GQLObjectQueryModifierBuilderTypesBasePatterns.IRI_PATTERN
  ),
};
