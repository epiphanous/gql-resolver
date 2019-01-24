import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import {List} from 'immutable';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {GQLField} from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from './QueryStrategy';
import sizeof = require('object-sizeof');

export default class QueryStrategySparql extends QueryStrategy {
  public fetcher: SparqlEndpointFetcher;
  public defaultURL: string;
  constructor(isPlan) {
    super(isPlan);
    this.fetcher = new SparqlEndpointFetcher();
    this.defaultURL = 'http://localhost:7200/repositories/jubel-test';
  }

  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }

  public resolve(fields: List<GQLField>, parent: GQLExecutionPlan): Promise<QueryResult> {
    const startTime = Date.now();
    // todo get a proper query from fields list
    let count;
    return new Promise((resolve, reject) => {
      this.fetcher.fetchBindings(
        this.defaultURL,
        fields
      ).then((stream) => {
        const resultArr: any[] = []; // todo replace any with a proper type
        const errors: any[] = [];
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
        .catch(err => reject(err));
    });
  }
}
