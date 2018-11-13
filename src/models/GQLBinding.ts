import Record from 'dataclass';
import {GQLObjectQueryModifierExpression} from './GQLObjectQueryModifierExpression';

export class GQLBinding extends Record<GQLBinding> {
    public name: string;
    public expression: GQLObjectQueryModifierExpression;
}
