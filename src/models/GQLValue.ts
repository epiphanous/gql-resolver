import Record from 'dataclass';

export class GQLValue extends Record<GQLValue> {
  public value: any;
}
