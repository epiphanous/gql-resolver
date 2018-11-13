import { Option } from 'funfix-core';
import { GQLTypeDefinition } from './GQLTypeDefinition';

export default class GQLScalarType extends GQLTypeDefinition<GQLScalarType> {
  public nativeType: Option<string>;
}
