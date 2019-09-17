import { List, Map, OrderedMap, Set } from 'immutable';
import {
  GQLConnectionExecutionPlan,
  GQLField,
  GQLSortBy,
  SimpleNamespace,
} from '../../models';
import { SparqlQueryStrategy } from './SparqlQueryStrategy';
import { variablify } from './SparqlUtils';

export class SparqlConnectionCountQueryStrategy extends SparqlQueryStrategy {
  /**
   * Computes the total count for a connection.
   * @param {List<GQLField>} fields should be just one field that will hold the count
   * @param {GQLConnectionExecutionPlan} plan our connection plan
   * @param {string} endpoint a sparql endpoint
   * @param {Array<[string, string]>} prefixes
   */
  public constructor(
    fields: List<GQLField>,
    plan: GQLConnectionExecutionPlan,
    endpoint: string,
    prefixes: Map<string, SimpleNamespace>
  ) {
    super(fields, plan, endpoint, prefixes, true, false);
  }

  /**
   * Return our one field alias which is the count expression.
   * @returns {OrderedMap<string, string>}
   */
  protected getFieldAliases(): OrderedMap<string, string> {
    const countField: string = variablify(
      this.fields.map(f => f.getAliasOrName()).first('totalCount')
    );
    const count = `(COUNT(${SparqlConnectionCountQueryStrategy.SUBJECT_VARIABLE}) as ${countField})`;
    return OrderedMap({ count });
  }

  /**
   * Returns the parent binding since we want to group our counts by parent id.
   * @returns {OrderedMap<string, string>}
   */
  protected getGroupByProjections(): OrderedMap<string, string> {
    return this.getParentSubjectProjections();
  }

  /**
   * Returns an empty list, since the count query doesn't sort.
   * @returns {Set<GQLSortBy>}
   */
  protected getSortKeys(): List<GQLSortBy> {
    return List();
  }

  /**
   * Returns an empty string, since the count query doesn't paginate.
   * @returns {string}
   */
  protected getCursorClause(): string {
    return '';
  }

  /**
   * Returns an empty string, since the count query doesn't use limits.
   * @returns {string}
   */
  protected getLimitClause(): string {
    return '';
  }
}
