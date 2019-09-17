import { Option } from 'funfix';
import { Map } from 'immutable';
import { Builder, BuilderErrors } from './builders';
import { GQLQueryBuilder } from './builders/graphql';
import {
  GQLError,
  GQLQueryDocument,
  IResolvedResult,
  ResolverContext,
} from './models';

export class Resolver {
  public context: ResolverContext;

  constructor(context: ResolverContext) {
    this.context = context;
  }

  /**
   * Resolve a mutation or query and return data and/or errors.
   * @param {string} query a GraphQL document containing at least one
   *   OperationDefinition and zero or more FragmentDefinitions
   * @param vars values for variables defined in the operation
   * @param {string} name the name of the operation to execute (optional)
   * @returns {Promise<IResolvedResult>}
   */
  public resolve(
    query: string,
    vars: { [key: string]: any } = {},
    name: string | null = null
  ): Promise<IResolvedResult> {
    const queryBuilder = new GQLQueryBuilder(
      this.context,
      Map(vars),
      Option.of(name)
    );
    return Builder.parse<GQLQueryDocument>(queryBuilder, query).fold(
      be =>
        new Promise(() =>
          (be as BuilderErrors).map<GQLError>(
            e => new GQLError(e.message, [{ line: e.line, column: e.column }])
          )
        ),
      doc =>
        doc
          .execute(queryBuilder)
          .then(qr => qr.toJS())
          .catch((err: Error) => ({ errors: [{ message: err.message }] }))
    );
  }
}
