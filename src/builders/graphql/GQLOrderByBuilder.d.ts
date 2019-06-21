import { Parser } from 'antlr4ts';
import { Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { OrderByContext, OrderBysContext, QueryModificationParser } from '../../antlr4/generated/QueryModificationParser';
import { GQLSortBy } from '../../models/GQLSortBy';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
export declare class GQLOrderByBuilder extends GQLObjectQueryModifierBuilder {
    result: List<GQLSortBy>;
    constructor(validFields: Map<string, string>, validVariables: Set<GQLVariableDefinition>, vars: Map<string, any>, prefixes: Set<string>, source?: string);
    build(parser: QueryModificationParser): Try<List<GQLSortBy>>;
    parse(parser: Parser): OrderBysContext;
    exitOrderBys(context: OrderBysContext): void;
    processOrderBys(context: OrderBysContext): List<GQLSortBy>;
    processOrderBy(context: OrderByContext): GQLSortBy;
}
