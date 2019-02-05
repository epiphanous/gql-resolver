import { None, Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLArgumentDefinition } from './GQLTypeDefinition';
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
    argDef: Option<GQLArgumentDefinition> = None,
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
    argDefOpt: Option<GQLArgumentDefinition> = None,
    directives: Map<string, any> = Map<string, any>()
  ): any {
    const fromVars = Option.of(vars.get(this.value.name));
    if (fromVars.isEmpty()) {
      const defaultValue = argDefOpt
        .flatMap(a => a.defaultValue)
        .map(v => v.resolve(vars, None, Map()));
      if (defaultValue.isEmpty()) {
        throw new Error(
          `value not provided for variable $${this.value.name}${argDefOpt
            .map(a => ` in the context of argument ${a.name}`)
            .getOrElse('')}`
        );
      } else {
        return defaultValue.get();
      }
    } else {
      return vars.get(this.value.name);
    }
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
    argDefOpt: Option<GQLArgumentDefinition> = None,
    directives: Map<string, any> = Map<string, any>()
  ) {
    return this.value.map((v, k) => v.resolve(vars, argDefOpt, directives));
  }
}

export class GQLKeyedValueList extends GQLValue {
  public value: Map<string, GQLValue>;

  public resolve(
    vars: Map<string, any>,
    argDefOpt: Option<GQLArgumentDefinition> = None,
    directives: Map<string, any>
  ) {
    return this.value.map((v, k) => v.resolve(vars, argDefOpt, directives));
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
