import { None, NotImplementedError, Option, Try } from 'funfix';
import { Map } from 'immutable';
import Builder from './builders/Builder';
import GQLQueryBuilder from './builders/graphql/GQLQueryBuilder';
import QueryExecutionException from './models/exceptions/QueryExecutionException';
import { GQLOperation } from './models/GQLOperation';
import { GQLQueryDocument } from './models/GQLQueryDocument';
import ResolverContext from './models/ResolverContext';

export class Resolver {
  public context: ResolverContext;

  constructor(context: ResolverContext) {
    this.context = context;
  }

  public resolve(
    q: string,
    vars: Map<string, any> = Map<string, any>(),
    operation: Option<string> = None
  ): Try<Map<string, any>> {
    const builder = new GQLQueryBuilder(this.context, vars);
    return Builder.parse<GQLQueryDocument>(builder, q).flatMap(doc => {
      const opName = operation.getOrElse(doc.operations.first());
      return this.executeOperation(
        Option.of(
          doc.operations.find(
            o => o.name === opName && o.executionPlan.nonEmpty()
          )
        )
      );
    });
  }

  public executeOperation(
    operation: Option<GQLOperation>
  ): Try<Map<string, any>> {
    if (operation.isEmpty()) {
      return Try.failure(
        new QueryExecutionException('no executable operation found in request')
      );
    }
    return Try.failure(new NotImplementedError('not implemented'));
  }
}
