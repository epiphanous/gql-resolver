import { List } from 'immutable';
import { GQLObjectQueryModifierDisjunction } from './GQLObjectQueryModifierDisjunction';

interface IGQLFilter {
  expression: GQLObjectQueryModifierDisjunction;
  fields: List<string>;
}
export class GQLFilter implements IGQLFilter {
  public expression: GQLObjectQueryModifierDisjunction;
  public fields: List<string>;

  constructor(
    expression: GQLObjectQueryModifierDisjunction,
    fields: List<string>
  ) {
    this.expression = expression;
    this.fields = fields;
  }
}
