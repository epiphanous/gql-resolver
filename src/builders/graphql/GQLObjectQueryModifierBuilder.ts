import {CharStream, Parser, TokenStream} from 'antlr4ts';
import { Failure, None, Option, Some, Success, Try} from 'funfix';
import Map, {List} from 'immutable';
import { pickBy } from 'lodash';
import {
    AbsFuncContext,
    BuiltinCallAtomContext, BuiltinCallContext,
    ComparisonPredicateContext, ExpressionContext, InVarPredicateContext, ParenPredicateContext,
    PredicateContext, PrimitiveExpressionContext,
    QueryModificationParser, SearchConditionAndContext,
    SearchConditionContext, SearchConditionNotContext
} from '../../antlr4/generated/QueryModificationParser';
import {
    GQLObjectQueryBasicComparisonPredicate, GQLObjectQueryModifierBasicExpression,
    GQLObjectQueryModifierBasicPrimitiveExpression,
    GQLObjectQueryModifierConjunction,
    GQLObjectQueryModifierDisjunction, GQLObjectQueryModifierExpression, GQLObjectQueryModifierField,
    GQLObjectQueryModifierOptionalNegation,
    GQLObjectQueryModifierParensExpression, GQLObjectQueryModifierPredicate,
    GQLObjectQueryModifierPrimitiveExpression
} from '../../models/GQLObjectQueryModifierExpression';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';
import BuilderBase from '../BuilderBase';

abstract class GQLObjectQueryModifierBuilder extends BuilderBase<any> {
    public PREFIXED_IRI_PATTERN: string;
    public rPREFIXED_IRI_PATTERN: RegExp;
    public result: any;
    constructor(
        validFields: Map[string],
        validVariables: Set<GQLVariableDefinition>,
        vars: Map[any],
        prefixes: Set<string>,
        source: string = 'filter'
    ) {
        super();
        const PREFIXED_IRI_PATTERN = `(${prefixes.join('|')})_(.*)`;
        const rPREFIXED_IRI_PATTERN = new RegExp(PREFIXED_IRI_PATTERN);

        const result: any;

    }

    public parser(tokenStream: TokenStream) {
        return new QueryModificationParser(tokenStream);
    }

    public lexer(input: CharStream) {
        return new GQLObjectQueryModifierLexer(input);
    }

