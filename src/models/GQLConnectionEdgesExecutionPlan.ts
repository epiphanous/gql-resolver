import { GQLExecutionPlan, QueryResult } from '.';
import { GQLQueryBuilder } from '../builders/graphql';

export class GQLConnectionEdgesExecutionPlan extends GQLExecutionPlan {
  public async execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult> {
    return super.execute(queryBuilder);
  }
}
