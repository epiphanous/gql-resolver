// Generated from QueryModification.g4 by ANTLR 4.6-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { QueryModificationListener } from './QueryModificationListener';

export class QueryModificationParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly T__22 = 23;
  public static readonly T__23 = 24;
  public static readonly ABS = 25;
  public static readonly AND = 26;
  public static readonly AS = 27;
  public static readonly ASC = 28;
  public static readonly BIND = 29;
  public static readonly BNODE = 30;
  public static readonly BOOST = 31;
  public static readonly BOUND = 32;
  public static readonly CEIL = 33;
  public static readonly COALESCE = 34;
  public static readonly CONCAT = 35;
  public static readonly CONTAINS = 36;
  public static readonly DATATYPE = 37;
  public static readonly DAY = 38;
  public static readonly DESC = 39;
  public static readonly ENCODE_FOR_URI = 40;
  public static readonly EXISTS = 41;
  public static readonly FALSE = 42;
  public static readonly FLOOR = 43;
  public static readonly GEOMATCH = 44;
  public static readonly HOURS = 45;
  public static readonly IF = 46;
  public static readonly IF_FOLLOWED_BY = 47;
  public static readonly IF_FOLLOWS = 48;
  public static readonly IN = 49;
  public static readonly IRI = 50;
  public static readonly ISBLANK = 51;
  public static readonly ISIRI = 52;
  public static readonly ISLITERAL = 53;
  public static readonly ISNUMERIC = 54;
  public static readonly ISURI = 55;
  public static readonly LANG = 56;
  public static readonly LANGMATCHES = 57;
  public static readonly LATLON = 58;
  public static readonly LCASE = 59;
  public static readonly LOSS_TO = 60;
  public static readonly MAX_HITS = 61;
  public static readonly MD5 = 62;
  public static readonly MIN_SCORE = 63;
  public static readonly MINUTES = 64;
  public static readonly MONTH = 65;
  public static readonly NEAR = 66;
  public static readonly NOT = 67;
  public static readonly NOW = 68;
  public static readonly OBFUSCATE = 69;
  public static readonly OF = 70;
  public static readonly OR = 71;
  public static readonly RAND = 72;
  public static readonly REGEX = 73;
  public static readonly REPLACE = 74;
  public static readonly ROUND = 75;
  public static readonly SAMETERM = 76;
  public static readonly SECONDS = 77;
  public static readonly SHA1 = 78;
  public static readonly SHA256 = 79;
  public static readonly SHA384 = 80;
  public static readonly SHA512 = 81;
  public static readonly STR = 82;
  public static readonly STRAFTER = 83;
  public static readonly STRBEFORE = 84;
  public static readonly STRDT = 85;
  public static readonly STRENDS = 86;
  public static readonly STRLANG = 87;
  public static readonly STRLEN = 88;
  public static readonly STRSTARTS = 89;
  public static readonly STRUUID = 90;
  public static readonly SUBJECT = 91;
  public static readonly SUBSTR = 92;
  public static readonly TEXTMATCH = 93;
  public static readonly TIMEZONE = 94;
  public static readonly TO_UNIT = 95;
  public static readonly TRUE = 96;
  public static readonly TZ = 97;
  public static readonly UCASE = 98;
  public static readonly URI = 99;
  public static readonly UUID = 100;
  public static readonly WITHIN = 101;
  public static readonly YEAR = 102;
  public static readonly YOU_MAY_KNOW = 103;
  public static readonly IRI_REF = 104;
  public static readonly PNAME_NS = 105;
  public static readonly PNAME_LN = 106;
  public static readonly BLANK_NODE_LABEL = 107;
  public static readonly LANGTAG = 108;
  public static readonly INTEGER = 109;
  public static readonly DECIMAL = 110;
  public static readonly DOUBLE = 111;
  public static readonly EXPONENT = 112;
  public static readonly STRING_LITERAL1 = 113;
  public static readonly STRING_LITERAL2 = 114;
  public static readonly ECHAR = 115;
  public static readonly EMPTY_PARENS = 116;
  public static readonly ANON = 117;
  public static readonly VARNAME = 118;
  public static readonly PN_PREFIX = 119;
  public static readonly PN_LOCAL = 120;
  public static readonly WS = 121;
  public static readonly RULE_filter = 0;
  public static readonly RULE_patterns = 1;
  public static readonly RULE_boosters = 2;
  public static readonly RULE_bindings = 3;
  public static readonly RULE_orderBys = 4;
  public static readonly RULE_orderBy = 5;
  public static readonly RULE_transforms = 6;
  public static readonly RULE_transform = 7;
  public static readonly RULE_searchCondition = 8;
  public static readonly RULE_searchConditionAnd = 9;
  public static readonly RULE_searchConditionNot = 10;
  public static readonly RULE_predicate = 11;
  public static readonly RULE_expression = 12;
  public static readonly RULE_expressionAtom = 13;
  public static readonly RULE_builtinCall = 14;
  public static readonly RULE_pattern = 15;
  public static readonly RULE_textMatchParam = 16;
  public static readonly RULE_boost = 17;
  public static readonly RULE_binding = 18;
  public static readonly RULE_expressionList = 19;
  public static readonly RULE_featureOrLatLon = 20;
  public static readonly RULE_proximitySpec = 21;
  public static readonly RULE_functionCall = 22;
  public static readonly RULE_rdfLiteral = 23;
  public static readonly RULE_numericLiteral = 24;
  public static readonly RULE_varRef = 25;
  public static readonly RULE_fieldRef = 26;
  public static readonly RULE_comparisonOp = 27;
  public static readonly RULE_unaryOp = 28;
  public static readonly RULE_factorOp = 29;
  public static readonly RULE_termOp = 30;
  public static readonly RULE_stringLiteral = 31;
  public static readonly RULE_stringLiteralOrVarRef = 32;
  public static readonly RULE_booleanLiteral = 33;
  public static readonly RULE_iriRefOrVarRef = 34;
  public static readonly RULE_numericLiteralOrVarRef = 35;
  public static readonly RULE_iriRef = 36;
  public static readonly RULE_prefixedName = 37;
  public static readonly RULE_blankNode = 38;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'filter',
    'patterns',
    'boosters',
    'bindings',
    'orderBys',
    'orderBy',
    'transforms',
    'transform',
    'searchCondition',
    'searchConditionAnd',
    'searchConditionNot',
    'predicate',
    'expression',
    'expressionAtom',
    'builtinCall',
    'pattern',
    'textMatchParam',
    'boost',
    'binding',
    'expressionList',
    'featureOrLatLon',
    'proximitySpec',
    'functionCall',
    'rdfLiteral',
    'numericLiteral',
    'varRef',
    'fieldRef',
    'comparisonOp',
    'unaryOp',
    'factorOp',
    'termOp',
    'stringLiteral',
    'stringLiteralOrVarRef',
    'booleanLiteral',
    'iriRefOrVarRef',
    'numericLiteralOrVarRef',
    'iriRef',
    'prefixedName',
    'blankNode',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "','",
    "'('",
    "')'",
    "'['",
    "']'",
    "'{'",
    "'}'",
    "'='",
    "'^^'",
    "'$'",
    "'>'",
    "'>='",
    "'<'",
    "'<='",
    "'!='",
    "'~'",
    "'~*'",
    "'!~'",
    "'!~*'",
    "'-'",
    "'+'",
    "'*'",
    "'/'",
    "'%'",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'ABS',
    'AND',
    'AS',
    'ASC',
    'BIND',
    'BNODE',
    'BOOST',
    'BOUND',
    'CEIL',
    'COALESCE',
    'CONCAT',
    'CONTAINS',
    'DATATYPE',
    'DAY',
    'DESC',
    'ENCODE_FOR_URI',
    'EXISTS',
    'FALSE',
    'FLOOR',
    'GEOMATCH',
    'HOURS',
    'IF',
    'IF_FOLLOWED_BY',
    'IF_FOLLOWS',
    'IN',
    'IRI',
    'ISBLANK',
    'ISIRI',
    'ISLITERAL',
    'ISNUMERIC',
    'ISURI',
    'LANG',
    'LANGMATCHES',
    'LATLON',
    'LCASE',
    'LOSS_TO',
    'MAX_HITS',
    'MD5',
    'MIN_SCORE',
    'MINUTES',
    'MONTH',
    'NEAR',
    'NOT',
    'NOW',
    'OBFUSCATE',
    'OF',
    'OR',
    'RAND',
    'REGEX',
    'REPLACE',
    'ROUND',
    'SAMETERM',
    'SECONDS',
    'SHA1',
    'SHA256',
    'SHA384',
    'SHA512',
    'STR',
    'STRAFTER',
    'STRBEFORE',
    'STRDT',
    'STRENDS',
    'STRLANG',
    'STRLEN',
    'STRSTARTS',
    'STRUUID',
    'SUBJECT',
    'SUBSTR',
    'TEXTMATCH',
    'TIMEZONE',
    'TO_UNIT',
    'TRUE',
    'TZ',
    'UCASE',
    'URI',
    'UUID',
    'WITHIN',
    'YEAR',
    'YOU_MAY_KNOW',
    'IRI_REF',
    'PNAME_NS',
    'PNAME_LN',
    'BLANK_NODE_LABEL',
    'LANGTAG',
    'INTEGER',
    'DECIMAL',
    'DOUBLE',
    'EXPONENT',
    'STRING_LITERAL1',
    'STRING_LITERAL2',
    'ECHAR',
    'EMPTY_PARENS',
    'ANON',
    'VARNAME',
    'PN_PREFIX',
    'PN_LOCAL',
    'WS',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    QueryModificationParser._LITERAL_NAMES,
    QueryModificationParser._SYMBOLIC_NAMES,
    []
  );

  // @Override
  private static readonly _serializedATNSegments: number = 2;

  // tslint:enable:no-trailing-whitespace
  private static readonly _serializedATNSegment0: string =
    '\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03{\u02B0\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x03\x02\x03\x02\x03\x02" +
    '\x03\x03\x03\x03\x03\x03\x07\x03W\n\x03\f\x03\x0E\x03Z\v\x03\x03\x03\x03' +
    '\x03\x03\x04\x03\x04\x03\x04\x07\x04a\n\x04\f\x04\x0E\x04d\v\x04\x03\x04' +
    '\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05k\n\x05\f\x05\x0E\x05n\v\x05\x03' +
    '\x05\x03\x05\x03\x06\x03\x06\x03\x06\x07\x06u\n\x06\f\x06\x0E\x06x\v\x06' +
    '\x03\x06\x03\x06\x03\x07\x03\x07\x05\x07~\n\x07\x03\b\x03\b\x03\b\x07' +
    '\b\x83\n\b\f\b\x0E\b\x86\v\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t' +
    '\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\t\x98\n\t\x03' +
    '\n\x03\n\x03\n\x07\n\x9D\n\n\f\n\x0E\n\xA0\v\n\x03\v\x03\v\x03\v\x07\v' +
    '\xA5\n\v\f\v\x0E\v\xA8\v\v\x03\f\x05\f\xAB\n\f\x03\f\x03\f\x03\r\x03\r' +
    '\x03\r\x03\r\x03\r\x03\r\x05\r\xB5\n\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05' +
    '\r\xBC\n\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\xC5\n\r\x03' +
    '\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05' +
    '\x0E\xD0\n\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E' +
    '\x03\x0E\x07\x0E\xDA\n\x0E\f\x0E\x0E\x0E\xDD\v\x0E\x03\x0F\x03\x0F\x03' +
    '\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xE8\n\x0F' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u011B\n\x10\x03\x10\x03\x10\x05' +
    '\x10\u011F\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u0180' +
    '\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x05\x10\u018D\n\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u01F3\n\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x05\x10\u0212\n\x10\x03\x11\x05\x11\u0215\n\x11\x03\x11' +
    '\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07\x11\u021D\n\x11\f\x11\x0E' +
    '\x11\u0220\v\x11\x03\x11\x03\x11\x05\x11\u0224\n\x11\x03\x11\x05\x11\u0227' +
    '\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u022E\n\x11\x03' +
    '\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05' +
    '\x12\u0239\n\x12\x03\x13\x05\x13\u023C\n\x13\x03\x13\x03\x13\x03\x13\x03' +
    '\x13\x03\x13\x05\x13\u0243\n\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13' +
    '\u0249\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03' +
    '\x15\x03\x15\x07\x15\u0254\n\x15\f\x15\x0E\x15\u0257\v\x15\x03\x15\x03' +
    '\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0261\n\x16' +
    '\x03\x16\x03\x16\x03\x16\x05\x16\u0266\n\x16\x03\x16\x03\x16\x05\x16\u026A' +
    '\n\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\u027B' +
    '\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19' +
    '\u0284\n\x19\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u0289\n\x1A\x03\x1B\x03\x1B' +
    '\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F' +
    '\x03 \x03 \x03!\x03!\x03"\x03"\x05"\u029C\n"\x03#\x03#\x03$\x03$\x05' +
    "$\u02A2\n$\x03%\x03%\x05%\u02A6\n%\x03&\x03&\x05&\u02AA\n&\x03'\x03'" +
    '\x03(\x03(\x03(\x02\x02\x03\x1A)\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f' +
    '\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E' +
    '\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02' +
    ':\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02\x02\r\x04\x02' +
    '\x1E\x1E))\x04\x02\x04\x04\b\b\x04\x02\x05\x05\t\t\x04\x02..__\x04\x02' +
    '\n\n\r\x15\x03\x02\x16\x17\x03\x02\x18\x1A\x03\x02st\x04\x02,,bb\x03\x02' +
    'kl\x04\x02mmww\u02FD\x02P\x03\x02\x02\x02\x04S\x03\x02\x02\x02\x06]\x03' +
    '\x02\x02\x02\bg\x03\x02\x02\x02\nq\x03\x02\x02\x02\f{\x03\x02\x02\x02' +
    '\x0E\x7F\x03\x02\x02\x02\x10\x97\x03\x02\x02\x02\x12\x99\x03\x02\x02\x02' +
    '\x14\xA1\x03\x02\x02\x02\x16\xAA\x03\x02\x02\x02\x18\xC4\x03\x02\x02\x02' +
    '\x1A\xCF\x03\x02\x02\x02\x1C\xE7\x03\x02\x02\x02\x1E\u0211\x03\x02\x02' +
    '\x02 \u022D\x03\x02\x02\x02"\u0238\x03\x02\x02\x02$\u0248\x03\x02\x02' +
    '\x02&\u024A\x03\x02\x02\x02(\u024F\x03\x02\x02\x02*\u0269\x03\x02\x02' +
    '\x02,\u026B\x03\x02\x02\x02.\u027A\x03\x02\x02\x020\u0283\x03\x02\x02' +
    '\x022\u0288\x03\x02\x02\x024\u028A\x03\x02\x02\x026\u028D\x03\x02\x02' +
    '\x028\u028F\x03\x02\x02\x02:\u0291\x03\x02\x02\x02<\u0293\x03\x02\x02' +
    '\x02>\u0295\x03\x02\x02\x02@\u0297\x03\x02\x02\x02B\u029B\x03\x02\x02' +
    '\x02D\u029D\x03\x02\x02\x02F\u02A1\x03\x02\x02\x02H\u02A5\x03\x02\x02' +
    '\x02J\u02A9\x03\x02\x02\x02L\u02AB\x03\x02\x02\x02N\u02AD\x03\x02\x02' +
    '\x02PQ\x05\x12\n\x02QR\x07\x02\x02\x03R\x03\x03\x02\x02\x02SX\x05 \x11' +
    '\x02TU\x07\x03\x02\x02UW\x05 \x11\x02VT\x03\x02\x02\x02WZ\x03\x02\x02' +
    '\x02XV\x03\x02\x02\x02XY\x03\x02\x02\x02Y[\x03\x02\x02\x02ZX\x03\x02\x02' +
    '\x02[\\\x07\x02\x02\x03\\\x05\x03\x02\x02\x02]b\x05$\x13\x02^_\x07\x03' +
    '\x02\x02_a\x05$\x13\x02`^\x03\x02\x02\x02ad\x03\x02\x02\x02b`\x03\x02' +
    '\x02\x02bc\x03\x02\x02\x02ce\x03\x02\x02\x02db\x03\x02\x02\x02ef\x07\x02' +
    '\x02\x03f\x07\x03\x02\x02\x02gl\x05&\x14\x02hi\x07\x03\x02\x02ik\x05&' +
    '\x14\x02jh\x03\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02\x02\x02lm\x03\x02' +
    '\x02\x02mo\x03\x02\x02\x02nl\x03\x02\x02\x02op\x07\x02\x02\x03p\t\x03' +
    '\x02\x02\x02qv\x05\f\x07\x02rs\x07\x03\x02\x02su\x05\f\x07\x02tr\x03\x02' +
    '\x02\x02ux\x03\x02\x02\x02vt\x03\x02\x02\x02vw\x03\x02\x02\x02wy\x03\x02' +
    '\x02\x02xv\x03\x02\x02\x02yz\x07\x02\x02\x03z\v\x03\x02\x02\x02{}\x05' +
    '\x1A\x0E\x02|~\t\x02\x02\x02}|\x03\x02\x02\x02}~\x03\x02\x02\x02~\r\x03' +
    '\x02\x02\x02\x7F\x84\x05\x10\t\x02\x80\x81\x07\x03\x02\x02\x81\x83\x05' +
    '\x10\t\x02\x82\x80\x03\x02\x02\x02\x83\x86\x03\x02\x02\x02\x84\x82\x03' +
    '\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85\x87\x03\x02\x02\x02\x86\x84\x03' +
    '\x02\x02\x02\x87\x88\x07\x02\x02\x03\x88\x0F\x03\x02\x02\x02\x89\x8A\x07' +
    'a\x02\x02\x8A\x98\x05F$\x02\x8B\x98\x07\x1B\x02\x02\x8C\x98\x07#\x02\x02' +
    '\x8D\x98\x07-\x02\x02\x8E\x98\x07=\x02\x02\x8F\x98\x07@\x02\x02\x90\x98' +
    '\x07G\x02\x02\x91\x98\x07M\x02\x02\x92\x98\x07P\x02\x02\x93\x98\x07Q\x02' +
    '\x02\x94\x98\x07R\x02\x02\x95\x98\x07S\x02\x02\x96\x98\x07d\x02\x02\x97' +
    '\x89\x03\x02\x02\x02\x97\x8B\x03\x02\x02\x02\x97\x8C\x03\x02\x02\x02\x97' +
    '\x8D\x03\x02\x02\x02\x97\x8E\x03\x02\x02\x02\x97\x8F\x03\x02\x02\x02\x97' +
    '\x90\x03\x02\x02\x02\x97\x91\x03\x02\x02\x02\x97\x92\x03\x02\x02\x02\x97' +
    '\x93\x03\x02\x02\x02\x97\x94\x03\x02\x02\x02\x97\x95\x03\x02\x02\x02\x97' +
    '\x96\x03\x02\x02\x02\x98\x11\x03\x02\x02\x02\x99\x9E\x05\x14\v\x02\x9A' +
    '\x9B\x07I\x02\x02\x9B\x9D\x05\x14\v\x02\x9C\x9A\x03\x02\x02\x02\x9D\xA0' +
    '\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\x13' +
    '\x03\x02\x02\x02\xA0\x9E\x03\x02\x02\x02\xA1\xA6\x05\x16\f\x02\xA2\xA3' +
    '\x07\x1C\x02\x02\xA3\xA5\x05\x16\f\x02\xA4\xA2\x03\x02\x02\x02\xA5\xA8' +
    '\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\x15' +
    '\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9\xAB\x07E\x02\x02\xAA\xA9' +
    '\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC\xAD' +
    '\x05\x18\r\x02\xAD\x17\x03\x02\x02\x02\xAE\xAF\x05\x1A\x0E\x02\xAF\xB0' +
    '\x058\x1D\x02\xB0\xB1\x05\x1A\x0E\x02\xB1\xC5\x03\x02\x02\x02\xB2\xB4' +
    '\x05\x1A\x0E\x02\xB3\xB5\x07E\x02\x02\xB4\xB3\x03\x02\x02\x02\xB4\xB5' +
    '\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02\xB6\xB7\x073\x02\x02\xB7\xB8' +
    '\x05(\x15\x02\xB8\xC5\x03\x02\x02\x02\xB9\xBB\x05\x1A\x0E\x02\xBA\xBC' +
    '\x07E\x02\x02\xBB\xBA\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBD' +
    '\x03\x02\x02\x02\xBD\xBE\x073\x02\x02\xBE\xBF\x054\x1B\x02\xBF\xC5\x03' +
    '\x02\x02\x02\xC0\xC1\x07\x04\x02\x02\xC1\xC2\x05\x12\n\x02\xC2\xC3\x07' +
    '\x05\x02\x02\xC3\xC5\x03\x02\x02\x02\xC4\xAE\x03\x02\x02\x02\xC4\xB2\x03' +
    '\x02\x02\x02\xC4\xB9\x03\x02\x02\x02\xC4\xC0\x03\x02\x02\x02\xC5\x19\x03' +
    '\x02\x02\x02\xC6\xC7\b\x0E\x01\x02\xC7\xC8\x05:\x1E\x02\xC8\xC9\x05\x1A' +
    '\x0E\x07\xC9\xD0\x03\x02\x02\x02\xCA\xD0\x05\x1C\x0F\x02\xCB\xCC\x07\x04' +
    '\x02\x02\xCC\xCD\x05\x1A\x0E\x02\xCD\xCE\x07\x05\x02\x02\xCE\xD0\x03\x02' +
    '\x02\x02\xCF\xC6\x03\x02\x02\x02\xCF\xCA\x03\x02\x02\x02\xCF\xCB\x03\x02' +
    '\x02\x02\xD0\xDB\x03\x02\x02\x02\xD1\xD2\f\x06\x02\x02\xD2\xD3\x05<\x1F' +
    '\x02\xD3\xD4\x05\x1A\x0E\x07\xD4\xDA\x03\x02\x02\x02\xD5\xD6\f\x05\x02' +
    '\x02\xD6\xD7\x05> \x02\xD7\xD8\x05\x1A\x0E\x06\xD8\xDA\x03\x02\x02\x02' +
    '\xD9\xD1\x03\x02\x02\x02\xD9\xD5\x03\x02\x02\x02\xDA\xDD\x03\x02\x02\x02' +
    '\xDB\xD9\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\x1B\x03\x02\x02\x02' +
    '\xDD\xDB\x03\x02\x02\x02\xDE\xE8\x05\x1E\x10\x02\xDF\xE8\x05.\x18\x02' +
    '\xE0\xE8\x050\x19\x02\xE1\xE8\x05@!\x02\xE2\xE8\x052\x1A\x02\xE3\xE8\x05' +
    'D#\x02\xE4\xE8\x05J&\x02\xE5\xE8\x056\x1C\x02\xE6\xE8\x054\x1B\x02\xE7' +
    '\xDE\x03\x02\x02\x02\xE7\xDF\x03\x02\x02\x02\xE7\xE0\x03\x02\x02\x02\xE7' +
    '\xE1\x03\x02\x02\x02\xE7\xE2\x03\x02\x02\x02\xE7\xE3\x03\x02\x02\x02\xE7' +
    '\xE4\x03\x02\x02\x02\xE7\xE5\x03\x02\x02\x02\xE7\xE6\x03\x02\x02\x02\xE8' +
    '\x1D\x03\x02\x02\x02\xE9\xEA\x07\x1B\x02\x02\xEA\xEB\x07\x04\x02\x02\xEB' +
    '\xEC\x05\x1A\x0E\x02\xEC\xED\x07\x05\x02\x02\xED\u0212\x03\x02\x02\x02' +
    '\xEE\xEF\x07"\x02\x02\xEF\xF0\x07\x04\x02\x02\xF0\xF1\x056\x1C\x02\xF1' +
    '\xF2\x07\x05\x02\x02\xF2\u0212\x03\x02\x02\x02\xF3\xF4\x07#\x02\x02\xF4' +
    '\xF5\x07\x04\x02\x02\xF5\xF6\x05\x1A\x0E\x02\xF6\xF7\x07\x05\x02\x02\xF7' +
    '\u0212\x03\x02\x02\x02\xF8\xF9\x07$\x02\x02\xF9\xFA\x07\x06\x02\x02\xFA' +
    '\xFB\x05F$\x02\xFB\xFC\x07\x07\x02\x02\xFC\xFD\x05(\x15\x02\xFD\u0212' +
    '\x03\x02\x02\x02\xFE\xFF\x07%\x02\x02\xFF\u0212\x05(\x15\x02\u0100\u0101' +
    '\x07&\x02\x02\u0101\u0102\x07\x04\x02\x02\u0102\u0103\x05\x1A\x0E\x02' +
    '\u0103\u0104\x07\x03\x02\x02\u0104\u0105\x05\x1A\x0E\x02\u0105\u0106\x07' +
    "\x05\x02\x02\u0106\u0212\x03\x02\x02\x02\u0107\u0108\x07'\x02\x02\u0108" +
    '\u0109\x07\x04\x02\x02\u0109\u010A\x05\x1A\x0E\x02\u010A\u010B\x07\x05' +
    '\x02\x02\u010B\u0212\x03\x02\x02\x02\u010C\u010D\x07(\x02\x02\u010D\u010E' +
    '\x07\x04\x02\x02\u010E\u010F\x05\x1A\x0E\x02\u010F\u0110\x07\x05\x02\x02' +
    '\u0110\u0212\x03\x02\x02\x02\u0111\u0112\x07*\x02\x02\u0112\u0113\x07' +
    '\x04\x02\x02\u0113\u0114\x05\x1A\x0E\x02\u0114\u0115\x07\x05\x02\x02\u0115' +
    '\u0212\x03\x02\x02\x02\u0116\u0117\x07+\x02\x02\u0117\u0118\t\x03\x02' +
    '\x02\u0118\u011A\x05\x1A\x0E\x02\u0119\u011B\x07\x03\x02\x02\u011A\u0119' +
    '\x03\x02\x02\x02\u011A\u011B\x03\x02\x02\x02\u011B\u011C\x03\x02\x02\x02' +
    '\u011C\u011E\x05\x1A\x0E\x02\u011D\u011F\x07\x03\x02\x02\u011E\u011D\x03' +
    '\x02\x02\x02\u011E\u011F\x03\x02\x02\x02\u011F\u0120\x03\x02\x02\x02\u0120' +
    '\u0121\x05\x1A\x0E\x02\u0121\u0122\t\x04\x02\x02\u0122\u0212\x03\x02\x02' +
    '\x02\u0123\u0124\x07-\x02\x02\u0124\u0125\x07\x04\x02\x02\u0125\u0126' +
    '\x05\x1A\x0E\x02\u0126\u0127\x07\x05\x02\x02\u0127\u0212\x03\x02\x02\x02' +
    '\u0128\u0129\x07/\x02\x02\u0129\u012A\x07\x04\x02\x02\u012A\u012B\x05' +
    '\x1A\x0E\x02\u012B\u012C\x07\x05\x02\x02\u012C\u0212\x03\x02\x02\x02\u012D' +
    '\u012E\x070\x02\x02\u012E\u012F\x07\x04\x02\x02\u012F\u0130\x05\x18\r' +
    '\x02\u0130\u0131\x07\x03\x02\x02\u0131\u0132\x05\x1A\x0E\x02\u0132\u0133' +
    '\x07\x03\x02\x02\u0133\u0134\x05\x1A\x0E\x02\u0134\u0135\x07\x05\x02\x02' +
    '\u0135\u0212\x03\x02\x02\x02\u0136\u0137\x074\x02\x02\u0137\u0138\x07' +
    '\x04\x02\x02\u0138\u0139\x05\x1A\x0E\x02\u0139\u013A\x07\x05\x02\x02\u013A' +
    '\u0212\x03\x02\x02\x02\u013B\u013C\x075\x02\x02\u013C\u013D\x07\x04\x02' +
    '\x02\u013D\u013E\x05\x1A\x0E\x02\u013E\u013F\x07\x05\x02\x02\u013F\u0212' +
    '\x03\x02\x02\x02\u0140\u0141\x076\x02\x02\u0141\u0142\x07\x04\x02\x02' +
    '\u0142\u0143\x05\x1A\x0E\x02\u0143\u0144\x07\x05\x02\x02\u0144\u0212\x03' +
    '\x02\x02\x02\u0145\u0146\x077\x02\x02\u0146\u0147\x07\x04\x02\x02\u0147' +
    '\u0148\x05\x1A\x0E\x02\u0148\u0149\x07\x05\x02\x02\u0149\u0212\x03\x02' +
    '\x02\x02\u014A\u014B\x078\x02\x02\u014B\u014C\x07\x04\x02\x02\u014C\u014D' +
    '\x05\x1A\x0E\x02\u014D\u014E\x07\x05\x02\x02\u014E\u0212\x03\x02\x02\x02' +
    '\u014F\u0150\x079\x02\x02\u0150\u0151\x07\x04\x02\x02\u0151\u0152\x05' +
    '\x1A\x0E\x02\u0152\u0153\x07\x05\x02\x02\u0153\u0212\x03\x02\x02\x02\u0154' +
    '\u0155\x07:\x02\x02\u0155\u0156\x07\x04\x02\x02\u0156\u0157\x05\x1A\x0E' +
    '\x02\u0157\u0158\x07\x05\x02\x02\u0158\u0212\x03\x02\x02\x02\u0159\u015A' +
    '\x07;\x02\x02\u015A\u015B\x07\x04\x02\x02\u015B\u015C\x05\x1A\x0E\x02' +
    '\u015C\u015D\x07\x03\x02\x02\u015D\u015E\x05\x1A\x0E\x02\u015E\u015F\x07' +
    '\x05\x02\x02\u015F\u0212\x03\x02\x02\x02\u0160\u0161\x07=\x02\x02\u0161' +
    '\u0162\x07\x04\x02\x02\u0162\u0163\x05\x1A\x0E\x02\u0163\u0164\x07\x05' +
    '\x02\x02\u0164\u0212\x03\x02\x02\x02\u0165\u0166\x07@\x02\x02\u0166\u0167' +
    '\x07\x04\x02\x02\u0167\u0168\x05\x1A\x0E\x02\u0168\u0169\x07\x05\x02\x02' +
    '\u0169\u0212\x03\x02\x02\x02\u016A\u016B\x07B\x02\x02\u016B\u016C\x07' +
    '\x04\x02\x02\u016C\u016D\x05\x1A\x0E\x02\u016D\u016E\x07\x05\x02\x02\u016E' +
    '\u0212\x03\x02\x02\x02\u016F\u0170\x07C\x02\x02\u0170\u0171\x07\x04\x02' +
    '\x02\u0171\u0172\x05\x1A\x0E\x02\u0172\u0173\x07\x05\x02\x02\u0173\u0212' +
    '\x03\x02\x02\x02\u0174\u0175\x07F\x02\x02\u0175\u0212\x07v\x02\x02\u0176' +
    '\u0177\x07J\x02\x02\u0177\u0212\x07v\x02\x02\u0178\u0179\x07K\x02\x02' +
    '\u0179\u017A\x07\x04\x02\x02\u017A\u017B\x05\x1A\x0E\x02\u017B\u017C\x07' +
    '\x03\x02\x02\u017C\u017F\x05\x1A\x0E\x02\u017D\u017E\x07\x03\x02\x02\u017E' +
    '\u0180\x05\x1A\x0E\x02\u017F\u017D\x03\x02\x02\x02\u017F\u0180\x03\x02' +
    '\x02\x02\u0180\u0181\x03\x02\x02\x02\u0181\u0182\x07\x05\x02\x02\u0182' +
    '\u0212\x03\x02\x02\x02\u0183\u0184\x07L\x02\x02\u0184\u0185\x07\x04\x02' +
    '\x02\u0185\u0186\x05\x1A\x0E\x02\u0186\u0187\x07\x03\x02\x02\u0187\u0188' +
    '\x05\x1A\x0E\x02\u0188\u0189\x07\x03\x02\x02\u0189\u018C\x05\x1A\x0E\x02' +
    '\u018A\u018B\x07\x03\x02\x02\u018B\u018D\x05\x1A\x0E\x02\u018C\u018A\x03' +
    '\x02\x02\x02\u018C\u018D\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02\u018E' +
    '\u018F\x07\x05\x02\x02\u018F\u0212\x03\x02\x02\x02\u0190\u0191\x07M\x02' +
    '\x02\u0191\u0192\x07\x04\x02\x02\u0192\u0193\x05\x1A\x0E\x02\u0193\u0194' +
    '\x07\x05\x02\x02\u0194\u0212\x03\x02\x02\x02\u0195\u0196\x07N\x02\x02' +
    '\u0196\u0197\x07\x04\x02\x02\u0197\u0198\x056\x1C\x02\u0198\u0199\x07' +
    '\x03\x02\x02\u0199\u019A\x056\x1C\x02\u019A\u019B\x07\x05\x02\x02\u019B' +
    '\u0212\x03\x02\x02\x02\u019C\u019D\x07O\x02\x02\u019D\u019E\x07\x04\x02' +
    '\x02\u019E\u019F\x05\x1A\x0E\x02\u019F\u01A0\x07\x05\x02\x02\u01A0\u0212' +
    '\x03\x02\x02\x02\u01A1\u01A2\x07P\x02\x02\u01A2\u01A3\x07\x04\x02\x02' +
    '\u01A3\u01A4\x05\x1A\x0E\x02\u01A4\u01A5\x07\x05\x02\x02\u01A5\u0212\x03' +
    '\x02\x02\x02\u01A6\u01A7\x07Q\x02\x02\u01A7\u01A8\x07\x04\x02\x02\u01A8' +
    '\u01A9\x05\x1A\x0E\x02\u01A9\u01AA\x07\x05\x02\x02\u01AA\u0212\x03\x02' +
    '\x02\x02\u01AB\u01AC\x07R\x02\x02\u01AC\u01AD\x07\x04\x02\x02\u01AD\u01AE' +
    '\x05\x1A\x0E\x02\u01AE\u01AF\x07\x05\x02\x02\u01AF\u0212\x03\x02\x02\x02' +
    '\u01B0\u01B1\x07S\x02\x02\u01B1\u01B2\x07\x04\x02\x02\u01B2\u01B3\x05' +
    '\x1A\x0E\x02\u01B3\u01B4\x07\x05\x02\x02\u01B4\u0212\x03\x02\x02\x02\u01B5' +
    '\u01B6\x07T\x02\x02\u01B6\u01B7\x07\x04\x02\x02\u01B7\u01B8\x05\x1A\x0E' +
    '\x02\u01B8\u01B9\x07\x05\x02\x02\u01B9\u0212\x03\x02\x02\x02\u01BA\u01BB' +
    '\x07U\x02\x02\u01BB\u01BC\x07\x04\x02\x02\u01BC\u01BD\x05\x1A\x0E\x02' +
    '\u01BD\u01BE\x07\x03\x02\x02\u01BE\u01BF\x05\x1A\x0E\x02\u01BF\u01C0\x07' +
    '\x05\x02\x02\u01C0\u0212\x03\x02\x02\x02\u01C1\u01C2\x07V\x02\x02\u01C2' +
    '\u01C3\x07\x04\x02\x02\u01C3\u01C4\x05\x1A\x0E\x02\u01C4\u01C5\x07\x03' +
    '\x02\x02\u01C5\u01C6\x05\x1A\x0E\x02\u01C6\u01C7\x07\x05\x02\x02\u01C7' +
    '\u0212\x03\x02\x02\x02\u01C8\u01C9\x07W\x02\x02\u01C9\u01CA\x07\x04\x02' +
    '\x02\u01CA\u01CB\x05\x1A\x0E\x02\u01CB\u01CC\x07\x03\x02\x02\u01CC\u01CD' +
    '\x05F$\x02\u01CD\u01CE\x07\x05\x02\x02\u01CE\u0212\x03\x02\x02\x02\u01CF' +
    '\u01D0\x07X\x02\x02\u01D0\u01D1\x07\x04\x02\x02\u01D1\u01D2\x05\x1A\x0E' +
    '\x02\u01D2\u01D3\x07\x03\x02\x02\u01D3\u01D4\x05\x1A\x0E\x02\u01D4\u01D5' +
    '\x07\x05\x02\x02\u01D5\u0212\x03\x02\x02\x02\u01D6\u01D7\x07Y\x02\x02' +
    '\u01D7\u01D8\x07\x04\x02\x02\u01D8\u01D9\x05\x1A\x0E\x02\u01D9\u01DA\x07' +
    '\x03\x02\x02\u01DA\u01DB\x05\x1A\x0E\x02\u01DB\u01DC\x07\x05\x02\x02\u01DC' +
    '\u0212\x03\x02\x02\x02\u01DD\u01DE\x07Z\x02\x02\u01DE\u01DF\x07\x04\x02' +
    '\x02\u01DF\u01E0\x05\x1A\x0E\x02\u01E0\u01E1\x07\x05\x02\x02\u01E1\u0212' +
    '\x03\x02\x02\x02\u01E2\u01E3\x07[\x02\x02\u01E3\u01E4\x07\x04\x02\x02' +
    '\u01E4\u01E5\x05\x1A\x0E\x02\u01E5\u01E6\x07\x03\x02\x02\u01E6\u01E7\x05' +
    '\x1A\x0E\x02\u01E7\u01E8\x07\x05\x02\x02\u01E8\u0212\x03\x02\x02\x02\u01E9' +
    '\u01EA\x07\\\x02\x02\u01EA\u0212\x07v\x02\x02\u01EB\u01EC\x07^\x02\x02' +
    '\u01EC\u01ED\x07\x04\x02\x02\u01ED\u01EE\x05\x1A\x0E\x02\u01EE\u01EF\x07' +
    '\x03\x02\x02\u01EF\u01F2\x05\x1A\x0E\x02\u01F0\u01F1\x07\x03\x02\x02\u01F1' +
    '\u01F3\x05\x1A\x0E\x02\u01F2\u01F0\x03\x02\x02\x02\u01F2\u01F3\x03\x02' +
    '\x02\x02\u01F3\u01F4\x03\x02\x02\x02\u01F4\u01F5\x07\x05\x02\x02\u01F5' +
    '\u0212\x03\x02\x02\x02\u01F6\u01F7\x07`\x02\x02\u01F7\u01F8\x07\x04\x02' +
    '\x02\u01F8\u01F9\x05\x1A\x0E\x02\u01F9\u01FA\x07\x05\x02\x02\u01FA\u0212' +
    '\x03\x02\x02\x02\u01FB\u01FC\x07c\x02\x02\u01FC\u01FD\x07\x04\x02\x02' +
    '\u01FD\u01FE\x05\x1A\x0E\x02\u01FE\u01FF\x07\x05\x02\x02\u01FF\u0212\x03' +
    '\x02\x02\x02\u0200\u0201\x07d\x02\x02\u0201\u0202\x07\x04\x02\x02\u0202' +
    '\u0203\x05\x1A\x0E\x02\u0203\u0204\x07\x05\x02\x02\u0204\u0212\x03\x02' +
    '\x02\x02\u0205\u0206\x07e\x02\x02\u0206\u0207\x07\x04\x02\x02\u0207\u0208' +
    '\x05\x1A\x0E\x02\u0208\u0209\x07\x05\x02\x02\u0209\u0212\x03\x02\x02\x02' +
    '\u020A\u020B\x07f\x02\x02\u020B\u0212\x07v\x02\x02\u020C\u020D\x07h\x02' +
    '\x02\u020D\u020E\x07\x04\x02\x02\u020E\u020F\x05\x1A\x0E\x02\u020F\u0210' +
    '\x07\x05\x02\x02\u0210\u0212\x03\x02\x02\x02\u0211\xE9\x03\x02\x02\x02' +
    '\u0211\xEE\x03\x02\x02\x02\u0211\xF3\x03\x02\x02\x02\u0211\xF8\x03\x02' +
    '\x02\x02\u0211\xFE\x03\x02\x02\x02\u0211\u0100\x03\x02\x02\x02\u0211\u0107' +
    '\x03\x02\x02\x02\u0211\u010C\x03\x02\x02\x02\u0211\u0111\x03\x02\x02\x02' +
    '\u0211\u0116\x03\x02\x02\x02\u0211\u0123\x03\x02\x02\x02\u0211\u0128\x03' +
    '\x02\x02\x02\u0211\u012D\x03\x02\x02\x02\u0211\u0136\x03\x02\x02\x02\u0211' +
    '\u013B\x03\x02\x02\x02\u0211\u0140\x03\x02\x02\x02\u0211\u0145\x03\x02' +
    '\x02\x02\u0211\u014A\x03\x02\x02\x02\u0211\u014F\x03\x02\x02\x02\u0211' +
    '\u0154\x03\x02\x02\x02\u0211\u0159\x03\x02\x02\x02\u0211\u0160\x03\x02' +
    '\x02\x02\u0211\u0165\x03\x02\x02\x02\u0211\u016A\x03\x02\x02\x02\u0211' +
    '\u016F\x03\x02\x02\x02\u0211\u0174\x03\x02\x02\x02\u0211\u0176\x03\x02' +
    '\x02\x02\u0211\u0178\x03\x02\x02\x02\u0211\u0183\x03\x02\x02\x02\u0211' +
    '\u0190\x03\x02\x02\x02\u0211\u0195\x03\x02\x02\x02\u0211\u019C\x03\x02' +
    '\x02\x02\u0211\u01A1\x03\x02\x02\x02\u0211\u01A6\x03\x02\x02\x02\u0211' +
    '\u01AB\x03\x02\x02\x02\u0211\u01B0\x03\x02\x02\x02\u0211\u01B5\x03\x02' +
    '\x02\x02\u0211\u01BA\x03\x02\x02\x02\u0211\u01C1\x03\x02\x02\x02';
  private static readonly _serializedATNSegment1: string =
    '\u0211\u01C8\x03\x02\x02\x02\u0211\u01CF\x03\x02\x02\x02\u0211\u01D6\x03' +
    '\x02\x02\x02\u0211\u01DD\x03\x02\x02\x02\u0211\u01E2\x03\x02\x02\x02\u0211' +
    '\u01E9\x03\x02\x02\x02\u0211\u01EB\x03\x02\x02\x02\u0211\u01F6\x03\x02' +
    '\x02\x02\u0211\u01FB\x03\x02\x02\x02\u0211\u0200\x03\x02\x02\x02\u0211' +
    '\u0205\x03\x02\x02\x02\u0211\u020A\x03\x02\x02\x02\u0211\u020C\x03\x02' +
    '\x02\x02\u0212\x1F\x03\x02\x02\x02\u0213\u0215\x056\x1C\x02\u0214\u0213' +
    '\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215\u0216\x03\x02\x02\x02' +
    '\u0216\u0217\t\x05\x02\x02\u0217\u0223\x05B"\x02\u0218\u0219\x07\x04' +
    '\x02\x02\u0219\u021E\x05"\x12\x02\u021A\u021B\x07\x03\x02\x02\u021B\u021D' +
    '\x05"\x12\x02\u021C\u021A\x03\x02\x02\x02\u021D\u0220\x03\x02\x02\x02' +
    '\u021E\u021C\x03\x02\x02\x02\u021E\u021F\x03\x02\x02\x02\u021F\u0221\x03' +
    '\x02\x02\x02\u0220\u021E\x03\x02\x02\x02\u0221\u0222\x07\x05\x02\x02\u0222' +
    '\u0224\x03\x02\x02\x02\u0223\u0218\x03\x02\x02\x02\u0223\u0224\x03\x02' +
    '\x02\x02\u0224\u022E\x03\x02\x02\x02\u0225\u0227\x056\x1C\x02\u0226\u0225' +
    '\x03\x02\x02\x02\u0226\u0227\x03\x02\x02\x02\u0227\u0228\x03\x02\x02\x02' +
    '\u0228\u0229\x07g\x02\x02\u0229\u022A\x05,\x17\x02\u022A\u022B\x07H\x02' +
    '\x02\u022B\u022C\x05*\x16\x02\u022C\u022E\x03\x02\x02\x02\u022D\u0214' +
    '\x03\x02\x02\x02\u022D\u0226\x03\x02\x02\x02\u022E!\x03\x02\x02\x02\u022F' +
    '\u0230\x07!\x02\x02\u0230\u0231\x07\n\x02\x02\u0231\u0239\x052\x1A\x02' +
    '\u0232\u0233\x07A\x02\x02\u0233\u0234\x07\n\x02\x02\u0234\u0239\x07p\x02' +
    '\x02\u0235\u0236\x07?\x02\x02\u0236\u0237\x07\n\x02\x02\u0237\u0239\x07' +
    'o\x02\x02\u0238\u022F\x03\x02\x02\x02\u0238\u0232\x03\x02\x02\x02\u0238' +
    '\u0235\x03\x02\x02\x02\u0239#\x03\x02\x02\x02\u023A\u023C\x07!\x02\x02' +
    '\u023B\u023A\x03\x02\x02\x02\u023B\u023C\x03\x02\x02\x02\u023C\u023D\x03' +
    '\x02\x02\x02\u023D\u023E\x052\x1A\x02\u023E\u023F\x072\x02\x02\u023F\u0240' +
    '\x05F$\x02\u0240\u0249\x03\x02\x02\x02\u0241\u0243\x07!\x02\x02\u0242' +
    '\u0241\x03\x02\x02\x02\u0242\u0243\x03\x02\x02\x02\u0243\u0244\x03\x02' +
    '\x02\x02\u0244\u0245\x052\x1A\x02\u0245\u0246\x071\x02\x02\u0246\u0247' +
    '\x05F$\x02\u0247\u0249\x03\x02\x02\x02\u0248\u023B\x03\x02\x02\x02\u0248' +
    '\u0242\x03\x02\x02\x02\u0249%\x03\x02\x02\x02\u024A\u024B\x07\x1F\x02' +
    '\x02\u024B\u024C\x05\x1A\x0E\x02\u024C\u024D\x07\x1D\x02\x02\u024D\u024E' +
    "\x07x\x02\x02\u024E'\x03\x02\x02\x02\u024F\u0250\x07\x04\x02\x02\u0250" +
    '\u0255\x05\x1A\x0E\x02\u0251\u0252\x07\x03\x02\x02\u0252\u0254\x05\x1A' +
    '\x0E\x02\u0253\u0251\x03\x02\x02\x02\u0254\u0257\x03\x02\x02\x02\u0255' +
    '\u0253\x03\x02\x02\x02\u0255\u0256\x03\x02\x02\x02\u0256\u0258\x03\x02' +
    '\x02\x02\u0257\u0255\x03\x02\x02\x02\u0258\u0259\x07\x05\x02\x02\u0259' +
    ')\x03\x02\x02\x02\u025A\u026A\x054\x1B\x02\u025B\u026A\x05J&\x02\u025C' +
    '\u025D\x07<\x02\x02\u025D\u0260\x07\x04\x02\x02\u025E\u0261\x054\x1B\x02' +
    '\u025F\u0261\x052\x1A\x02\u0260\u025E\x03\x02\x02\x02\u0260\u025F\x03' +
    '\x02\x02\x02\u0261\u0262\x03\x02\x02\x02\u0262\u0265\x07\x03\x02\x02\u0263' +
    '\u0266\x054\x1B\x02\u0264\u0266\x052\x1A\x02\u0265\u0263\x03\x02\x02\x02' +
    '\u0265\u0264\x03\x02\x02\x02\u0266\u0267\x03\x02\x02\x02\u0267\u0268\x07' +
    '\x05\x02\x02\u0268\u026A\x03\x02\x02\x02\u0269\u025A\x03\x02\x02\x02\u0269' +
    '\u025B\x03\x02\x02\x02\u0269\u025C\x03\x02\x02\x02\u026A+\x03\x02\x02' +
    '\x02\u026B\u026C\x05H%\x02\u026C\u026D\x05F$\x02\u026D-\x03\x02\x02\x02' +
    "\u026E\u026F\x05J&\x02\u026F\u0270\x07\x06\x02\x02\u0270\u0271\x05L'" +
    '\x02\u0271\u0272\x07\x07\x02\x02\u0272\u0273\x07v\x02\x02\u0273\u027B' +
    '\x03\x02\x02\x02\u0274\u0275\x05J&\x02\u0275\u0276\x07\x06\x02\x02\u0276' +
    "\u0277\x05L'\x02\u0277\u0278\x07\x07\x02\x02\u0278\u0279\x05(\x15\x02" +
    '\u0279\u027B\x03\x02\x02\x02\u027A\u026E\x03\x02\x02\x02\u027A\u0274\x03' +
    '\x02\x02\x02\u027B/\x03\x02\x02\x02\u027C\u027D\x05@!\x02\u027D\u027E' +
    '\x07n\x02\x02\u027E\u0284\x03\x02\x02\x02\u027F\u0280\x05@!\x02\u0280' +
    '\u0281\x07\v\x02\x02\u0281\u0282\x05J&\x02\u0282\u0284\x03\x02\x02\x02' +
    '\u0283\u027C\x03\x02\x02\x02\u0283\u027F\x03\x02\x02\x02\u02841\x03\x02' +
    '\x02\x02\u0285\u0289\x07o\x02\x02\u0286\u0289\x07p\x02\x02\u0287\u0289' +
    '\x07q\x02\x02\u0288\u0285\x03\x02\x02\x02\u0288\u0286\x03\x02\x02\x02' +
    '\u0288\u0287\x03\x02\x02\x02\u02893\x03\x02\x02\x02\u028A\u028B\x07\f' +
    '\x02\x02\u028B\u028C\x07x\x02\x02\u028C5\x03\x02\x02\x02\u028D\u028E\x07' +
    'x\x02\x02\u028E7\x03\x02\x02\x02\u028F\u0290\t\x06\x02\x02\u02909\x03' +
    '\x02\x02\x02\u0291\u0292\t\x07\x02\x02\u0292;\x03\x02\x02\x02\u0293\u0294' +
    '\t\b\x02\x02\u0294=\x03\x02\x02\x02\u0295\u0296\t\x07\x02\x02\u0296?\x03' +
    '\x02\x02\x02\u0297\u0298\t\t\x02\x02\u0298A\x03\x02\x02\x02\u0299\u029C' +
    '\x05@!\x02\u029A\u029C\x054\x1B\x02\u029B\u0299\x03\x02\x02\x02\u029B' +
    '\u029A\x03\x02\x02\x02\u029CC\x03\x02\x02\x02\u029D\u029E\t\n\x02\x02' +
    '\u029EE\x03\x02\x02\x02\u029F\u02A2\x05J&\x02\u02A0\u02A2\x054\x1B\x02' +
    '\u02A1\u029F\x03\x02\x02\x02\u02A1\u02A0\x03\x02\x02\x02\u02A2G\x03\x02' +
    '\x02\x02\u02A3\u02A6\x052\x1A\x02\u02A4\u02A6\x054\x1B\x02\u02A5\u02A3' +
    '\x03\x02\x02\x02\u02A5\u02A4\x03\x02\x02\x02\u02A6I\x03\x02\x02\x02\u02A7' +
    "\u02AA\x07j\x02\x02\u02A8\u02AA\x05L'\x02\u02A9\u02A7\x03\x02\x02\x02" +
    '\u02A9\u02A8\x03\x02\x02\x02\u02AAK\x03\x02\x02\x02\u02AB\u02AC\t\v\x02' +
    '\x02\u02ACM\x03\x02\x02\x02\u02AD\u02AE\t\f\x02\x02\u02AEO\x03\x02\x02' +
    '\x02-Xblv}\x84\x97\x9E\xA6\xAA\xB4\xBB\xC4\xCF\xD9\xDB\xE7\u011A\u011E' +
    '\u017F\u018C\u01F2\u0211\u0214\u021E\u0223\u0226\u022D\u0238\u023B\u0242' +
    '\u0248\u0255\u0260\u0265\u0269\u027A\u0283\u0288\u029B\u02A1\u02A5\u02A9';
  public static readonly _serializedATN: string = Utils.join(
    [
      QueryModificationParser._serializedATNSegment0,
      QueryModificationParser._serializedATNSegment1,
    ],
    ''
  );

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(QueryModificationParser._ATN, this);
  }

  public static __ATN: ATN;

  public static get _ATN(): ATN {
    if (!QueryModificationParser.__ATN) {
      QueryModificationParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(QueryModificationParser._serializedATN)
      );
    }

    return QueryModificationParser.__ATN;
  }

  // @NotNull
  public get vocabulary(): Vocabulary {
    return QueryModificationParser.VOCABULARY;
  }

  // @Override
  public get grammarFileName(): string {
    return 'QueryModification.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return QueryModificationParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return QueryModificationParser._serializedATN;
  }

  // @RuleVersion(0)
  public filter(): FilterContext {
    let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, QueryModificationParser.RULE_filter);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 78;
        this.searchCondition();
        this.state = 79;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public patterns(): PatternsContext {
    let _localctx: PatternsContext = new PatternsContext(this._ctx, this.state);
    this.enterRule(_localctx, 2, QueryModificationParser.RULE_patterns);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 81;
        this.pattern();
        this.state = 86;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 82;
              this.match(QueryModificationParser.T__0);
              this.state = 83;
              this.pattern();
            }
          }
          this.state = 88;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 89;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public boosters(): BoostersContext {
    let _localctx: BoostersContext = new BoostersContext(this._ctx, this.state);
    this.enterRule(_localctx, 4, QueryModificationParser.RULE_boosters);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 91;
        this.boost();
        this.state = 96;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 92;
              this.match(QueryModificationParser.T__0);
              this.state = 93;
              this.boost();
            }
          }
          this.state = 98;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 99;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public bindings(): BindingsContext {
    let _localctx: BindingsContext = new BindingsContext(this._ctx, this.state);
    this.enterRule(_localctx, 6, QueryModificationParser.RULE_bindings);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 101;
        this.binding();
        this.state = 106;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 102;
              this.match(QueryModificationParser.T__0);
              this.state = 103;
              this.binding();
            }
          }
          this.state = 108;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 109;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public orderBys(): OrderBysContext {
    let _localctx: OrderBysContext = new OrderBysContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, QueryModificationParser.RULE_orderBys);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 111;
        this.orderBy();
        this.state = 116;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 112;
              this.match(QueryModificationParser.T__0);
              this.state = 113;
              this.orderBy();
            }
          }
          this.state = 118;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 119;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public orderBy(): OrderByContext {
    let _localctx: OrderByContext = new OrderByContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, QueryModificationParser.RULE_orderBy);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 121;
        this.expression(0);
        this.state = 123;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === QueryModificationParser.ASC ||
          _la === QueryModificationParser.DESC
        ) {
          {
            this.state = 122;
            _la = this._input.LA(1);
            if (
              !(
                _la === QueryModificationParser.ASC ||
                _la === QueryModificationParser.DESC
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public transforms(): TransformsContext {
    let _localctx: TransformsContext = new TransformsContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 12, QueryModificationParser.RULE_transforms);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 125;
        this.transform();
        this.state = 130;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 126;
              this.match(QueryModificationParser.T__0);
              this.state = 127;
              this.transform();
            }
          }
          this.state = 132;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 133;
        this.match(QueryModificationParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public transform(): TransformContext {
    let _localctx: TransformContext = new TransformContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 14, QueryModificationParser.RULE_transform);
    try {
      this.state = 149;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.TO_UNIT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 135;
            this.match(QueryModificationParser.TO_UNIT);
            this.state = 136;
            this.iriRefOrVarRef();
          }
          break;
        case QueryModificationParser.ABS:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 137;
            this.match(QueryModificationParser.ABS);
          }
          break;
        case QueryModificationParser.CEIL:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 138;
            this.match(QueryModificationParser.CEIL);
          }
          break;
        case QueryModificationParser.FLOOR:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 139;
            this.match(QueryModificationParser.FLOOR);
          }
          break;
        case QueryModificationParser.LCASE:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 140;
            this.match(QueryModificationParser.LCASE);
          }
          break;
        case QueryModificationParser.MD5:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 141;
            this.match(QueryModificationParser.MD5);
          }
          break;
        case QueryModificationParser.OBFUSCATE:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 142;
            this.match(QueryModificationParser.OBFUSCATE);
          }
          break;
        case QueryModificationParser.ROUND:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 143;
            this.match(QueryModificationParser.ROUND);
          }
          break;
        case QueryModificationParser.SHA1:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 144;
            this.match(QueryModificationParser.SHA1);
          }
          break;
        case QueryModificationParser.SHA256:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 145;
            this.match(QueryModificationParser.SHA256);
          }
          break;
        case QueryModificationParser.SHA384:
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 146;
            this.match(QueryModificationParser.SHA384);
          }
          break;
        case QueryModificationParser.SHA512:
          this.enterOuterAlt(_localctx, 12);
          {
            this.state = 147;
            this.match(QueryModificationParser.SHA512);
          }
          break;
        case QueryModificationParser.UCASE:
          this.enterOuterAlt(_localctx, 13);
          {
            this.state = 148;
            this.match(QueryModificationParser.UCASE);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public searchCondition(): SearchConditionContext {
    let _localctx: SearchConditionContext = new SearchConditionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 16, QueryModificationParser.RULE_searchCondition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 151;
        this.searchConditionAnd();
        this.state = 156;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.OR) {
          {
            {
              this.state = 152;
              this.match(QueryModificationParser.OR);
              this.state = 153;
              this.searchConditionAnd();
            }
          }
          this.state = 158;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public searchConditionAnd(): SearchConditionAndContext {
    let _localctx: SearchConditionAndContext = new SearchConditionAndContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      18,
      QueryModificationParser.RULE_searchConditionAnd
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 159;
        this.searchConditionNot();
        this.state = 164;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.AND) {
          {
            {
              this.state = 160;
              this.match(QueryModificationParser.AND);
              this.state = 161;
              this.searchConditionNot();
            }
          }
          this.state = 166;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public searchConditionNot(): SearchConditionNotContext {
    let _localctx: SearchConditionNotContext = new SearchConditionNotContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      20,
      QueryModificationParser.RULE_searchConditionNot
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 168;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === QueryModificationParser.NOT) {
          {
            this.state = 167;
            this.match(QueryModificationParser.NOT);
          }
        }

        this.state = 170;
        this.predicate();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public predicate(): PredicateContext {
    let _localctx: PredicateContext = new PredicateContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 22, QueryModificationParser.RULE_predicate);
    let _la: number;
    try {
      this.state = 194;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 12, this._ctx)) {
        case 1:
          _localctx = new ComparisonPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 172;
            this.expression(0);
            this.state = 173;
            this.comparisonOp();
            this.state = 174;
            this.expression(0);
          }
          break;

        case 2:
          _localctx = new InPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 176;
            this.expression(0);
            this.state = 178;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.NOT) {
              {
                this.state = 177;
                this.match(QueryModificationParser.NOT);
              }
            }

            this.state = 180;
            this.match(QueryModificationParser.IN);
            this.state = 181;
            this.expressionList();
          }
          break;

        case 3:
          _localctx = new InVarPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 183;
            this.expression(0);
            this.state = 185;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.NOT) {
              {
                this.state = 184;
                this.match(QueryModificationParser.NOT);
              }
            }

            this.state = 187;
            this.match(QueryModificationParser.IN);
            this.state = 188;
            this.varRef();
          }
          break;

        case 4:
          _localctx = new ParenPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 190;
            this.match(QueryModificationParser.T__1);
            this.state = 191;
            this.searchCondition();
            this.state = 192;
            this.match(QueryModificationParser.T__2);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public expression(): ExpressionContext;

  public expression(_p: number): ExpressionContext;

  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let _localctx: ExpressionContext = new ExpressionContext(
      this._ctx,
      _parentState
    );
    let _prevctx: ExpressionContext = _localctx;
    let _startState: number = 24;
    this.enterRecursionRule(
      _localctx,
      24,
      QueryModificationParser.RULE_expression,
      _p
    );
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 205;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case QueryModificationParser.T__19:
          case QueryModificationParser.T__20:
            {
              _localctx = new UnaryExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;

              this.state = 197;
              this.unaryOp();
              this.state = 198;
              this.expression(5);
            }
            break;
          case QueryModificationParser.T__9:
          case QueryModificationParser.ABS:
          case QueryModificationParser.BOUND:
          case QueryModificationParser.CEIL:
          case QueryModificationParser.COALESCE:
          case QueryModificationParser.CONCAT:
          case QueryModificationParser.CONTAINS:
          case QueryModificationParser.DATATYPE:
          case QueryModificationParser.DAY:
          case QueryModificationParser.ENCODE_FOR_URI:
          case QueryModificationParser.EXISTS:
          case QueryModificationParser.FALSE:
          case QueryModificationParser.FLOOR:
          case QueryModificationParser.HOURS:
          case QueryModificationParser.IF:
          case QueryModificationParser.IRI:
          case QueryModificationParser.ISBLANK:
          case QueryModificationParser.ISIRI:
          case QueryModificationParser.ISLITERAL:
          case QueryModificationParser.ISNUMERIC:
          case QueryModificationParser.ISURI:
          case QueryModificationParser.LANG:
          case QueryModificationParser.LANGMATCHES:
          case QueryModificationParser.LCASE:
          case QueryModificationParser.MD5:
          case QueryModificationParser.MINUTES:
          case QueryModificationParser.MONTH:
          case QueryModificationParser.NOW:
          case QueryModificationParser.RAND:
          case QueryModificationParser.REGEX:
          case QueryModificationParser.REPLACE:
          case QueryModificationParser.ROUND:
          case QueryModificationParser.SAMETERM:
          case QueryModificationParser.SECONDS:
          case QueryModificationParser.SHA1:
          case QueryModificationParser.SHA256:
          case QueryModificationParser.SHA384:
          case QueryModificationParser.SHA512:
          case QueryModificationParser.STR:
          case QueryModificationParser.STRAFTER:
          case QueryModificationParser.STRBEFORE:
          case QueryModificationParser.STRDT:
          case QueryModificationParser.STRENDS:
          case QueryModificationParser.STRLANG:
          case QueryModificationParser.STRLEN:
          case QueryModificationParser.STRSTARTS:
          case QueryModificationParser.STRUUID:
          case QueryModificationParser.SUBSTR:
          case QueryModificationParser.TIMEZONE:
          case QueryModificationParser.TRUE:
          case QueryModificationParser.TZ:
          case QueryModificationParser.UCASE:
          case QueryModificationParser.URI:
          case QueryModificationParser.UUID:
          case QueryModificationParser.YEAR:
          case QueryModificationParser.IRI_REF:
          case QueryModificationParser.PNAME_NS:
          case QueryModificationParser.PNAME_LN:
          case QueryModificationParser.INTEGER:
          case QueryModificationParser.DECIMAL:
          case QueryModificationParser.DOUBLE:
          case QueryModificationParser.STRING_LITERAL1:
          case QueryModificationParser.STRING_LITERAL2:
          case QueryModificationParser.VARNAME:
            {
              _localctx = new PrimitiveExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 200;
              this.expressionAtom();
            }
            break;
          case QueryModificationParser.T__1:
            {
              _localctx = new ParenExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 201;
              this.match(QueryModificationParser.T__1);
              this.state = 202;
              this.expression(0);
              this.state = 203;
              this.match(QueryModificationParser.T__2);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 217;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 215;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 14, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new FactorExpressionContext(
                      new ExpressionContext(_parentctx, _parentState)
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      QueryModificationParser.RULE_expression
                    );
                    this.state = 207;
                    if (!this.precpred(this._ctx, 4)) {
                      throw new FailedPredicateException(
                        this,
                        'this.precpred(this._ctx, 4)'
                      );
                    }
                    this.state = 208;
                    this.factorOp();
                    this.state = 209;
                    this.expression(5);
                  }
                  break;

                case 2:
                  {
                    _localctx = new TermExpressionContext(
                      new ExpressionContext(_parentctx, _parentState)
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      QueryModificationParser.RULE_expression
                    );
                    this.state = 211;
                    if (!this.precpred(this._ctx, 3)) {
                      throw new FailedPredicateException(
                        this,
                        'this.precpred(this._ctx, 3)'
                      );
                    }
                    this.state = 212;
                    this.termOp();
                    this.state = 213;
                    this.expression(4);
                  }
                  break;
              }
            }
          }
          this.state = 219;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public expressionAtom(): ExpressionAtomContext {
    let _localctx: ExpressionAtomContext = new ExpressionAtomContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 26, QueryModificationParser.RULE_expressionAtom);
    try {
      this.state = 229;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 16, this._ctx)) {
        case 1:
          _localctx = new BuiltinCallAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 220;
            this.builtinCall();
          }
          break;

        case 2:
          _localctx = new FunctionCallAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 221;
            this.functionCall();
          }
          break;

        case 3:
          _localctx = new RdfLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 222;
            this.rdfLiteral();
          }
          break;

        case 4:
          _localctx = new StringLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 223;
            this.stringLiteral();
          }
          break;

        case 5:
          _localctx = new NumericLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 224;
            this.numericLiteral();
          }
          break;

        case 6:
          _localctx = new BooleanLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 225;
            this.booleanLiteral();
          }
          break;

        case 7:
          _localctx = new IriRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 226;
            this.iriRef();
          }
          break;

        case 8:
          _localctx = new FieldRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 227;
            this.fieldRef();
          }
          break;

        case 9:
          _localctx = new VarRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 228;
            this.varRef();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public builtinCall(): BuiltinCallContext {
    let _localctx: BuiltinCallContext = new BuiltinCallContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 28, QueryModificationParser.RULE_builtinCall);
    let _la: number;
    try {
      this.state = 527;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.ABS:
          _localctx = new AbsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 231;
            this.match(QueryModificationParser.ABS);
            this.state = 232;
            this.match(QueryModificationParser.T__1);
            this.state = 233;
            this.expression(0);
            this.state = 234;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.BOUND:
          _localctx = new BoundFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 236;
            this.match(QueryModificationParser.BOUND);
            this.state = 237;
            this.match(QueryModificationParser.T__1);
            this.state = 238;
            this.fieldRef();
            this.state = 239;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.CEIL:
          _localctx = new CeilFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 241;
            this.match(QueryModificationParser.CEIL);
            this.state = 242;
            this.match(QueryModificationParser.T__1);
            this.state = 243;
            this.expression(0);
            this.state = 244;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.COALESCE:
          _localctx = new CoalesceFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 246;
            this.match(QueryModificationParser.COALESCE);
            this.state = 247;
            this.match(QueryModificationParser.T__3);
            this.state = 248;
            this.iriRefOrVarRef();
            this.state = 249;
            this.match(QueryModificationParser.T__4);
            this.state = 250;
            this.expressionList();
          }
          break;
        case QueryModificationParser.CONCAT:
          _localctx = new ConcatFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 252;
            this.match(QueryModificationParser.CONCAT);
            this.state = 253;
            this.expressionList();
          }
          break;
        case QueryModificationParser.CONTAINS:
          _localctx = new ContainsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 254;
            this.match(QueryModificationParser.CONTAINS);
            this.state = 255;
            this.match(QueryModificationParser.T__1);
            this.state = 256;
            this.expression(0);
            this.state = 257;
            this.match(QueryModificationParser.T__0);
            this.state = 258;
            this.expression(0);
            this.state = 259;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.DATATYPE:
          _localctx = new DatatypeFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 261;
            this.match(QueryModificationParser.DATATYPE);
            this.state = 262;
            this.match(QueryModificationParser.T__1);
            this.state = 263;
            this.expression(0);
            this.state = 264;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.DAY:
          _localctx = new DayFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 266;
            this.match(QueryModificationParser.DAY);
            this.state = 267;
            this.match(QueryModificationParser.T__1);
            this.state = 268;
            this.expression(0);
            this.state = 269;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ENCODE_FOR_URI:
          _localctx = new EncodeForUriFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 271;
            this.match(QueryModificationParser.ENCODE_FOR_URI);
            this.state = 272;
            this.match(QueryModificationParser.T__1);
            this.state = 273;
            this.expression(0);
            this.state = 274;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.EXISTS:
          _localctx = new ExistsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 276;
            this.match(QueryModificationParser.EXISTS);
            this.state = 277;
            _la = this._input.LA(1);
            if (
              !(
                _la === QueryModificationParser.T__1 ||
                _la === QueryModificationParser.T__5
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 278;
            this.expression(0);
            this.state = 280;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__0) {
              {
                this.state = 279;
                this.match(QueryModificationParser.T__0);
              }
            }

            this.state = 282;
            this.expression(0);
            this.state = 284;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__0) {
              {
                this.state = 283;
                this.match(QueryModificationParser.T__0);
              }
            }

            this.state = 286;
            this.expression(0);
            this.state = 287;
            _la = this._input.LA(1);
            if (
              !(
                _la === QueryModificationParser.T__2 ||
                _la === QueryModificationParser.T__6
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
          break;
        case QueryModificationParser.FLOOR:
          _localctx = new FloorFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 289;
            this.match(QueryModificationParser.FLOOR);
            this.state = 290;
            this.match(QueryModificationParser.T__1);
            this.state = 291;
            this.expression(0);
            this.state = 292;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.HOURS:
          _localctx = new HoursFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 12);
          {
            this.state = 294;
            this.match(QueryModificationParser.HOURS);
            this.state = 295;
            this.match(QueryModificationParser.T__1);
            this.state = 296;
            this.expression(0);
            this.state = 297;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.IF:
          _localctx = new IfFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 13);
          {
            this.state = 299;
            this.match(QueryModificationParser.IF);
            this.state = 300;
            this.match(QueryModificationParser.T__1);
            this.state = 301;
            this.predicate();
            this.state = 302;
            this.match(QueryModificationParser.T__0);
            this.state = 303;
            this.expression(0);
            this.state = 304;
            this.match(QueryModificationParser.T__0);
            this.state = 305;
            this.expression(0);
            this.state = 306;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.IRI:
          _localctx = new IriFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 14);
          {
            this.state = 308;
            this.match(QueryModificationParser.IRI);
            this.state = 309;
            this.match(QueryModificationParser.T__1);
            this.state = 310;
            this.expression(0);
            this.state = 311;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ISBLANK:
          _localctx = new IsBlankFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 15);
          {
            this.state = 313;
            this.match(QueryModificationParser.ISBLANK);
            this.state = 314;
            this.match(QueryModificationParser.T__1);
            this.state = 315;
            this.expression(0);
            this.state = 316;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ISIRI:
          _localctx = new IsIriFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 16);
          {
            this.state = 318;
            this.match(QueryModificationParser.ISIRI);
            this.state = 319;
            this.match(QueryModificationParser.T__1);
            this.state = 320;
            this.expression(0);
            this.state = 321;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ISLITERAL:
          _localctx = new IsLiteralFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 17);
          {
            this.state = 323;
            this.match(QueryModificationParser.ISLITERAL);
            this.state = 324;
            this.match(QueryModificationParser.T__1);
            this.state = 325;
            this.expression(0);
            this.state = 326;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ISNUMERIC:
          _localctx = new IsNumericFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 18);
          {
            this.state = 328;
            this.match(QueryModificationParser.ISNUMERIC);
            this.state = 329;
            this.match(QueryModificationParser.T__1);
            this.state = 330;
            this.expression(0);
            this.state = 331;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ISURI:
          _localctx = new IsURIFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 19);
          {
            this.state = 333;
            this.match(QueryModificationParser.ISURI);
            this.state = 334;
            this.match(QueryModificationParser.T__1);
            this.state = 335;
            this.expression(0);
            this.state = 336;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.LANG:
          _localctx = new LangFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 20);
          {
            this.state = 338;
            this.match(QueryModificationParser.LANG);
            this.state = 339;
            this.match(QueryModificationParser.T__1);
            this.state = 340;
            this.expression(0);
            this.state = 341;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.LANGMATCHES:
          _localctx = new LangMatchesFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 21);
          {
            this.state = 343;
            this.match(QueryModificationParser.LANGMATCHES);
            this.state = 344;
            this.match(QueryModificationParser.T__1);
            this.state = 345;
            this.expression(0);
            this.state = 346;
            this.match(QueryModificationParser.T__0);
            this.state = 347;
            this.expression(0);
            this.state = 348;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.LCASE:
          _localctx = new LcaseFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 22);
          {
            this.state = 350;
            this.match(QueryModificationParser.LCASE);
            this.state = 351;
            this.match(QueryModificationParser.T__1);
            this.state = 352;
            this.expression(0);
            this.state = 353;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.MD5:
          _localctx = new Md5FuncContext(_localctx);
          this.enterOuterAlt(_localctx, 23);
          {
            this.state = 355;
            this.match(QueryModificationParser.MD5);
            this.state = 356;
            this.match(QueryModificationParser.T__1);
            this.state = 357;
            this.expression(0);
            this.state = 358;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.MINUTES:
          _localctx = new MinutesFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 24);
          {
            this.state = 360;
            this.match(QueryModificationParser.MINUTES);
            this.state = 361;
            this.match(QueryModificationParser.T__1);
            this.state = 362;
            this.expression(0);
            this.state = 363;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.MONTH:
          _localctx = new MonthFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 25);
          {
            this.state = 365;
            this.match(QueryModificationParser.MONTH);
            this.state = 366;
            this.match(QueryModificationParser.T__1);
            this.state = 367;
            this.expression(0);
            this.state = 368;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.NOW:
          _localctx = new NowFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 26);
          {
            this.state = 370;
            this.match(QueryModificationParser.NOW);
            this.state = 371;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;
        case QueryModificationParser.RAND:
          _localctx = new RandFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 27);
          {
            this.state = 372;
            this.match(QueryModificationParser.RAND);
            this.state = 373;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;
        case QueryModificationParser.REGEX:
          _localctx = new RegexFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 28);
          {
            this.state = 374;
            this.match(QueryModificationParser.REGEX);
            this.state = 375;
            this.match(QueryModificationParser.T__1);
            this.state = 376;
            this.expression(0);
            this.state = 377;
            this.match(QueryModificationParser.T__0);
            this.state = 378;
            this.expression(0);
            this.state = 381;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__0) {
              {
                this.state = 379;
                this.match(QueryModificationParser.T__0);
                this.state = 380;
                this.expression(0);
              }
            }

            this.state = 383;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.REPLACE:
          _localctx = new ReplaceFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 29);
          {
            this.state = 385;
            this.match(QueryModificationParser.REPLACE);
            this.state = 386;
            this.match(QueryModificationParser.T__1);
            this.state = 387;
            this.expression(0);
            this.state = 388;
            this.match(QueryModificationParser.T__0);
            this.state = 389;
            this.expression(0);
            this.state = 390;
            this.match(QueryModificationParser.T__0);
            this.state = 391;
            this.expression(0);
            this.state = 394;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__0) {
              {
                this.state = 392;
                this.match(QueryModificationParser.T__0);
                this.state = 393;
                this.expression(0);
              }
            }

            this.state = 396;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.ROUND:
          _localctx = new RoundFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 30);
          {
            this.state = 398;
            this.match(QueryModificationParser.ROUND);
            this.state = 399;
            this.match(QueryModificationParser.T__1);
            this.state = 400;
            this.expression(0);
            this.state = 401;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SAMETERM:
          _localctx = new SameTermFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 31);
          {
            this.state = 403;
            this.match(QueryModificationParser.SAMETERM);
            this.state = 404;
            this.match(QueryModificationParser.T__1);
            this.state = 405;
            this.fieldRef();
            this.state = 406;
            this.match(QueryModificationParser.T__0);
            this.state = 407;
            this.fieldRef();
            this.state = 408;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SECONDS:
          _localctx = new SecondsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 32);
          {
            this.state = 410;
            this.match(QueryModificationParser.SECONDS);
            this.state = 411;
            this.match(QueryModificationParser.T__1);
            this.state = 412;
            this.expression(0);
            this.state = 413;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SHA1:
          _localctx = new Sha1FuncContext(_localctx);
          this.enterOuterAlt(_localctx, 33);
          {
            this.state = 415;
            this.match(QueryModificationParser.SHA1);
            this.state = 416;
            this.match(QueryModificationParser.T__1);
            this.state = 417;
            this.expression(0);
            this.state = 418;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SHA256:
          _localctx = new Sha256FuncContext(_localctx);
          this.enterOuterAlt(_localctx, 34);
          {
            this.state = 420;
            this.match(QueryModificationParser.SHA256);
            this.state = 421;
            this.match(QueryModificationParser.T__1);
            this.state = 422;
            this.expression(0);
            this.state = 423;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SHA384:
          _localctx = new Sha384FuncContext(_localctx);
          this.enterOuterAlt(_localctx, 35);
          {
            this.state = 425;
            this.match(QueryModificationParser.SHA384);
            this.state = 426;
            this.match(QueryModificationParser.T__1);
            this.state = 427;
            this.expression(0);
            this.state = 428;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.SHA512:
          _localctx = new Sha512FuncContext(_localctx);
          this.enterOuterAlt(_localctx, 36);
          {
            this.state = 430;
            this.match(QueryModificationParser.SHA512);
            this.state = 431;
            this.match(QueryModificationParser.T__1);
            this.state = 432;
            this.expression(0);
            this.state = 433;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STR:
          _localctx = new StrFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 37);
          {
            this.state = 435;
            this.match(QueryModificationParser.STR);
            this.state = 436;
            this.match(QueryModificationParser.T__1);
            this.state = 437;
            this.expression(0);
            this.state = 438;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRAFTER:
          _localctx = new StrAfterFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 38);
          {
            this.state = 440;
            this.match(QueryModificationParser.STRAFTER);
            this.state = 441;
            this.match(QueryModificationParser.T__1);
            this.state = 442;
            this.expression(0);
            this.state = 443;
            this.match(QueryModificationParser.T__0);
            this.state = 444;
            this.expression(0);
            this.state = 445;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRBEFORE:
          _localctx = new StrBeforeFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 39);
          {
            this.state = 447;
            this.match(QueryModificationParser.STRBEFORE);
            this.state = 448;
            this.match(QueryModificationParser.T__1);
            this.state = 449;
            this.expression(0);
            this.state = 450;
            this.match(QueryModificationParser.T__0);
            this.state = 451;
            this.expression(0);
            this.state = 452;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRDT:
          _localctx = new StrDtFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 40);
          {
            this.state = 454;
            this.match(QueryModificationParser.STRDT);
            this.state = 455;
            this.match(QueryModificationParser.T__1);
            this.state = 456;
            this.expression(0);
            this.state = 457;
            this.match(QueryModificationParser.T__0);
            this.state = 458;
            this.iriRefOrVarRef();
            this.state = 459;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRENDS:
          _localctx = new StrEndsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 41);
          {
            this.state = 461;
            this.match(QueryModificationParser.STRENDS);
            this.state = 462;
            this.match(QueryModificationParser.T__1);
            this.state = 463;
            this.expression(0);
            this.state = 464;
            this.match(QueryModificationParser.T__0);
            this.state = 465;
            this.expression(0);
            this.state = 466;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRLANG:
          _localctx = new StrLangFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 42);
          {
            this.state = 468;
            this.match(QueryModificationParser.STRLANG);
            this.state = 469;
            this.match(QueryModificationParser.T__1);
            this.state = 470;
            this.expression(0);
            this.state = 471;
            this.match(QueryModificationParser.T__0);
            this.state = 472;
            this.expression(0);
            this.state = 473;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRLEN:
          _localctx = new StrLenFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 43);
          {
            this.state = 475;
            this.match(QueryModificationParser.STRLEN);
            this.state = 476;
            this.match(QueryModificationParser.T__1);
            this.state = 477;
            this.expression(0);
            this.state = 478;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRSTARTS:
          _localctx = new StrStartsFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 44);
          {
            this.state = 480;
            this.match(QueryModificationParser.STRSTARTS);
            this.state = 481;
            this.match(QueryModificationParser.T__1);
            this.state = 482;
            this.expression(0);
            this.state = 483;
            this.match(QueryModificationParser.T__0);
            this.state = 484;
            this.expression(0);
            this.state = 485;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.STRUUID:
          _localctx = new StrUuidFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 45);
          {
            this.state = 487;
            this.match(QueryModificationParser.STRUUID);
            this.state = 488;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;
        case QueryModificationParser.SUBSTR:
          _localctx = new SubstrFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 46);
          {
            this.state = 489;
            this.match(QueryModificationParser.SUBSTR);
            this.state = 490;
            this.match(QueryModificationParser.T__1);
            this.state = 491;
            this.expression(0);
            this.state = 492;
            this.match(QueryModificationParser.T__0);
            this.state = 493;
            this.expression(0);
            this.state = 496;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__0) {
              {
                this.state = 494;
                this.match(QueryModificationParser.T__0);
                this.state = 495;
                this.expression(0);
              }
            }

            this.state = 498;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.TIMEZONE:
          _localctx = new TimezoneFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 47);
          {
            this.state = 500;
            this.match(QueryModificationParser.TIMEZONE);
            this.state = 501;
            this.match(QueryModificationParser.T__1);
            this.state = 502;
            this.expression(0);
            this.state = 503;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.TZ:
          _localctx = new TzFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 48);
          {
            this.state = 505;
            this.match(QueryModificationParser.TZ);
            this.state = 506;
            this.match(QueryModificationParser.T__1);
            this.state = 507;
            this.expression(0);
            this.state = 508;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.UCASE:
          _localctx = new UcaseFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 49);
          {
            this.state = 510;
            this.match(QueryModificationParser.UCASE);
            this.state = 511;
            this.match(QueryModificationParser.T__1);
            this.state = 512;
            this.expression(0);
            this.state = 513;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.URI:
          _localctx = new UriFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 50);
          {
            this.state = 515;
            this.match(QueryModificationParser.URI);
            this.state = 516;
            this.match(QueryModificationParser.T__1);
            this.state = 517;
            this.expression(0);
            this.state = 518;
            this.match(QueryModificationParser.T__2);
          }
          break;
        case QueryModificationParser.UUID:
          _localctx = new UuidFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 51);
          {
            this.state = 520;
            this.match(QueryModificationParser.UUID);
            this.state = 521;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;
        case QueryModificationParser.YEAR:
          _localctx = new YearFuncContext(_localctx);
          this.enterOuterAlt(_localctx, 52);
          {
            this.state = 522;
            this.match(QueryModificationParser.YEAR);
            this.state = 523;
            this.match(QueryModificationParser.T__1);
            this.state = 524;
            this.expression(0);
            this.state = 525;
            this.match(QueryModificationParser.T__2);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public pattern(): PatternContext {
    let _localctx: PatternContext = new PatternContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, QueryModificationParser.RULE_pattern);
    let _la: number;
    try {
      this.state = 555;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 27, this._ctx)) {
        case 1:
          _localctx = new TextMatchPatternContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 530;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.VARNAME) {
              {
                this.state = 529;
                this.fieldRef();
              }
            }

            this.state = 532;
            _la = this._input.LA(1);
            if (
              !(
                _la === QueryModificationParser.GEOMATCH ||
                _la === QueryModificationParser.TEXTMATCH
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 533;
            this.stringLiteralOrVarRef();
            this.state = 545;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.T__1) {
              {
                this.state = 534;
                this.match(QueryModificationParser.T__1);
                this.state = 535;
                this.textMatchParam();
                this.state = 540;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === QueryModificationParser.T__0) {
                  {
                    {
                      this.state = 536;
                      this.match(QueryModificationParser.T__0);
                      this.state = 537;
                      this.textMatchParam();
                    }
                  }
                  this.state = 542;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
                this.state = 543;
                this.match(QueryModificationParser.T__2);
              }
            }
          }
          break;

        case 2:
          _localctx = new GeoNearbyPatternContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 548;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.VARNAME) {
              {
                this.state = 547;
                this.fieldRef();
              }
            }

            this.state = 550;
            this.match(QueryModificationParser.WITHIN);
            this.state = 551;
            this.proximitySpec();
            this.state = 552;
            this.match(QueryModificationParser.OF);
            this.state = 553;
            this.featureOrLatLon();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public textMatchParam(): TextMatchParamContext {
    let _localctx: TextMatchParamContext = new TextMatchParamContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 32, QueryModificationParser.RULE_textMatchParam);
    try {
      this.state = 566;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.BOOST:
          _localctx = new TextMatchBoostParamContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 557;
            this.match(QueryModificationParser.BOOST);
            this.state = 558;
            this.match(QueryModificationParser.T__7);
            this.state = 559;
            this.numericLiteral();
          }
          break;
        case QueryModificationParser.MIN_SCORE:
          _localctx = new TextMatchMinScoreParamContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 560;
            this.match(QueryModificationParser.MIN_SCORE);
            this.state = 561;
            this.match(QueryModificationParser.T__7);
            this.state = 562;
            this.match(QueryModificationParser.DECIMAL);
          }
          break;
        case QueryModificationParser.MAX_HITS:
          _localctx = new TextMatchMaxHitsParamContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 563;
            this.match(QueryModificationParser.MAX_HITS);
            this.state = 564;
            this.match(QueryModificationParser.T__7);
            this.state = 565;
            this.match(QueryModificationParser.INTEGER);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public boost(): BoostContext {
    let _localctx: BoostContext = new BoostContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, QueryModificationParser.RULE_boost);
    let _la: number;
    try {
      this.state = 582;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 31, this._ctx)) {
        case 1:
          _localctx = new FollowsUserBoostContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 569;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.BOOST) {
              {
                this.state = 568;
                this.match(QueryModificationParser.BOOST);
              }
            }

            this.state = 571;
            this.numericLiteral();
            this.state = 572;
            this.match(QueryModificationParser.IF_FOLLOWS);
            this.state = 573;
            this.iriRefOrVarRef();
          }
          break;

        case 2:
          _localctx = new FollowedByUserBoostContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 576;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.BOOST) {
              {
                this.state = 575;
                this.match(QueryModificationParser.BOOST);
              }
            }

            this.state = 578;
            this.numericLiteral();
            this.state = 579;
            this.match(QueryModificationParser.IF_FOLLOWED_BY);
            this.state = 580;
            this.iriRefOrVarRef();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public binding(): BindingContext {
    let _localctx: BindingContext = new BindingContext(this._ctx, this.state);
    this.enterRule(_localctx, 36, QueryModificationParser.RULE_binding);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 584;
        this.match(QueryModificationParser.BIND);
        this.state = 585;
        this.expression(0);
        this.state = 586;
        this.match(QueryModificationParser.AS);
        this.state = 587;
        this.match(QueryModificationParser.VARNAME);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public expressionList(): ExpressionListContext {
    let _localctx: ExpressionListContext = new ExpressionListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 38, QueryModificationParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 589;
        this.match(QueryModificationParser.T__1);
        this.state = 590;
        this.expression(0);
        this.state = 595;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 591;
              this.match(QueryModificationParser.T__0);
              this.state = 592;
              this.expression(0);
            }
          }
          this.state = 597;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 598;
        this.match(QueryModificationParser.T__2);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public featureOrLatLon(): FeatureOrLatLonContext {
    let _localctx: FeatureOrLatLonContext = new FeatureOrLatLonContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 40, QueryModificationParser.RULE_featureOrLatLon);
    try {
      this.state = 615;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.T__9:
          _localctx = new VarFeatureContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 600;
            this.varRef();
          }
          break;
        case QueryModificationParser.IRI_REF:
        case QueryModificationParser.PNAME_NS:
        case QueryModificationParser.PNAME_LN:
          _localctx = new FeatureContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 601;
            this.iriRef();
          }
          break;
        case QueryModificationParser.LATLON:
          _localctx = new LatLonContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 602;
            this.match(QueryModificationParser.LATLON);
            this.state = 603;
            this.match(QueryModificationParser.T__1);
            this.state = 606;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case QueryModificationParser.T__9:
                {
                  this.state = 604;
                  this.varRef();
                }
                break;
              case QueryModificationParser.INTEGER:
              case QueryModificationParser.DECIMAL:
              case QueryModificationParser.DOUBLE:
                {
                  this.state = 605;
                  this.numericLiteral();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
            this.state = 608;
            this.match(QueryModificationParser.T__0);
            this.state = 611;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case QueryModificationParser.T__9:
                {
                  this.state = 609;
                  this.varRef();
                }
                break;
              case QueryModificationParser.INTEGER:
              case QueryModificationParser.DECIMAL:
              case QueryModificationParser.DOUBLE:
                {
                  this.state = 610;
                  this.numericLiteral();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
            this.state = 613;
            this.match(QueryModificationParser.T__2);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public proximitySpec(): ProximitySpecContext {
    let _localctx: ProximitySpecContext = new ProximitySpecContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 42, QueryModificationParser.RULE_proximitySpec);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 617;
        this.numericLiteralOrVarRef();
        this.state = 618;
        this.iriRefOrVarRef();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public functionCall(): FunctionCallContext {
    let _localctx: FunctionCallContext = new FunctionCallContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 44, QueryModificationParser.RULE_functionCall);
    try {
      this.state = 632;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 36, this._ctx)) {
        case 1:
          _localctx = new FuncWithoutArgsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 620;
            this.iriRef();
            this.state = 621;
            this.match(QueryModificationParser.T__3);
            this.state = 622;
            this.prefixedName();
            this.state = 623;
            this.match(QueryModificationParser.T__4);
            this.state = 624;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;

        case 2:
          _localctx = new FuncWithArgsContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 626;
            this.iriRef();
            this.state = 627;
            this.match(QueryModificationParser.T__3);
            this.state = 628;
            this.prefixedName();
            this.state = 629;
            this.match(QueryModificationParser.T__4);
            this.state = 630;
            this.expressionList();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public rdfLiteral(): RdfLiteralContext {
    let _localctx: RdfLiteralContext = new RdfLiteralContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 46, QueryModificationParser.RULE_rdfLiteral);
    try {
      this.state = 641;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 37, this._ctx)) {
        case 1:
          _localctx = new LangRdfLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 634;
            this.stringLiteral();
            this.state = 635;
            this.match(QueryModificationParser.LANGTAG);
          }
          break;

        case 2:
          _localctx = new DtRdfLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 637;
            this.stringLiteral();
            this.state = 638;
            this.match(QueryModificationParser.T__8);
            this.state = 639;
            this.iriRef();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public numericLiteral(): NumericLiteralContext {
    let _localctx: NumericLiteralContext = new NumericLiteralContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 48, QueryModificationParser.RULE_numericLiteral);
    try {
      this.state = 646;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.INTEGER:
          _localctx = new IntegerLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 643;
            this.match(QueryModificationParser.INTEGER);
          }
          break;
        case QueryModificationParser.DECIMAL:
          _localctx = new DecimalLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 644;
            this.match(QueryModificationParser.DECIMAL);
          }
          break;
        case QueryModificationParser.DOUBLE:
          _localctx = new DoubleLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 645;
            this.match(QueryModificationParser.DOUBLE);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public varRef(): VarRefContext {
    let _localctx: VarRefContext = new VarRefContext(this._ctx, this.state);
    this.enterRule(_localctx, 50, QueryModificationParser.RULE_varRef);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 648;
        this.match(QueryModificationParser.T__9);
        this.state = 649;
        this.match(QueryModificationParser.VARNAME);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public fieldRef(): FieldRefContext {
    let _localctx: FieldRefContext = new FieldRefContext(this._ctx, this.state);
    this.enterRule(_localctx, 52, QueryModificationParser.RULE_fieldRef);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 651;
        this.match(QueryModificationParser.VARNAME);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public comparisonOp(): ComparisonOpContext {
    let _localctx: ComparisonOpContext = new ComparisonOpContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 54, QueryModificationParser.RULE_comparisonOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 653;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << QueryModificationParser.T__7) |
                (1 << QueryModificationParser.T__10) |
                (1 << QueryModificationParser.T__11) |
                (1 << QueryModificationParser.T__12) |
                (1 << QueryModificationParser.T__13) |
                (1 << QueryModificationParser.T__14) |
                (1 << QueryModificationParser.T__15) |
                (1 << QueryModificationParser.T__16) |
                (1 << QueryModificationParser.T__17) |
                (1 << QueryModificationParser.T__18))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public unaryOp(): UnaryOpContext {
    let _localctx: UnaryOpContext = new UnaryOpContext(this._ctx, this.state);
    this.enterRule(_localctx, 56, QueryModificationParser.RULE_unaryOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 655;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.T__19 ||
            _la === QueryModificationParser.T__20
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public factorOp(): FactorOpContext {
    let _localctx: FactorOpContext = new FactorOpContext(this._ctx, this.state);
    this.enterRule(_localctx, 58, QueryModificationParser.RULE_factorOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 657;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << QueryModificationParser.T__21) |
                (1 << QueryModificationParser.T__22) |
                (1 << QueryModificationParser.T__23))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public termOp(): TermOpContext {
    let _localctx: TermOpContext = new TermOpContext(this._ctx, this.state);
    this.enterRule(_localctx, 60, QueryModificationParser.RULE_termOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 659;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.T__19 ||
            _la === QueryModificationParser.T__20
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public stringLiteral(): StringLiteralContext {
    let _localctx: StringLiteralContext = new StringLiteralContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 62, QueryModificationParser.RULE_stringLiteral);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 661;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.STRING_LITERAL1 ||
            _la === QueryModificationParser.STRING_LITERAL2
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public stringLiteralOrVarRef(): StringLiteralOrVarRefContext {
    let _localctx: StringLiteralOrVarRefContext = new StringLiteralOrVarRefContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      64,
      QueryModificationParser.RULE_stringLiteralOrVarRef
    );
    try {
      this.state = 665;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.STRING_LITERAL1:
        case QueryModificationParser.STRING_LITERAL2:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 663;
            this.stringLiteral();
          }
          break;
        case QueryModificationParser.T__9:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 664;
            this.varRef();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public booleanLiteral(): BooleanLiteralContext {
    let _localctx: BooleanLiteralContext = new BooleanLiteralContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 66, QueryModificationParser.RULE_booleanLiteral);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 667;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.FALSE ||
            _la === QueryModificationParser.TRUE
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public iriRefOrVarRef(): IriRefOrVarRefContext {
    let _localctx: IriRefOrVarRefContext = new IriRefOrVarRefContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 68, QueryModificationParser.RULE_iriRefOrVarRef);
    try {
      this.state = 671;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.IRI_REF:
        case QueryModificationParser.PNAME_NS:
        case QueryModificationParser.PNAME_LN:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 669;
            this.iriRef();
          }
          break;
        case QueryModificationParser.T__9:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 670;
            this.varRef();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public numericLiteralOrVarRef(): NumericLiteralOrVarRefContext {
    let _localctx: NumericLiteralOrVarRefContext = new NumericLiteralOrVarRefContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      70,
      QueryModificationParser.RULE_numericLiteralOrVarRef
    );
    try {
      this.state = 675;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.INTEGER:
        case QueryModificationParser.DECIMAL:
        case QueryModificationParser.DOUBLE:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 673;
            this.numericLiteral();
          }
          break;
        case QueryModificationParser.T__9:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 674;
            this.varRef();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public iriRef(): IriRefContext {
    let _localctx: IriRefContext = new IriRefContext(this._ctx, this.state);
    this.enterRule(_localctx, 72, QueryModificationParser.RULE_iriRef);
    try {
      this.state = 679;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.IRI_REF:
          _localctx = new LiteralIriRefContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 677;
            this.match(QueryModificationParser.IRI_REF);
          }
          break;
        case QueryModificationParser.PNAME_NS:
        case QueryModificationParser.PNAME_LN:
          _localctx = new PrefixedNameIriRefContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 678;
            this.prefixedName();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public prefixedName(): PrefixedNameContext {
    let _localctx: PrefixedNameContext = new PrefixedNameContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 74, QueryModificationParser.RULE_prefixedName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 681;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.PNAME_NS ||
            _la === QueryModificationParser.PNAME_LN
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public blankNode(): BlankNodeContext {
    let _localctx: BlankNodeContext = new BlankNodeContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 76, QueryModificationParser.RULE_blankNode);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 683;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.BLANK_NODE_LABEL ||
            _la === QueryModificationParser.ANON
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public sempred(
    _localctx: RuleContext,
    ruleIndex: number,
    predIndex: number
  ): boolean {
    switch (ruleIndex) {
      case 12:
        return this.expression_sempred(
          _localctx as ExpressionContext,
          predIndex
        );
    }
    return true;
  }

  private expression_sempred(
    _localctx: ExpressionContext,
    predIndex: number
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 4);

      case 1:
        return this.precpred(this._ctx, 3);
    }
    return true;
  }
}

export class FilterContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_filter;
  }

  public searchCondition(): SearchConditionContext {
    return this.getRuleContext(0, SearchConditionContext);
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFilter) {
      listener.enterFilter(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFilter) {
      listener.exitFilter(this);
    }
  }
}

export class PatternsContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_patterns;
  }

  public pattern(): PatternContext[];

  public pattern(i: number): PatternContext;

  public pattern(i?: number): PatternContext | PatternContext[] {
    if (i === undefined) {
      return this.getRuleContexts(PatternContext);
    } else {
      return this.getRuleContext(i, PatternContext);
    }
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterPatterns) {
      listener.enterPatterns(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitPatterns) {
      listener.exitPatterns(this);
    }
  }
}

