/**
 * Query Mods
 * 
 * An expression syntax to support modifying queries made against a graphql api, destined to be sent to a sparql compatible triple store.
 * 
 * @author Robert Lyons <nextdude@gmail.com>
 */
grammar QueryModification
  ;

filter
  : searchCondition EOF
  ;

patterns
  : pattern (
    LIST_SEP pattern
  )* EOF
  ;

boosters
  : boost (
    LIST_SEP boost
  )* EOF
  ;

bindings
  : binding (
    LIST_SEP binding
  )* EOF
  ;

orderBys
  : orderBy (
    LIST_SEP orderBy
  )* EOF
  ;

orderBy
  : expression (
    ASC
    | DESC
  )?
  ;

transforms
  : transform (
    LIST_SEP transform
  )* EOF
  ;

transform
  : TO_UNIT iriRefOrVarRef
  | ABS
  | CEIL
  | FLOOR
  | LCASE
  | MD5
  | OBFUSCATE
  | ROUND
  | SHA1
  | SHA256
  | SHA384
  | SHA512
  | UCASE
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
  : builtinCall    # builtinCallAtom
  | functionCall   # functionCallAtom
  | rdfLiteral     # rdfLiteralAtom
  | stringLiteral  # stringLiteralAtom
  | numericLiteral # numericLiteralAtom
  | booleanLiteral # booleanLiteralAtom
  | iriRef         # iriRefAtom
  | fieldRef       # fieldRefAtom
  | varRef         # varRefAtom
  ;

builtinCall
  : ABS '(' expression ')'                         # absFunc
  | BNODE ( '(' expression ')' | EMPTY_PARENS)     # bnodeFunc
  | BOUND '(' fieldRef ')'                         # boundFunc
  | CEIL '(' expression ')'                        # ceilFunc
  | COALESCE '[' iriRefOrVarRef ']' expressionList # coalesceFunc
  | CONCAT expressionList                          # concatFunc
  | CONTAINS '(' expression ',' expression ')'     # containsFunc
  | DATATYPE '(' expression ')'                    # datatypeFunc
  | DAY '(' expression ')'                         # dayFunc
  | ENCODE_FOR_URI '(' expression ')'              # encodeForUriFunc
  | EXISTS (
    '{'
    | '('
  ) expression ','? expression ','? expression (
    '}'
    | ')'
  )                                                            # existsFunc
  | FLOOR '(' expression ')'                                   # floorFunc
  | HOURS '(' expression ')'                                   # hoursFunc
  | IF '(' predicate ',' expression ',' expression ')'         # ifFunc
  | IRI '(' expression ')'                                     # iriFunc
  | ISBLANK '(' expression ')'                                 # isBlankFunc
  | ISIRI '(' expression ')'                                   # isIriFunc
  | ISLITERAL '(' expression ')'                               # isLiteralFunc
  | ISNUMERIC '(' expression ')'                               # isNumericFunc
  | ISURI '(' expression ')'                                   # isURIFunc
  | LANG '(' expression ')'                                    # langFunc
  | LANGMATCHES '(' expression ',' expression ')'              # langMatchesFunc
  | LCASE '(' expression ')'                                   # lcaseFunc
  | MD5 '(' expression ')'                                     # md5Func
  | MINUTES '(' expression ')'                                 # minutesFunc
  | MONTH '(' expression ')'                                   # monthFunc
  | NOW EMPTY_PARENS                                           # nowFunc
  | RAND EMPTY_PARENS                                          # randFunc
  | REGEX '(' expression ',' expression ( ',' expression)? ')' # regexFunc
  | REPLACE '(' expression ',' expression ',' expression (
    ',' expression
  )? ')'                                                        # replaceFunc
  | ROUND '(' expression ')'                                    # roundFunc
  | SAMETERM '(' fieldRef ',' fieldRef ')'                      # sameTermFunc
  | SECONDS '(' expression ')'                                  # secondsFunc
  | SHA1 '(' expression ')'                                     # sha1Func
  | SHA256 '(' expression ')'                                   # sha256Func
  | SHA384 '(' expression ')'                                   # sha384Func
  | SHA512 '(' expression ')'                                   # sha512Func
  | STR '(' expression ')'                                      # strFunc
  | STRAFTER '(' expression ',' expression ')'                  # strAfterFunc
  | STRBEFORE '(' expression ',' expression ')'                 # strBeforeFunc
  | STRDT '(' expression ',' iriRefOrVarRef ')'                 # strDtFunc
  | STRENDS '(' expression ',' expression ')'                   # strEndsFunc
  | STRLANG '(' expression ',' expression ')'                   # strLangFunc
  | STRLEN '(' expression ')'                                   # strLenFunc
  | STRSTARTS '(' expression ',' expression ')'                 # strStartsFunc
  | STRUUID EMPTY_PARENS                                        # strUuidFunc
  | SUBSTR '(' expression ',' expression ( ',' expression)? ')' # substrFunc
  | TIMEZONE '(' expression ')'                                 # timezoneFunc
  | TZ '(' expression ')'                                       # tzFunc
  | UCASE '(' expression ')'                                    # ucaseFunc
  | URI '(' expression ')'                                      # uriFunc
  | UUID EMPTY_PARENS                                           # uuidFunc
  | YEAR '(' expression ')'                                     # yearFunc
  ;

