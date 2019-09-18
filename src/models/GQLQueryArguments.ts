import { None, Option } from 'funfix';
import { List } from 'immutable';
import { GQLAny, GQLFilter, GQLOrderBys } from '.';

export interface IGQLQueryArguments {
  after?: Option<string>;
  any?: List<GQLAny>;
  before?: Option<string>;
  filter?: Option<GQLFilter>;
  first?: Option<number>;
  includeDeprecated?: Option<boolean>;
  last?: Option<number>;
  name?: Option<string>;
  orderBys?: Option<GQLOrderBys>;
}

export class GQLQueryArguments implements IGQLQueryArguments {
  public after: Option<string> = None;
  public any = List<GQLAny>();
  public before: Option<string> = None;
  public filter: Option<GQLFilter> = None;
  public first: Option<number> = None;
  public includeDeprecated: Option<boolean> = None;
  public last: Option<number> = None;
  public name: Option<string> = None;
  public orderBys: Option<GQLOrderBys> = None;

  constructor(data: Partial<IGQLQueryArguments> = {}) {
    Object.assign<GQLQueryArguments, Partial<IGQLQueryArguments>>(this, data);
  }

  public copy(data: Partial<IGQLQueryArguments>) {
    return new GQLQueryArguments({ ...(this as object), ...data });
  }
}
