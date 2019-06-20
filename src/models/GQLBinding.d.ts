import { GQLObjectQueryModifierExpression } from './GQLObjectQueryModifierExpression';
export interface IGQLBinding {
    name: string;
    expression: GQLObjectQueryModifierExpression;
}
export declare class GQLBinding implements IGQLBinding {
    name: string;
    expression: GQLObjectQueryModifierExpression;
    constructor(name: string, expression: GQLObjectQueryModifierExpression);
}
