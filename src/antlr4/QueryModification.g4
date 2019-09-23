/**
 * Query Mods
 * 
 * An expression syntax to support modifying queries made against a graphql api.
 * 
 * @author Robert Lyons <nextdude@gmail.com>
 */
grammar QueryModification
  ;

filter
  : searchCondition EOF
  ;

orderBys
  : orderBy (
    ',' orderBy
  )* EOF
  ;

orderBy
  : expression (
    ASC
    | DESC
  )?
  ;

searchCondition
  : searchConditionAnd (
    OR searchConditionAnd
  )*
  ;

searchConditionAnd
  : searchConditionNot (
    AND searchConditionNot
  )*
  ;

searchConditionNot
  : NOT? predicate
  ;

predicate
  : expression comparisonOp expression # comparisonPredicate
  | expression NOT? IN expressionList  # inPredicate
  | expression NOT? IN varRef          # inVarPredicate
  | '(' searchCondition ')'            # parenPredicate
  ;

expression
  : unaryOp expression             # unaryExpression
  | expression factorOp expression # factorExpression
  | expression termOp expression   # termExpression
  | expressionAtom                 # primitiveExpression
  | '(' expression ')'             # parenExpression
  ;

expressionAtom
  : functionCall   # functionCallAtom
  | stringLiteral  # stringLiteralAtom
  | numericLiteral # numericLiteralAtom
  | booleanLiteral # booleanLiteralAtom
  | iriRef         # iriRefAtom
  | fieldRef       # fieldRefAtom
  | varRef         # varRefAtom
  ;

expressionList
  : '(' expression (
    ',' expression
  )* ')'
  ;

// iriRef is the function, prefixedName is the return type (like xsd:string
functionCall
  : iriRef '[' xsdType ']' EMPTY_PARENS   # funcWithoutArgs
  | iriRef '[' xsdType ']' expressionList # funcWithArgs
  ;

xsdType
  : XSD_STRING
  | XSD_DECIMAL
  | XSD_DOUBLE
  | XSD_INTEGER
  | XSD_BOOLEAN
  | XSD_DATE
  | XSD_TIME
  | XSD_DATETIME
  | XSD_DURATION
  | XSD_MONTHDAY
  ;

numericLiteral
  : INTEGER # integerLiteral
  | DECIMAL # decimalLiteral
  | DOUBLE  # doubleLiteral
  ;

varRef
  : '$' VARNAME
  ;

fieldRef
  : VARNAME
  ;

comparisonOp
  : '>'
  | '>='
  | '<'
  | '<='
  | '='
  | '!='
  | '~'
  | '~*'
  | '!~'
  | '!~*'
  ;

unaryOp
  : '-'
  | '+'
  | '!'
  ;

factorOp
  : '*'
  | '/'
  | '%'
  ;

termOp
  : '+'
  | '-'
  ;

stringLiteral
  : SINGLE_QUOTED_ONE_LINE_STRING     # singleQuotedOneline
  | SINGLE_QUOTED_MULTI_LINE_STRING   # singleQuotedMultline
  | DOUBLE_QUOTED_ONE_LINE_STRING     # doubleQuotedOneline
  | DOUBLE_QUOTED_MULTI_LINE_STRING   # doubleQuotedMultiline
  ;

booleanLiteral
  : TRUE
  | FALSE
  ;

iriRef
  : IRI_REF      # literalIriRef
  | prefixedName # prefixedNameIriRef
  ;

prefixedName
  : PNAME_LN
  | PNAME_NS
  ;

XSD_STRING
  : 'xsd:string'
  ;
XSD_DECIMAL
  : 'xsd:decimal'
  ;
XSD_DOUBLE
  : 'xsd:double'
  ;
XSD_INTEGER
  : 'xsd:integer'
  ;
XSD_BOOLEAN
  : 'xsd:boolean'
  ;
XSD_DATE
  : 'xsd:date'
  ;
XSD_TIME
  : 'xsd_time'
  ;
XSD_DATETIME
  : 'xsd_datetime'
  ;
XSD_DURATION
  : 'xsd:duration'
  ;
XSD_MONTHDAY
  : 'xsd:monthday'
  ;

AND
  : 'AND'
  | 'and'
  | '&&'
  ;
AS
  : 'AS'
  | 'as'
  ;
ASC
  : 'ASC'
  | 'asc'
  ;
DESC
  : 'DESC'
  | 'desc'
  ;

