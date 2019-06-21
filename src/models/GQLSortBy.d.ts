export interface IGQLSortBy {
    field: string;
    desc: boolean;
}
export declare class GQLSortBy implements IGQLSortBy {
    field: string;
    desc: boolean;
    constructor(field: string, desc?: boolean);
    toSparqlString(): string;
}
