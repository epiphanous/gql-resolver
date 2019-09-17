import { None } from 'funfix';
import { List, Map } from 'immutable';
import {
  GQLArgument,
  GQLDirective,
  GQLExecutionPlan,
  GQLField,
  GQLMutationExecutionPlan,
  GQLSelection,
  GQLVariable,
  GQLVariableDefinition,
  ResolverContext,
} from '.';

export type GQLOperationType = 'query' | 'mutation' | 'subscription';

export interface IGQLOperation {
  name: string;
  operationType: GQLOperationType;
  directives: List<GQLDirective>;
  variables: List<GQLVariable>;
  selections: List<GQLSelection>;
  outputType: string;
  fields: List<[string, GQLField]>;
  isSelected: boolean;

  [key: string]: any;
}

export class GQLOperation implements IGQLOperation {
  [key: string]: any;

  public name: string = '';
  public operationType: GQLOperationType = 'query';
  public outputType: string = '';
  public fields: List<[string, GQLField]> = List();
  public variables: List<GQLVariableDefinition> = List();
  public directives: List<GQLDirective> = List();
  public selections: List<GQLSelection> = List();
  public isSelected = false;

  constructor(props: Partial<IGQLOperation>) {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
    if (this.name.length === 0) {
      this.name = this.operationType;
    }
    if (this.outputType.length === 0) {
      this.outputType = {
        query: 'Query',
        mutation: 'Mutation',
        subscription: 'Subscription',
      }[this.operationType];
    }
  }

  public isMutation(): boolean {
    return this.operationType === 'mutation';
  }

  public isSubscription(): boolean {
    return this.operationType === 'subscription';
  }

  public copy(data: Partial<IGQLOperation>) {
    return new GQLOperation({ ...(this as object), ...data });
  }

  public findUnresolvedVariables(vars: Map<string, any>) {
    return this.variables.filter(vd => !vd.resolve(vars));
  }

  public getExecutionPlan(context: ResolverContext, vars: Map<string, any>) {
    if (this.isMutation()) {
      return new GQLMutationExecutionPlan(
        null,
        context,
        vars,
        this.name,
        None,
        List<GQLArgument>(),
        this.directives,
        this.fields,
        this.operationType
      );
    } else if (this.isSubscription()) {
      throw new Error('subscriptions are not supported');
    } else {
      return new GQLExecutionPlan(
        null,
        context,
        vars,
        this.name,
        None,
        List<GQLArgument>(),
        this.directives,
        this.fields,
        this.operationType
      );
    }
  }

  public select() {
    this.isSelected = true;
  }
}
