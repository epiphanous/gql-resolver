import { List } from 'immutable';
import { GQLOperation } from './GQLOperation';

export class GQLQueryDocument {
  public operations: List<GQLOperation>;

  constructor(operations: List<GQLOperation>) {
    this.operations = operations;
  }
}
