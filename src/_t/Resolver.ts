import 'mocha';

import { expect } from 'chai';
import fs = require('fs');
import { QueryResult } from '../models/QueryResult';
import { ResolverContext } from '../models/ResolverContext';
import { IResolvedResult, Resolver } from '../Resolver';
import { KinesisQueryStrategyFactory } from '../strategies/KinesisQueryStrategyFactory';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const sparqlEndpoint = process.env.SPARQL_ENDPOINT || '';
  const rc = new ResolverContext({
    schema,
    strategies: {
      sparql: new SparqlQueryStrategyFactory({
        endpoint: sparqlEndpoint,
        prefixes: [['testv', 'http://test.com/testv/']],
      }),
      kinesis: new KinesisQueryStrategyFactory({
        streamName: data => {
          /**
           * Compute the stream name from data, or in this case,
           * hardcode it to a string value
           */
          return process.env.AWS_STREAM_NAME || 'test-stream';
        },
        partitionKey: data => {
          /**
           * Compute the partition key from data, or in this case,
           * hardcode it to a string w/ length of < 256 chars
           */
          const partitionKey = 'partitionKey123';
          if (partitionKey.length > 256) {
            throw new Error(
              'Partition key length cannot be larger than 256 chars.'
            );
          } else {
            return partitionKey;
          }
        },
      }),
    },
    defaultStrategy: 'sparql',
  });
  it('creates a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);

  it('resolves a query', async () => {
    /**
     * @type IResolvedResult
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
    console.log(result);
    if (result.error) {
      throw new Error(`Failed to resolve the request!' ${result.error}`);
    } else {
      expect(result.data).to.be.an('object');
    }
  });
  it('resolves a mutation', async () => {
    /**
     * @type IResolvedResult
     */
    const result = await resolver.resolve(
      `mutation kinesisMutationTest {
        updatePrefs(prefs: {
          channel: "test",
          mutationVersion: "abc",
          mutationTimestamp: "2019-07-23T08:15:00Z",
          departFrom: "JFK"
        }) {
          eventID
        }
      }
    `,
      {},
      'kinesisMutationTest'
    );
    console.log(result);
    if (result.error) {
      throw new Error(`Failed to resolve the request!' ${result.error}`);
    } else {
      expect(result.data).to.be.an('object');
    }
  });
});
