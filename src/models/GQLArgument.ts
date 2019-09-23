import { Option } from 'funfix';
import { Map } from 'immutable';
import { GQLValueType } from '.';

export class GQLArgument {
  public name: string;
  public value: GQLValueType;

  constructor(name: string, value: GQLValueType) {
    this.name = name;
    this.value = value;
  }

  public resolve(vars: Map<string, GQLValueType>): GQLValueType {
    if (
      typeof this.value === 'string' &&
      /^\$([_A-Za-z][_0-9A-Za-z]*)$/.test(this.value)
    ) {
      return Option.of(vars.get(RegExp.$1)).getOrElse(null);
    }
    return this.value;
  }
}

export class GQLAfterArgument extends GQLArgument {}
export class GQLAnyArgument extends GQLArgument {}
export class GQLBeforeArgument extends GQLArgument {}
export class GQLFilterArgument extends GQLArgument {}
export class GQLFirstArgument extends GQLArgument {}
export class GQLIncludeDeprecatedArgument extends GQLArgument {}
export class GQLInvalidArgument extends GQLArgument {}
export class GQLLastArgument extends GQLArgument {}
export class GQLNameArgument extends GQLArgument {}
export class GQLOrderByArgument extends GQLArgument {}
