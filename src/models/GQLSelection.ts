import { Option, None } from 'funfix';
import * as id64 from 'id64';
import { List } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';

export interface IGQLSelection {
  name: string;
}

export class GQLSelection implements IGQLSelection {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export interface IGQLField extends IGQLSelection {
  alias?: Option<string>;
  args?: List<GQLArgument>;
  directives?: List<GQLDirective>;
  selections?: List<GQLSelection>;
  outputType?: string;
  parentType: string; // parent field's outputType
  fields?: List<[string, GQLField]>;
}

export class GQLField extends GQLSelection implements IGQLField {
  public alias: Option<string> = None;
  public args = List<GQLArgument>();
  public directives = List<GQLDirective>();
  public selections = List<GQLSelection>();
  public outputType: string = 'xsd:string';
  public fields = List<[string, GQLField]>();
  public parentType: string = '';

  constructor(data: Partial<IGQLField> = {}) {
    super(data.name || 'unknown');
    Object.assign<GQLField, Partial<IGQLField>>(this, data);
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

export interface IGQLFragmentSpread extends IGQLSelection {
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

export interface IGQLInlineFragment extends IGQLSelection {
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
    super(id64.gen(false));
    this.typeCondition = typeCondition;
    this.selections = selections;
    this.directives = directives;
  }
}
