import { CodePointCharStream, ParserRuleContext, TokenStream } from 'antlr4ts';
import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  BooleanLiteralAtomContext,
  BooleanLiteralContext,
  ComparisonPredicateContext,
  DecimalLiteralContext,
  DoubleLiteralContext,
  DoubleQuotedMultilineContext,
  DoubleQuotedOnelineContext,
  ExpressionContext,
  FactorExpressionContext,
  FieldRefAtomContext,
  FieldRefContext,
  FunctionCallAtomContext,
  FunctionCallContext,
  FuncWithArgsContext,
  FuncWithoutArgsContext,
  InPredicateContext,
  IntegerLiteralContext,
  InVarPredicateContext,
  IriRefAtomContext,
  IriRefContext,
  LiteralIriRefContext,
  NumericLiteralAtomContext,
  NumericLiteralContext,
  OrderByContext,
  OrderBysContext,
  ParenExpressionContext,
  ParenPredicateContext,
  PredicateContext,
  PrefixedNameIriRefContext,
  PrimitiveExpressionContext,
  QueryModificationLexer,
  QueryModificationParser,
  SearchConditionAndContext,
  SearchConditionContext,
  SearchConditionNotContext,
  SingleQuotedMultlineContext,
  SingleQuotedOnelineContext,
  StringLiteralAtomContext,
  StringLiteralContext,
  TermExpressionContext,
  UnaryExpressionContext,
  VarRefAtomContext,
  VarRefContext,
} from '../../antlr4';
import {
  GQLFieldDefinition,
  GQLFilter,
  GQLOrderBys,
  GQLType,
  GQLValueType,
  GQLVariableDefinition,
  QMBooleanLiteral,
  QMComparisonOperator,
  QMComparisonPredicate,
  QMConjunction,
  QMContext,
  QMDecimalLiteral,
  QMDisjunction,
  QMDoubleLiteral,
  QMExpression,
  QMFactorExpression,
  QMFieldRef,
  QMFunctionCall,
  QMInPredicate,
  QMIntegerLiteral,
  QMInVarPredicate,
  QMIriRef,
  QMNumericLiteral,
  QMOptionalNegation,
  QMOrderBy,
  QMParenExpression,
  QMParenPredicate,
  QMPredicate,
  QMPrimitiveExpression,
  QMProductOperator,
  QMStringLiteral,
  QMTermExpression,
  QMTermOperator,
  QMUnaryExpression,
  QMUnaryOperator,
  QMVarRef,
} from '../../models';
import { BuilderBase } from '../BuilderBase';

export abstract class GQLQueryModifiersBuilder<T> extends BuilderBase<T> {
  public validFields: List<GQLFieldDefinition>;
  public validVariables: Set<GQLVariableDefinition>;
  public vars: Map<string, GQLValueType>;
  public source: string;
  public fieldRefs: Set<GQLFieldDefinition> = Set<
    GQLFieldDefinition
  >().asMutable();
  public varRefs: Set<GQLVariableDefinition> = Set<
    GQLVariableDefinition
  >().asMutable();

  constructor(
    validFields: List<GQLFieldDefinition>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, GQLValueType>,
    source: string
  ) {
    super();
    this.validFields = validFields;
    this.validVariables = validVariables;
    this.vars = vars;
    this.source = source;
  }

  public parser(tokenStream: TokenStream) {
    return new QueryModificationParser(tokenStream);
  }

  public lexer(input: CodePointCharStream) {
    return new QueryModificationLexer(input);
  }

  protected qmContext(context: ParserRuleContext) {
    const tok = context.start;
    return new QMContext(this.source, tok.line, tok.charPositionInLine);
  }

  protected processOrderBys(context: OrderBysContext): List<QMOrderBy> {
    return List(context.orderBy().map(ob => this.processOrderBy(ob)));
  }

