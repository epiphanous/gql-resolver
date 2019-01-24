import { List } from 'immutable';
import { GQLField } from './GQLSelection';
import QueryResult from './QueryResult';
import { GQLExecutionPlan } from './GQLExecutionPlan';

export default class QueryStrategy {
  public isPlan: boolean;
  public dbConn: any = null;

  constructor(isPlan) {
    this.isPlan = isPlan;
  }

  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }

  public resolve(fields: List<GQLField>, parent: GQLExecutionPlan): Promise<QueryResult> {
    // TODO Execute query
    return;
  }
}
