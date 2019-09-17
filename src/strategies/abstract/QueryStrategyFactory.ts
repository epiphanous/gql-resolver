import { List } from 'immutable';
import { GQLExecutionPlan, GQLField } from '../../models';
import { QueryStrategy } from './QueryStrategy';

export type QueryStrategyVariant = 'query' | 'mutation' | 'connectionCount';

export abstract class QueryStrategyFactory {
  public abstract create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    variant: QueryStrategyVariant
  ): QueryStrategy;
}
