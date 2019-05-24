export interface INamespace {
  getName(): string;

  getPrefix(): string;
}

export class SimpleNamespace implements INamespace {
  private prefix: string;
  private name: string;

  constructor(prefix: string, name: string) {
    this.prefix = prefix;
    this.name = name;
    return this;
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
