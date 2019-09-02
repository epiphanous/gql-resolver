import { List } from 'immutable';
import { Config } from 'knex';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLField } from '../../models/GQLSelection';
import { QueryStrategyFactory } from '../base/QueryStrategyFactory';
import { SqlQueryStrategy } from './SqlQueryStrategy';

export class SqlQueryStrategyFactory extends QueryStrategyFactory {
  public config: Config;

  constructor(config: Config) {
    super();
    this.config = config;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): SqlQueryStrategy {
    return new SqlQueryStrategy(fields, plan, this.config);
  }
}