export class BoostersContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_boosters;
  }

  public boost(): BoostContext[];

  public boost(i: number): BoostContext;

  public boost(i?: number): BoostContext | BoostContext[] {
    if (i === undefined) {
      return this.getRuleContexts(BoostContext);
    } else {
      return this.getRuleContext(i, BoostContext);
    }
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBoosters) {
      listener.enterBoosters(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBoosters) {
      listener.exitBoosters(this);
    }
  }
}

export class BindingsContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_bindings;
  }

  public binding(): BindingContext[];

  public binding(i: number): BindingContext;

  public binding(i?: number): BindingContext | BindingContext[] {
    if (i === undefined) {
      return this.getRuleContexts(BindingContext);
    } else {
      return this.getRuleContext(i, BindingContext);
    }
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBindings) {
      listener.enterBindings(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBindings) {
      listener.exitBindings(this);
    }
  }
}

export class OrderBysContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_orderBys;
  }

  public orderBy(): OrderByContext[];

  public orderBy(i: number): OrderByContext;

  public orderBy(i?: number): OrderByContext | OrderByContext[] {
    if (i === undefined) {
      return this.getRuleContexts(OrderByContext);
    } else {
      return this.getRuleContext(i, OrderByContext);
    }
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterOrderBys) {
      listener.enterOrderBys(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitOrderBys) {
      listener.exitOrderBys(this);
    }
  }
}

