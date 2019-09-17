import { List } from 'immutable';
import { GQLDirective, GQLSelection } from '.';

export interface IGQLFragmentDefinition {
  name: string;
  typeCondition: string;
  directives: List<GQLDirective>;
  selections: List<GQLSelection>;
}

export class GQLFragmentDefinition implements IGQLFragmentDefinition {
  public name: string;
  public typeCondition: string;
  public directives: List<GQLDirective>;
  public selections: List<GQLSelection>;

  constructor(
    name: string,
    typeCondition: string,
    directives: List<GQLDirective> = List(),
    selections: List<GQLSelection> = List()
  ) {
    this.name = name;
    this.typeCondition = typeCondition;
    this.directives = directives;
    this.selections = selections;
  }
}
