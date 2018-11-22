export default class NameAndAlias {
  public alias: string;
  public name: string;

  constructor(name: string, alias: string = name) {
    this.alias = alias || name;
    this.name = name;
  }
}
