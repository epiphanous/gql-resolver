import { Option } from 'funfix';
import { List, Map, OrderedMap } from 'immutable';
import { Literal } from 'rdf-js';
import { GQLExecutionPlan, GQLField, QueryResult, SimpleNamespace } from '../models';
import { QueryStrategy } from './QueryStrategy';
export declare class SparqlQueryStrategy extends QueryStrategy {
    private endpoint;
    private prefixes;
    private fetcher;
    private DEFAULT_CURSOR_LABEL;
    private DEFAULT_CURSOR_PREDICATE;
    private IGNORED_PROJECTIONS;
    private DEFAULT_NEARBY_RADIUS;
    private SPECIAL_PROJECTIONS;
    private RESERVED_KEYWORDS;
    constructor(fields: List<GQLField>, plan: GQLExecutionPlan, endpoint: string, prefixes: Map<string, SimpleNamespace>);
    getPrefixes(): string;
    processPageInfo(rows: any): any;
    moreThanOneSubjectId(): boolean | null;
    constructPageInfoQuery(injectable?: boolean, parentConstraint?: string): string;
    constructDataQuery(objectType: string, args: Map<string, any>, projections: List<{
        [key: string]: string;
    }>): string;
    constructUnionQueryFromProvidedQueries(pageInfo?: boolean): string;
    executeQuery(query: string): Promise<any>;
    processData([rows, errors]: any[]): QueryResult;
    injectPageInfo(pageInfo: Array<{
        [key: string]: string;
    }>): void;
    mapLiteralResultsToObjects(results: Array<{
        [key: string]: Literal;
    }>): {
        [key: string]: string;
    }[];
    mapResultsObjectToOrderedMap(results: Array<{
        [key: string]: string;
    }>): OrderedMap<string, any>;
    resolve(): Promise<QueryResult>;
    protected isReservedKeyword(word: string): boolean;
    protected shouldPopFinalArray(resultArrLength: number): boolean;
    protected getProjections(): List<{
        name: string;
        projection: string;
    }>;
    protected hasProperParent(): boolean | null;
    protected addConditionalOperator(len: number, index: number, operator: string): string;
    protected spreadArguments(): string;
    protected spreadProjections(projections: List<any>, overriddenSubject?: Option<string>): string;
    protected addFilters(): string;
    protected addGeoNearbyConstraint(): string;
    protected addParentConstraints(): string;
    protected addLimit(): string;
    protected hasFilters(): boolean;
    protected addSortBy(): string;
    protected isAGeoSpatialQuery(): boolean;
    protected isResolvingConnection(): boolean;
    protected addCursorField(subjectToBindTo?: string): string;
    protected addCursorOffset(cursorVar?: string): string;
    protected addPageInfoIfNeeded(actualNumberOfResults?: number): OrderedMap<string, {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }> | null;
    protected addPageInfo(actualNumberOfResults?: number): OrderedMap<string, {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    private normalizePrefix;
}
