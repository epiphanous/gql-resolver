import Record from 'dataclass';
import {Either, Option} from 'funfix-core';
import {GQLType} from './GQLType';
import {GQLValue} from './GQLValue';
import {GQLVariable} from './GQLVariable';

export class GQLVariableDefinition extends Record<GQLVariableDefinition> {
    public name: string;
    public description: string;
    public gqlType: GQLType;
    public defaultValue: Option<Either<GQLValue, GQLVariable>>;
}
