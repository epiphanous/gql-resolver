import { Map } from 'immutable';
import { GQLValue } from './GQLValue';

interface IGQLArgument {
  name: string;
  value: GQLValue;
  resolve(vars: Map<string, any>): any;
}

export class GQLArgument implements IGQLArgument {
  public name: string;
  public value: GQLValue;

  constructor(name: string, value: GQLValue) {
    this.name = name;
    this.value = value;
  }

  public resolve(vars: Map<string, any>) {
    return this.value.resolve(vars);
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
