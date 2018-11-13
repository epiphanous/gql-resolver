import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';

export class GQLArgumentDirective<T> extends GQLDirective {
  public argument: GQLArgument<T>;
}
