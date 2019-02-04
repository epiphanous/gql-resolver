import { None, Option } from 'funfix';
import { Map } from 'immutable';
import { GQLValue } from './GQLValue';
import { GQLArgumentDefinition } from './GQLTypeDefinition';

interface IGQLArgument {
  name: string;
  value: GQLValue;
  argDefOpt: Option<GQLArgumentDefinition>;
  resolve(vars: Map<string, any>, directives: Map<string, any>): Option<any>;
}

export class GQLArgument implements IGQLArgument {
  public name: string;
  public value: GQLValue;
  public argDefOpt: Option<GQLArgumentDefinition>;

  constructor(
    name: string,
    value: GQLValue,
    argDefOpt: Option<GQLArgumentDefinition> = None
  ) {
    this.name = name;
    this.value = value;
    this.argDefOpt = argDefOpt;
  }

  public resolve(
    vars: Map<string, any>,
    directives: Map<string, any> = Map<string, any>()
  ) {
    return this.value.resolve(vars, this.argDefOpt, directives);
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
