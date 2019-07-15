import { List, Map } from 'immutable';
import { DEFAULT_PREFIXES } from '../../models/Constants';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLField } from '../../models/GQLSelection';
import { SimpleNamespace } from '../../models/Namespace';
import { QueryStrategyFactory } from '../base/QueryStrategyFactory';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';

interface ISparqlQueryStrategyFactoryParams {
  endpoint: string;
  prefixes: Array<[string, string]>;
}

export class SparqlQueryStrategyFactory extends QueryStrategyFactory {
  public endpoint: string;
  public prefixes: Map<string, SimpleNamespace>;

  constructor(params: ISparqlQueryStrategyFactoryParams) {
    super();
    if (!params.endpoint) {
      throw new URIError('SPARQL endpoint URL must not be empty!');
    }
    this.endpoint = params.endpoint;
    const prefixesSN: Map<string, SimpleNamespace> = Map(
      params.prefixes.map<[string, SimpleNamespace]>(([prefix, url]) => [
        prefix,
        new SimpleNamespace(prefix, url),
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
