import { None, Option } from 'funfix-core';
import { GQLType } from './GQLType';
import { GQLTypeDefinition } from './GQLTypeDefinition';
import { GQLValue } from './GQLValue';

export class GQLArgumentDefinition extends GQLTypeDefinition<
  GQLArgumentDefinition
> {
  public gqlType: GQLType;
  public defaultValue: Option<GQLValue> = None;
}
