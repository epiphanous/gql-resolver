import { hasIn, List } from 'immutable';
import {
  GQLBooleanValue, GQLEnumValue, GQLFloatValue,
  QMBooleanLiteral,
  QMComparisonOperator,
  QMComparisonPredicate,
  QMConjunction,
  QMDecimalLiteral,
  QMDisjunction,
  QMDoubleLiteral,
  QMExpression,
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
  QMProductOperator,
  QMStringLiteral,
  QMTermExpression,
  QMTermOperator,
  QMUnaryExpression,
  QMVarRef,
  QueryModifiers,
} from '../../models';

export abstract class QMRenderer {
  protected render(qm: QueryModifiers) {
    if (qm instanceof QMBooleanLiteral) {
      return this.renderBooleanLiteral(qm);
    } else if (qm instanceof QMComparisonPredicate) {
      return this.renderComparisonPredicate(qm);
    } else if (qm instanceof QMConjunction) {
      return this.renderConjunction(qm);
    } else if (qm instanceof QMDecimalLiteral) {
      return this.renderDecimalLiteral(qm);
    } else if (qm instanceof QMDisjunction) {
      return this.renderDisjunction(qm);
    } else if (qm instanceof QMDoubleLiteral) {
      return this.renderDoubleLiteral(qm);
    } else if (qm instanceof QMFactorExpression) {
      return this.renderFactorExpression(qm);
    } else if (qm instanceof QMFieldRef) {
      return this.renderFieldRef(qm);
    } else if (qm instanceof QMFunctionCall) {
      return this.renderFunctionCall(qm);
    } else if (qm instanceof QMInPredicate) {
      return this.renderInPredicate(qm);
    } else if (qm instanceof QMIntegerLiteral) {
      return this.renderIntegerLiteral(qm);
    } else if (qm instanceof QMInVarPredicate) {
      return this.renderInVarPredicate(qm);
    } else if (qm instanceof QMIriRef) {
      return this.renderIriRef(qm);
    } else if (qm instanceof QMOptionalNegation) {
      return this.renderOptionalNegation(qm);
    } else if (qm instanceof QMOrderBy) {
      return this.renderOrderBy(qm);
    } else if (qm instanceof QMParenExpression) {
      return this.renderParenExpression(qm);
    } else if (qm instanceof QMParenPredicate) {
      return this.renderParenPredicate(qm);
    } else if (qm instanceof QMStringLiteral) {
      return this.renderStringLiteral(qm);
    } else if (qm instanceof QMTermExpression) {
      return this.renderTermExpression(qm);
    } else if (qm instanceof QMUnaryExpression) {
      return this.renderUnaryExpression(qm);
    } else if (qm instanceof QMVarRef) {
      return this.renderVarRef(qm);
    } else {
      throw new Error(`unknown query modifier ${qm}`);
    }
  }

  protected renderBooleanLiteral(qm: QMBooleanLiteral): string {
    return qm.value.toUpperCase();
  }
  protected renderComparisonPredicate(qm: QMComparisonPredicate): string {
    return this.renderBinaryExpression(qm);
  }
  protected renderConjunction(qm: QMConjunction): string {
    return qm.optionalNegations
      .map(n => this.parenthesize(this.render(n)))
      .join(' && ');
  }
  protected renderDecimalLiteral(qm: QMDecimalLiteral): string {
    return `"${qm.value}"^^xsd:decimal`;
  }

  protected renderDisjunction(qm: QMDisjunction): string {
    return qm.conjunctions
      .map(n => this.parenthesize(this.render(n)))
      .join(' || ');
  }

  protected renderDoubleLiteral(qm: QMDoubleLiteral): string {
    return `"${qm.value}"^^xsd:double`;
  }
  protected renderFactorExpression(qm: QMFactorExpression): string {
    return this.renderBinaryExpression(qm);
  }
  protected renderFieldRef(qm: QMFieldRef): string {
    return qm.field.name;
  }
  protected renderFunctionCall(qm: QMFunctionCall): string {
    return `${qm.name}(${this.renderExpressionList(qm.args)})`;
  }
  protected renderExpressionList(expressions: List<QMExpression>): string {
    return expressions.map(e => this.render(e)).join(', ');
  }
  protected getInOperator(negate: boolean): string | undefined {
    return negate ? 'NOT IN' : 'IN';
  }
  protected renderInPredicate(qm: QMInPredicate): string {
    const operator = this.getInOperator(qm.negate);
    if (operator) {
      const target = this.render(qm.target);
      const expressions = this.parenthesize(this.renderExpressionList(qm.list));
      return `${target} ${operator} ${expressions}`;
    } else {
      // for t in (a, b, c), build disjunction0 as (t=a || t=b || t=c)
      // if not negate, render disjunction0
      // if negate, render a disjunction of !(t=a || t=b || t=c)
      const disjunction0 = new QMParenPredicate(
        new QMDisjunction(
          qm.list.map(
            e =>
              new QMConjunction(
                List([
                  new QMOptionalNegation(
                    new QMComparisonPredicate('=', qm.target, e),
                    false
                  ),
                ])
              )
          )
        )
      );
      return this.render(
        qm.negate
          ? new QMDisjunction(
              List([
                new QMConjunction(
                  List([new QMOptionalNegation(disjunction0, true)])
                ),
              ])
            )
          : disjunction0
      );
    }
  }
  protected renderIntegerLiteral(qm: QMIntegerLiteral): string {
    return `"${qm.value}"^^xsd:integer`;
  }
  protected abstract renderInVarPredicate(qm: QMInVarPredicate): string;
  protected abstract renderIriRef(qm: QMIriRef): string;
  protected renderOperator(
    op: QMTermOperator | QMProductOperator | QMComparisonOperator
  ): string {
    return op;
  }
  protected renderOptionalNegation(qm: QMOptionalNegation): string {
    return `${qm.negate ? '!' : ''}${this.render(qm.predicate)}`;
  }
  protected renderOrderBy(qm: QMOrderBy): string {
    return `${this.render(qm.expression)}${qm.desc ? ' DESC' : ''}`;
  }
  protected renderParenExpression(qm: QMParenExpression): string {
    return this.parenthesize(this.render(qm.expression));
  }
  protected renderParenPredicate(qm: QMParenPredicate): string {
    return this.parenthesize(this.render(qm.disjunction));
  }
  protected renderStringLiteral(qm: QMStringLiteral): string {
    return `"${qm.value}"`;
  }
  protected renderTermExpression(qm: QMTermExpression): string {
    return this.renderBinaryExpression(qm);
  }
  protected renderUnaryExpression(qm: QMUnaryExpression): string {
    return `${qm.operator === '+' ? '' : qm.operator}${this.render(
      qm.expression
    )}`;
  }
  protected renderVarRef(qm: QMVarRef): string {
    const v = qm.value.resolve()
    if (v instanceof GQLBooleanValue) {

    }
    else if (v instanceof GQLEnumValue) {

    }
    else if (v instanceof GQLFloatValue) {
      return this.render(new QMDoubleLiteral(v.))
    }
  }

  protected renderBinaryExpression(
    qm: QMComparisonPredicate | QMFactorExpression | QMTermExpression
  ): string {
    return `${this.render(qm.left)} ${this.renderOperator(
      qm.operator
    )} ${this.render(qm.right)}`;
  }

  protected parenthesize(expr: string): string {
    return `( ${expr} )`;
  }
}
