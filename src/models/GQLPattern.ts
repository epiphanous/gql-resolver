import Record from 'dataclass';
import {Option} from 'funfix';
import {GQLFieldBooster} from './GQLFieldBooster';

export class GQLPattern extends Record<GQLPattern> {
    public field: string;
}

export class GQLGeoNearFeaturePattern extends GQLPattern {
    public feature: string;
    public distance: number;
    public units: string;
}

export class GQLGeoNearLatLonPattern extends GQLPattern {
    public lat: string;
    public lon: string;
    public distance: number;
    public units: string;
}

export class GQLTextMatchPattern extends GQLPattern {
    public isGeo: boolean;
    public text: string;
    public boost: GQLFieldBooster;
    public minScore: Option<number>;
    public maxHits: Option<number>;
}