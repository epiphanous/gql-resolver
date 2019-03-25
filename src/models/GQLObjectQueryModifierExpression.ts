import { None, Option } from 'funfix';
import { List, Map } from 'immutable';

interface IGQLObjectQueryModifierExpression {
  expression: string;
  dataType: string;
  underlyingValue: Option<any>;
}

export class GQLObjectQueryModifierExpression
  implements IGQLObjectQueryModifierExpression {
  public expression: string;
  public dataType: string;
  public underlyingValue: Option<any>;

  constructor(
    expression: string,
    dataType: string,
    underlyingValue: Option<any> = None
  ) {
    this.expression = expression;
    this.dataType = dataType;
    this.underlyingValue = underlyingValue;
  }
}

export class GQLObjectQueryModifierBasicExpression extends GQLObjectQueryModifierExpression {}

export class GQLObjectQueryModifierPrimitiveExpression extends GQLObjectQueryModifierExpression {}

export class GQLObjectQueryModifierField extends GQLObjectQueryModifierPrimitiveExpression {
  public toString() {
    return this.expression.toString();
  }
}

export class GQLObjectQueryModifierBasicPrimitiveExpression extends GQLObjectQueryModifierPrimitiveExpression {}

export class GQLObjectQueryModifierParensExpression extends GQLObjectQueryModifierExpression {
  public expr: GQLObjectQueryModifierExpression;
  constructor(expr: GQLObjectQueryModifierExpression) {
    super(`(${expr.expression})`, expr.dataType, expr.underlyingValue);
    this.expr = expr;
  }
}

export class GQLObjectQueryModifierDisjunction extends GQLObjectQueryModifierExpression {
  public disjunctives: List<GQLObjectQueryModifierConjunction>;
  public values: List<
    Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>
  >;
  constructor(
    disjunctives: List<GQLObjectQueryModifierConjunction>,
    values: List<Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>> = List<
      Map<
        GQLObjectQueryModifierField,
        GQLObjectQueryModifierPrimitiveExpression
      >
    >()
  ) {
    super(
      disjunctives.map(x => `(${x.expression})`).join(' || '),
      'xsd:boolean'
    );
    this.disjunctives = disjunctives;
    this.values = values;
  }
}

export class GQLObjectQueryModifierConjunction extends GQLObjectQueryModifierExpression {
  public conjunctives: List<GQLObjectQueryModifierOptionalNegation>;
  constructor(conjunctives: List<GQLObjectQueryModifierOptionalNegation>) {
    super(
      conjunctives.map(x => `(${x.expression})`).join(' && '),
      'xsd:boolean'
    );
    this.conjunctives = conjunctives;
  }
}

export class GQLObjectQueryModifierOptionalNegation extends GQLObjectQueryModifierExpression {
  public hasNot: boolean;
  public expr: GQLObjectQueryModifierPredicate;
  constructor(hasNot: boolean, expr: GQLObjectQueryModifierPredicate) {
    super(`${hasNot ? '!' : ''}${expr.expression}`, 'xsd:boolean');
    this.hasNot = hasNot;
    this.expr = expr;
  }
}

export class GQLObjectQueryModifierPredicate extends GQLObjectQueryModifierExpression {
  public expr: GQLObjectQueryModifierExpression;
  constructor(expr: GQLObjectQueryModifierExpression) {
    super(expr.expression, 'xsd:boolean', expr.underlyingValue);
    this.expr = expr;
  }
}

export class GQLObjectQueryBasicComparisonPredicate extends GQLObjectQueryModifierExpression {
  public lhs: GQLObjectQueryModifierExpression;
  public rhs: GQLObjectQueryModifierExpression;
  public op: string;
  constructor(
    lhs: GQLObjectQueryModifierExpression,
    op: string,
    rhs: GQLObjectQueryModifierExpression
  ) {
    super(`${lhs.expression} ${op} ${rhs.expression}`, 'xsd:boolean');
    this.lhs = lhs;
    this.rhs = rhs;
    this.op = op;
  }
}
