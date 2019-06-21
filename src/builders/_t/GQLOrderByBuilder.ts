import { expect } from 'chai';
import fs = require('fs');
import { Map, Set } from 'immutable';
import { GQLOrderByBuilder } from '../../builders/graphql/GQLOrderByBuilder';
import { GQLObjectType } from '../../models/GQLTypeDefinition';
import { ResolverContext } from '../../models/ResolverContext';
import { Builder } from '../Builder';

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
