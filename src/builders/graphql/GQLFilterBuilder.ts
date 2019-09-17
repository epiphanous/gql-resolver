import { Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLObjectQueryModifierBuilder } from '.';
import {
  FieldRefContext,
  QueryModificationParser,
  SearchConditionContext,
} from '../../antlr4';
import {
  GQLFieldDefinition,
  GQLFilter,
  GQLVariableDefinition,
} from '../../models';

export class GQLFilterBuilder extends GQLObjectQueryModifierBuilder {
  public validFields: List<GQLFieldDefinition>;
  public validVariables: Set<GQLVariableDefinition> = Set<
    GQLVariableDefinition
  >().asMutable();
  public vars: Map<string, string> = Map<string, string>().asMutable();
  public prefixes: Set<string> = Set<string>().asMutable();
  public source: string = 'query';
  public referencedFields: Set<string> = Set<string>().asMutable();
  public result!: GQLFilter;

  public parseWith(parser: QueryModificationParser) {
    return parser.filter();
  }

  public build(parser: QueryModificationParser) {
    return Try.of(() => {
      this.parseWith(parser);

      if (this.errorCount > 0) {
        throw this.errors;
      }

      return this.result;
    });
  }

  public exitSearchCondition(context: SearchConditionContext): void {
    this.result = new GQLFilter(
      this.processSearchCondition(context, true),
      this.referencedFields,
      this.errors
    );
  }

  public processFieldRef(context: FieldRefContext) {
    const fieldExpr = super.processFieldRef(context);
    if (fieldExpr.dataType !== 'error') {
      const field = fieldExpr.expression.substring(1);
      console.log(`processFieldRef: ${field}`);
      this.referencedFields.add(field);
    }
    return fieldExpr;
  }
}
