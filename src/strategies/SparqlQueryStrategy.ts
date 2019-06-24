import { SparqlEndpointFetcher } from 'fetch-sparql-endpoint';
import { None, Option, Some } from 'funfix';
import { List, Map, OrderedMap } from 'immutable';
import { Literal } from 'rdf-js';
import {
  GQLAny,
  GQLExecutionPlan,
  GQLField,
  QueryResult,
  SimpleNamespace,
} from '../models';
import { QueryStrategy } from './QueryStrategy';
import {GQLObjectQueryModifierDisjunction} from '../models/GQLObjectQueryModifierExpression';
import * as memoize from 'memoizee';

const prefixify = (name: string) => name.replace(/_/, ':');

export class SparqlQueryStrategy extends QueryStrategy {
  private endpoint: string;
  private prefixes: Map<string, SimpleNamespace>;
  private fetcher = new SparqlEndpointFetcher();
  private DEFAULT_CURSOR_LABEL = '?cursor';
  private DEFAULT_CURSOR_PREDICATE = 'j:id';
  private IGNORED_PROJECTIONS = List(['totalCount']);
  private DEFAULT_NEARBY_RADIUS = '500'; // km by default for Ontotext's GraphDB
  private SPECIAL_PROJECTIONS = OrderedMap({
    _id: 'j_id',
  });
  private RESERVED_KEYWORDS = List([
    'limit',
    'offset',
    'order',
    'first',
    'last',
    'after',
    'before',
    'sortBy',
  ]);
  private prefixesMemo!: any;
  private parentConstraintsMemo!: any;
  private lastCursorPerSubject: Map<string, string> = Map<string, string>().asMutable();