export class OrderByContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_orderBy;
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  public ASC(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.ASC, 0);
  }

  public DESC(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.DESC, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterOrderBy) {
      listener.enterOrderBy(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitOrderBy) {
      listener.exitOrderBy(this);
    }
  }
}

export class TransformsContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_transforms;
  }

  public transform(): TransformContext[];

  public transform(i: number): TransformContext;

  public transform(i?: number): TransformContext | TransformContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TransformContext);
    } else {
      return this.getRuleContext(i, TransformContext);
    }
  }

  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTransforms) {
      listener.enterTransforms(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTransforms) {
      listener.exitTransforms(this);
    }
  }
}

export class TransformContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_transform;
  }

  public TO_UNIT(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.TO_UNIT, 0);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext | undefined {
    return this.tryGetRuleContext(0, IriRefOrVarRefContext);
  }

  public ABS(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.ABS, 0);
  }

  public CEIL(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.CEIL, 0);
  }

  public FLOOR(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.FLOOR, 0);
  }

  public LCASE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.LCASE, 0);
  }

  public MD5(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.MD5, 0);
  }

  public OBFUSCATE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.OBFUSCATE, 0);
  }

  public ROUND(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.ROUND, 0);
  }

  public SHA1(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.SHA1, 0);
  }

  public SHA256(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.SHA256, 0);
  }

  public SHA384(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.SHA384, 0);
  }

  public SHA512(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.SHA512, 0);
  }

  public UCASE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.UCASE, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTransform) {
      listener.enterTransform(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTransform) {
      listener.exitTransform(this);
    }
  }
}

