import Record from 'dataclass';

export class GQLType extends Record<GQLType> {
  public name: string;
  public isList: boolean;
  public isRequired: boolean;

  get xsdType() {
    return (
      {
        ID: 'iri',
        string: 'xsd:string',
        Int: 'xsd:integer',
        Float: 'xsd:float',
        Double: 'xsd:decimal',
        Boolean: 'xsd:boolean',
      }[name] || name
    );
  }
}
