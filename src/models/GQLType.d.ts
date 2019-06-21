export interface IGQLType {
    name: string;
    isList: boolean;
    isRequired: boolean;
}
export declare class GQLType implements IGQLType {
    static _xsdType(name: string): string;
    name: string;
    isList: boolean;
    isRequired: boolean;
    constructor(name: string, isList?: boolean, isRequired?: boolean);
    xsdType(): string;
}