export class SearchConditionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchCondition;
  }

  public searchConditionAnd(): SearchConditionAndContext[];

  public searchConditionAnd(i: number): SearchConditionAndContext;

  public searchConditionAnd(
    i?: number
  ): SearchConditionAndContext | SearchConditionAndContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SearchConditionAndContext);
    } else {
      return this.getRuleContext(i, SearchConditionAndContext);
    }
  }

  public OR(): TerminalNode[];

  public OR(i: number): TerminalNode;

  public OR(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(QueryModificationParser.OR);
    } else {
      return this.getToken(QueryModificationParser.OR, i);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSearchCondition) {
      listener.enterSearchCondition(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSearchCondition) {
      listener.exitSearchCondition(this);
    }
  }
}

export class SearchConditionAndContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchConditionAnd;
  }

  public searchConditionNot(): SearchConditionNotContext[];

  public searchConditionNot(i: number): SearchConditionNotContext;

  public searchConditionNot(
    i?: number
  ): SearchConditionNotContext | SearchConditionNotContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SearchConditionNotContext);
    } else {
      return this.getRuleContext(i, SearchConditionNotContext);
    }
  }

  public AND(): TerminalNode[];

  public AND(i: number): TerminalNode;

  public AND(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(QueryModificationParser.AND);
    } else {
      return this.getToken(QueryModificationParser.AND, i);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSearchConditionAnd) {
      listener.enterSearchConditionAnd(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSearchConditionAnd) {
      listener.exitSearchConditionAnd(this);
    }
  }
}

