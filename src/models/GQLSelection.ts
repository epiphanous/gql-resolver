import { Option } from 'funfix';
import * as id64 from 'id64';
import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import ResolverContext from './ResolverContext';
import { GQLTypeDefinition } from './GQLTypeDefinition';

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
  outputType: string;
  parentType: string; // parent field's outputType
  fields: List<[string, GQLField]>;
}

export class GQLField extends GQLSelection implements IGQLField {
  public alias: Option<string>;
  public args: List<GQLArgument>;
  public directives: List<GQLDirective>;
  public selections: List<GQLSelection>;
  public outputType: string;
  public fields: List<[string, GQLField]>;
  public parentType: string;

  constructor(data: Partial<IGQLField> = {}) {
    super(data.name);
    this.alias = data.alias;
    this.args = data.args;
    this.directives = data.directives;
    this.selections = data.selections;
    this.outputType = data.outputType;
    this.parentType = data.parentType;
    this.fields = data.fields;
  }

  public copy(data: Partial<IGQLField>) {
    return new GQLField({ ...(this as object), ...data });
  }

  public isObject() {
    return Option.of(this.fields)
      .map(fl => fl.size > 0)
      .getOrElse(false);
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
  typeCondition: string;
  directives: List<GQLDirective>;
  selections: List<GQLSelection>;
}

export class GQLInlineFragment extends GQLSelection
  implements IGQLInlineFragment {
  public typeCondition: string;
  public selections: List<GQLSelection>;
  public directives: List<GQLDirective>;

  constructor(
    typeCondition: string,
    selections: List<GQLSelection>,
    directives: List<GQLDirective> = List<GQLDirective>()
  ) {
    super(id64.gen());
    this.typeCondition = typeCondition;
    this.selections = selections;
    this.directives = directives;
  }
}
