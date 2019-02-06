import { assert, expect } from 'chai';
import { Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import ResolverContext from '../models/ResolverContext';
import SparqlQueryStrategy from '../strategies/SparqlQueryStrategy';
import { Resolver } from '../Resolver';
import fs = require('fs');

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');

describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ sparql: new SparqlQueryStrategy() }),
    'sparql'
  );
  it('creates a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);

  it('resolves a query', () => {
    const result = resolver.resolve(
      `query test ($personID:ID = 'nextdude', $placeID:ID) {
      person: user(id: $personID) {
        s_id
        s_name
        j_person {
          s_givenName
          s_familyName
          s_email
          s_gender
          s_birthDate
        }
      }
      home: curatedPlace(id: $placeID) {
        s_id
        s_name
        geo_lat
        geo_long
      }
    }`,
      Map({ placeID: '17' }),
      Some('test')
    );
    console.log(result);
    assert(result.isSuccess());
  });
});
