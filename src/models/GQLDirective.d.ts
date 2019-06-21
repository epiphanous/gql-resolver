import { Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLArgument } from './GQLArgument';
export interface IGQLDirective {
    name: string;
    arguments: List<GQLArgument>;
}
export declare class GQLDirective implements IGQLDirective {
    name: string;
    arguments: List<GQLArgument>;
    constructor(name: string, args?: List<GQLArgument>);
    arg(name: string, vars?: Map<string, any>): Option<any>;
}
