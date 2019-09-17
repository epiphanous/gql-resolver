import { GQLQueryBuilder } from '../builders/graphql';
import { GQLExecutionPlan, QueryResult } from '../models';

export class GQLMutationExecutionPlan extends GQLExecutionPlan {
  public mutationResult: QueryResult = new QueryResult();

  public async execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult> {
    this.processArgs(queryBuilder);
    await this.resolveMutations();
    return super.execute(queryBuilder);
  }

  /**
   * Resolve our mutations by their associated query strategies and returns
   * the results. Note that this resolves multiple mutations in series (ie,
   * each mutation is resolved synchronously before moving on to the next).
   * @returns Promise<QueryResult[]>
   */
  protected async resolveMutations() {
    // const empty: QueryResult[] = [];
    // return this.strategies('mutation')
    //   .toArray()
    //   .reduce(
    //     (p, strategy) =>
    //       p.then(async results => {
    //         const qr = await strategy.resolve();
    //         results.push(qr);
    //         return results;
    //       }),
    //     Promise.resolve(empty)
    //   );

    for (const strategy of this.strategies('mutation').toArray()) {
      this.mutationResult.merge(await strategy.resolve());
    }
  }

  protected makePlanResult(): QueryResult {
    // todo: maybe combine mutationResult with result...
    return this.result;
  }
}
