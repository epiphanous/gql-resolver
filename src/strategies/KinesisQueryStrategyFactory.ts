import { List } from 'immutable';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { QueryStrategyFactory } from './QueryStrategyFactory';
import { KinesisQueryStrategy } from './KinesisQueryStrategy';

export interface IAWSCreds {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface IAWSKinesisConfig {
  StreamName: string;
  PartitionKey: string | undefined;
}

export class KinesisQueryStrategyFactory extends QueryStrategyFactory {
  public AWSCreds: IAWSCreds;
  public kinesisConfig: IAWSKinesisConfig;
  constructor(AWSCreds: IAWSCreds, kinesisConfig: IAWSKinesisConfig) {
    super();
    this.kinesisConfig = kinesisConfig;
    this.AWSCreds = AWSCreds;
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): KinesisQueryStrategy {
    return new KinesisQueryStrategy(fields, plan, this.AWSCreds, this.kinesisConfig);
  }
}
