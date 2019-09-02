import { List, OrderedMap } from 'immutable';
import Knex from 'knex';
import { snakeCase } from 'lodash';
import { GQLExecutionPlan, GQLField, QueryResult } from '../../models';
import { QueryStrategy } from '../base/QueryStrategy';
import { strict } from 'assert';

enum SqlStrategyNameContext {
  Table,
  Field,
  ForeignKey,
}

interface IRow {
  [key: string]: string | number;
}
type ResultSet = IRow[];
interface IEdgeCount {
  count: string | number;
}

const defaultNameMapper = (context: SqlStrategyNameContext, name: string) => {
  const mappedName = snakeCase(name);
  return context === SqlStrategyNameContext.ForeignKey
    ? `${mappedName}_id`
    : mappedName;
};

export class SqlQueryStrategy extends QueryStrategy {
  private dbConfig: Knex.Config;
  private knex: Knex<IRow, ResultSet>;
  private table: string;
  private projections: List<[string, string]>;
  private nameMapper: (context: SqlStrategyNameContext, name: string) => string;
  private q: Knex.QueryBuilder;
  private result!: QueryResult;

  public constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    dbConfig: Knex.Config,
    nameMapper: (
      context: SqlStrategyNameContext,
      name: string
    ) => string = defaultNameMapper
  ) {
    super(fields, plan);
    this.dbConfig = dbConfig;
    this.nameMapper = nameMapper;
    this.table = nameMapper(
      SqlStrategyNameContext.Table,
      this.plan.resultType.name
    );
    this.knex = Knex(dbConfig);
    this.q = this.knex(this.table);
    this.projections = this.fields.map<[string, string]>(f => {
      const alias = f.alias.getOrElse(f.name);
      const sqlName = nameMapper(SqlStrategyNameContext.Field, f.name);
      return [alias, sqlName];
    });
    if (this.plan.parent) {
      this.parentIdColumn = nameMapper(
        SqlStrategyNameContext.ForeignKey,
        this.plan.name
      );
      this.projections = this.projections.unshift([
        this.parentIdColumn,
        this.parentIdColumn,
      ]);
    }
    this.applyConstraints();
  }

  /**
   * main entry point
   */
  public async resolve(): Promise<QueryResult> {
    return await this.run();
  }

  /**
   * run a mutation query
   */
  private mutate(): Promise<ResultSet> {}

  /**
   * process the rows from the main query or mutation
   * @param rows the rows from the query
   */
  private process(rows: ResultSet): QueryResult {
    this.result.addItems(
      List(
        rows.map(row =>
          OrderedMap(this.projections.map(([a, c]) => [a, row[c]]))
        )
      )
    );
    this.result.finish();
    return this.result;
  }

  private edges(stats: ResultSet): Promise<QueryResult> {}

  private before() {
    return this.plan.processedArgs.before.orNull();
  }

  private after() {
    return this.plan.processedArgs.after.orNull();
  }

  private first() {
    return this.plan.processedArgs.first.orNull();
  }

  private last() {
    return this.plan.processedArgs.last.orNull();
  }

  /**
   * handle errors from running queries/mutations
   * @param error error object
   */
  private error(error: Error): QueryResult {
    console.error(error);
    this.result.addError(error.message);
    this.result.finish();
    return this.result;
  }

  private count() {
    const gbColumn = this.parentIdColumn ? this.parentIdColumn : '1';
    return this.q
      .clone()
      .columns([gbColumn, this.knex.raw('count(*) as kount')])
      .groupBy(1)
      .select();
  }

  /**
   * process the query pipeline
   */
  private run(): Promise<QueryResult> {
    this.result = new QueryResult();
    if (this.plan.isMutationPlan()) {
      return this.mutate()
        .then(this.process.bind(this))
        .catch(this.error.bind(this));
    }
    if (this.plan.isConnectionEdgesPlan()) {
      this.count()
        .then(this.edges.bind(this))
        .then(this.process.bind(this))
        .catch(this.error.bind(this));
    }
    return this.applyColumns()
      .then(this.process.bind(this))
      .catch(this.error.bind(this));
  }

  private applyColumns() {
    this.q.clearSelect();
    return this.q.select(
      this.projections.map(([a, c]) => ({ [a]: c })).toArray()
    );
  }

  private applyConstraints() {
    this.q.clearWhere();
    // apply parent constraints
    const parentIds = this.plan.getSubjectIds().toArray();
    if (parentIds.length > 0) {
      this.q.whereIn(this.parentIdColumn, parentIds);
    }
    // apply filter conditions (TODO: fix this)
    this.plan.processedArgs.filter.forEach(filterArg => {
      this.q.where(this.knex.raw(filterArg.expression.expression));
    });
  }
}
