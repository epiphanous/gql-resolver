import { Parser } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree';
import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  QueryModificationParser,
  TransformContext,
  TransformsContext,
} from '../../antlr4/generated/QueryModificationParser';
import { GQLTransform } from '../../models/GQLTransform';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';

export class GQLTransformsBuilder extends GQLObjectQueryModifierBuilder {
  public result!: List<GQLTransform>;

  constructor(prefixes: Set<string>, source: string = 'transforms') {
    super(Map(), Set<GQLVariableDefinition>(), Map(), prefixes, source);
  }

  public parse(parser: Parser) {
    return (parser as QueryModificationParser).transforms();
  }

  public exitTransforms(context: TransformsContext) {
    this.result = this.processTransforms(context);
  }

  public processTransforms(context: TransformsContext) {
    return List(context.transform()).map(a => this.processTransform(a));
  }

  public processTransform(context: TransformContext) {
    if (!context || !context.children || context.children.length === 0) {
      throw new Error('No children in context' + context);
    } else {
      const func = this.textOf(context.children[0] as TerminalNode);
      const iriRef = Option.of(context.iriRefOrVarRef())
        .map(a => this.processIriRefOrVarRef(a))
        .map(e => e.expression as string);
      return new GQLTransform(func, iriRef);
    }
  }
}
