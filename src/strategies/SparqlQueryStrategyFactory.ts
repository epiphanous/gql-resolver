import { QueryStrategyFactory } from './QueryStrategyFactory';
import { List } from 'immutable';
import { GQLField } from '../models/GQLSelection';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import SparqlQueryStrategy from './SparqlQueryStrategy';

export class SparqlQueryStrategyFactory extends QueryStrategyFactory {
  public endpoint: string;

  // todo config file for storing these default values
  constructor(endpoint: string = 'http://localhost:7200/repositories/jubel-test') {
    super();
    this.endpoint = endpoint;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): SparqlQueryStrategy {
    return new SparqlQueryStrategy(fields, plan, this.endpoint);
  }
}