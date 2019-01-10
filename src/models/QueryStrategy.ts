import * as marklogic from 'marklogic';

export class QueryStrategy {
  public dbConn: any = null;
  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }
}

export class SparqlQueryStrategy extends QueryStrategy {
  constructor() {
    super();
    this.dbConn = marklogic.createDatabaseClient({ // TODO move to a config file
        host: 'localhost',
        port: '8000',
        user: 'admin',
        password: 'admin',
        authType: 'DIGEST'
    });
  }

  public withLimitOffset(limit: number, offset: number): SparqlQueryStrategy {
    return this;
  }
}
