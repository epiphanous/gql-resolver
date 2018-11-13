import Record from 'dataclass';
import {List} from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLSelection} from './GQLSelection';

export class GQLFragmentDefinition extends Record<GQLFragmentDefinition> {
    public name: string;
    public typeCondition: string;
    public directives: List<GQLDirective>;
    public selections: List<GQLSelection>;
}
