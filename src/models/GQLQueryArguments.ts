import { None, Option } from 'funfix-core';
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
  filter: Option<GQLFilter>;
  bindings: List<GQLBinding>;
  boosters: List<GQLBooster>;
  patterns: List<GQLPattern>;
  order: List<GQLOrderBy>;
  limit: Option<number>;
  offset: Option<number>;
  transforms: List<GQLTransform>;
  includeDeprecated: Option<boolean>;
  name: Option<string>;
}

export class GQLQueryArguments implements IGQLQueryArguments {
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

  constructor(props: Partial<IGQLQueryArguments>) {
    // tslint:disable-next-line:prefer-const
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }
}
