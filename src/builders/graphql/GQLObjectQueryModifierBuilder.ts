import { CodePointCharStream, TokenStream } from 'antlr4ts';
import { None, Option, Some } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  ComparisonPredicateContext,
  InVarPredicateContext,
  ParenPredicateContext,
  QueryModificationLexer,
} from '../../antlr4';
import * as QMP from '../../antlr4/generated/QueryModificationParser';
import {
  GQLFieldDefinition,
  GQLObjectQueryModifierConjunction,
  GQLObjectQueryModifierPrimitiveExpression,
  GQLVariableDefinition,
} from '../../models';
import * as QME from '../../models/GQLObjectQueryModifierExpression';
import { BuilderBase } from '../BuilderBase';

/* tslint:disable */
export abstract class GQLObjectQueryModifierBuilder extends BuilderBase<any> {
  public result: any;
  public PREFIXED_IRI_PATTERN: string;
  public rPREFIXED_IRI_PATTERN: RegExp;
  public validFields: List<GQLFieldDefinition>;
  public validVariables: Set<GQLVariableDefinition>;
  public vars: Map<string, string>;
  public source: string;

  constructor(
    validFields: List<GQLFieldDefinition>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, string>,
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

  public lexer(input: CodePointCharStream) {
    return new QueryModificationLexer(input);
  }

  // Simplifies (A and B) and C => A and B and C
  public simplifyConjunction(
    conjunction: QME.GQLObjectQueryModifierConjunction
  ): QME.GQLObjectQueryModifierConjunction {
    const newConjunctives = conjunction.conjunctives.flatMap<
      QME.GQLObjectQueryModifierOptionalNegation
    >(conjunctive => {
      let result = List([conjunctive]);
      if (!conjunctive.hasNot) {
        let disjunctionOpt: Option<
          QME.GQLObjectQueryModifierDisjunction
        > = None;
        const expr2 = conjunctive.expr.expr;
        if (
          expr2 instanceof QME.GQLObjectQueryModifierParensExpression &&
          expr2.expr instanceof QME.GQLObjectQueryModifierDisjunction
        ) {
          disjunctionOpt = Some(expr2.expr);
        } else if (expr2 instanceof QME.GQLObjectQueryModifierDisjunction) {
          disjunctionOpt = Some(expr2);
        }
        if (disjunctionOpt.nonEmpty()) {
          const disjunction = this.simplifyDisjunction(disjunctionOpt.get());
          if (
            disjunction.disjunctives.size == 1 &&
            disjunction.values.isEmpty()
          ) {
            result = disjunction.disjunctives.get(0)!.conjunctives;
          }
        }
      }
      return result;
    });
    return new GQLObjectQueryModifierConjunction(newConjunctives);
  }

  // Simplifies (A or B) or C => A or B or C
  public simplifyDisjunction(
    disjunction: QME.GQLObjectQueryModifierDisjunction
  ): QME.GQLObjectQueryModifierDisjunction {
    if (disjunction.values.isEmpty()) {
      const newDisjunctives: List<
        GQLObjectQueryModifierConjunction
      > = disjunction.disjunctives
        .map(a => this.simplifyConjunction(a))
        .flatMap<QME.GQLObjectQueryModifierConjunction>(disjunctive => {
          const conjunction = disjunctive;
          let result = List([disjunctive]);
          if (
            conjunction.conjunctives.size === 1 &&
            !conjunction.conjunctives.get(0)!.hasNot
          ) {
            let disjunctionOpt: Option<
              QME.GQLObjectQueryModifierDisjunction
            > = None;
            const expr2 = conjunction.conjunctives.get(0)!.expr.expr;
            if (
              expr2 instanceof QME.GQLObjectQueryModifierParensExpression &&
              expr2.expr instanceof QME.GQLObjectQueryModifierDisjunction
            ) {
              disjunctionOpt = Some(expr2.expr);
            } else if (expr2 instanceof QME.GQLObjectQueryModifierDisjunction) {
              disjunctionOpt = Some(expr2);
            }
            if (!disjunctionOpt.isEmpty()) {
              result = disjunctionOpt.get().disjunctives;
            }
          }
          return result;
        });
      return new QME.GQLObjectQueryModifierDisjunction(newDisjunctives);
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
        )
      )
    );

