import { Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { QueryResult } from '../models/QueryResult';
import {
  QueryResultCache,
  QueryResultMemoryCache,
} from '../models/QueryResultCache';

export interface IQueryStrategy {
  cache?: QueryResultCache;
  fields: List<GQLField>;
  plan: GQLExecutionPlan;

  resolve(): Promise<QueryResult>;
}

export abstract class QueryStrategy implements IQueryStrategy {
  public cache: QueryResultCache = new QueryResultMemoryCache();
  public fields: List<GQLField>;
  public plan: GQLExecutionPlan;
  public subjectIds: List<string>;
  public args: Map<string, any>;

  public constructor(fields: List<GQLField>, plan: GQLExecutionPlan) {
    this.fields = fields;
    this.plan = plan;
    this.subjectIds = Option.of(this.plan.parent)
      .map(p => p.getSubjectIds())
      .getOrElse(List<string>());
    this.args = Map(
      this.plan.args.map<[string, any]>(arg => [
        arg.name,
        arg.resolve(this.plan.vars),
      ])
    );
  }

  public abstract resolve(): Promise<QueryResult>;

  protected getArgs(plan: GQLExecutionPlan) {
    return Map(
      plan.args.map<[string, any]>(arg => [arg.name, arg.resolve(plan.vars)])
    );
  }
}