FALSE
  : 'FALSE'
  | 'false'
  ;
IN
  : 'IN'
  | 'in'
  ;

NOT
  : 'NOT'
  | 'not'
  | '!'
  ;

OR
  : 'OR'
  | 'or'
  | '||'
  ;
TRUE
  : 'TRUE'
  | 'true'
  ;

IRI_REF
  : '<' (
    ~(
      '<'
      | '>'
      | '"'
      | '{'
      | '}'
      | '|'
      | '^'
      | '\\'
      | '`'
    )
    | (PN_CHARS)
  )* '>'
  ;

PNAME_NS
  : PN_PREFIX? ':'
  ;

PNAME_LN
  : PNAME_NS PN_LOCAL
  ;

INTEGER
  : '-'? DIGIT+
  ;

DECIMAL
  : '-'? DIGIT+ '.' DIGIT*
  | '-'? '.' DIGIT+
  ;

DOUBLE
  : '-'? DIGIT+ '.' DIGIT* EXPONENT
  | '-'? '.' DIGIT+ EXPONENT
  | '-'? DIGIT+ EXPONENT
  ;

EXPONENT
  : (
    'e'
    | 'E'
  ) (
    '+'
    | '-'
  )? DIGIT+
  ;

SINGLE_QUOTED_ONE_LINE_STRING
  : '\'' ( ~['\\\n\r\u2028\u2029] | ESCAPED_CHARACTER )* '\''
  ;

DOUBLE_QUOTED_ONE_LINE_STRING
  : '"' ( ~["\\\n\r\u2028\u2029] | ESCAPED_CHARACTER )* '"'
  ;

SINGLE_QUOTED_MULTI_LINE_STRING
  : '\'\'\'' TRIPLE_SINGLE_QUOTED_CHAR*? '\'\'\''
  ;

DOUBLE_QUOTED_MULTI_LINE_STRING
  : '"""' TRIPLE_DOUBLE_QUOTED_CHAR*? '"""'
  ;

fragment ESCAPED_TRIPLE_SINGLE_QUOTE
  : '\\\'\'\''
  ;
fragment ESCAPED_TRIPLE_DOUBLE_QUOTE
  : '\\"""'
  ;
fragment SOURCE_CHARACTER
  : [\u0009\u000A\u000D\u0020-\uFFFF]
  ;

fragment ESCAPED_CHARACTER
  : '\\' [tbnrf\\'"]
  ;

fragment TRIPLE_SINGLE_QUOTED_CHAR: ESCAPED_TRIPLE_SINGLE_QUOTE | SOURCE_CHARACTER;
fragment TRIPLE_DOUBLE_QUOTED_CHAR: ESCAPED_TRIPLE_DOUBLE_QUOTE | SOURCE_CHARACTER;

EMPTY_PARENS
  : '(' ')'
  ;

VARNAME
  : (
    PN_CHARS_U
    | DIGIT
  ) (
    PN_CHARS_U
    | DIGIT
    | '\u00B7'
    | ('\u0300' ..'\u036F')
    | ('\u203F' ..'\u2040')
  )*
  ;

PN_PREFIX
  : PN_CHARS_BASE (
    (
      PN_CHARS
      | '.'
    )* PN_CHARS
  )?
  ;

PN_LOCAL
  : (
    PN_CHARS_U
    | DIGIT
  ) (
    (
      PN_CHARS
      | '.'
    )* PN_CHARS
  )?
  ;

fragment PN_CHARS_U
  : PN_CHARS_BASE
  | '_'
  ;

fragment PN_CHARS
  : PN_CHARS_U
  | '-'
  | DIGIT
  ;

fragment PN_CHARS_BASE
  : 'A' ..'Z'
  | 'a' ..'z'
  | '\u00C0' ..'\u00D6'
  | '\u00D8' ..'\u00F6'
  | '\u00F8' ..'\u02FF'
  | '\u0370' ..'\u037D'
  | '\u037F' ..'\u1FFF'
  | '\u200C' ..'\u200D'
  | '\u2070' ..'\u218F'
  | '\u2C00' ..'\u2FEF'
  | '\u3001' ..'\uD7FF'
  | '\uF900' ..'\uFDCF'
  | '\uFDF0' ..'\uFFFD'
  ;

fragment DIGIT
  : [0-9]
  ;

WS
  : [ \t\r\n\f]+ -> skip
  ;
