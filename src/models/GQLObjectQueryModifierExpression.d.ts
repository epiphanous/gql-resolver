import { Option } from 'funfix';
import { List, Map } from 'immutable';
export interface IGQLObjectQueryModifierExpression {
    expression: string;
    dataType: string;
    underlyingValue: Option<any>;
}
export declare class GQLObjectQueryModifierExpression implements IGQLObjectQueryModifierExpression {
    expression: string;
    dataType: string;
    underlyingValue: Option<any>;
    constructor(expression: string, dataType: string, underlyingValue?: Option<any>);
}
export declare class GQLObjectQueryModifierBasicExpression extends GQLObjectQueryModifierExpression {
}
export declare class GQLObjectQueryModifierPrimitiveExpression extends GQLObjectQueryModifierExpression {
}
export declare class GQLObjectQueryModifierField extends GQLObjectQueryModifierPrimitiveExpression {
    toString(): string;
}
export declare class GQLObjectQueryModifierBasicPrimitiveExpression extends GQLObjectQueryModifierPrimitiveExpression {
}
export declare class GQLObjectQueryModifierParensExpression extends GQLObjectQueryModifierExpression {
    expr: GQLObjectQueryModifierExpression;
    constructor(expr: GQLObjectQueryModifierExpression);
}
export declare class GQLObjectQueryModifierDisjunction extends GQLObjectQueryModifierExpression {
    disjunctives: List<GQLObjectQueryModifierConjunction>;
    values: List<Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>>;
    constructor(disjunctives: List<GQLObjectQueryModifierConjunction>, values?: List<Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>>);
}
export declare class GQLObjectQueryModifierConjunction extends GQLObjectQueryModifierExpression {
    conjunctives: List<GQLObjectQueryModifierOptionalNegation>;
    constructor(conjunctives: List<GQLObjectQueryModifierOptionalNegation>);
}
export declare class GQLObjectQueryModifierOptionalNegation extends GQLObjectQueryModifierExpression {
    hasNot: boolean;
    expr: GQLObjectQueryModifierPredicate;
    constructor(hasNot: boolean, expr: GQLObjectQueryModifierPredicate);
}
export declare class GQLObjectQueryModifierPredicate extends GQLObjectQueryModifierExpression {
    expr: GQLObjectQueryModifierExpression;
    constructor(expr: GQLObjectQueryModifierExpression);
}
export declare class GQLObjectQueryBasicComparisonPredicate extends GQLObjectQueryModifierExpression {
    lhs: GQLObjectQueryModifierExpression;
    rhs: GQLObjectQueryModifierExpression;
    op: string;
    constructor(lhs: GQLObjectQueryModifierExpression, op: string, rhs: GQLObjectQueryModifierExpression);
}
