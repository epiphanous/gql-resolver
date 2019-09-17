import { GQLFieldDefinition } from '.';

export interface IGQLSortBy {
  field: GQLFieldDefinition;
  desc: boolean;
}

export class GQLSortBy implements IGQLSortBy {
  public field: GQLFieldDefinition;
  public desc: boolean;

  constructor(field: GQLFieldDefinition, desc: boolean = false) {
    this.field = field;
    this.desc = desc;
  }
}
