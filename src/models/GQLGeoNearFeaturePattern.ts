import {GQLPattern} from './GQLPattern';

export class GQLGeoNearFeaturePattern extends GQLPattern {
    public feature: string;
    public distance: number;
    public units: string;
}
