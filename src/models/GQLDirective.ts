import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';

interface IGQLDirective {
  name: string;
  arguments: List<GQLArgument>;
}

export class GQLDirective implements IGQLDirective {
  public name: string;
  public arguments: List<GQLArgument>;

  constructor(name: string, args: List<GQLArgument> = List<GQLArgument>()) {
    this.name = name;
    this.arguments = args;
  }
}
