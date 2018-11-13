import {List} from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLSelection} from './GQLSelection';

export class GQLFragmentSpread extends GQLSelection {
    public directives: List<GQLDirective>;
}
