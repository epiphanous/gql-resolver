import { Map, Set } from 'immutable';
import { Try } from 'funfix';
import {
  FieldRefContext,
  QueryModificationParser,
  SearchConditionContext,
} from '../../antlr4/generated/QueryModificationParser';
import { GQLFilter } from '../../models/GQLFilter';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';

export class GQLFilterBuilder extends GQLObjectQueryModifierBuilder {
  public validFields!: Map<string, string>;
  public validVariables!: Set<GQLVariableDefinition>;
  public vars!: Map<string, string>;
  public prefixes!: Set<string>;
  public source!: string;
  public referencedFields: Set<string> = Set<string>().asMutable();
  public result!: GQLFilter;

  public parseWith(parser: QueryModificationParser) {
    return parser.filter();
  }

  public build(parser: QueryModificationParser) {
    return Try.of(() => {
      this.parseWith(parser);

      if (this.errorCount > 0) {
        throw this.errorReport.asThrowable();
      }

      if (this.warningCount > 0) {
        this.errors.forEach(w => console.warn(w));
      }

      return this.result;
    });
  }

  public exitSearchCondition(context: SearchConditionContext): void {
    this.result = new GQLFilter(
      this.processSearchCondition(context, true),
      this.referencedFields
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
