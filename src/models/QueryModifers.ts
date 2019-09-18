import { List } from 'immutable';
import { GQLFieldDefinition } from './GQLTypeDefinition';
import { GQLVariableDefinition } from './GQLVariableDefinition';

export type QMTermOperator = '+' | '-';
export type QMProductOperator = '*' | '/' | '%';
export type QMComparisonOperator =
  | '>'
  | '>='
  | '<'
  | '<='
  | '='
  | '!='
  | '~'
  | '!~';

export class QMContext {
  public label: string;
  public line: number;
  public column: number;
  constructor(label: string = 'unknown', line: number = 1, column: number = 1) {
    this.label = label;
    this.line = line;
    this.column = column;
  }
}

export abstract class QueryModifiers {
  public context: QMContext;
  public resultType: string;

  constructor(context: QMContext, resultType: string) {
    this.context = context;
    this.resultType = resultType;
  }

  public conformableCheck(message: string): string | null {
    return null;
  }

  public conformableTypesCheck(
    types: List<string>,
    message: string = 'non-conformable expressions in query modifier'
  ): string | null {
    return types.toSet().size !== 1
      ? `[${this.context.label}:${this.context.line}:${this.context.column}] - ${message}`
      : null;
  }

  public conformableExpressionsCheck(
    expressions: List<QMExpression>,
    message: string = 'non-conformable expressions in query modifier'
  ): string | null {
    return this.conformableTypesCheck(
      expressions.map(e => e.resultType),
      message
    );
  }
}

export class QMOrderBy extends QueryModifiers {
  public expression: QMExpression;
  public desc: boolean;

  constructor(
    context: QMContext,
    expression: QMExpression,
    desc: boolean = false
  ) {
    super(context, expression.resultType);
    this.expression = expression;
    this.desc = desc;
  }
}

export class QMDisjunction extends QueryModifiers {
  public conjunctions: List<QMConjunction>;
  constructor(context: QMContext, conjunctions: List<QMConjunction>) {
    super(context, 'xsd:boolean');
    this.conjunctions = conjunctions;
  }
}

export class QMConjunction extends QueryModifiers {
  public optionalNegations: List<QMOptionalNegation>;
  constructor(context: QMContext, optionalNegations: List<QMOptionalNegation>) {
    super(context, 'xsd:boolean');
    this.optionalNegations = optionalNegations;
  }
}

export class QMOptionalNegation extends QueryModifiers {
  public predicate: QMPredicate;
  public negate: boolean;
  constructor(context: QMContext, predicate: QMPredicate, negate: boolean) {
    super(context, 'xsd:boolean');
    this.predicate = predicate;
    this.negate = negate;
  }
}

export abstract class QMPredicate extends QueryModifiers {}

export class QMComparisonPredicate extends QMPredicate {
  public operator: QMComparisonOperator;
  public left: QMExpression;
  public right: QMExpression;

  constructor(
    context: QMContext,
    operator: QMComparisonOperator,
    left: QMExpression,
    right: QMExpression
  ) {
    super(context, 'xsd:boolean');
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  public conformableCheck(message: string) {
    return this.conformableExpressionsCheck(
      List([this.left, this.right]),
      message
    );
  }
}

export class QMInPredicate extends QMPredicate {
  public target: QMExpression;
  public list: List<QMExpression>;
  public negate: boolean;

  constructor(
    context: QMContext,
    target: QMExpression,
    list: List<QMExpression>,
    negate: boolean
  ) {
    super(context, 'xsd:boolean');
    this.target = target;
    this.list = list;
    this.negate = negate;
  }

  public conformableCheck(message: string) {
    return this.conformableExpressionsCheck(
      this.list.concat([this.target]),
      message
    );
  }
}

export class QMInVarPredicate extends QMPredicate {
  public target: QMExpression;
  public varRef: QMVarRef;
  public negate: boolean;

  constructor(
    context: QMContext,
    target: QMExpression,
    varRef: QMVarRef,
    negate: boolean
  ) {
    super(context, 'xsd:boolean');
    this.target = target;
    this.varRef = varRef;
    this.negate = negate;
  }

