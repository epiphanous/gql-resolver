import { None, Option } from 'funfix';
import { List } from 'immutable';
import { assign } from 'lodash';
import { GQLDirective } from './GQLDirective';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField, GQLSelection } from './GQLSelection';
import { GQLVariableDefinition } from './GQLVariableDefinition';

export interface IGQLOperation {
  name: string;
  description: Option<string>;
  operationType: 'query' | 'mutation' | 'subscription';
  variables: List<GQLVariableDefinition>;
  directives: List<GQLDirective>;
  selections: List<GQLSelection>;
  fields: List<[string, GQLField]>;
  executionPlan: Option<GQLExecutionPlan>;
}

export class GQLOperation implements IGQLOperation {
  public name: string;
  public operationType: 'query' | 'mutation' | 'subscription';
  public fields: List<[string, GQLField]>;
  public executionPlan: Option<GQLExecutionPlan>;
  public description: Option<string> = None;
  public variables: List<GQLVariableDefinition> = List();
  public directives: List<GQLDirective> = List();
  public selections: List<GQLSelection> = List();

  constructor(props: Partial<IGQLOperation>) {
    // tslint:disable-next-line:prefer-const
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }

  public copy(fields: Partial<IGQLOperation>) {
    return new GQLOperation({...(this as object), ...fields});
  }
}
