import { None, Option } from 'funfix';
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

export class GQLQueryArguments implements IGQLQueryArguments {
  public after: Option<string> = None;
  public any = List<GQLAny>();
  public before: Option<string> = None;
  public bindings = List<GQLBinding>();
  public boosters = List<GQLBooster>();
  public filter: Option<GQLFilter> = None;
  public first: Option<number> = None;
  public includeDeprecated: Option<boolean> = None;
  public last: Option<number> = None;
  public name: Option<string> = None;
  public sortBy = List<GQLSortBy>();
  public patterns = List<GQLPattern>();
  public transforms = List<GQLTransform>();

  constructor(data: Partial<IGQLQueryArguments> = {}) {
    Object.assign<GQLQueryArguments, Partial<IGQLQueryArguments>>(this, data);
  }

  public copy(data: Partial<IGQLQueryArguments>) {
    return new GQLQueryArguments({ ...(this as object), ...data });
  }
}
