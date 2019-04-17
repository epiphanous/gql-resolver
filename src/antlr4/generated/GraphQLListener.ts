// Generated from GraphQL.g4 by ANTLR 4.6-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { SelectionOnlyOperationDefinitionContext } from './GraphQLParser';
import { FullOperationDefinitionContext } from './GraphQLParser';
import { FragmentSpreadSelectionContext } from './GraphQLParser';
import { FieldSelectionContext } from './GraphQLParser';
import { InlineFragmentSelectionContext } from './GraphQLParser';
import { InputObjectTypeExtensionWithDirectivesContext } from './GraphQLParser';
import { InputObjectTypeExtensionWithFieldsContext } from './GraphQLParser';
import { InterfaceTypeExtensionWithFieldsContext } from './GraphQLParser';
import { InterfaceTypeExtensionWithDirectivesContext } from './GraphQLParser';
import { ObjectTypeExtensionWithDirectivesContext } from './GraphQLParser';
import { ObjectTypeExtensionWithFieldsContext } from './GraphQLParser';
import { ObjectTypeExtensionWithInterfacesContext } from './GraphQLParser';
import { UnionTypeExtensionWithDirectivesContext } from './GraphQLParser';
import { UnionTypeExtensionWithMembersContext } from './GraphQLParser';
import { SchemaExtensionWithoutOperationsContext } from './GraphQLParser';
import { SchemaExtensionWithOperationsContext } from './GraphQLParser';
import { StringValueContext } from './GraphQLParser';
import { NonEmptyObjectValueContext } from './GraphQLParser';
import { EnumValueContext } from './GraphQLParser';
import { VariableValueContext } from './GraphQLParser';
import { IntValueContext } from './GraphQLParser';
import { EmptyListValueContext } from './GraphQLParser';
import { FloatValueContext } from './GraphQLParser';
import { BooleanValueContext } from './GraphQLParser';
import { NonEmptyListValueContext } from './GraphQLParser';
import { NullValueContext } from './GraphQLParser';
import { EmptyObjectValueContext } from './GraphQLParser';
import { EnumTypeExtensionWithDirectivesContext } from './GraphQLParser';
import { EnumTypeExtensionWithValuesContext } from './GraphQLParser';
import { DocumentContext } from './GraphQLParser';
import { DefinitionContext } from './GraphQLParser';
import { ExecutableDefinitionContext } from './GraphQLParser';
import { OperationDefinitionContext } from './GraphQLParser';
import { OperationTypeContext } from './GraphQLParser';
import { SelectionSetContext } from './GraphQLParser';
import { SelectionContext } from './GraphQLParser';
import { FieldContext } from './GraphQLParser';
import { AliasContext } from './GraphQLParser';
import { ArgumentsContext } from './GraphQLParser';
import { ArgumentContext } from './GraphQLParser';
import { FragmentSpreadContext } from './GraphQLParser';
import { InlineFragmentContext } from './GraphQLParser';
import { FragmentDefinitionContext } from './GraphQLParser';
import { FragmentNameContext } from './GraphQLParser';
import { TypeConditionContext } from './GraphQLParser';
import { ValueContext } from './GraphQLParser';
import { ObjectFieldContext } from './GraphQLParser';
import { VariableDefinitionsContext } from './GraphQLParser';
import { VariableDefinitionContext } from './GraphQLParser';
import { VariableContext } from './GraphQLParser';
import { DefaultValueContext } from './GraphQLParser';
import { TypeContext } from './GraphQLParser';
import { NamedTypeContext } from './GraphQLParser';
import { ListTypeContext } from './GraphQLParser';
import { NonNullTypeContext } from './GraphQLParser';
import { DirectivesContext } from './GraphQLParser';
import { DirectiveContext } from './GraphQLParser';
import { TypeSystemDefinitionContext } from './GraphQLParser';
import { TypeSystemExtensionContext } from './GraphQLParser';
import { SchemaDefinitionContext } from './GraphQLParser';
import { SchemaExtensionContext } from './GraphQLParser';
import { OperationTypeDefinitionContext } from './GraphQLParser';
import { DescriptionContext } from './GraphQLParser';
import { TypeDefinitionContext } from './GraphQLParser';
import { TypeExtensionContext } from './GraphQLParser';
import { ScalarTypeDefinitionContext } from './GraphQLParser';
import { ScalarTypeExtensionContext } from './GraphQLParser';
import { ObjectTypeDefinitionContext } from './GraphQLParser';
import { ObjectTypeExtensionContext } from './GraphQLParser';
import { ImplementsInterfacesContext } from './GraphQLParser';
import { FieldsDefinitionContext } from './GraphQLParser';
import { FieldDefinitionContext } from './GraphQLParser';
import { ArgumentsDefinitionContext } from './GraphQLParser';
import { InputValueDefinitionContext } from './GraphQLParser';
import { InterfaceTypeDefinitionContext } from './GraphQLParser';
import { InterfaceTypeExtensionContext } from './GraphQLParser';
import { UnionTypeDefinitionContext } from './GraphQLParser';
import { UnionMemberTypesContext } from './GraphQLParser';
import { UnionTypeExtensionContext } from './GraphQLParser';
import { EnumTypeDefinitionContext } from './GraphQLParser';
import { EnumValuesDefinitionContext } from './GraphQLParser';
import { EnumValueDefinitionContext } from './GraphQLParser';
import { EnumTypeExtensionContext } from './GraphQLParser';
import { InputObjectTypeDefinitionContext } from './GraphQLParser';
import { InputFieldsDefinitionContext } from './GraphQLParser';
import { InputObjectTypeExtensionContext } from './GraphQLParser';
import { DirectiveDefinitionContext } from './GraphQLParser';
import { DirectiveLocationsContext } from './GraphQLParser';
import { DirectiveLocationContext } from './GraphQLParser';
import { ExecutableDirectiveLocationContext } from './GraphQLParser';
import { TypeSystemDirectiveLocationContext } from './GraphQLParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `GraphQLParser`.
 */
