import { expect } from 'chai';
import fs = require('fs');
import { Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import { ResolverContext } from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import { SparqlQueryStrategyFactory } from '../strategies/SparqlQueryStrategyFactory';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
describe('Resolver', () => {
  const rc = new ResolverContext({
    schema,
    strategies: Map({
      sparql: new SparqlQueryStrategyFactory(
        'http://localhost:7200/repositories/test',
        [['j', 'http://jubel.co/jtv/']]
      ),
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
      home: curatedDestination(filter: "s_name='yerevan'") {
        s_name
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
