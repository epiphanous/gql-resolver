import { Map } from 'immutable';
import { GQLSchema } from '.';
import { Builder } from '../builders';
import { GQLSchemaBuilder } from '../builders/graphql';
import { QueryStrategyFactory } from '../strategies';

interface IResolverCtxParams {
  schema: string;
  strategies: { [key: string]: QueryStrategyFactory };
  defaultStrategy: string;
}

export class ResolverContext {
  public static buildSchema(schemaText: string): GQLSchema {
    return Builder.parse<GQLSchema>(new GQLSchemaBuilder(), schemaText).get();
  }

  public schema: GQLSchema;
  public strategies: Map<string, QueryStrategyFactory>;
  public defaultStrategy: string;
  public defaultStrategyFactory: QueryStrategyFactory;

  constructor(params: IResolverCtxParams) {
    this.strategies = Map(params.strategies);
    if (this.strategies.isEmpty()) {
      throw new Error('no query strategies provided');
    }
    if (this.strategies.has(params.defaultStrategy)) {
      this.defaultStrategyFactory = this.strategies.get(
        this.defaultStrategy
      ) as QueryStrategyFactory;
    } else {
      throw new Error(
        `no implementation for default query strategy factory '${params.defaultStrategy} provided`
      );
    }
    this.schema = ResolverContext.buildSchema(params.schema);
  }

  public getStrategyFactory(name: string): QueryStrategyFactory {
    if (!this.strategies.has(name)) {
      console.warn(
        `unknown strategy factory '${name}' requested (returning default '${this.defaultStrategy}' instead)`
      );
    }
    return this.strategies.get(name) || this.defaultStrategyFactory;
  }
}
