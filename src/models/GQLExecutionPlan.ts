import { None, Option } from 'funfix';
import { List, Map } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import { GQLField } from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from './QueryStrategy';
import ResolverContext from './ResolverContext';

export interface IGQLExecutionPlan {
  parent: GQLExecutionPlan;
  context: ResolverContext;
  vars: Map<string, any>;
  name: string;
  alias: Option<string>;
  args: List<GQLArgument>;
  directives: List<GQLDirective>;
  fields: List<GQLField>;
  resultType: string;
  plans: List<GQLExecutionPlan>;
  scalars: List<QueryResult>;
  objects: List<QueryResult>;
  result: QueryResult;
  allFields: List<GQLField>;
  defaultStrategy: string;

  execute(): QueryResult; // Promise
}

/**
 * An execution plan for a graphql query.
 */
export class GQLExecutionPlan implements IGQLExecutionPlan {
  public parent: GQLExecutionPlan;
  public context: ResolverContext;
  public vars: Map<string, any>;
  public name: string;
  public alias: Option<string>;
  public args: List<GQLArgument>;
  public directives: List<GQLDirective>;
  public fields: List<GQLField>;
  public resultType: string;

  public plans: List<GQLExecutionPlan>;
  public scalars: List<QueryResult>;
  public objects: List<QueryResult>;
  public result: QueryResult = new QueryResult();
  public allFields: List<GQLField>;
  public defaultStrategy: string;

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
   * @param resultType the output type this plan resolves
   */
  constructor(
    parent: GQLExecutionPlan,
    context: ResolverContext,
    vars: Map<string, any>,
    name: string,
    alias: Option<string>,
    args: List<GQLArgument>,
    directives: List<GQLDirective>,
    fields: List<GQLField>,
    resultType: string
  ) {
    this.parent = parent;
    this.context = context;
    this.vars = vars;
    this.name = name;
    this.alias = alias;
    this.args = args;
    this.directives = directives;
    this.allFields = fields;
    this.fields = fields.filter(f => !f.isObject());
    this.resultType = resultType;

    this.plans = fields
      .filter(f => f.isObject())
      .map(
        f =>
          new GQLExecutionPlan(
            this,
            context,
            vars,
            f.name,
            f.alias,
            f.args,
            f.directives,
            f.fields,
            f.outputType
          )
      );

    this.resolveDefaultStrategy();
  }

  /**
   * Main entry point for this class. Resolves requested fields, then executes
   * all sub plans, then stiches the results together and returns it.
   * @return Promise<QueryResult>
   */
  public execute() {
    this.result.startTime = new Date().getTime();
    this.scalars = List(this.resolveFields());
    this.objects = List(this.resolvePlans());
    this.makePlanResult();
    return this.result;
  }

  /**
   * Resolves our fields by query strategy and returns a combined promise of
   * their query results.
   * @returns Promise<QueryResult[]>
   */
  protected resolveFields() {
    // Promise.all<QueryResult>(
    return List(
      this.fieldsByStrategy()
        .map((fields, strategy) => strategy.resolve(fields, this))
        .valueSeq()
    );
    // );
  }

  /**
   * Executes all sub plans and returns a combined promise of their query results.
   * @returns Promise<QueryResult[]>
   */
  protected resolvePlans() {
    // Promise.all<QueryResult>(
    return this.plans.map(plan => plan.execute());
    // );
  }

  /**
   * Stitch together the results from our own fields as well as any sub plans.
   */
  protected makePlanResult() {
    const pr = this.result;
    const qrs = this.scalars.concat(this.objects);
    const values = qrs.flatMap(qr => qr.values);
    pr.values = this.fields.map(f => {
      const alias = f.alias || f.name;
      return values.find(v => v[0] === alias);
    });
    const reduced = qrs.reduce(
      (r, qr) => ({
        bytes: r.bytes + qr.bytes,
        count: r.count + qr.count,
        ok: r.ok && qr.ok,
        errors: r.errors.concat(qr.errors),
      }),
      { bytes: 0, count: 0, ok: true, errors: List<string>() }
    );

    pr.bytes = reduced.bytes;
    pr.count = reduced.count;
    pr.ok = reduced.ok;
    pr.errors = reduced.errors;
    pr.duration = new Date().getTime() - this.result.startTime;
    pr.done = true;
  }

  /**
   * Compute a map of fields by query strategy.
   * @returns Map<QueryStrategy, List<GQLField>>
   */
  protected fieldsByStrategy(): Map<QueryStrategy, List<GQLField>> {
    return Map(
      this.fields
        .groupBy(f => this.getStrategyFor(f))
        .mapEntries(([qs, c]) => [this.context.getStrategy(qs), c.toList()])
    );
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
    let parent = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.resolveWith(parent.directives);
      parent = parent.parent;
    }

    // if not found, search up through the schema's output types
    parent = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.context.schema
        .getTypeDefinition(parent.resultType)
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

  // determines if a query strategy is available in the context
  protected isStrategyAvailable(strategy: string) {
    return this.context.strategies.has(strategy);
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
        .getTypeDefinition(field.name)
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
      .filter(s => this.isStrategyAvailable(s));
  }
}
