import { List, Map } from 'immutable';
import { DEFAULT_PREFIXES } from '../models/Constants';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { SimpleNamespace } from '../models/Namespace';
import { QueryStrategyFactory } from './QueryStrategyFactory';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';

export class SparqlQueryStrategyFactory extends QueryStrategyFactory {
  public endpoint: string;
  public prefixes: Map<string, SimpleNamespace>;

  constructor(endpoint: string, prefixes: Array<[string, string]> = []) {
    super();
    this.endpoint = endpoint;
    const prefixesSN: Map<string, SimpleNamespace> = Map(
      prefixes.map<[string, SimpleNamespace]>(([prefix, url]) => [
        prefix,
        new SimpleNamespace(prefix, url)
      ])
    );
    this.prefixes = DEFAULT_PREFIXES.merge(prefixesSN);
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan
  ): SparqlQueryStrategy {
    return new SparqlQueryStrategy(fields, plan, this.endpoint, this.prefixes);
  }
}
