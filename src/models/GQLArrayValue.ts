import { List } from 'immutable';
import { GQLValue } from './GQLValue';

export class GQLArrayValue extends GQLValue<GQLArrayValue> {
  public value: List<any>;
}
