import { List, Map } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField } from './GQLSelection';
import { QueryResultCache, QueryResultMemoryCache } from './QueryResultCache';

export default class QueryStrategy {
  public cache: QueryResultCache;

  constructor(cache = new QueryResultMemoryCache()) {
    this.cache = cache;
  }

  public resolve(fields: List<GQLField>, plan: GQLExecutionPlan) {
    throw new Error('not implemented');
  }

  protected getArgs(plan: GQLExecutionPlan) {
    return Map(
      plan.args.map<[string, any]>(arg => [arg.name, arg.resolve(plan.vars)])
    );
  }
}
