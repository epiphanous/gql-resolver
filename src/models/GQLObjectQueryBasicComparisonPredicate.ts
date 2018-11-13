import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';

export class GQLObjectQueryBasicComparisonPredicate extends GQLObjectQueryModifierExpression {
    public lhs: GQLObjectQueryModifierExpression;
    public op: string;
    public rhs: GQLObjectQueryModifierExpression;
    public expression = `${this.lhs.expression} ${this.op} ${this.rhs.expression}`;
    public dataType: string = 'xsd:boolean';
}
