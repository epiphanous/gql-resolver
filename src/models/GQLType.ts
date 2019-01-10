interface IGQLType {
  name: string;
  isList: boolean;
  isRequired: boolean;
}

export class GQLType implements IGQLType {
  public name: string;
  public isList: boolean;
  public isRequired: boolean;

  constructor(
    name: string,
    isList: boolean = false,
    isRequired: boolean = false
  ) {
    this.name = name;
    this.isList = isList;
    this.isRequired = isRequired;
  }

  public xsdType() {
    return (
      {
        ID: 'iri',
        string: 'xsd:string',
        Int: 'xsd:integer',
        Float: 'xsd:float',
        Double: 'xsd:decimal',
        Boolean: 'xsd:boolean',
      }[this.name] || this.name
    );
  }
}
