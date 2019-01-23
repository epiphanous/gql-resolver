/***********************************************************************
 * Copyright 2019 Epiphanous Consulting, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * 
 * Generated from https://facebook.github.io/graphql/draft/#sec-Appendix-Grammar-Summary on 2019-01-22T03:35:49.836Z
 * 
 * The GraphQL spec is (C)opyright 2012-2019 Facebook.
 */

grammar GraphQL
  ;

document
  : definition+ EOF
  ;

definition
  : executableDefinition
  | typeSystemDefinition
  | typeSystemExtension
  ;

executableDefinition
  : operationDefinition
  | fragmentDefinition
  ;

operationDefinition
  : selectionSet                                                      # selectionOnlyOperationDefinition
  | operationType NAME? variableDefinitions? directives? selectionSet # fullOperationDefinition
  ;

operationType
  : 'query'
  | 'mutation'
  | 'subscription'
  ;

selectionSet
  : '{' selection+ '}'
  ;

selection
  : field          # fieldSelection
  | fragmentSpread # fragmentSpreadSelection
  | inlineFragment # inlineFragmentSelection
  ;

field
  : alias? NAME arguments? directives? selectionSet?
  ;

alias
  : NAME ':'
  ;

arguments
  : '(' argument+ ')'
  ;

argument
  : NAME ':' value
  ;

fragmentSpread
  : '...' fragmentName directives?
  ;

inlineFragment
  : '...' typeCondition? directives? selectionSet
  ;

fragmentDefinition
  : 'fragment' fragmentName typeCondition directives? selectionSet
  ;

fragmentName
  : NAME
  ;

typeCondition
  : 'on' namedType
  ;

value
  : variable             # variableValue
  | INT_VALUE            # intValue
  | FLOAT_VALUE          # floatValue
  | STRING_VALUE         # stringValue
  | BOOLEAN_VALUE        # booleanValue
  | NULL_VALUE           # nullValue
  | NAME                 # enumValue
  | '[' ']'              # emptyListValue
  | '[' value+ ']'       # nonEmptyListValue
  | '{' '}'              # emptyObjectValue
  | '{' objectField+ '}' # nonEmptyObjectValue
  ;

objectField
  : NAME ':' value
  ;

variableDefinitions
  : '(' variableDefinition+ ')'
  ;

variableDefinition
  : variable ':' type defaultValue? directives?
  ;

variable
  : '$' NAME
  ;

defaultValue
  : '=' value
  ;

type
  : namedType nonNullType?
  | listType nonNullType?
  ;

namedType
  : NAME
  ;

listType
  : '[' type ']'
  ;

nonNullType
  : '!'
  ;

directives
  : directive+
  ;

directive
  : '@' NAME arguments?
  ;

typeSystemDefinition
  : schemaDefinition
  | typeDefinition
  | directiveDefinition
  ;

typeSystemExtension
  : schemaExtension
  | typeExtension
  ;

schemaDefinition
  : 'schema' directives? '{' operationTypeDefinition+ '}'
  ;

schemaExtension
  : 'extend' 'schema' directives? '{' operationTypeDefinition+ '}' # schemaExtensionWithOperations
  | 'extend' 'schema' directives                                   # schemaExtensionWithoutOperations
  ;

operationTypeDefinition
  : operationType ':' namedType
  ;

description
  : STRING_VALUE
  ;

typeDefinition
  : scalarTypeDefinition
  | objectTypeDefinition
  | interfaceTypeDefinition
  | unionTypeDefinition
  | enumTypeDefinition
  | inputObjectTypeDefinition
  ;

typeExtension
  : scalarTypeExtension
  | objectTypeExtension
  | interfaceTypeExtension
  | unionTypeExtension
  | enumTypeExtension
  | inputObjectTypeExtension
  ;

scalarTypeDefinition
  : description? 'scalar' NAME directives?
  ;

scalarTypeExtension
  : 'extend' 'scalar' NAME directives
  ;

objectTypeDefinition
  : description? 'type' NAME implementsInterfaces? directives? fieldsDefinition?
  ;

objectTypeExtension
  : 'extend' 'type' NAME implementsInterfaces? directives? fieldsDefinition # objectTypeExtensionWithFields
  | 'extend' 'type' NAME implementsInterfaces? directives                   # objectTypeExtensionWithDirectives
  | 'extend' 'type' NAME implementsInterfaces                               # objectTypeExtensionWithInterfaces
  ;

implementsInterfaces
  : 'implements' '&'? namedType (
    '&'? namedType
  )*
  ;

fieldsDefinition
  : '{' fieldDefinition+ '}'
  ;

fieldDefinition
  : description? NAME argumentsDefinition? ':' type directives?
  ;

argumentsDefinition
  : '(' inputValueDefinition+ ')'
  ;

inputValueDefinition
  : description? NAME ':' type defaultValue? directives?
  ;

interfaceTypeDefinition
  : description? 'interface' NAME directives? fieldsDefinition?
  ;

