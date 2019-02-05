import { None } from 'funfix';
import { List, Map } from 'immutable';
import { GQLArgument } from './GQLArgument';
import { GQLDirective } from './GQLDirective';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField, GQLSelection } from './GQLSelection';
import { GQLVariable } from './GQLVariable';
import { GQLVariableDefinition } from './GQLVariableDefinition';
import ResolverContext from './ResolverContext';

export interface IGQLOperation {
  [key: string]: any;
  name: string;
  // operationType: 'query' | 'mutation' | 'subscription';
  operationType: string;
  directives: List<GQLDirective>;
  variables: List<GQLVariable>;
  selections: List<GQLSelection>;
  outputType: string;
  fields: List<GQLField>;
  isSelected: boolean;
}

export class GQLOperation implements IGQLOperation {
  [key: string]: any;
  public name: string;
  // public operationType: 'query' | 'mutation' | 'subscription';
  public operationType: string;
  public outputType: string;
  public fields: List<GQLField>;
  public variables: List<GQLVariableDefinition>;
  public directives: List<GQLDirective> = List();
  public selections: List<GQLSelection> = List();
  public isSelected = false;

  constructor(props: Partial<IGQLOperation>) {
    // tslint:disable-next-line:prefer-const
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }

  public copy(data: Partial<IGQLOperation>) {
    return new GQLOperation({ ...(this as object), ...data });
  }

  public getExecutionPlan(context: ResolverContext, vars: Map<string, any>) {
    return new GQLExecutionPlan(
      null,
      context,
      vars,
      this.name,
      None,
      List<GQLArgument>(),
      this.directives,
      this.fields,
      this.outputType
    );
  }

  public select() {
    this.isSelected = true;
  }
}
