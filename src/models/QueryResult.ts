import {List, OrderedMap} from 'immutable';

export default class QueryResult {
  public data = OrderedMap().asMutable();
  public startTime; // ms since unix epoch (Timezone: UTC)
  public duration = 0;
  public bytes = 0;
  public count = 0; // no. of records
  public done = false;
  public ok = false;
  public errors = List<string>();

  constructor(
    startTime: number = 0,
    duration: number = 0
  ) {
    this.startTime = startTime || new Date().getTime();
    this.duration = duration;
  }

  public bps() {
    return (this.bytes / (this.duration + 1)) * 1000;
  }

  // public addValue(value: [string, any]) {
  //   this.values.push(value);
  //   this.bytes += `${value.join('')}`.length;
  //   this.count++;
  // }

  // public addValues(values: List<List<[string, any]>>) {
  //   values.map(v => this.addValue(v));
  // }

  public async getResult() {
    try {
      console.log('got to resolve: ', JSON.stringify(this.data));
      return this.data.toJS();
    } catch (err) {
      console.error(err);
    }
  }

  public merge(that: OrderedMap<string, any>) {
    this.data.mergeDeep(that);
  }

  /**
   * Returns an object of resolved scalar values
   * @param scalarArray
   * @returns {{}}
   */
  public addScalars = (scalarArray) => {
    return scalarArray.reduce((acc, [fieldName, value]) => {
      acc[fieldName] = value;
      return acc;
    }, {});
  }

  /**
   * Returns the depth of an array
   * @param element
   * @param prevDepth
   * @returns {any}
   */
  public getDepth = (element, prevDepth) => {
    let depth = prevDepth;
    if (Array.isArray(element[0])) {
      depth++;
      return this.getDepth(element[0], depth);
    } else {
      return depth;
    }
  }

  // helper methods
  public isObj = val => val.includes('ox_');
  public toBaseObjName = val => val.split('ox_')[1];
}
