import {List, Map, OrderedMap, Set} from 'immutable';
import {sortMapByProjectionOrder} from '../utils/MapSorter';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {QueryStrategy} from './QueryStrategy';

export class GQLRootExecutionPlan extends GQLExecutionPlan {
    constructor(
        parentTypes: Set<string>,
        name: string,
        key: string,
        subPlans: List<GQLExecutionPlan> = List(),
        errors: List<Error> = List(),
    ) {
       super(parentTypes, name, key, subPlans, errors);
    }

    public execute(
        parentIris: List<string>,
        executor: (strategy: QueryStrategy) => List<Map<string, any>>,
    ): OrderedMap<string, List<OrderedMap<string, any>>> {
        const order = this.subPlans.map((sp) => sp.key);
        const results = this.subPlans
            .map((sp) => sp.execute(List(), executor))
            .reduce<OrderedMap<string, List<OrderedMap<string, any>>>>((acc, value) =>
                acc.merge(value),
            );
        return sortMapByProjectionOrder(results, order);
    }
}
