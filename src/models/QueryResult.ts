import { List } from 'immutable';

export default class QueryResult {
  public values = List<[string, any]>();
  public startTime = 0; // ms since unix epoch (Timezone: UTC)
  public duration = 0;
  public bytes = 0;
  public count = 0; // no. of records
  public done = false;
  public ok = false;
  public errors = List<string>();

  constructor(data: Partial<QueryResult> = {}) {
    this.values = data.values || List([]);
    this.startTime = data.startTime || Date.now();
    this.duration = data.duration || ( Date.now() - this.startTime );
    this.bytes = data.bytes;
    this.count = data.count || this.values.size;
    this.done = data.done || false;
    this.ok = data.ok || false;
    this.errors = data.errors && !data.errors.isEmpty() ? data.errors : List([]);
  }

  public bps() {
    return (this.bytes / (this.duration + 1)) * 1000;
  }

}
