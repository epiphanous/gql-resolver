import Record from 'dataclass';
import {None, Option} from 'funfix';
import {GQLFieldBooster} from './GQLFieldBooster';

interface IGQLPattern {
    field: string;
}

export class GQLPattern implements IGQLPattern{
    public field: string;

    constructor(fieldarg: string) {
        this.field = fieldarg;
    }
}

export class GQLGeoNearFeaturePattern extends GQLPattern {
    public feature: string;
    public distance: number;
    public units: string;

    constructor(fieldarg: string, feature: string, units: string, distance: number) {
        super(fieldarg);
        this.feature = feature;
        this.distance = distance;
        this.units = units;
    }
}

export class GQLGeoNearLatLonPattern extends GQLPattern {
    public lat: string;
    public lon: string;
    public distance: number;
    public units: string;

    constructor(fieldarg: string, lat: string, lon: string, units: string, distance: number) {
        super(fieldarg);
        this.lat = lat;
        this.lon = lon;
        this.units = units;
        this.distance = distance;
    }
}

export class GQLTextMatchPattern extends GQLPattern {
    public isGeo: boolean;
    public text: string;
    public boost: GQLFieldBooster;
    public minScore: Option<number>;
    public maxHits: Option<number>;

    constructor(
        fieldarg: string,
        text: string,
        boost: GQLFieldBooster,
        isGeo: boolean,
        minScore: Option<number> = None,
        maxHits: Option<number> = None
    ) {
        super(fieldarg);
        this.isGeo = isGeo;
        this.text = text;
        this.boost = boost;
        this.minScore = minScore;
        this.maxHits = maxHits;
    }
}