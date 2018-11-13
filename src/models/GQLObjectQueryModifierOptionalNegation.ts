import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';
import {GQLObjectQueryModifierPredicate} from './GQLObjectQueryModifierPredicate';

export class GQLObjectQueryModifierOptionalNegation extends GQLObjectQueryModifierExpression {
    public hasNot: boolean;
    public expr: GQLObjectQueryModifierPredicate;
    public expression: string = `${this.hasNot ? '!' : ''}${this.expr.expression}`;
    public dataType: string = 'xsd:boolean';
}
