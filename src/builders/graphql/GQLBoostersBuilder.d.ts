import { Parser } from 'antlr4ts';
import { List, Map, Set } from 'immutable';
import * as QMP from '../../antlr4/generated/QueryModificationParser';
import { GQLBooster, GQLUserFollowsBooster, GQLUserIsFollowedBooster } from '../../models/GQLBooster';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
export declare class GQLBoostersBuilder extends GQLObjectQueryModifierBuilder {
    result: List<GQLBooster>;
    constructor(validFields: Map<string, string>, validVariables: Set<GQLVariableDefinition>, vars: Map<string, any>, prefixes: Set<string>, source?: string);
    parse(parser: Parser): QMP.BoostersContext;
    exitBoosters(context: QMP.BoostersContext): void;
    processBoosters(context: QMP.BoostersContext): List<GQLBooster>;
    processBooster(context: QMP.BoostContext): GQLBooster;
    processFollowsUser(context: QMP.FollowsUserBoostContext): GQLUserIsFollowedBooster;
    processedFollowedByUser(context: QMP.FollowedByUserBoostContext): GQLUserFollowsBooster;
}
