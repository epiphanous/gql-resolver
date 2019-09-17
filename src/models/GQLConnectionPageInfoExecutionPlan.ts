import { OrderedMap } from 'immutable';
import { GQLConnectionExecutionPlan, GQLExecutionPlan, QueryResult } from '.';
import { GQLQueryBuilder } from '../builders/graphql';

export class GQLConnectionPageInfoExecutionPlan extends GQLExecutionPlan {
  public async execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult> {
    return new Promise(resolve => resolve(this.makePlanResult()));
  }

  protected makePlanResult(): QueryResult {
    const conn = this.connection();
    const counts = conn.getTotalCountByParentId();
    conn.getCursorsByParentId().forEach((cursors, pid) => {
      const cursorCount = cursors.size;
      const totalCount = counts.get(pid) as number;
      const om = OrderedMap<string, string | boolean>().asMutable();
      this.fields.forEach(f => {
        const name = f.name;
        const alias = f.getAliasOrName();
        switch (name) {
          case 'startCursor':
            const startCursor = cursors.first('');
            om.set(alias, startCursor);
            break;
          case 'endCursor':
            const endCursor = cursors.last('');
            om.set(alias, endCursor);
            break;
          case 'hasNextPage':
            const hasNextPage = totalCount > cursorCount; // todo direction
            om.set(alias, hasNextPage);
            break;
          case 'hasPreviousPage':
            const hasPreviousPage = totalCount > cursorCount; // todo direction
            om.set(alias, hasPreviousPage);
            break;
          default:
            break;
        }
      });
      this.result.addItem(om.asImmutable());
      this.result.finish();
    });
    return this.result;
  }

  private connection(): GQLConnectionExecutionPlan {
    return this.parent as GQLConnectionExecutionPlan;
  }
}
