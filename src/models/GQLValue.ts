import { List, Map } from 'immutable';
import { GQLVariable } from './GQLVariable';

interface IGQLValue {
  value: any;
}

export class GQLValue implements IGQLValue {
  public value: any;

  constructor(value: any) {
    this.value = value;
  }

  public resolve(
    vars: Map<string, any>,
    argName: string,
    directives: Map<string, any>
  ) {
    return this.value;
  }
}

export class GQLVariableValue implements GQLValue {
  public value: GQLVariable;

  constructor(value: GQLVariable) {
    this.value = value;
  }

  public resolve(
    vars: Map<string, any>,
    argName: string,
    directives: Map<string, any> = Map<string, any>()
  ): any {
    if (!vars.has(this.value.name)) {
      throw new Error(
        `value not provided for variable ${
          this.value.name
        } in context of argument '${argName}'`
      );
    }
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

  public resolve(
    vars: Map<string, any>,
    argName: string,
    directives: Map<string, any>
  ) {
    return this.value.map((v, k) =>
      v.resolve(vars, `${argName}[${k}]`, directives)
    );
  }
}

export class GQLKeyedValueList extends GQLValue {
  public value: Map<string, GQLValue>;

  public resolve(
    vars: Map<string, any>,
    argName: string,
    directives: Map<string, any>
  ) {
    return this.value.map((v, k) =>
      v.resolve(vars, `${argName}[${k}]`, directives)
    );
  }
}

export class GQLIntValue extends GQLValue {
  public value: number;
}

export class GQLFloatValue extends GQLValue {
  public value: number;
}

export class GQLEnumValue extends GQLValue {
  public value: string;
}

export class GQLStringValue extends GQLValue {
  public value: string;
}
