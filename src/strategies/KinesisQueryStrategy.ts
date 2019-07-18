import { Kinesis, config } from 'aws-sdk';
import {List, OrderedMap} from 'immutable';
import { QueryResult } from '../models/QueryResult';
import { IAWSKinesisConfig } from './KinesisQueryStrategyFactory';
import { QueryStrategy } from './QueryStrategy';

interface IRecordParams {
  Data: Buffer | string;
  PartitionKey: string;
  StreamName: string;
}

export class KinesisQueryStrategy extends QueryStrategy {
  private kinesis!: Kinesis;
  private kinesisConfig: IAWSKinesisConfig;
  public constructor(
    fields: any,
    plan: any,
    kinesisConfig: IAWSKinesisConfig
  ) {
    super(fields, plan);
    this.instantiateKinesis(kinesisConfig);
    this.kinesisConfig = kinesisConfig;
  }

  /**
   * Formulates params object for putRecord() fn
   * @param data
   * @returns IRecordParams
   */
  public createParams(data: { [key: string]: any }): IRecordParams {
    return {
      Data: Buffer.from(JSON.stringify(data)),
      StreamName: this.kinesisConfig.streamName(data),
      PartitionKey: this.kinesisConfig.partitionKey(data)
    };
  }

  /**
   * Tries to instantiate an AWS SDK Kinesis class. Throws an error if it fails.
   * @param {IAWSCreds} AWSCreds
   */
  public instantiateKinesis(AWSCreds: IAWSKinesisConfig) {
    const accessKeyId = AWSCreds.accessKeyId || (config.credentials ? config.credentials.accessKeyId : '');
    const secretAccessKey = AWSCreds.secretAccessKey || (config.credentials ? config.credentials.secretAccessKey : '');
    const region = AWSCreds.region || config.region;
    if (!accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS credentials.');
    }
    if (!region) {
      throw new Error('Missing AWS region.');
    }
    this.kinesis = new Kinesis({
      accessKeyId,
      secretAccessKey,
      region
    });
    if (!this.kinesis) {
      throw new Error('Could not instantiate a Kinesis service class');
    }
  }

  public emitToKinesis(data: {[key: string]: any}): Promise<any> {
    return this.kinesis.putRecord(this.createParams(data)).promise();
  }

  public async resolve(): Promise<QueryResult> {
    return new Promise((resolve) => {
      const queryResult = new QueryResult();
      return this.emitToKinesis({
          args: this.plan.args,
          directives: this.plan.directives,
          fields: this.plan.allFields,
          name: this.plan.name,
          vars: this.plan.vars
        })
          .then((successRes) => {
            // TODO return something else to the user?
            queryResult.data = OrderedMap<string, any>();
            return resolve(queryResult);
          })
          .catch((err) => {
            queryResult.meta.errors = List([err]);
            queryResult.meta.ok = false;
            return resolve(queryResult);
          });
    });
  }
}
