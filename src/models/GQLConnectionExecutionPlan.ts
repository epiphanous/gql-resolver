import { Option } from 'funfix';
import { List, OrderedMap } from 'immutable';
import {
  GQLExecutionPlan,
  GQLField,
  GQLInterface,
  GQLObjectType,
  QueryResult,
  QueryValue,
} from '.';
import { GQLQueryBuilder } from '../builders/graphql';
import { QueryStrategy } from '../strategies';

/**
 * someConnection(filter,sortKeys,first,after,last,before) {
 *   totalCount
 *   pageInfo {
 *     startCursor
 *     endCursor
 *     hasNextPage
 *     hasPreviousPage
 *   }
 *   edges {
 *     cursor
 *     node {
 *       fields...
 *     }
 *   }
 * }
 */
export class GQLConnectionExecutionPlan extends GQLExecutionPlan {
  private static COUNT_FIELD_MARK = 'countField';
  private static TOTAL_COUNT_FIELD = 'totalCount';
  private static CURSOR_FIELD = '__cursor';
  private totalCount: QueryResult;
  private cursors: QueryResult;
  private totalCountField: GQLField;
  private countStrategy: QueryStrategy;
  private cursorsStrategy: QueryStrategy;

  public async execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult> {
    this.processArgs(queryBuilder);
    [this.totalCount, this.cursors] = await Promise.all([
      this.countEdges(),
      this.getCursors(),
    ]);
    if (this.fields.find(f => f.name === this.totalCountField.name)) {
      this.merge([this.totalCount]);
    }
    this.merge(await this.resolvePlans(queryBuilder));
    return this.makePlanResult();
  }

  public getTotalCountByParentId(): OrderedMap<string, number> {
    const parentIdKey = this.getParentIdKey().get()!;
    return OrderedMap(
      this.totalCount.data.map<[string, number]>(om => {
        const id = om.get(parentIdKey) as string;
        const count = om.get(this.totalCountField.getAliasOrName()) as number;
        return [id, count];
      })
    );
  }

  public getCursorsByParentId(): OrderedMap<string, List<string>> {
    const data: Array<[string, string[]]> = [];
    let lastId: string;
    const parentIdKey = this.getParentIdKey().get()!;
    this.cursors.data.forEach(om => {
      const id = om.get(parentIdKey) as string;
      const cursor = om.get(GQLConnectionExecutionPlan.CURSOR_FIELD) as string;
      if (lastId !== id) {
        data.push([id, [cursor]]);
      } else {
        data[data.length - 1][1].push(cursor);
      }
      lastId = id;
    });
    return OrderedMap(
      data.map<[string, List<string>]>(([id, clist]) => [id, List(clist)])
    );
  }

  protected init() {
    super.init();
    this.totalCountField = Option.of(
      (this.resultType as GQLInterface | GQLObjectType).fields.find(
        fd =>
          fd.isMarkedField(GQLConnectionExecutionPlan.COUNT_FIELD_MARK) ||
          fd.name === GQLConnectionExecutionPlan.TOTAL_COUNT_FIELD
      )
    )
      .map(fd => fd.toField(this.resultType.name))
      .getOrElse(
        new GQLField({
          name: GQLConnectionExecutionPlan.TOTAL_COUNT_FIELD,
          outputType: 'xsd:integer',
          parentType: this.resultType.name,
        })
      );
    this.countStrategy = this.context
      .getStrategyFactory(this.getStrategyFor(this.totalCountField))
      .create(this.getCountFields(), this, 'connectionCount');

    this.cursorsStrategy = this.context
      .getStrategyFactory(
        this.getStrategyFor((this.parent as GQLExecutionPlan).fields.find(
          f => f.getAliasOrName() === this.name
        ) as GQLField)
      )
      .create(this.getCursorsFields(), this, 'query');
  }

  protected getCursorsFields(): List<GQLField> {
    return this.getSortFields().map(fd => fd.toField(this.resultType.name));
  }

  protected getCountFields(): List<GQLField> {
    return List([this.totalCountField]);
  }

  protected async countEdges(): Promise<QueryResult> {
    return this.countStrategy.resolve();
  }

  protected async getCursors(): Promise<QueryResult> {
    const result = new QueryResult();
    result.addItems(
      (await this.cursorsStrategy.resolve()).data
        .map(om => this.addCursor(om))
        .toArray()
    );
    return result;
  }

  protected addCursor(
    row: OrderedMap<string, QueryValue>
  ): OrderedMap<string, QueryValue> {
    return row.set(
      GQLConnectionExecutionPlan.CURSOR_FIELD,
      Base64.encodeURI(JSON.stringify(row.toJS()))
    );
  }
}
