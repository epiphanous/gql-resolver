import Record from 'dataclass';
import {None, Option} from 'funfix-core';

export class GQLObjectQueryModifierExpression extends Record<GQLObjectQueryModifierExpression> {
    public expression: string;
    public dataType: string;
    public underlyingValue: Option<any> = None;
}
