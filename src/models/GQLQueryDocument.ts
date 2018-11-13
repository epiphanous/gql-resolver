import Record from 'dataclass';
import {List} from 'immutable';
import {GQLOperation} from './GQLOperation';

export class GQLQueryDocument extends Record<GQLQueryDocument> {
    public operations: List<GQLOperation>;
}
