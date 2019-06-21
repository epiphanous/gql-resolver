import { Set } from 'immutable';
import { GQLObjectQueryModifierDisjunction } from './GQLObjectQueryModifierExpression';
export interface IGQLFilter {
    expression: GQLObjectQueryModifierDisjunction;
    fields: Set<string>;
}
export declare class GQLFilter implements IGQLFilter {
    expression: GQLObjectQueryModifierDisjunction;
    fields: Set<string>;
    constructor(expression: GQLObjectQueryModifierDisjunction, fields: Set<string>);
}
