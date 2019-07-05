import { expect } from 'chai';
import fs = require('fs');
import 'mocha';
import { ResolverContext } from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';
import { KinesisQueryStrategyFactory } from '../strategies/KinesisQueryStrategyFactory';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const sparqlEndpoint = process.env.SPARQL_ENDPOINT || '';
  const rc = new ResolverContext({
    schema,
    strategies: Map({
      sparql: new SparqlQueryStrategyFactory({
        endpoint: sparqlEndpoint,
        prefixes: [['testv', 'http://test.com/testv/']]
      }),
      kinesis: new KinesisQueryStrategyFactory({
        accessKeyId: '',
        secretAccessKey: '',
        region: '',
        streamName: (data) => {
          /**
           * Compute the stream name from data, or in this case,
           * hardcode it to a string value
           */
          const streamName = 'cascadingFlow';
          return streamName || process.env.AWS_STREAM_NAME;
        },
        partitionKey: (data) => {
          /**
           * Compute the partition key from data, or in this case, 
           * hardcode it to a string w/ length of < 256 chars
           */
          const partitionKey = 'partitionKey123';
          if (partitionKey.length > 256) {
            throw new Error('Partition key length cannot be larger than 256 chars.');
          } else {
            return partitionKey;
          }
        }
      }),
    }),
    defaultStrategy: 'sparql',
  });
  it('creates a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);

  it('resolves a query', async () => {
    /**
     * @type {Promise<QueryResult>}
     */
    const result = await resolver.resolve(
      `query test {
      home: curatedDestination(filter: "s_name='yerevan' || s_name='tbilisi'") {
        s_name
        gn_nearby(first: 100, after: "3T_pXF6w6P.q0JPsc1wi") {
          totalCount
          edges {
            node {
              ... on j_CuratedDestination {
                s_name
              }
            }
          }
        }
      }
    }
    `,
      {},
      'test'
    );
    const resValue = await result.get();
    const resValueObject = await resValue.getResult();
    console.log('result', JSON.stringify(resValueObject, null, 2));
    expect(resValueObject).to.be.an('object');
  });
  it('resolves a mutation', async () => {
    /**
     * @type {Promise<QueryResult>}
     */
    const result = await resolver.resolve(
      `mutation kinesisMutationTest @resolve(with: "kinesis"){
        tripFilter(tripFilter: { countryCode: "GER" })
      }
    `,
      Map(),
      Some('kinesisMutationTest')
    );
    const resValue = await result.get();
    const resValueObject = await resValue.getResult();
    console.log('result', JSON.stringify(resValueObject, null, 2));
    expect(resValueObject).to.be.an('object');
  });
});
