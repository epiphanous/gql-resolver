import { Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLArgument } from '.';

export interface IGQLDirective {
  name: string;
  args: List<GQLArgument>;
}

export class GQLDirective implements IGQLDirective {
  public name: string;
  public args: List<GQLArgument>;

  constructor(name: string, args = List<GQLArgument>()) {
    this.name = name;
    this.args = args;
  }

  public arg(name: string, vars = Map<string, any>()) {
    return Option.of(this.args.find(a => a.name === name)).map(a =>
      a.resolve(vars)
    );
  }
}
