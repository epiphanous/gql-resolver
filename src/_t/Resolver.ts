import { expect } from 'chai';
import fs = require('fs');
import { None, Some } from 'funfix';
import { Map } from 'immutable';
import 'mocha';
import { GQLOperation } from '../models/GQLOperation';
import { QueryStrategy } from '../models/QueryStrategy';
import ResolverContext from '../models/ResolverContext';
import { Resolver } from '../Resolver';

const schema = fs.readFileSync('./src/schema.graphql', 'utf8');

describe('Resolver', () => {
  const rc = new ResolverContext(
    schema,
    Map({ wow: new QueryStrategy() }),
    'wow'
  );
  it('should create a resolver context', () => {
    expect(rc).to.have.keys('a', 'b', 'c');
  });
  const resolver = new Resolver(rc);
  const op = new GQLOperation({ name: 'test', operationType: 'query' });

  it('should throw on empty op', () => {
    expect(() => resolver.executeOperation(None)).to.throw(
      'no executable operation'
    );
  });

  it('should throw on real op', () => {
    expect(() => resolver.executeOperation(Some(op))).to.throw(
      'not implemented'
    );
  });
});
