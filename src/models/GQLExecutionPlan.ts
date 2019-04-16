import { None, Option } from 'funfix';
import { List, Map, OrderedMap } from 'immutable';
import GQLQueryBuilder from '../builders/graphql/GQLQueryBuilder';
import QueryStrategy from '../strategies/QueryStrategy';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import { GQLQueryArguments } from './GQLQueryArguments';
import { GQLField } from './GQLSelection';
import {
  GQLFieldDefinition,
  GQLInterface,
  GQLObjectType,
  GQLTypeDefinition,
} from './GQLTypeDefinition';
import QueryResult from './QueryResult';
import ResolverContext from './ResolverContext';
import QueryExecutionException from './exceptions/QueryExecutionException';

export interface IGQLExecutionPlan {
  parent: GQLExecutionPlan;
  context: ResolverContext;
  vars: Map<string, any>;
  name: string;
  alias: Option<string>;
  args: List<GQLArgument>;
  directives: List<GQLDirective>;
  fields: List<GQLField>;
  resultType: GQLTypeDefinition;
  plans: List<GQLExecutionPlan>;
  scalars: List<QueryResult>;
  objects: List<QueryResult>;
  result: QueryResult;
  allFields: List<GQLField>;
  defaultStrategy: string;

  execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult>; // Promise
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
  public resultType: GQLTypeDefinition;
  public processedArgs: GQLQueryArguments;

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
   */
  constructor(
    parent: GQLExecutionPlan,
    context: ResolverContext,
    vars: Map<string, any>,
    name: string,
    alias: Option<string>,
    args: List<GQLArgument>,
    directives: List<GQLDirective>,
    fields: List<[string, GQLField]>
  ) {
    this.parent = parent;
    this.context = context;
    this.vars = vars;
    this.name = name;
    this.alias = alias;
    this.args = args;
    this.directives = directives;

    // if (!parent) {
    //   this.dumpOut(fields);
    // }

    this.allFields = fields.map(v => v[1]);
    const resultTypes = fields.map(v => v[0]).toSet();
    if (resultTypes.size > 1) {
      const errMsg = `ambiguous result type for ${fields.toJSON()}`;
      throw new QueryExecutionException(errMsg);
    }
    const rtype = context.schema.getTypeDefinition(
      resultTypes.first('__unknown__')
    );
    if (rtype.isEmpty()) {
      const errMsg = `unknown result type for ${fields.toJSON()}`;
      throw new QueryExecutionException(errMsg);
    }
    this.resultType = rtype.get();

    this._initFields();

    this.plans = this.allFields
      .filter((f, i) => f.isObject())
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
            f.fields
          )
      );

    this.resolveDefaultStrategy();
  }

  /**
   * Make sure our fields list contains our resultType's id field(s).
   */
  private _initFields() {
    let fds = List<GQLFieldDefinition>();
    switch (this.resultType.constructor) {
      case GQLInterface:
        fds = (this.resultType as GQLInterface).idFields();
        break;
      case GQLObjectType:
        fds = (this.resultType as GQLObjectType).idFields();
        break;
      default:
        // noop
        break;
    }
    const fields = this.allFields.filter(f => !f.isObject());
    const fieldNames = fields.map(f => f.name).toSet();
    this.fields = fds
      .filter(fd => !fieldNames.contains(fd.name))
      .map(
        fd =>
          new GQLField({
            name: fd.name,
            outputType: fd.gqlType.xsdType(),
            parentType: this.resultType.name,
          })
      )
      .concat(fields);
    console.log({
      type: this.resultType.name,
      fields: this.fields.map(f => f.name).toArray(),
    });
  }

  // public dumpOut(fields: List<[string, GQLField]>, indent = '') {
  //   fields.forEach(([t, f]) => {
  //     console.log(`${indent} ${t} ${f.name}`);
  //     if (f.fields.size > 0) {
  //       this.dumpOut(f.fields, `${indent}  `);
  //     }
  //   });
  // }

  /**
   * Main entry point for this class. Resolves requested fields, then executes
   * all sub plans, then stiches the results together and returns it.
   * @return Promise<QueryResult>
   */
  public async execute(queryBuilder: GQLQueryBuilder) {
    const fieldsToMap: Map<string, string> = Map<string, string>(
      this.allFields.reduce((acc: Map<string, string>, field) => {
        acc[field.alias.value || field.name] = field.outputType;
        return acc;
      }, Map<string, string>().asMutable())
    );
    this.processedArgs = queryBuilder.processArgs(this.args, fieldsToMap);
    this.scalars = List(await Promise.all(this.resolveFields()));
    this.objects = List(await Promise.all(this.resolvePlans(queryBuilder)));
    return this.makePlanResult();
  }

  public isConnectionEdgesPlan() {
    const parent = this.parent;
    const grandParent = parent && parent.parent;
    const greatGrandParent = grandParent && grandParent.parent;
    return (
      greatGrandParent && greatGrandParent.resultType.name === 'Connection'
    );
  }

  public getSubjectIds(): List<any> {
    const fields = this.scalars.map(scalarQr => scalarQr.data);
    if (fields.isEmpty()) {
      return List<string>();
    }

    const fieldWithIdDirective = this.fields.find(field =>
      field.directives.some(directive => directive.name === 'id')
    );

    if (fieldWithIdDirective) {
      const fieldName = fieldWithIdDirective.name;
      return fields
        .get(0)
        .valueSeq()
        .reduce(
          (acc, value: OrderedMap<string, any>) =>
            acc.push(value.get(fieldName)),
          List().asMutable()
        );
    }

    const fieldsMarkedId = fields
      .get(0)
      .valueSeq()
      .filter((field: GQLField) => field.name === 'id')
      .toList();

    if (!fieldsMarkedId.isEmpty()) {
      return fieldsMarkedId;
    }

    return fields
      .get(0)
      .keySeq()
      .toList();
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
        .map(strategy => strategy.resolve())
        .valueSeq()
    );
    // );
  }

  /**
   * Executes all sub plans and returns a combined promise of their query results.
   * @returns Promise<QueryResult[]>
   */
  protected resolvePlans(queryBuilder) {
    // Promise.all<QueryResult>(
    return this.plans.map(plan => plan.execute(queryBuilder));
    // );
  }

  /**
   * Stitch together the results from our own fields as well as any sub plans.
   */
  protected makePlanResult() {
    // TODO drop the scalars & objects approach altogether?
    const mappedScalars = this.scalars.map(sc => sc.data).has(0)
      ? this.scalars.map(sc => sc.data).get(0)
      : OrderedMap({});
    const mappedObjects = this.objects.map(sc => sc.data).has(0)
      ? this.objects.map(sc => sc.data).get(0)
      : OrderedMap({});
    this.result.merge(mappedScalars as OrderedMap<string, any>);
    this.result.merge(mappedObjects as OrderedMap<string, any>);
    this.finalizeResults();
    return this.result;
  }

  /**
   * Handles 'hoisting', adds a key equal to this plan's name before its actual result data so that it can be
   * properly merged with the parent object
   */
  protected finalizeResults() {
    if (this.parent) {
      // this is to handle situations where we have an array of n objects instead of just one object
      if (this.parent.scalars.isEmpty()) {
        const newResArr = this.result.data.valueSeq().toList();
        this.result.data = OrderedMap({
          [this.alias.getOrElse(this.name)]: newResArr,
        });
      } else {
        // we want each value to be mapped to its proper parent via parent's ID, TODO will this work in all cases?
        this.result.data.map(value => {
          return OrderedMap({ [this.alias.getOrElse(this.name)]: value });
        });
      }
    } else {
      this.result.data = OrderedMap({
        [this.alias.getOrElse(this.name)]: this.result.data,
      });
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
