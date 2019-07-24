import { expect } from 'chai';
import fs = require('fs');
import 'mocha';
import { ResolverContext } from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const sparqlEndpoint = process.env.SPARQL_ENDPOINT || '';
  const rc = new ResolverContext({
    schema,
    strategies: {
      sparql: new SparqlQueryStrategyFactory({
        endpoint: sparqlEndpoint,
        prefixes: [['testv', 'http://test.com/testv/']]
      })
    },
    defaultStrategy: 'sparql'
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
      home: curatedDestinationConnection(filter: "s_name='yerevan' || s_name='tbilisi'") {
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
});
