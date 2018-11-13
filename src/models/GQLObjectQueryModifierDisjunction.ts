import {List, Map} from 'immutable';
import {GQLObjectQueryModifierConjunction} from './GQLObjectQueryModifierConjunction';
import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';
import {GQLObjectQueryModifierField} from './GQLObjectQueryModifierField';
import {GQLObjectQueryModifierPrimitiveExpression} from './GQLObjectQueryModifierPrimitiveExpression';

export class GQLObjectQueryModifierDisjunction extends GQLObjectQueryModifierExpression {
    public disjunctives: List<GQLObjectQueryModifierConjunction>;
    public values: List<Map<GQLObjectQueryModifierField, GQLObjectQueryModifierPrimitiveExpression>>;
    public expression: string = this.disjunctives
        .map((x) => x.expression)
        .map((x) => `(${x})`)
        .join(' || ');
    public dataType: string = 'xsd:boolean';
}
