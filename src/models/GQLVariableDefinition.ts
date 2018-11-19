import { Either, None, Option } from 'funfix';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';
import { GQLVariable } from './GQLVariable';

interface IGQLVariableDefinition {
  name: string;
  gqlType: GQLType;
  description: Option<string>;
  defaultValue: Option<Either<GQLValue, GQLVariable>>;
}
export class GQLVariableDefinition implements IGQLVariableDefinition {
  public name: string;
  public gqlType: GQLType;
  public description: Option<string>;
  public defaultValue: Option<Either<GQLValue, GQLVariable>>;

  constructor(
    name: string,
    gqlType: GQLType,
    description: Option<string> = None,
    defaultValue: Option<Either<GQLValue, GQLVariable>> = None
  ) {
    this.name = name;
    this.gqlType = gqlType;
    this.description = description;
    this.defaultValue = defaultValue;
  }
}
