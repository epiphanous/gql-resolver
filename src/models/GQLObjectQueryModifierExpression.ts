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

export class GQLObjectQueryModifierField extends GQLObjectQueryModifierPrimitiveExpression {}

export class GQLObjectQueryModifierBasicPrimitiveExpression extends GQLObjectQueryModifierPrimitiveExpression {
  public expression: string;
  public dataType: string;
  public underlyingValue: Option<any> = None;
}

export class GQLObjectQueryBasicComparisonPredicate extends GQLObjectQueryModifierExpression {
  constructor(
    lhs: GQLObjectQueryModifierExpression,
    op: string,
    rhs: GQLObjectQueryModifierExpression
  ) {
    super(`${lhs.expression} ${op} ${rhs.expression}`, 'xsd:boolean');
  }
}

export class GQLObjectQueryModifierOptionalNegation extends GQLObjectQueryModifierExpression {
  public hasNot: boolean;
  public expr;
  constructor(hasNot: boolean, expr: GQLObjectQueryModifierPredicate) {
    super(`${hasNot ? '!' : ''}${expr.expression}`, 'xsd:boolean');
    this.hasNot = hasNot;
    this.expr = expr;
  }
}

export class GQLObjectQueryModifierConjunction extends GQLObjectQueryModifierExpression {
  public conjunctives: List<GQLObjectQueryModifierOptionalNegation>;
  constructor(
    conjunctives: List<GQLObjectQueryModifierOptionalNegation> = List<
      GQLObjectQueryModifierOptionalNegation
    >()
  ) {
    super(
      conjunctives.map(x => `(${x.expression})`).join(' && '),
      'xsd:boolean'
    );
    this.conjunctives = conjunctives;
  }
}

export class GQLObjectQueryModifierDisjunction extends GQLObjectQueryModifierExpression {
  public disjunctives: List<GQLObjectQueryModifierConjunction>;
  public values: List<
    Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>
  >;
  constructor(
    disjunctives: List<GQLObjectQueryModifierConjunction>,
    values: List<
      Map<
        GQLObjectQueryModifierField,
        GQLObjectQueryModifierPrimitiveExpression
      >
    >
  ) {
    super(
      disjunctives.map(x => `(${x.expression})`).join(' || '),
      'xsd:boolean'
    );
    this.disjunctives = disjunctives;
    this.values = values;
  }
}

export class GQLObjectQueryModifierParensExpression extends GQLObjectQueryModifierExpression {
  public expr;
  constructor(expr: GQLObjectQueryModifierExpression) {
    super(`(${expr.expression})`, expr.dataType);
    this.expr = expr;
  }
}

export class GQLObjectQueryModifierPredicate extends GQLObjectQueryModifierExpression {
  constructor(expr: GQLObjectQueryModifierExpression) {
    super(expr.expression, 'xsd:boolean');
  }
}