export class SearchConditionNotContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchConditionNot;
  }

  public predicate(): PredicateContext {
    return this.getRuleContext(0, PredicateContext);
  }

  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.NOT, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSearchConditionNot) {
      listener.enterSearchConditionNot(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSearchConditionNot) {
      listener.exitSearchConditionNot(this);
    }
  }
}

export class PredicateContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_predicate;
  }

  public copyFrom(ctx: PredicateContext): void {
    super.copyFrom(ctx);
  }
}

export class ComparisonPredicateContext extends PredicateContext {
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  public comparisonOp(): ComparisonOpContext {
    return this.getRuleContext(0, ComparisonOpContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterComparisonPredicate) {
      listener.enterComparisonPredicate(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitComparisonPredicate) {
      listener.exitComparisonPredicate(this);
    }
  }
}

export class InVarPredicateContext extends PredicateContext {
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  public IN(): TerminalNode {
    return this.getToken(QueryModificationParser.IN, 0);
  }

  public varRef(): VarRefContext {
    return this.getRuleContext(0, VarRefContext);
  }

  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.NOT, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterInVarPredicate) {
      listener.enterInVarPredicate(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitInVarPredicate) {
      listener.exitInVarPredicate(this);
    }
  }
}

export class InPredicateContext extends PredicateContext {
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  public IN(): TerminalNode {
    return this.getToken(QueryModificationParser.IN, 0);
  }

  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }

  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.NOT, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterInPredicate) {
      listener.enterInPredicate(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitInPredicate) {
      listener.exitInPredicate(this);
    }
  }
}

