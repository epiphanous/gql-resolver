import { Map, Set } from 'immutable';
import { Try } from 'funfix';
import { FieldRefContext, QueryModificationParser, SearchConditionContext } from '../../antlr4/generated/QueryModificationParser';
import { GQLFilter } from '../../models/GQLFilter';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
export declare class GQLFilterBuilder extends GQLObjectQueryModifierBuilder {
    validFields: Map<string, string>;
    validVariables: Set<GQLVariableDefinition>;
    vars: Map<string, string>;
    prefixes: Set<string>;
    source: string;
    referencedFields: Set<string>;
    result: GQLFilter;
    parseWith(parser: QueryModificationParser): import("../../antlr4/generated/QueryModificationParser").FilterContext;
    build(parser: QueryModificationParser): Try<GQLFilter>;
    exitSearchCondition(context: SearchConditionContext): void;
    processFieldRef(context: FieldRefContext): import("../..").GQLObjectQueryModifierField;
}
