import Record from 'dataclass';

export class QueryStrategy extends Record<QueryStrategy> {
  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }
}

export class SparqlQueryStrategy extends QueryStrategy {
  public withLimitOffset(limit: number, offset: number): SparqlQueryStrategy {
    return this;
  }
}
