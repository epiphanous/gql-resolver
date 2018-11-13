import {Option} from 'funfix-core';
import {GQLFieldBooster} from './GQLFieldBooster';
import {GQLPattern} from './GQLPattern';

export class GQLTextMatchPattern extends GQLPattern {
    public isGeo: Boolean;
    public text: string;
    public boost: GQLFieldBooster;
    public minScore: Option<number>;
    public maxHits: Option<number>;
}
