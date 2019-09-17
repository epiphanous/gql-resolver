import { List } from 'immutable';
import { GQLExecutionPlan, GQLField } from '../../models';
import { QueryStrategyFactory } from '../abstract';
import { KinesisQueryStrategy } from './KinesisQueryStrategy';

export interface IAWSKinesisConfig {
  streamName: (data: { [key: string]: any }) => string;
  partitionKey: (data: { [key: string]: any }) => string;
}

export class KinesisQueryStrategyFactory extends QueryStrategyFactory {
  public kinesisConfig: IAWSKinesisConfig;
  constructor(kinesisConfig: IAWSKinesisConfig) {
    super();
    this.kinesisConfig = kinesisConfig;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): KinesisQueryStrategy {
    return new KinesisQueryStrategy(fields, plan, this.kinesisConfig);
  }
}
