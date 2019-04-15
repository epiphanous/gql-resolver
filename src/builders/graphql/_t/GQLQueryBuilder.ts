import { expect } from 'chai';
import fs = require('fs');
import { Map } from 'immutable';
import 'mocha';
import { GQLQueryDocument } from '../../../models/GQLQueryDocument';
import ResolverContext from '../../../models/ResolverContext';
import QueryStrategy from '../../../strategies/QueryStrategy';
import {SparqlQueryStrategyFactory} from '../../../strategies/SparqlQueryStrategyFactory';
import Builder from '../../Builder';
import GQLQueryBuilder from '../GQLQueryBuilder';

describe('GQLQueryBuilder', () => {
  let context: ResolverContext = null;

  // TODO should add a dummy query strategy for this purpose
  const loadContext = () => {
    if (!context) {
      const schemaText = fs.readFileSync('./src/schema.graphql', 'utf8');
      context = new ResolverContext(
        schemaText,
        Map({nothing: new SparqlQueryStrategyFactory()}),
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
