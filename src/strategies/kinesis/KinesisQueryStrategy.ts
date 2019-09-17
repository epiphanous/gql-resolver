import { CredentialProviderChain, Kinesis } from 'aws-sdk';
import { List, OrderedMap } from 'immutable';
import { GQLExecutionPlan, GQLField, QueryResult } from '../../models';
import { QueryStrategy } from '../abstract';

import { IAWSKinesisConfig } from './KinesisQueryStrategyFactory';

export class KinesisQueryStrategy extends QueryStrategy {
  private kinesis!: Kinesis;
  private kinesisConfig: IAWSKinesisConfig;

  public constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    kinesisConfig: IAWSKinesisConfig
  ) {
    super(fields, plan);
    this.kinesisConfig = kinesisConfig;
    this.kinesis = new Kinesis({
      credentialProvider: new CredentialProviderChain(),
    });
  }

  /**
   * Formulates params object for putRecord() fn
   * @param data
   * @returns IRecordParams
   */
  public getPutRecordInput(data: {
    [key: string]: any;
  }): Kinesis.PutRecordInput {
    return {
      Data: Buffer.from(JSON.stringify(data)),
      StreamName: this.kinesisConfig.streamName(data),
      PartitionKey: this.kinesisConfig.partitionKey(data),
    };
  }

  public emitToKinesis(input: Kinesis.PutRecordInput) {
    return this.kinesis.putRecord(input).promise();
  }

  public resolve(): Promise<QueryResult> {
    return new Promise(resolve => {
      const queryResult = new QueryResult();
      const inputObject = this.plan.getInputObject();
      const putRecordInput = this.getPutRecordInput(inputObject);
      console.log({ inputObject, putRecordInput });
      return this.emitToKinesis(putRecordInput)
        .then(res => {
          queryResult.data = List([
            OrderedMap<string, string>([
              [
                'eventID',
                [
                  putRecordInput.StreamName,
                  res.ShardId,
                  res.SequenceNumber,
                ].join(';'),
              ],
            ]),
          ]);
          queryResult.finish();
          return resolve(queryResult);
        })
        .catch(err => {
          queryResult.errors = List([err]);
          queryResult.finish();
          return resolve(queryResult);
        });
    });
  }
}
