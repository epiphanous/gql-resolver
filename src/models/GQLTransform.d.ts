import { Option } from 'funfix';
export interface IGQLTransform {
    name: string;
    arg: Option<string>;
}
export declare class GQLTransform implements IGQLTransform {
    name: string;
    arg: Option<string>;
    constructor(name: string, arg?: Option<string>);
}
