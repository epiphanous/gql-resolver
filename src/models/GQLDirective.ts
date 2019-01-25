import { Option } from 'funfix';
import { List, Map } from 'immutable';
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

  public arg(name: string, vars = Map<string, any>()) {
    return Option.of(this.arguments.find(a => a.name === name)).map(a =>
      a.resolve(vars)
    );
  }
}
