import { Option } from 'funfix';
export declare class FakeIRILiteral {
    value: Option<any>;
    constructor(value?: Option<any>);
    getLocalName(): string;
    getNamespace(): string;
    stringValue(): string;
    toString(): string;
}
