import { Map } from 'immutable';
import Builder from '../builders/Builder';
import GQLSchemaBuilder from '../builders/graphql/GQLSchemaBuilder';
import { GQLSchema } from './GQLSchema';
import { QueryStrategy } from './QueryStrategy';

export default class ResolverContext {
  public static buildSchema(schemaText: string): GQLSchema {
    const builder = new GQLSchemaBuilder();
    return Builder.parse<GQLSchema>(builder, schemaText).get();
  }

  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategy>;
  public defaultStrategy: QueryStrategy;

  constructor(
    schemaText: string,
    strategies: Map<string, QueryStrategy>,
    defaultStrategyName: string
  ) {
    if (!strategies.has(defaultStrategyName)) {
      throw new Error(
        `default query strategy '${defaultStrategyName} not provided in strategies initializer`
      );
    }
    this.schema = ResolverContext.buildSchema(schemaText);
    this.strategies = strategies;
    this.defaultStrategy = this.strategies.get(defaultStrategyName);
  }
}
