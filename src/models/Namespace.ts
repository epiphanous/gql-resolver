interface INamespace {
    getName(): string;
    getPrefix(): string;
}

export default class SimpleNamespace implements INamespace {
    private prefix: string;
    private name: string;
    constructor(
        prefix: string,
        name: string
    ) {
        this.setPrefix(prefix);
        this.setName(name);
        return [this.getPrefix(), this.getName()];
    }

    public getPrefix() {
        return this.prefix || '';
    }

    public setPrefix(newPrefix: string) {
        this.prefix = newPrefix;
    }

    public getName() {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public toString(): string {
        return `${this.getPrefix()} :: ${this.getName()}`;
    }
}
