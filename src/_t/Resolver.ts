import { assert, expect } from 'chai';
import fs = require('fs');
import { None, Some, Failure, NotImplementedError } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import { GQLOperation } from '../models/GQLOperation';
import { QueryStrategy } from '../models/QueryStrategy';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';
import QueryExecutionException from '../models/exceptions/QueryExecutionException';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');

describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ wow: new QueryStrategy() }),
    'wow'
  );
  it('should create a resolver context', () => {
    expect(rc).to.have.keys('defaultStrategy', 'schema', 'strategies');
  });
  const resolver = new Resolver(rc);
  const op = new GQLOperation({ name: 'test', operationType: 'query' });

  it('should throw no op exception on empty op', () => {
    const result = resolver.executeOperation(None);
    assert(result.isFailure, 'operation failed');
    expect(result.value).to.be.an.instanceOf(QueryExecutionException);
  });

  it('should throw not implemented exception on real op', () => {
    const result = resolver.executeOperation(Some(op));
    assert(result.isFailure, 'operation failed');
    expect(result.value).to.be.an.instanceOf(NotImplementedError);
  });
});
