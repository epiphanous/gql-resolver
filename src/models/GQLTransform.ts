import { None, Option } from 'funfix-core';

interface IGQLTransform {
  name: string;
  arg: Option<string>;
}

export class GQLTransform implements IGQLTransform {
  public name: string;
  public arg: Option<string>;

  constructor(name: string, arg: Option<string> = None) {
    this.name = name;
    this.arg = arg;
  }
}