  public constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    endpoint: string,
    prefixes: Map<string, SimpleNamespace>
  ) {
    super(fields, plan);
    this.endpoint = endpoint;
    this.prefixes = prefixes;
    this.prefixesMemo = memoize(this.getPrefixes);
    this.parentConstraintsMemo = memoize(this.addParentConstraints);
  }

  public getPrefixes() {
    return this.prefixes
      .valueSeq()
      .map(
        sn =>
          `PREFIX ${sn.getPrefix()}: <${this.normalizePrefix(sn.getName())}>`
      )
      .join('\n');
  }

  /**
   * Processes page info from a pageInfo query. Should return a complete pageInfo
   * object for injection into the grandparent plan (assuming it's called from a conn edges plan).
   * Returns null if the plan isn't a connection edges plan
   * @param rows
   */
  public processPageInfo(rows: any) {
    const optFirst = this.plan.processedArgs.first;
    const optLast = this.plan.processedArgs.last;
    // Perhaps remove this V ?
    const remapped = rows[0].map((entry: any) => {
      return Object.keys(entry).reduce(
        (acc: { [key: string]: any }, key) => {
          let hasNextPage = false;
          let hasPreviousPage = false;
          let lastCursor = '';
          const lit = entry[key];
          if (key === 'parentId') {
            acc.s = lit.value;
            acc.parentId = lit.value;
            lastCursor = this.lastCursorPerSubject.get(lit.value, '');
          }
          if (key === 'totalCount') {
            const count = entry[key];
            hasNextPage = (optFirst.value && (Number(count) > (optFirst.value as number))) || false;
            hasPreviousPage = (optLast.value && (Number(count) > (optLast.value as number))) || false;
          }
          acc[key] = lit.value;
          acc.pageInfo = { hasNextPage, hasPreviousPage, lastCursor };
          return acc;
        },
      { totalCount: '', parentId: '', pageInfo: {} }
      );
    });
    return remapped;
  }

  public moreThanOneSubjectId() {
    return (this.plan.grandParentPlan().get() &&
      this.plan.grandParentPlan().get()!.parent &&
      this.plan.grandParentPlan().get()!.parent!.getSubjectIds().size > 1);
  }

  /**
   * Constructs a page info query (count only)
   */
  public constructPageInfoQuery(injectable: boolean = false, parentConstraint: string = ''): string {
    if (this.moreThanOneSubjectId() && (this.plan.processedArgs.before || this.plan.processedArgs.after) && !injectable) {
      return this.constructUnionQueryFromProvidedQueries(true);
    }
    return `
        ${!injectable ? this.prefixesMemo() : ''}
        SELECT ?parentId (COUNT(DISTINCT ?s) AS ?totalCount)
        WHERE {
          ${injectable ? `VALUES ?parentId { <${parentConstraint}> } ${this.addGeoNearbyConstraint()}` : this.parentConstraintsMemo()}
          ${this.addCursorField()}
          FILTER(
            ?parentId != ?s
            ${this.addCursorOffset(this.DEFAULT_CURSOR_LABEL)}
          )
        }
        GROUP BY ?parentId
      `;
  }

  /**
   * Constructs a data query
   */
  public constructDataQuery(
    objectType: string,
    args: Map<string, any>,
    projections: List<{ [key: string]: string }>
  ): string {
    return this.plan.isConnectionEdgesPlan() ?
      `
        ${this.prefixesMemo()}
        SELECT ${'?s ?parentId ' + projections.map(a => `?${a.projection}`).join(' ')}
        WHERE {
          ${this.parentConstraintsMemo()}
          ${this.spreadProjections(projections, Some('?s'))}
          ${this.addCursorField()}
          FILTER(
            ?parentId != ?s
            ${this.addCursorOffset()}
          )
        }
        ${this.addLimit()}
        ${this.addSortBy()}
      ` : // Not an edges plan, just a plain query
      `${this.prefixesMemo()}
        SELECT ?s ${projections.map(a => `?${a.projection}`).join(' ')} ${
        this.hasProperParent() ? '?parentId' : ''
        }
        WHERE {
          ${!this.hasProperParent() ? ` ?s a ${objectType}.` : ''}
          ${this.parentConstraintsMemo()}
          ${this.spreadProjections(projections)}
          ${this.spreadArguments()}
          ${this.hasFilters() ? `FILTER ( ${this.addFilters()} )` : ''}
        }
        ${this.addSortBy()}
        ${this.addLimit()}
      `;
  }

  /**
   * Formulates a union query based on the given query
   * At the moment, it just loops through the subjectIds
   * @param {string} pageInfo
   */
  public constructUnionQueryFromProvidedQueries(pageInfo: boolean = true) {
    return `
      ${this.prefixesMemo()}
      SELECT * {
      ${this.plan.grandParentPlan().get()!.parent!.getSubjectIds()
      .map(subjectId => `{ ${pageInfo ?
        this.constructPageInfoQuery(true, subjectId) :
        this.constructDataQuery('maybe', Map<string, any>(), List()) // TODO is there a usecase for UNIONs in our data queries?
      } }`).join(' union ')}
    }`;
  }

  /**
   * Executes a query, returns rows
   * @param {string} query
   */
  public executeQuery(query: string): Promise<any> {
    console.log('Executing query:', query);
    return new Promise((resolve) => {
      this.fetcher
        .fetchBindings(this.endpoint, query)
        .then(stream => {
          const rows: Array<{ [key: string]: Literal }> = [];
          const errors: any[] = [];
          stream.on('data', data => {
            rows.push(data);
          });
          stream.on('error', error => {
            errors.push(error);
          });
          stream.on('end', () => resolve([rows, errors]));
        });
    });
  }

  /**
   * Processes the data from a data query. Returns a QueryResult instance;
   * @param rows
   * @param errors
   */
  public processData([rows, errors]: any[]) {
    const queryResult = new QueryResult();
    queryResult.data = this.mapResultsObjectToOrderedMap(this.mapLiteralResultsToObjects(rows));
    queryResult.meta.errors = errors;
    return queryResult;
  }

  /**
   * Injects page info into the result of the grandparent plan
   * (run on a connection edges plan, inject into the connection plan's result)
   */
  public injectPageInfo(pageInfo: Array<{[key: string]: string}>) {
    pageInfo.forEach((pageInfoObject: {[key: string]: string}) => {
      this.plan.grandParentPlan().get()!.result.data.merge(OrderedMap({[pageInfoObject.s]: pageInfoObject}));
    });
  }

  // self-explanatory
  public mapLiteralResultsToObjects(results: Array<{ [key: string]: Literal }>) {
    return results.map(entry => {
      return Object.keys(entry).reduce(
        (acc: { [key: string]: string }, key) => {
          const lit = entry[key];
          acc[key] = lit.value;
          return acc;
        },
        { parentId: '', s: '', j_id: '' }
      );
    });
  }

  // [{}, {}] => OM<{[key: string] -> resVal}>
  public mapResultsObjectToOrderedMap(results: Array<{[key: string]: string}>): OrderedMap<string, any> {
    const fieldsAliases = this.fields.map(field => field.alias.getOrElse(field.name));
    const remapToOnlyRequestedFields = (listOfResultObjects: {[key: string]: any}) => listOfResultObjects.map((obj: {[key: string]: any}) => getOnlyRequestedFields(obj));
    const getOnlyRequestedFields = (singleResultObjectOrList: {[key: string]: any}): {[key: string]: any} => {
      console.log('singleResultObjectOrList', JSON.stringify(singleResultObjectOrList, null, 2));
      return Object.assign({}, ...Object.keys(singleResultObjectOrList)
        .map(key => { if (fieldsAliases.includes(key)) {
          return ({[key]: singleResultObjectOrList[key]});
        } else if (this.SPECIAL_PROJECTIONS.includes(key)) {
          // For lastCursor (pageInfo) purposes
          if (key === 'j_id') {
            this.lastCursorPerSubject.set(
              singleResultObjectOrList.parentId || singleResultObjectOrList.s,
              singleResultObjectOrList.j_id);
          }
        }}));
    };
    return List(results)
      .groupBy(row => (this.hasProperParent() || this.plan.greatGrandParentPlan().value ? row.parentId : row.s))
      .toOrderedMap()
      .map(x => List.isList(x) ?
        (x.size <= 1 ? OrderedMap(getOnlyRequestedFields(x.get(0))) : remapToOnlyRequestedFields(x)) :
        remapToOnlyRequestedFields(x));
  }

  public async resolve(): Promise<QueryResult> {
    const objectType = prefixify(this.plan.resultType.name);
    const args = this.getArgs(this.plan);
    const projections = this.getProjections();
    console.log(
      'resolving',
      objectType,
      '{',
      projections.toJS(),
      '}',
      args.toJS()
    );
    return new Promise(async (resolve, _) => {
      const results = this.processData(await this.executeQuery(this.constructDataQuery(objectType, args, projections)));
      if (this.plan.isConnectionEdgesPlan()) {
        const pageInfo = this.processPageInfo(await this.executeQuery(this.constructPageInfoQuery()));
        this.injectPageInfo(pageInfo);
      }
      resolve(results);
    });
  }

  protected isReservedKeyword(word: string) {
    return this.RESERVED_KEYWORDS.contains(word);
  }

  protected getProjections() {
    const specialProjKeys = this.SPECIAL_PROJECTIONS.keySeq();
    return this.fields
      .filter((f: GQLField) => !this.IGNORED_PROJECTIONS.contains(f.name))
      .map<{ name: string; projection: string }>(f => {
        if (specialProjKeys.includes(f.name)) {
          const sp = this.SPECIAL_PROJECTIONS.get(f.name) || '';
          return {
            name: prefixify(sp),
            projection: sp,
          };
        }
        return {
          name: prefixify(f.name),
          projection: f.alias.getOrElse(f.name),
        };
      });
  }

  /**
   * Determines whether the plan has an actual parent object
   * @returns {GQLExecutionPlan}
   */
  protected hasProperParent() {
    return this.plan.parent && !this.plan.parent.getSubjectIds().isEmpty();
  }

  protected spreadArguments() {
    return this.plan.processedArgs.any.reduce(
      (acc: string, anyArgument: GQLAny) => {
        if (!this.isReservedKeyword(anyArgument.name)) {
          return (
            acc +
            `?s ${prefixify(anyArgument.name)} ${
              typeof anyArgument.value.value === 'string'
                ? `'${anyArgument.value.value}'`
                : anyArgument.value.value
            }`
          );
        }
        return acc;
      },
      ''
    );
  }

  protected spreadProjections(
    projections: List<any>,
    overriddenSubject: Option<string> = None
  ) {
    const projLen = projections.size;
    return projections
      .map(
        (a, i) =>
          'optional {' +
          (overriddenSubject.isEmpty()
            ? '?s '
            : overriddenSubject.get() + ' ') +
          a.name +
          ' ?' +
          a.projection +
          '}'
      )
      .join('.');
  }

  protected addFilters() {
    return this.plan.processedArgs.filter
      .map(filter => {
        const expr = filter.expression;
        const separator = expr instanceof GQLObjectQueryModifierDisjunction ? '|| ' : '&& ';
        if (expr.expression.length) {
          return expr.expression;
        } else {
          return expr.values
            .map(filterMap => {
              const lastFilterIndex = expr.values.size - 1;
              return filterMap
                .keySeq()
                .map(key => `${key.expression} = ${filterMap.get(key)!.expression}`)
                .get(0);
            })
            .join(separator);
        }
      })
      .getOrElse('');
  }

  protected addGeoNearbyConstraint() {
    return `?parentId geo:lat ?latBase.
          ?parentId geo:long ?longBase.
          ?s omgeo:nearby(?latBase ?longBase ${this.DEFAULT_NEARBY_RADIUS}).`;
  }

  /**
   * Using the VALUES keyword
   */
  protected addParentConstraints() {
    if (this.hasProperParent() || (this.plan.grandParentPlan().value && this.plan.grandParentPlan()!.value!.name === 'gn_nearby')) {
      const planName = this.plan.name;
      const ids: string = this.plan.isConnectionEdgesPlan() ?
        this.plan.grandParentPlan().get()!.parent!.getSubjectIds().reduce((acc, sid) => {
          return (acc += `<${sid}> \n`);
        }, '') :
        this.plan.parent!.getSubjectIds().reduce((acc, sid) => {
          return (acc += `<${sid}> \n`);
        }, '');
      const parentConstraint = this.plan.grandParentPlan().get()!.name === 'gn_nearby' ?
         this.addGeoNearbyConstraint() :
        `?parentId ${this.plan.isConnectionEdgesPlan() ?
          prefixify(this.plan.grandParentPlan().get().name) :
          prefixify(planName)} ?s`;
      return `VALUES ?parentId {
        ${ids}
      }
      ${parentConstraint}
      `;
    } else {
      return '';
    }
  }

  protected addLimit() {
    const optFirst = this.plan.processedArgs.first;
    const optLast = this.plan.processedArgs.last;
    if (this.plan.processedArgs.first.nonEmpty()) {
      return `LIMIT ${optFirst.get()}`;
    } else if (this.plan.processedArgs.last.nonEmpty()) {
      return `LIMIT ${optLast.get()}`;
    } else {
      return '';
    }
  }

  protected hasFilters() {
    return !this.plan.processedArgs.filter.isEmpty();
  }

  protected addSortBy() {
    /**
     * @type {GQLSortBy}
     */
    if (!this.plan.processedArgs.sortBy.isEmpty()) {
      return (
        'ORDER BY ' +
        this.plan.processedArgs.sortBy.map(s => s.toSparqlString()).join(' ')
      );
    }
    return '';
  }

  /**
   * TODO: Method's not finished, should be expanded & implemented in
   * case we need more geospatial-type queries.
   * @returns {boolean}
   */
  protected isAGeoSpatialQuery() {
    const GEOSPATIAL_KEYWORDS = List(['gn_nearby']);
    // add geospatial plan names to a config, i.e. => [gn_nearby, ...];
    return GEOSPATIAL_KEYWORDS.includes(this.plan.name);
  }

  protected isResolvingConnection() {
    return this.plan.resultType.name === 'Connection';
  }

  protected addCursorField(subjectToBindTo: string = '?s') {
    return `${subjectToBindTo} ${this.DEFAULT_CURSOR_PREDICATE} ${this.DEFAULT_CURSOR_LABEL}`;
  }

  protected addCursorOffset(cursorVar: string = this.DEFAULT_CURSOR_LABEL) {
    if (this.plan.processedArgs.before.nonEmpty()) {
      return `&& ${cursorVar} < '${this.plan.processedArgs.before.get()}'`;
    }
    if (this.plan.processedArgs.after.nonEmpty()) {
      return `&& ${cursorVar} > '${this.plan.processedArgs.after.get()}'`;
    }
    return '';
  }

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }
}
