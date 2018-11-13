import {GQLPattern} from './GQLPattern';

export class GQLGeoNearLatLonPattern extends GQLPattern {
    public lat: string;
    public lon: string;
    public distance: number;
    public units: string;
}
