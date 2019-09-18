import { List, Set } from 'immutable';
import { GQLFieldDefinition, GQLVariableDefinition, QMOrderBy } from '.';
import { BuilderErrors } from '../builders';

export class GQLOrderBys {
  public qmOrderBys: List<QMOrderBy>;
  public fieldRefs: Set<GQLFieldDefinition>;
  public varRefs: Set<GQLVariableDefinition>;
  public warnings: BuilderErrors;

  constructor(
    qmOrderBys: List<QMOrderBy>,
    fieldRefs: Set<GQLFieldDefinition>,
    varRefs: Set<GQLVariableDefinition>,
    warnings: BuilderErrors
  ) {
    this.qmOrderBys = qmOrderBys;
    this.fieldRefs = fieldRefs;
    this.varRefs = varRefs;
    this.warnings = warnings;
  }
}
