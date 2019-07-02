import { Kinesis } from 'aws-sdk';
import {List, OrderedMap} from 'immutable';
import { QueryResult } from '../models/QueryResult';
import { IAWSCreds, IAWSKinesisConfig } from './KinesisQueryStrategyFactory';
import { QueryStrategy } from './QueryStrategy';

interface IRecordParams {
  Data: Buffer | string;
  PartitionKey: string | undefined;
  StreamName: string | undefined;
}

export class KinesisQueryStrategy extends QueryStrategy {
  private kinesis: any;
  private kinesisConfig: IAWSKinesisConfig;
  public constructor(
    fields: any,
    plan: any,
    AWSCreds: IAWSCreds,
    kinesisConfig: IAWSKinesisConfig
  ) {
    super(fields, plan);
    this.instantiateKinesis(AWSCreds);
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
      StreamName: this.kinesisConfig.StreamName || process.env.AWS_STREAM_NAME,
      PartitionKey: this.kinesisConfig.PartitionKey || process.env.AWS_PARTITION_KEY || 'PKey_1'
    };
  }

  /**
   * Tries to instantiate an AWS SDK Kinesis class. Throws an error if it fails.
   * @param {IAWSCreds} AWSCreds
   */
  public instantiateKinesis(AWSCreds: IAWSCreds) {
    this.kinesis = new Kinesis({
      accessKeyId: AWSCreds.accessKeyId || process.env.AWS_ACCESS_KEY,
      secretAccessKey: AWSCreds.secretAccessKey || process.env.SECRET_ACCESS_KEY,
      region: AWSCreds.region || process.env.AWS_REGION
    });
    if (!this.kinesis) {
      throw new Error('Could not instantiate a Kinesis service class');
    }
  }

  public emitToKinesis(data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.kinesis.putRecord(this.createParams(data), (err: any, res: any) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(res);
      });
    });
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
            return resolve(queryResult);
          });
    });
  }
}
