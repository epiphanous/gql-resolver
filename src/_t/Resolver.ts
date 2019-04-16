import { expect } from 'chai';
import { Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';
import fs = require('fs');

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ sparql: new SparqlQueryStrategyFactory() }),
    'sparql'
  );
  it('creates a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);

  it('resolves a query', async () => {
    /**
     * @type {Promise<QueryResult>}
     */
    const result = await resolver.resolve(
      `
    query test {
      home: curatedDestination(id: 'yerevan') {
        gn_nearby(first: 3) {
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
    expect(resValueObject).to.be.an('object');
  });
});
