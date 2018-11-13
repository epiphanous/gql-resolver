import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';

export class GQLObjectQueryModifierPredicate extends GQLObjectQueryModifierExpression {
    public expr: GQLObjectQueryModifierExpression;
    public expression = this.expr.expression;
    public dataType: string = 'xsd:boolean';
}
