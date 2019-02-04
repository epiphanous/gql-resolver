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

  public bps() {
    return (this.bytes / (this.duration + 1)) * 1000;
  }
}
