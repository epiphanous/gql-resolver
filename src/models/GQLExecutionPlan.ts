import {List, Map, OrderedMap, Set} from 'immutable';
import {QueryStrategy} from './QueryStrategy';

export interface IGQLExecutionPlan {
    parentTypes: Set<string>;
    name: string;
    key: string;
    subPlans: List<GQLExecutionPlan>;
    errors: List<Error>;
    execute(parentIris: List<string>, executor: (strategy: QueryStrategy) => List<Map<string, any>>);
}

export class GQLExecutionPlan implements IGQLExecutionPlan {
    public parentTypes: Set<string>;
    public name: string;
    public key: string;
    public subPlans: List<GQLExecutionPlan> = List();
    public errors: List<Error> = List();

    constructor(
        parentTypes: Set<string>,
        name: string,
        key: string,
        subPlans: List<GQLExecutionPlan> = List(),
        errors: List<Error> = List(),
        ) {
        this.parentTypes = parentTypes;
        this.name = name;
        this.key = key;
        this.subPlans = subPlans;
        this.errors = errors;
    }

    public execute(
        parentIris: List<string>,
        executor: (strategy: QueryStrategy) => List<Map<string, any>>,
    ): OrderedMap<string, List<OrderedMap<string, any>>> {
        return OrderedMap();
    }
}
