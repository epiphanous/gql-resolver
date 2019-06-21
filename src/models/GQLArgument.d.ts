import { Map } from 'immutable';
import { GQLValue } from './GQLValue';
export interface IGQLArgument {
    name: string;
    value: GQLValue;
    resolve(vars: Map<string, any>): any;
}
export declare class GQLArgument implements IGQLArgument {
    name: string;
    value: GQLValue;
    constructor(name: string, value: GQLValue);
    resolve(vars: Map<string, any>): any;
}
export declare class GQLAfterArgument extends GQLArgument {
}
export declare class GQLAnyArgument extends GQLArgument {
}
export declare class GQLBeforeArgument extends GQLArgument {
}
export declare class GQLBindingsArgument extends GQLArgument {
}
export declare class GQLBoostersArgument extends GQLArgument {
}
export declare class GQLFilterArgument extends GQLArgument {
}
export declare class GQLFirstArgument extends GQLArgument {
}
export declare class GQLIncludeDeprecatedArgument extends GQLArgument {
}
export declare class GQLInvalidArgument extends GQLArgument {
}
export declare class GQLLastArgument extends GQLArgument {
}
export declare class GQLNameArgument extends GQLArgument {
}
export declare class GQLPatternsArgument extends GQLArgument {
}
export declare class GQLSortByArgument extends GQLArgument {
}
export declare class GQLTransformsArgument extends GQLArgument {
}
