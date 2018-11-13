import Record from 'dataclass';
import {None, Option} from 'funfix-core';

export class GQLTransform extends Record<GQLTransform> {
    public name: string;
    public arg: Option<string> = None;
}
