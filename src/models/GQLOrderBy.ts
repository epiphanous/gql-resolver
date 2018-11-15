interface IGQLOrderBy {
  field: string;
  desc: boolean;
}

export class GQLOrderBy implements IGQLOrderBy {
  public field: string;
  public desc: boolean;

  constructor(field: string, desc: boolean = false) {
    this.field = field;
    this.desc = desc;
  }

  public toString() {
    return `${this.desc ? 'DESC(' : ''}${this.field}${this.desc ? ')' : ''}`;
  }
}