  protected processOrderBy(context: OrderByContext): QMOrderBy {
    return new QMOrderBy(
      this.processExpression(context.expression()),
      Option.of(context.DESC()).nonEmpty(),
      this.qmContext(context)
    );
  }

  protected processSearchCondition(
    context: SearchConditionContext
  ): QMDisjunction {
    return new QMDisjunction(
      List(
        context
          .searchConditionAnd()
          .map(sca => this.processSearchConditionAnd(sca))
      ),
      this.qmContext(context)
    );
  }

  protected processSearchConditionAnd(
    context: SearchConditionAndContext
  ): QMConjunction {
    return new QMConjunction(
      List(
        context
          .searchConditionNot()
          .map(scn => this.processSearchConditionNot(scn))
      ),
      this.qmContext(context)
    );
  }

  protected processSearchConditionNot(
    context: SearchConditionNotContext
  ): QMOptionalNegation {
    return new QMOptionalNegation(
      this.processPredicate(context.predicate()),
      !!context.NOT(),
      this.qmContext(context)
    );
  }

  protected processPredicate(context: PredicateContext): QMPredicate {
    const qmc = this.qmContext(context);
    let pred: QMPredicate;
    if (context instanceof ComparisonPredicateContext) {
      const op = context.comparisonOp().text as QMComparisonOperator;
      const expressions = context
        .expression()
        .map(e => this.processExpression(e));
      pred = new QMComparisonPredicate(op, expressions[0], expressions[1], qmc);
    } else if (context instanceof InPredicateContext) {
      const target = this.processExpression(context.expression());
      const list = List(
        context
          .expressionList()
          .expression()
          .map(e => this.processExpression(e))
      );
      const negate = !!context.NOT();
      pred = new QMInPredicate(target, list, negate, qmc);
    } else if (context instanceof InVarPredicateContext) {
      const target = this.processExpression(context.expression());
      const varRef = this.processVarRef(context.varRef());
      const negate = !!context.NOT();
      pred = new QMInVarPredicate(target, varRef, negate, qmc);
    } else if (context instanceof ParenPredicateContext) {
      const disjunction = this.processSearchCondition(
        context.searchCondition()
      );
      pred = new QMParenPredicate(disjunction, qmc);
    } else {
      this.unknownContext(context, 'Predicate');
      pred = new QMInVarPredicate(
        new QMIntegerLiteral('error', qmc),
        new QMVarRef(
          new GQLVariableDefinition('error', GQLType.Error),
          'error',
          qmc
        ),
        false,
        qmc
      );
    }
    Option.of(pred.conformableCheck('invalid predicate')).forEach(err =>
      this.check(false, err, context, true)
    );
    return pred;
  }

  protected processExpression(context: ExpressionContext): QMExpression {
    let expr: QMExpression;
    if (context instanceof PrimitiveExpressionContext) {
      expr = this.processPrimitiveExpression(context);
    } else if (context instanceof UnaryExpressionContext) {
      expr = this.processUnaryExpression(context);
    } else if (context instanceof FactorExpressionContext) {
      expr = this.processFactorExpression(context);
    } else if (context instanceof TermExpressionContext) {
      expr = this.processTermExpression(context);
    } else if (context instanceof ParenExpressionContext) {
      expr = this.processParenExpression(context);
    } else {
      this.unknownContext(context, 'Expression');
      expr = new QMIntegerLiteral('error', this.qmContext(context));
    }
    return expr;
  }

