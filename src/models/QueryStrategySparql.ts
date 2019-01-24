import QueryStrategy from './QueryStrategy';

export default class QueryStrategySparql extends QueryStrategy {
  constructor() {
    super();
    // TODO create subclasses for each datastore which inherit Sparql strat
  }

  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }
}