    if (isRoot) {
      const terms = basicDisjunction.disjunctives;

      const getValidEqualityTermsInConjunction = (
        con: QME.GQLObjectQueryModifierConjunction
      ) => {
        const isField = (e: QME.GQLObjectQueryModifierExpression) =>
          e instanceof QME.GQLObjectQueryModifierField;
        const isPrimitive = (e: QME.GQLObjectQueryModifierExpression) =>
          !isField(e) &&
          e instanceof QME.GQLObjectQueryModifierPrimitiveExpression;

        return Map(
          con.conjunctives
            .filterNot(a => a.hasNot)
            .map(a => a.expr.expr)
            .flatMap<QME.GQLObjectQueryBasicComparisonPredicate>(a =>
              a instanceof QME.GQLObjectQueryBasicComparisonPredicate
                ? List([a])
                : List()
            )
            .flatMap<
              [
                QME.GQLObjectQueryModifierField,
                QME.GQLObjectQueryModifierPrimitiveExpression
              ]
            >(p => {
              if (p.op === '=') {
                if (isField(p.lhs) && isPrimitive(p.rhs)) {
                  return List([[p.lhs, p.rhs]]);
                } else if (isPrimitive(p.lhs) && isField(p.rhs)) {
                  return List([[p.rhs, p.lhs]]);
                }
              }
              return List();
            })
        );
      };

      let fieldsInEachConjunction = Set<string>();
      if (!terms.isEmpty()) {
        const fieldsInHead = Set(
          List(getValidEqualityTermsInConjunction(terms.first()).keys()).map(
            a => a.expression
          )
        );
        fieldsInEachConjunction = terms.slice(1).reduce(
          (acc, current) =>
            acc.intersect(
              List(getValidEqualityTermsInConjunction(current).keys())
                .map(a => a.expression)
                .toSet()
            ),
          fieldsInHead
        );
      }

      let values = List<
        Map<
          QME.GQLObjectQueryModifierField,
          QME.GQLObjectQueryModifierPrimitiveExpression
        >
      >();

      if (!fieldsInEachConjunction.isEmpty()) {
        values = terms.map(x =>
          getValidEqualityTermsInConjunction(x).filter((val, key) =>
            fieldsInEachConjunction.contains(key.expression)
          )
        );
      }

      const valuesIsComplete = terms
        .map(x => x.conjunctives.size)
        .every(s => s === fieldsInEachConjunction.size);

      const finalTerms = valuesIsComplete
        ? List<QME.GQLObjectQueryModifierConjunction>()
        : terms;

      return new QME.GQLObjectQueryModifierDisjunction(finalTerms, values);
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
    let predicate: QME.GQLObjectQueryModifierExpression;

    switch (context.constructor.name) {
      case 'ComparisonPredicateContext':
        predicate = this.processComparisonPredicate(
          context as QMP.ComparisonPredicateContext
        );
        return new QME.GQLObjectQueryModifierPredicate(predicate);
      case 'InPredicateContext':
        predicate = this.processInPredicate(context as QMP.InPredicateContext);
        return new QME.GQLObjectQueryModifierPredicate(predicate);
      case 'InVarPredicateContext':
        predicate = this.processInVarPredicate(
          context as QMP.InVarPredicateContext
        );
        return new QME.GQLObjectQueryModifierPredicate(predicate);
      case 'ParenPredicateContext':
        predicate = this.processParenPredicate(
          context as QMP.ParenPredicateContext
        );
        return new QME.GQLObjectQueryModifierPredicate(predicate);
      default:
        throw new Error('Unsupported context type:' + context.constructor.name);
    }
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
        return new QME.GQLObjectQueryBasicComparisonPredicate(lhs, op, rhs);
    }
    // tslint:enable
  }

  public processInPredicate(context: QMP.InPredicateContext) {
    const not = Option.of(context.NOT()).nonEmpty() ? 'NOT' : '';
    const lhs = this.processExpression(context.expression());
    const rhs = List(context.expressionList().expression()).map(e =>
      this.processExpression(e)
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
    const atom = context.expressionAtom();
    switch (atom.constructor.name) {
      // case 'BuiltinCallAtomContext':
      //   return this.processBuiltInCallAtom(atom as QMP.BuiltinCallAtomContext);
      case 'FunctionCallAtomContext':
        return this.processFunctionCallAtom(
          atom as QMP.FunctionCallAtomContext
        );
      // case 'RdfLiteralAtomContext':
      //   return this.processRdfLiteralAtom(atom as QMP.RdfLiteralAtomContext);
      case 'StringLiteralAtomContext':
        return this.processStringLiteralAtom(
          atom as QMP.StringLiteralAtomContext
        );
      case 'BooleanLiteralAtomContext':
        return this.processBooleanLiteralAtom(
          atom as QMP.BooleanLiteralAtomContext
        );
      case 'NumericLiteralAtomContext':
        return this.processNumericLiteralAtom(
          atom as QMP.NumericLiteralAtomContext
        );
      case 'IriRefAtomContext':
        return this.processIriRefAtom(atom as QMP.IriRefAtomContext);
      case 'FieldRefAtomContext':
        return this.processFieldRefAtom(atom as QMP.FieldRefAtomContext);
      case 'VarRefAtomContext':
        return this.processVarRefAtom(atom as QMP.VarRefAtomContext);
    }
    throw new Error('Unsupported atom context! ' + atom.constructor.name);
  }

  public processFunctionCallAtom(context: QMP.FunctionCallAtomContext) {
    return this.processFunctionCall(context.functionCall());
  }

  public processFunctionCall(context: QMP.FunctionCallContext) {
    if (context instanceof QMP.FuncWithoutArgsContext) {
      return this.processFuncWithoutArgs(context);
    } else if (context instanceof QMP.FuncWithArgsContext) {
      return this.processFuncWithArgs(context);
    }
    throw new Error('Unsupported FunctionCall Context' + context);
  }

  public processStringLiteralAtom(context: QMP.StringLiteralAtomContext) {
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      context.text,
      'xsd:string'
    );
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
    return new QME.GQLObjectQueryModifierBasicPrimitiveExpression(
      context.text,
      'xsd:double'
    );
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
    throw new Error('Unknown format for IriRef');
  }

  public processFieldRefAtom(
    context: QMP.FieldRefAtomContext
  ): QME.GQLObjectQueryModifierPrimitiveExpression {
    return this.processFieldRef(context.fieldRef());
  }

  public processFieldRef(context: QMP.FieldRefContext) {
    const field = context.text;
    const fieldType = Option.of(
      this.validFields.find(fd => fd.name === field)
    ).map(fd => fd.gqlType.xsdType());
    if (fieldType.nonEmpty()) {
      return new QME.GQLObjectQueryModifierField(field, fieldType.get());
    } else {
      this.check(false, `invalid field reference '${field}'`, context);
      return new QME.GQLObjectQueryModifierField(field, 'error');
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
    const value = Option.of(this.vars.get(variable));
    this.check(
      value.nonEmpty(),
      `no value provided for referenced variable '${variable}', vars: ${this.vars}`,
      context
    );
    return this.asDataType(value.getOrElse('error'));
  }

  public processFuncWithArgs(context: QMP.FuncWithArgsContext) {
    const returnType = context.xsdType().text;
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
    const returnType = context.xsdType().text;
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
          .exec(value)![0]
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
        const regexed = this.rPREFIXED_IRI_PATTERN.exec(value)![0].split('_');
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
    throw new Error('Unsupported expression' + value);
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
      `invalid unary expression; expecting numeric but got ${expr.dataType} expression`,
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
      `invalid binary expression with '$op'; expecting numeric but got ${lhs.dataType} left operand`,
      context
    );
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${rhs.dataType} right operand`,
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
      `invalid binary expression with '$op'; expecting numeric but got ${lhs.dataType} left operand`,
      context
    );
    this.check(
      GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
      `invalid binary expression with '$op'; expecting numeric but got ${rhs.dataType} right operand`,
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
  double: List(['xsd:double']),
  integer: List(['xsd:integer']),
  decimal: List(['xsd:decimal']),
  get numeric() {
    return this.integer.concat(this.double).concat(this.decimal);
  },
  string: List(['xsd:string']),
  bool: List(['xsd:boolean']),
  dateTime: List(['xsd:dateTime']),
  iri: List(['xsd:ID']),
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
