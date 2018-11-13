import {List} from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLSelection} from './GQLSelection';

export class GQLInlineFragment extends GQLSelection {
    public typeCondition: string;
    public directives: List<GQLDirective>;
    public selections: List<GQLSelection>;
}
