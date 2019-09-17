import { expect } from 'chai';
import fs = require('fs');
import 'mocha';

import { Option, None } from 'funfix';
import { List, Map } from 'immutable';
import {
  GQLArgument,
  GQLDirective,
  GQLExecutionPlan,
  GQLField,
  ResolverContext,
} from '../../../models';
import { SparqlConnectionCountQueryStrategy } from '../SparqlConnectionCountQueryStrategy';
import {
  ISparqlQueryStrategyFactoryParams,
  SparqlQueryStrategyFactory,
} from '../SparqlQueryStrategyFactory';

describe('SparqlFieldQueryStrategy', () => {
  const schema = fs.readFileSync('./src/schema.graphql', 'utf8');
  const sparqlParams: ISparqlQueryStrategyFactoryParams = {
    endpoint: 'https://localhost:8182',
    prefixes: [],
  };
  const strategies = {
    sparql: new SparqlQueryStrategyFactory(sparqlParams),
    sparqlConnectionCount: new SparqlConnectionCountQueryStrategy(sparqlParams),
  };
  const resolver = new ResolverContext({
    schema,
    strategies,
    defaultStrategy: 'sparql',
  });
  const fields = List<GQLField>([
    new GQLField({ name: 'fieldA' }),
    new GQLField({ name: 'fieldB' }),
    new GQLField({ name: 'fieldC', alias: Option.of('aliasC') }),
  ]);
  const plan = new GQLExecutionPlan(
    null,
    resolver,
    Map<string, any>(),
    'test',
    None,
    List<GQLArgument>(),
    List<GQLDirective>(),
    fields,
    'Query'
  );
  const plan = new GQLExecutionPlan();
  const sparql = factory.createFieldQueryStrategy(fields, plan);

  describe('#prefixify()', () => {});
});
