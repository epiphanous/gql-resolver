import { List, Map } from 'immutable';
import { GQLVariable } from './GQLVariable';
export interface IGQLValue {
    value: any;
}
export declare class GQLValue implements IGQLValue {
    value: any;
    constructor(value: any);
    resolve(vars: Map<string, any>): any;
}
export declare class GQLVariableValue extends GQLValue {
    value: GQLVariable;
    constructor(value?: GQLVariable);
    resolve(vars: Map<string, any>): any;
}
export declare class GQLBooleanValue extends GQLValue {
    value: boolean;
    constructor(value?: boolean);
}
export declare class GQLNullValue extends GQLValue {
    constructor();
}
export declare class GQLValueList extends GQLValue {
    value: List<GQLValue>;
    constructor(value?: List<GQLValue>);
    resolve(vars: Map<string, any>): List<any>;
}
export declare class GQLKeyedValueList extends GQLValue {
    value: Map<string, GQLValue>;
    constructor(value?: Map<string, GQLValue>);
    resolve(vars: Map<string, any>): Map<string, any>;
}
export declare class GQLIntValue extends GQLValue {
    value: number;
    constructor(value?: number);
}
export declare class GQLFloatValue extends GQLValue {
    value: number;
    constructor(value?: number);
}
export declare class GQLEnumValue extends GQLValue {
    value: string;
    constructor(value?: string);
}
export declare class GQLStringValue extends GQLValue {
    value: string;
    constructor(value?: string);
}
