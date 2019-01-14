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
    console.log(`Query ${q}, vars: ${vars}, operation:${operation.value}`);
    const builder = new GQLQueryBuilder(this.context, vars);
    return Builder.parse<GQLQueryDocument>(builder, q).flatMap(doc => {
      const firstOp: GQLOperation = doc.operations.first();
      const opName = operation.getOrElse(firstOp.name);
      console.log('OPERATION NAME: ', opName);
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
    console.log('OPERATION TYPE:', operation.value.operationType);
    switch (operation.value.operationType) {
      case 'query':
        return Try.success(Map({ opType: 'Query' }));
      case 'mutation':
        return Try.success(Map({ opType: 'Mutation' }));
      case 'subscription':
        return Try.success(Map({ opType: 'Subscription' }));
    }
    return Try.failure(new NotImplementedError('not implemented'));
  }

  // public executeQueryOperation(operation: GQLOperation) {
  //   const searchPlan = operation.executionPlan.value;
  //   const oneResult = searchPlan.execute(List(), )
  // }
}
