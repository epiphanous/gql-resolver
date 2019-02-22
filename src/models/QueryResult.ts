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
}
