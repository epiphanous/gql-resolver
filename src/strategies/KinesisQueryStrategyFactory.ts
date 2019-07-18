import {
  config,
  CredentialProviderChain,
  EC2MetadataCredentials,
  EnvironmentCredentials,
  SharedIniFileCredentials
 } from 'aws-sdk';
import { List } from 'immutable';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { KinesisQueryStrategy } from './KinesisQueryStrategy';
import { QueryStrategyFactory } from './QueryStrategyFactory';

export interface IAWSKinesisConfig {
  accessKeyId?: string;
  secretAccessKey?: string;
  region?: string;
  streamName: (param: {[key: string]: any}) => string;
  partitionKey: (param: {[key: string]: any}) => string;
}

export class KinesisQueryStrategyFactory extends QueryStrategyFactory {
  public kinesisConfig: IAWSKinesisConfig;
  constructor(kinesisConfig: IAWSKinesisConfig) {
    super();
    this.kinesisConfig = kinesisConfig;
    process.env.AWS_SDK_LOAD_CONFIG = 'true';
    CredentialProviderChain.defaultProviders = [
      () => new SharedIniFileCredentials({ profile: process.env.AWS_PROFILE || 'default' }),
      () => new EnvironmentCredentials('AWS'),
      () => new EnvironmentCredentials('AMAZON'),
      () => new EC2MetadataCredentials()
    ];
    const providerChain = new CredentialProviderChain();
    providerChain
      .resolvePromise()
      .then(creds => config.credentials = creds)
      .catch(_ => {
        // noop
      });
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): KinesisQueryStrategy {
    return new KinesisQueryStrategy(fields, plan, this.kinesisConfig);
  }
}
