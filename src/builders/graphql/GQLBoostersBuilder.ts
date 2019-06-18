import { Parser } from 'antlr4ts';
import { List, Map, Set } from 'immutable';
import * as QMP from '../../antlr4/generated/QueryModificationParser';
import {
  GQLBooster,
  GQLUserFollowsBooster,
  GQLUserIsFollowedBooster,
} from '../../models/GQLBooster';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';
import { BoostContext } from '../../antlr4/generated/QueryModificationParser';

export class GQLBoostersBuilder extends GQLObjectQueryModifierBuilder {
  public result!: List<GQLBooster>;

  constructor(
    validFields: Map<string, string>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, any>,
    prefixes: Set<string>,
    source: string = 'boosters'
  ) {
    super(validFields, validVariables, vars, prefixes, source);
  }

  public parse(parser: Parser) {
    return (parser as QMP.QueryModificationParser).boosters();
  }

  public exitBoosters(context: QMP.BoostersContext) {
    this.result = this.processBoosters(context);
  }

  public processBoosters(context: QMP.BoostersContext): List<GQLBooster> {
    return List(context.boost()).map((a: BoostContext) =>
      this.processBooster(a)
    );
  }

  /**
   * I'll leave the method here even though we might not need these statements inside
   */
  public processBooster(context: QMP.BoostContext): GQLBooster {
    if (context instanceof QMP.FollowsUserBoostContext) {
      return this.processFollowsUser(context);
    }
    if (context instanceof QMP.FollowedByUserBoostContext) {
      return this.processedFollowedByUser(context);
    }
    throw new Error('Unsupported BoostContext' + context);
  }

  public processFollowsUser(context: QMP.FollowsUserBoostContext) {
    const boost = this.processNumericLiteral(context.numericLiteral())
      .expression;
    const user = Number(
      this.processIriRefOrVarRef(context.iriRefOrVarRef()).expression
    );
    return new GQLUserIsFollowedBooster(user, boost);
  }

  public processedFollowedByUser(context: QMP.FollowedByUserBoostContext) {
    const boost = this.processNumericLiteral(context.numericLiteral())
      .expression;
    const user = Number(
      this.processIriRefOrVarRef(context.iriRefOrVarRef()).expression
    );
    return new GQLUserFollowsBooster(user, boost);
  }
}
