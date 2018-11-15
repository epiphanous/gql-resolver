import {List} from 'immutable';

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
    constructor(boolValue: boolean) {
        super();
        this.value = boolValue;
    }
}

export class GQLArrayValue extends GQLValue {
    public value: List<any>;
    constructor(arrValue: []) {
        super();
        this.value = List(arrValue);
    }
}

export class GQLNumberValue extends GQLValue {
    public value: number;
    constructor(numValue: number) {
      super();
      this.value = numValue;
    }
}

export class GQLDoubleValue extends GQLNumberValue {}
export class GQLIntValue extends GQLNumberValue {}
export class GQLLongValue extends GQLNumberValue {}

export class GQLEnumValue extends GQLValue {
    public value: string;
    constructor(strValue: string) {
        super();
        this.value = strValue;
    }
}

export class GQLStringValue extends GQLValue {
    public value: string;
    constructor(strValue: string) {
        super();
        this.value = strValue;
    }
}
