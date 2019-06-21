import { List } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLSelection } from './GQLSelection';
export interface IGQLFragmentDefinition {
    name: string;
    typeCondition: string;
    directives: List<GQLDirective>;
    selections: List<GQLSelection>;
}
export declare class GQLFragmentDefinition implements IGQLFragmentDefinition {
    name: string;
    typeCondition: string;
    directives: List<GQLDirective>;
    selections: List<GQLSelection>;
    constructor(name: string, typeCondition: string, directives?: List<GQLDirective>, selections?: List<GQLSelection>);
}