interfaceTypeExtension
  : 'extend' 'interface' NAME directives? fieldsDefinition # interfaceTypeExtensionWithFields
  | 'extend' 'interface' NAME directives                   # interfaceTypeExtensionWithDirectives
  ;

unionTypeDefinition
  : description? 'union' NAME directives? unionMemberTypes?
  ;

unionMemberTypes
  : '=' '|'? namedType (
    '|'? namedType
  )*
  ;

unionTypeExtension
  : 'extend' 'union' NAME directives? unionMemberTypes # unionTypeExtensionWithMembers
  | 'extend' 'union' NAME directives                   # unionTypeExtensionWithDirectives
  ;

enumTypeDefinition
  : description? 'enum' NAME directives? enumValuesDefinition?
  ;

enumValuesDefinition
  : '{' enumValueDefinition+ '}'
  ;

enumValueDefinition
  : description? NAME directives?
  ;

enumTypeExtension
  : 'extend' 'enum' NAME directives? enumValuesDefinition # enumTypeExtensionWithValues
  | 'extend' 'enum' NAME directives                       # enumTypeExtensionWithDirectives
  ;

inputObjectTypeDefinition
  : description? 'input' NAME directives? inputFieldsDefinition?
  ;

inputFieldsDefinition
  : '{' inputValueDefinition+ '}'
  ;

inputObjectTypeExtension
  : 'extend' 'input' NAME directives? inputFieldsDefinition # inputObjectTypeExtensionWithFields
  | 'extend' 'input' NAME directives                        # inputObjectTypeExtensionWithDirectives
  ;

directiveDefinition
  : description? 'directive' '@' NAME argumentsDefinition? directiveLocations
  ;

directiveLocations
  : 'on' '|'? directiveLocation (
    '|'? directiveLocation
  )
  ;

directiveLocation
  : executableDirectiveLocation
  | typeSystemDirectiveLocation
  ;

executableDirectiveLocation
  : 'QUERY'
  | 'MUTATION'
  | 'SUBSCRIPTION'
  | 'FIELD'
  | 'FRAGMENT_DEFINITION'
  | 'FRAGMENT_SPREAD'
  | 'INLINE_FRAGMENT'
  | 'VARIABLE_DEFINITION'
  ;

typeSystemDirectiveLocation
  : 'SCHEMA'
  | 'SCALAR'
  | 'OBJECT'
  | 'FIELD_DEFINITION'
  | 'ARGUMENT_DEFINITION'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'ENUM_VALUE'
  | 'INPUT_OBJECT'
  | 'INPUT_FIELD_DEFINITION'
  ;

//----------------[ LEXICAL TOKENS]----------------

NAME
  : [_A-Za-z] [_0-9A-Za-z]*
  ;

INT_VALUE
  : INTEGER_PART
  ;

fragment INTEGER_PART
  : NEGATIVE_SIGN? '0'
  | NEGATIVE_SIGN? NON_ZERO_DIGIT DIGIT*
  ;

fragment NEGATIVE_SIGN
  : '-'
  ;

fragment DIGIT
  : [0-9]
  ;

fragment NON_ZERO_DIGIT
  : [1-9]
  ;

FLOAT_VALUE
  : INTEGER_PART FRACTIONAL_PART
  | INTEGER_PART EXPONENT_PART
  | INTEGER_PART FRACTIONAL_PART EXPONENT_PART
  ;

fragment FRACTIONAL_PART
  : '.' DIGIT+
  ;

fragment EXPONENT_PART
  : EXPONENT_INDICATOR SIGN? DIGIT+
  ;

fragment EXPONENT_INDICATOR
  : 'e'
  | 'E'
  ;

fragment SIGN
  : '+'
  | '-'
  ;

STRING_VALUE
  : '"' STRING_CHARACTER* '"'
  | '"""' BLOCK_STRING_CHARACTER* '"""'
  ;

fragment STRING_CHARACTER
  : ~["'\r\n\f\\]
  | '\\u' ESCAPED_UNICODE
  | '\\' ESCAPED_CHARACTER
  ;

fragment HEX
  : [A-Fa-f0-9]
  ;

fragment ESCAPED_UNICODE
  : HEX HEX HEX HEX
  ;

fragment ESCAPED_CHARACTER
  : ["'/bfnrt]
  ;

fragment BLOCK_STRING_CHARACTER
  : ~["'\\]
  | '\\u' ESCAPED_UNICODE
  | '\\' ESCAPED_CHARACTER
  ;

BOOLEAN_VALUE
  : 'true'
  | 'false'
  ;

NULL_VALUE
  : 'null'
  ;

//ENUM_VALUE
//  : NAME
//  ;

COMMENT
  : '#' COMMENT_CHAR* -> skip
  ;

fragment COMMENT_CHAR
  : ~[\r\n\f]
  ;

IGNORED
  : [ ,\t\r\n\ufeff]+ -> skip
  ;

