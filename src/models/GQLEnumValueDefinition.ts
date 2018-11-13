import {Option} from 'funfix-core';
import {GQLTypeDefinition} from './GQLTypeDefinition';

export class GQLEnumValueDefinition extends GQLTypeDefinition {
    public isDeprecated: boolean;
    public deprecationReason: Option<string>;
}
