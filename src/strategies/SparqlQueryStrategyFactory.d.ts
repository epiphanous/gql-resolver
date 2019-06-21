import { List, Map } from 'immutable';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { SimpleNamespace } from '../models/Namespace';
import { QueryStrategyFactory } from './QueryStrategyFactory';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';
export declare class SparqlQueryStrategyFactory extends QueryStrategyFactory {
    endpoint: string;
    prefixes: Map<string, SimpleNamespace>;
    constructor(endpoint: string, prefixes?: Array<[string, string]>);
    create(fields: List<GQLField>, plan: GQLExecutionPlan): SparqlQueryStrategy;
}
