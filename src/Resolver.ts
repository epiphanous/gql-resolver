import { None, Some, Throwable } from 'funfix';
import { Map } from 'immutable';
import { Builder } from './builders';
import { GQLQueryBuilder } from './builders/graphql';
import { GQLQueryDocument, ResolverContext } from './models';

export class Resolver {
  public context: ResolverContext;

  constructor(context: ResolverContext) {
    this.context = context;
  }

  public resolve(
    query: string,
    vars: { [key: string]: any } = {},
    operationName: string = ''
  ): Promise<{}> {
    const queryBuilder = new GQLQueryBuilder(
      this.context,
      Map(vars),
      operationName ? Some(operationName) : None
    );
    return Builder.parse<GQLQueryDocument>(queryBuilder, query).fold(
      err => new Promise(() => this.genError(err as Error, 'parse')),
      doc =>
        doc
          .execute(queryBuilder)
          .then(qr => ({
            data: qr.toJS(),
          }))
          .catch(err => this.genError(err as Error, 'execution'))
    );
  }

  private genError(e: Error, type: string): {} {
    const { name, message, stack } = e;
    return {
      error: {
        type,
        name,
        message,
        stack,
      },
    };
  }
}
