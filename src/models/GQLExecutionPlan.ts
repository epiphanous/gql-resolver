import Record from 'dataclass';
import {List, Map, OrderedMap, Set} from 'immutable';
import {QueryStrategy} from './QueryStrategy';

export class GQLExecutionPlan extends Record<GQLExecutionPlan> {
    public parentTypes: Set<string>;
    public name: string;
    public key: string;
    public subPlans: List<GQLExecutionPlan> = List();
    public errors: List<Error> = List();

    public execute(
        parentIris: List<string>,
        executor: (strategy: QueryStrategy) => List<Map<string, any>>,
    ): OrderedMap<string, List<OrderedMap<string, any>>> {
        return OrderedMap();
    }
}
