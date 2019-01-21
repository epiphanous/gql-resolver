/*
 The MIT License (MIT)
 
 Copyright (c) 2015 Joseph T. McBride
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 
 GraphQL grammar derived from:
 
 GraphQL Draft Specification - July 2015
 
 http://facebook.github.io/graphql/ https://github.com/facebook/graphql
 */

/**
 * Updated to include schema language idl GraphQL Draft Spec August 2017 Bob Lyons <nextdude@gmail.com>
 */

grammar GraphQL
  ;

document
  : definition+ EOF
  ;

definition
  : operationDefinition
  | fragmentDefinition
  | typeSystemDefinition
  ;

operationDefinition
  : COMMENT* selectionSet                                                     # selectionOnlyOperationDefinition
  | COMMENT* operationType NAME variableDefinitions? directives? selectionSet # fullOperationDefinition
  ;

selectionSet
  : '{' selection (
    ','? selection
  )* '}'
  ;

operationType
  : 'query'
  | 'mutation'
  | 'subscription'
  ;

selection
  : field          # fieldSelection
  | fragmentSpread # fragmentSpreadSelection
  | inlineFragment # inlineFragmentSelection
  ;

field
  : COMMENT* fieldName arguments? directives? selectionSet?
  ;

fieldName
  : NAMETYPE
  | alias
  | NAME
  ;

alias
  : NAME ':' NAME
  ;

arguments
  : '(' argument (
    ','? argument
  )* ')'
  ;

argument
  : COMMENT* NAME ':' valueOrVariable
  ;

fragmentSpread
  : '...' fragmentName directives?
  ;

inlineFragment
  : '...' 'on' typeCondition directives? selectionSet
  ;

fragmentDefinition
  : COMMENT* 'fragment' fragmentName 'on' typeCondition directives? selectionSet
  ;

fragmentName
  : NAME
  ;

typeSystemDefinition
  : typeDefinition
  | typeExtensionDefinition
  | directiveDefinition
  | schemaDefinition
  ;

typeDefinition
  : scalarTypeDefinition
  | objectTypeDefinition
  | interfaceTypeDefinition
  | unionTypeDefinition
  | enumTypeDefinition
  | inputObjectTypeDefinition
  ;

scalarType
  : NAME
  ;

scalarTypeDefinition
  : COMMENT* 'scalar' scalarType
  ;

objectType
  : NAME
  ;

objectTypeDefinition
  : COMMENT* 'type' objectType implementsInterfaces? '{' fieldDefinition+ '}'
  ;

implementsInterfaces
  : 'implements' implementsList
  ;

implementsList
  : interfaceType (
    (
      ','
      | '&'
    )? interfaceType+
  )?
  ;

fieldDefinition
  : COMMENT* (
    NAMETYPE
    | NAME
  ) deprecated? argumentsDefinition? ':' type directives?
  ;

deprecated
  : '@' 'deprecated' (
    '(' deprecationReason ')'
  )?
  ;

deprecationReason
  : STRING
  ;

argumentsDefinition
  : '(' inputValueDefinition (
    ','? inputValueDefinition
  )* ')'
  ;

inputValueDefinition
  : COMMENT* NAME ':' type defaultValue? directives?
  ;

interfaceType
  : NAME
  ;

interfaceTypeDefinition
  : COMMENT* 'interface' interfaceType directives? '{' fieldDefinition+ '}'
  ;

unionType
  : NAME
  ;

unionTypeDefinition
  : COMMENT* 'union' unionType directives? '=' unionMembers
  ;

unionMembers
  : typeName '|' (
    typeName (
      '|' typeName
    )*
  )
  ;

value
  : STRING    # stringValue
  | NUMBER    # numberValue
  | BOOLEAN   # booleanValue
  | array     # arrayValue
  | enumValue # enumValueValue
  ;

enumType
  : NAME
  ;

enumTypeDefinition
  : COMMENT* 'enum' enumType directives? '{' enumValueDefinition (
    ','? enumValueDefinition
  )* '}'
  ;

enumValueDefinition
  : enumValue
  ;

enumValue
  : COMMENT* NAME deprecated?
  ;

inputObjectTypeDefinition
  : COMMENT* 'input' NAME '{' inputValueDefinition+ '}'
  ;

typeExtensionDefinition
  : 'extend' objectTypeDefinition
  ;

directiveDefinition
  : COMMENT* 'directive' '@' NAME argumentsDefinition? 'on' directiveLocations
  ;

directiveLocations
  : NAME+
  ;

directives
  : directive+
  ;

directive
  : '@' NAME ':' valueOrVariable # valueDirective
  | '@' NAME                     # nameDirective
  | '@' NAME '(' argument ')'    # argumentDirective
  ;

typeCondition
  : typeName
  ;

variableDefinitions
  : '(' variableDefinition (
    ','? variableDefinition
  )* ')'
  ;

variableDefinition
  : COMMENT* variable ':' type defaultValue?
  ;

variable
  : '$' NAME
  ;

defaultValue
  : '=' valueOrVariable
  ;

valueOrVariable
  : value
  | variable
  ;

type
  : typeName nonNullType?
  | listType nonNullType?
  ;

typeName
  : NAME
  ;

listType
  : '[' type ']'
  ;

nonNullType
  : '!'
  ;

array
  : '[' value (
    ',' value
  )* ']'
  | '[' ']'
  ;

schemaDefinition
  : COMMENT* 'schema' '{' (
    schemaQueryDefinition
    | schemaMutationDefinition
    | schemaSubscriptionDefinition
  )+ '}'
  ;

schemaQueryDefinition
  : COMMENT* 'query' ':' type
  ;

schemaMutationDefinition
  : COMMENT* 'mutation' ':' type
  ;

schemaSubscriptionDefinition
  : COMMENT* 'subscription' ':' type
  ;

BOOLEAN
  : 'true'
  | 'false'
  ;

NAMETYPE
  : 'type'
  ;

NAME
  : [_A-Za-z] [_0-9A-Za-z]*
  ;

STRING
  : '"' (
    ESC
    | ~ ["\\]
  )* '"'
  ;

COMMENT
  : '#' InputCharacter*
  ;

fragment InputCharacter
  : ~[\r\n\u0085\u2028\u2029]
  ;

fragment ESC
  : '\\' (
    ["\\/bfnrt]
    | UNICODE
  )
  ;

fragment UNICODE
  : 'u' HEX HEX HEX HEX
  ;

fragment HEX
  : [0-9a-fA-F]
  ;

NUMBER
  : '-'? INT '.' [0-9]+ EXP?
  | '-'? INT EXP
  | '-'? INT
  ;

fragment INT
  : '0'
  | [1-9] [0-9]*
  ;

// no leading zeros

fragment EXP
  : [Ee] [+\-]? INT
  ;

// \- since - means "range" inside [...]

WS
  : [ \t\n\r]+ -> skip
  ;
