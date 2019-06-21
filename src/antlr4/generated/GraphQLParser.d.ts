import { ATN } from "antlr4ts/atn/ATN";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { GraphQLListener } from "./GraphQLListener";
export declare class GraphQLParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly T__13 = 14;
    static readonly T__14 = 15;
    static readonly T__15 = 16;
    static readonly T__16 = 17;
    static readonly T__17 = 18;
    static readonly T__18 = 19;
    static readonly T__19 = 20;
    static readonly T__20 = 21;
    static readonly T__21 = 22;
    static readonly T__22 = 23;
    static readonly T__23 = 24;
    static readonly T__24 = 25;
    static readonly T__25 = 26;
    static readonly T__26 = 27;
    static readonly T__27 = 28;
    static readonly T__28 = 29;
    static readonly T__29 = 30;
    static readonly T__30 = 31;
    static readonly T__31 = 32;
    static readonly T__32 = 33;
    static readonly T__33 = 34;
    static readonly T__34 = 35;
    static readonly T__35 = 36;
    static readonly T__36 = 37;
    static readonly T__37 = 38;
    static readonly T__38 = 39;
    static readonly T__39 = 40;
    static readonly T__40 = 41;
    static readonly T__41 = 42;
    static readonly T__42 = 43;
    static readonly T__43 = 44;
    static readonly T__44 = 45;
    static readonly T__45 = 46;
    static readonly T__46 = 47;
    static readonly T__47 = 48;
    static readonly NAME = 49;
    static readonly INT_VALUE = 50;
    static readonly FLOAT_VALUE = 51;
    static readonly STRING_VALUE = 52;
    static readonly BOOLEAN_VALUE = 53;
    static readonly NULL_VALUE = 54;
    static readonly COMMENT = 55;
    static readonly IGNORED = 56;
    static readonly RULE_document = 0;
    static readonly RULE_definition = 1;
    static readonly RULE_executableDefinition = 2;
    static readonly RULE_operationDefinition = 3;
    static readonly RULE_operationType = 4;
    static readonly RULE_selectionSet = 5;
    static readonly RULE_selection = 6;
    static readonly RULE_field = 7;
    static readonly RULE_alias = 8;
    static readonly RULE_arguments = 9;
    static readonly RULE_argument = 10;
    static readonly RULE_fragmentSpread = 11;
    static readonly RULE_inlineFragment = 12;
    static readonly RULE_fragmentDefinition = 13;
    static readonly RULE_fragmentName = 14;
    static readonly RULE_typeCondition = 15;
    static readonly RULE_value = 16;
    static readonly RULE_objectField = 17;
    static readonly RULE_variableDefinitions = 18;
    static readonly RULE_variableDefinition = 19;
    static readonly RULE_variable = 20;
    static readonly RULE_defaultValue = 21;
    static readonly RULE_type = 22;
    static readonly RULE_namedType = 23;
    static readonly RULE_listType = 24;
    static readonly RULE_nonNullType = 25;
    static readonly RULE_directives = 26;
    static readonly RULE_directive = 27;
    static readonly RULE_typeSystemDefinition = 28;
    static readonly RULE_typeSystemExtension = 29;
    static readonly RULE_schemaDefinition = 30;
    static readonly RULE_schemaExtension = 31;
    static readonly RULE_operationTypeDefinition = 32;
    static readonly RULE_description = 33;
    static readonly RULE_typeDefinition = 34;
    static readonly RULE_typeExtension = 35;
    static readonly RULE_scalarTypeDefinition = 36;
    static readonly RULE_scalarTypeExtension = 37;
    static readonly RULE_objectTypeDefinition = 38;
    static readonly RULE_objectTypeExtension = 39;
    static readonly RULE_implementsInterfaces = 40;
    static readonly RULE_fieldsDefinition = 41;
    static readonly RULE_fieldDefinition = 42;
    static readonly RULE_argumentsDefinition = 43;
    static readonly RULE_inputValueDefinition = 44;
    static readonly RULE_interfaceTypeDefinition = 45;
    static readonly RULE_interfaceTypeExtension = 46;
    static readonly RULE_unionTypeDefinition = 47;
    static readonly RULE_unionMemberTypes = 48;
    static readonly RULE_unionTypeExtension = 49;
    static readonly RULE_enumTypeDefinition = 50;
    static readonly RULE_enumValuesDefinition = 51;
    static readonly RULE_enumValueDefinition = 52;
    static readonly RULE_enumTypeExtension = 53;
    static readonly RULE_inputObjectTypeDefinition = 54;
    static readonly RULE_inputFieldsDefinition = 55;
    static readonly RULE_inputObjectTypeExtension = 56;
    static readonly RULE_directiveDefinition = 57;
    static readonly RULE_directiveLocations = 58;
    static readonly RULE_directiveLocation = 59;
    static readonly RULE_executableDirectiveLocation = 60;
    static readonly RULE_typeSystemDirectiveLocation = 61;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    constructor(input: TokenStream);
    document(): DocumentContext;
    definition(): DefinitionContext;
    executableDefinition(): ExecutableDefinitionContext;
    operationDefinition(): OperationDefinitionContext;
    operationType(): OperationTypeContext;
    selectionSet(): SelectionSetContext;
    selection(): SelectionContext;
    field(): FieldContext;
    alias(): AliasContext;
    arguments(): ArgumentsContext;
    argument(): ArgumentContext;
    fragmentSpread(): FragmentSpreadContext;
    inlineFragment(): InlineFragmentContext;
    fragmentDefinition(): FragmentDefinitionContext;
    fragmentName(): FragmentNameContext;
    typeCondition(): TypeConditionContext;
    value(): ValueContext;
    objectField(): ObjectFieldContext;
    variableDefinitions(): VariableDefinitionsContext;
    variableDefinition(): VariableDefinitionContext;
    variable(): VariableContext;
    defaultValue(): DefaultValueContext;
    type(): TypeContext;
    namedType(): NamedTypeContext;
    listType(): ListTypeContext;
    nonNullType(): NonNullTypeContext;
    directives(): DirectivesContext;
    directive(): DirectiveContext;
    typeSystemDefinition(): TypeSystemDefinitionContext;
    typeSystemExtension(): TypeSystemExtensionContext;
    schemaDefinition(): SchemaDefinitionContext;
    schemaExtension(): SchemaExtensionContext;
    operationTypeDefinition(): OperationTypeDefinitionContext;
    description(): DescriptionContext;
    typeDefinition(): TypeDefinitionContext;
    typeExtension(): TypeExtensionContext;
    scalarTypeDefinition(): ScalarTypeDefinitionContext;
    scalarTypeExtension(): ScalarTypeExtensionContext;
    objectTypeDefinition(): ObjectTypeDefinitionContext;
    objectTypeExtension(): ObjectTypeExtensionContext;
    implementsInterfaces(): ImplementsInterfacesContext;
    fieldsDefinition(): FieldsDefinitionContext;
    fieldDefinition(): FieldDefinitionContext;
    argumentsDefinition(): ArgumentsDefinitionContext;
    inputValueDefinition(): InputValueDefinitionContext;
    interfaceTypeDefinition(): InterfaceTypeDefinitionContext;
    interfaceTypeExtension(): InterfaceTypeExtensionContext;
    unionTypeDefinition(): UnionTypeDefinitionContext;
    unionMemberTypes(): UnionMemberTypesContext;
    unionTypeExtension(): UnionTypeExtensionContext;
    enumTypeDefinition(): EnumTypeDefinitionContext;
    enumValuesDefinition(): EnumValuesDefinitionContext;
    enumValueDefinition(): EnumValueDefinitionContext;
    enumTypeExtension(): EnumTypeExtensionContext;
    inputObjectTypeDefinition(): InputObjectTypeDefinitionContext;
    inputFieldsDefinition(): InputFieldsDefinitionContext;
    inputObjectTypeExtension(): InputObjectTypeExtensionContext;
    directiveDefinition(): DirectiveDefinitionContext;
    directiveLocations(): DirectiveLocationsContext;
    directiveLocation(): DirectiveLocationContext;
    executableDirectiveLocation(): ExecutableDirectiveLocationContext;
    typeSystemDirectiveLocation(): TypeSystemDirectiveLocationContext;
    private static readonly _serializedATNSegments;
    private static readonly _serializedATNSegment0;
    private static readonly _serializedATNSegment1;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
