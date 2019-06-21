export interface IGQLSortBy {
  field: string;
  desc: boolean;
}

export class GQLSortBy implements IGQLSortBy {
  public field: string;
  public desc: boolean;

  constructor(field: string, desc: boolean = false) {
    this.field = field;
    this.desc = desc;
  }

  public toSparqlString() {
    return `${this.desc ? 'DESC(' : ''}${this.field}${this.desc ? ')' : ''}`;
  }
}
