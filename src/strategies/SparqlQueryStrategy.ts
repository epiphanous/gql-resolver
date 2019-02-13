import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import { List, Map } from 'immutable';
import sizeof = require('object-sizeof');
import {GQLExecutionPlan} from '../models/GQLExecutionPlan';
import {GQLField} from '../models/GQLSelection';
import QueryResult from '../models/QueryResult';
import {RDFPrefixes} from '../models/RDFPrefixes';
import QueryStrategy from './QueryStrategy';

const prefixify = (name: string) => name.replace(/_/, ':');

export default class SparqlQueryStrategy extends QueryStrategy {
  private endpoint: string;
  private fetcher: SparqlEndpointFetcher = new SparqlEndpointFetcher();

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
      SELECT ?s ${projections.map(a => `?${a.projection}`).join(' ') }
      WHERE {
        ?s a ${objectType}.
        ${ this.spreadProjections(projections)} ${args.isEmpty() ? '' : '.' }
        ${ this.spreadArguments(args) }
        ${ (!this.args.isEmpty() || this.hasProperParent()) ? `FILTER ( ${this.addFilters()} )` : ''}
      }`;
  }

  public async resolve(): Promise<QueryResult> {
    const objectType = prefixify(this.plan.resultType.get().name);
    const args = this.getArgs(this.plan);
    const projections = this.getProjections();
    console.log('Trying to execute: ', this.constructSparqlQuery(objectType, args, projections));
    console.log(
      'resolving',
      objectType,
      '{',
      projections.toJS(),
      '}',
      args.toJS()
    );
    let count;
    return new Promise((resolve, reject) => {
      this.fetcher.fetchBindings(
        this.endpoint,
        this.constructSparqlQuery(objectType, args, projections)
      ).then((stream) => {
        const resultArr: List<any> = List().asMutable();
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
          const resultArrValues: List<List<any>> = resultArr.flatMap(entry => {
            return Object.keys(entry).reduce((acc, key) => {
              acc.push([key, entry[key].value]);
              return acc;
            }, List<[string, any]>().asMutable());
          });
          const result = new QueryResult();
          result.addValues(resultArrValues); // List [reusltarrvaleus]
          return resolve(result);
        });
      })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }

  protected getProjections() {
    return this.fields.map<{ name: string; projection: string }>(f => ({
      name: prefixify(f.name),
      projection: f.alias.getOrElse(f.name),
    }));
  }

  /**
   * Determines whether the plan has an actual parent object
   * @returns {GQLExecutionPlan}
   */
  protected hasProperParent() {
    return !!this.plan.parent.getSubjectIds().get('s');
  }
  /**
   * In case of multiple SparQL statements
   */
  protected addConditionalOperator(len: number, index: number, operator: string) {
    return index === (len - 1) ? '' : operator;
  }

  protected spreadArguments(args: Map<string, any>) {
    const entriesArray = this.args.entrySeq();
    const entriesLen = entriesArray.size;
    let withArgs = entriesArray.reduce((acc, [argName, _], i) => {
      acc += `?s ${prefixify(argName)} ?${argName} ${ this.addConditionalOperator(entriesLen, i, '.')}\n`;
      return acc;
    }, '');
    if (this.hasProperParent()) {
      withArgs += '.\n';
      withArgs += `?s ${prefixify(this.plan.name)} ?${this.plan.name}`;
    }
    return withArgs;
  }

  protected spreadProjections(projections: List<any>) {
    const projLen = projections.size;
    return projections.map((a, i) => 'optional {?s ' + a.name + ' ?' + a.projection + '}' + this.addConditionalOperator(projLen, i, '.'))
      .join(' ');
  }

  // Connect this query with parent object's ID
  protected addParentFilter(parentBinding: string) {
    const parentID = this.plan.parent.getSubjectIds().get('s');
    return `?${parentBinding} = '${parentID}'`;
  }

  // todo enable for more complex filtering expressions in graphql
  protected addFilters() {
    let filterString: string = '';
    const entriesArray = this.args.entrySeq();
    const entriesLen = entriesArray.size;
    if (!this.args.isEmpty()) {
      filterString += entriesArray.reduce((acc, [argName, value], i) => {
        // todo other operators besides = in filter: string, add ardering & pagination as separate methods
        acc += `?${argName} = '${value}' ${this.addConditionalOperator(entriesLen, i, '&&')}`;
        return acc;
      }, '');
    }
    if (this.hasProperParent()) {
      filterString += this.addParentFilter(this.plan.name);
    }
    return filterString;
  }

  private normalizePrefix(prefix: string) {
    return prefix.split(']').join('');
  }
}
