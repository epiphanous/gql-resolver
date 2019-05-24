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
  public value: boolean = false;
}

export class GQLNullValue extends GQLValue {
  public constructor() {
    super(null);
  }
}

export class GQLValueList extends GQLValue {
  public value: List<GQLValue> = List<GQLValue>();

  public resolve(vars: Map<string, any>) {
    return this.value.map((v, k) => v.resolve(vars));
  }
}

export class GQLKeyedValueList extends GQLValue {
  public value: Map<string, GQLValue> = Map<string, GQLValue>();

  public resolve(vars: Map<string, any>) {
    return this.value.map((v, k) => v.resolve(vars));
  }
}

export class GQLIntValue extends GQLValue {
  public value: number = 0;
}

export class GQLFloatValue extends GQLValue {
  public value: number = 0.0;
}

export class GQLEnumValue extends GQLValue {
  public value: string = '';
}

export class GQLStringValue extends GQLValue {
  public value: string = '';
}
