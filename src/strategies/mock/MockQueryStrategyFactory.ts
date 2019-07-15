import { List } from 'immutable';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLField } from '../../models/GQLSelection';
import { QueryStrategyFactory } from '../base/QueryStrategyFactory';
import { MockQueryStrategy } from './MockQueryStrategy';

export interface IMockQueryStrategyConfig {
  probNull: number;
}

export class MockQueryStrategyFactory extends QueryStrategyFactory {
  private config: IMockQueryStrategyConfig;

  constructor(config: IMockQueryStrategyConfig) {
    super();
    this.config = config;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): MockQueryStrategy {
    return new MockQueryStrategy(fields, plan, config);
  }
}
