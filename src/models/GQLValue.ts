import { Option } from 'funfix';
import { List } from 'immutable';
import { GQLVariable } from './GQLVariable';

interface IGQLValue {
  value: any;
}

export class GQLValue implements IGQLValue {
  public value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export class GQLVariableValue implements GQLValue {
  public value: GQLVariable;

  constructor(value: GQLVariable) {
    this.value = value;
  }

  public resolve(vars: Map<string, any>): any {
    return vars.get(this.value.name);
  }
}

export class GQLBooleanValue extends GQLValue {
  public value: boolean;
}

export class GQLNullValue extends GQLValue {
  public constructor() {
    super(null);
  }
}
export class GQLValueList extends GQLValue {
  public value: List<GQLValue>;
}

export class GQLKeyedValueList extends GQLValue {
  public value: Map<string, GQLValue>;
}

export class GQLIntValue extends GQLValue {}
export class GQLFloatValue extends GQLValue {}
export class GQLEnumValue extends GQLValue {
  public value: string;
}

export class GQLStringValue extends GQLValue {
  public value: string;
}
