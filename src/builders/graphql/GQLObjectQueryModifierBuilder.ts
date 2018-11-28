import {CharStream, Parser, TokenStream} from 'antlr4ts';
import { Failure, None, Option, Some, Success, Try} from 'funfix';
import Map, {List} from 'immutable';
import { pickBy } from 'lodash';
import {IntegerLiteralContext, IsIriFuncContext} from '../../../generated/src/antlr4/QueryModificationParser';
import {
    AbsFuncContext, BooleanLiteralAtomContext, BoundFuncContext,
    BuiltinCallAtomContext, BuiltinCallContext, CeilFuncContext, CoalesceFuncContext,
    ComparisonPredicateContext, ConcatFuncContext, ContainsFuncContext, DatatypeFuncContext, DayFuncContext,
    DecimalLiteralContext, DoubleLiteralContext,
    DtRdfLiteralContext,
    ExistsFuncContext,
    ExpressionContext, FactorExpressionContext, FieldRefAtomContext, FieldRefContext, FunctionCallAtomContext,
    FuncWithArgsContext,
    FuncWithoutArgsContext,
    IfFuncContext,
    InVarPredicateContext, IriFuncContext, IriRefAtomContext, IriRefContext, IriRefOrVarRefContext, IsBlankFuncContext,
    IsLiteralFuncContext,
    IsNumericFuncContext,
    IsURIFuncContext, LangFuncContext, LangMatchesFuncContext, LangRdfLiteralContext, LcaseFuncContext,
    LiteralIriRefContext, Md5FuncContext,
    MinutesFuncContext,
    MonthFuncContext, NowFuncContext, NumericLiteralAtomContext, NumericLiteralContext, ParenExpressionContext,
    ParenPredicateContext,
    PredicateContext, PrefixedNameIriRefContext, PrimitiveExpressionContext,
    QueryModificationParser, RandFuncContext, RdfLiteralAtomContext, RegexFuncContext, ReplaceFuncContext,
    RoundFuncContext,
    SameTermFuncContext,
    SearchConditionAndContext,
    SearchConditionContext, SearchConditionNotContext, SecondsFuncContext, Sha1FuncContext, Sha256FuncContext,
    Sha384FuncContext, Sha512FuncContext, StrAfterFuncContext, StrBeforeFuncContext, StrDtFuncContext,
    StrEndsFuncContext, StrFuncContext, StringLiteralAtomContext, StringLiteralOrVarRefContext, StrLangFuncContext,
    StrLenFuncContext,
    StrStartsFuncContext, StrUuidFuncContext,
    SubstrFuncContext, TermExpressionContext, TimezoneFuncContext, TzFuncContext, UcaseFuncContext,
    UnaryExpressionContext, UriFuncContext,
    UuidFuncContext,
    VarRefAtomContext, VarRefContext,
    YearFuncContext
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
    public result: any;
    constructor(
        validFields: Map[string],
        validVariables: Set<GQLVariableDefinition>,
        vars: Map[any],
        prefixes: Set<string>,
        source: string = 'filter'
    ) {
        super();

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
            case 'AbsFuncContext'          : return this.processAbsFunc(context.builtinCall());
            case 'BnodeFuncContext'        : return this.processBnodeFunc(context.builtinCall());
            case 'BoundFuncContext'        : return this.processBoundFunc(context.builtinCall());
            case 'CeilFuncContext'         : return this.processCeilFunc(context.builtinCall());
            case 'CoalesceFuncContext'     : return this.processCoalesceFunc(context.builtinCall());
            case 'ConcatFuncContext'       : return this.processConcatFunc(context.builtinCall());
            case 'ContainsFuncContext'     : return this.processContainsFunc(context.builtinCall());
            case 'DatatypeFuncContext'     : return this.processDatatypeFunc(context.builtinCall());
            case 'DayFuncContext'          : return this.processDayFunc(context.builtinCall());
            case 'EncodeForUriFuncContext' : return this.processEncodeForUriFunc(context.builtinCall());
            case 'ExistsFuncContext'       : return this.processExistsFunc(context.builtinCall());
            case 'FloorFuncContext'        : return this.processFloorFunc(context.builtinCall());
            case 'HoursFuncContext'        : return this.processHoursFunc(context.builtinCall());
            case 'IfFuncContext'           : return this.processIfFunc(context.builtinCall());
            case 'IriFuncContext'          : return this.processIriFunc(context.builtinCall());
            case 'IsBlankFuncContext'      : return this.processIsBlankFunc(context.builtinCall());
            case 'IsIriFuncContext'        : return this.processIsIriFunc(context.builtinCall());
            case 'IsLiteralFuncContext'    : return this.processIsLiteralFunc(context.builtinCall());
            case 'IsNumericFuncContext'    : return this.processIsNumericFunc(context.builtinCall());
            case 'IsURIFuncContext'        : return this.processIsURIFunc(context.builtinCall());
            case 'LangFuncContext'         : return this.processLangFunc(context.builtinCall());
            case 'LangMatchesFuncContext'  : return this.processLangMatchesFunc(context.builtinCall());
            case 'LcaseFuncContext'        : return this.processLcaseFunc(context.builtinCall());
            case 'Md5FuncContext'          : return this.processMd5Func(context.builtinCall());
            case 'MinutesFuncContext'      : return this.processMinutesFunc(context.builtinCall());
            case 'MonthFuncContext'        : return this.processMonthFunc(context.builtinCall());
            case 'NowFuncContext'          : return this.processNowFunc(context.builtinCall());
            case 'RandFuncContext'         : return this.processRandFunc(context.builtinCall());
            case 'RegexFuncContext'        : return this.processRegexFunc(context.builtinCall());
            case 'ReplaceFuncContext'      : return this.processReplaceFunc(context.builtinCall());
            case 'RoundFuncContext'        : return this.processRoundFunc(context.builtinCall());
            case 'SameTermFuncContext'     : return this.processSameTermFunc(context.builtinCall());
            case 'SecondsFuncContext'      : return this.processSecondsFunc(context.builtinCall());
            case 'Sha1FuncContext'         : return this.processSha1Func(context.builtinCall());
            case 'Sha256FuncContext'       : return this.processSha256Func(context.builtinCall());
            case 'Sha384FuncContext'       : return this.processSha384Func(context.builtinCall());
            case 'Sha512FuncContext'       : return this.processSha512Func(context.builtinCall());
            case 'StrFuncContext'          : return this.processStrFunc(context.builtinCall());
            case 'StrAfterFuncContext'     : return this.processStrAfterFunc(context.builtinCall());
            case 'StrBeforeFuncContext'    : return this.processStrBeforeFunc(context.builtinCall());
            case 'StrDtFuncContext'        : return this.processStrDtFunc(context.builtinCall());
            case 'StrEndsFuncContext'      : return this.processStrEndsFunc(context.builtinCall());
            case 'StrLangFuncContext'      : return this.processStrLangFunc(context.builtinCall());
            case 'StrLenFuncContext'       : return this.processStrLenFunc(context.builtinCall());
            case 'StrStartsFuncContext'    : return this.processStrStartsFunc(context.builtinCall());
            case 'StrUuidFuncContext'      : return this.processStrUuidFunc(context.builtinCall());
            case 'SubstrFuncContext'       : return this.processSubstrFunc(context.builtinCall());
            case 'TimezoneFuncContext'     : return this.processTimezoneFunc(context.builtinCall());
            case 'TzFuncContext'           : return this.processTzFunc(context.builtinCall());
            case 'UcaseFuncContext'        : return this.processUcaseFunc(context.builtinCall());
            case 'UriFuncContext'          : return this.processUriFunc(context.builtinCall());
            case 'UuidFuncContext'         : return this.processUuidFunc(context.builtinCall());
            case 'YearFuncContext'         : return this.processYearFunc(context.builtinCall());
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

    public processBoundFunc(context: BoundFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const expr = this.processFieldRef(context.fieldRef());
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`BOUND(${expr.expression})`, expr.dataType);
    }

    public processCeilFunc(context: CeilFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'CEIL', GQLObjectQueryModifierBuilderTypes.numeric);
    }

    public processCoalesceFunc(context: CoalesceFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expressionList().expression(), 'COALESCE', List(),
            context.iriRefOrVarRef().getText());
    }

    public processConcatFunc(context: ConcatFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expressionList().expression(),
            'CONCAT', List(string), 'xsd:string');
    }
    public processContainsFunc(context: ContainsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'CONTAINS', List(string), 'xsd:boolean');
    }
    public processDatatypeFunc(context: DatatypeFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'DATATYPE', string);
    }
    public processDayFunc(context: DayFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'DAY', dateTime, Some('xsd:integer'));
    }

    public processEncopublicorUriFunc(context: EncopublicorUriFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'ENCODE_FOR_URI', string);
    }

    public processExistsFunc(context: ExistsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const [s, o, p] = List(context.expression()).map(a => this.processExpression(a));
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`EXISTS { ${s} ${p} ${o} }`, 'xsd:boolean');
    }

    public processFloorFunc(context: Qmp.FloorFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'FLOOR', numeric);
    }
    public processHoursFunc(context: Qmp.HoursFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'HOURS', dateTime, Some('xsd:integer'));
    }

    public processIfFunc(context: IfFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const predicate = this.processpredicate(context.predicate());
        const trueExpr = this.processExpression(context.expression(0));
        const falseExpr = this.processExpression(context.expression(1));
        check(trueExpr.dataType === falseExpr.dataType,
            'mismatched return types for true and false branches of IF() builtin', context);
        return new GQLObjectQueryModifierBasicPrimitiveExpression(
            `IF(${prediate.expression}, ${trueExpr.expression}, ${falseExpr.expression})`, trueExpr.dataType
        );
    }

    public processIriFunc(context: IriFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IRI', List('xsd:string', 'iri'), Some('iri')); }

    public processIsBlankFunc(context: IsBlankFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IsBLANK', List.empty, Some('xsd:boolean')); }

    public processIsIriFunc(context: IsIriFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IsIRI', List.empty, Some('xsd:boolean')); }

    public processIsLiteralFunc(context: IsLiteralFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IsLITERAL', List.empty, Some('xsd:boolean')); }

    public processIsNumericFunc(context: IsNumericFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IsNUMERIC', List.empty, Some('xsd:boolean')); }

    public processIsURIFunc(context: IsURIFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'IsURI', List.empty, Some('xsd:boolean')); }

    public processLangFunc(context: LangFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'LANG', string, Some('xsd:string')); }

    public processLangMatchesFunc(context: LangMatchesFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'LANGMATCHES', List(string), 'xsd:boolean'); }

    public processLcaseFunc(context: LcaseFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'LCASE', string, Some('xsd:string')); }

    public processMd5Func(context: Md5FuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'MD5', string, Some('xsd:string')); }

    public processMinutesFunc(context: MinutesFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'MINUTES', dateTime, Some('xsd:integer')); }

    public processMonthFunc(context: MonthFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'MONTH', dateTime, Some('xsd:integer')); }

    public processNowFunc(context: NowFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.zeroArgBuiltin(context, 'NOW', 'xsd:dateTime'); }

    public processRandFunc(context: RandFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.zeroArgBuiltin(context, 'RAND', 'xsd:double'); }

    public processRegexFunc(context: RegexFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'REGEX', List(string), 'xsd:boolean'); }

    public processReplaceFunc(context: ReplaceFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'REPLACE', List(string), 'xsd:string'); }

    public processRoundFunc(context: RoundFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'ROUND', numeric); }

    public processSameTermFunc(context: SameTermFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`sameTerm(${List(context.fieldRef())
            .map(a => this.processFieldRef(a)).join(', ')}
)`, 'xsd:boolean'); }

    public processSecondsFunc(context: SecondsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'SECONDS', dateTime, Some('xsd:double')); }

    public processSha1Func(context: Sha1FuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'SHA1', string, Some('xsd:string')); }

    public processSha256Func(context: Sha256FuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'SHA256', string, Some('xsd:string')); }

    public processSha384Func(context: Sha384FuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'SHA384', string, Some('xsd:string')); }

    public processSha512Func(context: Sha512FuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'SHA512', string, Some('xsd:string')); }

    public processStrFunc(context: StrFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'STR', List.empty, Some('xsd:string')); }

    public processStrAfterFunc(context: StrAfterFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'STRAFTER', List(string), 'xsd:string'); }

    public processStrBeforeFunc(context: StrBeforeFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'STRBEFORE', List(string), 'xsd:string'); }

    public StrDtFunc(context: StrDtFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const str = this.processExpression(context.expression());
        check(string.contains(str.dataType),
            `wrong type for argument #1 of STRDT() builtin; expecting one of {xsd:string}, got '${str.dataType}'`,
            context);
        const iripublic = context.iriRefOrVarRef().getText();
        return new GQLObjectQueryModifierPrimitiveExpression(`STRDT(${str.expression}, ${iriDef})`, iriDef);
    }

    public processStrEndsFunc(context: StrEndsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'STRENDS', List(string), 'xsd:boolean'); }

    public processStrLangFunc(context: StrLangFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'STRLANG', List(string), 'xsd:string'); }

    public processStrLenFunc(context: StrLenFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'STRLEN', string, Some('xsd:integer')); }

    public processStrStartsFunc(context: StrStartsFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'STRSTARTS', List(string), 'xsd:boolean'); }

    public processStrUuidFunc(context: StrUuidFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.zeroArgBuiltin(context, 'STRUUID', 'xsd:string'); }

    public processSubstrFunc(context: SubstrFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.NArgBuiltin(context, context.expression(), 'SUBSTR', List(string, integer), 'xsd:string'); }

    public processTimezoneFunc(context: TimezoneFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'TIMEZONE', dateTime, Some('xsd:dayTimeDuration')); }

    public processTzFunc(context: TzFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'TZ', dateTime, Some('xsd:string')); }

    public processUcaseFunc(context: UcaseFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'UCASE', string, Some('xsd:string')); }

    public processUriFunc(context: UriFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'URI', List('xsd:string', 'iri'), Some('iri')); }

    public processUuidFunc(context: UuidFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.zeroArgBuiltin(context, 'UUID', 'iri'); }

    public processYearFunc(context: YearFuncContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.oneArgBuiltin(context, context.expression(), 'YEAR', dateTime, Some('integer')); }

    public processFunctionCallAtom(context: FunctionCallAtomContext) {
        const val = context.functionCall();
        if (val instanceof FuncWithoutArgsContext) { return this.processFuncWithoutArgs(val); }
        if (val instanceof FuncWithArgsContext) { return this.processFuncWithArgs(val); }
    }

    public processRdfLiteralAtom(context: RdfLiteralAtomContext) {
        const val = context.rdfLiteral();
        if (val instanceof LangRdfLiteralContext) {
            return new GQLObjectQueryModifierPrimitiveExpression(lang.getText(), 'xsd:string');
        }
        if (val instanceof DtRdfLiteralContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(dt.getText(), dt.iriRef().getText());
        }
    }

    public processStringLiteralAtom(context: StringLiteralAtomContext) {
        return new GQLObjectQueryModifierBasicPrimitiveExpression(context.getText(), 'xsd:string');
    }

    public processStringLiteralOrVarRef(context: StringLiteralOrVarRefContext) {
        const optOfStrLit = Option.of(context.stringLiteral());
        if (optOfStrLit.nonEmpty()) {
            return Option.of(optOfStrLit.value.getText()).getOrElse('');
        } else {
            const optOfVarRef = Option.of(context.varRef());
            if (optOfVarRef.nonEmpty()) {
                return this.processVarRef(optOfVarRef.value).expression;
            } else {
                return '';
            }
        }
    }

    public processIriRefOrVarRef(context: IriRefOrVarRefContext) {
        const optOfIriRef = Option.of(context.iriRef());
        if (optOfIriRef.nonEmpty()) {
            return this.processIriRef(optOfIriRef.value);
        } else {
            const optOfVarRef = Option.of(context.varRef());
            if (optOfVarRef.nonEmpty()) {
                return this.processVarRef(optOfVarRef.value);
            } else {
                return new GQLObjectQueryModifierBasicExpression(context.getText(), 'error');
            }
        }
    }

    public processNumericLiteralAtom(context: NumericLiteralAtomContext) {
        return this.processNumericLiteral(context.numericLiteral());
    }

    public processNumericLiteral(context: NumericLiteralContext) {
        if (context instanceof IntegerLiteralContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(context.getText(), 'xsd:integer');
        }
        if (context instanceof DecimalLiteralContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(context.getText(), 'xsd:decimal');
        }
        if (context instanceof DoubleLiteralContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(context.getText(), 'xsd:doubel');
        }
    }

    public processBooleanLiteralAtom(context: BooleanLiteralAtomContext) {
        return new GQLObjectQueryModifierBasicPrimitiveExpression(context.booleanLiteral().getText(), 'xsd:boolean');
    }

    public processIriRefAtom(context: IriRefAtomContext) {
        return this.processIriRef(context.iriRef());
    }

    public processIriRef(context: IriRefContext) {
        if (context instanceof LiteralIriRefContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(context.getText(), 'iri');
        }
        if (context instanceof PrefixedNameIriRefContext) {
            return new GQLObjectQueryModifierBasicPrimitiveExpression(context.prefixedName().getText(), 'iri');
        }
    }

    public processFieldRefAtom(context: FieldRefAtomContext): GQLObjectQueryModifierPrimitiveExpression {
        return this.processFieldRef(context.fieldRef());
    }

    public processFieldRef(context: FieldRefContext) {
        const field = context.getText();
        if (validFields.get(field)) {
            return new GQLObjectQueryModifierField(
                field === RDFQueryService.ID_KEY ? `?${RDFQueryService.SUBJECT_BINDING}` : `?${field}`, field.getType());
        } else {
            check(false, `invalid field reference '${field}'`, context);
        }
    }

    public processVarRefAtom(context: VarRefAtomContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        return this.processVarRef(context.varRef());
    }

    public processVarRef(context: VarRefContext): GQLObjectQueryModifierBasicPrimitiveExpression {
        const variable = context.VARNAME().getText();
        const vd = validVariables.find(a => a.name === variable);
        check(vd.isDefined(), `unknown variable reference '${variable}'`, context);
        const value = vars.get(variable);
        check(value.isDefined(), `no value provided for referenced variable '${variable}', vars: ${vars}`, context);
        const filterExpr = this.asDataType(value.getOrElse('error'));
        const t = vd ? vd[0].gqlType.xsdType : 'error';
        // TODO check() whether filterExpr.dataType == t
        return filterExpr;
    }

    public processFuncWithArgs(context: FuncWithArgsContext) {
        const returnType = context.prefixedName().getText();
        const funcName = context.iriRef().getText();
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`${funcName}(
            ${List(context.expressionList().expression()).map(a => this.processExpression(a)).map(a => a.expression).join(', ')}
        )`, returnType);
    }

    public processFuncWithoutArgs(context: FuncWithoutArgsContext) {
        const returnType = context.prefixedName().getText();
        const funcName = context.iriRef().getText();
        return new GQLObjectQueryModifierBasicPrimitiveExpression(`${funcName}()`, returnType);
    }

    public quotedDataType(value: Any, dataType: Option<string>): GQLObjectQueryModifierBasicPrimitiveExpression {
        const s = `"${value}"${
                dataType.nonEmpty() ? `^^${dataType.value}` : ''
            }`;
        return new GQLObjectQueryModifierBasicPrimitiveExpression(s, dataType.getOrElse('xsd:string'), Some(value));
    }

    public asDataType(value: Any): GQLObjectQueryModifierBasicPrimitiveExpression {
        if (value instanceof Number) {
            if (value.toString().includes('.')) {
                return this.quotedDataType(value, Some('xsd:double'));
            }
            return this.quotedDataType(value, Some('xsd:integer'));
        }
        if (value instanceof List) {
            const recValue = value.map(a => this.asDataType(a));
            if (recValue instanceof List && recValue.isEmpty()) {
                return new GQLObjectQueryModifierBasicPrimitiveExpression('', 'xsd:string');
            }
            if (recValue instanceof List) {
                return new GQLObjectQueryModifierBasicPrimitiveExpression(recValue
                    .map(a => a.expression).join(', '), recValue.first().dataType);
            }
        }
        if (value instanceof String) {
            if (GQLObjectQueryModifierBuilderTypes.rDATETIME_PATTERN.test(value)) {
                const regexed = GQLObjectQueryModifierBuilderTypes.rDATETIME_PATTERN.exec(value).split('-');
                return this.quotedDataType(`${regexed[0]}T${rexeged[1]}${Option.of(regexed[2]).getOrElse('')}`, Some('xsd:dateTime'));
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
            if (GQLObjectQueryModifierBuilderTypes.rPREFIXED_IRI_PATTERN.test(value)) {
                const regexed = GQLObjectQueryModifierBuilderTypes.rPREFIXED_IRI_PATTERN.exec(value).split('_');
                return new GQLObjectQueryModifierBasicPrimitiveExpression(`${regexed[0]}:${regexed[1]}`, 'iri');
            }
            if (GQLObjectQueryModifierBuilderTypes.rIRI_PATTERN.test(value)) {
                return new GQLObjectQueryModifierBasicPrimitiveExpression(value, 'iri');
            } else {
                return this.quotedDataType(value, None);
            }
        }
    }

    public processParenExpression(context: ParenExpressionContext) {
        const expr = this.processExpression(context.expression());
        return new GQLObjectQueryModifierBasicExpression(`(${expr.expression()})`, expr.dataType);
    }

    public processUnaryExpression(context: UnaryExpressionContext) {
        const op = context.unaryOp().getText() === '-' ? '-' : '';
        const expr = this.processExpression(context.expression());
        check(GQLObjectQueryModifierBuilderTypes.numeric.contains(expr.dataType),
            `invalid unary expression; expecting numeric but got ${expr.dataType } expression`, context);
        return new GQLObjectQueryModifierBasicExpression(`${op}${expr.expression()}`, expr.dataType);
    }

    public processFactorExpression(context: FactorExpressionContext) {
        const op = context.factorOp().getText();
        const lhs = this.processExpression(context.expression(0));
        const rhs = this.processExpression(context.expression(1));
        check(GQLObjectQueryModifierBuilderTypes.numeric.contains(lhs.dataType),
            `invalid binary expression with '$op'; expecting numeric but got ${lhs.dataType } left operand`, context);
        check(GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
            `invalid binary expression with '$op'; expecting numeric but got ${rhs.dataType } right operand`, context);
        return new GQLObjectQueryModifierBasicExpression(`${lhs.expression()} ${op} ${rhs.expression()}`,
            this.resolveTypes(lhs.dataType, rhs.dataType));

    }

    public processTermExpression(context: TermExpressionContext) {
        const op = context.termOp().getText;
        const lhs = this.processExpression(context.expression(0));
        const rhs = this.processExpression(context.expression(1));
        check(GQLObjectQueryModifierBuilderTypes.numeric.contains(lhs.dataType),
             `invalid binary expression with '$op'; expecting numeric but got ${lhs.dataType } left operand`, context);
        check(GQLObjectQueryModifierBuilderTypes.numeric.contains(rhs.dataType),
            `invalid binary expression with '$op'; expecting numeric but got ${rhs.dataType } right operand`, context);
        return new GQLObjectQueryModifierBasicExpression(`${lhs.expression()}, ${op} ${rhs.expression()}`,
            this.resolveTypes(lhs.dataType, rhs.dataType));
    }

    public resolveTypes(t1: string, t2: string): string {
        const typeSize = Map({'integer': 0, 'decimal': 1, 'double': 2});
        const s1 = typeSize.get(t1) || -1;
        const s2 = typeSize.get(t2) || -2;
        return s1 >= s2 ? t1 : t2;
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
    DATE_PATTERN      : '(\\d{4}-\\d{2}-\\d{2})',
    TIME_PATTERN      : '(\\d{2}:\\d{2}:\\d{2})',
    TZ_PATTERN        : '(Z|[-+]\\d{2}:\\d{2})',
    DATETIME_PATTERN  : `${this.DATE_PATTERN}[T | ]${this.TIME_PATTERN$TZ_PATTERN}?`,
    rDATETIME_PATTERN : new RegExp(this.DATETIME_PATTERN),
    rDATE_PATTERN     : new RegExp(this.DATE_PATTERN),
    rTIME_PATTERN     : new RegExp(this.TIME_PATTERN),
    URI_PATTERN       : '(https?://.*)',
    rURI_PATTERN      : new RegExp(this.URI_PATTERN),
    IRI_PATTERN       : '(<https?://.*>)',
    rIRI_PATTERN      : new RegExp(this.IRI_PATTERN),
    PREFIXED_IRI_PATTERN = `(${prefixes.join('|')})_(.*)`,
    rPREFIXED_IRI_PATTERN = new RegExp(PREFIXED_IRI_PATTERN),
};
