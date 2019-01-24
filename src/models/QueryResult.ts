import { List } from 'immutable';

export default class QueryResult {
  public values: List<[string, any]>;
  public startTime: number; // ms since unix epoch (Timezone: UTC)
  public duration: number;
  public bytes: number;
  public count: number; // no. of records
  public done: boolean;
  public ok: boolean;
  public errors: List<string>;

  constructor(data: Partial<QueryResult> = {}) {
    this.values = data.values || List([]);
    this.startTime = data.startTime || Date.now();
    this.duration = data.duration || ( Date.now() - this.startTime );
    this.bytes = data.bytes;
    this.count = data.count || this.values.size;
    this.done = data.done || false;
    this.ok = data.ok || false;
    this.errors = data.errors.size ? data.errors : List([]);
  }

  public bps() {
    return (this.bytes / this.duration) * 1000;
  }

}
