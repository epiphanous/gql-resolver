import { ATN } from "antlr4ts/atn/ATN";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { RuleContext } from "antlr4ts/RuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { QueryModificationListener } from "./QueryModificationListener";
export declare class QueryModificationParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly T__13 = 14;
    static readonly T__14 = 15;
    static readonly T__15 = 16;
    static readonly T__16 = 17;
    static readonly T__17 = 18;
    static readonly T__18 = 19;
    static readonly T__19 = 20;
    static readonly T__20 = 21;
    static readonly T__21 = 22;
    static readonly T__22 = 23;
    static readonly T__23 = 24;
    static readonly ABS = 25;
    static readonly AND = 26;
    static readonly AS = 27;
    static readonly ASC = 28;
    static readonly BIND = 29;
    static readonly BNODE = 30;
    static readonly BOOST = 31;
    static readonly BOUND = 32;
    static readonly CEIL = 33;
    static readonly COALESCE = 34;
    static readonly CONCAT = 35;
    static readonly CONTAINS = 36;
    static readonly DATATYPE = 37;
    static readonly DAY = 38;
    static readonly DESC = 39;
    static readonly ENCODE_FOR_URI = 40;
    static readonly EXISTS = 41;
    static readonly FALSE = 42;
    static readonly FLOOR = 43;
    static readonly GEOMATCH = 44;
    static readonly HOURS = 45;
    static readonly IF = 46;
    static readonly IF_FOLLOWED_BY = 47;
    static readonly IF_FOLLOWS = 48;
    static readonly IN = 49;
    static readonly IRI = 50;
    static readonly ISBLANK = 51;
    static readonly ISIRI = 52;
    static readonly ISLITERAL = 53;
    static readonly ISNUMERIC = 54;
    static readonly ISURI = 55;
    static readonly LANG = 56;
    static readonly LANGMATCHES = 57;
    static readonly LATLON = 58;
    static readonly LCASE = 59;
    static readonly LOSS_TO = 60;
    static readonly MAX_HITS = 61;
    static readonly MD5 = 62;
    static readonly MIN_SCORE = 63;
    static readonly MINUTES = 64;
    static readonly MONTH = 65;
    static readonly NEAR = 66;
    static readonly NOT = 67;
    static readonly NOW = 68;
    static readonly OBFUSCATE = 69;
    static readonly OF = 70;
    static readonly OR = 71;
    static readonly RAND = 72;
    static readonly REGEX = 73;
    static readonly REPLACE = 74;
    static readonly ROUND = 75;
    static readonly SAMETERM = 76;
    static readonly SECONDS = 77;
    static readonly SHA1 = 78;
    static readonly SHA256 = 79;
    static readonly SHA384 = 80;
    static readonly SHA512 = 81;
    static readonly STR = 82;
    static readonly STRAFTER = 83;
    static readonly STRBEFORE = 84;
    static readonly STRDT = 85;
    static readonly STRENDS = 86;
    static readonly STRLANG = 87;
    static readonly STRLEN = 88;
    static readonly STRSTARTS = 89;
    static readonly STRUUID = 90;
    static readonly SUBJECT = 91;
    static readonly SUBSTR = 92;
    static readonly TEXTMATCH = 93;
    static readonly TIMEZONE = 94;
    static readonly TO_UNIT = 95;
    static readonly TRUE = 96;
    static readonly TZ = 97;
    static readonly UCASE = 98;
    static readonly URI = 99;
    static readonly UUID = 100;
    static readonly WITHIN = 101;
    static readonly YEAR = 102;
    static readonly YOU_MAY_KNOW = 103;
    static readonly IRI_REF = 104;
    static readonly PNAME_NS = 105;
    static readonly PNAME_LN = 106;
    static readonly BLANK_NODE_LABEL = 107;
    static readonly LANGTAG = 108;
    static readonly INTEGER = 109;
    static readonly DECIMAL = 110;
    static readonly DOUBLE = 111;
    static readonly EXPONENT = 112;
    static readonly STRING_LITERAL1 = 113;
    static readonly STRING_LITERAL2 = 114;
    static readonly ECHAR = 115;
    static readonly EMPTY_PARENS = 116;
    static readonly ANON = 117;
    static readonly VARNAME = 118;
    static readonly PN_PREFIX = 119;
    static readonly PN_LOCAL = 120;
    static readonly WS = 121;
    static readonly RULE_filter = 0;
    static readonly RULE_patterns = 1;
    static readonly RULE_boosters = 2;
    static readonly RULE_bindings = 3;
    static readonly RULE_orderBys = 4;
    static readonly RULE_orderBy = 5;
    static readonly RULE_transforms = 6;
    static readonly RULE_transform = 7;
    static readonly RULE_searchCondition = 8;
    static readonly RULE_searchConditionAnd = 9;
    static readonly RULE_searchConditionNot = 10;
    static readonly RULE_predicate = 11;
    static readonly RULE_expression = 12;
    static readonly RULE_expressionAtom = 13;
    static readonly RULE_builtinCall = 14;
    static readonly RULE_pattern = 15;
    static readonly RULE_textMatchParam = 16;
    static readonly RULE_boost = 17;
    static readonly RULE_binding = 18;
    static readonly RULE_expressionList = 19;
    static readonly RULE_featureOrLatLon = 20;
    static readonly RULE_proximitySpec = 21;
    static readonly RULE_functionCall = 22;
    static readonly RULE_rdfLiteral = 23;
    static readonly RULE_numericLiteral = 24;
    static readonly RULE_varRef = 25;
    static readonly RULE_fieldRef = 26;
    static readonly RULE_comparisonOp = 27;
    static readonly RULE_unaryOp = 28;
    static readonly RULE_factorOp = 29;
    static readonly RULE_termOp = 30;
    static readonly RULE_stringLiteral = 31;
    static readonly RULE_stringLiteralOrVarRef = 32;
    static readonly RULE_booleanLiteral = 33;
    static readonly RULE_iriRefOrVarRef = 34;
    static readonly RULE_numericLiteralOrVarRef = 35;
    static readonly RULE_iriRef = 36;
    static readonly RULE_prefixedName = 37;
    static readonly RULE_blankNode = 38;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    constructor(input: TokenStream);
    filter(): FilterContext;
    patterns(): PatternsContext;
    boosters(): BoostersContext;
    bindings(): BindingsContext;
    orderBys(): OrderBysContext;
    orderBy(): OrderByContext;
    transforms(): TransformsContext;
    transform(): TransformContext;
    searchCondition(): SearchConditionContext;
    searchConditionAnd(): SearchConditionAndContext;
    searchConditionNot(): SearchConditionNotContext;
    predicate(): PredicateContext;
    expression(): ExpressionContext;
    expression(_p: number): ExpressionContext;
    expressionAtom(): ExpressionAtomContext;
    builtinCall(): BuiltinCallContext;
    pattern(): PatternContext;
    textMatchParam(): TextMatchParamContext;
    boost(): BoostContext;
    binding(): BindingContext;
    expressionList(): ExpressionListContext;
    featureOrLatLon(): FeatureOrLatLonContext;
    proximitySpec(): ProximitySpecContext;
    functionCall(): FunctionCallContext;
    rdfLiteral(): RdfLiteralContext;
    numericLiteral(): NumericLiteralContext;
    varRef(): VarRefContext;
    fieldRef(): FieldRefContext;
    comparisonOp(): ComparisonOpContext;
    unaryOp(): UnaryOpContext;
    factorOp(): FactorOpContext;
    termOp(): TermOpContext;
    stringLiteral(): StringLiteralContext;
    stringLiteralOrVarRef(): StringLiteralOrVarRefContext;
    booleanLiteral(): BooleanLiteralContext;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    numericLiteralOrVarRef(): NumericLiteralOrVarRefContext;
    iriRef(): IriRefContext;
    prefixedName(): PrefixedNameContext;
    blankNode(): BlankNodeContext;
    sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean;
    private expression_sempred;
    private static readonly _serializedATNSegments;
    private static readonly _serializedATNSegment0;
    private static readonly _serializedATNSegment1;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
