import { QueryResult } from '../../models';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';
import { SparqlResponse } from './SparqlResponse';

export class SparqlMutationQueryStrategy extends SparqlQueryStrategy {
  public resolve(): Promise<QueryResult> {
    return this.update();
  }

  /**
   * Executes an update query.
   * @param {(SparqlResponse) => QueryResult} transform the returned sparql response to a query result
   * @returns {Promise<QueryResult>}
   */
  protected update(
    transform: (resp: SparqlResponse) => QueryResult = resp =>
      resp.asQueryResult()
  ): Promise<QueryResult> {
    // TODO: implement this
    return new Promise(resolve => resolve(new QueryResult()));
  }
}
