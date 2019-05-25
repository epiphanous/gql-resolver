import { SparqlEndpointFetcher } from 'fetch-sparql-endpoint';
import { None, Option, Some } from 'funfix';
import { List, Map, OrderedMap } from 'immutable';
import { GQLAny } from '../models/GQLAny';
import { GQLExecutionPlan } from '../models/GQLExecutionPlan';
import { GQLField } from '../models/GQLSelection';
import { GQLSortBy } from '../models/GQLSortBy';
import QueryResult from '../models/QueryResult';
import { RDFPrefixes } from '../models/RDFPrefixes';
import QueryStrategy from './QueryStrategy';

const prefixify = (name: string) => name.replace(/_/, ':');

export default class SparqlQueryStrategy extends QueryStrategy {
  private endpoint: string;
  private fetcher = new SparqlEndpointFetcher();
  private DEFAULT_CURSOR_FIELD = 's:name';
  private DEFAULT_CURSOR_LABEL = '?cursor';
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

  public constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    endpoint: string
  ) {
    super(fields, plan);
    this.endpoint = endpoint;
  }

  public getPrefixes() {
    return RDFPrefixes.DEFAULT_PREFIXES.valueSeq()
      .map(
        sn =>
          `PREFIX ${sn.getPrefix()}: <${this.normalizePrefix(sn.getName())}>`
      )
      .join('\n');
  }

  /**
   * TODO add jubel, schema org prefixes to default RDFPrefixes list
   * @param {string} objectType
   * @param {Map<string, any>} args
   * @param {List<any>} projections
   * @returns {string}
   */
  public constructSparqlQuery(
    objectType: string,
    args: Map<string, any>,
    projections: List<any>
  ) {
    if (this.isResolvingConnection()) {
      return `
        ${this.getPrefixes()}
        PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>
        ${this.constructConnectionQuery(projections, args)}
      `;
    } else if (this.plan.isConnectionEdgesPlan()) {
      return `
        ${this.getPrefixes()}
        PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>
        ${this.constructConnectionQuery(projections, args, false)}
      `;
    }
    return `${this.getPrefixes()}
      SELECT ?s ${projections.map(a => `?${a.projection}`).join(' ')} ${
      this.hasProperParent() ? '?parentId' : ''
    }
      WHERE {
        ${!this.hasProperParent() ? ` ?s a ${objectType}.` : ''}
        ${this.addParentConstraints()}
        ${this.spreadProjections(projections)} ${args.isEmpty() ? '' : '.'}
        ${this.spreadArguments()}
        ${this.hasFilters() ? `FILTER ( ${this.addFilters()} )` : ''}
      }
      ${this.addSortBy()}
      ${this.addLimit()}
    `;
  }

  public async resolve(): Promise<QueryResult> {
    const result = new QueryResult();
    const objectType = prefixify(this.plan.resultType.name);
    const args = this.getArgs(this.plan);
    const projections = this.getProjections();
    const query = this.constructSparqlQuery(objectType, args, projections);
    console.log(
      'resolving',
      objectType,
      '{',
      projections.toJS(),
      '}',
      args.toJS()
    );
    return new Promise((resolve, reject) => {
        this.fetcher
          .fetchBindings(this.endpoint, query)
          .then(stream => {
            const resultArr: any[] = [];
            const errors: any[] = [];
            stream.on('data', data => {
              resultArr.push(data);
            });
            stream.on('error', error => {
                errors.push(error);
            });
            stream.on('end', () => {
              /** Extracts 'value' string from each Literal{} query result so that it ends up as an List of keyval tuples
               * i.e: [{geo_lat: Literal{value: 123, type:NamedNode, language: _},{...}},{...}]=>[['geo_lat': 123],...]]
               * @type {{}[]}
               */
              const resultArrValues: Array<{}> = resultArr.map(entry => {
                return Object.keys(entry).reduce((acc, key) => {
                  acc[key] = entry[key].value;
                  return acc;
                }, {});
              });
              const resultArrValuesPopped: Array<{}> = this.shouldPopFinalArray(resultArrValues.length) ? resultArrValues.slice(0, -1) : resultArrValues;
              const om = OrderedMap<string, OrderedMap<string, any>>(
                resultArrValuesPopped.map((row: { parentId: string; s: string, j_id: string }) => {
                  const k: string = this.hasProperParent() ? row.parentId : row.s;
                  const v = OrderedMap<any>(
                    this.fields.map(f => {
                      const key: string = f.alias.getOrElse(f.name);
                      const rowValueByKey: any =
                        row[key] ||
                        row[this.SPECIAL_PROJECTIONS.get(key)] ||
                        null;
                      return [key, rowValueByKey];
                    })
                  );
                  // to prevent lint errors..
                  const returnValue: [string, OrderedMap<string, any>] = [k, v];
                  return returnValue;
                })
              );
              if (this.plan.isConnectionEdgesPlan()) {
                const key: string = this.plan.grandParentPlan().get().getSubjectIds().get(0);
                // TODO This seems afwully hacky, is there a different approach to this?
                this.plan.grandParentPlan().get().result.data.merge(
                  OrderedMap({
                    [key]: this.addPageInfoIfNeeded(resultArrValuesPopped)
                  })
                );
              }
              result.data = om;
              result.meta.errors = List(errors);
              /**
               * TODO might want to stream this to an another service later
               */
              console.log(
                JSON.stringify(
                  {
                    query,
                    ...result.meta,
                  },
                  null,
                  2
                )
              );
              return resolve(result);
            });
          })
          .catch(err => {
            result.data = OrderedMap({});
            result.meta.errors.push(err);
            return resolve(result);
          });
    });
  }

  protected isReservedKeyword(word: string) {
    return this.RESERVED_KEYWORDS.contains(word);
  }

  /**
   * Checks whether the resulting array should be popped, because we request an additional 1 resource from the database
   * for pagination purposes.
   * @param {number} resultArrLength - num of actual results from the database
   * @returns {boolean}
   */
  protected shouldPopFinalArray(resultArrLength: number) {
    if (this.plan.isConnectionEdgesPlan()) {
      if (this.plan.processedArgs.first.nonEmpty()) {
        if (this.plan.processedArgs.first.value === resultArrLength) {
          return false;
        }
      }
      if (this.plan.processedArgs.last.nonEmpty()) {
        if (this.plan.processedArgs.last.value === resultArrLength) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  protected getProjections() {
    const specialProjKeys = this.SPECIAL_PROJECTIONS.keySeq();
    return this.fields.map<{ name: string; projection: string }>(f => {
      if (specialProjKeys.includes(f.name)) {
        const sp = this.SPECIAL_PROJECTIONS.get(f.name);
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

  /**
   * In case of multiple SparQL statements
   */
  protected addConditionalOperator(
    len: number,
    index: number,
    operator: string
  ) {
    return index === len - 1 ? '' : operator;
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

  protected spreadProjections(projections: List<any>, overriddenSubject: Option<string> = None) {
    const projLen = projections.size;
    return projections
      .map(
        (a, i) =>
          'optional {' + (overriddenSubject.isEmpty() ? '?s ' : overriddenSubject.get() + ' ') +
          a.name +
          ' ?' +
          a.projection +
          '}' +
          this.addConditionalOperator(projLen, i, '.')
      )
      .join(' ');
  }

  protected addFilters() {
    const filter = this.plan.processedArgs.filter;
    const expr = filter.value.expression;
    if (expr.expression.length) {
      return expr.expression;
    } else {
      const filterList = expr.values.get(0);
      return filterList
        .mapEntries(([key, val], index) => [
          key.expression,
          `${val.expression} ${
            index !== filterList.entrySeq().size - 1 ? '&&' : ''
          }`,
        ])
        .reduce((acc, value, key) => {
          return acc + `${key} = ${value}`;
        }, '');
    }
  }

  /**
   * Using the VALUES keyword
   */
  protected addParentConstraints() {
    if (this.hasProperParent()) {
      // todo add supp for multiple parents
      const ids = this.plan.parent.getSubjectIds().reduce((acc, sid) => {
        return (acc += `<${sid}> \n`);
      }, '');
      return `VALUES ?parentId {
        ${ids}
      }
      ?parentId ${prefixify(this.plan.name)} ?s
      `;
    } else {
      return '';
    }
  }

  protected addLimit() {
    let extra: number = 0; // for pageInfo purpose, increases the limit by one
    if (this.plan.isConnectionEdgesPlan()) {
      extra += 1;
    }
    const optFirst = this.plan.processedArgs.first;
    const optLast = this.plan.processedArgs.last;
    if (this.plan.processedArgs.first.nonEmpty()) {
      return `LIMIT ${optFirst.get() + extra}`;
    } else if (this.plan.processedArgs.last.nonEmpty()) {
      return `LIMIT ${optLast.get() + extra}`;
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

  protected isAGeoSpatialQuery() {
    const GEOSPATIAL_KEYWORDS = List(['gn_nearby']);
    // add geospatial plan names to a config, i.e. => [gn_nearby, ...];
    return GEOSPATIAL_KEYWORDS.includes(this.plan.name);
  }

  protected isResolvingConnection() {
    return this.plan.resultType.name === 'Connection';
  }

  protected constructConnectionQuery(projections: List<any>,
                                     args: Map<string, any>,
                                     countOnly: boolean = true) {
      // I'm not sure that we'll ever need to get a subjectId that's not the first one in the statement below
      const parentId = countOnly ? this.plan.parent.getSubjectIds().get(0) : this.plan.grandParentPlan().get().getSubjectIds().get(0);
      // if (this.isAGeoSpatialQuery()) {
    /**
     * TODO really just a gn_nearby at the moment.. should be refactored regardless, perhaps add a Map of corresponding statements, i.e.
     * gn_nearby -> omgeo:nearby and such
     */
      return `
        SELECT ${countOnly ?
          '?parentId (COUNT(DISTINCT ?id) AS ?totalCount)' :
          '?s ?parentId ' + projections.map(a => `?${a.projection}`).join(' ')}
        WHERE {
          ?parentId geo:lat ?latBase.
          ?parentId geo:long ?longBase.
          ?s omgeo:nearby(?latBase ?longBase ${this.DEFAULT_NEARBY_RADIUS}).
          ?s j:id ?id
          ${countOnly ? '' : this.spreadProjections(projections, Some('?s'))} ${args.isEmpty() ? '' : '.'}
          FILTER(
            ?parentId = <${parentId}> &&
            ?parentId != ?s
            ${this.addCursorOffset('?id')}
          )
        }
        ${countOnly ? 'GROUP BY ?parentId' : ''}
        ${this.addLimit()}
        ${this.addSortBy()}
      `;
      // }
      // else {
        // todo other connection-type queries..
      // }
  }

  protected addCursorOffset(cursorVar: string = null) {
    if (this.plan.processedArgs.before.nonEmpty()) {
      return `&& ${cursorVar || this.DEFAULT_CURSOR_LABEL} > '${this.plan.processedArgs.before.get()}'`;
    }
    if (this.plan.processedArgs.after.nonEmpty()) {
      return `&& ${cursorVar || this.DEFAULT_CURSOR_LABEL} < '${this.plan.processedArgs.after.get()}'`;
    }
    return '';
  }

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }

  protected addPageInfoIfNeeded(actualResults: Array<{}> = []) {
    if (this.plan.isConnectionEdgesPlan()) {
      return this.addPageInfo(actualResults);
    } else {
      return null;
    }
  }

  protected addPageInfo(actualResults: Array<{}> = Array<{}>()) {
    const actualNumberOfResults: number = actualResults && actualResults.length;
    let endCursor: string = null;
    const optFirst = this.plan.processedArgs.first;
    const optLast = this.plan.processedArgs.last;
    const optAfter = this.plan.processedArgs.after;
    const optBefore = this.plan.processedArgs.before;
    let hasNextPage: boolean = false;
    let hasPreviousPage: boolean = false;
    const requestedNumberOfResults = optFirst.getOrElse(optLast.getOrElse(0));
    const possibleNumberOfResults = requestedNumberOfResults + 1;
    if (actualNumberOfResults === possibleNumberOfResults) {
      if (optFirst.nonEmpty() || optBefore.nonEmpty()) {
        hasNextPage = true;
      }
      if (optLast.nonEmpty() || optAfter.nonEmpty()) {
        hasPreviousPage = true;
      }
    }
    if (actualNumberOfResults > 0) {
      const lastResult = actualResults.pop();
      endCursor = lastResult['j_id'];
    }
    return OrderedMap({ pageInfo: { hasNextPage, hasPreviousPage, endCursor } });
  }
}
