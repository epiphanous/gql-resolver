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
        ),
        vars
      );
    });
  }

  public executeOperation(
    operation: Option<GQLOperation>,
    vars: Map<string, any>
  ): Try<Map<string, any>> {
    if (operation.isEmpty()) {
      return Try.failure(
        new QueryExecutionException('no executable operation found in request')
      );
    }
    const op = operation.value;
    console.log('OPERATION TYPE:', op.operationType);
    op.executionPlan.get().execute();

  }

  // public executeQueryOperation(operation: GQLOperation) {
  //   const searchPlan = operation.executionPlan.value;
  //   const oneResult = searchPlan.execute(List(), )
  // }
}
