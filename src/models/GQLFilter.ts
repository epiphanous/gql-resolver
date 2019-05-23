import { Set } from 'immutable';
import { GQLObjectQueryModifierDisjunction } from './GQLObjectQueryModifierExpression';

interface IGQLFilter {
  expression: GQLObjectQueryModifierDisjunction;
  fields: Set<string>;
}

export class GQLFilter implements IGQLFilter {
  public expression: GQLObjectQueryModifierDisjunction;
  public fields: Set<string>;

  constructor(
    expression: GQLObjectQueryModifierDisjunction,
    fields: Set<string>
  ) {
    this.expression = expression;
    this.fields = fields;
  }
}
