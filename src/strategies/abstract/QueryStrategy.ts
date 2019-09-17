import { List } from 'immutable';
import { GQLExecutionPlan, GQLField, QueryResult } from '../../models';

export abstract class QueryStrategy {
  protected fields: List<GQLField>;
  protected plan: GQLExecutionPlan;

  protected constructor(fields: List<GQLField>, plan: GQLExecutionPlan) {
    this.fields = fields;
    this.plan = plan;
  }

  public abstract resolve(): Promise<QueryResult>;
}
