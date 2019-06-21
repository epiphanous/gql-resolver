import { Option } from 'funfix';
import { List } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLType } from './GQLType';
import { GQLValue } from './GQLValue';
export interface IGQLTypeDefinition {
    name: string;
    description: Option<string>;
    directives: List<GQLDirective>;
    deprecated(): Option<string>;
}
export declare class GQLTypeDefinition implements IGQLTypeDefinition {
    name: string;
    description: Option<string>;
    directives: List<GQLDirective>;
    constructor(name: string, description?: Option<string>, directives?: List<GQLDirective>);
    deprecated(): Option<string>;
}
export interface IGQLInterface extends IGQLTypeDefinition {
    fields: List<GQLFieldDefinition>;
}
export declare class GQLInterface extends GQLTypeDefinition implements IGQLInterface {
    fields: List<GQLFieldDefinition>;
    constructor(name: string, fields: List<GQLFieldDefinition>, description?: Option<string>, directives?: List<GQLDirective>);
    idFields(): List<GQLFieldDefinition>;
}
export interface IGQLObjectType extends IGQLTypeDefinition {
    fields: List<GQLFieldDefinition>;
    interfaces: List<string>;
}
export declare class GQLObjectType extends GQLTypeDefinition implements IGQLObjectType {
    fields: List<GQLFieldDefinition>;
    interfaces: List<string>;
    constructor(name: string, fields: List<GQLFieldDefinition>, interfaces: List<string>, description?: Option<string>, directives?: List<GQLDirective>);
    copy(newProps: Partial<IGQLObjectType>): GQLObjectType;
    idFields(): List<GQLFieldDefinition>;
}
export interface IGQLFieldDefinition extends IGQLTypeDefinition {
    gqlType: GQLType;
    args: List<GQLArgumentDefinition>;
}
export declare class GQLFieldDefinition extends GQLTypeDefinition implements IGQLFieldDefinition {
    gqlType: GQLType;
    args: List<GQLArgumentDefinition>;
    constructor(name: string, gqlType: GQLType, args?: List<GQLArgumentDefinition>, description?: Option<string>, directives?: List<GQLDirective>);
    isIdField(): boolean;
}
export interface IGQLArgumentDefinition extends IGQLTypeDefinition {
    gqlType: GQLType;
    defaultValue: Option<GQLValue>;
}
export declare class GQLArgumentDefinition extends GQLTypeDefinition implements IGQLArgumentDefinition {
    gqlType: GQLType;
    defaultValue: Option<GQLValue>;
    constructor(name: string, gqlType: GQLType, defaultValue?: Option<GQLValue>, description?: Option<string>, directives?: List<GQLDirective>);
}
export interface IGQLInputType extends IGQLTypeDefinition {
    args: List<GQLArgumentDefinition>;
}
export declare class GQLInputType extends GQLTypeDefinition implements IGQLInputType {
    args: List<GQLArgumentDefinition>;
    constructor(name: string, args?: List<GQLArgumentDefinition>, description?: Option<string>, directives?: List<GQLDirective>);
}
export interface IGQLDirectiveDefinition extends IGQLTypeDefinition {
    args: List<GQLArgumentDefinition>;
    locations: List<string>;
}
export declare class GQLDirectiveDefinition extends GQLTypeDefinition implements IGQLDirectiveDefinition {
    args: List<GQLArgumentDefinition>;
    locations: List<string>;
    constructor(name: string, args?: List<GQLArgumentDefinition>, locations?: List<string>, description?: Option<string>);
}
export interface IGQLUnion extends IGQLTypeDefinition {
    gqlTypes: List<string>;
}
export declare class GQLUnion extends GQLTypeDefinition implements IGQLUnion {
    gqlTypes: List<string>;
    constructor(name: string, gqlTypes: List<string>, description?: Option<string>, directives?: List<GQLDirective>);
}
export declare class GQLEnumValueDefinition extends GQLTypeDefinition {
    constructor(name: string, description?: Option<string>, directives?: List<GQLDirective>);
}
export interface IGQLEnum extends IGQLTypeDefinition {
    values: List<GQLEnumValueDefinition>;
}
export declare class GQLEnum extends GQLTypeDefinition implements IGQLEnum {
    values: List<GQLEnumValueDefinition>;
    constructor(name: string, values: List<GQLEnumValueDefinition>, description?: Option<string>, directives?: List<GQLDirective>);
}
export interface IGQLScalarType extends IGQLTypeDefinition {
    nativeType: string;
}
export declare class GQLScalarType extends GQLTypeDefinition implements IGQLScalarType {
    nativeType: string;
    constructor(name: string, description?: Option<string>, directives?: List<GQLDirective>);
}