export class ParenPredicateContext extends PredicateContext {
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public searchCondition(): SearchConditionContext {
    return this.getRuleContext(0, SearchConditionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterParenPredicate) {
      listener.enterParenPredicate(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitParenPredicate) {
      listener.exitParenPredicate(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_expression;
  }

  public copyFrom(ctx: ExpressionContext): void {
    super.copyFrom(ctx);
  }
}

export class PrimitiveExpressionContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expressionAtom(): ExpressionAtomContext {
    return this.getRuleContext(0, ExpressionAtomContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterPrimitiveExpression) {
      listener.enterPrimitiveExpression(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitPrimitiveExpression) {
      listener.exitPrimitiveExpression(this);
    }
  }
}

export class FactorExpressionContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  public factorOp(): FactorOpContext {
    return this.getRuleContext(0, FactorOpContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFactorExpression) {
      listener.enterFactorExpression(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFactorExpression) {
      listener.exitFactorExpression(this);
    }
  }
}

export class ParenExpressionContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterParenExpression) {
      listener.enterParenExpression(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitParenExpression) {
      listener.exitParenExpression(this);
    }
  }
}

export class UnaryExpressionContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public unaryOp(): UnaryOpContext {
    return this.getRuleContext(0, UnaryOpContext);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
}

export class TermExpressionContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  public termOp(): TermOpContext {
    return this.getRuleContext(0, TermOpContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTermExpression) {
      listener.enterTermExpression(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTermExpression) {
      listener.exitTermExpression(this);
    }
  }
}

export class ExpressionAtomContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_expressionAtom;
  }

  public copyFrom(ctx: ExpressionAtomContext): void {
    super.copyFrom(ctx);
  }
}

