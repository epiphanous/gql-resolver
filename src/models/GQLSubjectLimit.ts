import Record from 'dataclass';
import {QueryStrategy} from './QueryStrategy';

export class GQLSubjectLimit extends Record<GQLSubjectLimit> {
    public maxSubjects: number;
    public offset: number;

    public updateQuery(query: QueryStrategy): QueryStrategy {
        return query.withLimitOffset(this.maxSubjects, this.offset);
    }
}
