import { None, Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLDirective, GQLType, GQLValueType } from '.';

export class GQLVariableDefinition {
  public name: string;
  public gqlType: GQLType;
  public defaultValue: Option<GQLValueType>;
  public directives: List<GQLDirective>;

  constructor(
    name: string,
    gqlType: GQLType,
    defaultValue: Option<GQLValueType> = None,
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
  public resolve(vars: Map<string, GQLValueType>): boolean {
    // return true if vars contains a value for this variable or we have
    // a default value for this variable; otherwise false
    // todo: check type
    if (vars.has(this.name)) {
      return true;
    }
    this.defaultValue
      .map(defaultValue => {
        vars.set(this.name, defaultValue);
        return true;
      })
      .getOrElse(false);
  }
}
