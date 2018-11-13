import Record from 'dataclass';
import {List} from 'immutable';
import {GQLObjectQueryModifierDisjunction} from './GQLObjectQueryModifierDisjunction';

export class GQLFilter extends Record<GQLFilter> {
    public expression: GQLObjectQueryModifierDisjunction;
    public fields: List<string>;
}
