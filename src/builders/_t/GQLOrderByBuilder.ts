import {List, Map, Set} from 'immutable';
import { Option, Try } from 'funfix';
import { GQLFilter } from '../../models/GQLFilter';
import ResolverContext from '../../models/ResolverContext';
import GQLOrderByBuilder from '../../builders/graphql/GQLOrderByBuilder';
import { GQLObjectType } from '../../models/GQLTypeDefinition';
import Builder from '../Builder';
import { expect } from 'chai';
import fs = require('fs');

describe('GQLOrderByBuilder test', () => {
  const schema = ResolverContext.buildSchema(
    fs.readFileSync('./src/schema.graphql', 'utf8')
  );
  it('parses an orderby statement', async () => {
    const gnFeature = schema
      .getTypeDefinition('gn_Feature')
      .get() as GQLObjectType;
    const orderBy = 's_name DESC';
    const validFields = Map(
      gnFeature.fields.map<[string, string]>(fd => [fd.name, fd.gqlType.name])
    );
    const filterBuilder = new GQLOrderByBuilder(
      validFields,
      Set(),
      Map<string, any>(),
      Set(),
      orderBy
    );
    const result = Builder.parse<any>(filterBuilder, orderBy);
    expect(result.isSuccess()).to.equal(true);
    expect(result.get().size).to.equal(1);
  });
});
