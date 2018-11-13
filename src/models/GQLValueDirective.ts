import {Either} from 'funfix-core';
import {GQLDirective} from './GQLDirective';
import {GQLValue} from './GQLValue';
import {GQLVariable} from './GQLVariable';

export class GQLValueDirective extends GQLDirective {
    public value: Either<GQLValue, GQLVariable>;
}
