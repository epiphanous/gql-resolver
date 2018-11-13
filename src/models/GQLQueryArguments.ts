import Record from 'dataclass';
import {None, Option} from 'funfix-core';
import {List} from 'immutable';
import {GQLAny} from './GQLAny';
import {GQLBinding} from './GQLBinding';
import {GQLBooster} from './GQLBooster';
import {GQLFilter} from './GQLFilter';
import {GQLOrderBy} from './GQLOrderBy';
import {GQLPattern} from './GQLPattern';
import {GQLTransform} from './GQLTransform';

export class GQLQueryArguments extends Record<GQLQueryArguments> {
    public any: Option<GQLAny> = None;
    public filter: Option<GQLFilter> = None;
    public bindings: List<GQLBinding> = List();
    public boosters: List<GQLBooster> = List();
    public patterns: List<GQLPattern> = List();
    public order: List<GQLOrderBy> = List();
    public limit: Option<number> = None;
    public offset: Option<number> = None;
    public transforms: List<GQLTransform> = List();
    public includeDeprecated: Option<boolean> = None;
    public name: Option<string> = None;
}