export declare class DocumentContext extends ParserRuleContext {
    EOF(): TerminalNode;
    definition(): DefinitionContext[];
    definition(i: number): DefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DefinitionContext extends ParserRuleContext {
    executableDefinition(): ExecutableDefinitionContext | undefined;
    typeSystemDefinition(): TypeSystemDefinitionContext | undefined;
    typeSystemExtension(): TypeSystemExtensionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ExecutableDefinitionContext extends ParserRuleContext {
    operationDefinition(): OperationDefinitionContext | undefined;
    fragmentDefinition(): FragmentDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class OperationDefinitionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: OperationDefinitionContext): void;
}
export declare class SelectionOnlyOperationDefinitionContext extends OperationDefinitionContext {
    selectionSet(): SelectionSetContext;
    constructor(ctx: OperationDefinitionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FullOperationDefinitionContext extends OperationDefinitionContext {
    operationType(): OperationTypeContext;
    selectionSet(): SelectionSetContext;
    NAME(): TerminalNode | undefined;
    variableDefinitions(): VariableDefinitionsContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(ctx: OperationDefinitionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class OperationTypeContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class SelectionSetContext extends ParserRuleContext {
    selection(): SelectionContext[];
    selection(i: number): SelectionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class SelectionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: SelectionContext): void;
}
export declare class FieldSelectionContext extends SelectionContext {
    field(): FieldContext;
    constructor(ctx: SelectionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FragmentSpreadSelectionContext extends SelectionContext {
    fragmentSpread(): FragmentSpreadContext;
    constructor(ctx: SelectionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InlineFragmentSelectionContext extends SelectionContext {
    inlineFragment(): InlineFragmentContext;
    constructor(ctx: SelectionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FieldContext extends ParserRuleContext {
    NAME(): TerminalNode;
    alias(): AliasContext | undefined;
    arguments(): ArgumentsContext | undefined;
    directives(): DirectivesContext | undefined;
    selectionSet(): SelectionSetContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class AliasContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ArgumentsContext extends ParserRuleContext {
    argument(): ArgumentContext[];
    argument(i: number): ArgumentContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ArgumentContext extends ParserRuleContext {
    NAME(): TerminalNode;
    value(): ValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FragmentSpreadContext extends ParserRuleContext {
    fragmentName(): FragmentNameContext;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InlineFragmentContext extends ParserRuleContext {
    selectionSet(): SelectionSetContext;
    typeCondition(): TypeConditionContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FragmentDefinitionContext extends ParserRuleContext {
    fragmentName(): FragmentNameContext;
    typeCondition(): TypeConditionContext;
    selectionSet(): SelectionSetContext;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FragmentNameContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeConditionContext extends ParserRuleContext {
    namedType(): NamedTypeContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ValueContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: ValueContext): void;
}
export declare class VariableValueContext extends ValueContext {
    variable(): VariableContext;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class IntValueContext extends ValueContext {
    INT_VALUE(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FloatValueContext extends ValueContext {
    FLOAT_VALUE(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class StringValueContext extends ValueContext {
    STRING_VALUE(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class BooleanValueContext extends ValueContext {
    BOOLEAN_VALUE(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class NullValueContext extends ValueContext {
    NULL_VALUE(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumValueContext extends ValueContext {
    NAME(): TerminalNode;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EmptyListValueContext extends ValueContext {
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class NonEmptyListValueContext extends ValueContext {
    value(): ValueContext[];
    value(i: number): ValueContext;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EmptyObjectValueContext extends ValueContext {
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class NonEmptyObjectValueContext extends ValueContext {
    objectField(): ObjectFieldContext[];
    objectField(i: number): ObjectFieldContext;
    constructor(ctx: ValueContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ObjectFieldContext extends ParserRuleContext {
    NAME(): TerminalNode;
    value(): ValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class VariableDefinitionsContext extends ParserRuleContext {
    variableDefinition(): VariableDefinitionContext[];
    variableDefinition(i: number): VariableDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class VariableDefinitionContext extends ParserRuleContext {
    variable(): VariableContext;
    type(): TypeContext;
    defaultValue(): DefaultValueContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class VariableContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DefaultValueContext extends ParserRuleContext {
    value(): ValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeContext extends ParserRuleContext {
    namedType(): NamedTypeContext | undefined;
    nonNullType(): NonNullTypeContext | undefined;
    listType(): ListTypeContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class NamedTypeContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ListTypeContext extends ParserRuleContext {
    type(): TypeContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class NonNullTypeContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DirectivesContext extends ParserRuleContext {
    directive(): DirectiveContext[];
    directive(i: number): DirectiveContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DirectiveContext extends ParserRuleContext {
    NAME(): TerminalNode;
    arguments(): ArgumentsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeSystemDefinitionContext extends ParserRuleContext {
    schemaDefinition(): SchemaDefinitionContext | undefined;
    typeDefinition(): TypeDefinitionContext | undefined;
    directiveDefinition(): DirectiveDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeSystemExtensionContext extends ParserRuleContext {
    schemaExtension(): SchemaExtensionContext | undefined;
    typeExtension(): TypeExtensionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class SchemaDefinitionContext extends ParserRuleContext {
    directives(): DirectivesContext | undefined;
    operationTypeDefinition(): OperationTypeDefinitionContext[];
    operationTypeDefinition(i: number): OperationTypeDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class SchemaExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: SchemaExtensionContext): void;
}
export declare class SchemaExtensionWithOperationsContext extends SchemaExtensionContext {
    directives(): DirectivesContext | undefined;
    operationTypeDefinition(): OperationTypeDefinitionContext[];
    operationTypeDefinition(i: number): OperationTypeDefinitionContext;
    constructor(ctx: SchemaExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class SchemaExtensionWithoutOperationsContext extends SchemaExtensionContext {
    directives(): DirectivesContext;
    constructor(ctx: SchemaExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class OperationTypeDefinitionContext extends ParserRuleContext {
    operationType(): OperationTypeContext;
    namedType(): NamedTypeContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DescriptionContext extends ParserRuleContext {
    STRING_VALUE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeDefinitionContext extends ParserRuleContext {
    scalarTypeDefinition(): ScalarTypeDefinitionContext | undefined;
    objectTypeDefinition(): ObjectTypeDefinitionContext | undefined;
    interfaceTypeDefinition(): InterfaceTypeDefinitionContext | undefined;
    unionTypeDefinition(): UnionTypeDefinitionContext | undefined;
    enumTypeDefinition(): EnumTypeDefinitionContext | undefined;
    inputObjectTypeDefinition(): InputObjectTypeDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeExtensionContext extends ParserRuleContext {
    scalarTypeExtension(): ScalarTypeExtensionContext | undefined;
    objectTypeExtension(): ObjectTypeExtensionContext | undefined;
    interfaceTypeExtension(): InterfaceTypeExtensionContext | undefined;
    unionTypeExtension(): UnionTypeExtensionContext | undefined;
    enumTypeExtension(): EnumTypeExtensionContext | undefined;
    inputObjectTypeExtension(): InputObjectTypeExtensionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ScalarTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ScalarTypeExtensionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ObjectTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    implementsInterfaces(): ImplementsInterfacesContext | undefined;
    directives(): DirectivesContext | undefined;
    fieldsDefinition(): FieldsDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ObjectTypeExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: ObjectTypeExtensionContext): void;
}
export declare class ObjectTypeExtensionWithFieldsContext extends ObjectTypeExtensionContext {
    NAME(): TerminalNode;
    fieldsDefinition(): FieldsDefinitionContext;
    implementsInterfaces(): ImplementsInterfacesContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(ctx: ObjectTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ObjectTypeExtensionWithDirectivesContext extends ObjectTypeExtensionContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    implementsInterfaces(): ImplementsInterfacesContext | undefined;
    constructor(ctx: ObjectTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ObjectTypeExtensionWithInterfacesContext extends ObjectTypeExtensionContext {
    NAME(): TerminalNode;
    implementsInterfaces(): ImplementsInterfacesContext;
    constructor(ctx: ObjectTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ImplementsInterfacesContext extends ParserRuleContext {
    namedType(): NamedTypeContext[];
    namedType(i: number): NamedTypeContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FieldsDefinitionContext extends ParserRuleContext {
    fieldDefinition(): FieldDefinitionContext[];
    fieldDefinition(i: number): FieldDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class FieldDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    type(): TypeContext;
    description(): DescriptionContext | undefined;
    argumentsDefinition(): ArgumentsDefinitionContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ArgumentsDefinitionContext extends ParserRuleContext {
    inputValueDefinition(): InputValueDefinitionContext[];
    inputValueDefinition(i: number): InputValueDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InputValueDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    type(): TypeContext;
    description(): DescriptionContext | undefined;
    defaultValue(): DefaultValueContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InterfaceTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    fieldsDefinition(): FieldsDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InterfaceTypeExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: InterfaceTypeExtensionContext): void;
}
export declare class InterfaceTypeExtensionWithFieldsContext extends InterfaceTypeExtensionContext {
    NAME(): TerminalNode;
    fieldsDefinition(): FieldsDefinitionContext;
    directives(): DirectivesContext | undefined;
    constructor(ctx: InterfaceTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InterfaceTypeExtensionWithDirectivesContext extends InterfaceTypeExtensionContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    constructor(ctx: InterfaceTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class UnionTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    unionMemberTypes(): UnionMemberTypesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class UnionMemberTypesContext extends ParserRuleContext {
    namedType(): NamedTypeContext[];
    namedType(i: number): NamedTypeContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class UnionTypeExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: UnionTypeExtensionContext): void;
}
export declare class UnionTypeExtensionWithMembersContext extends UnionTypeExtensionContext {
    NAME(): TerminalNode;
    unionMemberTypes(): UnionMemberTypesContext;
    directives(): DirectivesContext | undefined;
    constructor(ctx: UnionTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class UnionTypeExtensionWithDirectivesContext extends UnionTypeExtensionContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    constructor(ctx: UnionTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    enumValuesDefinition(): EnumValuesDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumValuesDefinitionContext extends ParserRuleContext {
    enumValueDefinition(): EnumValueDefinitionContext[];
    enumValueDefinition(i: number): EnumValueDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumValueDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumTypeExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: EnumTypeExtensionContext): void;
}
export declare class EnumTypeExtensionWithValuesContext extends EnumTypeExtensionContext {
    NAME(): TerminalNode;
    enumValuesDefinition(): EnumValuesDefinitionContext;
    directives(): DirectivesContext | undefined;
    constructor(ctx: EnumTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class EnumTypeExtensionWithDirectivesContext extends EnumTypeExtensionContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    constructor(ctx: EnumTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InputObjectTypeDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    description(): DescriptionContext | undefined;
    directives(): DirectivesContext | undefined;
    inputFieldsDefinition(): InputFieldsDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InputFieldsDefinitionContext extends ParserRuleContext {
    inputValueDefinition(): InputValueDefinitionContext[];
    inputValueDefinition(i: number): InputValueDefinitionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InputObjectTypeExtensionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    copyFrom(ctx: InputObjectTypeExtensionContext): void;
}
export declare class InputObjectTypeExtensionWithFieldsContext extends InputObjectTypeExtensionContext {
    NAME(): TerminalNode;
    inputFieldsDefinition(): InputFieldsDefinitionContext;
    directives(): DirectivesContext | undefined;
    constructor(ctx: InputObjectTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class InputObjectTypeExtensionWithDirectivesContext extends InputObjectTypeExtensionContext {
    NAME(): TerminalNode;
    directives(): DirectivesContext;
    constructor(ctx: InputObjectTypeExtensionContext);
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DirectiveDefinitionContext extends ParserRuleContext {
    NAME(): TerminalNode;
    directiveLocations(): DirectiveLocationsContext;
    description(): DescriptionContext | undefined;
    argumentsDefinition(): ArgumentsDefinitionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DirectiveLocationsContext extends ParserRuleContext {
    directiveLocation(): DirectiveLocationContext[];
    directiveLocation(i: number): DirectiveLocationContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class DirectiveLocationContext extends ParserRuleContext {
    executableDirectiveLocation(): ExecutableDirectiveLocationContext | undefined;
    typeSystemDirectiveLocation(): TypeSystemDirectiveLocationContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class ExecutableDirectiveLocationContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
export declare class TypeSystemDirectiveLocationContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    readonly ruleIndex: number;
    enterRule(listener: GraphQLListener): void;
    exitRule(listener: GraphQLListener): void;
}
