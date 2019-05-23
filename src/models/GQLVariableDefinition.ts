import { None, Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLType } from './GQLType';
import { GQLValue, GQLVariableValue } from './GQLValue';

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

  /**
   * In the context of the querybuilder, we run this to resolve defined variables with the
   * variable values provided in the query request. We update [[vars]] with resolved
   * values and return false in cases where no value is found for a variable definition.
   * @param vars - a map of defined variable values passed in with a query
   */
  public resolve(vars: Map<string, any>) {
    // return true if
    //   - vars contains a value for name
    //   - defaultValue contains a value thats not a variable
    //   - defaultValue is a variable, who's name is in vars
    // todo: check type
    if (vars.has(this.name)) {
      return true;
    }
    if (this.defaultValue.nonEmpty()) {
      const v = this.defaultValue.get();
      const value = v.resolve(vars);
      switch (v.constructor.name) {
        case 'GQLVariableValue':
          if (vars.has(v.value.name)) {
            vars.set(this.name, value);
            return true;
          } else {
            return false;
          }
        default:
          vars.set(this.name, value);
          return true;
      }
    }
    return false;
  }
}
