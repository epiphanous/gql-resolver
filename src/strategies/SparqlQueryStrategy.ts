import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import {List, Map, OrderedMap} from 'immutable';
import {GQLExecutionPlan} from '../models/GQLExecutionPlan';
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

  public constructor(fields: List<GQLField>,
                     plan: GQLExecutionPlan,
                     endpoint: string
  ) {
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
        ${ (!this.argsWithoutReservedKeywords().isEmpty()) ? `FILTER ( ${this.addFilters()} )` : ''}
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
              acc[key] = entry[key]['value'];
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

  // TODO this will be modified to enable filtering via 'filter' keyword..
  protected argsWithoutReservedKeywords() {
    const reserved = List(['limit', 'offset', 'order', 'filter', 'first', 'last', 'after', 'before', 'sortBy']);
    let argsWithoutReserved = this.args.asMutable();
    reserved.forEach(keyword => { argsWithoutReserved = argsWithoutReserved.remove(keyword); });
    return argsWithoutReserved;
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
    const entriesArray = this.argsWithoutReservedKeywords().entrySeq();
    const entriesLen = entriesArray.size;
    return entriesArray.reduce((acc, [argName, _], i) => {
      acc += `?s ${prefixify(argName)} ?${argName} ${ this.addConditionalOperator(entriesLen, i, '.')}\n`;
      return acc;
    }, '');
  }

  protected spreadProjections(projections: List<any>) {
    const projLen = projections.size;
    return projections.map((a, i) => 'optional {?s ' + a.name + ' ?' + a.projection + '}' + this.addConditionalOperator(projLen, i, '.'))
      .join(' ');
  }

  protected addFilters() {
    let filterString: string = '';
    const entriesArray = this.argsWithoutReservedKeywords().entrySeq();
    const entriesLen = entriesArray.size;
    if (!this.argsWithoutReservedKeywords().isEmpty()) {
      filterString += entriesArray.reduce((acc, [argName, value], i) => {
        // todo other operators besides = in filter: string, add ardering & pagination as separate methods
        acc += `?${argName} = '${value}' ${this.addConditionalOperator(entriesLen, i, '&&')}`;
        return acc;
      }, '');
    }
    return filterString;
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
    if (this.args.get('first')) {
      return `LIMIT ${this.args.get('first')}`;
    } else if (this.args.get('last')) {
      return `LIMIT ${this.args.get('last')}`;
    } else {
      return '';
    }
  }

  protected addOrderBy() {
    if (this.args.has('sortBy')) {
      const fieldToSortBy = this.args.get('sortBy');
      return `ORDER BY (?${fieldToSortBy})`;
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
