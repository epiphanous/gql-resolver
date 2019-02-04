import { List } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField } from './GQLSelection';
import QueryStrategy from './QueryStrategy';

/**
 * Handles execution plans (nested fields), returns results
 */
export default class QueryStrategyPlan extends QueryStrategy {
  public plan: GQLExecutionPlan;

  constructor(plan: GQLExecutionPlan) {
    super();
    this.plan = plan;
  }

  public resolve(fields: List<GQLField>, parent: GQLExecutionPlan) {
    return this.plan.execute();
  }
}
