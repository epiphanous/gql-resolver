import { Option } from 'funfix';
import { List } from 'immutable';
import { GQLArgumentDefinition } from './GQLArgumentDefinition';
import { GQLFieldDefinition } from './GQLFieldDefinition';
import { GQLType } from './GQLType';

interface IGQLTypeDefinition {
  name: string;
  description: string;
}

interface IGQLInterface extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
}

interface IGQLObjectType extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
  interfaces: List<string>;
}

interface IGQLFieldDefinition extends IGQLTypeDefinition {
  isDeprecated: boolean;
  deprecationReason: Option<string>;
  gqlType: GQLType;
  args: List<GQLArgumentDefinition>;
}

export class GQLTypeDefinition implements IGQLTypeDefinition {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
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
