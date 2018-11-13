import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';

export class GQLObjectQueryModifierParensExpression extends GQLObjectQueryModifierExpression {
    public expr: GQLObjectQueryModifierExpression;
    public expression: string = `(${this.expr.expression})`;
    public dataType: string = this.expr.dataType;
}