  protected processPrimitiveExpression(
    context: PrimitiveExpressionContext
  ): QMPrimitiveExpression {
    const atom = context.expressionAtom();
    let expr: QMPrimitiveExpression;
    if (atom instanceof FunctionCallAtomContext) {
      expr = this.processFunctionCall(atom.functionCall());
    } else if (atom instanceof StringLiteralAtomContext) {
      expr = this.processStringLiteral(atom.stringLiteral());
    } else if (atom instanceof NumericLiteralAtomContext) {
      expr = this.processNumericLiteral(atom.numericLiteral());
    } else if (atom instanceof BooleanLiteralAtomContext) {
      expr = this.processBooleanLiteral(atom.booleanLiteral());
    } else if (atom instanceof VarRefAtomContext) {
      expr = this.processVarRef(atom.varRef());
    } else if (atom instanceof FieldRefAtomContext) {
      expr = this.processFieldRef(atom.fieldRef());
    } else if (atom instanceof IriRefAtomContext) {
      expr = this.processIriRef(atom.iriRef());
    } else {
      this.unknownContext(context, 'PrimitiveExpression');
      expr = new QMIntegerLiteral('error', this.qmContext(atom));
    }
    return expr;
  }

  protected processFunctionCall(context: FunctionCallContext): QMFunctionCall {
    if (context instanceof FuncWithoutArgsContext) {
      return this.processFuncWithoutArgs(context);
    } else if (context instanceof FuncWithArgsContext) {
      return this.processFuncWithArgs(context);
    }
    this.unknownContext(context, 'FunctionCall');
    return new QMFunctionCall(
      'error',
      List<QMExpression>(),
      'error',
      this.qmContext(context)
    );
  }

  protected processStringLiteral(
    context: StringLiteralContext
  ): QMStringLiteral {
    let s: string = '';
    if (context instanceof SingleQuotedOnelineContext) {
      s = this.textOf(context.SINGLE_QUOTED_ONE_LINE_STRING());
    } else if (context instanceof SingleQuotedMultlineContext) {
      s = this.textOf(context.SINGLE_QUOTED_MULTI_LINE_STRING());
    } else if (context instanceof DoubleQuotedOnelineContext) {
      s = this.textOf(context.DOUBLE_QUOTED_ONE_LINE_STRING());
    } else if (context instanceof DoubleQuotedMultilineContext) {
      s = this.textOf(context.DOUBLE_QUOTED_MULTI_LINE_STRING());
    } else {
      this.unknownContext(context, 'StringLiteral');
      s = 'error';
    }
    return new QMStringLiteral(s, this.qmContext(context));
  }

  protected processNumericLiteral(
    context: NumericLiteralContext
  ): QMNumericLiteral {
    const qmc = this.qmContext(context);
    let lit: QMNumericLiteral;
    if (context instanceof IntegerLiteralContext) {
      lit = new QMIntegerLiteral(context.INTEGER().text, qmc);
    } else if (context instanceof DecimalLiteralContext) {
      lit = new QMDecimalLiteral(context.DECIMAL().text, qmc);
    } else if (context instanceof DoubleLiteralContext) {
      lit = new QMDoubleLiteral(context.DOUBLE().text, qmc);
    } else {
      this.unknownContext(context, 'NumericLiteral');
      lit = new QMIntegerLiteral('error', qmc);
    }
    return lit;
  }

  protected unknownContext(context: ParserRuleContext, contextType: string) {
    this.check(
      false,
      `Unknown ${contextType}Context: ${context.constructor.name}`,
      context,
      true
    );
  }

  protected processBooleanLiteral(
    context: BooleanLiteralContext
  ): QMBooleanLiteral {
    return new QMBooleanLiteral(
      Option.of(context.TRUE()).nonEmpty(),
      this.qmContext(context)
    );
  }

  protected processIriRef(context: IriRefContext): QMIriRef {
    let iri: string;
    if (context instanceof LiteralIriRefContext) {
      iri = context.IRI_REF().text;
    } else if (context instanceof PrefixedNameIriRefContext) {
      iri = context.prefixedName().text;
    } else {
      this.unknownContext(context, 'IriRef');
      iri = 'error';
    }
    return new QMIriRef(iri, this.qmContext(context));
  }

  protected processFieldRef(context: FieldRefContext): QMFieldRef {
    const fieldName = context.text;
    const field = Option.of(this.validFields.find(fd => fd.name === fieldName));
    this.check(
      field.nonEmpty(),
      `invalid field reference '${field}'`,
      context,
      true
    );
    field.forEach(fd => this.fieldRefs.add(fd));
    return new QMFieldRef(
      field.getOrElse(new GQLFieldDefinition(fieldName, GQLType.Error)),
      this.qmContext(context)
    );
  }

