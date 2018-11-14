import { None, Option } from 'funfix';
import id64 from 'id64';
import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';

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
    name: string,
    alias: Option<string> = None,
    args = List<GQLArgument>(),
    directives = List<GQLDirective>(),
    selections = List<GQLSelection>(),
    fields = List<[string, GQLField]>()
  ) {
    super(name);
    this.alias = alias;
    this.args = args;
    this.directives = directives;
    this.selections = selections;
    this.fields = fields;
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
