import {List} from 'immutable';
import {GQLArgumentDefinition} from './GQLArgumentDefinition';
import {GQLTypeDefinition} from './GQLTypeDefinition';

export class GQLDirectiveDefinition extends GQLTypeDefinition {
    public args: List<GQLArgumentDefinition>;
    public locations: List<string>;
}
