import { Set } from 'immutable';
import { GQLObjectQueryModifierDisjunction } from '.';
import { BuilderErrors } from '../builders';

export interface IGQLFilter {
  expression: GQLObjectQueryModifierDisjunction;
  fields: Set<string>;
  warnings: BuilderErrors;
}

export class GQLFilter implements IGQLFilter {
  public expression: GQLObjectQueryModifierDisjunction;
  public fields: Set<string>;
  public warnings: BuilderErrors;

  constructor(
    expression: GQLObjectQueryModifierDisjunction,
    fields: Set<string>,
    warnings: BuilderErrors
  ) {
    this.expression = expression;
    this.fields = fields;
    this.warnings = warnings;
  }
}
