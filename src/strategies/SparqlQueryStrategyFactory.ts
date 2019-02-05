import { QueryStrategyFactory } from './QueryStrategyFactory';
import { List } from 'immutable';
import { GQLField } from '../models/GQLSelection';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import SparqlQueryStrategy from './SparqlQueryStrategy';

export class SparqlQueryStrategyFactory extends QueryStrategyFactory {
  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): SparqlQueryStrategy {
    return new SparqlQueryStrategy(fields, plan);
  }
}
