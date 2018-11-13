import { None, Option } from 'funfix';
import { List } from 'immutable';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';

interface IGQLTypeDefinition {
  name: string;
  description: string;
}

export class GQLTypeDefinition implements IGQLTypeDefinition {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

interface IGQLInterface extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
}

export class GQLInterface extends GQLTypeDefinition implements IGQLInterface {
  public fields: List<GQLFieldDefinition>;

  constructor(
    name: string,
    description: string,
    fields: List<GQLFieldDefinition>
  ) {
    super(name, description);
    this.fields = fields;
  }
}

interface IGQLObjectType extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
  interfaces: List<string>;
}

export class GQLObjectType extends GQLTypeDefinition implements IGQLObjectType {
  public fields: List<GQLFieldDefinition>;
  public interfaces: List<string>;

  constructor(
    name: string,
    description: string,
    fields: List<GQLFieldDefinition>,
    interfaces: List<string>
  ) {
    super(name, description);
    this.fields = fields;
    this.interfaces = interfaces;
  }

  public copy(newProps: Partial<IGQLObjectType>): GQLObjectType {
    return new GQLObjectType(
      newProps.name || this.name,
      newProps.description || this.description,
      newProps.fields || this.fields,
      newProps.interfaces || this.interfaces
    );
  }
}

interface IGQLFieldDefinition extends IGQLTypeDefinition {
  gqlType: GQLType;
  isDeprecated?: boolean;
  deprecationReason?: Option<string>;
  args: List<GQLArgumentDefinition>;
}

export class GQLFieldDefinition extends GQLTypeDefinition
  implements IGQLFieldDefinition {
  public gqlType: GQLType;
  public isDeprecated: boolean;
  public deprecationReason: Option<string>;
  public args: List<GQLArgumentDefinition>;

  constructor(
    name: string,
    description: string,
    gqlType: GQLType,
    isDeprecated: boolean = false,
    deprecationReason: Option<string> = None,
    args: List<GQLArgumentDefinition> = List<GQLArgumentDefinition>()
  ) {
    super(name, description);
    this.gqlType = gqlType;
    this.isDeprecated = isDeprecated;
    this.deprecationReason = deprecationReason;
    this.args = args;
  }
}

interface IGQLArgumentDefinition extends IGQLTypeDefinition {
  gqlType: GQLType;
  defaultValue: Option<GQLValue>;
}

export class GQLArgumentDefinition extends GQLTypeDefinition
  implements IGQLArgumentDefinition {
  public gqlType: GQLType;
  public defaultValue: Option<GQLValue>;

  constructor(
    name: string,
    description: string,
    gqlType: GQLType,
    defaultValue: Option<GQLValue> = None
  ) {
    super(name, description);
    this.gqlType = gqlType;
    this.defaultValue = defaultValue;
  }
}

interface IGQLInputType extends IGQLTypeDefinition {
  args: List<GQLArgumentDefinition>;
}

export class GQLInputType extends GQLTypeDefinition implements IGQLInputType {
  public args: List<GQLArgumentDefinition>;

  constructor(
    name: string,
    description: string,
    args: List<GQLArgumentDefinition> = List<GQLArgumentDefinition>()
  ) {
    super(name, description);
    this.args = args;
  }
}

interface IGQLDirectiveDefinition extends IGQLTypeDefinition {
  args: List<GQLArgumentDefinition>;
  locations: List<string>;
}

export class GQLDirectiveDefinition extends GQLTypeDefinition
  implements IGQLDirectiveDefinition {
  public args: List<GQLArgumentDefinition>;
  public locations: List<string>;

  constructor(
    name: string,
    description: string,
    args: List<GQLArgumentDefinition> = List<GQLArgumentDefinition>(),
    locations: List<string> = List<string>()
  ) {
    super(name, description);
    this.args = args;
    this.locations = locations;
  }
}

interface IGQLUnion extends IGQLTypeDefinition {
  gqlTypes: List<string>;
}

export class GQLUnion extends GQLTypeDefinition implements IGQLUnion {
  public gqlTypes: List<string>;

  constructor(name: string, description: string, gqlTypes: List<string>) {
    super(name, description);
    this.gqlTypes = gqlTypes;
  }
}

interface IGQLEnumValueDefinition extends IGQLTypeDefinition {
  isDeprecated: boolean;
  deprecationReason: Option<string>;
}

export class GQLEnumValueDefinition extends GQLTypeDefinition
  implements IGQLEnumValueDefinition {
  public isDeprecated: boolean;
  public deprecationReason: Option<string>;

  constructor(
    name: string,
    description: string,
    isDeprecated: boolean = false,
    deprecationReason: Option<string> = None
  ) {
    super(name, description);
    this.isDeprecated = isDeprecated;
    this.deprecationReason = deprecationReason;
  }
}
interface IGQLEnum extends IGQLTypeDefinition {
  values: List<GQLEnumValueDefinition>;
}

export class GQLEnum extends GQLTypeDefinition implements IGQLEnum {
  public values: List<GQLEnumValueDefinition>;

  constructor(
    name: string,
    description: string,
    values: List<GQLEnumValueDefinition>
  ) {
    super(name, description);
    this.values = values;
  }
}

interface IGQLScalarType extends IGQLTypeDefinition {
  nativeType: Option<string>;
}

export class GQLScalarType extends GQLTypeDefinition implements IGQLScalarType {
  public nativeType: Option<string>;

  constructor(name: string, description: string, nativeType: Option<string>) {
    super(name, description);
    this.nativeType = nativeType;
  }
}
