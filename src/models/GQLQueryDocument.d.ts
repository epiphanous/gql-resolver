import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLFragmentDefinition } from './GQLFragmentDefinition';
import { GQLOperation } from './GQLOperation';
import { GQLField, GQLSelection } from './GQLSelection';
import { ResolverContext } from './ResolverContext';
import { GQLQueryBuilder } from '../builders/graphql/GQLQueryBuilder';
export declare class GQLQueryDocument {
    operations: List<GQLOperation>;
    fragmentDefinitions: Set<GQLFragmentDefinition>;
    selectedOperation: GQLOperation | null;
    plan: GQLExecutionPlan;
    context: ResolverContext;
    vars: Map<string, any>;
    constructor(operations: List<GQLOperation>, fragmentDefinitions: Set<GQLFragmentDefinition>, context: ResolverContext, vars: Map<string, any>);
    execute(queryBuilder: GQLQueryBuilder): Promise<import("./QueryResult").QueryResult>;
    protected makeExecutionPlan(): void;
    protected withFlattenedSelections(operation: Option<GQLOperation>): GQLOperation;
    protected flattenSelections(parentType: string, selections: List<GQLSelection>): List<[string, GQLField]>;
    protected flattenSelection(parentType: string, selection: GQLSelection): List<[string, GQLField]>;
}
