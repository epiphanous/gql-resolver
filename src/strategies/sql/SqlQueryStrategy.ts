import { QueryResult } from '../../models';
import { QueryStrategy } from '../abstract';

export class SqlQueryStrategy extends QueryStrategy {
  public async resolve(): Promise<QueryResult> {
    return Promise.resolve(new QueryResult());
  }
}
