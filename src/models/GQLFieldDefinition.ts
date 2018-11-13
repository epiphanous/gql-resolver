import {Option} from 'funfix-core';
import {List} from 'immutable';
import {GQLArgumentDefinition} from './GQLArgumentDefinition';
import {GQLType} from './GQLType';
import {GQLTypeDefinition} from './GQLTypeDefinition';

export class GQLFieldDefinition extends GQLTypeDefinition {
    public isDeprecated: boolean;
    public deprecationReason: Option<string>;
    public gqlType: GQLType;
    public args: List<GQLArgumentDefinition>;
}
