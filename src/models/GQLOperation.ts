import {None, Option} from 'funfix-core';
import {List, Record} from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {GQLField} from './GQLField';
import {GQLSelection} from './GQLSelection';
import {GQLVariableDefinition} from './GQLVariableDefinition';

export interface IGQLOperation {
  name?: string;
  description?: string;
  operationType?: 'query' | 'mutation' | 'subscription';
  variables?: List<GQLVariableDefinition>;
  directives?: List<GQLDirective>;
  selections?: List<GQLSelection>;
  fields?: List<[string, GQLField]>;
  executionPlan?: Option<GQLExecutionPlan>;
}

export class GQLOperation extends Record<IGQLOperation>({}) {
    public someCoolMethod():string {
        return this.name + this.description;
    }
}

const op = new GQLOperation();
const name = op.name;
op.someCoolMethod()