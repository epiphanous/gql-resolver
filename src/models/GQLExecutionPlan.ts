import { None, Option } from 'funfix';
import { List, Map } from 'immutable';
import {
  GQLArgument,
  GQLConnectionEdgesExecutionPlan,
  GQLConnectionExecutionPlan,
  GQLConnectionPageInfoExecutionPlan,
  GQLDirective,
  GQLField,
  GQLFieldDefinition,
  GQLInterface,
  GQLObjectType,
  GQLQueryArguments,
  GQLTypeDefinition,
  QueryExecutionException,
  QueryResult,
  ResolverContext,
} from '.';
import { GQLQueryBuilder } from '../builders/graphql';
import { QueryStrategy, QueryStrategyVariant } from '../strategies';

export interface IGQLExecutionPlan {
  parent: GQLExecutionPlan | null;
  context: ResolverContext;
  vars: Map<string, any>;
  name: string;
  alias: Option<string>;
  args: List<GQLArgument>;
  directives: List<GQLDirective>;
  fields: List<GQLField>;
  resultType: GQLTypeDefinition;
  plans: List<GQLExecutionPlan>;
  result: QueryResult;
  subjectIdField: GQLField;
  defaultStrategy: string;
  operationType: string;
  execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult>; // Promise
}

/**
 * An execution plan for a graphql query.
 */
export class GQLExecutionPlan implements IGQLExecutionPlan {
  public parent: GQLExecutionPlan | null;
  public context: ResolverContext;
  public vars: Map<string, any>;
  public name: string;
  public alias: Option<string>;
  public args: List<GQLArgument>;
  public directives: List<GQLDirective>;
  public fields: List<GQLField>;
  public subjectIdField: GQLField;
  public subjectIdFieldDefinition: GQLFieldDefinition;
  public resultType: GQLInterface | GQLObjectType;
  public processedArgs!: GQLQueryArguments;
  public plans: List<GQLExecutionPlan>;
  public result: QueryResult = new QueryResult();
  public defaultStrategy: string;
  public operationType: 'query' | 'mutation' | 'subscription';

  /**
   * Construct a new execution plan.
   * @param parent the parent execution plan (null at the root)
   * @param context  resolver context
   * @param vars resolved variables passed into the query
   * @param name the name of the field this plan represents
   * @param alias an optional alias for the name
   * @param args the query args for this plan
   * @param directives the directives for this plan
   * @param fields the non-object fields this plan resolves
   * @param operationType - type of the overarching operation
   */
  constructor(
    parent: GQLExecutionPlan | null,
    context: ResolverContext,
    vars: Map<string, any>,
    name: string,
    alias: Option<string>,
    args: List<GQLArgument>,
    directives: List<GQLDirective>,
    fields: List<[string, GQLField]>,
    operationType: 'query' | 'mutation' | 'subscription'
  ) {
    this.parent = parent;
    this.context = context;
    this.vars = vars;
    this.name = name;
    this.alias = alias;
    this.args = args;
    this.directives = directives;
    this.operationType = operationType;

    const resultTypes = fields.map(v => v[0]).toSet();
    if (resultTypes.size > 1) {
      throw new QueryExecutionException(
        `ambiguous result type for ${fields.toJSON()}`
      );
    }
    const rtype = context.schema.getTypeDefinition(
      resultTypes.first('__unknown__')
    );
    if (rtype.isEmpty()) {
      throw new QueryExecutionException(
        `unknown result type for ${fields.toJSON()}`
      );
    }
    this.resultType = rtype.get() as GQLInterface | GQLObjectType;

    // parse out fields
    this.fields = fields.map(v => v[1]);
    this.subjectIdFieldDefinition = this.resultType.idField();
    this.subjectIdField = Option.of(
      this.fields.find(f => f.name === this.subjectIdFieldDefinition.name)
    ).getOrElse(this.subjectIdFieldDefinition.toField(this.resultType.name));

    this.resolveDefaultStrategy();

    this.init();
  }

  public getAliasOrName() {
    return this.alias.getOrElse(this.name);
  }

  public toString() {
    return `${
      this.constructor.name
    }[${this.getAliasOrName()}:(${this.fields.map(f => f.name).join(', ')})]`;
  }

  /**
   * Returns subject ids for this plan's results. This returns a
   * {List<string>} because this plan could have multiple rows of data.
   */
  public getSubjectIds(): List<string> {
    return this.result.data.map(om => om.get(this.getSubjectIdKey()) as string);
  }

  public getSubjectIdKey(): string {
    return this.subjectIdField.getAliasOrName();
  }

  public getParentIdKey(): Option<string> {
    return Option.of(this.parent && this.parent.getSubjectIdKey());
  }

  public getInputObject(): { [key: string]: any } {
    const res: { [key: string]: any } = {}; // ugh...typescript
    return this.processedArgs.any.reduce((obj, arg) => {
      arg.value.forEach(value => {
        switch (value.constructor.name) {
          case 'Map':
            obj[arg.name] = (value as Map<string, any>).toJS();
            break;
          case 'List':
            obj[arg.name] = (value as List<any>).toJS();
            break;
          default:
            obj[arg.name] = value;
        }
      });
      return obj;
    }, res);
  }

  /**
   * Main entry point for this class. Resolves requested fields, then executes
   * all sub plans, then stiches the results together and returns it.
   * @return Promise<QueryResult>
   */
  public async execute(queryBuilder: GQLQueryBuilder) {
    this.processArgs(queryBuilder);
    this.merge(await this.resolveFields());
    this.merge(await this.resolvePlans(queryBuilder));
    return this.makePlanResult();
  }

