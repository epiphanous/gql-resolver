import { Either } from 'funfix';
import { Map } from 'immutable';
import { GQLValue } from './GQLValue';
import { GQLVariable } from './GQLVariable';

interface IGQLArgument {
  name: string;
  value: Either<GQLValue, GQLVariable>;
}

export class GQLArgument implements IGQLArgument {
  public name: string;
  public value: Either<GQLValue, GQLVariable>;

  constructor(name: string, value: Either<GQLValue, GQLVariable>) {
    this.name = name;
    this.value = value;
  }

  public resolve(vars: Map<string, any>) {
    const x = this.value.fold<string>(
      v => v.value,
      v => {
        if (!vars.has(v.name)) {
          throw new Error(
            `value not provided for variable ${
              v.name
            } in context of argument '${name}'`
          );
        }
        return vars.get(v.name);
      }
    );
    return x.toString();
  }
}

export class GQLAnyArgument extends GQLArgument {}
export class GQLBindingsArgument extends GQLArgument {}
export class GQLBoostersArgument extends GQLArgument {}
export class GQLFilterArgument extends GQLArgument {}
export class GQLIncludeDeprecatedArgument extends GQLArgument {}
export class GQLInvalidArgument extends GQLArgument {}
export class GQLLimitArgument extends GQLArgument {}
export class GQLNameArgument extends GQLArgument {}
export class GQLOffsetArgument extends GQLArgument {}
export class GQLOrderArgument extends GQLArgument {}
export class GQLPatternsArgument extends GQLArgument {}
export class GQLTransformsArgument extends GQLArgument {}
