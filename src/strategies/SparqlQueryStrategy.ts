import { List, Map } from 'immutable';
import QueryResult from '../models/QueryResult';
import QueryStrategy from './QueryStrategy';
import {RDFPrefixes} from '../models/RDFPrefixes';
import sizeof = require('object-sizeof');
import {GQLField} from '../models/GQLSelection';
import {GQLExecutionPlan} from '../models/GQLExecutionPlan';
import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';

const prefixify = (name: string) => name.replace(/_/, ':');

export default class SparqlQueryStrategy extends QueryStrategy {
  private endpoint: string;
  private fetcher: SparqlEndpointFetcher = new SparqlEndpointFetcher();

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }

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

  protected getProjections() {
    return this.fields.map<{ name: string; projection: string }>(f => ({
      name: prefixify(f.name),
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
      acc += `?s ${prefixify(argName)} '${argValue}' ${this.addConditionalPeriod(entriesLen, i)}\n`;
      return acc;
    }, '');
  }

  protected spreadProjections(projections: List<any>) {
    const projLen = projections.size;
    return projections.map((a, i) => '?s ' + a['name'] + ' ?' + a['projection'] + this.addConditionalPeriod(projLen, i))
      .join(' ');
  }

  /**
   * TODO add jubel, schema org prefixes to default RDFPrefixes list
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

  public async resolve(): Promise<QueryResult> {
    const objectType = prefixify(this.plan.resultType.get().name);
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
    let count;
    console.log(this.constructSparqlQuery(objectType, args, projections));
    return new Promise((resolve, reject) => {
      this.fetcher.fetchBindings(
        this.endpoint,
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
          /** Extracts 'value' string from each Literal{} query result so that it ends up as an List of keyval tuples
           * i.e: [{geo_lat: Literal{value: 123, type:NamedNode, language: _}, {...}}, {...}] => [['geo_lat': 123],...]]
           * @type {{}[]}
           */
          const resultArrValues: any[] = resultArr.map(entry => {
            return Object.keys(entry).reduce((acc, key) => {
              acc.push([key, entry[key]['value']]);
              return acc;
            }, List().asMutable());
          });
          const result = new QueryResult();
          result.addValues(List(resultArrValues));
          return resolve(result);
        });
      })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
}
