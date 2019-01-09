import { assert, expect } from 'chai';
import fs = require('fs');
import { None, NotImplementedError, Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import QueryExecutionException from '../models/exceptions/QueryExecutionException';
import { GQLOperation } from '../models/GQLOperation';
import { SparqlQueryStrategy } from '../models/QueryStrategy';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');

describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ sparql: new SparqlQueryStrategy() }),
    'sparql'
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

  // it('should throw not implemented exception on real op', () => {
  //   const result = resolver.executeOperation(Some(op));
  //   assert(result.isFailure, 'operation failed');
  //   expect(result.value).to.be.an.instanceOf(NotImplementedError);
  // });

  it('should db connection have property docs', () => {
    const dbconn = resolver.context.strategies.get('sparql').dbConn;
    expect(dbconn).to.haveOwnProperty('documents');
  });

  console.log(resolver.resolve('query myHero { hero (name: "hero1") { name }}', Map({'hero': 'hero'}), Some('query')));
});
