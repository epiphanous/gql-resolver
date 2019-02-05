import { Map } from 'immutable';
import Builder from '../builders/Builder';
import GQLSchemaBuilder from '../builders/graphql/GQLSchemaBuilder';
import { GQLSchema } from './GQLSchema';
import QueryStrategy from './QueryStrategy';

export default class ResolverContext {
  public static buildSchema(schemaText: string): GQLSchema {
    const builder = new GQLSchemaBuilder();
    return Builder.parse<GQLSchema>(builder, schemaText).get();
  }

  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategy>;
  public defaultStrategy: string;

  constructor(
    schemaText: string,
    strategies: Map<string, QueryStrategy>,
    defaultStrategy: string
  ) {
    if (!strategies.has(defaultStrategy)) {
      throw new Error(
        `default query strategy '${defaultStrategy} not provided in strategies initializer`
      );
    }
    this.schema = ResolverContext.buildSchema(schemaText);
    this.strategies = strategies;
    this.defaultStrategy = defaultStrategy;
  }

  public getStrategy(name: string) {
    return this.strategies.has(name)
      ? this.strategies.get(name)
      : this.strategies.get(this.defaultStrategy);
  }
}
