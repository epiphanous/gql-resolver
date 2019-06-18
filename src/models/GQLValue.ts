import { List, Map } from 'immutable';
import { GQLVariable } from './GQLVariable';

export interface IGQLValue {
  value: any;
}

export class GQLValue implements IGQLValue {
  public value: any;

  constructor(value: any) {
    this.value = value;
  }

  public resolve(vars: Map<string, any>) {
    return this.value;
  }
}

export class GQLVariableValue extends GQLValue {
  public value!: GQLVariable;

  constructor(value: GQLVariable = new GQLVariable('unknown')) {
    super(value);
  }

  public resolve(vars: Map<string, any>): any {
    return vars.get(this.value.name);
  }
}

export class GQLBooleanValue extends GQLValue {
  public value!: boolean;
  constructor(value: boolean = false) {
    super(value);
  }
}

export class GQLNullValue extends GQLValue {
  public constructor() {
    super(null);
  }
}

export class GQLValueList extends GQLValue {
  public value!: List<GQLValue>;

  constructor(value: List<GQLValue> = List<GQLValue>()) {
    super(value);
  }

  public resolve(vars: Map<string, any>) {
    return this.value.map((v, k) => v.resolve(vars));
  }
}

export class GQLKeyedValueList extends GQLValue {
  public value!: Map<string, GQLValue>;

  constructor(value: Map<string, GQLValue> = Map<string, GQLValue>()) {
    super(value);
  }

  public resolve(vars: Map<string, any>) {
    return this.value.map((v, k) => v.resolve(vars));
  }
}

export class GQLIntValue extends GQLValue {
  public value!: number;
  constructor(value: number = 0) {
    super(value);
  }
}

export class GQLFloatValue extends GQLValue {
  public value!: number;
  constructor(value: number = 0.0) {
    super(value);
  }
}

export class GQLEnumValue extends GQLValue {
  public value!: string;
  constructor(value: string = '') {
    super(value);
  }
}

export class GQLStringValue extends GQLValue {
  public value!: string;
  constructor(value: string = '') {
    super(value);
  }
}
