// Generated from QueryModification.g4 by ANTLR 4.6-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { TextMatchPatternContext } from './QueryModificationParser';
import { GeoNearbyPatternContext } from './QueryModificationParser';
import { FeatureContext } from './QueryModificationParser';
import { LatLonContext } from './QueryModificationParser';
import { VarFeatureContext } from './QueryModificationParser';
import { ComparisonPredicateContext } from './QueryModificationParser';
import { InVarPredicateContext } from './QueryModificationParser';
import { InPredicateContext } from './QueryModificationParser';
import { ParenPredicateContext } from './QueryModificationParser';
import { FieldRefAtomContext } from './QueryModificationParser';
import { FunctionCallAtomContext } from './QueryModificationParser';
import { BuiltinCallAtomContext } from './QueryModificationParser';
import { RdfLiteralAtomContext } from './QueryModificationParser';
import { StringLiteralAtomContext } from './QueryModificationParser';
import { IriRefAtomContext } from './QueryModificationParser';
import { NumericLiteralAtomContext } from './QueryModificationParser';
import { BooleanLiteralAtomContext } from './QueryModificationParser';
import { VarRefAtomContext } from './QueryModificationParser';
import { LangRdfLiteralContext } from './QueryModificationParser';
import { DtRdfLiteralContext } from './QueryModificationParser';
import { DecimalLiteralContext } from './QueryModificationParser';
import { DoubleLiteralContext } from './QueryModificationParser';
import { IntegerLiteralContext } from './QueryModificationParser';
import { PrimitiveExpressionContext } from './QueryModificationParser';
import { FactorExpressionContext } from './QueryModificationParser';
import { ParenExpressionContext } from './QueryModificationParser';
import { UnaryExpressionContext } from './QueryModificationParser';
import { TermExpressionContext } from './QueryModificationParser';
import { TextMatchMinScoreParamContext } from './QueryModificationParser';
import { TextMatchMaxHitsParamContext } from './QueryModificationParser';
import { TextMatchBoostParamContext } from './QueryModificationParser';
import { FuncWithArgsContext } from './QueryModificationParser';
import { FuncWithoutArgsContext } from './QueryModificationParser';
import { LiteralIriRefContext } from './QueryModificationParser';
import { PrefixedNameIriRefContext } from './QueryModificationParser';
import { IsLiteralFuncContext } from './QueryModificationParser';
import { StrStartsFuncContext } from './QueryModificationParser';
import { ReplaceFuncContext } from './QueryModificationParser';
import { BoundFuncContext } from './QueryModificationParser';
import { Sha512FuncContext } from './QueryModificationParser';
import { UcaseFuncContext } from './QueryModificationParser';
import { EncodeForUriFuncContext } from './QueryModificationParser';
import { YearFuncContext } from './QueryModificationParser';
import { StrBeforeFuncContext } from './QueryModificationParser';
import { Sha256FuncContext } from './QueryModificationParser';
import { FloorFuncContext } from './QueryModificationParser';
import { IriFuncContext } from './QueryModificationParser';
import { StrEndsFuncContext } from './QueryModificationParser';
import { LcaseFuncContext } from './QueryModificationParser';
import { ConcatFuncContext } from './QueryModificationParser';
import { StrLenFuncContext } from './QueryModificationParser';
import { TzFuncContext } from './QueryModificationParser';
import { DatatypeFuncContext } from './QueryModificationParser';
import { RegexFuncContext } from './QueryModificationParser';
import { LangMatchesFuncContext } from './QueryModificationParser';
import { Sha384FuncContext } from './QueryModificationParser';
import { MinutesFuncContext } from './QueryModificationParser';
import { SecondsFuncContext } from './QueryModificationParser';
import { StrLangFuncContext } from './QueryModificationParser';
import { StrUuidFuncContext } from './QueryModificationParser';
import { AbsFuncContext } from './QueryModificationParser';
import { DayFuncContext } from './QueryModificationParser';
import { NowFuncContext } from './QueryModificationParser';
import { StrAfterFuncContext } from './QueryModificationParser';
import { CeilFuncContext } from './QueryModificationParser';
import { TimezoneFuncContext } from './QueryModificationParser';
import { SameTermFuncContext } from './QueryModificationParser';
import { IsBlankFuncContext } from './QueryModificationParser';
import { RandFuncContext } from './QueryModificationParser';
import { StrFuncContext } from './QueryModificationParser';
import { BnodeFuncContext } from './QueryModificationParser';
import { HoursFuncContext } from './QueryModificationParser';
import { Md5FuncContext } from './QueryModificationParser';
import { ContainsFuncContext } from './QueryModificationParser';
import { RoundFuncContext } from './QueryModificationParser';
import { StrDtFuncContext } from './QueryModificationParser';
import { Sha1FuncContext } from './QueryModificationParser';
import { MonthFuncContext } from './QueryModificationParser';
import { IfFuncContext } from './QueryModificationParser';
import { IsIriFuncContext } from './QueryModificationParser';
import { SubstrFuncContext } from './QueryModificationParser';
import { IsNumericFuncContext } from './QueryModificationParser';
import { UuidFuncContext } from './QueryModificationParser';
import { LangFuncContext } from './QueryModificationParser';
import { CoalesceFuncContext } from './QueryModificationParser';
import { IsURIFuncContext } from './QueryModificationParser';
import { UriFuncContext } from './QueryModificationParser';
import { ExistsFuncContext } from './QueryModificationParser';
import { FollowsUserBoostContext } from './QueryModificationParser';
import { FollowedByUserBoostContext } from './QueryModificationParser';
import { FilterContext } from './QueryModificationParser';
import { PatternsContext } from './QueryModificationParser';
import { BoostersContext } from './QueryModificationParser';
import { BindingsContext } from './QueryModificationParser';
import { OrderBysContext } from './QueryModificationParser';
import { OrderByContext } from './QueryModificationParser';
import { TransformsContext } from './QueryModificationParser';
import { TransformContext } from './QueryModificationParser';
import { SearchConditionContext } from './QueryModificationParser';
import { SearchConditionAndContext } from './QueryModificationParser';
import { SearchConditionNotContext } from './QueryModificationParser';
import { PredicateContext } from './QueryModificationParser';
import { ExpressionContext } from './QueryModificationParser';
import { ExpressionAtomContext } from './QueryModificationParser';
import { BuiltinCallContext } from './QueryModificationParser';
import { PatternContext } from './QueryModificationParser';
import { TextMatchParamContext } from './QueryModificationParser';
import { BoostContext } from './QueryModificationParser';
import { BindingContext } from './QueryModificationParser';
import { FeatureOrLatLonContext } from './QueryModificationParser';
import { ProximitySpecContext } from './QueryModificationParser';
import { FunctionCallContext } from './QueryModificationParser';
import { RdfLiteralContext } from './QueryModificationParser';
import { NumericLiteralContext } from './QueryModificationParser';
import { ExpressionListContext } from './QueryModificationParser';
import { VarRefContext } from './QueryModificationParser';
import { FieldRefContext } from './QueryModificationParser';
import { ComparisonOpContext } from './QueryModificationParser';
import { UnaryOpContext } from './QueryModificationParser';
import { FactorOpContext } from './QueryModificationParser';
import { TermOpContext } from './QueryModificationParser';
import { StringLiteralContext } from './QueryModificationParser';
import { StringLiteralOrVarRefContext } from './QueryModificationParser';
import { BooleanLiteralContext } from './QueryModificationParser';
import { IriRefOrVarRefContext } from './QueryModificationParser';
import { NumericLiteralOrVarRefContext } from './QueryModificationParser';
import { IriRefContext } from './QueryModificationParser';
import { PrefixedNameContext } from './QueryModificationParser';
import { BlankNodeContext } from './QueryModificationParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `QueryModificationParser`.
 */
