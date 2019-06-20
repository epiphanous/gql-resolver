export interface IGQLBooster {
    boost: number;
}
export declare class GQLBooster implements IGQLBooster {
    boost: number;
    constructor(boost: number);
}
export declare class GQLFieldBooster extends GQLBooster {
    field: string;
    constructor(boost: number, field: string);
}
export declare class GQLUserFollowsBooster extends GQLBooster {
    user: string;
    constructor(boost: number, user: string);
}
export declare class GQLUserIsFollowedBooster extends GQLBooster {
    user: string;
    constructor(boost: number, user: string);
}
