import Record from 'dataclass';
import {Option} from 'funfix-core';

export class GQLAny extends Record<GQLAny> {
    public name: string;
    public value: Option<any>;
}
