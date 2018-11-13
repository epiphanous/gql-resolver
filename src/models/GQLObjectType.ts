import {List, Record}                          from 'immutable';
import {GQLFieldDefinition}                    from './GQLFieldDefinition';
import {GQLTypeDefinition, IGQLTypeDefinition} from './GQLTypeDefinition';
import {GQLField}                              from './GQLField';

export interface IGQLObjectType extends IGQLTypeDefinition {
  fields: List<GQLFieldDefinition>;
  implements: List<string>;
}
export class GQLObjectType extends Record<IGQLObjectType>({
  fields: List<GQLFieldDefinition> = List<GQLFieldDefinition>()
,
}) {
  public fields: List<GQLFieldDefinition> = List<GQLFieldDefinition>();
  public implements: List<string> = List<string>();
}
