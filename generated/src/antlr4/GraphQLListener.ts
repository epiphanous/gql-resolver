// Generated from src/antlr4/GraphQL.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { SelectionOnlyOperationDefinitionContext } from './GraphQLParser';
import { FullOperationDefinitionContext } from './GraphQLParser';
import { FragmentSpreadSelectionContext } from './GraphQLParser';
import { FieldSelectionContext } from './GraphQLParser';
import { InlineFragmentSelectionContext } from './GraphQLParser';
import { StringValueContext } from './GraphQLParser';
import { EnumValueValueContext } from './GraphQLParser';
import { BooleanValueContext } from './GraphQLParser';
import { NumberValueContext } from './GraphQLParser';
import { ArrayValueContext } from './GraphQLParser';
import { ArgumentDirectiveContext } from './GraphQLParser';
import { NameDirectiveContext } from './GraphQLParser';
import { ValueDirectiveContext } from './GraphQLParser';
import { DocumentContext } from './GraphQLParser';
import { DefinitionContext } from './GraphQLParser';
import { OperationDefinitionContext } from './GraphQLParser';
import { SelectionSetContext } from './GraphQLParser';
import { OperationTypeContext } from './GraphQLParser';
import { SelectionContext } from './GraphQLParser';
import { FieldContext } from './GraphQLParser';
import { FieldNameContext } from './GraphQLParser';
import { AliasContext } from './GraphQLParser';
import { ArgumentsContext } from './GraphQLParser';
import { ArgumentContext } from './GraphQLParser';
import { FragmentSpreadContext } from './GraphQLParser';
import { InlineFragmentContext } from './GraphQLParser';
import { FragmentDefinitionContext } from './GraphQLParser';
import { FragmentNameContext } from './GraphQLParser';
import { TypeSystemDefinitionContext } from './GraphQLParser';
import { TypeDefinitionContext } from './GraphQLParser';
import { ScalarTypeContext } from './GraphQLParser';
import { ScalarTypeDefinitionContext } from './GraphQLParser';
import { ObjectTypeContext } from './GraphQLParser';
import { ObjectTypeDefinitionContext } from './GraphQLParser';
import { ImplementsInterfacesContext } from './GraphQLParser';
import { ImplementsListContext } from './GraphQLParser';
import { FieldDefinitionContext } from './GraphQLParser';
import { DeprecatedContext } from './GraphQLParser';
import { DeprecationReasonContext } from './GraphQLParser';
import { ArgumentsDefinitionContext } from './GraphQLParser';
import { InputValueDefinitionContext } from './GraphQLParser';
import { InterfaceTypeContext } from './GraphQLParser';
import { InterfaceTypeDefinitionContext } from './GraphQLParser';
import { UnionTypeContext } from './GraphQLParser';
import { UnionTypeDefinitionContext } from './GraphQLParser';
import { UnionMembersContext } from './GraphQLParser';
import { ValueContext } from './GraphQLParser';
import { EnumTypeContext } from './GraphQLParser';
import { EnumTypeDefinitionContext } from './GraphQLParser';
import { EnumValueDefinitionContext } from './GraphQLParser';
import { EnumValueContext } from './GraphQLParser';
import { InputObjectTypeDefinitionContext } from './GraphQLParser';
import { TypeExtensionDefinitionContext } from './GraphQLParser';
import { DirectiveDefinitionContext } from './GraphQLParser';
import { DirectiveLocationsContext } from './GraphQLParser';
import { DirectivesContext } from './GraphQLParser';
import { DirectiveContext } from './GraphQLParser';
import { TypeConditionContext } from './GraphQLParser';
import { VariableDefinitionsContext } from './GraphQLParser';
import { VariableDefinitionContext } from './GraphQLParser';
import { VariableContext } from './GraphQLParser';
import { DefaultValueContext } from './GraphQLParser';
import { ValueOrVariableContext } from './GraphQLParser';
import { TypeContext } from './GraphQLParser';
import { TypeNameContext } from './GraphQLParser';
import { ListTypeContext } from './GraphQLParser';
import { NonNullTypeContext } from './GraphQLParser';
import { ArrayContext } from './GraphQLParser';
import { SchemaDefinitionContext } from './GraphQLParser';
import { SchemaQueryDefinitionContext } from './GraphQLParser';
import { SchemaMutationDefinitionContext } from './GraphQLParser';
import { SchemaSubscriptionDefinitionContext } from './GraphQLParser';


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
	enterSelectionOnlyOperationDefinition?: (ctx: SelectionOnlyOperationDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by the `selectionOnlyOperationDefinition`
	 * labeled alternative in `GraphQLParser.operationDefinition`.
	 * @param ctx the parse tree
	 */
	exitSelectionOnlyOperationDefinition?: (ctx: SelectionOnlyOperationDefinitionContext) => void;

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
	 * Enter a parse tree produced by the `enumValueValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	enterEnumValueValue?: (ctx: EnumValueValueContext) => void;
	/**
	 * Exit a parse tree produced by the `enumValueValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	exitEnumValueValue?: (ctx: EnumValueValueContext) => void;

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
	 * Enter a parse tree produced by the `numberValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	enterNumberValue?: (ctx: NumberValueContext) => void;
	/**
	 * Exit a parse tree produced by the `numberValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	exitNumberValue?: (ctx: NumberValueContext) => void;

	/**
	 * Enter a parse tree produced by the `arrayValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	enterArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Exit a parse tree produced by the `arrayValue`
	 * labeled alternative in `GraphQLParser.value`.
	 * @param ctx the parse tree
	 */
	exitArrayValue?: (ctx: ArrayValueContext) => void;

	/**
	 * Enter a parse tree produced by the `argumentDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	enterArgumentDirective?: (ctx: ArgumentDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by the `argumentDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	exitArgumentDirective?: (ctx: ArgumentDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by the `nameDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	enterNameDirective?: (ctx: NameDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by the `nameDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	exitNameDirective?: (ctx: NameDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by the `valueDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	enterValueDirective?: (ctx: ValueDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by the `valueDirective`
	 * labeled alternative in `GraphQLParser.directive`.
	 * @param ctx the parse tree
	 */
	exitValueDirective?: (ctx: ValueDirectiveContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.fieldName`.
	 * @param ctx the parse tree
	 */
	enterFieldName?: (ctx: FieldNameContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.fieldName`.
	 * @param ctx the parse tree
	 */
	exitFieldName?: (ctx: FieldNameContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.scalarType`.
	 * @param ctx the parse tree
	 */
	enterScalarType?: (ctx: ScalarTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.scalarType`.
	 * @param ctx the parse tree
	 */
	exitScalarType?: (ctx: ScalarTypeContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.objectType`.
	 * @param ctx the parse tree
	 */
	enterObjectType?: (ctx: ObjectTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.objectType`.
	 * @param ctx the parse tree
	 */
	exitObjectType?: (ctx: ObjectTypeContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.implementsList`.
	 * @param ctx the parse tree
	 */
	enterImplementsList?: (ctx: ImplementsListContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.implementsList`.
	 * @param ctx the parse tree
	 */
	exitImplementsList?: (ctx: ImplementsListContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.deprecated`.
	 * @param ctx the parse tree
	 */
	enterDeprecated?: (ctx: DeprecatedContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.deprecated`.
	 * @param ctx the parse tree
	 */
	exitDeprecated?: (ctx: DeprecatedContext) => void;

	/**
	 * Enter a parse tree produced by `GraphQLParser.deprecationReason`.
	 * @param ctx the parse tree
	 */
	enterDeprecationReason?: (ctx: DeprecationReasonContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.deprecationReason`.
	 * @param ctx the parse tree
	 */
	exitDeprecationReason?: (ctx: DeprecationReasonContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.interfaceType`.
	 * @param ctx the parse tree
	 */
	enterInterfaceType?: (ctx: InterfaceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.interfaceType`.
	 * @param ctx the parse tree
	 */
	exitInterfaceType?: (ctx: InterfaceTypeContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.unionType`.
	 * @param ctx the parse tree
	 */
	enterUnionType?: (ctx: UnionTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.unionType`.
	 * @param ctx the parse tree
	 */
	exitUnionType?: (ctx: UnionTypeContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.unionMembers`.
	 * @param ctx the parse tree
	 */
	enterUnionMembers?: (ctx: UnionMembersContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.unionMembers`.
	 * @param ctx the parse tree
	 */
	exitUnionMembers?: (ctx: UnionMembersContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.enumType`.
	 * @param ctx the parse tree
	 */
	enterEnumType?: (ctx: EnumTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.enumType`.
	 * @param ctx the parse tree
	 */
	exitEnumType?: (ctx: EnumTypeContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.enumValue`.
	 * @param ctx the parse tree
	 */
	enterEnumValue?: (ctx: EnumValueContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.enumValue`.
	 * @param ctx the parse tree
	 */
	exitEnumValue?: (ctx: EnumValueContext) => void;

	/**
	 * Enter a parse tree produced by `GraphQLParser.inputObjectTypeDefinition`.
	 * @param ctx the parse tree
	 */
	enterInputObjectTypeDefinition?: (ctx: InputObjectTypeDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.inputObjectTypeDefinition`.
	 * @param ctx the parse tree
	 */
	exitInputObjectTypeDefinition?: (ctx: InputObjectTypeDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `GraphQLParser.typeExtensionDefinition`.
	 * @param ctx the parse tree
	 */
	enterTypeExtensionDefinition?: (ctx: TypeExtensionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.typeExtensionDefinition`.
	 * @param ctx the parse tree
	 */
	exitTypeExtensionDefinition?: (ctx: TypeExtensionDefinitionContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.valueOrVariable`.
	 * @param ctx the parse tree
	 */
	enterValueOrVariable?: (ctx: ValueOrVariableContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.valueOrVariable`.
	 * @param ctx the parse tree
	 */
	exitValueOrVariable?: (ctx: ValueOrVariableContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

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
	 * Enter a parse tree produced by `GraphQLParser.schemaQueryDefinition`.
	 * @param ctx the parse tree
	 */
	enterSchemaQueryDefinition?: (ctx: SchemaQueryDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.schemaQueryDefinition`.
	 * @param ctx the parse tree
	 */
	exitSchemaQueryDefinition?: (ctx: SchemaQueryDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `GraphQLParser.schemaMutationDefinition`.
	 * @param ctx the parse tree
	 */
	enterSchemaMutationDefinition?: (ctx: SchemaMutationDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.schemaMutationDefinition`.
	 * @param ctx the parse tree
	 */
	exitSchemaMutationDefinition?: (ctx: SchemaMutationDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `GraphQLParser.schemaSubscriptionDefinition`.
	 * @param ctx the parse tree
	 */
	enterSchemaSubscriptionDefinition?: (ctx: SchemaSubscriptionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `GraphQLParser.schemaSubscriptionDefinition`.
	 * @param ctx the parse tree
	 */
	exitSchemaSubscriptionDefinition?: (ctx: SchemaSubscriptionDefinitionContext) => void;
}

