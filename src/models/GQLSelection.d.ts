import { Option } from 'funfix';
import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
export interface IGQLSelection {
    name: string;
}
export declare class GQLSelection implements IGQLSelection {
    name: string;
    constructor(name: string);
}
export interface IGQLField extends IGQLSelection {
    alias?: Option<string>;
    args?: List<GQLArgument>;
    directives?: List<GQLDirective>;
    selections?: List<GQLSelection>;
    outputType?: string;
    parentType: string;
    fields?: List<[string, GQLField]>;
}
export declare class GQLField extends GQLSelection implements IGQLField {
    alias: Option<string>;
    args: List<GQLArgument>;
    directives: List<GQLDirective>;
    selections: List<GQLSelection>;
    outputType: string;
    fields: List<[string, GQLField]>;
    parentType: string;
    constructor(data?: Partial<IGQLField>);
    copy(data: Partial<IGQLField>): GQLField;
    isObject(): boolean;
}
export interface IGQLFragmentSpread extends IGQLSelection {
    directives: List<GQLDirective>;
}
export declare class GQLFragmentSpread extends GQLSelection implements IGQLFragmentSpread {
    directives: List<GQLDirective>;
    constructor(name: string, directives?: List<GQLDirective>);
}
export interface IGQLInlineFragment extends IGQLSelection {
    typeCondition: string;
    directives: List<GQLDirective>;
    selections: List<GQLSelection>;
}
export declare class GQLInlineFragment extends GQLSelection implements IGQLInlineFragment {
    typeCondition: string;
    selections: List<GQLSelection>;
    directives: List<GQLDirective>;
    constructor(typeCondition: string, selections: List<GQLSelection>, directives?: List<GQLDirective>);
}
