import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import {List, Map, OrderedMap} from 'immutable';
import {GQLAnyArgument} from '../models/GQLArgument';
import {GQLExecutionPlan} from '../models/GQLExecutionPlan';
import {GQLOrderBy} from '../models/GQLOrderBy';
import {GQLField} from '../models/GQLSelection';
import QueryResult from '../models/QueryResult';
import {RDFPrefixes} from '../models/RDFPrefixes';
import QueryStrategy from './QueryStrategy';

const prefixify = (name: string) => name.replace(/_/, ':');

export default class SparqlQueryStrategy extends QueryStrategy {
  private endpoint: string;
  private fetcher = new SparqlEndpointFetcher();
  private DEFAULT_CURSOR_FIELD = 's:name';
  private DEFAULT_CURSOR_LABEL = '?cursor';
  private SPECIAL_PROJECTIONS = OrderedMap({
    '_id': 'j_id'
  });
  private RESERVED_KEYWORDS = List(['limit', 'offset', 'order', 'first', 'last', 'after', 'before', 'sortBy']);

  public constructor(fields: List<GQLField>,
                     plan: GQLExecutionPlan,
                     endpoint: string) {
    super(fields, plan);
    this.endpoint = endpoint;
  }

  public getPrefixes() {
    return RDFPrefixes.DEFAULT_PREFIXES
      .valueSeq()
      .map(sn => `PREFIX ${sn.getPrefix()}: <${this.normalizePrefix(sn.getName())}>`)
      .join('\n');
  }

  /**
   * TODO add jubel, schema org prefixes to default RDFPrefixes list
   * @param {string} objectType
   * @param {Map<string, any>} args
   * @param {List<any>} projections
   * @returns {string}
   */
  public constructSparqlQuery(objectType: string, args: Map<string, any>, projections: List<any>) {
    return `${this.getPrefixes()}
      PREFIX j: <https://jubel.co/jtv/>
      PREFIX s: <http://schema.org/>
      SELECT ?s ${projections.map(a => `?${a.projection}`).join(' ') } ${this.hasProperParent() ? '?parentId' : ''}
      WHERE {
        ${ !this.hasProperParent() ? ` ?s a ${objectType}.` : '' }
        ${ this.addParentConstraints() }
        ${ this.spreadProjections(projections)} ${args.isEmpty() ? '' : '.' }
        ${ this.spreadArguments() }
        ${ this.hasFilters() ? `FILTER ( ${this.addFilters()} )` : ''}
      }
      ${ this.addOrderBy() }
      ${ this.addLimit() }
    `;
  }

  public async resolve(): Promise<QueryResult> {
    const result = new QueryResult();
    const objectType = prefixify(this.plan.resultType.get().name);
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
      this.fetcher.fetchBindings(
        this.endpoint,
        query
      ).then((stream) => {
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
           * i.e: [{geo_lat: Literal{value: 123, type:NamedNode, language: _}, {...}}, {...}] => [['geo_lat': 123],...]]
           * @type {{}[]}
           */
          const resultArrValues: Array<{}> = resultArr.map(entry => {
            return Object.keys(entry).reduce((acc, key) => {
              acc[key] = entry[key].value;
              return acc;
            }, {});
          });
          const om = OrderedMap<string, OrderedMap<string, any>>(
            resultArrValues.map((row: { parentId: string, s: string }) => {
                const k: string = this.hasProperParent() ? row.parentId : row.s;
                const v = OrderedMap<any>(this.fields.map(f => {
                  const key: string = f.alias.getOrElse(f.name);
                  const rowValueByKey: any = row[key] || row[this.SPECIAL_PROJECTIONS.get(key)] || null;
                  return [key, rowValueByKey];
                }));
                // to prevent lint errors..
                const returnValue: [string, OrderedMap<string, any>] = [k, v];
                return returnValue;
              }
            )
          );
          result.data = om;
          result.meta.errors.push(...errors);
          result.addMetadata();
          /**
           * TODO might want to stream this to an another service later
           */
          console.log(JSON.stringify({
            query,
            ...result.meta
          }, null, 2));
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
        return ({
          name: prefixify(sp),
          projection: sp
        });
      }
      return ({
        name: prefixify(f.name),
        projection: f.alias.getOrElse(f.name),
      });
    });
  }

  /**
   * Determines whether the plan has an actual parent object
   * @returns {GQLExecutionPlan}
   */
  protected hasProperParent() {
    return !this.plan.parent.getSubjectIds().isEmpty();
  }

  /**
   * In case of multiple SparQL statements
   */
  protected addConditionalOperator(len: number, index: number, operator: string) {
    return index === (len - 1) ? '' : operator;
  }

  protected spreadArguments() {
    return this.plan.processedArgs.any.reduce((acc: string, anyArgument: GQLAnyArgument) => {
      if (!this.isReservedKeyword(anyArgument.name)) {
        return acc + `?s ${prefixify(anyArgument.name)} ${typeof anyArgument.value.value === 'string' ? `'${anyArgument.value.value}'` : anyArgument.value.value}`;
      }
      return acc;
    }, '');
  }

  protected spreadProjections(projections: List<any>) {
    const projLen = projections.size;
    return projections.map((a, i) => 'optional {?s ' + a.name + ' ?' + a.projection + '}' + this.addConditionalOperator(projLen, i, '.'))
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
        .mapEntries(([key, val], index) =>
          [key.expression, `${val.expression} ${index !== filterList.entrySeq().size - 1 ? '&&' : ''}`])
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
        return acc += `<${sid}> \n`;
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
    const anyArgs = this.plan.processedArgs.any;
    const maybeFirst = anyArgs.find(arg => arg.name === 'first');
    const maybeLast = anyArgs.find(arg => arg.name === 'last');
    if (maybeFirst) {
      return `LIMIT ${maybeFirst.value.get()}`;
    } else if (maybeLast) {
      return `LIMIT ${maybeLast.value.get()}`;
    } else {
      return '';
    }
  }

  protected hasFilters() {
    return !this.plan.processedArgs.filter.isEmpty();
  }

  protected addOrderBy() {
    /**
     * TODO will this list always have a single el ?
     * @type {GQLOrderBy}
     */
    if (!this.plan.processedArgs.order.isEmpty()) {
      return 'ORDER BY ' + this.plan.processedArgs.order
        .get(0)
        .toSparQLString();
    }
    return '';
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
