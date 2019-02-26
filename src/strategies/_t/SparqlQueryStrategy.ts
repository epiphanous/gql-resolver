import { expect } from 'chai';
import {List} from 'immutable';
import 'mocha';
import sizeof = require('object-sizeof');
import QueryResult from '../../models/QueryResult';
import SparqlQueryStrategy from '../SparqlQueryStrategy';

describe('fetchResults', () => {
  const endpointURL = 'http://localhost:7200/repositories/jubel-test';
  const QSSparql = new SparqlQueryStrategy(); // TODO fix
  const prefixes = 'PREFIX gn: <http://sws.geonames.org/>';
  const query = 'SELECT ?o WHERE { ?s ?p ?o. ?s a gn:Feature } LIMIT 10';
  it('should return a results stream', () => {
    const fetch = async (queryStr) => {
      const bindingsStream = await QSSparql.fetcher.fetchBindings(
        endpointURL,
        `${prefixes} ${queryStr}`
      );
      expect(bindingsStream.constructor.name).to.equal('SparqlJsonBindingsTransformer');
    };
    fetch(query);
  });

  it('should contain 10 result objects', () => {
    const res = [];
    const fetch = async (queryStr) => {
      const bindingsStream = await QSSparql.fetcher.fetchBindings(
        endpointURL,
        `${prefixes} ${queryStr}`
      );
      bindingsStream.on('data', data => {
        res.push(data);
      });
      bindingsStream.on('end', () => {
        expect(res).to.have.length(10);
      });
    };
    fetch(query);
  });

  it('should return a valid queryResult object', () => {
    const resolveQuery = () => {
      const startTime = Date.now();
      let count;
      return new Promise((resolve, reject) =>
        QSSparql.fetcher.fetchBindings(
          endpointURL,
          `${prefixes} ${query}`
        ).then((stream) => {
          const resultArr = [];
          const errors = [];
          stream.on('data', data => {
            count++;
            resultArr.push(data);
          });
          stream.on('error', error => {
            errors.push(error);
          });
          stream.on('end', () => {
            const result = new QueryResult({
              values: List(resultArr),
              startTime,
              duration: Date.now() - startTime,
              count,
              bytes: sizeof(resultArr),
              done: true,
              ok: true,
              errors: List(errors)
            });
            return resolve(result);
          });
        })
          .catch(err => reject(err))
      );
    };
    resolveQuery()
      .then((result: QueryResult) => {
        ['values', 'startTime', 'duration', 'count', 'bytes', 'done', 'ok'].forEach(key => {
          expect(result).to.haveOwnProperty(key);
        });
        expect(result.values.count()).to.be.greaterThan(0);
      })
      .catch(err => console.error(err));
  });
});
