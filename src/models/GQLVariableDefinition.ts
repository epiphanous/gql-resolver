import { None, Option } from 'funfix';
import { List } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';

interface IGQLVariableDefinition {
  name: string;
  gqlType: GQLType;
  defaultValue: Option<GQLValue>;
  directives: List<GQLDirective>;
}
export class GQLVariableDefinition implements IGQLVariableDefinition {
  public name: string;
  public gqlType: GQLType;
  public defaultValue: Option<GQLValue>;
  public directives: List<GQLDirective>;

  constructor(
    name: string,
    gqlType: GQLType,
    defaultValue: Option<GQLValue> = None,
    directives: List<GQLDirective> = List<GQLDirective>()
  ) {
    this.name = name;
    this.gqlType = gqlType;
    this.defaultValue = defaultValue;
    this.directives = directives;
  }
}
