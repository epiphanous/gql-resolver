import { Map, Set } from 'immutable';
import { GQLFilter } from '../../models/GQLFilter';
import ResolverContext from '../../models/ResolverContext';
import GQLFilterBuilder from '../graphql/GQLFilterBuilder';
import { GQLObjectType } from '../../models/GQLTypeDefinition';
import Builder from '../Builder';
import fs = require('fs');

describe('GQLFilterBuilder test', () => {
  const schema = ResolverContext.buildSchema(
    fs.readFileSync('./src/schema.graphql', 'utf8')
  );
  it('produces a valid filter object', async () => {
    const gnFeature = schema
      .getTypeDefinition('gn_Feature')
      .get() as GQLObjectType;
    const filterString =
      'fn:element-pair-geospatial-query[xsd:integer](s_name, geo_lat, geo_long) < 23';
    const validFields = Map(
      gnFeature.fields.map<[string, string]>(fd => [fd.name, fd.gqlType.name])
    );
    const filterBuilder = new GQLFilterBuilder(
      validFields,
      Set(),
      Map<string, any>(),
      Set(),
      filterString
    );
    const result = Builder.parse<GQLFilter>(filterBuilder, filterString);
    console.log(result.get().expression.expression);
    // expect(GQLFilterObject.result).to.be.instanceof(GQLFilter);
  });
});