export class FieldRefAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public fieldRef(): FieldRefContext {
    return this.getRuleContext(0, FieldRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFieldRefAtom) {
      listener.enterFieldRefAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFieldRefAtom) {
      listener.exitFieldRefAtom(this);
    }
  }
}

export class FunctionCallAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public functionCall(): FunctionCallContext {
    return this.getRuleContext(0, FunctionCallContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFunctionCallAtom) {
      listener.enterFunctionCallAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFunctionCallAtom) {
      listener.exitFunctionCallAtom(this);
    }
  }
}

export class BuiltinCallAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public builtinCall(): BuiltinCallContext {
    return this.getRuleContext(0, BuiltinCallContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBuiltinCallAtom) {
      listener.enterBuiltinCallAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBuiltinCallAtom) {
      listener.exitBuiltinCallAtom(this);
    }
  }
}

export class RdfLiteralAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public rdfLiteral(): RdfLiteralContext {
    return this.getRuleContext(0, RdfLiteralContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterRdfLiteralAtom) {
      listener.enterRdfLiteralAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitRdfLiteralAtom) {
      listener.exitRdfLiteralAtom(this);
    }
  }
}

export class StringLiteralAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public stringLiteral(): StringLiteralContext {
    return this.getRuleContext(0, StringLiteralContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStringLiteralAtom) {
      listener.enterStringLiteralAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStringLiteralAtom) {
      listener.exitStringLiteralAtom(this);
    }
  }
}

export class IriRefAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIriRefAtom) {
      listener.enterIriRefAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIriRefAtom) {
      listener.exitIriRefAtom(this);
    }
  }
}

export class NumericLiteralAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public numericLiteral(): NumericLiteralContext {
    return this.getRuleContext(0, NumericLiteralContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterNumericLiteralAtom) {
      listener.enterNumericLiteralAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitNumericLiteralAtom) {
      listener.exitNumericLiteralAtom(this);
    }
  }
}

export class BooleanLiteralAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public booleanLiteral(): BooleanLiteralContext {
    return this.getRuleContext(0, BooleanLiteralContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBooleanLiteralAtom) {
      listener.enterBooleanLiteralAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBooleanLiteralAtom) {
      listener.exitBooleanLiteralAtom(this);
    }
  }
}

export class VarRefAtomContext extends ExpressionAtomContext {
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public varRef(): VarRefContext {
    return this.getRuleContext(0, VarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterVarRefAtom) {
      listener.enterVarRefAtom(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitVarRefAtom) {
      listener.exitVarRefAtom(this);
    }
  }
}

export class BuiltinCallContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_builtinCall;
  }

  public copyFrom(ctx: BuiltinCallContext): void {
    super.copyFrom(ctx);
  }
}

export class IsLiteralFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ISLITERAL(): TerminalNode {
    return this.getToken(QueryModificationParser.ISLITERAL, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIsLiteralFunc) {
      listener.enterIsLiteralFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIsLiteralFunc) {
      listener.exitIsLiteralFunc(this);
    }
  }
}

export class StrStartsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRSTARTS(): TerminalNode {
    return this.getToken(QueryModificationParser.STRSTARTS, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrStartsFunc) {
      listener.enterStrStartsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrStartsFunc) {
      listener.exitStrStartsFunc(this);
    }
  }
}

export class ReplaceFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public REPLACE(): TerminalNode {
    return this.getToken(QueryModificationParser.REPLACE, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterReplaceFunc) {
      listener.enterReplaceFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitReplaceFunc) {
      listener.exitReplaceFunc(this);
    }
  }
}

export class BoundFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public BOUND(): TerminalNode {
    return this.getToken(QueryModificationParser.BOUND, 0);
  }

  public fieldRef(): FieldRefContext {
    return this.getRuleContext(0, FieldRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBoundFunc) {
      listener.enterBoundFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBoundFunc) {
      listener.exitBoundFunc(this);
    }
  }
}

export class Sha512FuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SHA512(): TerminalNode {
    return this.getToken(QueryModificationParser.SHA512, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSha512Func) {
      listener.enterSha512Func(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSha512Func) {
      listener.exitSha512Func(this);
    }
  }
}

export class UcaseFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public UCASE(): TerminalNode {
    return this.getToken(QueryModificationParser.UCASE, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterUcaseFunc) {
      listener.enterUcaseFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitUcaseFunc) {
      listener.exitUcaseFunc(this);
    }
  }
}

export class EncodeForUriFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ENCODE_FOR_URI(): TerminalNode {
    return this.getToken(QueryModificationParser.ENCODE_FOR_URI, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterEncodeForUriFunc) {
      listener.enterEncodeForUriFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitEncodeForUriFunc) {
      listener.exitEncodeForUriFunc(this);
    }
  }
}

export class YearFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public YEAR(): TerminalNode {
    return this.getToken(QueryModificationParser.YEAR, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterYearFunc) {
      listener.enterYearFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitYearFunc) {
      listener.exitYearFunc(this);
    }
  }
}

export class StrBeforeFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRBEFORE(): TerminalNode {
    return this.getToken(QueryModificationParser.STRBEFORE, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrBeforeFunc) {
      listener.enterStrBeforeFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrBeforeFunc) {
      listener.exitStrBeforeFunc(this);
    }
  }
}

export class Sha256FuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SHA256(): TerminalNode {
    return this.getToken(QueryModificationParser.SHA256, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSha256Func) {
      listener.enterSha256Func(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSha256Func) {
      listener.exitSha256Func(this);
    }
  }
}

export class FloorFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public FLOOR(): TerminalNode {
    return this.getToken(QueryModificationParser.FLOOR, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFloorFunc) {
      listener.enterFloorFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFloorFunc) {
      listener.exitFloorFunc(this);
    }
  }
}

export class IriFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public IRI(): TerminalNode {
    return this.getToken(QueryModificationParser.IRI, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIriFunc) {
      listener.enterIriFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIriFunc) {
      listener.exitIriFunc(this);
    }
  }
}

export class StrEndsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRENDS(): TerminalNode {
    return this.getToken(QueryModificationParser.STRENDS, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrEndsFunc) {
      listener.enterStrEndsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrEndsFunc) {
      listener.exitStrEndsFunc(this);
    }
  }
}

export class LcaseFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public LCASE(): TerminalNode {
    return this.getToken(QueryModificationParser.LCASE, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLcaseFunc) {
      listener.enterLcaseFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLcaseFunc) {
      listener.exitLcaseFunc(this);
    }
  }
}

export class ConcatFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public CONCAT(): TerminalNode {
    return this.getToken(QueryModificationParser.CONCAT, 0);
  }

  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterConcatFunc) {
      listener.enterConcatFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitConcatFunc) {
      listener.exitConcatFunc(this);
    }
  }
}

export class StrLenFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRLEN(): TerminalNode {
    return this.getToken(QueryModificationParser.STRLEN, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrLenFunc) {
      listener.enterStrLenFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrLenFunc) {
      listener.exitStrLenFunc(this);
    }
  }
}

export class TzFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public TZ(): TerminalNode {
    return this.getToken(QueryModificationParser.TZ, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTzFunc) {
      listener.enterTzFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTzFunc) {
      listener.exitTzFunc(this);
    }
  }
}

export class DatatypeFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public DATATYPE(): TerminalNode {
    return this.getToken(QueryModificationParser.DATATYPE, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterDatatypeFunc) {
      listener.enterDatatypeFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitDatatypeFunc) {
      listener.exitDatatypeFunc(this);
    }
  }
}

export class RegexFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public REGEX(): TerminalNode {
    return this.getToken(QueryModificationParser.REGEX, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterRegexFunc) {
      listener.enterRegexFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitRegexFunc) {
      listener.exitRegexFunc(this);
    }
  }
}

export class LangMatchesFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public LANGMATCHES(): TerminalNode {
    return this.getToken(QueryModificationParser.LANGMATCHES, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLangMatchesFunc) {
      listener.enterLangMatchesFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLangMatchesFunc) {
      listener.exitLangMatchesFunc(this);
    }
  }
}

export class Sha384FuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SHA384(): TerminalNode {
    return this.getToken(QueryModificationParser.SHA384, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSha384Func) {
      listener.enterSha384Func(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSha384Func) {
      listener.exitSha384Func(this);
    }
  }
}

export class MinutesFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public MINUTES(): TerminalNode {
    return this.getToken(QueryModificationParser.MINUTES, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterMinutesFunc) {
      listener.enterMinutesFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitMinutesFunc) {
      listener.exitMinutesFunc(this);
    }
  }
}

export class SecondsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SECONDS(): TerminalNode {
    return this.getToken(QueryModificationParser.SECONDS, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSecondsFunc) {
      listener.enterSecondsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSecondsFunc) {
      listener.exitSecondsFunc(this);
    }
  }
}

export class StrLangFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRLANG(): TerminalNode {
    return this.getToken(QueryModificationParser.STRLANG, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrLangFunc) {
      listener.enterStrLangFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrLangFunc) {
      listener.exitStrLangFunc(this);
    }
  }
}

export class StrUuidFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRUUID(): TerminalNode {
    return this.getToken(QueryModificationParser.STRUUID, 0);
  }

  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrUuidFunc) {
      listener.enterStrUuidFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrUuidFunc) {
      listener.exitStrUuidFunc(this);
    }
  }
}

export class AbsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ABS(): TerminalNode {
    return this.getToken(QueryModificationParser.ABS, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterAbsFunc) {
      listener.enterAbsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitAbsFunc) {
      listener.exitAbsFunc(this);
    }
  }
}

export class DayFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public DAY(): TerminalNode {
    return this.getToken(QueryModificationParser.DAY, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterDayFunc) {
      listener.enterDayFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitDayFunc) {
      listener.exitDayFunc(this);
    }
  }
}

export class NowFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public NOW(): TerminalNode {
    return this.getToken(QueryModificationParser.NOW, 0);
  }

  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterNowFunc) {
      listener.enterNowFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitNowFunc) {
      listener.exitNowFunc(this);
    }
  }
}

export class StrAfterFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRAFTER(): TerminalNode {
    return this.getToken(QueryModificationParser.STRAFTER, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrAfterFunc) {
      listener.enterStrAfterFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrAfterFunc) {
      listener.exitStrAfterFunc(this);
    }
  }
}

export class CeilFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public CEIL(): TerminalNode {
    return this.getToken(QueryModificationParser.CEIL, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterCeilFunc) {
      listener.enterCeilFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitCeilFunc) {
      listener.exitCeilFunc(this);
    }
  }
}

export class TimezoneFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public TIMEZONE(): TerminalNode {
    return this.getToken(QueryModificationParser.TIMEZONE, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTimezoneFunc) {
      listener.enterTimezoneFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTimezoneFunc) {
      listener.exitTimezoneFunc(this);
    }
  }
}

export class SameTermFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SAMETERM(): TerminalNode {
    return this.getToken(QueryModificationParser.SAMETERM, 0);
  }

  public fieldRef(): FieldRefContext[];

  public fieldRef(i: number): FieldRefContext;

  public fieldRef(i?: number): FieldRefContext | FieldRefContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FieldRefContext);
    } else {
      return this.getRuleContext(i, FieldRefContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSameTermFunc) {
      listener.enterSameTermFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSameTermFunc) {
      listener.exitSameTermFunc(this);
    }
  }
}

export class IsBlankFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ISBLANK(): TerminalNode {
    return this.getToken(QueryModificationParser.ISBLANK, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIsBlankFunc) {
      listener.enterIsBlankFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIsBlankFunc) {
      listener.exitIsBlankFunc(this);
    }
  }
}

export class RandFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public RAND(): TerminalNode {
    return this.getToken(QueryModificationParser.RAND, 0);
  }

  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterRandFunc) {
      listener.enterRandFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitRandFunc) {
      listener.exitRandFunc(this);
    }
  }
}

export class StrFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STR(): TerminalNode {
    return this.getToken(QueryModificationParser.STR, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrFunc) {
      listener.enterStrFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrFunc) {
      listener.exitStrFunc(this);
    }
  }
}

export class HoursFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public HOURS(): TerminalNode {
    return this.getToken(QueryModificationParser.HOURS, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterHoursFunc) {
      listener.enterHoursFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitHoursFunc) {
      listener.exitHoursFunc(this);
    }
  }
}

export class Md5FuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public MD5(): TerminalNode {
    return this.getToken(QueryModificationParser.MD5, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterMd5Func) {
      listener.enterMd5Func(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitMd5Func) {
      listener.exitMd5Func(this);
    }
  }
}

export class ContainsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public CONTAINS(): TerminalNode {
    return this.getToken(QueryModificationParser.CONTAINS, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterContainsFunc) {
      listener.enterContainsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitContainsFunc) {
      listener.exitContainsFunc(this);
    }
  }
}

export class RoundFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ROUND(): TerminalNode {
    return this.getToken(QueryModificationParser.ROUND, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterRoundFunc) {
      listener.enterRoundFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitRoundFunc) {
      listener.exitRoundFunc(this);
    }
  }
}

export class StrDtFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public STRDT(): TerminalNode {
    return this.getToken(QueryModificationParser.STRDT, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext {
    return this.getRuleContext(0, IriRefOrVarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStrDtFunc) {
      listener.enterStrDtFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStrDtFunc) {
      listener.exitStrDtFunc(this);
    }
  }
}

export class Sha1FuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SHA1(): TerminalNode {
    return this.getToken(QueryModificationParser.SHA1, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSha1Func) {
      listener.enterSha1Func(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSha1Func) {
      listener.exitSha1Func(this);
    }
  }
}

export class MonthFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public MONTH(): TerminalNode {
    return this.getToken(QueryModificationParser.MONTH, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterMonthFunc) {
      listener.enterMonthFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitMonthFunc) {
      listener.exitMonthFunc(this);
    }
  }
}

export class IfFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public IF(): TerminalNode {
    return this.getToken(QueryModificationParser.IF, 0);
  }

  public predicate(): PredicateContext {
    return this.getRuleContext(0, PredicateContext);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIfFunc) {
      listener.enterIfFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIfFunc) {
      listener.exitIfFunc(this);
    }
  }
}

export class IsIriFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ISIRI(): TerminalNode {
    return this.getToken(QueryModificationParser.ISIRI, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIsIriFunc) {
      listener.enterIsIriFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIsIriFunc) {
      listener.exitIsIriFunc(this);
    }
  }
}

export class SubstrFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public SUBSTR(): TerminalNode {
    return this.getToken(QueryModificationParser.SUBSTR, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterSubstrFunc) {
      listener.enterSubstrFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitSubstrFunc) {
      listener.exitSubstrFunc(this);
    }
  }
}

export class IsNumericFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ISNUMERIC(): TerminalNode {
    return this.getToken(QueryModificationParser.ISNUMERIC, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIsNumericFunc) {
      listener.enterIsNumericFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIsNumericFunc) {
      listener.exitIsNumericFunc(this);
    }
  }
}

export class UuidFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public UUID(): TerminalNode {
    return this.getToken(QueryModificationParser.UUID, 0);
  }

  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterUuidFunc) {
      listener.enterUuidFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitUuidFunc) {
      listener.exitUuidFunc(this);
    }
  }
}

