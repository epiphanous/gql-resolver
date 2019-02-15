import { assert, expect } from 'chai';
import fs = require('fs');
import { Some } from 'funfix';
import { List, Map } from 'immutable';
import 'mocha';
import {inspect} from 'util';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import {SparqlQueryStrategyFactory} from '../strategies/SparqlQueryStrategyFactory';

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
    const result = await resolver.resolve(
      `query test {
      home: curatedDestination(first: 2, s_name: 'yerevan') {
        s_name
        s_amenityFeature {
          s_name
        }
      }
    }`,
      Map(),
      Some('test')
    );
    const resValue = await result.get();
    const resValueObject = await resValue.getResult();
    console.log(inspect(resValueObject, false, null, true));
    expect(resValueObject).to.be.an('object');
  });
});
