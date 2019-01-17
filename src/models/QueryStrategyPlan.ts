import QueryStrategy from './QueryStrategy';

/**
 * Handles execution plans (nested fields), returns results
 */
export default class QueryStrategyPlan extends QueryStrategy {
  constructor() {
    super(true);
  }
}