    public build(parser: Parser) {
        const tryParse = Try.of(this.parse(parser));
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

    public simplifyConjunction(conjunction: GQLObjectQueryModifierConjunction): GQLObjectQueryModifierConjunction {
        const newConjunctives = conjunction.conjunctives.flatMap(conjunctive => {
            if (!conjunctive.hasNot) {
                let disjunctionOpt: Option<GQLObjectQueryModifierDisjunction> = conjunctive.expr.expr;
                if (conjunctive.expr.expr instanceof GQLObjectQueryModifierParensExpression) {
                    if (conjuctive.expr.expr.expr instanceof GQLObjectQueryModifierDisjunction) {
                        disjunctionOpt = Some(conjunctive.expr.expr.expr);
                    } else {
                        disjunctionOpt = None;
                    }
                } else if (conjunctive.expr.expr instanceof GQLObjectQueryModifierDisjunction) {
                    disjunctionOpt = Some(conjunctive.expr.expr);
                } else {
                    disjunctionOpt = None;
                }
                if (disjunctionOpt.isDefined()) {
                    const disjunction = this.simplifyDisjunction(disjunctionOpt.get);
                    if (disjunction.disjunctives.size === 1 && disjunction.values.isEmpty()) {
                        return disjuction.disjunctives[0].conjuctives;
                    } else {
                        return List(conjunctive);
                    }
                } else {
                    return List(conjuctive);
                }
            } else {
                return List(conjuctive);
            }
        });
        return newConjunctives;
    }

    public simplifyDisjunction(disjunction: GQLObjectQueryModifierDisjunction): GQLObjectQueryModifierDisjunction {
        if (disjunction.value.isEmpty) {
            const newDisjunctives = disjunction.disjunctives.map(a => this.simplifyConjunction(a)).flatMap(disjunctive => {
                const conjunction = disjunctive;
                if (conjunction.conjuctives.size === 1 && !!conjunction.conjuctives[0]) {
                    let disjunctionOpt: Option<any>;
                    if (conjunction.conjuctives[0].expr.expr instanceof GQLObjectQueryModifierParensExpression) {
                        if (conjunction.conjuctives[0].expr.expr.expr instanceof GQLObjectQueryModifierDisjunction) {
                            disjunctionOpt = Some(conjunction.conjuctives[0].expr.expr.expr);
                        } else {
                            disjunctionOpt = None;
                        }
                    } else if (conjunction.conjuctives[0].expr.expr instanceof GQLObjectQueryModifierDisjunction) {
                        disjunctionOpt = Some(conjunction.conjuctives[0].expr.expr);
                    } else {
                        return None;
                    }
                    if (!disjunctionOpt.isEmpty()) {
                        return disjunctionOpt.get.disjunctives;
                    } else {
                        return List(disjunctive);
                    }
                } else {
                    return List(disjunctive);
                }
            });
            return new GQLObjectQueryModifierDisjunction(newDisjunctives, List().clear());
        } else {
            return disjunction;
        }
    }

    public processSearchCondition(context: SearchConditionContext, isRoot: boolean = false): GQLObjectQueryModifierDisjunction {
        const basicDisjunction = this.simplifyDisjunction(new GQLObjectQueryModifierDisjunction(List(context.searchConditionAnd())
                .map(a => this.processSearchCondition(a)),
            List().clear())
        );

        const getValidEqualityTermsInConjuction = (con: GQLObjectQueryModifierConjunction): Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression> => {
            con.conjuctives.filterNot((a: any) => a.hasNot()).map(a => a.expr.expr)
                .flatMap((a: any) =>
                    a instanceof GQLObjectQueryBasicComparisonPredicate ? a : List().clear()
                )
                .flatMap((b: any) => {
                    if (b.op === '=') {
                        if (b.lhs instanceof GQLObjectQueryModifierField && b.rhs instanceof GQLObjectQueryModifierPrimitiveExpression) {
                            if (!b.rhs instanceof GQLObjectQueryModifierField) {
                                return List().set(0, [b.lhs, b.rhs]);
                            }
                        } else if (b.lhs instanceof GQLObjectQueryModifierPrimitiveExpression && b.rhs instanceof GQLObjectQueryModifierField) {
                            if (!b.rhs instanceof GQLObjectQueryModifierField) {
                                return List().set(0, [b.lhs, b.rhs]);
                            }
                        } else {
                            return List();
                        }
                    }
                })
                .toMap();
        };

        if (isRoot) {
            const terms: List<GQLObjectQueryModifierDisjunction> = basicDisjunction.disjunctives;
            const fieldsInEachConjuction: Set<string> = () => {
                if (terms.isEmpty()) {
                    return new Set();
                } else {
                    const fieldsInHead = new Set(getValidEqualityTermsInConjuction(terms.first)
                        .keys.map(a => a.expression));
                    terms.slice(1).reduce((acc, current) => {
                        if (acc instanceof Set && current instanceof GQLObjectQueryModifierConjunction) {
                            return acc.intersect(getValidEqualityTermsInConjuction(current)
                                .keys.map(a => a.expression).toSet());
                        }
                    }, fieldsInHead);
                }
            };

            const values: List<Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>> = () => {
                if (!fieldsInEachConjuction.isEmpty()) {
                    return terms.map(x => pickBy(getValidEqualityTermsInConjuction(x), (val, key) =>
                        fieldsInEachConjuction.contains(key.expression)
                    ));
                } else {
                    return List();
                }
            };

            const valuesIsComplete = () => terms.map(x => x.conjuctives.size)
                .every(r => r === fieldsInEachConjuction.size);

            const finalTerms = () => valuesIsComplete() ? List() : terms;

            return new GQLObjectQueryModifierDisjunction(finalTerms(), values);
        } else {
            return basicDisjunction;
        }
    }

    public processSearchConditionAnd(context: SearchConditionAndContext): GQLObjectQueryModifierConjunction {
        return this.simplifyConjunction(new GQLObjectQueryModifierConjunction(
            List(context.searchConditionNot()).map(x => this.processSearchConditionNot(x))
        ));
    }

    public processSearchConditionNot(context: SearchConditionNotContext): GQLObjectQueryModifierOptionalNegation {
        const predicate = this.processPredicate(context.predicate());
        return new GQLObjectQueryModifierOptionalNegation(Option.of(context.NOT()).nonEmpty(), predicate);
    }

    public processPredicate(context: PredicateContext): GQLObjectQueryModifierPredicate {
        let predicate;

        switch (context.constructor.name) {
            case 'ComparisonPredicateContext': predicate = this.processComparisonPredicate(context); break;
            case 'InPredicateContext': predicate = this.processInPredicate(context); break;
            case 'InVarPredicateContext': predicate = this.processInVarPredicate(context); break;
            case 'ParenPredicateContext': predicate = this.processParenPredicate(context); break;
        }
        return new GQLObjectQueryModifierPredicate(predicate);
    }

    public processComparisonPredicate(context: ComparisonPredicateContext): GQLObjectQueryModifierExpression {
        const lhs = this.processExpression(context.expression(0));
        const rhs = this.processExpression(context.expression(1));
        const op = context.comparisonOp().getText();

        List([
            GQLObjectQueryModifierBuilderTypes.numeric,
            GQLObjectQueryModifierBuilderTypes.string,
            GQLObjectQueryModifierBuilderTypes.bool,
            GQLObjectQueryModifierBuilderTypes.dateTime
            ]).forEach(el => {
                if (el.contains(lhs.dataType)) {
                    check(el.contains(rhs.dataType), `${op} comparison predicate contains incompatible types`, context);
                }
        });

        switch (op) {
            case '~' : check(string.contains(lhs.dataType), `${op} pattern match predicate contains invalid types`, context);
                       return GQLObjectQueryModifierBasicExpression(`regex(${lhs.expression }, ${rhs.expression })`, 'xsd:boolean');
            case '!~' : check(string.contains(lhs.dataType), `${op} pattern match predicate contains invalid types`, context);
                        return GQLObjectQueryModifierBasicExpression(`!regex(${lhs.expression }, ${rhs.expression })`, 'xsd:boolean');
            case '~*' : check(string.contains(lhs.dataType), `${op} pattern match predicate contains invalid types`, context);
                        return GQLObjectQueryModifierBasicExpression(`regex(${lhs.expression }, ${rhs.expression }, 'i')`, 'xsd:boolean');
            case '!~*' : check(string.contains(lhs.dataType), `${op} pattern match predicate contains invalid types`, context);
                         return GQLObjectQueryModifierBasicExpression(`!regex(${lhs.expression }, ${rhs.expression }, 'i')`, 'xsd:boolean');
            case _ : GQLObjectQueryBasicComparisonPredicate(lhs, op, rhs);
        }
    }

    public processInPredicate(context: InVarPredicateContext) {
        const not = Option.of(context.NOT()).nonEmpty() ? 'NOT' : '';
        const lhs = this.processExpression(context.expression());
        const rhs = List(context.expressionList().expression()).map(a => this.processExpression(a));

        List([
            GQLObjectQueryModifierBuilderTypes.numeric,
            GQLObjectQueryModifierBuilderTypes.string,
            GQLObjectQueryModifierBuilderTypes.bool,
            GQLObjectQueryModifierBuilderTypes.dateTime
        ]).forEach(el => {
                if (el.contains(lhs.dataType)) {
                    check(rhs.every(m => el.contains(m.dataType)), 'IN predicate contains incompatible types', context);
                }
            });

        return GQLObjectQueryModifierBasicExpression(
            `${lhs.expression} ${not} in (${rhs.map(a => a.expression).join(', ')})`
        );
    }

    public processInVarPredicate(context: InVarPredicateContext) {
        const not = Option.of(context.NOT()).nonEmpty() ? 'NOT' : '';
        const lhs = this.processExpression(context.expression());
        const rhsVar = List(context.varRef());

        List([
            GQLObjectQueryModifierBuilderTypes.numeric,
            GQLObjectQueryModifierBuilderTypes.string,
            GQLObjectQueryModifierBuilderTypes.bool,
            GQLObjectQueryModifierBuilderTypes.dateTime
        ]).forEach(el => {
            if (el.contains(lhs.dataType)) {
                check(rhsVar.dataType === lhs.dataType, 'IN predicate contains incompatible types', context);
            }
        });
        return new GQLObjectQueryModifierBasicExpression(`${lhs.expression} ${not} IN (${rhsVar.expression})`,
            'xsd: boolean');
    }

    public processParenPredicate(context: ParenPredicateContext): GQLObjectQueryModifierParensExpression {
        return new GQLObjectQueryModifierParensExpression(this.processSearchCondition(context.searchCondition()));
    }

    public processExpression(context: ExpressionContext): GQLObjectQueryModifierExpression {
        switch (context.constructor.name) {
            case 'PrimitiveExpressionContext': return this.processPrimitiveExpression(context);
            case 'ParenExpressionContext': return this.processParenExpression(context);
            case 'UnaryExpressionContext': return this.processUnaryExpression(context);
            case 'FactorExpressionContext': return this.processFactorExpression(context);
            case 'TermExpressionContext': return this.processTermExpression(context);
            default: return new GQLObjectQueryModifierBasicExpression(context.getText(), 'error');
        }
    }

    public processPrimitiveExpression(context: PrimitiveExpressionContext): GQLObjectQueryModifierPrimitiveExpression {
        switch (context.expressionAtom().constructor.name) {
            case 'BuiltinCallAtomContext' : return this.processBuiltinCallAtom(e);
            case 'FunctionCallAtomContext' : return this.processFunctionCallAtom(e);
            case 'RdfLiteralAtomContext' : return this.processRdfLiteralAtom(e);
            case 'StringLiteralAtomContext' : return this.processStringLiteralAtom(e);
            case 'BooleanLiteralAtomContext' : return this.processBooleanLiteralAtom(e);
            case 'NumericLiteralAtomContext' : return this.processNumericLiteralAtom(e);
            case 'IriRefAtomContext' : return this.processIriRefAtom(e);
            case 'FieldRefAtomContext' : return this.processFieldRefAtom(e);
            case 'VarRefAtomContext' : return this.processVarRefAtom(e);
        }
    }

    public processBuiltInCallAtom(context: BuiltinCallAtomContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        switch (context.builtinCall().constructor.name) {
            case 'AbsFuncContext'          : return this.processAbsFunc(b);
            case 'BnodeFuncContext'        : return this.processBnodeFunc(b);
            case 'BoundFuncContext'        : return this.processBoundFunc(b);
            case 'CeilFuncContext'         : return this.processCeilFunc(b);
            case 'CoalesceFuncContext'     : return this.processCoalesceFunc(b);
            case 'ConcatFuncContext'       : return this.processConcatFunc(b);
            case 'ContainsFuncContext'     : return this.processContainsFunc(b);
            case 'DatatypeFuncContext'     : return this.processDatatypeFunc(b);
            case 'DayFuncContext'          : return this.processDayFunc(b);
            case 'EncodeForUriFuncContext' : return this.processEncodeForUriFunc(b);
            case 'ExistsFuncContext'       : return this.processExistsFunc(b);
            case 'FloorFuncContext'        : return this.processFloorFunc(b);
            case 'HoursFuncContext'        : return this.processHoursFunc(b);
            case 'IfFuncContext'           : return this.processIfFunc(b);
            case 'IriFuncContext'          : return this.processIriFunc(b);
            case 'IsBlankFuncContext'      : return this.processIsBlankFunc(b);
            case 'IsIriFuncContext'        : return this.processIsIriFunc(b);
            case 'IsLiteralFuncContext'    : return this.processIsLiteralFunc(b);
            case 'IsNumericFuncContext'    : return this.processIsNumericFunc(b);
            case 'IsURIFuncContext'        : return this.processIsURIFunc(b);
            case 'LangFuncContext'         : return this.processLangFunc(b);
            case 'LangMatchesFuncContext'  : return this.processLangMatchesFunc(b);
            case 'LcaseFuncContext'        : return this.processLcaseFunc(b);
            case 'Md5FuncContext'          : return this.processMd5Func(b);
            case 'MinutesFuncContext'      : return this.processMinutesFunc(b);
            case 'MonthFuncContext'        : return this.processMonthFunc(b);
            case 'NowFuncContext'          : return this.processNowFunc(b);
            case 'RandFuncContext'         : return this.processRandFunc(b);
            case 'RegexFuncContext'        : return this.processRegexFunc(b);
            case 'ReplaceFuncContext'      : return this.processReplaceFunc(b);
            case 'RoundFuncContext'        : return this.processRoundFunc(b);
            case 'SameTermFuncContext'     : return this.processSameTermFunc(b);
            case 'SecondsFuncContext'      : return this.processSecondsFunc(b);
            case 'Sha1FuncContext'         : return this.processSha1Func(b);
            case 'Sha256FuncContext'       : return this.processSha256Func(b);
            case 'Sha384FuncContext'       : return this.processSha384Func(b);
            case 'Sha512FuncContext'       : return this.processSha512Func(b);
            case 'StrFuncContext'          : return this.processStrFunc(b);
            case 'StrAfterFuncContext'     : return this.processStrAfterFunc(b);
            case 'StrBeforeFuncContext'    : return this.processStrBeforeFunc(b);
            case 'StrDtFuncContext'        : return this.processStrDtFunc(b);
            case 'StrEndsFuncContext'      : return this.processStrEndsFunc(b);
            case 'StrLangFuncContext'      : return this.processStrLangFunc(b);
            case 'StrLenFuncContext'       : return this.processStrLenFunc(b);
            case 'StrStartsFuncContext'    : return this.processStrStartsFunc(b);
            case 'StrUuidFuncContext'      : return this.processStrUuidFunc(b);
            case 'SubstrFuncContext'       : return this.processSubstrFunc(b);
            case 'TimezoneFuncContext'     : return this.processTimezoneFunc(b);
            case 'TzFuncContext'           : return this.processTzFunc(b);
            case 'UcaseFuncContext'        : return this.processUcaseFunc(b);
            case 'UriFuncContext'          : return this.processUriFunc(b);
            case 'UuidFuncContext'         : return this.processUuidFunc(b);
            case 'YearFuncContext'         : return this.processYearFunc(b);
        }
    }

    public NArgBuiltin(context: BuiltinCallContext,
                       expressions: [ExpressionContext],
                       name: string,
                       inTypes: List<List<string>>,
                       outType: string
                       ): GQLObjectQueryModifierBasicPrimitiveExpression {
        const expr = List(expressions).map(ex => this.processExpression(ex));
        expr.map((a, index) => [a, index]).forEach(elem => {
            const tl = inTypes.size < elem[1] ? inTypes.last : inTypes.get(elem.get(1));
            check(tl.contains(elem[0].dataType),
                // tslint: disable-next-line
                `wrong type for argument #${elem[1] + 1} of ${name} builtin; expecting one of {${tl.join(',')}}, got '${elem[0].dataType}'`,
                context);
        });
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`${name}(${expr.map(el => el.expression)
            .join(', ')})`, outType);
    }

