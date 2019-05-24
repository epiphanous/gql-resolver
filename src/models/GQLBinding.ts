import { GQLObjectQueryModifierExpression } from './GQLObjectQueryModifierExpression';

export interface IGQLBinding {
  name: string;
  expression: GQLObjectQueryModifierExpression;
}

export class GQLBinding implements IGQLBinding {
  public name: string;
  public expression: GQLObjectQueryModifierExpression;

  constructor(name: string, expression: GQLObjectQueryModifierExpression) {
    this.name = name;
    this.expression = expression;
  }
}
