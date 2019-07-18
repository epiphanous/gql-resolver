import { None, Option, Some } from 'funfix';
import { List, Map, OrderedMap } from 'immutable';
import { GQLQueryBuilder } from '../builders/graphql/GQLQueryBuilder';
import { QueryExecutionException } from './exceptions/QueryExecutionException';
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
import { QueryResult } from './QueryResult';
import { ResolverContext } from './ResolverContext';

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
  scalars: List<QueryResult>;
  objects: List<QueryResult>;
  result: QueryResult;
  allFields: List<GQLField>;
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
  public fields!: List<GQLField>;
  public resultType: GQLTypeDefinition;
  public processedArgs!: GQLQueryArguments;

  public plans!: List<GQLExecutionPlan>;
  public scalars!: List<QueryResult>;
  public objects!: List<QueryResult>;
  public result: QueryResult = new QueryResult();
  public allFields: List<GQLField>;
  public defaultStrategy!: string;
  public multipleSubjectIds: List<string> = List<string>();
  public operationType: string = '';

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
    operationType: string
  ) {
    this.parent = parent;
    this.context = context;
    this.vars = vars;
    this.name = name;
    this.alias = alias;
    this.args = args;
    this.directives = directives;
    this.operationType = operationType;

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
    this._initSubPlans(context, vars);
    this.resolveDefaultStrategy();
  }

  /**
   * Main entry point for this class. Resolves requested fields, then executes
   * all sub plans, then stiches the results together and returns it.
   * @return Promise<QueryResult>
   */
  public async execute(queryBuilder: GQLQueryBuilder) {
    const allValidFields = Map(
      (this.resultType as GQLObjectType).fields.map<[string, string]>(fd => [
        fd.name,
        fd.gqlType.name,
      ])
    );
    this.processedArgs = queryBuilder.processArgs(this.args, allValidFields);
    if (this.isConnectionEdgesPlan()) {
      this.processedArgs = this.grandParentPlan().nonEmpty()
        ? this.grandParentPlan().get().processedArgs
        : this.processedArgs;
    }
    this.scalars = List(await Promise.all(this.resolveFields()));
    this.objects = List(await Promise.all(this.resolvePlans(queryBuilder)));
    return this.makePlanResult();
  }

  public grandParentPlan(): Option<GQLExecutionPlan> {
    if (this.parent && this.parent.parent) {
      return Some(this.parent.parent);
    }
    return None;
  }

  public greatGrandParentPlan(): Option<GQLExecutionPlan> {
    return Option.of(this.grandParentPlan().value && this.grandParentPlan().value!.parent);
  }

  public isConnectionEdgesPlan() {
    const parent = this.parent;
    const grandParent = parent && parent.parent;
    const greatGrandParent = grandParent && grandParent.parent;
    return grandParent && grandParent.resultType.name === 'Connection';
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
        .get(0)!
        .valueSeq()
        .reduce(
          (acc, value: OrderedMap<string, any>) =>
            acc.push(value.get(fieldName)),
          List().asMutable()
        );
    }

    const fieldsMarkedId = fields
      .get(0)!
      .valueSeq()
      .filter((field: GQLField) => field.name === 'id')
      .toList();

    if (!fieldsMarkedId.isEmpty()) {
      return fieldsMarkedId;
    }

    return fields
      .get(0)!
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
  protected resolvePlans(queryBuilder: GQLQueryBuilder) {
    // Promise.all<QueryResult>(
    return this.plans.map(plan => plan.execute(queryBuilder));
    // );
  }

  /**
   * Stitch together the results from our own fields as well as any sub plans.
   */
  protected makePlanResult() {
    const scData: List<OrderedMap<string, any>> = this.scalars.map(
      sc => sc.data
    );
    const mappedScalars = scData.get(0) || OrderedMap<string, any>();
    const obData = this.objects.map(sc => sc.data);
    const mappedObjects = obData.get(0) || OrderedMap<string, any>();
    this.result.merge(mappedScalars);
    this.result.merge(mappedObjects);
    const scErrors = this.getScalarsErrors();
    if (scErrors.isEmpty()) {
      this.result.meta.errors = this.result.meta.errors.concat(
        ...this.getSubPlansErrors()
      );
    } else {
      this.result.meta.errors = this.result.meta.errors.concat(...scErrors);
    }
    this.finalizeResults();
    this.result.data = this.removeUnwantedFields(this.result.data);
    this.result.addMetadata();
    return this.result;
  }

  protected getScalarsErrors() {
    return this.scalars.flatMap(sc => sc.meta.errors);
  }

  protected getSubPlansErrors() {
    return this.plans.flatMap(pl => pl.result.meta.errors);
  }

  /**
   * Handles 'hoisting', adds a key equal to this plan's name before its actual result data so that it can be
   * properly merged with the parent object
   */
  protected finalizeResults() {
    if (this.isConnectionEdgesPlan()) {
      const grandParentPlanSubjectIds = this.grandParentPlan()
        .get()
        .parent!
        .getSubjectIds();
      if (grandParentPlanSubjectIds.size > 1) {
        this.multipleSubjectIds = grandParentPlanSubjectIds;
      } else {
        this.name = grandParentPlanSubjectIds.get(0);
      }
    }
    if (this.parent) {
      // this is to handle situations where we have an array of n objects instead of just one object
      if (this.parent.scalars.isEmpty()) {
        // In case we have a single subjectId
        if (this.multipleSubjectIds.isEmpty()) {
          const newResArr = this.result.data.valueSeq().toList();
          this.result.data = OrderedMap({
            [this.alias.getOrElse(this.name)]: newResArr,
          });
        } else {
          this.result.data = OrderedMap(
            this.multipleSubjectIds.map<[string, any]>(subjId => [subjId, this.result.data.get(subjId)])
          );
        }
      } else {
        // we want each value to be mapped to its proper parent via parent's ID
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
   * Filters out unwanted, residual properties that were needed for resolution.
   * @param {OrderedMap<any, any>} resultObject
   * @returns {OrderedMap<string, any>}
   */
  protected removeUnwantedFields(resultObject: OrderedMap<string, any>): OrderedMap<string, any> {
    const removeUnwanted = (obj: { [key: string]: any }) => {
      Object.keys(obj).forEach((key: string) => {
        if (['s', 'parentId'].includes(key)) {
          delete obj[key];
        } else if (obj[key] && typeof obj[key] === 'object') {
          removeUnwanted(obj[key]);
        }
        return obj;
      });
      return obj;
    };
    const resObj = resultObject.toJS();
    return OrderedMap(removeUnwanted(resObj));
  }

  /**
   * Compute a list of strategies to resolve our fields.
   * @returns List<QueryStrategy>
   */
  protected strategies() {
    return this.fields
      .groupBy(f => this.getStrategyFor(f))
      .map((fields, qs) =>
        this.context.getStrategyFactory(qs)!.create(fields.toList(), this)
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

  protected idFields(directives: List<GQLDirective>) {
    return (
      directives
        .filter(d => d.name === 'id')
        .flatMap(d =>
          d
            .arg('fields')
            .map(a => a as List<string>)
            .getOrElse(List<string>())
        )
        // todo: cleanup this nasty get ----------------------------v
        .map(t => this.context.schema.getFieldDefinition(t).get())
    );
  }

  /**
   * Make sure our fields list contains our resultType's id field(s).
   */
  private _initFields() {
    let ids = List<GQLFieldDefinition>();
    // todo we don't want the query object to include the _id scalar.
    // Should probably add all of the types alike to a conf and check based off of that
    if (
      this.resultType.name !== 'Query' &&
      this.resultType.name !== 'Edge' &&
      this.resultType.name !== 'Connection'
    ) {
      switch (this.resultType.constructor) {
        case GQLInterface:
          const i = this.resultType as GQLInterface;
          ids = i.idFields();
          if (ids.isEmpty()) {
            ids = this.idFields(i.directives);
          }
          break;
        case GQLObjectType:
          const ot = this.resultType as GQLObjectType;
          ids = ot.idFields();
          if (ids.isEmpty()) {
            ids = this.idFields(ot.directives);
          }
          break;
        default:
          // noop
          break;
      }
      if (ids.isEmpty()) {
        ids = this.idFields(this.context.schema.schemaDirectives);
      }
    }
    const fields = this.allFields.filter(f => !f.isObject());
    const fieldNames = fields.map(f => f.name).toSet();
    this.fields = ids
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

  /**
   * Creates subplans from fields that are objects.
   * Depending on the scenario (operation type), we might or might not need
   * subPlans and execPlan nesting. We'll only need it in query types (for now?).
   * @private
   */
  private _initSubPlans(context: ResolverContext, vars: Map<string, any>) {
    if (this.operationType === 'query') {
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
              f.fields,
              this.operationType
            )
        );
    } else {
      this.plans = List();
    }
  }
}
