import {List} from 'immutable';
import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';
import {GQLObjectQueryModifierOptionalNegation} from './GQLObjectQueryModifierOptionalNegation';

export class GQLObjectQueryModifierConjunction extends GQLObjectQueryModifierExpression {
    public conjunctives: List<GQLObjectQueryModifierOptionalNegation>;
    public expression: string = this.conjunctives
        .map((x) => x.expression)
        .map((x) => `(${x})`)
        .join(' && ');
    public dataType: string = 'xsd:boolean';
}
