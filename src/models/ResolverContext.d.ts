import { Map } from 'immutable';
import { QueryStrategyFactory } from '../strategies/QueryStrategyFactory';
import { GQLSchema } from './GQLSchema';
interface IResolverCtxParams {
    schema: string;
    strategies: {};
    defaultStrategy: string;
}
export declare class ResolverContext {
    static buildSchema(schemaText: string): GQLSchema;
    schema: GQLSchema;
    strategies: Map<string, QueryStrategyFactory>;
    defaultStrategy: string;
    constructor(params: IResolverCtxParams);
    getStrategyFactory(name: string): QueryStrategyFactory | undefined;
    availableStrategies(): string[];
}
export {};
