import {Option} from 'funfix-core';
import {List} from 'immutable';
import {GQLArgument} from './GQLArgument';
import {GQLDirective} from './GQLDirective';
import {GQLSelection} from './GQLSelection';

export class GQLField extends GQLSelection {
    public alias: Option<string>;
    public arguments: List<GQLArgument>;
    public directives: List<GQLDirective>;
    public selections: List<GQLSelection>;
    public fields: List<[string, GQLField]> = List();
}