pattern
  : fieldRef? (
    TEXTMATCH
    | GEOMATCH
  ) stringLiteralOrVarRef (
    '(' textMatchParam (
      LIST_SEP textMatchParam
    )* ')'
  )?                                                  # textMatchPattern
  | fieldRef? WITHIN proximitySpec OF featureOrLatLon # geoNearbyPattern
  ;

textMatchParam
  : BOOST '=' numericLiteral # textMatchBoostParam
  | MIN_SCORE '=' DECIMAL    # textMatchMinScoreParam
  | MAX_HITS '=' INTEGER     # textMatchMaxHitsParam
  ;

boost
  : BOOST? numericLiteral IF_FOLLOWS iriRefOrVarRef     # followsUserBoost
  | BOOST? numericLiteral IF_FOLLOWED_BY iriRefOrVarRef # followedByUserBoost
  ;

binding
  : BIND expression AS VARNAME
  ;

featureOrLatLon
  : varRef # varFeature
  | iriRef # feature
  | LATLON '(' (
    varRef
    | numericLiteral
  ) ',' (
    varRef
    | numericLiteral
  ) ')' # latLon
  ;

proximitySpec
  : numericLiteralOrVarRef iriRefOrVarRef
  ;

functionCall
  : iriRef '[' prefixedName ']' EMPTY_PARENS   # funcWithoutArgs
  | iriRef '[' prefixedName ']' expressionList # funcWithArgs
  ;

rdfLiteral
  : stringLiteral LANGTAG     # langRdfLiteral
  | stringLiteral '^^' iriRef # dtRdfLiteral
  ;

numericLiteral
  : INTEGER # integerLiteral
  | DECIMAL # decimalLiteral
  | DOUBLE  # doubleLiteral
  ;

expressionList
  : '(' expression (
    LIST_SEP expression
  )* ')'
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
  : STRING_LITERAL1
  | STRING_LITERAL2
  ;

stringLiteralOrVarRef
  : stringLiteral
  | varRef
  ;

booleanLiteral
  : TRUE
  | FALSE
  ;

iriRefOrVarRef
  : iriRef
  | varRef
  ;

numericLiteralOrVarRef
  : numericLiteral
  | varRef
  ;

iriRef
  : IRI_REF      # literalIriRef
  | prefixedName # prefixedNameIriRef
  ;

prefixedName
  : PNAME_LN
  | PNAME_NS
  ;

blankNode
  : BLANK_NODE_LABEL
  | ANON
  ;

// LEXER RULES
ABS
  : 'ABS'
  | 'abs'
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
BIND
  : 'BIND'
  | 'bind'
  ;
BNODE
  : 'BNODE'
  | 'bnode'
  ;
BOOST
  : 'BOOST'
  | 'boost'
  ;
BOUND
  : 'BOUND'
  | 'bound'
  ;
CEIL
  : 'CEIL'
  | 'ceil'
  ;
COALESCE
  : 'COALESCE'
  | 'coalesce'
  ;
CONCAT
  : 'CONCAT'
  | 'concat'
  ;
CONTAINS
  : 'CONTAINS'
  | 'contains'
  ;
DATATYPE
  : 'DATATYPE'
  | 'datatype'
  ;
DAY
  : 'DAY'
  | 'day'
  ;
DESC
  : 'DESC'
  | 'desc'
  ;
ENCODE_FOR_URI
  : 'ENCODE_FOR_URI'
  | 'encode_for_uri'
  ;
EXISTS
  : 'EXISTS'
  | 'exists'
  ;
FALSE
  : 'FALSE'
  | 'false'
  ;
FLOOR
  : 'FLOOR'
  | 'floor'
  ;
GEOMATCH
  : 'GEOMATCH'
  | 'geomatch'
  ;
HOURS
  : 'HOURS'
  | 'hours'
  ;
IF
  : 'IF'
  | 'if'
  ;
IF_FOLLOWED_BY
  : 'IF_FOLLOWED_BY'
  | 'if_followed_by'
  ;
IF_FOLLOWS
  : 'IF_FOLLOWS'
  | 'if_follows'
  ;
IN
  : 'IN'
  | 'in'
  ;
IRI
  : 'IRI'
  | 'iri'
  ;
ISBLANK
  : 'ISBLANK'
  | 'isblank'
  ;
ISIRI
  : 'ISIRI'
  | 'isiri'
  ;
