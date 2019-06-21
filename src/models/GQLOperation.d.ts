import { List, Map } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField, GQLSelection } from './GQLSelection';
import { GQLVariable } from './GQLVariable';
import { GQLVariableDefinition } from './GQLVariableDefinition';
import { ResolverContext } from './ResolverContext';
export interface IGQLOperation {
    name: string;
    operationType: string;
    directives: List<GQLDirective>;
    variables: List<GQLVariable>;
    selections: List<GQLSelection>;
    outputType: string;
    fields: List<[string, GQLField]>;
    isSelected: boolean;
    [key: string]: any;
}
export declare class GQLOperation implements IGQLOperation {
    [key: string]: any;
    name: string;
    operationType: string;
    outputType: string;
    fields: List<[string, GQLField]>;
    variables: List<GQLVariableDefinition>;
    directives: List<GQLDirective>;
    selections: List<GQLSelection>;
    isSelected: boolean;
    constructor(props: Partial<IGQLOperation>);
    copy(data: Partial<IGQLOperation>): GQLOperation;
    findUnresolvedVariables(vars: Map<string, any>): List<GQLVariableDefinition>;
    getExecutionPlan(context: ResolverContext, vars: Map<string, any>): GQLExecutionPlan;
    select(): void;
}
