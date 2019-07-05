import { None, Some } from 'funfix';
import { Map } from 'immutable';
import { Builder } from './builders/Builder';
import { GQLQueryBuilder } from './builders/graphql/GQLQueryBuilder';
import { GQLQueryDocument } from './models/GQLQueryDocument';
import { ResolverContext } from './models/ResolverContext';

export class Resolver {
  public context: ResolverContext;

  constructor(context: ResolverContext) {
    this.context = context;
  }

  public resolve(
    query: string,
    vars: { [key: string]: any } = {},
    operationName: string = ''
  ) {
    const queryBuilder = new GQLQueryBuilder(
      this.context,
      Map(vars),
      operationName ? Some(operationName) : None
    );
    return Builder.parse<GQLQueryDocument>(queryBuilder, query).map(doc =>
      doc.execute(queryBuilder)
    );
  }
}