  public conformableCheck(message: string) {
    return this.conformableTypesCheck(
      List([this.target.resultType, this.varRef.variable.gqlType.xsdType()]),
      message
    );
  }
}

export class QMParenPredicate extends QMPredicate {
  public disjunction: QMDisjunction;

  constructor(context: QMContext, disjunction: QMDisjunction) {
    super(context, 'xsd:boolean');
    this.disjunction = disjunction;
  }
}

export abstract class QMExpression extends QueryModifiers {}

export class QMUnaryExpression extends QMExpression {
  public expression: QMExpression;

  constructor(context: QMContext, expression: QMExpression) {
    super(context, expression.resultType);
    this.expression = expression;
  }
}

export class QMFactorExpression extends QMExpression {
  public operator: QMProductOperator;
  public left: QMExpression;
  public right: QMExpression;

  constructor(
    context: QMContext,
    operator: QMProductOperator,
    left: QMExpression,
    right: QMExpression
  ) {
    super(context, left.resultType);
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  public conformableCheck(message: string) {
    return this.conformableExpressionsCheck(
      List([this.left, this.right]),
      message
    );
  }
}

export class QMTermExpression extends QMExpression {
  public operator: QMTermOperator;
  public left: QMExpression;
  public right: QMExpression;

  constructor(
    context: QMContext,
    operator: QMTermOperator,
    left: QMExpression,
    right: QMExpression
  ) {
    super(context, left.resultType);
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  public conformableCheck(message: string) {
    return this.conformableExpressionsCheck(
      List([this.left, this.right]),
      message
    );
  }
}

export class QMPrimitiveExpression extends QMExpression {}

export class QMParenExpression extends QMExpression {
  public expression: QMExpression;
  constructor(context: QMContext, expression: QMExpression) {
    super(context, expression.resultType);
    this.expression = expression;
  }
}

export class QMFunctionCall extends QMPrimitiveExpression {
  public name: string;
  public args: List<QMExpression>;

  constructor(
    context: QMContext,
    name: string,
    args: List<QMExpression>,
    resultType: string
  ) {
    super(context, resultType);
    this.name = name;
    this.args = args;
  }
}

export class QMLiteral extends QMPrimitiveExpression {
  public value: string;

  constructor(context: QMContext, value: string, resultType: string) {
    super(context, resultType);
    this.value = value;
  }
}

export class QMStringLiteral extends QMLiteral {
  constructor(context: QMContext, value: string) {
    super(context, value, 'xsd:string');
  }
}

export class QMNumericLiteral extends QMLiteral {}

export class QMIntegerLiteral extends QMNumericLiteral {
  constructor(context: QMContext, value: string | number) {
    super(context, String(value), 'xsd:integer');
  }
}

export class QMDecimalLiteral extends QMNumericLiteral {
  constructor(context: QMContext, value: string | number) {
    super(context, String(value), 'xsd:decimal');
  }
}

export class QMDoubleLiteral extends QMNumericLiteral {
  constructor(context: QMContext, value: string | number) {
    super(context, String(value), 'xsd:double');
  }
}

export class QMBooleanLiteral extends QMLiteral {
  constructor(context: QMContext, value: boolean) {
    super(context, String(value), 'xsd:boolean');
  }
}

export class QMIriRef extends QMPrimitiveExpression {
  public iri: string;

  constructor(context: QMContext, iri: string) {
    super(context, 'xsd:anyURI');
    this.iri = iri;
  }
}

export class QMVarRef extends QMPrimitiveExpression {
  public variable: GQLVariableDefinition;
  public value: string;
  constructor(
    context: QMContext,
    variable: GQLVariableDefinition,
    value: string
  ) {
    super(context, variable.gqlType.xsdType());
    this.variable = variable;
    this.value = value;
  }
}

export class QMFieldRef extends QMPrimitiveExpression {
  public field: GQLFieldDefinition;
  constructor(context: QMContext, field: GQLFieldDefinition) {
    super(context, field.gqlType.xsdType());
    this.field = field;
  }
}
