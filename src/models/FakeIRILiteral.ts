import Record from 'dataclass';
import {Option} from 'funfix-core';

export class FakeIRILiteral extends Record<FakeIRILiteral> {
    public value: Option<any>;

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
