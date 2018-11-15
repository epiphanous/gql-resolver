import { None, Option } from 'funfix-core';

interface IGQLAny {
  name: string;
  value: Option<any>;
}

export class GQLAny implements IGQLAny {
  public name: string;
  public value: Option<any>;

  constructor(name: string, value: Option<any> = None) {
    this.name = name;
    this.value = value;
  }
}
