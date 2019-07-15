import { Option } from 'funfix';
import { Map } from 'immutable';
import { Builder } from '../builders/Builder';
import { GQLSchemaBuilder } from '../builders/graphql/GQLSchemaBuilder';
import { QueryStrategyFactory } from '../strategies/base/QueryStrategyFactory';
import { GQLSchema } from './GQLSchema';

interface IResolverCtxParams {
  schema: string;
  strategies: { [key: string]: QueryStrategyFactory };
  defaultStrategy: string;
}

export class ResolverContext {
  public static buildSchema(schemaText: string): GQLSchema {
    const builder = new GQLSchemaBuilder();
    const schemaTry = Builder.parse<GQLSchema>(builder, schemaText);
    return schemaTry.get();
  }

  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategyFactory>;
  public defaultStrategy: string;
  public defaultStrategyFactory: QueryStrategyFactory;

  constructor(params: IResolverCtxParams) {
    this.strategies = Map(params.strategies);
    if (!this.strategies || !this.strategies.has(params.defaultStrategy)) {
      throw new Error(
        `default query strategy factory '${params.defaultStrategy} not provided in strategies initializer`
      );
    }
    this.schema = ResolverContext.buildSchema(params.schema);
    this.defaultStrategy = params.defaultStrategy;
    this.defaultStrategyFactory = this.strategies.get(
      this.defaultStrategy
    ) as QueryStrategyFactory;
  }

  public getStrategyFactory(name: string): QueryStrategyFactory {
    if (!this.strategies.has(name)) {
      console.warn(
        `unknown strategy factory '${name}' requested (returning default '${this.defaultStrategy}' instead)`
      );
    }
    return Option.of(this.strategies.get(name)).getOrElse(
      this.defaultStrategyFactory
    );
  }

  public availableStrategies() {
    return this.strategies.keySeq().toArray();
  }
}
