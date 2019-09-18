// Generated from QueryModification.g4 by ANTLR 4.7.3-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { UnaryExpressionContext } from './QueryModificationParser';
import { FactorExpressionContext } from './QueryModificationParser';
import { TermExpressionContext } from './QueryModificationParser';
import { PrimitiveExpressionContext } from './QueryModificationParser';
import { ParenExpressionContext } from './QueryModificationParser';
import { ComparisonPredicateContext } from './QueryModificationParser';
import { InPredicateContext } from './QueryModificationParser';
import { InVarPredicateContext } from './QueryModificationParser';
import { ParenPredicateContext } from './QueryModificationParser';
import { FunctionCallAtomContext } from './QueryModificationParser';
import { StringLiteralAtomContext } from './QueryModificationParser';
import { NumericLiteralAtomContext } from './QueryModificationParser';
import { BooleanLiteralAtomContext } from './QueryModificationParser';
import { IriRefAtomContext } from './QueryModificationParser';
import { FieldRefAtomContext } from './QueryModificationParser';
import { VarRefAtomContext } from './QueryModificationParser';
import { FuncWithoutArgsContext } from './QueryModificationParser';
import { FuncWithArgsContext } from './QueryModificationParser';
import { LiteralIriRefContext } from './QueryModificationParser';
import { PrefixedNameIriRefContext } from './QueryModificationParser';
import { IntegerLiteralContext } from './QueryModificationParser';
import { DecimalLiteralContext } from './QueryModificationParser';
import { DoubleLiteralContext } from './QueryModificationParser';
import { FilterContext } from './QueryModificationParser';
import { OrderBysContext } from './QueryModificationParser';
import { OrderByContext } from './QueryModificationParser';
import { SearchConditionContext } from './QueryModificationParser';
import { SearchConditionAndContext } from './QueryModificationParser';
import { SearchConditionNotContext } from './QueryModificationParser';
import { PredicateContext } from './QueryModificationParser';
import { ExpressionContext } from './QueryModificationParser';
import { ExpressionAtomContext } from './QueryModificationParser';
import { ExpressionListContext } from './QueryModificationParser';
import { FunctionCallContext } from './QueryModificationParser';
import { XsdTypeContext } from './QueryModificationParser';
import { NumericLiteralContext } from './QueryModificationParser';
import { VarRefContext } from './QueryModificationParser';
import { FieldRefContext } from './QueryModificationParser';
import { ComparisonOpContext } from './QueryModificationParser';
import { UnaryOpContext } from './QueryModificationParser';
import { FactorOpContext } from './QueryModificationParser';
import { TermOpContext } from './QueryModificationParser';
import { StringLiteralContext } from './QueryModificationParser';
import { BooleanLiteralContext } from './QueryModificationParser';
import { IriRefContext } from './QueryModificationParser';
import { PrefixedNameContext } from './QueryModificationParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `QueryModificationParser`.
 */
export interface QueryModificationListener extends ParseTreeListener {
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
   * Enter a parse tree produced by `QueryModificationParser.xsdType`.
   * @param ctx the parse tree
   */
  enterXsdType?: (ctx: XsdTypeContext) => void;
  /**
   * Exit a parse tree produced by `QueryModificationParser.xsdType`.
   * @param ctx the parse tree
   */
  exitXsdType?: (ctx: XsdTypeContext) => void;

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
}