  protected init() {
    // createFieldQueryStrategy sub-plans for fields that are objects (unless this is a mutation)
    const isConnectionPlan = this instanceof GQLConnectionExecutionPlan;
    this.plans = this.fields
      .filter((f, _) => f.isObject())
      .map(f => {
        if (/Connection$/.test(f.outputType)) {
          return new GQLConnectionExecutionPlan(
            this,
            this.context,
            this.vars,
            f.name,
            f.alias,
            f.args,
            f.directives,
            f.fields,
            'query'
          );
        } else if (isConnectionPlan && f.name === 'pageInfo') {
          return new GQLConnectionPageInfoExecutionPlan(
            this,
            this.context,
            this.vars,
            f.name,
            f.alias,
            f.args,
            f.directives,
            f.fields,
            'query'
          );
        } else if (isConnectionPlan && f.name === 'edges') {
          return new GQLConnectionEdgesExecutionPlan(
            this,
            this.context,
            this.vars,
            f.name,
            f.alias,
            f.args,
            f.directives,
            f.fields,
            'query'
          );
        } else {
          return new GQLExecutionPlan(
            this,
            this.context,
            this.vars,
            f.name,
            f.alias,
            f.args,
            f.directives,
            f.fields,
            'query'
          );
        }
      });
  }

  protected processArgs(queryBuilder: GQLQueryBuilder) {
    if (!this.processedArgs) {
      this.processedArgs = queryBuilder.processArgs(
        this.args,
        (this.resultType as GQLObjectType).fields
      );
    }
  }

  /**
   * Resolves our fields by query strategy and returns a combined promise of
   * their query results. This resolves all strategies simultaneously.
   * @returns Promise<QueryResult[]>
   */
  protected resolveFields() {
    return Promise.all(this.strategies().map(strategy => strategy.resolve()));
  }

  /**
   * Executes all sub plans and returns a combined promise of their query results.
   * @returns Promise<QueryResult[]>
   */
  protected resolvePlans(queryBuilder: GQLQueryBuilder) {
    return Promise.all(this.plans.map(plan => plan.execute(queryBuilder)));
  }

  /**
   * Combine an array of query results into the plan result.
   * @param results the query results to combine into the plan result
   */
  protected merge(results: QueryResult[]) {
    results.forEach(qr => this.result.merge(qr));
  }

  /**
   * Stitch together the results from our own fields as well as any sub plans.
   */
  protected makePlanResult() {
    return this.result; // TODO: maybe remove unneeded objects?
  }

  /**
   * Compute a list of strategies to resolve our fields.
   * @returns List<QueryStrategy>
   */
  protected strategies(
    variant: QueryStrategyVariant = 'query'
  ): List<QueryStrategy> {
    return this.fields
      .groupBy(f => this.getStrategyFor(f))
      .map((fields, qs) =>
        this.context
          .getStrategyFactory(qs)
          .create(fields.toList(), this, variant)
      )
      .valueSeq()
      .toList();
  }

  /**
   * Compute the default query strategy to be used by fields that don't have
   * one set. This is run in by the constructor when this execution plan is
   * created. It searches through the execution plan hierarchy and the schema
   * hierarchy for a query strategy directive [aka, @resolve(with="strategy")].
   *
   * The first one that is found and available in the context will be considered
   * the default strategy to resolve fields that don't have a strategy set.
   * If no available directive is found, the context default strategy becomes
   * this plan's default query strategy.
   */
  protected resolveDefaultStrategy() {
    let strategy: Option<string> = None;

    // first search up through the query
    let parent: GQLExecutionPlan | null = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.resolveWith(parent.directives);
      parent = parent.parent;
    }

    // if not found, search up through the schema's output types
    parent = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.context.schema
        .getTypeDefinition(parent.resultType.name)
        .flatMap(td => this.resolveWith(td.directives));
      parent = parent.parent;
    }

    // if not found, check the schema itself
    if (strategy.isEmpty()) {
      strategy = this.resolveWith(this.context.schema.schemaDirectives);
    }

    // if no available strategy, then use context default strategy
    this.defaultStrategy = strategy.getOrElse(this.context.defaultStrategy);
  }

  /**
   * Computes the query strategy to use for resolving the requested [[field]].
   *
   * This searches for the first available strategy in the field's query directives,
   * then in the field definition's directives, and if none are found falls back to
   * the default query strategy computed in [[resolveDefaultStrategy()]]
   *
   * @param field the field to search for a strategy
   * @returns string the returned strategy name
   */
  protected getStrategyFor(field: GQLField) {
    // try getting strategy from the selection field
    let strategy = this.resolveWith(field.directives);

    // if not found, check the field definition in the schema
    if (strategy.isEmpty()) {
      strategy = this.context.schema
        .getFieldDefinition(field.name)
        .flatMap(td => this.resolveWith(td.directives));
    }

    // if no available strategy, use the computed default
    return strategy.getOrElse(this.defaultStrategy);
  }

  /**
   * Searches through the provided directives for a @resolve(with) directive
   * indicating an available query strategy. Returns Some(strategy) if found,
   * otherwise None.
   * @param directives the directives to search
   * @returns Option<string>
   */
  protected resolveWith(directives: List<GQLDirective>) {
    return Option.of(directives.find(d => d.name === 'resolve'))
      .flatMap(d => d.arg('with'))
      .map(a => a as string)
      .filter(s => this.context.strategies.has(s));
  }

  protected getSortFields(): List<GQLFieldDefinition> {
    return this.processedArgs.sortBy.map(sf => sf.field);
  }
}