export declare class FilterContext extends ParserRuleContext {
    searchCondition(): SearchConditionContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PatternsContext extends ParserRuleContext {
    pattern(): PatternContext[];
    pattern(i: number): PatternContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BoostersContext extends ParserRuleContext {
    boost(): BoostContext[];
    boost(i: number): BoostContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BindingsContext extends ParserRuleContext {
    binding(): BindingContext[];
    binding(i: number): BindingContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class OrderBysContext extends ParserRuleContext {
    orderBy(): OrderByContext[];
    orderBy(i: number): OrderByContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class OrderByContext extends ParserRuleContext {
    expression(): ExpressionContext;
    ASC(): TerminalNode | undefined;
    DESC(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TransformsContext extends ParserRuleContext {
    transform(): TransformContext[];
    transform(i: number): TransformContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TransformContext extends ParserRuleContext {
    TO_UNIT(): TerminalNode | undefined;
    iriRefOrVarRef(): IriRefOrVarRefContext | undefined;
    ABS(): TerminalNode | undefined;
    CEIL(): TerminalNode | undefined;
    FLOOR(): TerminalNode | undefined;
    LCASE(): TerminalNode | undefined;
    MD5(): TerminalNode | undefined;
    OBFUSCATE(): TerminalNode | undefined;
    ROUND(): TerminalNode | undefined;
    SHA1(): TerminalNode | undefined;
    SHA256(): TerminalNode | undefined;
    SHA384(): TerminalNode | undefined;
    SHA512(): TerminalNode | undefined;
    UCASE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SearchConditionContext extends ParserRuleContext {
    searchConditionAnd(): SearchConditionAndContext[];
    searchConditionAnd(i: number): SearchConditionAndContext;
    OR(): TerminalNode[];
    OR(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SearchConditionAndContext extends ParserRuleContext {
    searchConditionNot(): SearchConditionNotContext[];
    searchConditionNot(i: number): SearchConditionNotContext;
    AND(): TerminalNode[];
    AND(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SearchConditionNotContext extends ParserRuleContext {
    predicate(): PredicateContext;
    NOT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PredicateContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: PredicateContext): void;
}
export declare class ComparisonPredicateContext extends PredicateContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    comparisonOp(): ComparisonOpContext;
    constructor(ctx: PredicateContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class InPredicateContext extends PredicateContext {
    expression(): ExpressionContext;
    IN(): TerminalNode;
    expressionList(): ExpressionListContext;
    NOT(): TerminalNode | undefined;
    constructor(ctx: PredicateContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class InVarPredicateContext extends PredicateContext {
    expression(): ExpressionContext;
    IN(): TerminalNode;
    varRef(): VarRefContext;
    NOT(): TerminalNode | undefined;
    constructor(ctx: PredicateContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ParenPredicateContext extends PredicateContext {
    searchCondition(): SearchConditionContext;
    constructor(ctx: PredicateContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ExpressionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: ExpressionContext): void;
}
export declare class UnaryExpressionContext extends ExpressionContext {
    unaryOp(): UnaryOpContext;
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FactorExpressionContext extends ExpressionContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    factorOp(): FactorOpContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TermExpressionContext extends ExpressionContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    termOp(): TermOpContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PrimitiveExpressionContext extends ExpressionContext {
    expressionAtom(): ExpressionAtomContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ParenExpressionContext extends ExpressionContext {
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ExpressionAtomContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: ExpressionAtomContext): void;
}
export declare class BuiltinCallAtomContext extends ExpressionAtomContext {
    builtinCall(): BuiltinCallContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FunctionCallAtomContext extends ExpressionAtomContext {
    functionCall(): FunctionCallContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class RdfLiteralAtomContext extends ExpressionAtomContext {
    rdfLiteral(): RdfLiteralContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StringLiteralAtomContext extends ExpressionAtomContext {
    stringLiteral(): StringLiteralContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class NumericLiteralAtomContext extends ExpressionAtomContext {
    numericLiteral(): NumericLiteralContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BooleanLiteralAtomContext extends ExpressionAtomContext {
    booleanLiteral(): BooleanLiteralContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IriRefAtomContext extends ExpressionAtomContext {
    iriRef(): IriRefContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FieldRefAtomContext extends ExpressionAtomContext {
    fieldRef(): FieldRefContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class VarRefAtomContext extends ExpressionAtomContext {
    varRef(): VarRefContext;
    constructor(ctx: ExpressionAtomContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BuiltinCallContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: BuiltinCallContext): void;
}
export declare class AbsFuncContext extends BuiltinCallContext {
    ABS(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BoundFuncContext extends BuiltinCallContext {
    BOUND(): TerminalNode;
    fieldRef(): FieldRefContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class CeilFuncContext extends BuiltinCallContext {
    CEIL(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class CoalesceFuncContext extends BuiltinCallContext {
    COALESCE(): TerminalNode;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    expressionList(): ExpressionListContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ConcatFuncContext extends BuiltinCallContext {
    CONCAT(): TerminalNode;
    expressionList(): ExpressionListContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ContainsFuncContext extends BuiltinCallContext {
    CONTAINS(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class DatatypeFuncContext extends BuiltinCallContext {
    DATATYPE(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class DayFuncContext extends BuiltinCallContext {
    DAY(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class EncodeForUriFuncContext extends BuiltinCallContext {
    ENCODE_FOR_URI(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ExistsFuncContext extends BuiltinCallContext {
    EXISTS(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FloorFuncContext extends BuiltinCallContext {
    FLOOR(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class HoursFuncContext extends BuiltinCallContext {
    HOURS(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IfFuncContext extends BuiltinCallContext {
    IF(): TerminalNode;
    predicate(): PredicateContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IriFuncContext extends BuiltinCallContext {
    IRI(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IsBlankFuncContext extends BuiltinCallContext {
    ISBLANK(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IsIriFuncContext extends BuiltinCallContext {
    ISIRI(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IsLiteralFuncContext extends BuiltinCallContext {
    ISLITERAL(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IsNumericFuncContext extends BuiltinCallContext {
    ISNUMERIC(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IsURIFuncContext extends BuiltinCallContext {
    ISURI(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class LangFuncContext extends BuiltinCallContext {
    LANG(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class LangMatchesFuncContext extends BuiltinCallContext {
    LANGMATCHES(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class LcaseFuncContext extends BuiltinCallContext {
    LCASE(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class Md5FuncContext extends BuiltinCallContext {
    MD5(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class MinutesFuncContext extends BuiltinCallContext {
    MINUTES(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class MonthFuncContext extends BuiltinCallContext {
    MONTH(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class NowFuncContext extends BuiltinCallContext {
    NOW(): TerminalNode;
    EMPTY_PARENS(): TerminalNode;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class RandFuncContext extends BuiltinCallContext {
    RAND(): TerminalNode;
    EMPTY_PARENS(): TerminalNode;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class RegexFuncContext extends BuiltinCallContext {
    REGEX(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ReplaceFuncContext extends BuiltinCallContext {
    REPLACE(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class RoundFuncContext extends BuiltinCallContext {
    ROUND(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SameTermFuncContext extends BuiltinCallContext {
    SAMETERM(): TerminalNode;
    fieldRef(): FieldRefContext[];
    fieldRef(i: number): FieldRefContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SecondsFuncContext extends BuiltinCallContext {
    SECONDS(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class Sha1FuncContext extends BuiltinCallContext {
    SHA1(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class Sha256FuncContext extends BuiltinCallContext {
    SHA256(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class Sha384FuncContext extends BuiltinCallContext {
    SHA384(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class Sha512FuncContext extends BuiltinCallContext {
    SHA512(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrFuncContext extends BuiltinCallContext {
    STR(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrAfterFuncContext extends BuiltinCallContext {
    STRAFTER(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrBeforeFuncContext extends BuiltinCallContext {
    STRBEFORE(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrDtFuncContext extends BuiltinCallContext {
    STRDT(): TerminalNode;
    expression(): ExpressionContext;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrEndsFuncContext extends BuiltinCallContext {
    STRENDS(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrLangFuncContext extends BuiltinCallContext {
    STRLANG(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrLenFuncContext extends BuiltinCallContext {
    STRLEN(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrStartsFuncContext extends BuiltinCallContext {
    STRSTARTS(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StrUuidFuncContext extends BuiltinCallContext {
    STRUUID(): TerminalNode;
    EMPTY_PARENS(): TerminalNode;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class SubstrFuncContext extends BuiltinCallContext {
    SUBSTR(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TimezoneFuncContext extends BuiltinCallContext {
    TIMEZONE(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TzFuncContext extends BuiltinCallContext {
    TZ(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class UcaseFuncContext extends BuiltinCallContext {
    UCASE(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class UriFuncContext extends BuiltinCallContext {
    URI(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class UuidFuncContext extends BuiltinCallContext {
    UUID(): TerminalNode;
    EMPTY_PARENS(): TerminalNode;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class YearFuncContext extends BuiltinCallContext {
    YEAR(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: BuiltinCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PatternContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: PatternContext): void;
}
export declare class TextMatchPatternContext extends PatternContext {
    stringLiteralOrVarRef(): StringLiteralOrVarRefContext;
    TEXTMATCH(): TerminalNode | undefined;
    GEOMATCH(): TerminalNode | undefined;
    fieldRef(): FieldRefContext | undefined;
    textMatchParam(): TextMatchParamContext[];
    textMatchParam(i: number): TextMatchParamContext;
    constructor(ctx: PatternContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class GeoNearbyPatternContext extends PatternContext {
    WITHIN(): TerminalNode;
    proximitySpec(): ProximitySpecContext;
    OF(): TerminalNode;
    featureOrLatLon(): FeatureOrLatLonContext;
    fieldRef(): FieldRefContext | undefined;
    constructor(ctx: PatternContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TextMatchParamContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: TextMatchParamContext): void;
}
export declare class TextMatchBoostParamContext extends TextMatchParamContext {
    BOOST(): TerminalNode;
    numericLiteral(): NumericLiteralContext;
    constructor(ctx: TextMatchParamContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TextMatchMinScoreParamContext extends TextMatchParamContext {
    MIN_SCORE(): TerminalNode;
    DECIMAL(): TerminalNode;
    constructor(ctx: TextMatchParamContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TextMatchMaxHitsParamContext extends TextMatchParamContext {
    MAX_HITS(): TerminalNode;
    INTEGER(): TerminalNode;
    constructor(ctx: TextMatchParamContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BoostContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: BoostContext): void;
}
export declare class FollowsUserBoostContext extends BoostContext {
    numericLiteral(): NumericLiteralContext;
    IF_FOLLOWS(): TerminalNode;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    BOOST(): TerminalNode | undefined;
    constructor(ctx: BoostContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FollowedByUserBoostContext extends BoostContext {
    numericLiteral(): NumericLiteralContext;
    IF_FOLLOWED_BY(): TerminalNode;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    BOOST(): TerminalNode | undefined;
    constructor(ctx: BoostContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BindingContext extends ParserRuleContext {
    BIND(): TerminalNode;
    expression(): ExpressionContext;
    AS(): TerminalNode;
    VARNAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ExpressionListContext extends ParserRuleContext {
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FeatureOrLatLonContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: FeatureOrLatLonContext): void;
}
export declare class VarFeatureContext extends FeatureOrLatLonContext {
    varRef(): VarRefContext;
    constructor(ctx: FeatureOrLatLonContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FeatureContext extends FeatureOrLatLonContext {
    iriRef(): IriRefContext;
    constructor(ctx: FeatureOrLatLonContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class LatLonContext extends FeatureOrLatLonContext {
    LATLON(): TerminalNode;
    varRef(): VarRefContext[];
    varRef(i: number): VarRefContext;
    numericLiteral(): NumericLiteralContext[];
    numericLiteral(i: number): NumericLiteralContext;
    constructor(ctx: FeatureOrLatLonContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ProximitySpecContext extends ParserRuleContext {
    numericLiteralOrVarRef(): NumericLiteralOrVarRefContext;
    iriRefOrVarRef(): IriRefOrVarRefContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FunctionCallContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: FunctionCallContext): void;
}
export declare class FuncWithoutArgsContext extends FunctionCallContext {
    iriRef(): IriRefContext;
    prefixedName(): PrefixedNameContext;
    EMPTY_PARENS(): TerminalNode;
    constructor(ctx: FunctionCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FuncWithArgsContext extends FunctionCallContext {
    iriRef(): IriRefContext;
    prefixedName(): PrefixedNameContext;
    expressionList(): ExpressionListContext;
    constructor(ctx: FunctionCallContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class RdfLiteralContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: RdfLiteralContext): void;
}
export declare class LangRdfLiteralContext extends RdfLiteralContext {
    stringLiteral(): StringLiteralContext;
    LANGTAG(): TerminalNode;
    constructor(ctx: RdfLiteralContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class DtRdfLiteralContext extends RdfLiteralContext {
    stringLiteral(): StringLiteralContext;
    iriRef(): IriRefContext;
    constructor(ctx: RdfLiteralContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class NumericLiteralContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: NumericLiteralContext): void;
}
export declare class IntegerLiteralContext extends NumericLiteralContext {
    INTEGER(): TerminalNode;
    constructor(ctx: NumericLiteralContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class DecimalLiteralContext extends NumericLiteralContext {
    DECIMAL(): TerminalNode;
    constructor(ctx: NumericLiteralContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class DoubleLiteralContext extends NumericLiteralContext {
    DOUBLE(): TerminalNode;
    constructor(ctx: NumericLiteralContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class VarRefContext extends ParserRuleContext {
    VARNAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FieldRefContext extends ParserRuleContext {
    VARNAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class ComparisonOpContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class UnaryOpContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class FactorOpContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class TermOpContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StringLiteralContext extends ParserRuleContext {
    STRING_LITERAL1(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class StringLiteralOrVarRefContext extends ParserRuleContext {
    stringLiteral(): StringLiteralContext | undefined;
    varRef(): VarRefContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BooleanLiteralContext extends ParserRuleContext {
    TRUE(): TerminalNode | undefined;
    FALSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IriRefOrVarRefContext extends ParserRuleContext {
    iriRef(): IriRefContext | undefined;
    varRef(): VarRefContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class NumericLiteralOrVarRefContext extends ParserRuleContext {
    numericLiteral(): NumericLiteralContext | undefined;
    varRef(): VarRefContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class IriRefContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: IriRefContext): void;
}
export declare class LiteralIriRefContext extends IriRefContext {
    IRI_REF(): TerminalNode;
    constructor(ctx: IriRefContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PrefixedNameIriRefContext extends IriRefContext {
    prefixedName(): PrefixedNameContext;
    constructor(ctx: IriRefContext);
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class PrefixedNameContext extends ParserRuleContext {
    PNAME_LN(): TerminalNode | undefined;
    PNAME_NS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
export declare class BlankNodeContext extends ParserRuleContext {
    BLANK_NODE_LABEL(): TerminalNode | undefined;
    ANON(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: QueryModificationListener): void;
    exitRule(listener: QueryModificationListener): void;
}
