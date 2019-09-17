import { List, Map } from 'immutable';
import {
  DEFAULT_PREFIXES,
  GQLConnectionExecutionPlan,
  GQLExecutionPlan,
  GQLField,
  SimpleNamespace,
} from '../../models';
import { QueryStrategyFactory, QueryStrategyVariant } from '../abstract';
import { SparqlConnectionCountQueryStrategy } from './SparqlConnectionCountQueryStrategy';
import { SparqlMutationQueryStrategy } from './SparqlMutationQueryStrategy';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';

export interface ISparqlQueryStrategyFactoryParams {
  endpoint: string;
  prefixes: Array<[string, string]>;
}

export class SparqlQueryStrategyFactory extends QueryStrategyFactory {
  public endpoint: string;
  public prefixes: Map<string, SimpleNamespace>;

  constructor(params: ISparqlQueryStrategyFactoryParams) {
    super();
    if (!params.endpoint) {
      throw new Error('No sparql endpoint provided');
    }
    this.endpoint = params.endpoint;
    this.prefixes = DEFAULT_PREFIXES.merge(
      Map(
        params.prefixes.map<[string, SimpleNamespace]>(([prefix, url]) => [
          prefix,
          new SimpleNamespace(prefix, url),
        ])
      )
    );
  }

  public create(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    variant: QueryStrategyVariant = 'query'
  ): SparqlQueryStrategy {
    switch (variant) {
      case 'connectionCount':
        return new SparqlConnectionCountQueryStrategy(
          fields,
          plan as GQLConnectionExecutionPlan,
          this.endpoint,
          this.prefixes
        );
      case 'mutation':
        return new SparqlMutationQueryStrategy(
          fields,
          plan,
          this.endpoint,
          this.prefixes
        );
      default:
        return new SparqlQueryStrategy(
          fields,
          plan,
          this.endpoint,
          this.prefixes
        );
    }
  }
}
