import { Option } from 'funfix';
export interface IGQLAny {
    name: string;
    value: Option<any>;
}
export declare class GQLAny implements IGQLAny {
    name: string;
    value: Option<any>;
    constructor(name: string, value?: Option<any>);
}
