import { List } from 'immutable';
import { GQLArgumentDefinition } from './GQLArgumentDefinition';
import GQLTypeDefinition from './GQLTypeDefinition';

export class GQLInputType extends GQLTypeDefinition {
  public args: List<GQLArgumentDefinition>;

  constructor(
    name: string,
    description: string,
    args: List<GQLArgumentDefinition> = List<GQLArgumentDefinition>()
  ) {
    super(name, description);
    this.args = args;
  }
}
