import { Parser } from 'antlr4ts';
import { Option, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLObjectQueryModifierBuilder } from '.';
import {
  OrderByContext,
  OrderBysContext,
  QueryModificationParser,
} from '../../antlr4';
import {
  GQLFieldDefinition,
  GQLSortBy,
  GQLType,
  GQLVariableDefinition,
} from '../../models';

export class GQLOrderByBuilder extends GQLObjectQueryModifierBuilder {
  public result!: List<GQLSortBy>;

  constructor(
    validFields: List<GQLFieldDefinition>,
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
        throw this.errors;
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
    const fieldName = this.processFieldRef(context.fieldRef()).expression;
    const fieldDef = Option.of(
      this.validFields.find(fd => fd.name === fieldName)
    );
    const desc = Option.of(context.DESC()).nonEmpty();
    this.check(
      fieldDef.nonEmpty(),
      `invalid sort key ${fieldName}`,
      context,
      true
    );
    return new GQLSortBy(
      fieldDef.getOrElse(new GQLFieldDefinition(fieldName, GQLType.Error)),
      desc
    );
  }
}
