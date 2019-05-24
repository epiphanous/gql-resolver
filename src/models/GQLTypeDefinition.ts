import { None, Option } from 'funfix';
import { List } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';

export interface IGQLTypeDefinition {
  name: string;
  description: Option<string>;
  directives: List<GQLDirective>;

  deprecated(): Option<string>;
}

export class GQLTypeDefinition implements IGQLTypeDefinition {
  public name: string;
  public description: Option<string>;
  public directives: List<GQLDirective>;

  constructor(
    name: string,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    this.name = name;
    this.description = description;
    this.directives = directives;
  }

  public deprecated() {
    return Option.of(this.directives.find(d => d.name === 'deprecated'))
      .map(d => d.arguments.find(arg => arg.name === 'reason'))
      .map(arg => arg.value)
      .map(v => v.value as string);
  }
}

export interface IGQLInterface extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
}

export class GQLInterface extends GQLTypeDefinition implements IGQLInterface {
  public fields: List<GQLFieldDefinition>;

  constructor(
    name: string,
    fields: List<GQLFieldDefinition>,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.fields = fields;
  }

  public idFields(): List<GQLFieldDefinition> {
    return this.fields.filter(f => f.isIdField());
  }
}

export interface IGQLObjectType extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
  interfaces: List<string>;
}

export class GQLObjectType extends GQLTypeDefinition implements IGQLObjectType {
  public fields: List<GQLFieldDefinition>;
  public interfaces: List<string>;

  constructor(
    name: string,
    fields: List<GQLFieldDefinition>,
    interfaces: List<string>,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.fields = fields;
    this.interfaces = interfaces;
  }

  public copy(newProps: Partial<IGQLObjectType>): GQLObjectType {
    return new GQLObjectType(
      newProps.name || this.name,
      newProps.fields || this.fields,
      newProps.interfaces || this.interfaces,
      newProps.description || this.description,
      newProps.directives || this.directives
    );
  }

  public idFields(): List<GQLFieldDefinition> {
    return this.fields.filter(f => f.isIdField());
  }
}

export interface IGQLFieldDefinition extends IGQLTypeDefinition {
  gqlType: GQLType;
  args: List<GQLArgumentDefinition>;
}

export class GQLFieldDefinition extends GQLTypeDefinition
  implements IGQLFieldDefinition {
  public gqlType: GQLType;
  public args: List<GQLArgumentDefinition>;

  constructor(
    name: string,
    gqlType: GQLType,
    args: List<GQLArgumentDefinition> = List<GQLArgumentDefinition>(),
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.gqlType = gqlType;
    this.args = args;
  }

  public isIdField(): boolean {
    return Option.of(this.directives.find(d => d.name === 'id')).nonEmpty();
  }
}

export interface IGQLArgumentDefinition extends IGQLTypeDefinition {
  gqlType: GQLType;
  defaultValue: Option<GQLValue>;
}

export class GQLArgumentDefinition extends GQLTypeDefinition
  implements IGQLArgumentDefinition {
  public gqlType: GQLType;
  public defaultValue: Option<GQLValue>;

  constructor(
    name: string,
    gqlType: GQLType,
    defaultValue: Option<GQLValue> = None,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.gqlType = gqlType;
    this.defaultValue = defaultValue;
  }
}

export interface IGQLInputType extends IGQLTypeDefinition {
  args: List<GQLArgumentDefinition>;
}

export class GQLInputType extends GQLTypeDefinition implements IGQLInputType {
  public args: List<GQLArgumentDefinition>;

  constructor(
    name: string,
    args = List<GQLArgumentDefinition>(),
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.args = args;
  }
}

export interface IGQLDirectiveDefinition extends IGQLTypeDefinition {
  args: List<GQLArgumentDefinition>;
  locations: List<string>;
}

export class GQLDirectiveDefinition extends GQLTypeDefinition
  implements IGQLDirectiveDefinition {
  public args: List<GQLArgumentDefinition>;
  public locations: List<string>;

  constructor(
    name: string,
    args = List<GQLArgumentDefinition>(),
    locations = List<string>(),
    description: Option<string> = None
  ) {
    super(name, description);
    this.args = args;
    this.locations = locations;
  }
}

export interface IGQLUnion extends IGQLTypeDefinition {
  gqlTypes: List<string>;
}

export class GQLUnion extends GQLTypeDefinition implements IGQLUnion {
  public gqlTypes: List<string>;

  constructor(
    name: string,
    gqlTypes: List<string>,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.gqlTypes = gqlTypes;
  }
}

export class GQLEnumValueDefinition extends GQLTypeDefinition {
  constructor(
    name: string,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
  }
}

export interface IGQLEnum extends IGQLTypeDefinition {
  values: List<GQLEnumValueDefinition>;
}

export class GQLEnum extends GQLTypeDefinition implements IGQLEnum {
  public values: List<GQLEnumValueDefinition>;

  constructor(
    name: string,
    values: List<GQLEnumValueDefinition>,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.values = values;
  }
}

export interface IGQLScalarType extends IGQLTypeDefinition {
  nativeType: string;
}

export class GQLScalarType extends GQLTypeDefinition implements IGQLScalarType {
  public nativeType: string;

  constructor(
    name: string,
    description: Option<string> = None,
    directives = List<GQLDirective>()
  ) {
    super(name, description, directives);
    this.nativeType = GQLType._xsdType(name);
  }
}
