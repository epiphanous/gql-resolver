import { List } from 'immutable';

interface IGQLValue {
  value: any;
}

export class GQLValue implements IGQLValue {
  public value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export class GQLBooleanValue extends GQLValue {
  public value: boolean;
}

export class GQLArrayValue extends GQLValue {
  public value: List<any>;
}

export class GQLNumberValue extends GQLValue {
  public value: number;
}

export class GQLDoubleValue extends GQLNumberValue {}
export class GQLIntValue extends GQLNumberValue {}
export class GQLLongValue extends GQLNumberValue {}

export class GQLEnumValue extends GQLValue {
  public value: string;
}

export class GQLStringValue extends GQLValue {
  public value: string;
}
