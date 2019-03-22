import { Parser } from 'antlr4ts';
import { Option, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  OrderByContext,
  OrderBysContext,
  QueryModificationParser,
} from '../../antlr4/generated/QueryModificationParser';
import { GQLOrderBy } from '../../models/GQLOrderBy';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import GQLObjectQueryModifierBuilder from './GQLObjectQueryModifierBuilder';

export default class GQLOrderByBuilder extends GQLObjectQueryModifierBuilder {
  public result: List<GQLOrderBy>;
  constructor(
    validFields: Map<string, string>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, any>,
    prefixes: Set<string>,
    source: string = 'order'
  ) {
    super(validFields, validVariables, vars, prefixes, source);
  }

  public build(parser: QueryModificationParser) {
    return Try.of(() => {
      this.parse(parser);

      if (this.errorCount > 0) {
        throw this.errorReport.asThrowable();
      }

      if (this.warningCount > 0) {
        this.errors.forEach(w => console.warn(w));
      }

      return this.result;
    });
  }

  public parse(parser: Parser) {
    return (parser as QueryModificationParser).orderBys();
  }

  public exitOrderBys(context: OrderBysContext) {
    this.result = this.processOrderBys(context);
  }

  public processOrderBys(context: OrderBysContext) {
    return List(context.orderBy()).map(a => this.processOrderBy(a));
  }

  public processOrderBy(context: OrderByContext) {
    const expression = this.processExpression(context.expression()).expression;
    const desc = Option.of(context.DESC()).nonEmpty();
    return new GQLOrderBy(expression, desc);
  }
}
