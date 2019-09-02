import { List, Map } from 'immutable';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLField } from '../../models/GQLSelection';
import { QueryResult } from '../../models/QueryResult';
import { QueryResultCache } from '../../models/QueryResultCache';
export interface IQueryStrategy {
  cache?: QueryResultCache;
  fields: List<GQLField>;
  plan: GQLExecutionPlan;
  resolve(): Promise<QueryResult>;
}
export declare abstract class QueryStrategy implements IQueryStrategy {
  cache: QueryResultCache;
  fields: List<GQLField>;
  plan: GQLExecutionPlan;
  subjectIds: List<string>;
  args: Map<string, any>;
  constructor(fields: List<GQLField>, plan: GQLExecutionPlan);
  abstract resolve(): Promise<QueryResult>;
  protected getArgs(plan: GQLExecutionPlan): Map<string, any>;
}
