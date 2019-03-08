import { expect } from 'chai';
import fs = require('fs');
import 'mocha';
import Builder from '../../Builder';
import GQLQueryBuilder from '../GQLQueryBuilder';
import { GQLQueryDocument } from '../../../models/GQLQueryDocument';
import ResolverContext from '../../../models/ResolverContext';
import QueryStrategy from '../../../strategies/QueryStrategy';
import { Map } from 'immutable';

describe('GQLQueryBuilder', () => {
  let context: ResolverContext = null;

  const loadContext = () => {
    if (!context) {
      const schemaText = fs.readFileSync('./src/schema.graphql', 'utf8');
      context = new ResolverContext(
        schemaText,
        Map<string, QueryStrategy>([['nothing', new QueryStrategy()]]),
        'nothing'
      );
    }
  };

  it('parses query', () => {
    loadContext();
    const builder = new GQLQueryBuilder(context, Map<string, any>());
    const q = `query test ($personID:ID = 'nextdude', $placeID:ID) {
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
    }`;
    const doc = Builder.parse<GQLQueryDocument>(builder, q);
  });
});
