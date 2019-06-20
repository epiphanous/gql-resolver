// Generated from /Users/milanvelebit/work/gql-resolver/src/antlr4/GraphQL.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link GraphQLParser}.
 */
public interface GraphQLListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#document}.
	 * @param ctx the parse tree
	 */
	void enterDocument(GraphQLParser.DocumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#document}.
	 * @param ctx the parse tree
	 */
	void exitDocument(GraphQLParser.DocumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#definition}.
	 * @param ctx the parse tree
	 */
	void enterDefinition(GraphQLParser.DefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#definition}.
	 * @param ctx the parse tree
	 */
	void exitDefinition(GraphQLParser.DefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code selectionOnlyOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 */
	void enterSelectionOnlyOperationDefinition(GraphQLParser.SelectionOnlyOperationDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code selectionOnlyOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 */
	void exitSelectionOnlyOperationDefinition(GraphQLParser.SelectionOnlyOperationDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code fullOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 */
	void enterFullOperationDefinition(GraphQLParser.FullOperationDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code fullOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 */
	void exitFullOperationDefinition(GraphQLParser.FullOperationDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#selectionSet}.
	 * @param ctx the parse tree
	 */
	void enterSelectionSet(GraphQLParser.SelectionSetContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#selectionSet}.
	 * @param ctx the parse tree
	 */
	void exitSelectionSet(GraphQLParser.SelectionSetContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#operationType}.
	 * @param ctx the parse tree
	 */
	void enterOperationType(GraphQLParser.OperationTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#operationType}.
	 * @param ctx the parse tree
	 */
	void exitOperationType(GraphQLParser.OperationTypeContext ctx);
	/**
	 * Enter a parse tree produced by the {@code fieldSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void enterFieldSelection(GraphQLParser.FieldSelectionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code fieldSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void exitFieldSelection(GraphQLParser.FieldSelectionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code fragmentSpreadSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void enterFragmentSpreadSelection(GraphQLParser.FragmentSpreadSelectionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code fragmentSpreadSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void exitFragmentSpreadSelection(GraphQLParser.FragmentSpreadSelectionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code inlineFragmentSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void enterInlineFragmentSelection(GraphQLParser.InlineFragmentSelectionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code inlineFragmentSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 */
	void exitInlineFragmentSelection(GraphQLParser.InlineFragmentSelectionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#field}.
	 * @param ctx the parse tree
	 */
	void enterField(GraphQLParser.FieldContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#field}.
	 * @param ctx the parse tree
	 */
	void exitField(GraphQLParser.FieldContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#fieldName}.
	 * @param ctx the parse tree
	 */
	void enterFieldName(GraphQLParser.FieldNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#fieldName}.
	 * @param ctx the parse tree
	 */
	void exitFieldName(GraphQLParser.FieldNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#alias}.
	 * @param ctx the parse tree
	 */
	void enterAlias(GraphQLParser.AliasContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#alias}.
	 * @param ctx the parse tree
	 */
	void exitAlias(GraphQLParser.AliasContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#arguments}.
	 * @param ctx the parse tree
	 */
	void enterArguments(GraphQLParser.ArgumentsContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#arguments}.
	 * @param ctx the parse tree
	 */
	void exitArguments(GraphQLParser.ArgumentsContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(GraphQLParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(GraphQLParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#fragmentSpread}.
	 * @param ctx the parse tree
	 */
	void enterFragmentSpread(GraphQLParser.FragmentSpreadContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#fragmentSpread}.
	 * @param ctx the parse tree
	 */
	void exitFragmentSpread(GraphQLParser.FragmentSpreadContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#inlineFragment}.
	 * @param ctx the parse tree
	 */
	void enterInlineFragment(GraphQLParser.InlineFragmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#inlineFragment}.
	 * @param ctx the parse tree
	 */
	void exitInlineFragment(GraphQLParser.InlineFragmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#fragmentDefinition}.
	 * @param ctx the parse tree
	 */
	void enterFragmentDefinition(GraphQLParser.FragmentDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#fragmentDefinition}.
	 * @param ctx the parse tree
	 */
	void exitFragmentDefinition(GraphQLParser.FragmentDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#fragmentName}.
	 * @param ctx the parse tree
	 */
	void enterFragmentName(GraphQLParser.FragmentNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#fragmentName}.
	 * @param ctx the parse tree
	 */
	void exitFragmentName(GraphQLParser.FragmentNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#typeSystemDefinition}.
	 * @param ctx the parse tree
	 */
	void enterTypeSystemDefinition(GraphQLParser.TypeSystemDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#typeSystemDefinition}.
	 * @param ctx the parse tree
	 */
	void exitTypeSystemDefinition(GraphQLParser.TypeSystemDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#typeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterTypeDefinition(GraphQLParser.TypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#typeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitTypeDefinition(GraphQLParser.TypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#scalarType}.
	 * @param ctx the parse tree
	 */
	void enterScalarType(GraphQLParser.ScalarTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#scalarType}.
	 * @param ctx the parse tree
	 */
	void exitScalarType(GraphQLParser.ScalarTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#scalarTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterScalarTypeDefinition(GraphQLParser.ScalarTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#scalarTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitScalarTypeDefinition(GraphQLParser.ScalarTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#objectType}.
	 * @param ctx the parse tree
	 */
	void enterObjectType(GraphQLParser.ObjectTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#objectType}.
	 * @param ctx the parse tree
	 */
	void exitObjectType(GraphQLParser.ObjectTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#objectTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterObjectTypeDefinition(GraphQLParser.ObjectTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#objectTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitObjectTypeDefinition(GraphQLParser.ObjectTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#implementsInterfaces}.
	 * @param ctx the parse tree
	 */
	void enterImplementsInterfaces(GraphQLParser.ImplementsInterfacesContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#implementsInterfaces}.
	 * @param ctx the parse tree
	 */
	void exitImplementsInterfaces(GraphQLParser.ImplementsInterfacesContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#implementsList}.
	 * @param ctx the parse tree
	 */
	void enterImplementsList(GraphQLParser.ImplementsListContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#implementsList}.
	 * @param ctx the parse tree
	 */
	void exitImplementsList(GraphQLParser.ImplementsListContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#fieldDefinition}.
	 * @param ctx the parse tree
	 */
	void enterFieldDefinition(GraphQLParser.FieldDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#fieldDefinition}.
	 * @param ctx the parse tree
	 */
	void exitFieldDefinition(GraphQLParser.FieldDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#deprecated}.
	 * @param ctx the parse tree
	 */
	void enterDeprecated(GraphQLParser.DeprecatedContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#deprecated}.
	 * @param ctx the parse tree
	 */
	void exitDeprecated(GraphQLParser.DeprecatedContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#deprecationReason}.
	 * @param ctx the parse tree
	 */
	void enterDeprecationReason(GraphQLParser.DeprecationReasonContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#deprecationReason}.
	 * @param ctx the parse tree
	 */
	void exitDeprecationReason(GraphQLParser.DeprecationReasonContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#argumentsDefinition}.
	 * @param ctx the parse tree
	 */
	void enterArgumentsDefinition(GraphQLParser.ArgumentsDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#argumentsDefinition}.
	 * @param ctx the parse tree
	 */
	void exitArgumentsDefinition(GraphQLParser.ArgumentsDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#inputValueDefinition}.
	 * @param ctx the parse tree
	 */
	void enterInputValueDefinition(GraphQLParser.InputValueDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#inputValueDefinition}.
	 * @param ctx the parse tree
	 */
	void exitInputValueDefinition(GraphQLParser.InputValueDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#interfaceType}.
	 * @param ctx the parse tree
	 */
	void enterInterfaceType(GraphQLParser.InterfaceTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#interfaceType}.
	 * @param ctx the parse tree
	 */
	void exitInterfaceType(GraphQLParser.InterfaceTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#interfaceTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterInterfaceTypeDefinition(GraphQLParser.InterfaceTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#interfaceTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitInterfaceTypeDefinition(GraphQLParser.InterfaceTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#unionType}.
	 * @param ctx the parse tree
	 */
	void enterUnionType(GraphQLParser.UnionTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#unionType}.
	 * @param ctx the parse tree
	 */
	void exitUnionType(GraphQLParser.UnionTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#unionTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterUnionTypeDefinition(GraphQLParser.UnionTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#unionTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitUnionTypeDefinition(GraphQLParser.UnionTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#unionMembers}.
	 * @param ctx the parse tree
	 */
	void enterUnionMembers(GraphQLParser.UnionMembersContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#unionMembers}.
	 * @param ctx the parse tree
	 */
	void exitUnionMembers(GraphQLParser.UnionMembersContext ctx);
	/**
	 * Enter a parse tree produced by the {@code stringValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void enterStringValue(GraphQLParser.StringValueContext ctx);
	/**
	 * Exit a parse tree produced by the {@code stringValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void exitStringValue(GraphQLParser.StringValueContext ctx);
	/**
	 * Enter a parse tree produced by the {@code numberValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void enterNumberValue(GraphQLParser.NumberValueContext ctx);
	/**
	 * Exit a parse tree produced by the {@code numberValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void exitNumberValue(GraphQLParser.NumberValueContext ctx);
	/**
	 * Enter a parse tree produced by the {@code booleanValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void enterBooleanValue(GraphQLParser.BooleanValueContext ctx);
	/**
	 * Exit a parse tree produced by the {@code booleanValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void exitBooleanValue(GraphQLParser.BooleanValueContext ctx);
	/**
	 * Enter a parse tree produced by the {@code arrayValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void enterArrayValue(GraphQLParser.ArrayValueContext ctx);
	/**
	 * Exit a parse tree produced by the {@code arrayValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void exitArrayValue(GraphQLParser.ArrayValueContext ctx);
	/**
	 * Enter a parse tree produced by the {@code enumValueValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void enterEnumValueValue(GraphQLParser.EnumValueValueContext ctx);
	/**
	 * Exit a parse tree produced by the {@code enumValueValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 */
	void exitEnumValueValue(GraphQLParser.EnumValueValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#enumType}.
	 * @param ctx the parse tree
	 */
	void enterEnumType(GraphQLParser.EnumTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#enumType}.
	 * @param ctx the parse tree
	 */
	void exitEnumType(GraphQLParser.EnumTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#enumTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterEnumTypeDefinition(GraphQLParser.EnumTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#enumTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitEnumTypeDefinition(GraphQLParser.EnumTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#enumValueDefinition}.
	 * @param ctx the parse tree
	 */
	void enterEnumValueDefinition(GraphQLParser.EnumValueDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#enumValueDefinition}.
	 * @param ctx the parse tree
	 */
	void exitEnumValueDefinition(GraphQLParser.EnumValueDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void enterEnumValue(GraphQLParser.EnumValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void exitEnumValue(GraphQLParser.EnumValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#inputObjectTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void enterInputObjectTypeDefinition(GraphQLParser.InputObjectTypeDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#inputObjectTypeDefinition}.
	 * @param ctx the parse tree
	 */
	void exitInputObjectTypeDefinition(GraphQLParser.InputObjectTypeDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#typeExtensionDefinition}.
	 * @param ctx the parse tree
	 */
	void enterTypeExtensionDefinition(GraphQLParser.TypeExtensionDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#typeExtensionDefinition}.
	 * @param ctx the parse tree
	 */
	void exitTypeExtensionDefinition(GraphQLParser.TypeExtensionDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#directiveDefinition}.
	 * @param ctx the parse tree
	 */
	void enterDirectiveDefinition(GraphQLParser.DirectiveDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#directiveDefinition}.
	 * @param ctx the parse tree
	 */
	void exitDirectiveDefinition(GraphQLParser.DirectiveDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#directiveLocations}.
	 * @param ctx the parse tree
	 */
	void enterDirectiveLocations(GraphQLParser.DirectiveLocationsContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#directiveLocations}.
	 * @param ctx the parse tree
	 */
	void exitDirectiveLocations(GraphQLParser.DirectiveLocationsContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#directives}.
	 * @param ctx the parse tree
	 */
	void enterDirectives(GraphQLParser.DirectivesContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#directives}.
	 * @param ctx the parse tree
	 */
	void exitDirectives(GraphQLParser.DirectivesContext ctx);
	/**
	 * Enter a parse tree produced by the {@code valueDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void enterValueDirective(GraphQLParser.ValueDirectiveContext ctx);
	/**
	 * Exit a parse tree produced by the {@code valueDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void exitValueDirective(GraphQLParser.ValueDirectiveContext ctx);
	/**
	 * Enter a parse tree produced by the {@code nameDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void enterNameDirective(GraphQLParser.NameDirectiveContext ctx);
	/**
	 * Exit a parse tree produced by the {@code nameDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void exitNameDirective(GraphQLParser.NameDirectiveContext ctx);
	/**
	 * Enter a parse tree produced by the {@code argumentDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void enterArgumentDirective(GraphQLParser.ArgumentDirectiveContext ctx);
	/**
	 * Exit a parse tree produced by the {@code argumentDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 */
	void exitArgumentDirective(GraphQLParser.ArgumentDirectiveContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#typeCondition}.
	 * @param ctx the parse tree
	 */
	void enterTypeCondition(GraphQLParser.TypeConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#typeCondition}.
	 * @param ctx the parse tree
	 */
	void exitTypeCondition(GraphQLParser.TypeConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#variableDefinitions}.
	 * @param ctx the parse tree
	 */
	void enterVariableDefinitions(GraphQLParser.VariableDefinitionsContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#variableDefinitions}.
	 * @param ctx the parse tree
	 */
	void exitVariableDefinitions(GraphQLParser.VariableDefinitionsContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void enterVariableDefinition(GraphQLParser.VariableDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void exitVariableDefinition(GraphQLParser.VariableDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#variable}.
	 * @param ctx the parse tree
	 */
	void enterVariable(GraphQLParser.VariableContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#variable}.
	 * @param ctx the parse tree
	 */
	void exitVariable(GraphQLParser.VariableContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#defaultValue}.
	 * @param ctx the parse tree
	 */
	void enterDefaultValue(GraphQLParser.DefaultValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#defaultValue}.
	 * @param ctx the parse tree
	 */
	void exitDefaultValue(GraphQLParser.DefaultValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#valueOrVariable}.
	 * @param ctx the parse tree
	 */
	void enterValueOrVariable(GraphQLParser.ValueOrVariableContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#valueOrVariable}.
	 * @param ctx the parse tree
	 */
	void exitValueOrVariable(GraphQLParser.ValueOrVariableContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#type}.
	 * @param ctx the parse tree
	 */
	void enterType(GraphQLParser.TypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#type}.
	 * @param ctx the parse tree
	 */
	void exitType(GraphQLParser.TypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterTypeName(GraphQLParser.TypeNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitTypeName(GraphQLParser.TypeNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#listType}.
	 * @param ctx the parse tree
	 */
	void enterListType(GraphQLParser.ListTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#listType}.
	 * @param ctx the parse tree
	 */
	void exitListType(GraphQLParser.ListTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#nonNullType}.
	 * @param ctx the parse tree
	 */
	void enterNonNullType(GraphQLParser.NonNullTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#nonNullType}.
	 * @param ctx the parse tree
	 */
	void exitNonNullType(GraphQLParser.NonNullTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#array}.
	 * @param ctx the parse tree
	 */
	void enterArray(GraphQLParser.ArrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#array}.
	 * @param ctx the parse tree
	 */
	void exitArray(GraphQLParser.ArrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#schemaDefinition}.
	 * @param ctx the parse tree
	 */
	void enterSchemaDefinition(GraphQLParser.SchemaDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#schemaDefinition}.
	 * @param ctx the parse tree
	 */
	void exitSchemaDefinition(GraphQLParser.SchemaDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#schemaQueryDefinition}.
	 * @param ctx the parse tree
	 */
	void enterSchemaQueryDefinition(GraphQLParser.SchemaQueryDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#schemaQueryDefinition}.
	 * @param ctx the parse tree
	 */
	void exitSchemaQueryDefinition(GraphQLParser.SchemaQueryDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#schemaMutationDefinition}.
	 * @param ctx the parse tree
	 */
	void enterSchemaMutationDefinition(GraphQLParser.SchemaMutationDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#schemaMutationDefinition}.
	 * @param ctx the parse tree
	 */
	void exitSchemaMutationDefinition(GraphQLParser.SchemaMutationDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link GraphQLParser#schemaSubscriptionDefinition}.
	 * @param ctx the parse tree
	 */
	void enterSchemaSubscriptionDefinition(GraphQLParser.SchemaSubscriptionDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link GraphQLParser#schemaSubscriptionDefinition}.
	 * @param ctx the parse tree
	 */
	void exitSchemaSubscriptionDefinition(GraphQLParser.SchemaSubscriptionDefinitionContext ctx);
}