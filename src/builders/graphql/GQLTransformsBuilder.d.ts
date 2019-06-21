import { Parser } from 'antlr4ts';
import { List, Set } from 'immutable';
import { TransformContext, TransformsContext } from '../../antlr4/generated/QueryModificationParser';
import { GQLTransform } from '../../models/GQLTransform';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
export declare class GQLTransformsBuilder extends GQLObjectQueryModifierBuilder {
    result: List<GQLTransform>;
    constructor(prefixes: Set<string>, source?: string);
    parse(parser: Parser): TransformsContext;
    exitTransforms(context: TransformsContext): void;
    processTransforms(context: TransformsContext): List<GQLTransform>;
    processTransform(context: TransformContext): GQLTransform;
}
