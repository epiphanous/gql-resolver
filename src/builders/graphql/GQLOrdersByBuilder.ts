import { Try } from 'funfix';
import { GQLQueryModifiersBuilder } from '.';
import { OrderBysContext, QueryModificationParser } from '../../antlr4';
import { GQLOrderBys } from '../../models';

export class GQLOrdersByBuilder extends GQLQueryModifiersBuilder {
  public result: GQLOrderBys;

  public parseWith(parser: QueryModificationParser) {
    return parser.orderBys();
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

  public exitOrderBys(context: OrderBysContext) {
    this.result = new GQLOrderBys(
      this.processOrderBys(context),
      this.fieldRefs,
      this.varRefs,
      this.errors
    );
  }
}
