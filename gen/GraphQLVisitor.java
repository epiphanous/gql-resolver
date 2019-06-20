// Generated from /Users/milanvelebit/work/gql-resolver/src/antlr4/GraphQL.g4 by ANTLR 4.7.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link GraphQLParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface GraphQLVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#document}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDocument(GraphQLParser.DocumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#definition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefinition(GraphQLParser.DefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code selectionOnlyOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSelectionOnlyOperationDefinition(GraphQLParser.SelectionOnlyOperationDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code fullOperationDefinition}
	 * labeled alternative in {@link GraphQLParser#operationDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFullOperationDefinition(GraphQLParser.FullOperationDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#selectionSet}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSelectionSet(GraphQLParser.SelectionSetContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#operationType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitOperationType(GraphQLParser.OperationTypeContext ctx);
	/**
	 * Visit a parse tree produced by the {@code fieldSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFieldSelection(GraphQLParser.FieldSelectionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code fragmentSpreadSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFragmentSpreadSelection(GraphQLParser.FragmentSpreadSelectionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code inlineFragmentSelection}
	 * labeled alternative in {@link GraphQLParser#selection}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInlineFragmentSelection(GraphQLParser.InlineFragmentSelectionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#field}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitField(GraphQLParser.FieldContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#fieldName}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFieldName(GraphQLParser.FieldNameContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#alias}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAlias(GraphQLParser.AliasContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#arguments}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArguments(GraphQLParser.ArgumentsContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#argument}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgument(GraphQLParser.ArgumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#fragmentSpread}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFragmentSpread(GraphQLParser.FragmentSpreadContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#inlineFragment}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInlineFragment(GraphQLParser.InlineFragmentContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#fragmentDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFragmentDefinition(GraphQLParser.FragmentDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#fragmentName}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFragmentName(GraphQLParser.FragmentNameContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#typeSystemDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypeSystemDefinition(GraphQLParser.TypeSystemDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#typeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypeDefinition(GraphQLParser.TypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#scalarType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScalarType(GraphQLParser.ScalarTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#scalarTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitScalarTypeDefinition(GraphQLParser.ScalarTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#objectType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectType(GraphQLParser.ObjectTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#objectTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectTypeDefinition(GraphQLParser.ObjectTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#implementsInterfaces}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImplementsInterfaces(GraphQLParser.ImplementsInterfacesContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#implementsList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitImplementsList(GraphQLParser.ImplementsListContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#fieldDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFieldDefinition(GraphQLParser.FieldDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#deprecated}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeprecated(GraphQLParser.DeprecatedContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#deprecationReason}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDeprecationReason(GraphQLParser.DeprecationReasonContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#argumentsDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgumentsDefinition(GraphQLParser.ArgumentsDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#inputValueDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInputValueDefinition(GraphQLParser.InputValueDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#interfaceType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInterfaceType(GraphQLParser.InterfaceTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#interfaceTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInterfaceTypeDefinition(GraphQLParser.InterfaceTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#unionType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnionType(GraphQLParser.UnionTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#unionTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnionTypeDefinition(GraphQLParser.UnionTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#unionMembers}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnionMembers(GraphQLParser.UnionMembersContext ctx);
	/**
	 * Visit a parse tree produced by the {@code stringValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringValue(GraphQLParser.StringValueContext ctx);
	/**
	 * Visit a parse tree produced by the {@code numberValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumberValue(GraphQLParser.NumberValueContext ctx);
	/**
	 * Visit a parse tree produced by the {@code booleanValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanValue(GraphQLParser.BooleanValueContext ctx);
	/**
	 * Visit a parse tree produced by the {@code arrayValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayValue(GraphQLParser.ArrayValueContext ctx);
	/**
	 * Visit a parse tree produced by the {@code enumValueValue}
	 * labeled alternative in {@link GraphQLParser#value}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumValueValue(GraphQLParser.EnumValueValueContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#enumType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumType(GraphQLParser.EnumTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#enumTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumTypeDefinition(GraphQLParser.EnumTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#enumValueDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumValueDefinition(GraphQLParser.EnumValueDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#enumValue}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEnumValue(GraphQLParser.EnumValueContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#inputObjectTypeDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInputObjectTypeDefinition(GraphQLParser.InputObjectTypeDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#typeExtensionDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypeExtensionDefinition(GraphQLParser.TypeExtensionDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#directiveDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDirectiveDefinition(GraphQLParser.DirectiveDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#directiveLocations}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDirectiveLocations(GraphQLParser.DirectiveLocationsContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#directives}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDirectives(GraphQLParser.DirectivesContext ctx);
	/**
	 * Visit a parse tree produced by the {@code valueDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitValueDirective(GraphQLParser.ValueDirectiveContext ctx);
	/**
	 * Visit a parse tree produced by the {@code nameDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNameDirective(GraphQLParser.NameDirectiveContext ctx);
	/**
	 * Visit a parse tree produced by the {@code argumentDirective}
	 * labeled alternative in {@link GraphQLParser#directive}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgumentDirective(GraphQLParser.ArgumentDirectiveContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#typeCondition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypeCondition(GraphQLParser.TypeConditionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#variableDefinitions}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVariableDefinitions(GraphQLParser.VariableDefinitionsContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#variableDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVariableDefinition(GraphQLParser.VariableDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#variable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVariable(GraphQLParser.VariableContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#defaultValue}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefaultValue(GraphQLParser.DefaultValueContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#valueOrVariable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitValueOrVariable(GraphQLParser.ValueOrVariableContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#type}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitType(GraphQLParser.TypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#typeName}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypeName(GraphQLParser.TypeNameContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#listType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitListType(GraphQLParser.ListTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#nonNullType}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNonNullType(GraphQLParser.NonNullTypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#array}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArray(GraphQLParser.ArrayContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#schemaDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSchemaDefinition(GraphQLParser.SchemaDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#schemaQueryDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSchemaQueryDefinition(GraphQLParser.SchemaQueryDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#schemaMutationDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSchemaMutationDefinition(GraphQLParser.SchemaMutationDefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link GraphQLParser#schemaSubscriptionDefinition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSchemaSubscriptionDefinition(GraphQLParser.SchemaSubscriptionDefinitionContext ctx);
}