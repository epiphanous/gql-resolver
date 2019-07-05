import { List } from 'immutable';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { QueryStrategyFactory } from './QueryStrategyFactory';
import { KinesisQueryStrategy } from './KinesisQueryStrategy';

export interface IAWSKinesisConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  streamName: (param: {[key: string]: any}) => string;
  partitionKey: (param: {[key: string]: any}) => string;
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