  protected processVarRef(context: VarRefContext): QMVarRef {
    const varName = context.VARNAME().text;
    const varDef = Option.of(this.validVariables.find(a => a.name === varName));
    this.check(
      varDef.nonEmpty(),
      `unknown variable reference '${varName}'`,
      context,
      true
    );
    const value = varDef.map(vd => vd.resolve(this.vars));
    this.check(
      value.nonEmpty(),
      `no value provided for referenced variable '${varName}', vars: ${this.vars}`,
      context,
      true
    );
    varDef.forEach(vd => this.varRefs.add(vd));
    return new QMVarRef(
      varDef.getOrElse(new GQLVariableDefinition(varName, GQLType.Error)),
      value.getOrElse('error'),
      this.qmContext(context)
    );
  }

  protected processFuncWithArgs(context: FuncWithArgsContext): QMFunctionCall {
    const returnType = context.xsdType().text;
    const funcName = context.iriRef().text;
    const args = context
      .expressionList()
      .expression()
      .map(e => this.processExpression(e));
    return new QMFunctionCall(
      funcName,
      List<QMExpression>(args),
      returnType,
      this.qmContext(context)
    );
  }

  protected processFuncWithoutArgs(
    context: FuncWithoutArgsContext
  ): QMFunctionCall {
    const returnType = context.xsdType().text;
    const funcName = context.iriRef().text;
    return new QMFunctionCall(
      funcName,
      List<QMExpression>(),
      returnType,
      this.qmContext(context)
    );
  }

  protected processParenExpression(
    context: ParenExpressionContext
  ): QMParenExpression {
    return new QMParenExpression(
      this.processExpression(context.expression()),
      this.qmContext(context)
    );
  }

  protected processUnaryExpression(
    context: UnaryExpressionContext
  ): QMUnaryExpression {
    const op = context.unaryOp().text as QMUnaryOperator;
    const unaryMinus = op === '-';
    const expr = this.processExpression(context.expression());
    const [expectedTypes, typeName] = unaryMinus
      ? [GQLObjectQueryModifierBuilderTypes.numeric, 'numeric']
      : [GQLObjectQueryModifierBuilderTypes.bool, 'boolean'];
    this.check(
      expectedTypes.contains(expr.resultType),
      `invalid unary expression: expecting ${typeName} but got ${expr.resultType} expression`,
      context,
      true
    );
    return new QMUnaryExpression(op, expr, this.qmContext(context));
  }

  protected processFactorExpression(
    context: FactorExpressionContext
  ): QMFactorExpression {
    const op = context.factorOp().text as QMProductOperator;
    const [lhs, rhs] = context.expression().map((e, i) => {
      const qme = this.processExpression(e);
      this.check(
        GQLObjectQueryModifierBuilderTypes.numeric.contains(qme.resultType),
        `invalid ${
          i === 0 ? 'left' : 'right'
        } operand of '${op}' (expecting numeric but got ${qme.resultType})`,
        context,
        true
      );
      return qme;
    });
    return new QMFactorExpression(op, lhs, rhs, this.qmContext(context));
  }

  protected processTermExpression(
    context: TermExpressionContext
  ): QMTermExpression {
    const op = context.termOp().text as QMTermOperator;
    const [lhs, rhs] = context.expression().map((e, i) => {
      const qme = this.processExpression(e);
      this.check(
        GQLObjectQueryModifierBuilderTypes.numeric.contains(qme.resultType),
        `invalid ${
          i === 0 ? 'left' : 'right'
        } operand of '${op}' (expecting numeric but got ${qme.resultType})`,
        context,
        true
      );
      return qme;
    });
    return new QMTermExpression(op, lhs, rhs, this.qmContext(context));
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
