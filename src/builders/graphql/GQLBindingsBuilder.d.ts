import { Parser } from 'antlr4ts';
import { List, Map, Set } from 'immutable';
import { BindingContext, BindingsContext } from '../../antlr4/generated/QueryModificationParser';
import { GQLBinding } from '../../models/GQLBinding';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
export declare class GQLBindingsBuilder extends GQLObjectQueryModifierBuilder {
    result: List<GQLBinding>;
    constructor(validFields: Map<string, string>, validVariables: Set<GQLVariableDefinition>, vars: Map<string, any>, prefixes: Set<string>, source?: string);
    parse(parser: Parser): BindingsContext;
    exitBindings(context: BindingsContext): void;
    processBindings(context: BindingsContext): List<GQLBinding>;
    processBinding(context: BindingContext): GQLBinding;
}
