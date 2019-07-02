import { expect } from 'chai';
import fs = require('fs');
import { Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import { ResolverContext } from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';
import { KinesisQueryStrategy } from '../strategies/KinesisQueryStrategy';
import {KinesisQueryStrategyFactory} from '../strategies/KinesisQueryStrategyFactory';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const rc = new ResolverContext({
    schema,
    strategies: Map({
      sparql: new SparqlQueryStrategyFactory(
        'http://localhost:7200/repositories/jubel',
        [['j', 'http://jubel.co/jtv/']]
      ),
      kinesis: new KinesisQueryStrategyFactory({
        accessKeyId: '',
        secretAccessKey: '',
        region: ''
      }, {
        StreamName: '',
        PartitionKey: ''
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
      Map(),
      Some('test')
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
