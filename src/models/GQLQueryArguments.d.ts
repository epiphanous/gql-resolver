import { Option } from 'funfix';
import { List } from 'immutable';
import { GQLAny } from './GQLAny';
import { GQLBinding } from './GQLBinding';
import { GQLBooster } from './GQLBooster';
import { GQLFilter } from './GQLFilter';
import { GQLPattern } from './GQLPattern';
import { GQLSortBy } from './GQLSortBy';
import { GQLTransform } from './GQLTransform';
export interface IGQLQueryArguments {
    after?: Option<string>;
    any?: List<GQLAny>;
    before?: Option<string>;
    bindings?: List<GQLBinding>;
    boosters?: List<GQLBooster>;
    filter?: Option<GQLFilter>;
    first?: Option<number>;
    includeDeprecated?: Option<boolean>;
    last?: Option<number>;
    name?: Option<string>;
    sortBy?: List<GQLSortBy>;
    patterns?: List<GQLPattern>;
    transforms?: List<GQLTransform>;
}
export declare class GQLQueryArguments implements IGQLQueryArguments {
    after: Option<string>;
    any: List<GQLAny>;
    before: Option<string>;
    bindings: List<GQLBinding>;
    boosters: List<GQLBooster>;
    filter: Option<GQLFilter>;
    first: Option<number>;
    includeDeprecated: Option<boolean>;
    last: Option<number>;
    name: Option<string>;
    sortBy: List<GQLSortBy>;
    patterns: List<GQLPattern>;
    transforms: List<GQLTransform>;
    constructor(data?: Partial<IGQLQueryArguments>);
    copy(data: Partial<IGQLQueryArguments>): GQLQueryArguments;
}
