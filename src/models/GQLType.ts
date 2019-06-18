export interface IGQLType {
  name: string;
  isList: boolean;
  isRequired: boolean;
}

export class GQLType implements IGQLType {
  public static _xsdType(name: string) {
    const xsdTypeMap: { [key: string]: string } = {
      ID: 'xsd:anyURI',
      Boolean: 'xsd:boolean',
      Float: 'xsd:float',
      Int: 'xsd:integer',
      String: 'xsd:string',
      URL: 'xsd:anyURI',
      URI: 'xsd:anyURI',
      Date: 'xsd:date',
      Time: 'xsd:time',
      DateTime: 'xsd:dateTime',
      Duration: 'xsd:duration',
    };
    return xsdTypeMap[name] || name;
  }

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
    return GQLType._xsdType(this.name);
  }
}
