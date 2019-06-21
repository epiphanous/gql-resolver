import { List, OrderedMap } from 'immutable';
export interface IMetaFields {
    startTime: number;
    duration: number;
    bytes: number;
    count: number;
    done: boolean;
    ok: boolean;
    errors: List<string>;
    bps: number;
}
export declare class QueryResult {
    data: OrderedMap<string, any>;
    meta: IMetaFields;
    constructor(startTime?: number, duration?: number);
    bps(): number;
    getResult(): Promise<Object | undefined>;
    merge(that: OrderedMap<string, any>): void;
    addMetadata(): void;
}
