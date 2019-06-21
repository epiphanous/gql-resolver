import { Option } from 'funfix';
import { GQLFieldBooster } from './GQLBooster';
export interface IGQLPattern {
    field: string;
}
export declare class GQLPattern implements IGQLPattern {
    field: string;
    constructor(fieldarg: string);
}
export declare class GQLGeoNearFeaturePattern extends GQLPattern {
    feature: string;
    distance: number;
    units: string;
    constructor(fieldarg: string, feature: string, units: string, distance: number);
}
export declare class GQLGeoNearLatLonPattern extends GQLPattern {
    lat: string;
    lon: string;
    distance: number;
    units: string;
    constructor(fieldarg: string, lat: string, lon: string, units: string, distance: number);
}
export declare class GQLTextMatchPattern extends GQLPattern {
    isGeo: boolean;
    text: string;
    boost: GQLFieldBooster;
    minScore: Option<number>;
    maxHits: Option<number>;
    constructor(fieldarg: string, text: string, boost: GQLFieldBooster, isGeo: boolean, minScore?: Option<number>, maxHits?: Option<number>);
}
