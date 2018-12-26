import { None, Option } from 'funfix';
import * as id64 from 'id64';
import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import {assign} from 'lodash';

interface IGQLSelection {
  name: string;
}

export class GQLSelection implements IGQLSelection {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

interface IGQLField extends IGQLSelection {
  alias: Option<string>;
  args: List<GQLArgument>;
  directives: List<GQLDirective>;
  selections: List<GQLSelection>;
  fields: List<[string, GQLField]>;
}

export class GQLField extends GQLSelection implements IGQLField {
  public alias: Option<string>;
  public args: List<GQLArgument>;
  public directives: List<GQLDirective>;
  public selections: List<GQLSelection>;
  public fields: List<[string, GQLField]>;

  constructor(
      data: Partial<IGQLField> = {}
  ) {
      super(data.name);
      this.alias = data.alias;
      this.args = data.args;
      this.directives = data.directives;
      this.selections = data.selections;
      this.fields = data.fields;
  }

  public copy(fields: Partial<IGQLField>) {
      return new GQLField({...(this as object), ...fields});
  }
}

interface IGQLFragmentSpread extends IGQLSelection {
  directives: List<GQLDirective>;
}

export class GQLFragmentSpread extends GQLSelection
  implements IGQLFragmentSpread {
  public directives: List<GQLDirective>;

  constructor(
    name: string,
    directives: List<GQLDirective> = List<GQLDirective>()
  ) {
    super(name);
    this.directives = directives;
  }
}

interface IGQLInlineFragment extends IGQLSelection {
  typeConditions: string;
  directives: List<GQLDirective>;
  selections: List<GQLSelection>;
}

export class GQLInlineFragment extends GQLSelection
  implements IGQLInlineFragment {
  public typeConditions: string;
  public selections: List<GQLSelection>;
  public directives: List<GQLDirective>;

  constructor(
    typeConditions: string,
    selections: List<GQLSelection>,
    directives: List<GQLDirective> = List<GQLDirective>()
  ) {
    super(id64.gen());
    this.typeConditions = typeConditions;
    this.selections = selections;
  }
}
