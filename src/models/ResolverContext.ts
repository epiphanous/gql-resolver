import { Map } from 'immutable';
import Builder from '../builders/Builder';
import GQLSchemaBuilder from '../builders/graphql/GQLSchemaBuilder';
import { GQLSchema } from './GQLSchema';
import { QueryStrategyFactory } from '../strategies/QueryStrategyFactory';

export default class ResolverContext {
  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategyFactory>;
  public defaultStrategy: string;

  constructor(
    schemaText: string,
    strategies: Map<string, QueryStrategyFactory>,
    defaultStrategy: string
  ) {
    if (!strategies.has(defaultStrategy)) {
      throw new Error(
        `default query strategy factory '${defaultStrategy} not provided in strategies initializer`
      );
    }
    this.schema = ResolverContext.buildSchema(schemaText);
    this.strategies = strategies;
    this.defaultStrategy = defaultStrategy;
  }

  public static buildSchema(schemaText: string): GQLSchema {
    const builder = new GQLSchemaBuilder();
    const schemaTry = Builder.parse<GQLSchema>(builder, schemaText);
    return schemaTry.get();
  }

  public getStrategyFactory(name: string): QueryStrategyFactory {
    if (this.strategies.has(name)) {
      return this.strategies.get(name);
    } else {
      console.warn(
        `unknown strategy factory '${name}' requested (returning default '${
          this.defaultStrategy
        }' instead)`
      );
      return this.strategies.get(this.defaultStrategy);
    }
  }

  public availableStrategies() {
    return this.strategies.keySeq().toArray();
  }
}
