import { List } from 'immutable';
import QueryResult from '../models/QueryResult';
import QueryStrategy from './QueryStrategy';

const prefixify = (name: string) => name.replace(/_/, ':');

export default class SparqlQueryStrategy extends QueryStrategy {
  public resolve(): QueryResult {
    const objectType = prefixify(plan.resultType);
    const projections = this.getProjections();
    console.log(
      'resolving',
      objectType,
      projections.toJS(),
      this.args.toJS(),
      this.subjectIds.toJS()
    );
    const result = new QueryResult();
    if (objectType === 'j_User') {
      result.addValues(
        List<[string, any]>([['s_id', 'nextdude'], ['s_name', 'Robert Lyons']])
      );
    }
    return result;
  }
  protected getProjections() {
    return this.fields.map<{ name: string; projection: string }>(f => ({
      name: prefixify(f.name),
      projection: f.alias.getOrElse(f.name),
    }));
  }
}
