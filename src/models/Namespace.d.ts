export interface INamespace {
    getName(): string;
    getPrefix(): string;
}
export declare class SimpleNamespace implements INamespace {
    private prefix;
    private name;
    constructor(prefix: string, name: string);
    getPrefix(): string;
    setPrefix(newPrefix: string): void;
    getName(): string;
    setName(newName: string): void;
    toString(): string;
}
