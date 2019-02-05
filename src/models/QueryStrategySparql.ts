import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import {List, Map} from 'immutable';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {GQLField} from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from './QueryStrategy';
import {RDFPrefixes} from "./RDFPrefixes";
import sizeof = require('object-sizeof');

export default class QueryStrategySparql extends QueryStrategy {
  public fetcher: SparqlEndpointFetcher;
  public defaultURL: string;
  constructor(isPlan) {
    super(isPlan);
    this.fetcher = new SparqlEndpointFetcher();
    this.defaultURL = 'http://localhost:7200/repositories/jubel-test';
  }

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }

  public getPrefixes() {
    return RDFPrefixes.DEFAULT_PREFIXES
      .valueSeq()
      .map(sn => `PREFIX ${sn.getPrefix()}: <${this.normalizePrefix(sn.getName())}>`)
      .join('\n');
  }

  protected getProjections(fields: List<GQLField>) {
    return fields.map<{ name: string; projection: string }>(f => ({
      name: this.prefixify(f.name),
      projection: f.alias.getOrElse(f.name),
    }));
  }

  /**
   * In case of multiple SparQL statements
   */
  protected addConditionalPeriod(len, index) {
    return index === (len - 1) ? '' : '.';
  }

  protected spreadArguments(args: Map<string, any>) {
    const entriesArray = args.entrySeq();
    const entriesLen = entriesArray.size;
    return entriesArray.reduce((acc, [argName, argValue], i) => {
      acc += `?s ${this.prefixify(argName)} '${argValue}' ${this.addConditionalPeriod(entriesLen, i)}\n`;
      return acc;
    }, '');
  }

  protected spreadProjections(projections: List<any>) {
    const projLen = projections.size;
    return projections.map((a, i) => '?s ' + a['name'] + ' ?' + a['projection'] + this.addConditionalPeriod(projLen, i))
      .join(' ');
  }

  protected prefixify(name: string) {
    return name.replace(/_/, ':');
  }

  /**
   * TODO add jubel, schema org prefixes to default RDFPrefixes list
   * TODO move & rename getPrefixes to RDFPrefixes?
   * @param {string} objectType
   * @param {Map<string, any>} args
   * @param {List<any>} projections
   * @returns {string}
   */
  public constructSparqlQuery(objectType: string, args: Map<string, any>, projections: List<any>) {
    console.log('args: ', args);
    return `${this.getPrefixes()}
      PREFIX j: <https://jubel.co/jtv/>
      PREFIX s: <http://schema.org/>
      SELECT ${projections.map(a => `?${a['projection']}`).join(' ') }
      WHERE {
        ?s a ${objectType}.
        ${this.spreadProjections(projections)} ${args.isEmpty() ? '' : '.'}
        ${ this.spreadArguments(args) }
      }`;
  }

  public async resolve(fields: List<GQLField>, plan: GQLExecutionPlan): Promise<QueryResult> {
    const objectType = this.prefixify(plan.resultType);
    const args = this.getArgs(plan);
    const projections = this.getProjections(fields);
    // console.log(
    //   'resolving',
    //   objectType,
    //   '{',
    //   projections.toJS(),
    //   '}',
    //   args.toJS()
    // );
    const startTime = Date.now();
    let count;
    console.log(this.constructSparqlQuery(objectType, args, projections));
    return new Promise((resolve, reject) => {
      this.fetcher.fetchBindings(
        this.defaultURL,
        this.constructSparqlQuery(objectType, args, projections)
      ).then((stream) => {
        const resultArr: any[] = []; // todo replace any with a proper type
        const errors: any[] = [];
        stream.on('data', data => {
          count++;
          resultArr.push(data);
        });
        stream.on('error', error => {
          errors.push(error);
        });
        stream.on('end', () => {
          /** Extracts 'value' string from each Literal{} query result so that it ends up as an array of [key,value]
           * i.e: [{geo_lat: Literal{value: 123, type:NamedNode, language: _}, {...}}, {...}] => [['geo_lat': 123],...]]
           * @type {{}[]}
           */
          const resultArrValues: any[] = resultArr.map(entry => {
            return Object.keys(entry).reduce((acc, key) => {
              acc.push([key, entry[key]['value']]);
              return acc;
            }, []);
          });
          const result = new QueryResult({
            values: List(resultArrValues),
            startTime,
            duration: Date.now() - startTime,
            count,
            bytes: sizeof(resultArr),
            done: true,
            ok: true,
            errors: List(errors)
          });
          return resolve(result);
        });
      })
        .catch(err => { console.error(err); reject(err); });
    });
  }
}
