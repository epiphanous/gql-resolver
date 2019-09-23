import {
  QMBooleanLiteral,
  QMComparisonPredicate,
  QMConjunction,
  QMDecimalLiteral,
  QMDisjunction,
  QMDoubleLiteral,
  QMFactorExpression,
  QMFieldRef,
  QMFunctionCall,
  QMInPredicate,
  QMIntegerLiteral,
  QMInVarPredicate,
  QMIriRef,
  QMOptionalNegation,
  QMOrderBy,
  QMParenExpression,
  QMParenPredicate,
  QMStringLiteral,
  QMTermExpression,
  QMUnaryExpression,
  QMVarRef,
  QueryValue,
} from '../../models';
import { QMRenderer } from '../abstract/QMRenderer';
import { prefixify, variablify } from './SparqlUtils';

export class SparqlQMRenderer extends QMRenderer {
  protected renderInVarPredicate(qm: QMInVarPredicate): string {
    qm.varRef.
    return '';
  }

  protected renderIriRef(qm: QMIriRef): string {
    return `<${qm.iri}>`;
  }
}
