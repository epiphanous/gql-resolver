import { expect } from 'chai';
import { List, Map } from 'immutable';
import 'mocha';
import {GQLGeoNearFeaturePattern} from '../GQLPattern';
import Namespace from '../Namespace';

describe('GQLPatterns -> GQLGeoNearFeaturePattern', () => {
    const GQLNearFeaturePattern = new GQLGeoNearFeaturePattern('fieldArg', 'SomeFeature', 'km', 500);
    it('Should contain all properties', () => {
        expect(GQLNearFeaturePattern).to.have.keys('field', 'feature', 'distance', 'units');
    });
    it('Should all properties be set to proper values', () => {
        expect(GQLNearFeaturePattern.field).to.eql('fieldArg');
        expect(GQLNearFeaturePattern.feature).to.eql('SomeFeature');
        expect(GQLNearFeaturePattern.units).to.eql('km');
        expect(GQLNearFeaturePattern.distance).to.eql(500);
    });
});
