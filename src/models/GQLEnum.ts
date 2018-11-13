import {List} from 'immutable';
import {GQLEnumValueDefinition} from './GQLEnumValueDefinition';
import {GQLTypeDefinition} from './GQLTypeDefinition';

export class GQLEnum extends GQLTypeDefinition {
    public values: List<GQLEnumValueDefinition>;
}
