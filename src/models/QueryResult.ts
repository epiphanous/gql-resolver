import { Option } from 'funfix';
import { List, OrderedMap } from 'immutable';
import sizeof from 'object-sizeof';

export type Scalar = string | number | boolean;
export type QueryValue = Scalar | List<Scalar> | QueryResult | null;

export interface IMetaFields {
  startTime: number;
  duration: number;
  bytes: number;
  count: number;
  done: boolean;
  ok: boolean;
  errors: List<string>;
  bps: number;
}

/**
 * {
 *   people(firstName:"Joe") {
 *     lastName
 *     age
 *   }
 *   hero(id:123) {
 *     firstName
 *     lastName
 *     age
 *   }
 * }
 * {
 *   "data": { // isList=false
 *     "people": [ // isList=true
 *       {
 *         "lastName": "Smith", // string
 *         "age": 17 // number
 *       },
 *       {
 *         "lastName": "Jones",
 *         "age": 23
 *       }
 *     ],
 *     "hero": { // isList=false
 *       "firstName": "Luke",
 *       "lastName": "Skywalker",
 *       "age": 27
 *     }
 *   }
 * }
 */

export class QueryResult {
  public data: List<OrderedMap<string, QueryValue>>;
  public isList: boolean;
  public meta: IMetaFields;

  constructor(
    isList: boolean = false,
    startTime: number = new Date().getTime(),
    duration: number = 0,
    data: List<OrderedMap<string, QueryValue>> = List(),
    errors: List<string> = List()
  ) {
    this.isList = isList;
    this.data = data;
    this.meta = {
      startTime,
      duration,
      bytes: 0,
      count: 0,
      done: !data.isEmpty(),
      ok: errors.isEmpty(),
      errors,
      bps: 0,
    };
  }

  public addItem(row: OrderedMap<string, QueryValue>) {
    this.data = this.data.push(row);
  }

  public addItems(rows: List<OrderedMap<string, QueryValue>>) {
    this.data = this.data.concat(rows);
  }

  public addError(message: string) {
    this.meta.errors = this.meta.errors.push(message);
  }

  public addErrors(messages: List<string>) {
    this.meta.errors = this.meta.errors.concat(messages);
  }

  public toJS(): Array<{}> | {} | null {
    const js = this.data.toJSON().map(om => {
      return om.reduce((obj, value, key) => {
        if (value instanceof QueryResult) {
          obj[key] = value.toJS();
        } else if (value instanceof List) {
          obj[key] = value.toJS();
        } else {
          obj[key] = value;
        }
        return obj;
      }, {});
    });
    return this.isList ? js : js.length > 0 ? js[0] : null;
  }

  public merge(that: QueryResult, byKeys: List<string> = List<string>()) {
    if (!that.data.isEmpty()) {
      if (this.data.isEmpty()) {
        this.data = that.data;
        this.meta = that.meta;
      } else if (byKeys.isEmpty()) {
        // if we're not merging by keys (ie, scalars only, not subplans)
        this.data = this.data
          .zipAll(that.data)
          .map<OrderedMap<string, QueryValue>>(([r1, r2]) => {
            const d1 = Option.of(r1).getOrElse(
              OrderedMap<string, QueryValue>()
            );
            const d2 = Option.of(r2).getOrElse(
              OrderedMap<string, QueryValue>()
            );
            return d1.merge(d2);
          });
        this.updateMeta();
      } else {
        // this is basically an outer join between this.data and that.data by key
        // half1 contains all the items in this.data paired with either the matching
        // item in that.data or an empty OM
        const half1 = this.data.map<
          [OrderedMap<string, QueryValue>, OrderedMap<string, QueryValue>]
        >(m1 => {
          const m2 =
            that.data.find(om =>
              byKeys.every(k => m1.has(k) && m1.get(k) === om.get(k))
            ) || OrderedMap<string, QueryValue>();
          return [m1, m2];
        });
        const half1m2 = half1
          .map(([_, m2]) => m2)
          .filter(m2 => Option.of(m2).nonEmpty());
        // half2 contains any items in that.data without a match in this.data
        const half2 = that.data
          .filterNot(m2 => half1m2.contains(m2))
          .map<
            [OrderedMap<string, QueryValue>, OrderedMap<string, QueryValue>]
          >(m2 => [OrderedMap<string, QueryValue>(), m2]);
        // merge all the half1 pairs and half2 pairs
        this.data = half1
          .concat(half2)
          .map<OrderedMap<string, QueryValue>>(([d1, d2]) => {
            return d1.merge(d2);
          });
        this.updateMeta();
      }
    }
  }

  public finish() {
    this.meta.done = true;
  }

  private updateMeta() {
    this.meta.count = this.data.count();
    this.meta.bytes = sizeof(this.data);
    const duration = new Date().getTime() - this.meta.startTime;
    this.meta.duration = Math.max(duration, 0);
    this.meta.bps = this.bps();
    this.meta.ok = this.meta.errors.isEmpty();
  }

  private bps() {
    return (this.meta.bytes / (Math.max(this.meta.duration, 0) + 1)) * 1000;
  }
}
