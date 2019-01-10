import { assert, expect } from 'chai';
import { None, Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import QueryExecutionException from '../models/exceptions/QueryExecutionException';
import { GQLOperation } from '../models/GQLOperation';
import { SparqlQueryStrategy } from '../models/QueryStrategy';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';
const fs = require('fs');

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');

describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ sparql: new SparqlQueryStrategy() }),
    'sparql'
  );
  it('creates a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);
  const op = new GQLOperation({ name: 'test', operationType: 'query' });

  it('throws no op exception on empty op', () => {
    const result = resolver.executeOperation(None);
    assert(result.isFailure, 'operation failed');
    expect(result.value).to.be.an.instanceOf(QueryExecutionException);
  });

  // it('should throw not implemented exception on real op', () => {
  //   const result = resolver.executeOperation(Some(op));
  //   assert(result.isFailure, 'operation failed');
  //   expect(result.value).to.be.an.instanceOf(NotImplementedError);
  // });

  it('db connection has property \'documents\'', () => {
    const dbconn = resolver.context.strategies.get('sparql').dbConn;
    expect(dbconn).to.haveOwnProperty('documents');
  });

  it('resolves a query', () => {
    const result = resolver.resolve(
      'query test { user(id: "user/1") { s_name }}',
      Map(),
      Some('query'));
    console.log(result);
    assert(result.isSuccess());
  });

});
