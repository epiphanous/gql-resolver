import { Parser } from 'antlr4ts';
import { List, Map, Set } from 'immutable';
import {
  FieldRefContext,
  QueryModificationParser,
  SearchConditionContext,
} from '../../antlr4/generated/QueryModificationParser';
import { GQLFilter } from '../../models/GQLFilter';
import { GQLObjectQueryModifierDisjunction } from '../../models/GQLObjectQueryModifierExpression';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import GQLObjectQueryModifierBuilder from './GQLObjectQueryModifierBuilder';

export default class GQLFilterBuilder extends GQLObjectQueryModifierBuilder {
  public validFields: Map<string, string>;
  public validVariables: Set<GQLVariableDefinition>;
  public vars: Map<string, string>;
  public prefixes: Set<string>;
  public source: string;
  public referencedFields: Set<string>;
  public result: GQLFilter;

  constructor(
    validFields: Map<string, string>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, any>,
    prefixes: Set<string>,
    source: string = 'filter'
  ) {
    super(validFields, validVariables, vars, prefixes, source);
    this.referencedFields = Set<string>();
    this.result = new GQLFilter(
      new GQLObjectQueryModifierDisjunction(List(), List()),
      Set<string>()
    );
  }

  public parse(parse: Parser): any {
    return ((this.parser as unknown) as QueryModificationParser).filter();
  }

  public exitSearchCondition(context: SearchConditionContext): void {
    this.result = new GQLFilter(
      this.processSearchCondition(context, true),
      Set(this.referencedFields)
    );
  }

  public processFieldRef(context: FieldRefContext) {
    const fieldExpr = super.processFieldRef(context);
    if (fieldExpr.dataType !== 'error') {
      const field = fieldExpr.expression.substring(1);
      this.referencedFields = this.referencedFields.add(field);
    }
    return fieldExpr;
  }
}
