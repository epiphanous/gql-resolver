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
            const om = OrderedMap<string, OrderedMap<string, any>>(
              resultArrValues.map((row: { parentId: string; s: string }) => {
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
            result.data = om;
            result.meta.errors.push(...errors);
            result.addMetadata();
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
          console.error(err);
          reject(err);
        });
    });
  }

  protected isReservedKeyword(word: string) {
    return this.RESERVED_KEYWORDS.contains(word);
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
    // if (!this.fields.filter(field => field.name === 'totalCount').isEmpty()) {
      const parentId = countOnly ? this.plan.parent.getSubjectIds().get(0) : this.plan.getGrandParentPlan().get().getSubjectIds().get(0);
      // Probably needs some additional checks here
      // if (this.isAGeoSpatialQuery()) {
        // TODO really just a gn_nearby at the moment.. should be refactored regardless
      return `
        SELECT ${countOnly ?
          '(?s as ?parentId) (COUNT(DISTINCT ?id) AS ?totalCount)' :
          '?s ' + projections.map(a => `?${a.projection}`).join(' ')}
        WHERE {
          ?s geo:lat ?latBase.
          ?s geo:long ?longBase.
          ?link omgeo:nearby(?latBase ?longBase ${this.DEFAULT_NEARBY_RADIUS}).
          ?link j:id ?id
          ${countOnly ? '' : this.spreadProjections(projections, Some('?link'))} ${args.isEmpty() ? '' : '.'}
          FILTER( ?s = <${parentId}>)
        }
        ${countOnly ? 'GROUP BY ?s' : ''}
      `; // TODO add limits and other stuff above..
      // }
      // else {
        // todo other connection-type queries..
      // }
    // }
  }

  protected addCursorOffset() {
    if (this.args.get('before')) {
      return `${this.DEFAULT_CURSOR_LABEL} > '${this.args.get('before')}'`;
    }
    if (this.args.get('after')) {
      return `${this.DEFAULT_CURSOR_LABEL} < '${this.args.get('after')}'`;
    }
    return '';
  }

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }
}
