import { None, Option } from 'funfix-core';

export class FakeIRILiteral {
  public value: Option<any>;

  constructor(value: Option<any> = None) {
    this.value = value;
  }

  public getLocalName(): string {
    return this.stringValue();
  }

  public getNamespace(): string {
    return 'gql://scalar-object#';
  }

  public stringValue(): string {
    return this.value.getOrElse('null').toString;
  }

  public toString(): string {
    return this.stringValue();
  }
}
