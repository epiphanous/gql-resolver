import { Set } from 'immutable';
import { GQLFieldDefinition, GQLVariableDefinition, QMDisjunction } from '.';
import { BuilderErrors } from '../builders';

export class GQLFilter {
  public expression: QMDisjunction;
  public fieldRefs: Set<GQLFieldDefinition>;
  public varRefs: Set<GQLVariableDefinition>;
  public warnings: BuilderErrors;

  constructor(
    expression: QMDisjunction,
    fieldRefs: Set<GQLFieldDefinition>,
    varRefs: Set<GQLVariableDefinition>,
    warnings: BuilderErrors
  ) {
    this.expression = expression;
    this.fieldRefs = fieldRefs;
    this.varRefs = varRefs;
    this.warnings = warnings;
  }
}
