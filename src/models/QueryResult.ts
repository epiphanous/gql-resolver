import {List, OrderedMap} from 'immutable';
import sizeof = require('object-sizeof');

interface IMetaFields {
  startTime: number;
  duration: number;
  bytes: number;
  count: number;
  done: boolean;
  ok: boolean;
  errors: List<string>;
  bps: number;
}

export default class QueryResult {
  public data = OrderedMap().asMutable();
  public meta: IMetaFields = {
    startTime: new Date().getTime(),
    duration: 0,
    bytes: 0,
    count: 0,
    done: false,
    ok: true,
    errors: List<string>().asMutable(),
    bps: 0
  };

  constructor(
    startTime: number = 0,
    duration: number = 0
  ) {
    this.meta.startTime = startTime || new Date().getTime();
    this.meta.duration = duration;
    this.meta.count = 0;
    this.meta.errors = List<string>();
  }

  public bps() {
    return (this.meta.bytes / (this.meta.duration + 1)) * 1000;
  }

  public async getResult() {
    try {
      console.log('got at the end: ', JSON.stringify(this.data, null, 2));
      return this.data.toJS();
    } catch (err) {
      console.error(err);
    }
  }

  public merge(that: OrderedMap<string, any>) {
    this.data.mergeDeep(that);
  }

  public addMetadata() {
    this.meta.count = this.data.count();
    // tslint:disable-next-line
    this.meta.bytes = sizeof(this.data);
    this.meta.duration = new Date().getTime() - this.meta.startTime;
    this.meta.bps = this.bps();
    if (!this.meta.errors.isEmpty()) {
      this.meta.ok = false;
    }
    this.meta.done = true;
  }
}
