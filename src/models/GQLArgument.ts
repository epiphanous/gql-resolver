import Record from 'dataclass';
import { Either } from 'funfix-core';
import { Map } from 'immutable';
import { GQLValue } from './GQLValue';
import { GQLVariable } from './GQLVariable';

export class GQLArgument extends Record<GQLArgument> {
  public name: string;
  public value: Either<GQLValue, GQLVariable>;

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
