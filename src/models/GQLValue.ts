import Record from 'dataclass';

export class GQLValue<T> extends Record<GQLValue<T>> {
  public value: any;
}