export interface QueryModificationListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by the `textMatchPattern`
   * labeled alternative in `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  enterTextMatchPattern?: (ctx: TextMatchPatternContext) => void;
  /**
   * Exit a parse tree produced by the `textMatchPattern`
   * labeled alternative in `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  exitTextMatchPattern?: (ctx: TextMatchPatternContext) => void;

  /**
   * Enter a parse tree produced by the `geoNearbyPattern`
   * labeled alternative in `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  enterGeoNearbyPattern?: (ctx: GeoNearbyPatternContext) => void;
  /**
   * Exit a parse tree produced by the `geoNearbyPattern`
   * labeled alternative in `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  exitGeoNearbyPattern?: (ctx: GeoNearbyPatternContext) => void;

  /**
   * Enter a parse tree produced by the `feature`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  enterFeature?: (ctx: FeatureContext) => void;
  /**
   * Exit a parse tree produced by the `feature`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  exitFeature?: (ctx: FeatureContext) => void;

  /**
   * Enter a parse tree produced by the `latLon`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  enterLatLon?: (ctx: LatLonContext) => void;
  /**
   * Exit a parse tree produced by the `latLon`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  exitLatLon?: (ctx: LatLonContext) => void;

  /**
   * Enter a parse tree produced by the `varFeature`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  enterVarFeature?: (ctx: VarFeatureContext) => void;
  /**
   * Exit a parse tree produced by the `varFeature`
   * labeled alternative in `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  exitVarFeature?: (ctx: VarFeatureContext) => void;

  /**
   * Enter a parse tree produced by the `comparisonPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  enterComparisonPredicate?: (ctx: ComparisonPredicateContext) => void;
  /**
   * Exit a parse tree produced by the `comparisonPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  exitComparisonPredicate?: (ctx: ComparisonPredicateContext) => void;

  /**
   * Enter a parse tree produced by the `inVarPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  enterInVarPredicate?: (ctx: InVarPredicateContext) => void;
  /**
   * Exit a parse tree produced by the `inVarPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  exitInVarPredicate?: (ctx: InVarPredicateContext) => void;

  /**
   * Enter a parse tree produced by the `inPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  enterInPredicate?: (ctx: InPredicateContext) => void;
  /**
   * Exit a parse tree produced by the `inPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  exitInPredicate?: (ctx: InPredicateContext) => void;

  /**
   * Enter a parse tree produced by the `parenPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  enterParenPredicate?: (ctx: ParenPredicateContext) => void;
  /**
   * Exit a parse tree produced by the `parenPredicate`
   * labeled alternative in `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  exitParenPredicate?: (ctx: ParenPredicateContext) => void;

  /**
   * Enter a parse tree produced by the `fieldRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterFieldRefAtom?: (ctx: FieldRefAtomContext) => void;
  /**
   * Exit a parse tree produced by the `fieldRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitFieldRefAtom?: (ctx: FieldRefAtomContext) => void;

  /**
   * Enter a parse tree produced by the `functionCallAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterFunctionCallAtom?: (ctx: FunctionCallAtomContext) => void;
  /**
   * Exit a parse tree produced by the `functionCallAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitFunctionCallAtom?: (ctx: FunctionCallAtomContext) => void;

  /**
   * Enter a parse tree produced by the `builtinCallAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterBuiltinCallAtom?: (ctx: BuiltinCallAtomContext) => void;
  /**
   * Exit a parse tree produced by the `builtinCallAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitBuiltinCallAtom?: (ctx: BuiltinCallAtomContext) => void;

  /**
   * Enter a parse tree produced by the `rdfLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterRdfLiteralAtom?: (ctx: RdfLiteralAtomContext) => void;
  /**
   * Exit a parse tree produced by the `rdfLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitRdfLiteralAtom?: (ctx: RdfLiteralAtomContext) => void;

  /**
   * Enter a parse tree produced by the `stringLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterStringLiteralAtom?: (ctx: StringLiteralAtomContext) => void;
  /**
   * Exit a parse tree produced by the `stringLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitStringLiteralAtom?: (ctx: StringLiteralAtomContext) => void;

  /**
   * Enter a parse tree produced by the `iriRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterIriRefAtom?: (ctx: IriRefAtomContext) => void;
  /**
   * Exit a parse tree produced by the `iriRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitIriRefAtom?: (ctx: IriRefAtomContext) => void;

  /**
   * Enter a parse tree produced by the `numericLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterNumericLiteralAtom?: (ctx: NumericLiteralAtomContext) => void;
  /**
   * Exit a parse tree produced by the `numericLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitNumericLiteralAtom?: (ctx: NumericLiteralAtomContext) => void;

  /**
   * Enter a parse tree produced by the `booleanLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterBooleanLiteralAtom?: (ctx: BooleanLiteralAtomContext) => void;
  /**
   * Exit a parse tree produced by the `booleanLiteralAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitBooleanLiteralAtom?: (ctx: BooleanLiteralAtomContext) => void;

  /**
   * Enter a parse tree produced by the `varRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterVarRefAtom?: (ctx: VarRefAtomContext) => void;
  /**
   * Exit a parse tree produced by the `varRefAtom`
   * labeled alternative in `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitVarRefAtom?: (ctx: VarRefAtomContext) => void;

  /**
   * Enter a parse tree produced by the `langRdfLiteral`
   * labeled alternative in `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  enterLangRdfLiteral?: (ctx: LangRdfLiteralContext) => void;
  /**
   * Exit a parse tree produced by the `langRdfLiteral`
   * labeled alternative in `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  exitLangRdfLiteral?: (ctx: LangRdfLiteralContext) => void;

  /**
   * Enter a parse tree produced by the `dtRdfLiteral`
   * labeled alternative in `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  enterDtRdfLiteral?: (ctx: DtRdfLiteralContext) => void;
  /**
   * Exit a parse tree produced by the `dtRdfLiteral`
   * labeled alternative in `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  exitDtRdfLiteral?: (ctx: DtRdfLiteralContext) => void;

  /**
   * Enter a parse tree produced by the `decimalLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  enterDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
  /**
   * Exit a parse tree produced by the `decimalLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  exitDecimalLiteral?: (ctx: DecimalLiteralContext) => void;

  /**
   * Enter a parse tree produced by the `doubleLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  enterDoubleLiteral?: (ctx: DoubleLiteralContext) => void;
  /**
   * Exit a parse tree produced by the `doubleLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  exitDoubleLiteral?: (ctx: DoubleLiteralContext) => void;

  /**
   * Enter a parse tree produced by the `integerLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
  /**
   * Exit a parse tree produced by the `integerLiteral`
   * labeled alternative in `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;

  /**
   * Enter a parse tree produced by the `primitiveExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterPrimitiveExpression?: (ctx: PrimitiveExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `primitiveExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitPrimitiveExpression?: (ctx: PrimitiveExpressionContext) => void;

  /**
   * Enter a parse tree produced by the `factorExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterFactorExpression?: (ctx: FactorExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `factorExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitFactorExpression?: (ctx: FactorExpressionContext) => void;

  /**
   * Enter a parse tree produced by the `parenExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterParenExpression?: (ctx: ParenExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `parenExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitParenExpression?: (ctx: ParenExpressionContext) => void;

  /**
   * Enter a parse tree produced by the `unaryExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `unaryExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;

  /**
   * Enter a parse tree produced by the `termExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterTermExpression?: (ctx: TermExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `termExpression`
   * labeled alternative in `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitTermExpression?: (ctx: TermExpressionContext) => void;

  /**
   * Enter a parse tree produced by the `textMatchMinScoreParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  enterTextMatchMinScoreParam?: (ctx: TextMatchMinScoreParamContext) => void;
  /**
   * Exit a parse tree produced by the `textMatchMinScoreParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  exitTextMatchMinScoreParam?: (ctx: TextMatchMinScoreParamContext) => void;

  /**
   * Enter a parse tree produced by the `textMatchMaxHitsParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  enterTextMatchMaxHitsParam?: (ctx: TextMatchMaxHitsParamContext) => void;
  /**
   * Exit a parse tree produced by the `textMatchMaxHitsParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  exitTextMatchMaxHitsParam?: (ctx: TextMatchMaxHitsParamContext) => void;

  /**
   * Enter a parse tree produced by the `textMatchBoostParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  enterTextMatchBoostParam?: (ctx: TextMatchBoostParamContext) => void;
  /**
   * Exit a parse tree produced by the `textMatchBoostParam`
   * labeled alternative in `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  exitTextMatchBoostParam?: (ctx: TextMatchBoostParamContext) => void;

  /**
   * Enter a parse tree produced by the `funcWithArgs`
   * labeled alternative in `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  enterFuncWithArgs?: (ctx: FuncWithArgsContext) => void;
  /**
   * Exit a parse tree produced by the `funcWithArgs`
   * labeled alternative in `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  exitFuncWithArgs?: (ctx: FuncWithArgsContext) => void;

  /**
   * Enter a parse tree produced by the `funcWithoutArgs`
   * labeled alternative in `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  enterFuncWithoutArgs?: (ctx: FuncWithoutArgsContext) => void;
  /**
   * Exit a parse tree produced by the `funcWithoutArgs`
   * labeled alternative in `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  exitFuncWithoutArgs?: (ctx: FuncWithoutArgsContext) => void;

  /**
   * Enter a parse tree produced by the `literalIriRef`
   * labeled alternative in `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  enterLiteralIriRef?: (ctx: LiteralIriRefContext) => void;
  /**
   * Exit a parse tree produced by the `literalIriRef`
   * labeled alternative in `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  exitLiteralIriRef?: (ctx: LiteralIriRefContext) => void;

  /**
   * Enter a parse tree produced by the `prefixedNameIriRef`
   * labeled alternative in `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  enterPrefixedNameIriRef?: (ctx: PrefixedNameIriRefContext) => void;
  /**
   * Exit a parse tree produced by the `prefixedNameIriRef`
   * labeled alternative in `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  exitPrefixedNameIriRef?: (ctx: PrefixedNameIriRefContext) => void;

  /**
   * Enter a parse tree produced by the `isLiteralFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIsLiteralFunc?: (ctx: IsLiteralFuncContext) => void;
  /**
   * Exit a parse tree produced by the `isLiteralFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIsLiteralFunc?: (ctx: IsLiteralFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strStartsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrStartsFunc?: (ctx: StrStartsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strStartsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrStartsFunc?: (ctx: StrStartsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `replaceFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterReplaceFunc?: (ctx: ReplaceFuncContext) => void;
  /**
   * Exit a parse tree produced by the `replaceFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitReplaceFunc?: (ctx: ReplaceFuncContext) => void;

  /**
   * Enter a parse tree produced by the `boundFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterBoundFunc?: (ctx: BoundFuncContext) => void;
  /**
   * Exit a parse tree produced by the `boundFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitBoundFunc?: (ctx: BoundFuncContext) => void;

  /**
   * Enter a parse tree produced by the `sha512Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSha512Func?: (ctx: Sha512FuncContext) => void;
  /**
   * Exit a parse tree produced by the `sha512Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSha512Func?: (ctx: Sha512FuncContext) => void;

  /**
   * Enter a parse tree produced by the `ucaseFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterUcaseFunc?: (ctx: UcaseFuncContext) => void;
  /**
   * Exit a parse tree produced by the `ucaseFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitUcaseFunc?: (ctx: UcaseFuncContext) => void;

  /**
   * Enter a parse tree produced by the `encodeForUriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterEncodeForUriFunc?: (ctx: EncodeForUriFuncContext) => void;
  /**
   * Exit a parse tree produced by the `encodeForUriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitEncodeForUriFunc?: (ctx: EncodeForUriFuncContext) => void;

  /**
   * Enter a parse tree produced by the `yearFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterYearFunc?: (ctx: YearFuncContext) => void;
  /**
   * Exit a parse tree produced by the `yearFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitYearFunc?: (ctx: YearFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strBeforeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrBeforeFunc?: (ctx: StrBeforeFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strBeforeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrBeforeFunc?: (ctx: StrBeforeFuncContext) => void;

  /**
   * Enter a parse tree produced by the `sha256Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSha256Func?: (ctx: Sha256FuncContext) => void;
  /**
   * Exit a parse tree produced by the `sha256Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSha256Func?: (ctx: Sha256FuncContext) => void;

  /**
   * Enter a parse tree produced by the `floorFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterFloorFunc?: (ctx: FloorFuncContext) => void;
  /**
   * Exit a parse tree produced by the `floorFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitFloorFunc?: (ctx: FloorFuncContext) => void;

  /**
   * Enter a parse tree produced by the `iriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIriFunc?: (ctx: IriFuncContext) => void;
  /**
   * Exit a parse tree produced by the `iriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIriFunc?: (ctx: IriFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strEndsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrEndsFunc?: (ctx: StrEndsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strEndsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrEndsFunc?: (ctx: StrEndsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `lcaseFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterLcaseFunc?: (ctx: LcaseFuncContext) => void;
  /**
   * Exit a parse tree produced by the `lcaseFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitLcaseFunc?: (ctx: LcaseFuncContext) => void;

  /**
   * Enter a parse tree produced by the `concatFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterConcatFunc?: (ctx: ConcatFuncContext) => void;
  /**
   * Exit a parse tree produced by the `concatFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitConcatFunc?: (ctx: ConcatFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strLenFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrLenFunc?: (ctx: StrLenFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strLenFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrLenFunc?: (ctx: StrLenFuncContext) => void;

  /**
   * Enter a parse tree produced by the `tzFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterTzFunc?: (ctx: TzFuncContext) => void;
  /**
   * Exit a parse tree produced by the `tzFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitTzFunc?: (ctx: TzFuncContext) => void;

  /**
   * Enter a parse tree produced by the `datatypeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterDatatypeFunc?: (ctx: DatatypeFuncContext) => void;
  /**
   * Exit a parse tree produced by the `datatypeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitDatatypeFunc?: (ctx: DatatypeFuncContext) => void;

  /**
   * Enter a parse tree produced by the `regexFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterRegexFunc?: (ctx: RegexFuncContext) => void;
  /**
   * Exit a parse tree produced by the `regexFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitRegexFunc?: (ctx: RegexFuncContext) => void;

  /**
   * Enter a parse tree produced by the `langMatchesFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterLangMatchesFunc?: (ctx: LangMatchesFuncContext) => void;
  /**
   * Exit a parse tree produced by the `langMatchesFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitLangMatchesFunc?: (ctx: LangMatchesFuncContext) => void;

  /**
   * Enter a parse tree produced by the `sha384Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSha384Func?: (ctx: Sha384FuncContext) => void;
  /**
   * Exit a parse tree produced by the `sha384Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSha384Func?: (ctx: Sha384FuncContext) => void;

  /**
   * Enter a parse tree produced by the `minutesFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterMinutesFunc?: (ctx: MinutesFuncContext) => void;
  /**
   * Exit a parse tree produced by the `minutesFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitMinutesFunc?: (ctx: MinutesFuncContext) => void;

  /**
   * Enter a parse tree produced by the `secondsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSecondsFunc?: (ctx: SecondsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `secondsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSecondsFunc?: (ctx: SecondsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strLangFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrLangFunc?: (ctx: StrLangFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strLangFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrLangFunc?: (ctx: StrLangFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strUuidFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrUuidFunc?: (ctx: StrUuidFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strUuidFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrUuidFunc?: (ctx: StrUuidFuncContext) => void;

  /**
   * Enter a parse tree produced by the `absFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterAbsFunc?: (ctx: AbsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `absFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitAbsFunc?: (ctx: AbsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `dayFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterDayFunc?: (ctx: DayFuncContext) => void;
  /**
   * Exit a parse tree produced by the `dayFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitDayFunc?: (ctx: DayFuncContext) => void;

  /**
   * Enter a parse tree produced by the `nowFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterNowFunc?: (ctx: NowFuncContext) => void;
  /**
   * Exit a parse tree produced by the `nowFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitNowFunc?: (ctx: NowFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strAfterFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrAfterFunc?: (ctx: StrAfterFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strAfterFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrAfterFunc?: (ctx: StrAfterFuncContext) => void;

  /**
   * Enter a parse tree produced by the `ceilFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterCeilFunc?: (ctx: CeilFuncContext) => void;
  /**
   * Exit a parse tree produced by the `ceilFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitCeilFunc?: (ctx: CeilFuncContext) => void;

  /**
   * Enter a parse tree produced by the `timezoneFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterTimezoneFunc?: (ctx: TimezoneFuncContext) => void;
  /**
   * Exit a parse tree produced by the `timezoneFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitTimezoneFunc?: (ctx: TimezoneFuncContext) => void;

  /**
   * Enter a parse tree produced by the `sameTermFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSameTermFunc?: (ctx: SameTermFuncContext) => void;
  /**
   * Exit a parse tree produced by the `sameTermFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSameTermFunc?: (ctx: SameTermFuncContext) => void;

  /**
   * Enter a parse tree produced by the `isBlankFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIsBlankFunc?: (ctx: IsBlankFuncContext) => void;
  /**
   * Exit a parse tree produced by the `isBlankFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIsBlankFunc?: (ctx: IsBlankFuncContext) => void;

  /**
   * Enter a parse tree produced by the `randFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterRandFunc?: (ctx: RandFuncContext) => void;
  /**
   * Exit a parse tree produced by the `randFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitRandFunc?: (ctx: RandFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrFunc?: (ctx: StrFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrFunc?: (ctx: StrFuncContext) => void;

  /**
   * Enter a parse tree produced by the `bnodeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterBnodeFunc?: (ctx: BnodeFuncContext) => void;
  /**
   * Exit a parse tree produced by the `bnodeFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitBnodeFunc?: (ctx: BnodeFuncContext) => void;

  /**
   * Enter a parse tree produced by the `hoursFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterHoursFunc?: (ctx: HoursFuncContext) => void;
  /**
   * Exit a parse tree produced by the `hoursFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitHoursFunc?: (ctx: HoursFuncContext) => void;

  /**
   * Enter a parse tree produced by the `md5Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterMd5Func?: (ctx: Md5FuncContext) => void;
  /**
   * Exit a parse tree produced by the `md5Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitMd5Func?: (ctx: Md5FuncContext) => void;

  /**
   * Enter a parse tree produced by the `containsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterContainsFunc?: (ctx: ContainsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `containsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitContainsFunc?: (ctx: ContainsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `roundFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterRoundFunc?: (ctx: RoundFuncContext) => void;
  /**
   * Exit a parse tree produced by the `roundFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitRoundFunc?: (ctx: RoundFuncContext) => void;

  /**
   * Enter a parse tree produced by the `strDtFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterStrDtFunc?: (ctx: StrDtFuncContext) => void;
  /**
   * Exit a parse tree produced by the `strDtFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitStrDtFunc?: (ctx: StrDtFuncContext) => void;

  /**
   * Enter a parse tree produced by the `sha1Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSha1Func?: (ctx: Sha1FuncContext) => void;
  /**
   * Exit a parse tree produced by the `sha1Func`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSha1Func?: (ctx: Sha1FuncContext) => void;

  /**
   * Enter a parse tree produced by the `monthFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterMonthFunc?: (ctx: MonthFuncContext) => void;
  /**
   * Exit a parse tree produced by the `monthFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitMonthFunc?: (ctx: MonthFuncContext) => void;

  /**
   * Enter a parse tree produced by the `ifFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIfFunc?: (ctx: IfFuncContext) => void;
  /**
   * Exit a parse tree produced by the `ifFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIfFunc?: (ctx: IfFuncContext) => void;

  /**
   * Enter a parse tree produced by the `isIriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIsIriFunc?: (ctx: IsIriFuncContext) => void;
  /**
   * Exit a parse tree produced by the `isIriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIsIriFunc?: (ctx: IsIriFuncContext) => void;

  /**
   * Enter a parse tree produced by the `substrFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterSubstrFunc?: (ctx: SubstrFuncContext) => void;
  /**
   * Exit a parse tree produced by the `substrFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitSubstrFunc?: (ctx: SubstrFuncContext) => void;

  /**
   * Enter a parse tree produced by the `isNumericFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIsNumericFunc?: (ctx: IsNumericFuncContext) => void;
  /**
   * Exit a parse tree produced by the `isNumericFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIsNumericFunc?: (ctx: IsNumericFuncContext) => void;

  /**
   * Enter a parse tree produced by the `uuidFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterUuidFunc?: (ctx: UuidFuncContext) => void;
  /**
   * Exit a parse tree produced by the `uuidFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitUuidFunc?: (ctx: UuidFuncContext) => void;

  /**
   * Enter a parse tree produced by the `langFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterLangFunc?: (ctx: LangFuncContext) => void;
  /**
   * Exit a parse tree produced by the `langFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitLangFunc?: (ctx: LangFuncContext) => void;

  /**
   * Enter a parse tree produced by the `coalesceFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterCoalesceFunc?: (ctx: CoalesceFuncContext) => void;
  /**
   * Exit a parse tree produced by the `coalesceFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitCoalesceFunc?: (ctx: CoalesceFuncContext) => void;

  /**
   * Enter a parse tree produced by the `isURIFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterIsURIFunc?: (ctx: IsURIFuncContext) => void;
  /**
   * Exit a parse tree produced by the `isURIFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitIsURIFunc?: (ctx: IsURIFuncContext) => void;

  /**
   * Enter a parse tree produced by the `uriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterUriFunc?: (ctx: UriFuncContext) => void;
  /**
   * Exit a parse tree produced by the `uriFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitUriFunc?: (ctx: UriFuncContext) => void;

  /**
   * Enter a parse tree produced by the `existsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterExistsFunc?: (ctx: ExistsFuncContext) => void;
  /**
   * Exit a parse tree produced by the `existsFunc`
   * labeled alternative in `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitExistsFunc?: (ctx: ExistsFuncContext) => void;

  /**
   * Enter a parse tree produced by the `followsUserBoost`
   * labeled alternative in `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  enterFollowsUserBoost?: (ctx: FollowsUserBoostContext) => void;
  /**
   * Exit a parse tree produced by the `followsUserBoost`
   * labeled alternative in `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  exitFollowsUserBoost?: (ctx: FollowsUserBoostContext) => void;

  /**
   * Enter a parse tree produced by the `followedByUserBoost`
   * labeled alternative in `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  enterFollowedByUserBoost?: (ctx: FollowedByUserBoostContext) => void;
  /**
   * Exit a parse tree produced by the `followedByUserBoost`
   * labeled alternative in `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  exitFollowedByUserBoost?: (ctx: FollowedByUserBoostContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.filter`.
   * @param ctx the parse tree
   */
  enterFilter?: (ctx: FilterContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.filter`.
   * @param ctx the parse tree
   */
  exitFilter?: (ctx: FilterContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.patterns`.
   * @param ctx the parse tree
   */
  enterPatterns?: (ctx: PatternsContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.patterns`.
   * @param ctx the parse tree
   */
  exitPatterns?: (ctx: PatternsContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.boosters`.
   * @param ctx the parse tree
   */
  enterBoosters?: (ctx: BoostersContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.boosters`.
   * @param ctx the parse tree
   */
  exitBoosters?: (ctx: BoostersContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.bindings`.
   * @param ctx the parse tree
   */
  enterBindings?: (ctx: BindingsContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.bindings`.
   * @param ctx the parse tree
   */
  exitBindings?: (ctx: BindingsContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.orderBys`.
   * @param ctx the parse tree
   */
  enterOrderBys?: (ctx: OrderBysContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.orderBys`.
   * @param ctx the parse tree
   */
  exitOrderBys?: (ctx: OrderBysContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.orderBy`.
   * @param ctx the parse tree
   */
  enterOrderBy?: (ctx: OrderByContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.orderBy`.
   * @param ctx the parse tree
   */
  exitOrderBy?: (ctx: OrderByContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.transforms`.
   * @param ctx the parse tree
   */
  enterTransforms?: (ctx: TransformsContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.transforms`.
   * @param ctx the parse tree
   */
  exitTransforms?: (ctx: TransformsContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.transform`.
   * @param ctx the parse tree
   */
  enterTransform?: (ctx: TransformContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.transform`.
   * @param ctx the parse tree
   */
  exitTransform?: (ctx: TransformContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.searchCondition`.
   * @param ctx the parse tree
   */
  enterSearchCondition?: (ctx: SearchConditionContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.searchCondition`.
   * @param ctx the parse tree
   */
  exitSearchCondition?: (ctx: SearchConditionContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.searchConditionAnd`.
   * @param ctx the parse tree
   */
  enterSearchConditionAnd?: (ctx: SearchConditionAndContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.searchConditionAnd`.
   * @param ctx the parse tree
   */
  exitSearchConditionAnd?: (ctx: SearchConditionAndContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.searchConditionNot`.
   * @param ctx the parse tree
   */
  enterSearchConditionNot?: (ctx: SearchConditionNotContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.searchConditionNot`.
   * @param ctx the parse tree
   */
  exitSearchConditionNot?: (ctx: SearchConditionNotContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  enterPredicate?: (ctx: PredicateContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.predicate`.
   * @param ctx the parse tree
   */
  exitPredicate?: (ctx: PredicateContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  enterExpressionAtom?: (ctx: ExpressionAtomContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.expressionAtom`.
   * @param ctx the parse tree
   */
  exitExpressionAtom?: (ctx: ExpressionAtomContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  enterBuiltinCall?: (ctx: BuiltinCallContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.builtinCall`.
   * @param ctx the parse tree
   */
  exitBuiltinCall?: (ctx: BuiltinCallContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  enterPattern?: (ctx: PatternContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.pattern`.
   * @param ctx the parse tree
   */
  exitPattern?: (ctx: PatternContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  enterTextMatchParam?: (ctx: TextMatchParamContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.textMatchParam`.
   * @param ctx the parse tree
   */
  exitTextMatchParam?: (ctx: TextMatchParamContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  enterBoost?: (ctx: BoostContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.boost`.
   * @param ctx the parse tree
   */
  exitBoost?: (ctx: BoostContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.binding`.
   * @param ctx the parse tree
   */
  enterBinding?: (ctx: BindingContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.binding`.
   * @param ctx the parse tree
   */
  exitBinding?: (ctx: BindingContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  enterFeatureOrLatLon?: (ctx: FeatureOrLatLonContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.featureOrLatLon`.
   * @param ctx the parse tree
   */
  exitFeatureOrLatLon?: (ctx: FeatureOrLatLonContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.proximitySpec`.
   * @param ctx the parse tree
   */
  enterProximitySpec?: (ctx: ProximitySpecContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.proximitySpec`.
   * @param ctx the parse tree
   */
  exitProximitySpec?: (ctx: ProximitySpecContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  enterFunctionCall?: (ctx: FunctionCallContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.functionCall`.
   * @param ctx the parse tree
   */
  exitFunctionCall?: (ctx: FunctionCallContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  enterRdfLiteral?: (ctx: RdfLiteralContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.rdfLiteral`.
   * @param ctx the parse tree
   */
  exitRdfLiteral?: (ctx: RdfLiteralContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  enterNumericLiteral?: (ctx: NumericLiteralContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.numericLiteral`.
   * @param ctx the parse tree
   */
  exitNumericLiteral?: (ctx: NumericLiteralContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.expressionList`.
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.expressionList`.
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.varRef`.
   * @param ctx the parse tree
   */
  enterVarRef?: (ctx: VarRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.varRef`.
   * @param ctx the parse tree
   */
  exitVarRef?: (ctx: VarRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.fieldRef`.
   * @param ctx the parse tree
   */
  enterFieldRef?: (ctx: FieldRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.fieldRef`.
   * @param ctx the parse tree
   */
  exitFieldRef?: (ctx: FieldRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.comparisonOp`.
   * @param ctx the parse tree
   */
  enterComparisonOp?: (ctx: ComparisonOpContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.comparisonOp`.
   * @param ctx the parse tree
   */
  exitComparisonOp?: (ctx: ComparisonOpContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.unaryOp`.
   * @param ctx the parse tree
   */
  enterUnaryOp?: (ctx: UnaryOpContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.unaryOp`.
   * @param ctx the parse tree
   */
  exitUnaryOp?: (ctx: UnaryOpContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.factorOp`.
   * @param ctx the parse tree
   */
  enterFactorOp?: (ctx: FactorOpContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.factorOp`.
   * @param ctx the parse tree
   */
  exitFactorOp?: (ctx: FactorOpContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.termOp`.
   * @param ctx the parse tree
   */
  enterTermOp?: (ctx: TermOpContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.termOp`.
   * @param ctx the parse tree
   */
  exitTermOp?: (ctx: TermOpContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.stringLiteral`.
   * @param ctx the parse tree
   */
  enterStringLiteral?: (ctx: StringLiteralContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.stringLiteral`.
   * @param ctx the parse tree
   */
  exitStringLiteral?: (ctx: StringLiteralContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.stringLiteralOrVarRef`.
   * @param ctx the parse tree
   */
  enterStringLiteralOrVarRef?: (ctx: StringLiteralOrVarRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.stringLiteralOrVarRef`.
   * @param ctx the parse tree
   */
  exitStringLiteralOrVarRef?: (ctx: StringLiteralOrVarRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.booleanLiteral`.
   * @param ctx the parse tree
   */
  enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.booleanLiteral`.
   * @param ctx the parse tree
   */
  exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.iriRefOrVarRef`.
   * @param ctx the parse tree
   */
  enterIriRefOrVarRef?: (ctx: IriRefOrVarRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.iriRefOrVarRef`.
   * @param ctx the parse tree
   */
  exitIriRefOrVarRef?: (ctx: IriRefOrVarRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.numericLiteralOrVarRef`.
   * @param ctx the parse tree
   */
  enterNumericLiteralOrVarRef?: (ctx: NumericLiteralOrVarRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.numericLiteralOrVarRef`.
   * @param ctx the parse tree
   */
  exitNumericLiteralOrVarRef?: (ctx: NumericLiteralOrVarRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  enterIriRef?: (ctx: IriRefContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.iriRef`.
   * @param ctx the parse tree
   */
  exitIriRef?: (ctx: IriRefContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.prefixedName`.
   * @param ctx the parse tree
   */
  enterPrefixedName?: (ctx: PrefixedNameContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.prefixedName`.
   * @param ctx the parse tree
   */
  exitPrefixedName?: (ctx: PrefixedNameContext) => void;

  /**
   * Enter a parse tree produced by `QueryModificationParser.blankNode`.
   * @param ctx the parse tree
   */
  enterBlankNode?: (ctx: BlankNodeContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.blankNode`.
   * @param ctx the parse tree
   */
  exitBlankNode?: (ctx: BlankNodeContext) => void;
}
