import {List} from 'immutable';
import {GQLFieldDefinition} from './GQLFieldDefinition';
import {GQLTypeDefinition} from './GQLTypeDefinition';

export class GQLInterface extends GQLTypeDefinition {
    public fields: List<GQLFieldDefinition> = List<GQLFieldDefinition>();
}
