import { List } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField } from './GQLSelection';
import QueryStrategy from './QueryStrategy';
import QueryResult from "./QueryResult";

/**
 * Handles execution plans (nested fields), returns results
 */
export default class QueryStrategyPlan extends QueryStrategy {
  public plan: GQLExecutionPlan;

  constructor(plan: GQLExecutionPlan) {
    super();
    this.plan = plan;
  }

  public resolve(fields: List<GQLField>, parent: GQLExecutionPlan): Promise<QueryResult> {
    return this.plan.execute();
  }
}
