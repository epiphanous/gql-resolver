export default class QueryStrategy {
  public dbConn: any = null;
  public withLimitOffset(limit: number, offset: number): QueryStrategy {
    return this;
  }
}
