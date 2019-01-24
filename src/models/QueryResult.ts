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

  public bps() {
    return (this.bytes / this.duration) * 1000;
  }
}
