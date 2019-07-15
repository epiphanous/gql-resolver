import { List } from 'immutable';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLField } from '../../models/GQLSelection';
import { QueryStrategy } from './QueryStrategy';
export interface IQueryStrategyFactory {
    create(fields: List<GQLField>, plan: GQLExecutionPlan): QueryStrategy;
}
export declare abstract class QueryStrategyFactory implements IQueryStrategyFactory {
    abstract create(fields: List<GQLField>, plan: GQLExecutionPlan): QueryStrategy;
}
