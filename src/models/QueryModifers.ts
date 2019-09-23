import { List } from 'immutable';
import { GQLFieldDefinition } from './GQLTypeDefinition';
import { GQLValueType } from './GQLValueType';
import { GQLVariableDefinition } from './GQLVariableDefinition';

export type QMTermOperator = '+' | '-';
export type QMUnaryOperator = '+' | '-' | '!';
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
  public static readonly DUMMY = new QMContext();
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

  constructor(resultType: string, context: QMContext = QMContext.DUMMY) {
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
    expression: QMExpression,
    desc: boolean = false,
    context: QMContext = QMContext.DUMMY
  ) {
    super(expression.resultType, context);
    this.expression = expression;
    this.desc = desc;
  }
}

export class QMDisjunction extends QueryModifiers {
  public conjunctions: List<QMConjunction>;
  constructor(
    conjunctions: List<QMConjunction>,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
    this.conjunctions = conjunctions;
  }
}

export class QMConjunction extends QueryModifiers {
  public optionalNegations: List<QMOptionalNegation>;
  constructor(
    optionalNegations: List<QMOptionalNegation>,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
    this.optionalNegations = optionalNegations;
  }
}

export class QMOptionalNegation extends QueryModifiers {
  public predicate: QMPredicate;
  public negate: boolean;
  constructor(
    predicate: QMPredicate,
    negate: boolean,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
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
    operator: QMComparisonOperator,
    left: QMExpression,
    right: QMExpression,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
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
    target: QMExpression,
    list: List<QMExpression>,
    negate: boolean,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
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
    target: QMExpression,
    varRef: QMVarRef,
    negate: boolean,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
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

  constructor(
    disjunction: QMDisjunction,
    context: QMContext = QMContext.DUMMY
  ) {
    super('xsd:boolean', context);
    this.disjunction = disjunction;
  }
}

export abstract class QMExpression extends QueryModifiers {}

export class QMUnaryExpression extends QMExpression {
  public operator: QMUnaryOperator;
  public expression: QMExpression;

  constructor(
    operator: QMUnaryOperator,
    expression: QMExpression,
    context: QMContext = QMContext.DUMMY
  ) {
    super(expression.resultType, context);
    this.operator = operator;
    this.expression = expression;
  }
}

export class QMFactorExpression extends QMExpression {
  public operator: QMProductOperator;
  public left: QMExpression;
  public right: QMExpression;

  constructor(
    operator: QMProductOperator,
    left: QMExpression,
    right: QMExpression,
    context: QMContext = QMContext.DUMMY
  ) {
    super(left.resultType, context);
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
    operator: QMTermOperator,
    left: QMExpression,
    right: QMExpression,
    context: QMContext = QMContext.DUMMY
  ) {
    super(left.resultType, context);
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
  constructor(expression: QMExpression, context: QMContext = QMContext.DUMMY) {
    super(expression.resultType, context);
    this.expression = expression;
  }
}

export class QMFunctionCall extends QMPrimitiveExpression {
  public name: string;
  public args: List<QMExpression>;

  constructor(
    name: string,
    args: List<QMExpression>,
    resultType: string,
    context: QMContext = QMContext.DUMMY
  ) {
    super(resultType, context);
    this.name = name;
    this.args = args;
  }
}

export class QMLiteral extends QMPrimitiveExpression {
  public value: string;

  constructor(
    value: string,
    resultType: string,
    context: QMContext = QMContext.DUMMY
  ) {
    super(resultType, context);
    this.value = value;
  }
}

export class QMStringLiteral extends QMLiteral {
  constructor(value: string, context: QMContext = QMContext.DUMMY) {
    super(value, 'xsd:string', context);
  }
}

export class QMNumericLiteral extends QMLiteral {}

export class QMIntegerLiteral extends QMNumericLiteral {
  constructor(value: string | number, context: QMContext = QMContext.DUMMY) {
    super(String(value), 'xsd:integer', context);
  }
}

export class QMDecimalLiteral extends QMNumericLiteral {
  constructor(value: string | number, context: QMContext = QMContext.DUMMY) {
    super(String(value), 'xsd:decimal', context);
  }
}

export class QMDoubleLiteral extends QMNumericLiteral {
  constructor(value: string | number, context: QMContext = QMContext.DUMMY) {
    super(String(value), 'xsd:double', context);
  }
}

export class QMBooleanLiteral extends QMLiteral {
  constructor(value: boolean, context: QMContext = QMContext.DUMMY) {
    super(String(value), 'xsd:boolean', context);
  }
}

export class QMIriRef extends QMPrimitiveExpression {
  public iri: string;

  constructor(iri: string, context: QMContext = QMContext.DUMMY) {
    super('xsd:anyURI', context);
    this.iri = iri;
  }
}

export class QMVarRef extends QMPrimitiveExpression {
  public variable: GQLVariableDefinition;
  public value: GQLValueType;
  constructor(
    variable: GQLVariableDefinition,
    value: GQLValueType,
    context: QMContext = QMContext.DUMMY
  ) {
    super(variable.gqlType.xsdType(), context);
    this.variable = variable;
    this.value = value;
  }
}

export class QMFieldRef extends QMPrimitiveExpression {
  public field: GQLFieldDefinition;
  constructor(field: GQLFieldDefinition, context: QMContext = QMContext.DUMMY) {
    super(field.gqlType.xsdType(), context);
    this.field = field;
  }
}
