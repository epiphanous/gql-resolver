import { None, Option } from 'funfix';
import { List } from 'immutable';
import { GQLAny } from './GQLAny';
import { GQLBinding } from './GQLBinding';
import { GQLBooster } from './GQLBooster';
import { GQLFilter } from './GQLFilter';
import { GQLOrderBy } from './GQLOrderBy';
import { GQLPattern } from './GQLPattern';
import { GQLTransform } from './GQLTransform';

interface IGQLQueryArguments {
  any: Option<GQLAny>;
  bindings: List<GQLBinding>;
  boosters: List<GQLBooster>;
  filter: Option<GQLFilter>;
  includeDeprecated: Option<boolean>;
  limit: Option<number>;
  name: Option<string>;
  offset: Option<number>;
  order: List<GQLOrderBy>;
  patterns: List<GQLPattern>;
  transforms: List<GQLTransform>;
}

export class GQLQueryArguments implements IGQLQueryArguments {
  public any: Option<GQLAny>;
  public bindings: List<GQLBinding>;
  public boosters: List<GQLBooster>;
  public filter: Option<GQLFilter>;
  public includeDeprecated: Option<boolean>;
  public limit: Option<number>;
  public name: Option<string>;
  public offset: Option<number>;
  public order: List<GQLOrderBy>;
  public patterns: List<GQLPattern>;
  public transforms: List<GQLTransform>;

  constructor(data: Partial<IGQLQueryArguments> = {}) {
    this.any = data.any || None;
    this.bindings = data.bindings || List();
    this.boosters = data.boosters || List();
    this.filter = data.filter || None;
    this.includeDeprecated = data.includeDeprecated || None;
    this.limit = data.limit || None;
    this.name = data.name || None;
    this.offset = data.offset || None;
    this.order = data.order || List();
    this.patterns = data.patterns || List();
    this.transforms = data.transforms || List();
  }

  public copy(data: Partial<IGQLQueryArguments>) {
    return new GQLQueryArguments({ ...(this as object), ...data });
  }
}
