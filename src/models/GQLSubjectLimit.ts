import { QueryStrategy } from './QueryStrategy';

interface IGQLSubjectLimit {
  maxSubjects: number;
  offset: number;
}

export class GQLSubjectLimit implements IGQLSubjectLimit {
  public maxSubjects: number;
  public offset: number;

  constructor(maxSubjects: number, offset: number) {
    this.maxSubjects = maxSubjects;
    this.offset = offset;
  }

  public updateQuery(query: QueryStrategy): QueryStrategy {
    return query.withLimitOffset(this.maxSubjects, this.offset);
  }
}