    public oneArgBuiltin(context: BuiltinCallContext,
                         expression: ExpressionContext,
                         name: string,
                         inTypes: List<string>,
                         outType: string
    ) {
        const expr = this.processExpression(expression);
        if (inTypes.nonEmpty()) {
            check(inTypes.contains(expr.dataType), `wrong type for ${name} builtin; expecting one of
            {${inTypes.join(',')}},' got '${expr.dataType}'`, context);
        }
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`${name}(${expr.expression})`, outType.getOrElse(expr.dataType));
    }

    public zeroArgBuiltin(
        context: BuiltinCallContext,
        name: string,
        outType: string
    ) {
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`${name}()`, outType);
    }

    public processAbsFunction(context: AbsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'ABS', GQLObjectQueryModifierBuilderTypes.numeric);
    }

    public processBoundFunc(context: Qmp.BoundFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const expr = this.processFieldRef(context.fieldRef())
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`BOUND(${expr.expression})`, expr.dataType);
    }
}

const GQLObjectQueryModifierBuilderTypes = {
    double         : List('xsd:double'),
    integer        : List('xsd:integer'),
    decimal        : List('xsd:decimal'),
    numeric        : this.integer.concat(this.double).concat(this.decimal),
    string         : List('xsd:string'),
    bool           : List('xsd:boolean'),
    dateTime       : List('xsd:dateTime'),
    iri            : List('xsd:ID'),
    any            : List(),
    DATE_PATTERN      : '(\d{4}-\d{2}-\d{2})',
    TIME_PATTERN      : '(\d{2}:\d{2}:\d{2})',
    TZ_PATTERN        : '(Z|[-+]\d{2}:\d{2})',
    DATETIME_PATTERN  : `${this.DATE_PATTERN}[T | ]${this.TIME_PATTERN$TZ_PATTERN}?`,
    rDATETIME_PATTERN : new RegExp(this.DATETIME_PATTERN),
    rDATE_PATTERN     : new RegExp(this.DATE_PATTERN),
    rTIME_PATTERN     : new RegExp(this.TIME_PATTERN),
    URI_PATTERN       : '(https?://.*)',
    rURI_PATTERN      : new RegExp(this.URI_PATTERN),
    IRI_PATTERN       : '(<https?://.*>)',
    rIRI_PATTERN      : new RegExp(this.IRI_PATTERN)
};
