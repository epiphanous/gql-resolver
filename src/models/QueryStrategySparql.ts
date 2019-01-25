import QueryStrategy from './QueryStrategy';
import QueryResult from './QueryResult';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField } from './GQLSelection';
import { List, Map } from 'immutable';

export default class QueryStrategySparql extends QueryStrategy {
  constructor() {
    super();
    // TODO create subclasses for each datastore which inherit Sparql strat
  }

  public resolve(fields: List<GQLField>, plan: GQLExecutionPlan): QueryResult {
    const objectType = this.prefixify(plan.resultType);
    const args = this.getArgs(plan);
    const projections = this.getProjections(fields);
    console.log(
      'resolving',
      objectType,
      '{',
      projections.toJS(),
      '}',
      args.toJS()
    );
    return new QueryResult();
  }

  protected getProjections(fields: List<GQLField>) {
    return fields.map<{ name: string; projection: string }>(f => ({
      name: this.prefixify(f.name),
      projection: f.alias.getOrElse(f.name),
    }));
  }

  protected prefixify(name: string) {
    return name.replace(/_/, ':');
  }
}