export class LangFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public LANG(): TerminalNode {
    return this.getToken(QueryModificationParser.LANG, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLangFunc) {
      listener.enterLangFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLangFunc) {
      listener.exitLangFunc(this);
    }
  }
}

export class CoalesceFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public COALESCE(): TerminalNode {
    return this.getToken(QueryModificationParser.COALESCE, 0);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext {
    return this.getRuleContext(0, IriRefOrVarRefContext);
  }

  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterCoalesceFunc) {
      listener.enterCoalesceFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitCoalesceFunc) {
      listener.exitCoalesceFunc(this);
    }
  }
}

export class IsURIFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public ISURI(): TerminalNode {
    return this.getToken(QueryModificationParser.ISURI, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIsURIFunc) {
      listener.enterIsURIFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIsURIFunc) {
      listener.exitIsURIFunc(this);
    }
  }
}

export class UriFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public URI(): TerminalNode {
    return this.getToken(QueryModificationParser.URI, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterUriFunc) {
      listener.enterUriFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitUriFunc) {
      listener.exitUriFunc(this);
    }
  }
}

export class ExistsFuncContext extends BuiltinCallContext {
  constructor(ctx: BuiltinCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public EXISTS(): TerminalNode {
    return this.getToken(QueryModificationParser.EXISTS, 0);
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterExistsFunc) {
      listener.enterExistsFunc(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitExistsFunc) {
      listener.exitExistsFunc(this);
    }
  }
}

export class PatternContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_pattern;
  }

  public copyFrom(ctx: PatternContext): void {
    super.copyFrom(ctx);
  }
}

export class TextMatchPatternContext extends PatternContext {
  constructor(ctx: PatternContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public stringLiteralOrVarRef(): StringLiteralOrVarRefContext {
    return this.getRuleContext(0, StringLiteralOrVarRefContext);
  }

  public TEXTMATCH(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.TEXTMATCH, 0);
  }

  public GEOMATCH(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.GEOMATCH, 0);
  }

  public fieldRef(): FieldRefContext | undefined {
    return this.tryGetRuleContext(0, FieldRefContext);
  }

  public textMatchParam(): TextMatchParamContext[];

  public textMatchParam(i: number): TextMatchParamContext;

  public textMatchParam(
    i?: number
  ): TextMatchParamContext | TextMatchParamContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TextMatchParamContext);
    } else {
      return this.getRuleContext(i, TextMatchParamContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTextMatchPattern) {
      listener.enterTextMatchPattern(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTextMatchPattern) {
      listener.exitTextMatchPattern(this);
    }
  }
}

export class GeoNearbyPatternContext extends PatternContext {
  constructor(ctx: PatternContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public WITHIN(): TerminalNode {
    return this.getToken(QueryModificationParser.WITHIN, 0);
  }

  public proximitySpec(): ProximitySpecContext {
    return this.getRuleContext(0, ProximitySpecContext);
  }

  public OF(): TerminalNode {
    return this.getToken(QueryModificationParser.OF, 0);
  }

  public featureOrLatLon(): FeatureOrLatLonContext {
    return this.getRuleContext(0, FeatureOrLatLonContext);
  }

  public fieldRef(): FieldRefContext | undefined {
    return this.tryGetRuleContext(0, FieldRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterGeoNearbyPattern) {
      listener.enterGeoNearbyPattern(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitGeoNearbyPattern) {
      listener.exitGeoNearbyPattern(this);
    }
  }
}

export class TextMatchParamContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_textMatchParam;
  }

  public copyFrom(ctx: TextMatchParamContext): void {
    super.copyFrom(ctx);
  }
}

export class TextMatchMinScoreParamContext extends TextMatchParamContext {
  constructor(ctx: TextMatchParamContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public MIN_SCORE(): TerminalNode {
    return this.getToken(QueryModificationParser.MIN_SCORE, 0);
  }

  public DECIMAL(): TerminalNode {
    return this.getToken(QueryModificationParser.DECIMAL, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTextMatchMinScoreParam) {
      listener.enterTextMatchMinScoreParam(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTextMatchMinScoreParam) {
      listener.exitTextMatchMinScoreParam(this);
    }
  }
}

export class TextMatchMaxHitsParamContext extends TextMatchParamContext {
  constructor(ctx: TextMatchParamContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public MAX_HITS(): TerminalNode {
    return this.getToken(QueryModificationParser.MAX_HITS, 0);
  }

  public INTEGER(): TerminalNode {
    return this.getToken(QueryModificationParser.INTEGER, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTextMatchMaxHitsParam) {
      listener.enterTextMatchMaxHitsParam(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTextMatchMaxHitsParam) {
      listener.exitTextMatchMaxHitsParam(this);
    }
  }
}

export class TextMatchBoostParamContext extends TextMatchParamContext {
  constructor(ctx: TextMatchParamContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public BOOST(): TerminalNode {
    return this.getToken(QueryModificationParser.BOOST, 0);
  }

  public numericLiteral(): NumericLiteralContext {
    return this.getRuleContext(0, NumericLiteralContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTextMatchBoostParam) {
      listener.enterTextMatchBoostParam(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTextMatchBoostParam) {
      listener.exitTextMatchBoostParam(this);
    }
  }
}

export class BoostContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_boost;
  }

  public copyFrom(ctx: BoostContext): void {
    super.copyFrom(ctx);
  }
}

export class FollowsUserBoostContext extends BoostContext {
  constructor(ctx: BoostContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public numericLiteral(): NumericLiteralContext {
    return this.getRuleContext(0, NumericLiteralContext);
  }

  public IF_FOLLOWS(): TerminalNode {
    return this.getToken(QueryModificationParser.IF_FOLLOWS, 0);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext {
    return this.getRuleContext(0, IriRefOrVarRefContext);
  }

  public BOOST(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.BOOST, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFollowsUserBoost) {
      listener.enterFollowsUserBoost(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFollowsUserBoost) {
      listener.exitFollowsUserBoost(this);
    }
  }
}

export class FollowedByUserBoostContext extends BoostContext {
  constructor(ctx: BoostContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public numericLiteral(): NumericLiteralContext {
    return this.getRuleContext(0, NumericLiteralContext);
  }

  public IF_FOLLOWED_BY(): TerminalNode {
    return this.getToken(QueryModificationParser.IF_FOLLOWED_BY, 0);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext {
    return this.getRuleContext(0, IriRefOrVarRefContext);
  }

  public BOOST(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.BOOST, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFollowedByUserBoost) {
      listener.enterFollowedByUserBoost(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFollowedByUserBoost) {
      listener.exitFollowedByUserBoost(this);
    }
  }
}

export class BindingContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_binding;
  }

  public BIND(): TerminalNode {
    return this.getToken(QueryModificationParser.BIND, 0);
  }

  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }

  public AS(): TerminalNode {
    return this.getToken(QueryModificationParser.AS, 0);
  }

  public VARNAME(): TerminalNode {
    return this.getToken(QueryModificationParser.VARNAME, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBinding) {
      listener.enterBinding(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBinding) {
      listener.exitBinding(this);
    }
  }
}

export class ExpressionListContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_expressionList;
  }

  public expression(): ExpressionContext[];

  public expression(i: number): ExpressionContext;

  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
}

export class FeatureOrLatLonContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_featureOrLatLon;
  }

  public copyFrom(ctx: FeatureOrLatLonContext): void {
    super.copyFrom(ctx);
  }
}

export class FeatureContext extends FeatureOrLatLonContext {
  constructor(ctx: FeatureOrLatLonContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFeature) {
      listener.enterFeature(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFeature) {
      listener.exitFeature(this);
    }
  }
}

export class LatLonContext extends FeatureOrLatLonContext {
  constructor(ctx: FeatureOrLatLonContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public LATLON(): TerminalNode {
    return this.getToken(QueryModificationParser.LATLON, 0);
  }

  public varRef(): VarRefContext[];

  public varRef(i: number): VarRefContext;

  public varRef(i?: number): VarRefContext | VarRefContext[] {
    if (i === undefined) {
      return this.getRuleContexts(VarRefContext);
    } else {
      return this.getRuleContext(i, VarRefContext);
    }
  }

  public numericLiteral(): NumericLiteralContext[];

  public numericLiteral(i: number): NumericLiteralContext;

  public numericLiteral(
    i?: number
  ): NumericLiteralContext | NumericLiteralContext[] {
    if (i === undefined) {
      return this.getRuleContexts(NumericLiteralContext);
    } else {
      return this.getRuleContext(i, NumericLiteralContext);
    }
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLatLon) {
      listener.enterLatLon(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLatLon) {
      listener.exitLatLon(this);
    }
  }
}

export class VarFeatureContext extends FeatureOrLatLonContext {
  constructor(ctx: FeatureOrLatLonContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public varRef(): VarRefContext {
    return this.getRuleContext(0, VarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterVarFeature) {
      listener.enterVarFeature(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitVarFeature) {
      listener.exitVarFeature(this);
    }
  }
}

export class ProximitySpecContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_proximitySpec;
  }

  public numericLiteralOrVarRef(): NumericLiteralOrVarRefContext {
    return this.getRuleContext(0, NumericLiteralOrVarRefContext);
  }

  public iriRefOrVarRef(): IriRefOrVarRefContext {
    return this.getRuleContext(0, IriRefOrVarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterProximitySpec) {
      listener.enterProximitySpec(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitProximitySpec) {
      listener.exitProximitySpec(this);
    }
  }
}

export class FunctionCallContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_functionCall;
  }

  public copyFrom(ctx: FunctionCallContext): void {
    super.copyFrom(ctx);
  }
}

export class FuncWithArgsContext extends FunctionCallContext {
  constructor(ctx: FunctionCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }

  public prefixedName(): PrefixedNameContext {
    return this.getRuleContext(0, PrefixedNameContext);
  }

  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFuncWithArgs) {
      listener.enterFuncWithArgs(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFuncWithArgs) {
      listener.exitFuncWithArgs(this);
    }
  }
}

export class FuncWithoutArgsContext extends FunctionCallContext {
  constructor(ctx: FunctionCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }

  public prefixedName(): PrefixedNameContext {
    return this.getRuleContext(0, PrefixedNameContext);
  }

  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFuncWithoutArgs) {
      listener.enterFuncWithoutArgs(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFuncWithoutArgs) {
      listener.exitFuncWithoutArgs(this);
    }
  }
}

export class RdfLiteralContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_rdfLiteral;
  }

  public copyFrom(ctx: RdfLiteralContext): void {
    super.copyFrom(ctx);
  }
}

export class LangRdfLiteralContext extends RdfLiteralContext {
  constructor(ctx: RdfLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public stringLiteral(): StringLiteralContext {
    return this.getRuleContext(0, StringLiteralContext);
  }

  public LANGTAG(): TerminalNode {
    return this.getToken(QueryModificationParser.LANGTAG, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLangRdfLiteral) {
      listener.enterLangRdfLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLangRdfLiteral) {
      listener.exitLangRdfLiteral(this);
    }
  }
}

export class DtRdfLiteralContext extends RdfLiteralContext {
  constructor(ctx: RdfLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public stringLiteral(): StringLiteralContext {
    return this.getRuleContext(0, StringLiteralContext);
  }

  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterDtRdfLiteral) {
      listener.enterDtRdfLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitDtRdfLiteral) {
      listener.exitDtRdfLiteral(this);
    }
  }
}

export class NumericLiteralContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_numericLiteral;
  }

  public copyFrom(ctx: NumericLiteralContext): void {
    super.copyFrom(ctx);
  }
}

export class DecimalLiteralContext extends NumericLiteralContext {
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public DECIMAL(): TerminalNode {
    return this.getToken(QueryModificationParser.DECIMAL, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterDecimalLiteral) {
      listener.enterDecimalLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitDecimalLiteral) {
      listener.exitDecimalLiteral(this);
    }
  }
}

export class DoubleLiteralContext extends NumericLiteralContext {
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public DOUBLE(): TerminalNode {
    return this.getToken(QueryModificationParser.DOUBLE, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterDoubleLiteral) {
      listener.enterDoubleLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitDoubleLiteral) {
      listener.exitDoubleLiteral(this);
    }
  }
}

export class IntegerLiteralContext extends NumericLiteralContext {
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public INTEGER(): TerminalNode {
    return this.getToken(QueryModificationParser.INTEGER, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIntegerLiteral) {
      listener.enterIntegerLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIntegerLiteral) {
      listener.exitIntegerLiteral(this);
    }
  }
}

export class VarRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_varRef;
  }

  public VARNAME(): TerminalNode {
    return this.getToken(QueryModificationParser.VARNAME, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterVarRef) {
      listener.enterVarRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitVarRef) {
      listener.exitVarRef(this);
    }
  }
}

export class FieldRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_fieldRef;
  }

  public VARNAME(): TerminalNode {
    return this.getToken(QueryModificationParser.VARNAME, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFieldRef) {
      listener.enterFieldRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFieldRef) {
      listener.exitFieldRef(this);
    }
  }
}

export class ComparisonOpContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_comparisonOp;
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterComparisonOp) {
      listener.enterComparisonOp(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitComparisonOp) {
      listener.exitComparisonOp(this);
    }
  }
}

export class UnaryOpContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_unaryOp;
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterUnaryOp) {
      listener.enterUnaryOp(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitUnaryOp) {
      listener.exitUnaryOp(this);
    }
  }
}

export class FactorOpContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_factorOp;
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterFactorOp) {
      listener.enterFactorOp(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitFactorOp) {
      listener.exitFactorOp(this);
    }
  }
}

export class TermOpContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_termOp;
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterTermOp) {
      listener.enterTermOp(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitTermOp) {
      listener.exitTermOp(this);
    }
  }
}

export class StringLiteralContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_stringLiteral;
  }

  public STRING_LITERAL1(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.STRING_LITERAL1, 0);
  }

  public STRING_LITERAL2(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.STRING_LITERAL2, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStringLiteral) {
      listener.enterStringLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStringLiteral) {
      listener.exitStringLiteral(this);
    }
  }
}

export class StringLiteralOrVarRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_stringLiteralOrVarRef;
  }

  public stringLiteral(): StringLiteralContext | undefined {
    return this.tryGetRuleContext(0, StringLiteralContext);
  }

  public varRef(): VarRefContext | undefined {
    return this.tryGetRuleContext(0, VarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterStringLiteralOrVarRef) {
      listener.enterStringLiteralOrVarRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitStringLiteralOrVarRef) {
      listener.exitStringLiteralOrVarRef(this);
    }
  }
}

export class BooleanLiteralContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_booleanLiteral;
  }

  public TRUE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.TRUE, 0);
  }

  public FALSE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.FALSE, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBooleanLiteral) {
      listener.enterBooleanLiteral(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBooleanLiteral) {
      listener.exitBooleanLiteral(this);
    }
  }
}

export class IriRefOrVarRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_iriRefOrVarRef;
  }

  public iriRef(): IriRefContext | undefined {
    return this.tryGetRuleContext(0, IriRefContext);
  }

  public varRef(): VarRefContext | undefined {
    return this.tryGetRuleContext(0, VarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterIriRefOrVarRef) {
      listener.enterIriRefOrVarRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitIriRefOrVarRef) {
      listener.exitIriRefOrVarRef(this);
    }
  }
}

export class NumericLiteralOrVarRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_numericLiteralOrVarRef;
  }

  public numericLiteral(): NumericLiteralContext | undefined {
    return this.tryGetRuleContext(0, NumericLiteralContext);
  }

  public varRef(): VarRefContext | undefined {
    return this.tryGetRuleContext(0, VarRefContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterNumericLiteralOrVarRef) {
      listener.enterNumericLiteralOrVarRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitNumericLiteralOrVarRef) {
      listener.exitNumericLiteralOrVarRef(this);
    }
  }
}

export class IriRefContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_iriRef;
  }

  public copyFrom(ctx: IriRefContext): void {
    super.copyFrom(ctx);
  }
}

export class LiteralIriRefContext extends IriRefContext {
  constructor(ctx: IriRefContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public IRI_REF(): TerminalNode {
    return this.getToken(QueryModificationParser.IRI_REF, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterLiteralIriRef) {
      listener.enterLiteralIriRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitLiteralIriRef) {
      listener.exitLiteralIriRef(this);
    }
  }
}

export class PrefixedNameIriRefContext extends IriRefContext {
  constructor(ctx: IriRefContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }

  public prefixedName(): PrefixedNameContext {
    return this.getRuleContext(0, PrefixedNameContext);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterPrefixedNameIriRef) {
      listener.enterPrefixedNameIriRef(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitPrefixedNameIriRef) {
      listener.exitPrefixedNameIriRef(this);
    }
  }
}

export class PrefixedNameContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_prefixedName;
  }

  public PNAME_LN(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.PNAME_LN, 0);
  }

  public PNAME_NS(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.PNAME_NS, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterPrefixedName) {
      listener.enterPrefixedName(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitPrefixedName) {
      listener.exitPrefixedName(this);
    }
  }
}

export class BlankNodeContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }

  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_blankNode;
  }

  public BLANK_NODE_LABEL(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.BLANK_NODE_LABEL, 0);
  }

  public ANON(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.ANON, 0);
  }

  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterBlankNode) {
      listener.enterBlankNode(this);
    }
  }

  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitBlankNode) {
      listener.exitBlankNode(this);
    }
  }
}