export interface GraphQLListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by the `selectionOnlyOperationDefinition`
   * labeled alternative in `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  enterSelectionOnlyOperationDefinition?: (
    ctx: SelectionOnlyOperationDefinitionContext
  ) => void;
  /**
   * Exit a parse tree produced by the `selectionOnlyOperationDefinition`
   * labeled alternative in `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  exitSelectionOnlyOperationDefinition?: (
    ctx: SelectionOnlyOperationDefinitionContext
  ) => void;

  /**
   * Enter a parse tree produced by the `fullOperationDefinition`
   * labeled alternative in `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  enterFullOperationDefinition?: (ctx: FullOperationDefinitionContext) => void;
  /**
   * Exit a parse tree produced by the `fullOperationDefinition`
   * labeled alternative in `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  exitFullOperationDefinition?: (ctx: FullOperationDefinitionContext) => void;

  /**
   * Enter a parse tree produced by the `fragmentSpreadSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  enterFragmentSpreadSelection?: (ctx: FragmentSpreadSelectionContext) => void;
  /**
   * Exit a parse tree produced by the `fragmentSpreadSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  exitFragmentSpreadSelection?: (ctx: FragmentSpreadSelectionContext) => void;

  /**
   * Enter a parse tree produced by the `fieldSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  enterFieldSelection?: (ctx: FieldSelectionContext) => void;
  /**
   * Exit a parse tree produced by the `fieldSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  exitFieldSelection?: (ctx: FieldSelectionContext) => void;

  /**
   * Enter a parse tree produced by the `inlineFragmentSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  enterInlineFragmentSelection?: (ctx: InlineFragmentSelectionContext) => void;
  /**
   * Exit a parse tree produced by the `inlineFragmentSelection`
   * labeled alternative in `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  exitInlineFragmentSelection?: (ctx: InlineFragmentSelectionContext) => void;

  /**
   * Enter a parse tree produced by the `inputObjectTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  enterInputObjectTypeExtensionWithDirectives?: (
    ctx: InputObjectTypeExtensionWithDirectivesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `inputObjectTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  exitInputObjectTypeExtensionWithDirectives?: (
    ctx: InputObjectTypeExtensionWithDirectivesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `inputObjectTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  enterInputObjectTypeExtensionWithFields?: (
    ctx: InputObjectTypeExtensionWithFieldsContext
  ) => void;
  /**
   * Exit a parse tree produced by the `inputObjectTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  exitInputObjectTypeExtensionWithFields?: (
    ctx: InputObjectTypeExtensionWithFieldsContext
  ) => void;

  /**
   * Enter a parse tree produced by the `interfaceTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  enterInterfaceTypeExtensionWithFields?: (
    ctx: InterfaceTypeExtensionWithFieldsContext
  ) => void;
  /**
   * Exit a parse tree produced by the `interfaceTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  exitInterfaceTypeExtensionWithFields?: (
    ctx: InterfaceTypeExtensionWithFieldsContext
  ) => void;

  /**
   * Enter a parse tree produced by the `interfaceTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  enterInterfaceTypeExtensionWithDirectives?: (
    ctx: InterfaceTypeExtensionWithDirectivesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `interfaceTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  exitInterfaceTypeExtensionWithDirectives?: (
    ctx: InterfaceTypeExtensionWithDirectivesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `objectTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  enterObjectTypeExtensionWithDirectives?: (
    ctx: ObjectTypeExtensionWithDirectivesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `objectTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  exitObjectTypeExtensionWithDirectives?: (
    ctx: ObjectTypeExtensionWithDirectivesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `objectTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  enterObjectTypeExtensionWithFields?: (
    ctx: ObjectTypeExtensionWithFieldsContext
  ) => void;
  /**
   * Exit a parse tree produced by the `objectTypeExtensionWithFields`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  exitObjectTypeExtensionWithFields?: (
    ctx: ObjectTypeExtensionWithFieldsContext
  ) => void;

  /**
   * Enter a parse tree produced by the `objectTypeExtensionWithInterfaces`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  enterObjectTypeExtensionWithInterfaces?: (
    ctx: ObjectTypeExtensionWithInterfacesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `objectTypeExtensionWithInterfaces`
   * labeled alternative in `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  exitObjectTypeExtensionWithInterfaces?: (
    ctx: ObjectTypeExtensionWithInterfacesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `unionTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  enterUnionTypeExtensionWithDirectives?: (
    ctx: UnionTypeExtensionWithDirectivesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `unionTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  exitUnionTypeExtensionWithDirectives?: (
    ctx: UnionTypeExtensionWithDirectivesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `unionTypeExtensionWithMembers`
   * labeled alternative in `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  enterUnionTypeExtensionWithMembers?: (
    ctx: UnionTypeExtensionWithMembersContext
  ) => void;
  /**
   * Exit a parse tree produced by the `unionTypeExtensionWithMembers`
   * labeled alternative in `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  exitUnionTypeExtensionWithMembers?: (
    ctx: UnionTypeExtensionWithMembersContext
  ) => void;

  /**
   * Enter a parse tree produced by the `schemaExtensionWithoutOperations`
   * labeled alternative in `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  enterSchemaExtensionWithoutOperations?: (
    ctx: SchemaExtensionWithoutOperationsContext
  ) => void;
  /**
   * Exit a parse tree produced by the `schemaExtensionWithoutOperations`
   * labeled alternative in `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  exitSchemaExtensionWithoutOperations?: (
    ctx: SchemaExtensionWithoutOperationsContext
  ) => void;

  /**
   * Enter a parse tree produced by the `schemaExtensionWithOperations`
   * labeled alternative in `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  enterSchemaExtensionWithOperations?: (
    ctx: SchemaExtensionWithOperationsContext
  ) => void;
  /**
   * Exit a parse tree produced by the `schemaExtensionWithOperations`
   * labeled alternative in `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  exitSchemaExtensionWithOperations?: (
    ctx: SchemaExtensionWithOperationsContext
  ) => void;

  /**
   * Enter a parse tree produced by the `stringValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterStringValue?: (ctx: StringValueContext) => void;
  /**
   * Exit a parse tree produced by the `stringValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitStringValue?: (ctx: StringValueContext) => void;

  /**
   * Enter a parse tree produced by the `nonEmptyObjectValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterNonEmptyObjectValue?: (ctx: NonEmptyObjectValueContext) => void;
  /**
   * Exit a parse tree produced by the `nonEmptyObjectValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitNonEmptyObjectValue?: (ctx: NonEmptyObjectValueContext) => void;

  /**
   * Enter a parse tree produced by the `enumValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Exit a parse tree produced by the `enumValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitEnumValue?: (ctx: EnumValueContext) => void;

  /**
   * Enter a parse tree produced by the `variableValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterVariableValue?: (ctx: VariableValueContext) => void;
  /**
   * Exit a parse tree produced by the `variableValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitVariableValue?: (ctx: VariableValueContext) => void;

  /**
   * Enter a parse tree produced by the `intValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterIntValue?: (ctx: IntValueContext) => void;
  /**
   * Exit a parse tree produced by the `intValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitIntValue?: (ctx: IntValueContext) => void;

  /**
   * Enter a parse tree produced by the `emptyListValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterEmptyListValue?: (ctx: EmptyListValueContext) => void;
  /**
   * Exit a parse tree produced by the `emptyListValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitEmptyListValue?: (ctx: EmptyListValueContext) => void;

  /**
   * Enter a parse tree produced by the `floatValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterFloatValue?: (ctx: FloatValueContext) => void;
  /**
   * Exit a parse tree produced by the `floatValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitFloatValue?: (ctx: FloatValueContext) => void;

  /**
   * Enter a parse tree produced by the `booleanValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterBooleanValue?: (ctx: BooleanValueContext) => void;
  /**
   * Exit a parse tree produced by the `booleanValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitBooleanValue?: (ctx: BooleanValueContext) => void;

  /**
   * Enter a parse tree produced by the `nonEmptyListValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterNonEmptyListValue?: (ctx: NonEmptyListValueContext) => void;
  /**
   * Exit a parse tree produced by the `nonEmptyListValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitNonEmptyListValue?: (ctx: NonEmptyListValueContext) => void;

  /**
   * Enter a parse tree produced by the `nullValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterNullValue?: (ctx: NullValueContext) => void;
  /**
   * Exit a parse tree produced by the `nullValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitNullValue?: (ctx: NullValueContext) => void;

  /**
   * Enter a parse tree produced by the `emptyObjectValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterEmptyObjectValue?: (ctx: EmptyObjectValueContext) => void;
  /**
   * Exit a parse tree produced by the `emptyObjectValue`
   * labeled alternative in `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitEmptyObjectValue?: (ctx: EmptyObjectValueContext) => void;

  /**
   * Enter a parse tree produced by the `enumTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  enterEnumTypeExtensionWithDirectives?: (
    ctx: EnumTypeExtensionWithDirectivesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `enumTypeExtensionWithDirectives`
   * labeled alternative in `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  exitEnumTypeExtensionWithDirectives?: (
    ctx: EnumTypeExtensionWithDirectivesContext
  ) => void;

  /**
   * Enter a parse tree produced by the `enumTypeExtensionWithValues`
   * labeled alternative in `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  enterEnumTypeExtensionWithValues?: (
    ctx: EnumTypeExtensionWithValuesContext
  ) => void;
  /**
   * Exit a parse tree produced by the `enumTypeExtensionWithValues`
   * labeled alternative in `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  exitEnumTypeExtensionWithValues?: (
    ctx: EnumTypeExtensionWithValuesContext
  ) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.document`.
   * @param ctx the parse tree
   */
  enterDocument?: (ctx: DocumentContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.document`.
   * @param ctx the parse tree
   */
  exitDocument?: (ctx: DocumentContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.definition`.
   * @param ctx the parse tree
   */
  enterDefinition?: (ctx: DefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.definition`.
   * @param ctx the parse tree
   */
  exitDefinition?: (ctx: DefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.executableDefinition`.
   * @param ctx the parse tree
   */
  enterExecutableDefinition?: (ctx: ExecutableDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.executableDefinition`.
   * @param ctx the parse tree
   */
  exitExecutableDefinition?: (ctx: ExecutableDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  enterOperationDefinition?: (ctx: OperationDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.operationDefinition`.
   * @param ctx the parse tree
   */
  exitOperationDefinition?: (ctx: OperationDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.operationType`.
   * @param ctx the parse tree
   */
  enterOperationType?: (ctx: OperationTypeContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.operationType`.
   * @param ctx the parse tree
   */
  exitOperationType?: (ctx: OperationTypeContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.selectionSet`.
   * @param ctx the parse tree
   */
  enterSelectionSet?: (ctx: SelectionSetContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.selectionSet`.
   * @param ctx the parse tree
   */
  exitSelectionSet?: (ctx: SelectionSetContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  enterSelection?: (ctx: SelectionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.selection`.
   * @param ctx the parse tree
   */
  exitSelection?: (ctx: SelectionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.field`.
   * @param ctx the parse tree
   */
  enterField?: (ctx: FieldContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.field`.
   * @param ctx the parse tree
   */
  exitField?: (ctx: FieldContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.alias`.
   * @param ctx the parse tree
   */
  enterAlias?: (ctx: AliasContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.alias`.
   * @param ctx the parse tree
   */
  exitAlias?: (ctx: AliasContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.arguments`.
   * @param ctx the parse tree
   */
  enterArguments?: (ctx: ArgumentsContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.arguments`.
   * @param ctx the parse tree
   */
  exitArguments?: (ctx: ArgumentsContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.argument`.
   * @param ctx the parse tree
   */
  enterArgument?: (ctx: ArgumentContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.argument`.
   * @param ctx the parse tree
   */
  exitArgument?: (ctx: ArgumentContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.fragmentSpread`.
   * @param ctx the parse tree
   */
  enterFragmentSpread?: (ctx: FragmentSpreadContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.fragmentSpread`.
   * @param ctx the parse tree
   */
  exitFragmentSpread?: (ctx: FragmentSpreadContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.inlineFragment`.
   * @param ctx the parse tree
   */
  enterInlineFragment?: (ctx: InlineFragmentContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.inlineFragment`.
   * @param ctx the parse tree
   */
  exitInlineFragment?: (ctx: InlineFragmentContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.fragmentDefinition`.
   * @param ctx the parse tree
   */
  enterFragmentDefinition?: (ctx: FragmentDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.fragmentDefinition`.
   * @param ctx the parse tree
   */
  exitFragmentDefinition?: (ctx: FragmentDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.fragmentName`.
   * @param ctx the parse tree
   */
  enterFragmentName?: (ctx: FragmentNameContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.fragmentName`.
   * @param ctx the parse tree
   */
  exitFragmentName?: (ctx: FragmentNameContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeCondition`.
   * @param ctx the parse tree
   */
  enterTypeCondition?: (ctx: TypeConditionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeCondition`.
   * @param ctx the parse tree
   */
  exitTypeCondition?: (ctx: TypeConditionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  enterValue?: (ctx: ValueContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.value`.
   * @param ctx the parse tree
   */
  exitValue?: (ctx: ValueContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.objectField`.
   * @param ctx the parse tree
   */
  enterObjectField?: (ctx: ObjectFieldContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.objectField`.
   * @param ctx the parse tree
   */
  exitObjectField?: (ctx: ObjectFieldContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.variableDefinitions`.
   * @param ctx the parse tree
   */
  enterVariableDefinitions?: (ctx: VariableDefinitionsContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.variableDefinitions`.
   * @param ctx the parse tree
   */
  exitVariableDefinitions?: (ctx: VariableDefinitionsContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.variableDefinition`.
   * @param ctx the parse tree
   */
  enterVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.variableDefinition`.
   * @param ctx the parse tree
   */
  exitVariableDefinition?: (ctx: VariableDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.variable`.
   * @param ctx the parse tree
   */
  enterVariable?: (ctx: VariableContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.variable`.
   * @param ctx the parse tree
   */
  exitVariable?: (ctx: VariableContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.defaultValue`.
   * @param ctx the parse tree
   */
  enterDefaultValue?: (ctx: DefaultValueContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.defaultValue`.
   * @param ctx the parse tree
   */
  exitDefaultValue?: (ctx: DefaultValueContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.namedType`.
   * @param ctx the parse tree
   */
  enterNamedType?: (ctx: NamedTypeContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.namedType`.
   * @param ctx the parse tree
   */
  exitNamedType?: (ctx: NamedTypeContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.listType`.
   * @param ctx the parse tree
   */
  enterListType?: (ctx: ListTypeContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.listType`.
   * @param ctx the parse tree
   */
  exitListType?: (ctx: ListTypeContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.nonNullType`.
   * @param ctx the parse tree
   */
  enterNonNullType?: (ctx: NonNullTypeContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.nonNullType`.
   * @param ctx the parse tree
   */
  exitNonNullType?: (ctx: NonNullTypeContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.directives`.
   * @param ctx the parse tree
   */
  enterDirectives?: (ctx: DirectivesContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.directives`.
   * @param ctx the parse tree
   */
  exitDirectives?: (ctx: DirectivesContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.directive`.
   * @param ctx the parse tree
   */
  enterDirective?: (ctx: DirectiveContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.directive`.
   * @param ctx the parse tree
   */
  exitDirective?: (ctx: DirectiveContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeSystemDefinition`.
   * @param ctx the parse tree
   */
  enterTypeSystemDefinition?: (ctx: TypeSystemDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeSystemDefinition`.
   * @param ctx the parse tree
   */
  exitTypeSystemDefinition?: (ctx: TypeSystemDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeSystemExtension`.
   * @param ctx the parse tree
   */
  enterTypeSystemExtension?: (ctx: TypeSystemExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeSystemExtension`.
   * @param ctx the parse tree
   */
  exitTypeSystemExtension?: (ctx: TypeSystemExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.schemaDefinition`.
   * @param ctx the parse tree
   */
  enterSchemaDefinition?: (ctx: SchemaDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.schemaDefinition`.
   * @param ctx the parse tree
   */
  exitSchemaDefinition?: (ctx: SchemaDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  enterSchemaExtension?: (ctx: SchemaExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.schemaExtension`.
   * @param ctx the parse tree
   */
  exitSchemaExtension?: (ctx: SchemaExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.operationTypeDefinition`.
   * @param ctx the parse tree
   */
  enterOperationTypeDefinition?: (ctx: OperationTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.operationTypeDefinition`.
   * @param ctx the parse tree
   */
  exitOperationTypeDefinition?: (ctx: OperationTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.description`.
   * @param ctx the parse tree
   */
  enterDescription?: (ctx: DescriptionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.description`.
   * @param ctx the parse tree
   */
  exitDescription?: (ctx: DescriptionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeDefinition`.
   * @param ctx the parse tree
   */
  enterTypeDefinition?: (ctx: TypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeDefinition`.
   * @param ctx the parse tree
   */
  exitTypeDefinition?: (ctx: TypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeExtension`.
   * @param ctx the parse tree
   */
  enterTypeExtension?: (ctx: TypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeExtension`.
   * @param ctx the parse tree
   */
  exitTypeExtension?: (ctx: TypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.scalarTypeDefinition`.
   * @param ctx the parse tree
   */
  enterScalarTypeDefinition?: (ctx: ScalarTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.scalarTypeDefinition`.
   * @param ctx the parse tree
   */
  exitScalarTypeDefinition?: (ctx: ScalarTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.scalarTypeExtension`.
   * @param ctx the parse tree
   */
  enterScalarTypeExtension?: (ctx: ScalarTypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.scalarTypeExtension`.
   * @param ctx the parse tree
   */
  exitScalarTypeExtension?: (ctx: ScalarTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.objectTypeDefinition`.
   * @param ctx the parse tree
   */
  enterObjectTypeDefinition?: (ctx: ObjectTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.objectTypeDefinition`.
   * @param ctx the parse tree
   */
  exitObjectTypeDefinition?: (ctx: ObjectTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  enterObjectTypeExtension?: (ctx: ObjectTypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.objectTypeExtension`.
   * @param ctx the parse tree
   */
  exitObjectTypeExtension?: (ctx: ObjectTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.implementsInterfaces`.
   * @param ctx the parse tree
   */
  enterImplementsInterfaces?: (ctx: ImplementsInterfacesContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.implementsInterfaces`.
   * @param ctx the parse tree
   */
  exitImplementsInterfaces?: (ctx: ImplementsInterfacesContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.fieldsDefinition`.
   * @param ctx the parse tree
   */
  enterFieldsDefinition?: (ctx: FieldsDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.fieldsDefinition`.
   * @param ctx the parse tree
   */
  exitFieldsDefinition?: (ctx: FieldsDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.fieldDefinition`.
   * @param ctx the parse tree
   */
  enterFieldDefinition?: (ctx: FieldDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.fieldDefinition`.
   * @param ctx the parse tree
   */
  exitFieldDefinition?: (ctx: FieldDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.argumentsDefinition`.
   * @param ctx the parse tree
   */
  enterArgumentsDefinition?: (ctx: ArgumentsDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.argumentsDefinition`.
   * @param ctx the parse tree
   */
  exitArgumentsDefinition?: (ctx: ArgumentsDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.inputValueDefinition`.
   * @param ctx the parse tree
   */
  enterInputValueDefinition?: (ctx: InputValueDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.inputValueDefinition`.
   * @param ctx the parse tree
   */
  exitInputValueDefinition?: (ctx: InputValueDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.interfaceTypeDefinition`.
   * @param ctx the parse tree
   */
  enterInterfaceTypeDefinition?: (ctx: InterfaceTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.interfaceTypeDefinition`.
   * @param ctx the parse tree
   */
  exitInterfaceTypeDefinition?: (ctx: InterfaceTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  enterInterfaceTypeExtension?: (ctx: InterfaceTypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.interfaceTypeExtension`.
   * @param ctx the parse tree
   */
  exitInterfaceTypeExtension?: (ctx: InterfaceTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.unionTypeDefinition`.
   * @param ctx the parse tree
   */
  enterUnionTypeDefinition?: (ctx: UnionTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.unionTypeDefinition`.
   * @param ctx the parse tree
   */
  exitUnionTypeDefinition?: (ctx: UnionTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.unionMemberTypes`.
   * @param ctx the parse tree
   */
  enterUnionMemberTypes?: (ctx: UnionMemberTypesContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.unionMemberTypes`.
   * @param ctx the parse tree
   */
  exitUnionMemberTypes?: (ctx: UnionMemberTypesContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  enterUnionTypeExtension?: (ctx: UnionTypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.unionTypeExtension`.
   * @param ctx the parse tree
   */
  exitUnionTypeExtension?: (ctx: UnionTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.enumTypeDefinition`.
   * @param ctx the parse tree
   */
  enterEnumTypeDefinition?: (ctx: EnumTypeDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.enumTypeDefinition`.
   * @param ctx the parse tree
   */
  exitEnumTypeDefinition?: (ctx: EnumTypeDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.enumValuesDefinition`.
   * @param ctx the parse tree
   */
  enterEnumValuesDefinition?: (ctx: EnumValuesDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.enumValuesDefinition`.
   * @param ctx the parse tree
   */
  exitEnumValuesDefinition?: (ctx: EnumValuesDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.enumValueDefinition`.
   * @param ctx the parse tree
   */
  enterEnumValueDefinition?: (ctx: EnumValueDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.enumValueDefinition`.
   * @param ctx the parse tree
   */
  exitEnumValueDefinition?: (ctx: EnumValueDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  enterEnumTypeExtension?: (ctx: EnumTypeExtensionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.enumTypeExtension`.
   * @param ctx the parse tree
   */
  exitEnumTypeExtension?: (ctx: EnumTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.inputObjectTypeDefinition`.
   * @param ctx the parse tree
   */
  enterInputObjectTypeDefinition?: (
    ctx: InputObjectTypeDefinitionContext
  ) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.inputObjectTypeDefinition`.
   * @param ctx the parse tree
   */
  exitInputObjectTypeDefinition?: (
    ctx: InputObjectTypeDefinitionContext
  ) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.inputFieldsDefinition`.
   * @param ctx the parse tree
   */
  enterInputFieldsDefinition?: (ctx: InputFieldsDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.inputFieldsDefinition`.
   * @param ctx the parse tree
   */
  exitInputFieldsDefinition?: (ctx: InputFieldsDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  enterInputObjectTypeExtension?: (
    ctx: InputObjectTypeExtensionContext
  ) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.inputObjectTypeExtension`.
   * @param ctx the parse tree
   */
  exitInputObjectTypeExtension?: (ctx: InputObjectTypeExtensionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.directiveDefinition`.
   * @param ctx the parse tree
   */
  enterDirectiveDefinition?: (ctx: DirectiveDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.directiveDefinition`.
   * @param ctx the parse tree
   */
  exitDirectiveDefinition?: (ctx: DirectiveDefinitionContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.directiveLocations`.
   * @param ctx the parse tree
   */
  enterDirectiveLocations?: (ctx: DirectiveLocationsContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.directiveLocations`.
   * @param ctx the parse tree
   */
  exitDirectiveLocations?: (ctx: DirectiveLocationsContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.directiveLocation`.
   * @param ctx the parse tree
   */
  enterDirectiveLocation?: (ctx: DirectiveLocationContext) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.directiveLocation`.
   * @param ctx the parse tree
   */
  exitDirectiveLocation?: (ctx: DirectiveLocationContext) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.executableDirectiveLocation`.
   * @param ctx the parse tree
   */
  enterExecutableDirectiveLocation?: (
    ctx: ExecutableDirectiveLocationContext
  ) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.executableDirectiveLocation`.
   * @param ctx the parse tree
   */
  exitExecutableDirectiveLocation?: (
    ctx: ExecutableDirectiveLocationContext
  ) => void;

  /**
   * Enter a parse tree produced by `GraphQLParser.typeSystemDirectiveLocation`.
   * @param ctx the parse tree
   */
  enterTypeSystemDirectiveLocation?: (
    ctx: TypeSystemDirectiveLocationContext
  ) => void;
  /**
   * Exit a parse tree produced by `GraphQLParser.typeSystemDirectiveLocation`.
   * @param ctx the parse tree
   */
  exitTypeSystemDirectiveLocation?: (
    ctx: TypeSystemDirectiveLocationContext
  ) => void;
}
