import { None, Option } from 'funfix';
import {List, Map, OrderedMap} from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import { GQLField } from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from '../strategies/QueryStrategy';
import ResolverContext from './ResolverContext';
import { GQLTypeDefinition } from './GQLTypeDefinition';

export interface IGQLExecutionPlan {
  parent: GQLExecutionPlan;
  context: ResolverContext;
  vars: Map<string, any>;
  name: string;
  alias: Option<string>;
  args: List<GQLArgument>;
  directives: List<GQLDirective>;
  fields: List<GQLField>;
  resultType: Option<GQLTypeDefinition>;
  plans: List<GQLExecutionPlan>;
  scalars: List<QueryResult>;
  objects: List<QueryResult>;
  result: QueryResult;
  allFields: List<GQLField>;
  defaultStrategy: string;

  execute(): Promise<QueryResult>; // Promise
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
  public resultType: Option<GQLTypeDefinition>;

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
    this.resultType = context.schema.getTypeDefinition(resultType);

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
  public async execute() {
    this.result.startTime = new Date().getTime();
    this.scalars = List(await Promise.all(this.resolveFields()));
    this.objects = List(await Promise.all(this.resolvePlans()));
    return this.makePlanResult();
  }

  public getSubjectIds(): List<Map<string, any>> {
    const fields = this.scalars
      .map(scalarQr => scalarQr.data);
    if (fields.isEmpty()) {
      return List<Map<string, any>>();
    }
    return fields.has(0) ? fields.get(0).keySeq() : List();

    // return fields.reduce((acc, field) => {
    //   if (field[0] === 's') {
    //     return acc.push(Map({[field[0]]: field[1]}));
    //   }
    //   return acc;
    // }, List<Map<string, any>>().asMutable());
  }

  /**
   * Resolves our fields by query strategy and returns a combined promise of
   * their query results.
   * @returns Promise<QueryResult[]>
   */
  protected resolveFields() {
    // Promise.all<QueryResult>(
    return List(
      this.strategies()
        .map((strategy) => strategy.resolve())
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
    // TODO drop the scalars & objects approach altogether?
    const mappedScalars = this.scalars.map(sc => sc.data).has(0) ? this.scalars.map(sc => sc.data).get(0) : OrderedMap({});
    const mappedObjects = this.objects.map(sc => sc.data).has(0) ? this.objects.map(sc => sc.data).get(0) : OrderedMap({});
    this.result.merge(mappedScalars);
    this.result.merge(mappedObjects);
    this.finalizeResults();
    return this.result;
  }
  protected finalizeResults() {
    const newResArr = this.result.data.valueSeq().toList();
    if (this.parent) {
        if (this.parent.scalars.isEmpty()) {
          this.result.data = OrderedMap({[this.alias.getOrElse(this.name)]: newResArr});
        } else {
          // we want each value to be mapped to its proper parent via parent's ID, TODO will this work in all cases?
          this.result.data.map(value => {
            return OrderedMap({[this.alias.getOrElse(this.name)]: value});
          });
        }
    } else {
      this.result.data = OrderedMap({[this.alias.getOrElse(this.name)]: this.result.data});
    }
  }

  /**
   * Compute a list of strategies to resolve our fields.
   * @returns List<QueryStrategy>
   */
  protected strategies() {
    return this.fields
      .groupBy(f => this.getStrategyFor(f))
      .map((fields, qs) =>
        this.context.getStrategyFactory(qs).create(fields.toList(), this)
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
    let parent = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.resolveWith(parent.directives);
      parent = parent.parent;
    }

    // if not found, search up through the schema's output types
    parent = this as GQLExecutionPlan;
    while (parent && strategy.isEmpty()) {
      strategy = this.context.schema
        .getTypeDefinition(parent.resultType.get().name)
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
