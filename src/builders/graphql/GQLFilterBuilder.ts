import { Try } from 'funfix';
import { GQLQueryModifiersBuilder } from '.';
import { QueryModificationParser, SearchConditionContext } from '../../antlr4';
import { GQLFilter } from '../../models';

export class GQLFilterBuilder extends GQLQueryModifiersBuilder<GQLFilter> {
  public result: GQLFilter;

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
      this.processSearchCondition(context),
      this.fieldRefs,
      this.varRefs,
      this.errors
    );
  }
}