ISLITERAL
  : 'ISLITERAL'
  | 'isliteral'
  ;
ISNUMERIC
  : 'ISNUMERIC'
  | 'isnumeric'
  ;
ISURI
  : 'ISURI'
  | 'isuri'
  ;
LANG
  : 'LANG'
  | 'lang'
  ;
LANGMATCHES
  : 'LANGMATCHES'
  | 'langmatches'
  ;
LATLON
  : 'LATLON'
  | 'latlon'
  ;
LCASE
  : 'LCASE'
  | 'lcase'
  ;
LOSS_TO
  : 'LOSS_TO'
  | 'loss_to'
  ;
MAX_HITS
  : 'MAX_HITS'
  | 'max_hits'
  ;
MD5
  : 'MD5'
  | 'md5'
  ;
MIN_SCORE
  : 'MIN_SCORE'
  | 'min_score'
  ;
MINUTES
  : 'MINUTES'
  | 'minutes'
  ;
MONTH
  : 'MONTH'
  | 'month'
  ;
NEAR
  : 'NEAR'
  | 'near'
  ;
NOT
  : 'NOT'
  | 'not'
  | '!'
  ;
NOW
  : 'NOW'
  | 'now'
  ;
OBFUSCATE
  : 'OBFUSCATE'
  | 'obfuscate'
  ;
OF
  : 'OF'
  | 'of'
  ;
OR
  : 'OR'
  | 'or'
  | '||'
  ;
RAND
  : 'RAND'
  | 'rand'
  ;
REGEX
  : 'REGEX'
  | 'regex'
  ;
REPLACE
  : 'REPLACE'
  | 'replace'
  ;
ROUND
  : 'ROUND'
  | 'round'
  ;
SAMETERM
  : 'SAMETERM'
  | 'sameterm'
  ;
SECONDS
  : 'SECONDS'
  | 'seconds'
  ;
SHA1
  : 'SHA1'
  | 'sha1'
  ;
SHA256
  : 'SHA256'
  | 'sha256'
  ;
SHA384
  : 'SHA384'
  | 'sha384'
  ;
SHA512
  : 'SHA512'
  | 'sha512'
  ;
STR
  : 'STR'
  | 'str'
  ;
STRAFTER
  : 'STRAFTER'
  | 'strafter'
  ;
STRBEFORE
  : 'STRBEFORE'
  | 'strbefore'
  ;
STRDT
  : 'STRDT'
  | 'strdt'
  ;
STRENDS
  : 'STRENDS'
  | 'strends'
  ;
STRLANG
  : 'STRLANG'
  | 'strlang'
  ;
STRLEN
  : 'STRLEN'
  | 'strlen'
  ;
STRSTARTS
  : 'STRSTARTS'
  | 'strstarts'
  ;
STRUUID
  : 'STRUUID'
  | 'struuid'
  ;
SUBJECT
  : 'SUBJECT'
  | 'subject'
  ;
SUBSTR
  : 'SUBSTR'
  | 'substr'
  ;
TEXTMATCH
  : 'TEXTMATCH'
  | 'textmatch'
  ;
TIMEZONE
  : 'TIMEZONE'
  | 'timezone'
  ;
TO_UNIT
  : 'TO_UNIT'
  | 'TOUNIT'
  | 'to_unit'
  | 'tounit'
  ;
TRUE
  : 'TRUE'
  | 'true'
  ;
TZ
  : 'TZ'
  | 'tz'
  ;
UCASE
  : 'UCASE'
  | 'ucase'
  ;
URI
  : 'URI'
  | 'uri'
  ;
UUID
  : 'UUID'
  | 'uuid'
  ;
WITHIN
  : 'WITHIN'
  | 'within'
  ;
YEAR
  : 'YEAR'
  | 'year'
  ;
YOU_MAY_KNOW
  : 'YOU_MAY_KNOW'
  | 'you_may_know'
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

BLANK_NODE_LABEL
  : '_:' PN_LOCAL
  ;

LANGTAG
  : '@' PN_CHARS_BASE+ (
    '-' (
      PN_CHARS_BASE DIGIT
    )+
  )*
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

STRING_LITERAL1
  : '\'' (
    ~(
      '\u0027'
      | '\u005C'
      | '\u000A'
      | '\u000D'
    )
    | ECHAR
  )* '\''
  ;

STRING_LITERAL2
  : '"' (
    ~(
      '\u0022'
      | '\u005C'
      | '\u000A'
      | '\u000D'
    )
    | ECHAR
  )* '"'
  ;

ECHAR
  : '\\' (
    't'
    | 'b'
    | 'n'
    | 'r'
    | 'f'
    | '"'
    | '\''
  )
  ;

EMPTY_PARENS
  : '(' ')'
  ;

ANON
  : '[' ']'
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

LIST_SEP
  : [,;]
  ;

WS
  : [ \t\r\n\f]+ -> skip
  ;
