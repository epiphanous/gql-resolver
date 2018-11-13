import {Map} from 'immutable';
import Builder from '../builders/Builder';
import GQLSchemaBuilder from '../builders/graphql/GQLSchemaBuilder';
import {GQLSchema} from './GQLSchema';
import {QueryStrategy} from './QueryStrategy';

export default class ResolverContext {
  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategy>;
  public defaultStrategy: string;

  constructor(
    schemaText: string,
    strategies: Map<string, QueryStrategy>,
    defaultStrategy: string,
  ) {
    this.schema = this.buildSchema(schemaText);
    this.strategies = strategies;
    this.defaultStrategy = defaultStrategy;
  }

  public buildSchema(schemaText: string): GQLSchema {
    const builder = new GQLSchemaBuilder();
    return Builder.parse<GQLSchema>(builder, schemaText).get();
  }
}
