import { List } from 'immutable';
import { GQLTypeDefinition } from './GQLTypeDefinition';

export class GQLUnion extends GQLTypeDefinition<GQLUnion> {
  public gqlTypes: List<string>;
}
