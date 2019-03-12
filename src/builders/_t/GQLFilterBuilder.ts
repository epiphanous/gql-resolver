import { assert, expect } from 'chai';
import fs = require('fs');
import GQLFilterBuilder from '../graphql/GQLFilterBuilder';
import ResolverContext from '../../models/ResolverContext';
import {Map, Set} from 'immutable';
import {GQLFilter} from '../../models/GQLFilter';

describe('GQLFilterBuilder test', () => {
  const schema = ResolverContext.buildSchema(fs.readFileSync('./src/schema.graphql', 'utf8'));
  it('produces a valid filter object', async () => {
    const gnFeatureTypeDef = schema.getTypeDefinition('gn_Feature');
    const filterString = `s_name = 'zomg'`;
    const validFields = gnFeatureTypeDef.value.fields.reduce((acc, gqlfd) => {
      return acc.set(gqlfd.name, gqlfd.gqlType.name);
    }, Map<string, string>().asMutable());
    const GQLFilterObject = new GQLFilterBuilder(validFields, Set(), Map<string, any>(), Set(), filterString);
    console.log('done', GQLFilterObject);
    expect(GQLFilterObject.result).to.be.instanceof(GQLFilter);
  });
});
