import { Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';
export interface IGQLVariableDefinition {
    name: string;
    gqlType: GQLType;
    defaultValue: Option<GQLValue>;
    directives: List<GQLDirective>;
}
export declare class GQLVariableDefinition implements IGQLVariableDefinition {
    name: string;
    gqlType: GQLType;
    defaultValue: Option<GQLValue>;
    directives: List<GQLDirective>;
    constructor(name: string, gqlType: GQLType, defaultValue?: Option<GQLValue>, directives?: List<GQLDirective>);
    resolve(vars: Map<string, any>): boolean;
}
