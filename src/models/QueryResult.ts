import { List } from 'immutable';

export default class QueryResult {
  public values = List<[string, any]>().asMutable();
  public startTime; // ms since unix epoch (Timezone: UTC)
  public duration = 0;
  public bytes = 0;
  public count = 0; // no. of records
  public done = false;
  public ok = false;
  public errors = List<string>();

  constructor(
    values: List<[string, any]> = List<[string, any]>(),
    startTime: number = 0,
    duration: number = 0
  ) {
    values.forEach(v => this.addValue(v));
    this.startTime = startTime || new Date().getTime();
    this.duration = duration;
  }

  public bps() {
    return (this.bytes / (this.duration + 1)) * 1000;
  }

  public addValue(value: [string, any]) {
    this.values.push(value);
    this.bytes += `${value.join('')}`.length;
    this.count++;
  }

  public addValues(values: List<[string, any]>) {
    values.map(v => this.addValue(v));
  }
}
