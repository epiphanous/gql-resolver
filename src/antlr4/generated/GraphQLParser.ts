// Generated from GraphQL.g4 by ANTLR 4.6-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { GraphQLListener } from './GraphQLListener';

export class GraphQLParser extends Parser {
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
  public static readonly T__24 = 25;
  public static readonly T__25 = 26;
  public static readonly T__26 = 27;
  public static readonly T__27 = 28;
  public static readonly T__28 = 29;
  public static readonly T__29 = 30;
  public static readonly T__30 = 31;
  public static readonly T__31 = 32;
  public static readonly T__32 = 33;
  public static readonly T__33 = 34;
  public static readonly T__34 = 35;
  public static readonly T__35 = 36;
  public static readonly T__36 = 37;
  public static readonly T__37 = 38;
  public static readonly T__38 = 39;
  public static readonly T__39 = 40;
  public static readonly T__40 = 41;
  public static readonly T__41 = 42;
  public static readonly T__42 = 43;
  public static readonly T__43 = 44;
  public static readonly T__44 = 45;
  public static readonly T__45 = 46;
  public static readonly T__46 = 47;
  public static readonly T__47 = 48;
  public static readonly NAME = 49;
  public static readonly INT_VALUE = 50;
  public static readonly FLOAT_VALUE = 51;
  public static readonly STRING_VALUE = 52;
  public static readonly BOOLEAN_VALUE = 53;
  public static readonly NULL_VALUE = 54;
  public static readonly COMMENT = 55;
  public static readonly IGNORED = 56;
  public static readonly RULE_document = 0;
  public static readonly RULE_definition = 1;
  public static readonly RULE_executableDefinition = 2;
  public static readonly RULE_operationDefinition = 3;
  public static readonly RULE_operationType = 4;
  public static readonly RULE_selectionSet = 5;
  public static readonly RULE_selection = 6;
  public static readonly RULE_field = 7;
  public static readonly RULE_alias = 8;
  public static readonly RULE_arguments = 9;
  public static readonly RULE_argument = 10;
  public static readonly RULE_fragmentSpread = 11;
  public static readonly RULE_inlineFragment = 12;
  public static readonly RULE_fragmentDefinition = 13;
  public static readonly RULE_fragmentName = 14;
  public static readonly RULE_typeCondition = 15;
  public static readonly RULE_value = 16;
  public static readonly RULE_objectField = 17;
  public static readonly RULE_variableDefinitions = 18;
  public static readonly RULE_variableDefinition = 19;
  public static readonly RULE_variable = 20;
  public static readonly RULE_defaultValue = 21;
  public static readonly RULE_type = 22;
  public static readonly RULE_namedType = 23;
  public static readonly RULE_listType = 24;
  public static readonly RULE_nonNullType = 25;
  public static readonly RULE_directives = 26;
  public static readonly RULE_directive = 27;
  public static readonly RULE_typeSystemDefinition = 28;
  public static readonly RULE_typeSystemExtension = 29;
  public static readonly RULE_schemaDefinition = 30;
  public static readonly RULE_schemaExtension = 31;
  public static readonly RULE_operationTypeDefinition = 32;
  public static readonly RULE_description = 33;
  public static readonly RULE_typeDefinition = 34;
  public static readonly RULE_typeExtension = 35;
  public static readonly RULE_scalarTypeDefinition = 36;
  public static readonly RULE_scalarTypeExtension = 37;
  public static readonly RULE_objectTypeDefinition = 38;
  public static readonly RULE_objectTypeExtension = 39;
  public static readonly RULE_implementsInterfaces = 40;
  public static readonly RULE_fieldsDefinition = 41;
  public static readonly RULE_fieldDefinition = 42;
  public static readonly RULE_argumentsDefinition = 43;
  public static readonly RULE_inputValueDefinition = 44;
  public static readonly RULE_interfaceTypeDefinition = 45;
  public static readonly RULE_interfaceTypeExtension = 46;
  public static readonly RULE_unionTypeDefinition = 47;
  public static readonly RULE_unionMemberTypes = 48;
  public static readonly RULE_unionTypeExtension = 49;
  public static readonly RULE_enumTypeDefinition = 50;
  public static readonly RULE_enumValuesDefinition = 51;
  public static readonly RULE_enumValueDefinition = 52;
  public static readonly RULE_enumTypeExtension = 53;
  public static readonly RULE_inputObjectTypeDefinition = 54;
  public static readonly RULE_inputFieldsDefinition = 55;
  public static readonly RULE_inputObjectTypeExtension = 56;
  public static readonly RULE_directiveDefinition = 57;
  public static readonly RULE_directiveLocations = 58;
  public static readonly RULE_directiveLocation = 59;
  public static readonly RULE_executableDirectiveLocation = 60;
  public static readonly RULE_typeSystemDirectiveLocation = 61;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'document',
    'definition',
    'executableDefinition',
    'operationDefinition',
    'operationType',
    'selectionSet',
    'selection',
    'field',
    'alias',
    'arguments',
    'argument',
    'fragmentSpread',
    'inlineFragment',
    'fragmentDefinition',
    'fragmentName',
    'typeCondition',
    'value',
    'objectField',
    'variableDefinitions',
    'variableDefinition',
    'variable',
    'defaultValue',
    'type',
    'namedType',
    'listType',
    'nonNullType',
    'directives',
    'directive',
    'typeSystemDefinition',
    'typeSystemExtension',
    'schemaDefinition',
    'schemaExtension',
    'operationTypeDefinition',
    'description',
    'typeDefinition',
    'typeExtension',
    'scalarTypeDefinition',
    'scalarTypeExtension',
    'objectTypeDefinition',
    'objectTypeExtension',
    'implementsInterfaces',
    'fieldsDefinition',
    'fieldDefinition',
    'argumentsDefinition',
    'inputValueDefinition',
    'interfaceTypeDefinition',
    'interfaceTypeExtension',
    'unionTypeDefinition',
    'unionMemberTypes',
    'unionTypeExtension',
    'enumTypeDefinition',
    'enumValuesDefinition',
    'enumValueDefinition',
    'enumTypeExtension',
    'inputObjectTypeDefinition',
    'inputFieldsDefinition',
    'inputObjectTypeExtension',
    'directiveDefinition',
    'directiveLocations',
    'directiveLocation',
    'executableDirectiveLocation',
    'typeSystemDirectiveLocation',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'query'",
    "'mutation'",
    "'subscription'",
    "'{'",
    "'}'",
    "':'",
    "'('",
    "')'",
    "'...'",
    "'fragment'",
    "'on'",
    "'['",
    "']'",
    "'$'",
    "'='",
    "'!'",
    "'@'",
    "'schema'",
    "'extend'",
    "'scalar'",
    "'type'",
    "'implements'",
    "'&'",
    "'interface'",
    "'union'",
    "'|'",
    "'enum'",
    "'input'",
    "'directive'",
    "'QUERY'",
    "'MUTATION'",
    "'SUBSCRIPTION'",
    "'FIELD'",
    "'FRAGMENT_DEFINITION'",
    "'FRAGMENT_SPREAD'",
    "'INLINE_FRAGMENT'",
    "'VARIABLE_DEFINITION'",
    "'SCHEMA'",
    "'SCALAR'",
    "'OBJECT'",
    "'FIELD_DEFINITION'",
    "'ARGUMENT_DEFINITION'",
    "'INTERFACE'",
    "'UNION'",
    "'ENUM'",
    "'ENUM_VALUE'",
    "'INPUT_OBJECT'",
    "'INPUT_FIELD_DEFINITION'",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "'null'",
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
    'NAME',
    'INT_VALUE',
    'FLOAT_VALUE',
    'STRING_VALUE',
    'BOOLEAN_VALUE',
    'NULL_VALUE',
    'COMMENT',
    'IGNORED',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    GraphQLParser._LITERAL_NAMES,
    GraphQLParser._SYMBOLIC_NAMES,
    []
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return GraphQLParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'GraphQL.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return GraphQLParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return GraphQLParser._serializedATN;
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(GraphQLParser._ATN, this);
  }
  // @RuleVersion(0)
  public document(): DocumentContext {
    let _localctx: DocumentContext = new DocumentContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, GraphQLParser.RULE_document);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 124;
              this.definition();
            }
          }
          this.state = 127;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GraphQLParser.T__0) |
                (1 << GraphQLParser.T__1) |
                (1 << GraphQLParser.T__2) |
                (1 << GraphQLParser.T__3) |
                (1 << GraphQLParser.T__9) |
                (1 << GraphQLParser.T__17) |
                (1 << GraphQLParser.T__18) |
                (1 << GraphQLParser.T__19) |
                (1 << GraphQLParser.T__20) |
                (1 << GraphQLParser.T__23) |
                (1 << GraphQLParser.T__24) |
                (1 << GraphQLParser.T__26) |
                (1 << GraphQLParser.T__27) |
                (1 << GraphQLParser.T__28))) !==
              0) ||
          _la === GraphQLParser.STRING_VALUE
        );
        this.state = 129;
        this.match(GraphQLParser.EOF);
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
  public definition(): DefinitionContext {
    let _localctx: DefinitionContext = new DefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 2, GraphQLParser.RULE_definition);
    try {
      this.state = 134;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GraphQLParser.T__0:
        case GraphQLParser.T__1:
        case GraphQLParser.T__2:
        case GraphQLParser.T__3:
        case GraphQLParser.T__9:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 131;
            this.executableDefinition();
          }
          break;
        case GraphQLParser.T__17:
        case GraphQLParser.T__19:
        case GraphQLParser.T__20:
        case GraphQLParser.T__23:
        case GraphQLParser.T__24:
        case GraphQLParser.T__26:
        case GraphQLParser.T__27:
        case GraphQLParser.T__28:
        case GraphQLParser.STRING_VALUE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 132;
            this.typeSystemDefinition();
          }
          break;
        case GraphQLParser.T__18:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 133;
            this.typeSystemExtension();
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
  public executableDefinition(): ExecutableDefinitionContext {
    let _localctx: ExecutableDefinitionContext = new ExecutableDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 4, GraphQLParser.RULE_executableDefinition);
    try {
      this.state = 138;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GraphQLParser.T__0:
        case GraphQLParser.T__1:
        case GraphQLParser.T__2:
        case GraphQLParser.T__3:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 136;
            this.operationDefinition();
          }
          break;
        case GraphQLParser.T__9:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 137;
            this.fragmentDefinition();
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
  public operationDefinition(): OperationDefinitionContext {
    let _localctx: OperationDefinitionContext = new OperationDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 6, GraphQLParser.RULE_operationDefinition);
    let _la: number;
    try {
      this.state = 153;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GraphQLParser.T__3:
          _localctx = new SelectionOnlyOperationDefinitionContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 140;
            this.selectionSet();
          }
          break;
        case GraphQLParser.T__0:
        case GraphQLParser.T__1:
        case GraphQLParser.T__2:
          _localctx = new FullOperationDefinitionContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 141;
            this.operationType();
            this.state = 143;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.NAME) {
              {
                this.state = 142;
                this.match(GraphQLParser.NAME);
              }
            }

            this.state = 146;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__6) {
              {
                this.state = 145;
                this.variableDefinitions();
              }
            }

            this.state = 149;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 148;
                this.directives();
              }
            }

            this.state = 151;
            this.selectionSet();
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
  public operationType(): OperationTypeContext {
    let _localctx: OperationTypeContext = new OperationTypeContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 8, GraphQLParser.RULE_operationType);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 155;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GraphQLParser.T__0) |
                (1 << GraphQLParser.T__1) |
                (1 << GraphQLParser.T__2))) !==
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
  public selectionSet(): SelectionSetContext {
    let _localctx: SelectionSetContext = new SelectionSetContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 10, GraphQLParser.RULE_selectionSet);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 157;
        this.match(GraphQLParser.T__3);
        this.state = 159;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 158;
              this.selection();
            }
          }
          this.state = 161;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === GraphQLParser.T__8 || _la === GraphQLParser.NAME);
        this.state = 163;
        this.match(GraphQLParser.T__4);
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
  public selection(): SelectionContext {
    let _localctx: SelectionContext = new SelectionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 12, GraphQLParser.RULE_selection);
    try {
      this.state = 168;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
        case 1:
          _localctx = new FieldSelectionContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 165;
            this.field();
          }
          break;

        case 2:
          _localctx = new FragmentSpreadSelectionContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 166;
            this.fragmentSpread();
          }
          break;

        case 3:
          _localctx = new InlineFragmentSelectionContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 167;
            this.inlineFragment();
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
  public field(): FieldContext {
    let _localctx: FieldContext = new FieldContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, GraphQLParser.RULE_field);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 171;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
          case 1:
            {
              this.state = 170;
              this.alias();
            }
            break;
        }
        this.state = 173;
        this.match(GraphQLParser.NAME);
        this.state = 175;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__6) {
          {
            this.state = 174;
            this.arguments();
          }
        }

        this.state = 178;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 177;
            this.directives();
          }
        }

        this.state = 181;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__3) {
          {
            this.state = 180;
            this.selectionSet();
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
  public alias(): AliasContext {
    let _localctx: AliasContext = new AliasContext(this._ctx, this.state);
    this.enterRule(_localctx, 16, GraphQLParser.RULE_alias);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 183;
        this.match(GraphQLParser.NAME);
        this.state = 184;
        this.match(GraphQLParser.T__5);
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
  public arguments(): ArgumentsContext {
    let _localctx: ArgumentsContext = new ArgumentsContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 18, GraphQLParser.RULE_arguments);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 186;
        this.match(GraphQLParser.T__6);
        this.state = 188;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 187;
              this.argument();
            }
          }
          this.state = 190;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === GraphQLParser.NAME);
        this.state = 192;
        this.match(GraphQLParser.T__7);
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
  public argument(): ArgumentContext {
    let _localctx: ArgumentContext = new ArgumentContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, GraphQLParser.RULE_argument);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 194;
        this.match(GraphQLParser.NAME);
        this.state = 195;
        this.match(GraphQLParser.T__5);
        this.state = 196;
        this.value();
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
  public fragmentSpread(): FragmentSpreadContext {
    let _localctx: FragmentSpreadContext = new FragmentSpreadContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 22, GraphQLParser.RULE_fragmentSpread);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 198;
        this.match(GraphQLParser.T__8);
        this.state = 199;
        this.fragmentName();
        this.state = 201;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 200;
            this.directives();
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
  public inlineFragment(): InlineFragmentContext {
    let _localctx: InlineFragmentContext = new InlineFragmentContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 24, GraphQLParser.RULE_inlineFragment);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 203;
        this.match(GraphQLParser.T__8);
        this.state = 205;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__10) {
          {
            this.state = 204;
            this.typeCondition();
          }
        }

        this.state = 208;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 207;
            this.directives();
          }
        }

        this.state = 210;
        this.selectionSet();
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
  public fragmentDefinition(): FragmentDefinitionContext {
    let _localctx: FragmentDefinitionContext = new FragmentDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 26, GraphQLParser.RULE_fragmentDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 212;
        this.match(GraphQLParser.T__9);
        this.state = 213;
        this.fragmentName();
        this.state = 214;
        this.typeCondition();
        this.state = 216;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 215;
            this.directives();
          }
        }

        this.state = 218;
        this.selectionSet();
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
  public fragmentName(): FragmentNameContext {
    let _localctx: FragmentNameContext = new FragmentNameContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 28, GraphQLParser.RULE_fragmentName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 220;
        this.match(GraphQLParser.NAME);
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
  public typeCondition(): TypeConditionContext {
    let _localctx: TypeConditionContext = new TypeConditionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 30, GraphQLParser.RULE_typeCondition);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 222;
        this.match(GraphQLParser.T__10);
        this.state = 223;
        this.namedType();
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
  public value(): ValueContext {
    let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, GraphQLParser.RULE_value);
    let _la: number;
    try {
      this.state = 252;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 20, this._ctx)) {
        case 1:
          _localctx = new VariableValueContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 225;
            this.variable();
          }
          break;

        case 2:
          _localctx = new IntValueContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 226;
            this.match(GraphQLParser.INT_VALUE);
          }
          break;

        case 3:
          _localctx = new FloatValueContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 227;
            this.match(GraphQLParser.FLOAT_VALUE);
          }
          break;

        case 4:
          _localctx = new StringValueContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 228;
            this.match(GraphQLParser.STRING_VALUE);
          }
          break;

        case 5:
          _localctx = new BooleanValueContext(_localctx);
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 229;
            this.match(GraphQLParser.BOOLEAN_VALUE);
          }
          break;

        case 6:
          _localctx = new NullValueContext(_localctx);
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 230;
            this.match(GraphQLParser.NULL_VALUE);
          }
          break;

        case 7:
          _localctx = new EnumValueContext(_localctx);
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 231;
            this.match(GraphQLParser.NAME);
          }
          break;

        case 8:
          _localctx = new EmptyListValueContext(_localctx);
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 232;
            this.match(GraphQLParser.T__11);
            this.state = 233;
            this.match(GraphQLParser.T__12);
          }
          break;

        case 9:
          _localctx = new NonEmptyListValueContext(_localctx);
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 234;
            this.match(GraphQLParser.T__11);
            this.state = 236;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 235;
                  this.value();
                }
              }
              this.state = 238;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (
              ((_la & ~0x1f) === 0 &&
                ((1 << _la) &
                  ((1 << GraphQLParser.T__3) |
                    (1 << GraphQLParser.T__11) |
                    (1 << GraphQLParser.T__13))) !==
                  0) ||
              (((_la - 49) & ~0x1f) === 0 &&
                ((1 << (_la - 49)) &
                  ((1 << (GraphQLParser.NAME - 49)) |
                    (1 << (GraphQLParser.INT_VALUE - 49)) |
                    (1 << (GraphQLParser.FLOAT_VALUE - 49)) |
                    (1 << (GraphQLParser.STRING_VALUE - 49)) |
                    (1 << (GraphQLParser.BOOLEAN_VALUE - 49)) |
                    (1 << (GraphQLParser.NULL_VALUE - 49)))) !==
                  0)
            );
            this.state = 240;
            this.match(GraphQLParser.T__12);
          }
          break;

        case 10:
          _localctx = new EmptyObjectValueContext(_localctx);
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 242;
            this.match(GraphQLParser.T__3);
            this.state = 243;
            this.match(GraphQLParser.T__4);
          }
          break;

        case 11:
          _localctx = new NonEmptyObjectValueContext(_localctx);
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 244;
            this.match(GraphQLParser.T__3);
            this.state = 246;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 245;
                  this.objectField();
                }
              }
              this.state = 248;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === GraphQLParser.NAME);
            this.state = 250;
            this.match(GraphQLParser.T__4);
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
  public objectField(): ObjectFieldContext {
    let _localctx: ObjectFieldContext = new ObjectFieldContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 34, GraphQLParser.RULE_objectField);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 254;
        this.match(GraphQLParser.NAME);
        this.state = 255;
        this.match(GraphQLParser.T__5);
        this.state = 256;
        this.value();
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
  public variableDefinitions(): VariableDefinitionsContext {
    let _localctx: VariableDefinitionsContext = new VariableDefinitionsContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 36, GraphQLParser.RULE_variableDefinitions);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 258;
        this.match(GraphQLParser.T__6);
        this.state = 260;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 259;
              this.variableDefinition();
            }
          }
          this.state = 262;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === GraphQLParser.T__13);
        this.state = 264;
        this.match(GraphQLParser.T__7);
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
  public variableDefinition(): VariableDefinitionContext {
    let _localctx: VariableDefinitionContext = new VariableDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 38, GraphQLParser.RULE_variableDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 266;
        this.variable();
        this.state = 267;
        this.match(GraphQLParser.T__5);
        this.state = 268;
        this.type();
        this.state = 270;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__14) {
          {
            this.state = 269;
            this.defaultValue();
          }
        }

        this.state = 273;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 272;
            this.directives();
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
  public variable(): VariableContext {
    let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
    this.enterRule(_localctx, 40, GraphQLParser.RULE_variable);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 275;
        this.match(GraphQLParser.T__13);
        this.state = 276;
        this.match(GraphQLParser.NAME);
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
  public defaultValue(): DefaultValueContext {
    let _localctx: DefaultValueContext = new DefaultValueContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 42, GraphQLParser.RULE_defaultValue);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 278;
        this.match(GraphQLParser.T__14);
        this.state = 279;
        this.value();
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
  public type(): TypeContext {
    let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, GraphQLParser.RULE_type);
    let _la: number;
    try {
      this.state = 289;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GraphQLParser.NAME:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 281;
            this.namedType();
            this.state = 283;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__15) {
              {
                this.state = 282;
                this.nonNullType();
              }
            }
          }
          break;
        case GraphQLParser.T__11:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 285;
            this.listType();
            this.state = 287;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__15) {
              {
                this.state = 286;
                this.nonNullType();
              }
            }
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
  public namedType(): NamedTypeContext {
    let _localctx: NamedTypeContext = new NamedTypeContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 46, GraphQLParser.RULE_namedType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 291;
        this.match(GraphQLParser.NAME);
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
  public listType(): ListTypeContext {
    let _localctx: ListTypeContext = new ListTypeContext(this._ctx, this.state);
    this.enterRule(_localctx, 48, GraphQLParser.RULE_listType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 293;
        this.match(GraphQLParser.T__11);
        this.state = 294;
        this.type();
        this.state = 295;
        this.match(GraphQLParser.T__12);
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
  public nonNullType(): NonNullTypeContext {
    let _localctx: NonNullTypeContext = new NonNullTypeContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 50, GraphQLParser.RULE_nonNullType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 297;
        this.match(GraphQLParser.T__15);
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
  public directives(): DirectivesContext {
    let _localctx: DirectivesContext = new DirectivesContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 52, GraphQLParser.RULE_directives);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 300;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 299;
              this.directive();
            }
          }
          this.state = 302;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === GraphQLParser.T__16);
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
  public directive(): DirectiveContext {
    let _localctx: DirectiveContext = new DirectiveContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 54, GraphQLParser.RULE_directive);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 304;
        this.match(GraphQLParser.T__16);
        this.state = 305;
        this.match(GraphQLParser.NAME);
        this.state = 307;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__6) {
          {
            this.state = 306;
            this.arguments();
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
  public typeSystemDefinition(): TypeSystemDefinitionContext {
    let _localctx: TypeSystemDefinitionContext = new TypeSystemDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 56, GraphQLParser.RULE_typeSystemDefinition);
    try {
      this.state = 312;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 29, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 309;
            this.schemaDefinition();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 310;
            this.typeDefinition();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 311;
            this.directiveDefinition();
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
  public typeSystemExtension(): TypeSystemExtensionContext {
    let _localctx: TypeSystemExtensionContext = new TypeSystemExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 58, GraphQLParser.RULE_typeSystemExtension);
    try {
      this.state = 316;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 30, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 314;
            this.schemaExtension();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 315;
            this.typeExtension();
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
  public schemaDefinition(): SchemaDefinitionContext {
    let _localctx: SchemaDefinitionContext = new SchemaDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 60, GraphQLParser.RULE_schemaDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 318;
        this.match(GraphQLParser.T__17);
        this.state = 320;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 319;
            this.directives();
          }
        }

        this.state = 322;
        this.match(GraphQLParser.T__3);
        this.state = 324;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 323;
              this.operationTypeDefinition();
            }
          }
          this.state = 326;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << GraphQLParser.T__0) |
              (1 << GraphQLParser.T__1) |
              (1 << GraphQLParser.T__2))) !==
            0
        );
        this.state = 328;
        this.match(GraphQLParser.T__4);
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
  public schemaExtension(): SchemaExtensionContext {
    let _localctx: SchemaExtensionContext = new SchemaExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 62, GraphQLParser.RULE_schemaExtension);
    let _la: number;
    try {
      this.state = 346;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 35, this._ctx)) {
        case 1:
          _localctx = new SchemaExtensionWithOperationsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 330;
            this.match(GraphQLParser.T__18);
            this.state = 331;
            this.match(GraphQLParser.T__17);
            this.state = 333;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 332;
                this.directives();
              }
            }

            this.state = 335;
            this.match(GraphQLParser.T__3);
            this.state = 337;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 336;
                  this.operationTypeDefinition();
                }
              }
              this.state = 339;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (
              (_la & ~0x1f) === 0 &&
              ((1 << _la) &
                ((1 << GraphQLParser.T__0) |
                  (1 << GraphQLParser.T__1) |
                  (1 << GraphQLParser.T__2))) !==
                0
            );
            this.state = 341;
            this.match(GraphQLParser.T__4);
          }
          break;

        case 2:
          _localctx = new SchemaExtensionWithoutOperationsContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 343;
            this.match(GraphQLParser.T__18);
            this.state = 344;
            this.match(GraphQLParser.T__17);
            this.state = 345;
            this.directives();
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
  public operationTypeDefinition(): OperationTypeDefinitionContext {
    let _localctx: OperationTypeDefinitionContext = new OperationTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 64, GraphQLParser.RULE_operationTypeDefinition);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 348;
        this.operationType();
        this.state = 349;
        this.match(GraphQLParser.T__5);
        this.state = 350;
        this.namedType();
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
  public description(): DescriptionContext {
    let _localctx: DescriptionContext = new DescriptionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 66, GraphQLParser.RULE_description);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 352;
        this.match(GraphQLParser.STRING_VALUE);
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
  public typeDefinition(): TypeDefinitionContext {
    let _localctx: TypeDefinitionContext = new TypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 68, GraphQLParser.RULE_typeDefinition);
    try {
      this.state = 360;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 36, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 354;
            this.scalarTypeDefinition();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 355;
            this.objectTypeDefinition();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 356;
            this.interfaceTypeDefinition();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 357;
            this.unionTypeDefinition();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 358;
            this.enumTypeDefinition();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 359;
            this.inputObjectTypeDefinition();
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
  public typeExtension(): TypeExtensionContext {
    let _localctx: TypeExtensionContext = new TypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 70, GraphQLParser.RULE_typeExtension);
    try {
      this.state = 368;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 37, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 362;
            this.scalarTypeExtension();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 363;
            this.objectTypeExtension();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 364;
            this.interfaceTypeExtension();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 365;
            this.unionTypeExtension();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 366;
            this.enumTypeExtension();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 367;
            this.inputObjectTypeExtension();
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
  public scalarTypeDefinition(): ScalarTypeDefinitionContext {
    let _localctx: ScalarTypeDefinitionContext = new ScalarTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 72, GraphQLParser.RULE_scalarTypeDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 371;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 370;
            this.description();
          }
        }

        this.state = 373;
        this.match(GraphQLParser.T__19);
        this.state = 374;
        this.match(GraphQLParser.NAME);
        this.state = 376;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 375;
            this.directives();
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
  public scalarTypeExtension(): ScalarTypeExtensionContext {
    let _localctx: ScalarTypeExtensionContext = new ScalarTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 74, GraphQLParser.RULE_scalarTypeExtension);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 378;
        this.match(GraphQLParser.T__18);
        this.state = 379;
        this.match(GraphQLParser.T__19);
        this.state = 380;
        this.match(GraphQLParser.NAME);
        this.state = 381;
        this.directives();
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
  public objectTypeDefinition(): ObjectTypeDefinitionContext {
    let _localctx: ObjectTypeDefinitionContext = new ObjectTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 76, GraphQLParser.RULE_objectTypeDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 384;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 383;
            this.description();
          }
        }

        this.state = 386;
        this.match(GraphQLParser.T__20);
        this.state = 387;
        this.match(GraphQLParser.NAME);
        this.state = 389;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__21) {
          {
            this.state = 388;
            this.implementsInterfaces();
          }
        }

        this.state = 392;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 391;
            this.directives();
          }
        }

        this.state = 395;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 43, this._ctx)) {
          case 1:
            {
              this.state = 394;
              this.fieldsDefinition();
            }
            break;
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
  public objectTypeExtension(): ObjectTypeExtensionContext {
    let _localctx: ObjectTypeExtensionContext = new ObjectTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 78, GraphQLParser.RULE_objectTypeExtension);
    let _la: number;
    try {
      this.state = 418;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 47, this._ctx)) {
        case 1:
          _localctx = new ObjectTypeExtensionWithFieldsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 397;
            this.match(GraphQLParser.T__18);
            this.state = 398;
            this.match(GraphQLParser.T__20);
            this.state = 399;
            this.match(GraphQLParser.NAME);
            this.state = 401;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__21) {
              {
                this.state = 400;
                this.implementsInterfaces();
              }
            }

            this.state = 404;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 403;
                this.directives();
              }
            }

            this.state = 406;
            this.fieldsDefinition();
          }
          break;

        case 2:
          _localctx = new ObjectTypeExtensionWithDirectivesContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 407;
            this.match(GraphQLParser.T__18);
            this.state = 408;
            this.match(GraphQLParser.T__20);
            this.state = 409;
            this.match(GraphQLParser.NAME);
            this.state = 411;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__21) {
              {
                this.state = 410;
                this.implementsInterfaces();
              }
            }

            this.state = 413;
            this.directives();
          }
          break;

        case 3:
          _localctx = new ObjectTypeExtensionWithInterfacesContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 414;
            this.match(GraphQLParser.T__18);
            this.state = 415;
            this.match(GraphQLParser.T__20);
            this.state = 416;
            this.match(GraphQLParser.NAME);
            this.state = 417;
            this.implementsInterfaces();
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
  public implementsInterfaces(): ImplementsInterfacesContext {
    let _localctx: ImplementsInterfacesContext = new ImplementsInterfacesContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 80, GraphQLParser.RULE_implementsInterfaces);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 420;
        this.match(GraphQLParser.T__21);
        this.state = 422;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__22) {
          {
            this.state = 421;
            this.match(GraphQLParser.T__22);
          }
        }

        this.state = 424;
        this.namedType();
        this.state = 431;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GraphQLParser.T__22 || _la === GraphQLParser.NAME) {
          {
            {
              this.state = 426;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === GraphQLParser.T__22) {
                {
                  this.state = 425;
                  this.match(GraphQLParser.T__22);
                }
              }

              this.state = 428;
              this.namedType();
            }
          }
          this.state = 433;
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
  public fieldsDefinition(): FieldsDefinitionContext {
    let _localctx: FieldsDefinitionContext = new FieldsDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 82, GraphQLParser.RULE_fieldsDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 434;
        this.match(GraphQLParser.T__3);
        this.state = 436;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 435;
              this.fieldDefinition();
            }
          }
          this.state = 438;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          _la === GraphQLParser.NAME ||
          _la === GraphQLParser.STRING_VALUE
        );
        this.state = 440;
        this.match(GraphQLParser.T__4);
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
  public fieldDefinition(): FieldDefinitionContext {
    let _localctx: FieldDefinitionContext = new FieldDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 84, GraphQLParser.RULE_fieldDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 443;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 442;
            this.description();
          }
        }

        this.state = 445;
        this.match(GraphQLParser.NAME);
        this.state = 447;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__6) {
          {
            this.state = 446;
            this.argumentsDefinition();
          }
        }

        this.state = 449;
        this.match(GraphQLParser.T__5);
        this.state = 450;
        this.type();
        this.state = 452;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 451;
            this.directives();
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
  public argumentsDefinition(): ArgumentsDefinitionContext {
    let _localctx: ArgumentsDefinitionContext = new ArgumentsDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 86, GraphQLParser.RULE_argumentsDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 454;
        this.match(GraphQLParser.T__6);
        this.state = 456;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 455;
              this.inputValueDefinition();
            }
          }
          this.state = 458;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          _la === GraphQLParser.NAME ||
          _la === GraphQLParser.STRING_VALUE
        );
        this.state = 460;
        this.match(GraphQLParser.T__7);
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
  public inputValueDefinition(): InputValueDefinitionContext {
    let _localctx: InputValueDefinitionContext = new InputValueDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 88, GraphQLParser.RULE_inputValueDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 463;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 462;
            this.description();
          }
        }

        this.state = 465;
        this.match(GraphQLParser.NAME);
        this.state = 466;
        this.match(GraphQLParser.T__5);
        this.state = 467;
        this.type();
        this.state = 469;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__14) {
          {
            this.state = 468;
            this.defaultValue();
          }
        }

        this.state = 472;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 471;
            this.directives();
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
  public interfaceTypeDefinition(): InterfaceTypeDefinitionContext {
    let _localctx: InterfaceTypeDefinitionContext = new InterfaceTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 90, GraphQLParser.RULE_interfaceTypeDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 475;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 474;
            this.description();
          }
        }

        this.state = 477;
        this.match(GraphQLParser.T__23);
        this.state = 478;
        this.match(GraphQLParser.NAME);
        this.state = 480;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 479;
            this.directives();
          }
        }

        this.state = 483;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 61, this._ctx)) {
          case 1:
            {
              this.state = 482;
              this.fieldsDefinition();
            }
            break;
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
  public interfaceTypeExtension(): InterfaceTypeExtensionContext {
    let _localctx: InterfaceTypeExtensionContext = new InterfaceTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 92, GraphQLParser.RULE_interfaceTypeExtension);
    let _la: number;
    try {
      this.state = 496;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 63, this._ctx)) {
        case 1:
          _localctx = new InterfaceTypeExtensionWithFieldsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 485;
            this.match(GraphQLParser.T__18);
            this.state = 486;
            this.match(GraphQLParser.T__23);
            this.state = 487;
            this.match(GraphQLParser.NAME);
            this.state = 489;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 488;
                this.directives();
              }
            }

            this.state = 491;
            this.fieldsDefinition();
          }
          break;

        case 2:
          _localctx = new InterfaceTypeExtensionWithDirectivesContext(
            _localctx
          );
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 492;
            this.match(GraphQLParser.T__18);
            this.state = 493;
            this.match(GraphQLParser.T__23);
            this.state = 494;
            this.match(GraphQLParser.NAME);
            this.state = 495;
            this.directives();
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
  public unionTypeDefinition(): UnionTypeDefinitionContext {
    let _localctx: UnionTypeDefinitionContext = new UnionTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 94, GraphQLParser.RULE_unionTypeDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 499;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 498;
            this.description();
          }
        }

        this.state = 501;
        this.match(GraphQLParser.T__24);
        this.state = 502;
        this.match(GraphQLParser.NAME);
        this.state = 504;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 503;
            this.directives();
          }
        }

        this.state = 507;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__14) {
          {
            this.state = 506;
            this.unionMemberTypes();
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
  public unionMemberTypes(): UnionMemberTypesContext {
    let _localctx: UnionMemberTypesContext = new UnionMemberTypesContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 96, GraphQLParser.RULE_unionMemberTypes);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 509;
        this.match(GraphQLParser.T__14);
        this.state = 511;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__25) {
          {
            this.state = 510;
            this.match(GraphQLParser.T__25);
          }
        }

        this.state = 513;
        this.namedType();
        this.state = 520;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GraphQLParser.T__25 || _la === GraphQLParser.NAME) {
          {
            {
              this.state = 515;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === GraphQLParser.T__25) {
                {
                  this.state = 514;
                  this.match(GraphQLParser.T__25);
                }
              }

              this.state = 517;
              this.namedType();
            }
          }
          this.state = 522;
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
  public unionTypeExtension(): UnionTypeExtensionContext {
    let _localctx: UnionTypeExtensionContext = new UnionTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 98, GraphQLParser.RULE_unionTypeExtension);
    let _la: number;
    try {
      this.state = 534;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 71, this._ctx)) {
        case 1:
          _localctx = new UnionTypeExtensionWithMembersContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 523;
            this.match(GraphQLParser.T__18);
            this.state = 524;
            this.match(GraphQLParser.T__24);
            this.state = 525;
            this.match(GraphQLParser.NAME);
            this.state = 527;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 526;
                this.directives();
              }
            }

            this.state = 529;
            this.unionMemberTypes();
          }
          break;

        case 2:
          _localctx = new UnionTypeExtensionWithDirectivesContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 530;
            this.match(GraphQLParser.T__18);
            this.state = 531;
            this.match(GraphQLParser.T__24);
            this.state = 532;
            this.match(GraphQLParser.NAME);
            this.state = 533;
            this.directives();
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
  public enumTypeDefinition(): EnumTypeDefinitionContext {
    let _localctx: EnumTypeDefinitionContext = new EnumTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 100, GraphQLParser.RULE_enumTypeDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 537;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 536;
            this.description();
          }
        }

        this.state = 539;
        this.match(GraphQLParser.T__26);
        this.state = 540;
        this.match(GraphQLParser.NAME);
        this.state = 542;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 541;
            this.directives();
          }
        }

        this.state = 545;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 74, this._ctx)) {
          case 1:
            {
              this.state = 544;
              this.enumValuesDefinition();
            }
            break;
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
  public enumValuesDefinition(): EnumValuesDefinitionContext {
    let _localctx: EnumValuesDefinitionContext = new EnumValuesDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 102, GraphQLParser.RULE_enumValuesDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 547;
        this.match(GraphQLParser.T__3);
        this.state = 549;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 548;
              this.enumValueDefinition();
            }
          }
          this.state = 551;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          _la === GraphQLParser.NAME ||
          _la === GraphQLParser.STRING_VALUE
        );
        this.state = 553;
        this.match(GraphQLParser.T__4);
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
  public enumValueDefinition(): EnumValueDefinitionContext {
    let _localctx: EnumValueDefinitionContext = new EnumValueDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 104, GraphQLParser.RULE_enumValueDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 556;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 555;
            this.description();
          }
        }

        this.state = 558;
        this.match(GraphQLParser.NAME);
        this.state = 560;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 559;
            this.directives();
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
  public enumTypeExtension(): EnumTypeExtensionContext {
    let _localctx: EnumTypeExtensionContext = new EnumTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 106, GraphQLParser.RULE_enumTypeExtension);
    let _la: number;
    try {
      this.state = 573;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 79, this._ctx)) {
        case 1:
          _localctx = new EnumTypeExtensionWithValuesContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 562;
            this.match(GraphQLParser.T__18);
            this.state = 563;
            this.match(GraphQLParser.T__26);
            this.state = 564;
            this.match(GraphQLParser.NAME);
            this.state = 566;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 565;
                this.directives();
              }
            }

            this.state = 568;
            this.enumValuesDefinition();
          }
          break;

        case 2:
          _localctx = new EnumTypeExtensionWithDirectivesContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 569;
            this.match(GraphQLParser.T__18);
            this.state = 570;
            this.match(GraphQLParser.T__26);
            this.state = 571;
            this.match(GraphQLParser.NAME);
            this.state = 572;
            this.directives();
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
  public inputObjectTypeDefinition(): InputObjectTypeDefinitionContext {
    let _localctx: InputObjectTypeDefinitionContext = new InputObjectTypeDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      108,
      GraphQLParser.RULE_inputObjectTypeDefinition
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 576;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 575;
            this.description();
          }
        }

        this.state = 578;
        this.match(GraphQLParser.T__27);
        this.state = 579;
        this.match(GraphQLParser.NAME);
        this.state = 581;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__16) {
          {
            this.state = 580;
            this.directives();
          }
        }

        this.state = 584;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 82, this._ctx)) {
          case 1:
            {
              this.state = 583;
              this.inputFieldsDefinition();
            }
            break;
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
  public inputFieldsDefinition(): InputFieldsDefinitionContext {
    let _localctx: InputFieldsDefinitionContext = new InputFieldsDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 110, GraphQLParser.RULE_inputFieldsDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 586;
        this.match(GraphQLParser.T__3);
        this.state = 588;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 587;
              this.inputValueDefinition();
            }
          }
          this.state = 590;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          _la === GraphQLParser.NAME ||
          _la === GraphQLParser.STRING_VALUE
        );
        this.state = 592;
        this.match(GraphQLParser.T__4);
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
  public inputObjectTypeExtension(): InputObjectTypeExtensionContext {
    let _localctx: InputObjectTypeExtensionContext = new InputObjectTypeExtensionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 112, GraphQLParser.RULE_inputObjectTypeExtension);
    let _la: number;
    try {
      this.state = 605;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 85, this._ctx)) {
        case 1:
          _localctx = new InputObjectTypeExtensionWithFieldsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 594;
            this.match(GraphQLParser.T__18);
            this.state = 595;
            this.match(GraphQLParser.T__27);
            this.state = 596;
            this.match(GraphQLParser.NAME);
            this.state = 598;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GraphQLParser.T__16) {
              {
                this.state = 597;
                this.directives();
              }
            }

            this.state = 600;
            this.inputFieldsDefinition();
          }
          break;

        case 2:
          _localctx = new InputObjectTypeExtensionWithDirectivesContext(
            _localctx
          );
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 601;
            this.match(GraphQLParser.T__18);
            this.state = 602;
            this.match(GraphQLParser.T__27);
            this.state = 603;
            this.match(GraphQLParser.NAME);
            this.state = 604;
            this.directives();
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
  public directiveDefinition(): DirectiveDefinitionContext {
    let _localctx: DirectiveDefinitionContext = new DirectiveDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 114, GraphQLParser.RULE_directiveDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 608;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.STRING_VALUE) {
          {
            this.state = 607;
            this.description();
          }
        }

        this.state = 610;
        this.match(GraphQLParser.T__28);
        this.state = 611;
        this.match(GraphQLParser.T__16);
        this.state = 612;
        this.match(GraphQLParser.NAME);
        this.state = 614;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__6) {
          {
            this.state = 613;
            this.argumentsDefinition();
          }
        }

        this.state = 616;
        this.directiveLocations();
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
  public directiveLocations(): DirectiveLocationsContext {
    let _localctx: DirectiveLocationsContext = new DirectiveLocationsContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 116, GraphQLParser.RULE_directiveLocations);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 618;
        this.match(GraphQLParser.T__10);
        this.state = 620;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GraphQLParser.T__25) {
          {
            this.state = 619;
            this.match(GraphQLParser.T__25);
          }
        }

        this.state = 622;
        this.directiveLocation();
        this.state = 629;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la - 26) & ~0x1f) === 0 &&
          ((1 << (_la - 26)) &
            ((1 << (GraphQLParser.T__25 - 26)) |
              (1 << (GraphQLParser.T__29 - 26)) |
              (1 << (GraphQLParser.T__30 - 26)) |
              (1 << (GraphQLParser.T__31 - 26)) |
              (1 << (GraphQLParser.T__32 - 26)) |
              (1 << (GraphQLParser.T__33 - 26)) |
              (1 << (GraphQLParser.T__34 - 26)) |
              (1 << (GraphQLParser.T__35 - 26)) |
              (1 << (GraphQLParser.T__36 - 26)) |
              (1 << (GraphQLParser.T__37 - 26)) |
              (1 << (GraphQLParser.T__38 - 26)) |
              (1 << (GraphQLParser.T__39 - 26)) |
              (1 << (GraphQLParser.T__40 - 26)) |
              (1 << (GraphQLParser.T__41 - 26)) |
              (1 << (GraphQLParser.T__42 - 26)) |
              (1 << (GraphQLParser.T__43 - 26)) |
              (1 << (GraphQLParser.T__44 - 26)) |
              (1 << (GraphQLParser.T__45 - 26)) |
              (1 << (GraphQLParser.T__46 - 26)) |
              (1 << (GraphQLParser.T__47 - 26)))) !==
            0
        ) {
          {
            {
              this.state = 624;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === GraphQLParser.T__25) {
                {
                  this.state = 623;
                  this.match(GraphQLParser.T__25);
                }
              }

              this.state = 626;
              this.directiveLocation();
            }
          }
          this.state = 631;
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
  public directiveLocation(): DirectiveLocationContext {
    let _localctx: DirectiveLocationContext = new DirectiveLocationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 118, GraphQLParser.RULE_directiveLocation);
    try {
      this.state = 634;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GraphQLParser.T__29:
        case GraphQLParser.T__30:
        case GraphQLParser.T__31:
        case GraphQLParser.T__32:
        case GraphQLParser.T__33:
        case GraphQLParser.T__34:
        case GraphQLParser.T__35:
        case GraphQLParser.T__36:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 632;
            this.executableDirectiveLocation();
          }
          break;
        case GraphQLParser.T__37:
        case GraphQLParser.T__38:
        case GraphQLParser.T__39:
        case GraphQLParser.T__40:
        case GraphQLParser.T__41:
        case GraphQLParser.T__42:
        case GraphQLParser.T__43:
        case GraphQLParser.T__44:
        case GraphQLParser.T__45:
        case GraphQLParser.T__46:
        case GraphQLParser.T__47:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 633;
            this.typeSystemDirectiveLocation();
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
  public executableDirectiveLocation(): ExecutableDirectiveLocationContext {
    let _localctx: ExecutableDirectiveLocationContext = new ExecutableDirectiveLocationContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      120,
      GraphQLParser.RULE_executableDirectiveLocation
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 636;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 30) & ~0x1f) === 0 &&
            ((1 << (_la - 30)) &
              ((1 << (GraphQLParser.T__29 - 30)) |
                (1 << (GraphQLParser.T__30 - 30)) |
                (1 << (GraphQLParser.T__31 - 30)) |
                (1 << (GraphQLParser.T__32 - 30)) |
                (1 << (GraphQLParser.T__33 - 30)) |
                (1 << (GraphQLParser.T__34 - 30)) |
                (1 << (GraphQLParser.T__35 - 30)) |
                (1 << (GraphQLParser.T__36 - 30)))) !==
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
  public typeSystemDirectiveLocation(): TypeSystemDirectiveLocationContext {
    let _localctx: TypeSystemDirectiveLocationContext = new TypeSystemDirectiveLocationContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      122,
      GraphQLParser.RULE_typeSystemDirectiveLocation
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 638;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 38) & ~0x1f) === 0 &&
            ((1 << (_la - 38)) &
              ((1 << (GraphQLParser.T__37 - 38)) |
                (1 << (GraphQLParser.T__38 - 38)) |
                (1 << (GraphQLParser.T__39 - 38)) |
                (1 << (GraphQLParser.T__40 - 38)) |
                (1 << (GraphQLParser.T__41 - 38)) |
                (1 << (GraphQLParser.T__42 - 38)) |
                (1 << (GraphQLParser.T__43 - 38)) |
                (1 << (GraphQLParser.T__44 - 38)) |
                (1 << (GraphQLParser.T__45 - 38)) |
                (1 << (GraphQLParser.T__46 - 38)) |
                (1 << (GraphQLParser.T__47 - 38)))) !==
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

  private static readonly _serializedATNSegments: number = 2;
  private static readonly _serializedATNSegment0: string =
    '\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03:\u0283\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044' +
    '\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04' +
    '=\t=\x04>\t>\x04?\t?\x03\x02\x06\x02\x80\n\x02\r\x02\x0E\x02\x81\x03\x02' +
    '\x03\x02\x03\x03\x03\x03\x03\x03\x05\x03\x89\n\x03\x03\x04\x03\x04\x05' +
    '\x04\x8D\n\x04\x03\x05\x03\x05\x03\x05\x05\x05\x92\n\x05\x03\x05\x05\x05' +
    '\x95\n\x05\x03\x05\x05\x05\x98\n\x05\x03\x05\x03\x05\x05\x05\x9C\n\x05' +
    '\x03\x06\x03\x06\x03\x07\x03\x07\x06\x07\xA2\n\x07\r\x07\x0E\x07\xA3\x03' +
    '\x07\x03\x07\x03\b\x03\b\x03\b\x05\b\xAB\n\b\x03\t\x05\t\xAE\n\t\x03\t' +
    '\x03\t\x05\t\xB2\n\t\x03\t\x05\t\xB5\n\t\x03\t\x05\t\xB8\n\t\x03\n\x03' +
    '\n\x03\n\x03\v\x03\v\x06\v\xBF\n\v\r\v\x0E\v\xC0\x03\v\x03\v\x03\f\x03' +
    '\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\xCC\n\r\x03\x0E\x03\x0E\x05\x0E' +
    '\xD0\n\x0E\x03\x0E\x05\x0E\xD3\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03' +
    '\x0F\x03\x0F\x05\x0F\xDB\n\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11' +
    '\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12' +
    '\x03\x12\x03\x12\x03\x12\x03\x12\x06\x12\xEF\n\x12\r\x12\x0E\x12\xF0\x03' +
    '\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x06\x12\xF9\n\x12\r\x12\x0E' +
    '\x12\xFA\x03\x12\x03\x12\x05\x12\xFF\n\x12\x03\x13\x03\x13\x03\x13\x03' +
    '\x13\x03\x14\x03\x14\x06\x14\u0107\n\x14\r\x14\x0E\x14\u0108\x03\x14\x03' +
    '\x14\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u0111\n\x15\x03\x15\x05\x15' +
    '\u0114\n\x15\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x18\x03' +
    '\x18\x05\x18\u011E\n\x18\x03\x18\x03\x18\x05\x18\u0122\n\x18\x05\x18\u0124' +
    '\n\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B' +
    '\x03\x1C\x06\x1C\u012F\n\x1C\r\x1C\x0E\x1C\u0130\x03\x1D\x03\x1D\x03\x1D' +
    '\x05\x1D\u0136\n\x1D\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u013B\n\x1E\x03\x1F' +
    '\x03\x1F\x05\x1F\u013F\n\x1F\x03 \x03 \x05 \u0143\n \x03 \x03 \x06 \u0147' +
    '\n \r \x0E \u0148\x03 \x03 \x03!\x03!\x03!\x05!\u0150\n!\x03!\x03!\x06' +
    '!\u0154\n!\r!\x0E!\u0155\x03!\x03!\x03!\x03!\x03!\x05!\u015D\n!\x03"' +
    '\x03"\x03"\x03"\x03#\x03#\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u016B' +
    '\n$\x03%\x03%\x03%\x03%\x03%\x03%\x05%\u0173\n%\x03&\x05&\u0176\n&\x03' +
    "&\x03&\x03&\x05&\u017B\n&\x03'\x03'\x03'\x03'\x03'\x03(\x05(\u0183" +
    '\n(\x03(\x03(\x03(\x05(\u0188\n(\x03(\x05(\u018B\n(\x03(\x05(\u018E\n' +
    '(\x03)\x03)\x03)\x03)\x05)\u0194\n)\x03)\x05)\u0197\n)\x03)\x03)\x03)' +
    '\x03)\x03)\x05)\u019E\n)\x03)\x03)\x03)\x03)\x03)\x05)\u01A5\n)\x03*\x03' +
    '*\x05*\u01A9\n*\x03*\x03*\x05*\u01AD\n*\x03*\x07*\u01B0\n*\f*\x0E*\u01B3' +
    '\v*\x03+\x03+\x06+\u01B7\n+\r+\x0E+\u01B8\x03+\x03+\x03,\x05,\u01BE\n' +
    ',\x03,\x03,\x05,\u01C2\n,\x03,\x03,\x03,\x05,\u01C7\n,\x03-\x03-\x06-' +
    '\u01CB\n-\r-\x0E-\u01CC\x03-\x03-\x03.\x05.\u01D2\n.\x03.\x03.\x03.\x03' +
    '.\x05.\u01D8\n.\x03.\x05.\u01DB\n.\x03/\x05/\u01DE\n/\x03/\x03/\x03/\x05' +
    '/\u01E3\n/\x03/\x05/\u01E6\n/\x030\x030\x030\x030\x050\u01EC\n0\x030\x03' +
    '0\x030\x030\x030\x050\u01F3\n0\x031\x051\u01F6\n1\x031\x031\x031\x051' +
    '\u01FB\n1\x031\x051\u01FE\n1\x032\x032\x052\u0202\n2\x032\x032\x052\u0206' +
    '\n2\x032\x072\u0209\n2\f2\x0E2\u020C\v2\x033\x033\x033\x033\x053\u0212' +
    '\n3\x033\x033\x033\x033\x033\x053\u0219\n3\x034\x054\u021C\n4\x034\x03' +
    '4\x034\x054\u0221\n4\x034\x054\u0224\n4\x035\x035\x065\u0228\n5\r5\x0E' +
    '5\u0229\x035\x035\x036\x056\u022F\n6\x036\x036\x056\u0233\n6\x037\x03' +
    '7\x037\x037\x057\u0239\n7\x037\x037\x037\x037\x037\x057\u0240\n7\x038' +
    '\x058\u0243\n8\x038\x038\x038\x058\u0248\n8\x038\x058\u024B\n8\x039\x03' +
    '9\x069\u024F\n9\r9\x0E9\u0250\x039\x039\x03:\x03:\x03:\x03:\x05:\u0259' +
    '\n:\x03:\x03:\x03:\x03:\x03:\x05:\u0260\n:\x03;\x05;\u0263\n;\x03;\x03' +
    ';\x03;\x03;\x05;\u0269\n;\x03;\x03;\x03<\x03<\x05<\u026F\n<\x03<\x03<' +
    '\x05<\u0273\n<\x03<\x07<\u0276\n<\f<\x0E<\u0279\v<\x03=\x03=\x05=\u027D' +
    '\n=\x03>\x03>\x03?\x03?\x03?\x02\x02\x02@\x02\x02\x04\x02\x06\x02\b\x02' +
    '\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C' +
    '\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026' +
    '\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02' +
    'R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02' +
    'n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02\x02\x05\x03\x02\x03\x05\x03\x02' +
    " '\x03\x02(2\u02B5\x02\x7F\x03\x02\x02\x02\x04\x88\x03\x02\x02\x02\x06" +
    '\x8C\x03\x02\x02\x02\b\x9B\x03\x02\x02\x02\n\x9D\x03\x02\x02\x02\f\x9F' +
    '\x03\x02\x02\x02\x0E\xAA\x03\x02\x02\x02\x10\xAD\x03\x02\x02\x02\x12\xB9' +
    '\x03\x02\x02\x02\x14\xBC\x03\x02\x02\x02\x16\xC4\x03\x02\x02\x02\x18\xC8' +
    '\x03\x02\x02\x02\x1A\xCD\x03\x02\x02\x02\x1C\xD6\x03\x02\x02\x02\x1E\xDE' +
    '\x03\x02\x02\x02 \xE0\x03\x02\x02\x02"\xFE\x03\x02\x02\x02$\u0100\x03' +
    '\x02\x02\x02&\u0104\x03\x02\x02\x02(\u010C\x03\x02\x02\x02*\u0115\x03' +
    '\x02\x02\x02,\u0118\x03\x02\x02\x02.\u0123\x03\x02\x02\x020\u0125\x03' +
    '\x02\x02\x022\u0127\x03\x02\x02\x024\u012B\x03\x02\x02\x026\u012E\x03' +
    '\x02\x02\x028\u0132\x03\x02\x02\x02:\u013A\x03\x02\x02\x02<\u013E\x03' +
    '\x02\x02\x02>\u0140\x03\x02\x02\x02@\u015C\x03\x02\x02\x02B\u015E\x03' +
    '\x02\x02\x02D\u0162\x03\x02\x02\x02F\u016A\x03\x02\x02\x02H\u0172\x03' +
    '\x02\x02\x02J\u0175\x03\x02\x02\x02L\u017C\x03\x02\x02\x02N\u0182\x03' +
    '\x02\x02\x02P\u01A4\x03\x02\x02\x02R\u01A6\x03\x02\x02\x02T\u01B4\x03' +
    '\x02\x02\x02V\u01BD\x03\x02\x02\x02X\u01C8\x03\x02\x02\x02Z\u01D1\x03' +
    '\x02\x02\x02\\\u01DD\x03\x02\x02\x02^\u01F2\x03\x02\x02\x02`\u01F5\x03' +
    '\x02\x02\x02b\u01FF\x03\x02\x02\x02d\u0218\x03\x02\x02\x02f\u021B\x03' +
    '\x02\x02\x02h\u0225\x03\x02\x02\x02j\u022E\x03\x02\x02\x02l\u023F\x03' +
    '\x02\x02\x02n\u0242\x03\x02\x02\x02p\u024C\x03\x02\x02\x02r\u025F\x03' +
    '\x02\x02\x02t\u0262\x03\x02\x02\x02v\u026C\x03\x02\x02\x02x\u027C\x03' +
    '\x02\x02\x02z\u027E\x03\x02\x02\x02|\u0280\x03\x02\x02\x02~\x80\x05\x04' +
    '\x03\x02\x7F~\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81\x7F\x03\x02' +
    '\x02\x02\x81\x82\x03\x02\x02\x02\x82\x83\x03\x02\x02\x02\x83\x84\x07\x02' +
    '\x02\x03\x84\x03\x03\x02\x02\x02\x85\x89\x05\x06\x04\x02\x86\x89\x05:' +
    '\x1E\x02\x87\x89\x05<\x1F\x02\x88\x85\x03\x02\x02\x02\x88\x86\x03\x02' +
    '\x02\x02\x88\x87\x03\x02\x02\x02\x89\x05\x03\x02\x02\x02\x8A\x8D\x05\b' +
    '\x05\x02\x8B\x8D\x05\x1C\x0F\x02\x8C\x8A\x03\x02\x02\x02\x8C\x8B\x03\x02' +
    '\x02\x02\x8D\x07\x03\x02\x02\x02\x8E\x9C\x05\f\x07\x02\x8F\x91\x05\n\x06' +
    '\x02\x90\x92\x073\x02\x02\x91\x90\x03\x02\x02\x02\x91\x92\x03\x02\x02' +
    '\x02\x92\x94\x03\x02\x02\x02\x93\x95\x05&\x14\x02\x94\x93\x03\x02\x02' +
    '\x02\x94\x95\x03\x02\x02\x02\x95\x97\x03\x02\x02\x02\x96\x98\x056\x1C' +
    '\x02\x97\x96\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x99\x03\x02\x02' +
    '\x02\x99\x9A\x05\f\x07\x02\x9A\x9C\x03\x02\x02\x02\x9B\x8E\x03\x02\x02' +
    '\x02\x9B\x8F\x03\x02\x02\x02\x9C\t\x03\x02\x02\x02\x9D\x9E\t\x02\x02\x02' +
    '\x9E\v\x03\x02\x02\x02\x9F\xA1\x07\x06\x02\x02\xA0\xA2\x05\x0E\b\x02\xA1' +
    '\xA0\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3' +
    '\xA4\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA6\x07\x07\x02\x02\xA6' +
    '\r\x03\x02\x02\x02\xA7\xAB\x05\x10\t\x02\xA8\xAB\x05\x18\r\x02\xA9\xAB' +
    '\x05\x1A\x0E\x02\xAA\xA7\x03\x02\x02\x02\xAA\xA8\x03\x02\x02\x02\xAA\xA9' +
    '\x03\x02\x02\x02\xAB\x0F\x03\x02\x02\x02\xAC\xAE\x05\x12\n\x02\xAD\xAC' +
    '\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB1' +
    '\x073\x02\x02\xB0\xB2\x05\x14\v\x02\xB1\xB0\x03\x02\x02\x02\xB1\xB2\x03' +
    '\x02\x02\x02\xB2\xB4\x03\x02\x02\x02\xB3\xB5\x056\x1C\x02\xB4\xB3\x03' +
    '\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB7\x03\x02\x02\x02\xB6\xB8\x05' +
    '\f\x07\x02\xB7\xB6\x03\x02\x02\x02\xB7\xB8\x03\x02\x02\x02\xB8\x11\x03' +
    '\x02\x02\x02\xB9\xBA\x073\x02\x02\xBA\xBB\x07\b\x02\x02\xBB\x13\x03\x02' +
    '\x02\x02\xBC\xBE\x07\t\x02\x02\xBD\xBF\x05\x16\f\x02\xBE\xBD\x03\x02\x02' +
    '\x02\xBF\xC0\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC0\xC1\x03\x02\x02' +
    '\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC3\x07\n\x02\x02\xC3\x15\x03\x02\x02' +
    '\x02\xC4\xC5\x073\x02\x02\xC5\xC6\x07\b\x02\x02\xC6\xC7\x05"\x12\x02' +
    '\xC7\x17\x03\x02\x02\x02\xC8\xC9\x07\v\x02\x02\xC9\xCB\x05\x1E\x10\x02' +
    '\xCA\xCC\x056\x1C\x02\xCB\xCA\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02' +
    '\xCC\x19\x03\x02\x02\x02\xCD\xCF\x07\v\x02\x02\xCE\xD0\x05 \x11\x02\xCF' +
    '\xCE\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02\xD0\xD2\x03\x02\x02\x02\xD1' +
    '\xD3\x056\x1C\x02\xD2\xD1\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02\xD3' +
    '\xD4\x03\x02\x02\x02\xD4\xD5\x05\f\x07\x02\xD5\x1B\x03\x02\x02\x02\xD6' +
    '\xD7\x07\f\x02\x02\xD7\xD8\x05\x1E\x10\x02\xD8\xDA\x05 \x11\x02\xD9\xDB' +
    '\x056\x1C\x02\xDA\xD9\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\xDC' +
    '\x03\x02\x02\x02\xDC\xDD\x05\f\x07\x02\xDD\x1D\x03\x02\x02\x02\xDE\xDF' +
    '\x073\x02\x02\xDF\x1F\x03\x02\x02\x02\xE0\xE1\x07\r\x02\x02\xE1\xE2\x05' +
    '0\x19\x02\xE2!\x03\x02\x02\x02\xE3\xFF\x05*\x16\x02\xE4\xFF\x074\x02\x02' +
    '\xE5\xFF\x075\x02\x02\xE6\xFF\x076\x02\x02\xE7\xFF\x077\x02\x02\xE8\xFF' +
    '\x078\x02\x02\xE9\xFF\x073\x02\x02\xEA\xEB\x07\x0E\x02\x02\xEB\xFF\x07' +
    '\x0F\x02\x02\xEC\xEE\x07\x0E\x02\x02\xED\xEF\x05"\x12\x02\xEE\xED\x03' +
    '\x02\x02\x02\xEF\xF0\x03\x02\x02\x02\xF0\xEE\x03\x02\x02\x02\xF0\xF1\x03' +
    '\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xF3\x07\x0F\x02\x02\xF3\xFF\x03' +
    '\x02\x02\x02\xF4\xF5\x07\x06\x02\x02\xF5\xFF\x07\x07\x02\x02\xF6\xF8\x07' +
    '\x06\x02\x02\xF7\xF9\x05$\x13\x02\xF8\xF7\x03\x02\x02\x02\xF9\xFA\x03' +
    '\x02\x02\x02\xFA\xF8\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB\xFC\x03' +
    '\x02\x02\x02\xFC\xFD\x07\x07\x02\x02\xFD\xFF\x03\x02\x02\x02\xFE\xE3\x03' +
    '\x02\x02\x02\xFE\xE4\x03\x02\x02\x02\xFE\xE5\x03\x02\x02\x02\xFE\xE6\x03' +
    '\x02\x02\x02\xFE\xE7\x03\x02\x02\x02\xFE\xE8\x03\x02\x02\x02\xFE\xE9\x03' +
    '\x02\x02\x02\xFE\xEA\x03\x02\x02\x02\xFE\xEC\x03\x02\x02\x02\xFE\xF4\x03' +
    '\x02\x02\x02\xFE\xF6\x03\x02\x02\x02\xFF#\x03\x02\x02\x02\u0100\u0101' +
    '\x073\x02\x02\u0101\u0102\x07\b\x02\x02\u0102\u0103\x05"\x12\x02\u0103' +
    '%\x03\x02\x02\x02\u0104\u0106\x07\t\x02\x02\u0105\u0107\x05(\x15\x02\u0106' +
    '\u0105\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108\u0106\x03\x02' +
    '\x02\x02\u0108\u0109\x03\x02\x02\x02\u0109\u010A\x03\x02\x02\x02\u010A' +
    "\u010B\x07\n\x02\x02\u010B'\x03\x02\x02\x02\u010C\u010D\x05*\x16\x02" +
    '\u010D\u010E\x07\b\x02\x02\u010E\u0110\x05.\x18\x02\u010F\u0111\x05,\x17' +
    '\x02\u0110\u010F\x03\x02\x02\x02\u0110\u0111\x03\x02\x02\x02\u0111\u0113' +
    '\x03\x02\x02\x02\u0112\u0114\x056\x1C\x02\u0113\u0112\x03\x02\x02\x02' +
    '\u0113\u0114\x03\x02\x02\x02\u0114)\x03\x02\x02\x02\u0115\u0116\x07\x10' +
    '\x02\x02\u0116\u0117\x073\x02\x02\u0117+\x03\x02\x02\x02\u0118\u0119\x07' +
    '\x11\x02\x02\u0119\u011A\x05"\x12\x02\u011A-\x03\x02\x02\x02\u011B\u011D' +
    '\x050\x19\x02\u011C\u011E\x054\x1B\x02\u011D\u011C\x03\x02\x02\x02\u011D' +
    '\u011E\x03\x02\x02\x02\u011E\u0124\x03\x02\x02\x02\u011F\u0121\x052\x1A' +
    '\x02\u0120\u0122\x054\x1B\x02\u0121\u0120\x03\x02\x02\x02\u0121\u0122' +
    '\x03\x02\x02\x02\u0122\u0124\x03\x02\x02\x02\u0123\u011B\x03\x02\x02\x02' +
    '\u0123\u011F\x03\x02\x02\x02\u0124/\x03\x02\x02\x02\u0125\u0126\x073\x02' +
    '\x02\u01261\x03\x02\x02\x02\u0127\u0128\x07\x0E\x02\x02\u0128\u0129\x05' +
    '.\x18\x02\u0129\u012A\x07\x0F\x02\x02\u012A3\x03\x02\x02\x02\u012B\u012C' +
    '\x07\x12\x02\x02\u012C5\x03\x02\x02\x02\u012D\u012F\x058\x1D\x02\u012E' +
    '\u012D\x03\x02\x02\x02\u012F\u0130\x03\x02\x02\x02\u0130\u012E\x03\x02' +
    '\x02\x02\u0130\u0131\x03\x02\x02\x02\u01317\x03\x02\x02\x02\u0132\u0133' +
    '\x07\x13\x02\x02\u0133\u0135\x073\x02\x02\u0134\u0136\x05\x14\v\x02\u0135' +
    '\u0134\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u01369\x03\x02\x02' +
    '\x02\u0137\u013B\x05> \x02\u0138\u013B\x05F$\x02\u0139\u013B\x05t;\x02' +
    '\u013A\u0137\x03\x02\x02\x02\u013A\u0138\x03\x02\x02\x02\u013A\u0139\x03' +
    '\x02\x02\x02\u013B;\x03\x02\x02\x02\u013C\u013F\x05@!\x02\u013D\u013F' +
    '\x05H%\x02\u013E\u013C\x03\x02\x02\x02\u013E\u013D\x03\x02\x02\x02\u013F' +
    '=\x03\x02\x02\x02\u0140\u0142\x07\x14\x02\x02\u0141\u0143\x056\x1C\x02' +
    '\u0142\u0141\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0144\x03' +
    '\x02\x02\x02\u0144\u0146\x07\x06\x02\x02\u0145\u0147\x05B"\x02\u0146' +
    '\u0145\x03\x02\x02\x02\u0147\u0148\x03\x02\x02\x02\u0148\u0146\x03\x02' +
    '\x02\x02\u0148\u0149\x03\x02\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A' +
    '\u014B\x07\x07\x02\x02\u014B?\x03\x02\x02\x02\u014C\u014D\x07\x15\x02' +
    '\x02\u014D\u014F\x07\x14\x02\x02\u014E\u0150\x056\x1C\x02\u014F\u014E' +
    '\x03\x02\x02\x02\u014F\u0150\x03\x02\x02\x02\u0150\u0151\x03\x02\x02\x02' +
    '\u0151\u0153\x07\x06\x02\x02\u0152\u0154\x05B"\x02\u0153\u0152\x03\x02' +
    '\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155\u0153\x03\x02\x02\x02\u0155' +
    '\u0156\x03\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0157\u0158\x07\x07' +
    '\x02\x02\u0158\u015D\x03\x02\x02\x02\u0159\u015A\x07\x15\x02\x02\u015A' +
    '\u015B\x07\x14\x02\x02\u015B\u015D\x056\x1C\x02\u015C\u014C\x03\x02\x02' +
    '\x02\u015C\u0159\x03\x02\x02\x02\u015DA\x03\x02\x02\x02\u015E\u015F\x05' +
    '\n\x06\x02\u015F\u0160\x07\b\x02\x02\u0160\u0161\x050\x19\x02\u0161C\x03' +
    '\x02\x02\x02\u0162\u0163\x076\x02\x02\u0163E\x03\x02\x02\x02\u0164\u016B' +
    '\x05J&\x02\u0165\u016B\x05N(\x02\u0166\u016B\x05\\/\x02\u0167\u016B\x05' +
    '`1\x02\u0168\u016B\x05f4\x02\u0169\u016B\x05n8\x02\u016A\u0164\x03\x02' +
    '\x02\x02\u016A\u0165\x03\x02\x02\x02\u016A\u0166\x03\x02\x02\x02\u016A' +
    '\u0167\x03\x02\x02\x02\u016A\u0168\x03\x02\x02\x02\u016A\u0169\x03\x02' +
    "\x02\x02\u016BG\x03\x02\x02\x02\u016C\u0173\x05L'\x02\u016D\u0173\x05" +
    'P)\x02\u016E\u0173\x05^0\x02\u016F\u0173\x05d3\x02\u0170\u0173\x05l7\x02' +
    '\u0171\u0173\x05r:\x02\u0172\u016C\x03\x02\x02\x02\u0172\u016D\x03\x02' +
    '\x02\x02\u0172\u016E\x03\x02\x02\x02\u0172\u016F\x03\x02\x02\x02\u0172' +
    '\u0170\x03\x02\x02\x02\u0172\u0171\x03\x02\x02\x02\u0173I\x03\x02\x02' +
    '\x02\u0174\u0176\x05D#\x02\u0175\u0174\x03\x02\x02\x02\u0175\u0176\x03' +
    '\x02\x02\x02\u0176\u0177\x03\x02\x02\x02\u0177\u0178\x07\x16\x02\x02\u0178' +
    '\u017A\x073\x02\x02\u0179\u017B\x056\x1C\x02\u017A\u0179\x03\x02\x02\x02' +
    '\u017A\u017B\x03\x02\x02\x02\u017BK\x03\x02\x02\x02\u017C\u017D\x07\x15' +
    '\x02\x02\u017D\u017E\x07\x16\x02\x02\u017E\u017F\x073\x02\x02\u017F\u0180' +
    '\x056\x1C\x02\u0180M\x03\x02\x02\x02\u0181\u0183\x05D#\x02\u0182\u0181' +
    '\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02\u0183\u0184\x03\x02\x02\x02' +
    '\u0184\u0185\x07\x17\x02\x02\u0185\u0187\x073\x02\x02\u0186\u0188\x05' +
    'R*\x02\u0187\u0186\x03\x02\x02\x02\u0187\u0188\x03\x02\x02\x02\u0188\u018A' +
    '\x03\x02\x02\x02\u0189\u018B\x056\x1C\x02\u018A\u0189\x03\x02\x02\x02' +
    '\u018A\u018B\x03\x02\x02\x02\u018B\u018D\x03\x02\x02\x02\u018C\u018E\x05' +
    'T+\x02\u018D\u018C\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02\u018EO' +
    '\x03\x02\x02\x02\u018F\u0190\x07\x15\x02\x02\u0190\u0191\x07\x17\x02\x02' +
    '\u0191\u0193\x073\x02\x02\u0192\u0194\x05R*\x02\u0193\u0192\x03\x02\x02' +
    '\x02\u0193\u0194\x03\x02\x02\x02\u0194\u0196\x03\x02\x02\x02\u0195\u0197' +
    '\x056\x1C\x02\u0196\u0195\x03\x02\x02\x02\u0196\u0197\x03\x02\x02\x02' +
    '\u0197\u0198\x03\x02\x02\x02\u0198\u01A5\x05T+\x02\u0199\u019A\x07\x15' +
    '\x02\x02\u019A\u019B\x07\x17\x02\x02\u019B\u019D\x073\x02\x02\u019C\u019E' +
    '\x05R*\x02\u019D\u019C\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02\u019E' +
    '\u019F\x03\x02\x02\x02\u019F\u01A5\x056\x1C\x02\u01A0\u01A1\x07\x15\x02' +
    '\x02\u01A1\u01A2\x07\x17\x02\x02\u01A2\u01A3\x073\x02\x02\u01A3\u01A5' +
    '\x05R*\x02\u01A4\u018F\x03\x02\x02\x02\u01A4\u0199\x03\x02\x02\x02\u01A4' +
    '\u01A0\x03\x02\x02\x02\u01A5Q\x03\x02\x02\x02\u01A6\u01A8\x07\x18\x02' +
    '\x02\u01A7\u01A9\x07\x19\x02\x02\u01A8\u01A7\x03\x02\x02\x02\u01A8\u01A9' +
    '\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01B1\x050\x19\x02' +
    '\u01AB\u01AD\x07\x19\x02\x02\u01AC\u01AB\x03\x02\x02\x02\u01AC\u01AD\x03' +
    '\x02\x02\x02\u01AD\u01AE\x03\x02\x02\x02\u01AE\u01B0\x050\x19\x02\u01AF' +
    '\u01AC\x03\x02\x02\x02\u01B0\u01B3\x03\x02\x02\x02\u01B1\u01AF\x03\x02' +
    '\x02\x02\u01B1\u01B2\x03\x02\x02\x02\u01B2S\x03\x02\x02\x02\u01B3\u01B1' +
    '\x03\x02\x02\x02\u01B4\u01B6\x07\x06\x02\x02\u01B5\u01B7\x05V,\x02\u01B6' +
    '\u01B5\x03\x02\x02\x02\u01B7\u01B8\x03\x02\x02\x02\u01B8\u01B6\x03\x02' +
    '\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BA\x03\x02\x02\x02\u01BA' +
    '\u01BB\x07\x07\x02\x02\u01BBU\x03\x02\x02\x02\u01BC\u01BE\x05D#\x02\u01BD' +
    '\u01BC\x03\x02\x02\x02\u01BD\u01BE\x03\x02\x02\x02\u01BE\u01BF\x03\x02' +
    '\x02\x02\u01BF\u01C1\x073\x02\x02\u01C0\u01C2\x05X-\x02\u01C1\u01C0\x03' +
    '\x02\x02\x02\u01C1\u01C2\x03\x02\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C3' +
    '\u01C4\x07\b\x02\x02\u01C4\u01C6\x05.\x18\x02\u01C5\u01C7\x056\x1C\x02' +
    '\u01C6\u01C5\x03\x02\x02\x02\u01C6\u01C7\x03\x02\x02\x02\u01C7W\x03\x02' +
    '\x02\x02\u01C8\u01CA\x07\t\x02\x02\u01C9\u01CB\x05Z.\x02\u01CA\u01C9\x03' +
    '\x02\x02\x02\u01CB\u01CC\x03\x02\x02\x02\u01CC\u01CA\x03\x02\x02\x02\u01CC' +
    '\u01CD\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE\u01CF\x07\n\x02' +
    '\x02\u01CFY\x03\x02\x02\x02\u01D0\u01D2\x05D#\x02\u01D1\u01D0\x03\x02' +
    '\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3' +
    '\u01D4\x073\x02\x02\u01D4\u01D5\x07\b\x02\x02\u01D5\u01D7\x05.\x18\x02' +
    '\u01D6\u01D8\x05,\x17\x02\u01D7\u01D6\x03\x02\x02\x02\u01D7\u01D8\x03' +
    '\x02\x02\x02\u01D8\u01DA\x03\x02\x02\x02\u01D9\u01DB\x056\x1C\x02\u01DA' +
    '\u01D9\x03\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB[\x03\x02\x02' +
    '\x02\u01DC\u01DE\x05D#\x02\u01DD\u01DC\x03\x02\x02\x02\u01DD\u01DE\x03' +
    '\x02\x02\x02\u01DE\u01DF\x03\x02\x02\x02\u01DF\u01E0\x07\x1A\x02\x02\u01E0' +
    '\u01E2\x073\x02\x02\u01E1\u01E3\x056\x1C\x02\u01E2\u01E1\x03\x02\x02\x02' +
    '\u01E2\u01E3\x03\x02\x02\x02\u01E3\u01E5\x03\x02\x02\x02\u01E4\u01E6\x05' +
    'T+\x02\u01E5\u01E4\x03\x02\x02\x02\u01E5\u01E6\x03\x02\x02\x02\u01E6]' +
    '\x03\x02\x02\x02\u01E7\u01E8\x07\x15\x02\x02\u01E8\u01E9\x07\x1A\x02\x02' +
    '\u01E9\u01EB\x073\x02\x02\u01EA\u01EC\x056\x1C\x02\u01EB\u01EA\x03\x02' +
    '\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01ED\x03\x02\x02\x02\u01ED' +
    '\u01F3\x05T+\x02\u01EE\u01EF\x07\x15\x02\x02\u01EF\u01F0\x07\x1A\x02\x02' +
    '\u01F0\u01F1\x073\x02\x02\u01F1\u01F3\x056\x1C\x02\u01F2\u01E7\x03\x02' +
    '\x02\x02\u01F2\u01EE\x03\x02\x02\x02\u01F3_\x03\x02\x02\x02\u01F4\u01F6' +
    '\x05D#\x02\u01F5\u01F4\x03\x02\x02\x02\u01F5\u01F6\x03\x02\x02\x02\u01F6' +
    '\u01F7\x03\x02\x02\x02\u01F7\u01F8\x07\x1B\x02\x02\u01F8\u01FA\x073\x02' +
    '\x02\u01F9\u01FB\x056\x1C\x02\u01FA\u01F9\x03\x02\x02\x02\u01FA\u01FB' +
    '\x03\x02\x02\x02\u01FB\u01FD\x03\x02\x02\x02\u01FC\u01FE\x05b2\x02\u01FD' +
    '\u01FC\x03\x02\x02\x02\u01FD\u01FE\x03\x02\x02\x02\u01FEa\x03\x02\x02' +
    '\x02\u01FF\u0201\x07\x11\x02\x02\u0200\u0202\x07\x1C\x02\x02\u0201\u0200' +
    '\x03\x02\x02\x02\u0201\u0202\x03\x02\x02\x02\u0202\u0203\x03\x02\x02\x02' +
    '\u0203\u020A\x050\x19\x02\u0204\u0206\x07\x1C\x02\x02\u0205\u0204\x03' +
    '\x02\x02\x02\u0205\u0206\x03\x02\x02\x02\u0206\u0207\x03\x02\x02\x02\u0207' +
    '\u0209\x050\x19\x02\u0208\u0205\x03\x02\x02\x02\u0209\u020C\x03\x02\x02' +
    '\x02\u020A\u0208\x03\x02\x02\x02\u020A\u020B\x03\x02\x02\x02\u020Bc\x03' +
    '\x02\x02\x02\u020C\u020A\x03\x02\x02\x02\u020D\u020E\x07\x15\x02\x02\u020E' +
    '\u020F\x07\x1B\x02\x02\u020F\u0211\x073\x02\x02\u0210\u0212\x056\x1C\x02' +
    '\u0211\u0210\x03\x02\x02\x02\u0211\u0212\x03\x02\x02\x02\u0212\u0213\x03' +
    '\x02\x02\x02\u0213\u0219\x05b2\x02\u0214\u0215\x07\x15\x02\x02\u0215\u0216' +
    '\x07\x1B\x02\x02\u0216\u0217\x073\x02\x02\u0217\u0219\x056\x1C\x02\u0218' +
    '\u020D\x03\x02\x02\x02\u0218\u0214\x03\x02\x02\x02\u0219e\x03\x02\x02' +
    '\x02\u021A\u021C\x05D#\x02\u021B\u021A\x03\x02\x02\x02\u021B\u021C\x03' +
    '\x02\x02\x02\u021C\u021D\x03\x02\x02\x02\u021D\u021E\x07\x1D\x02\x02\u021E' +
    '\u0220\x073\x02\x02\u021F\u0221\x056\x1C\x02\u0220\u021F\x03\x02\x02\x02' +
    '\u0220\u0221\x03\x02\x02';
  private static readonly _serializedATNSegment1: string =
    '\x02\u0221\u0223\x03\x02\x02\x02\u0222\u0224\x05h5\x02\u0223\u0222\x03' +
    '\x02\x02\x02\u0223\u0224\x03\x02\x02\x02\u0224g\x03\x02\x02\x02\u0225' +
    '\u0227\x07\x06\x02\x02\u0226\u0228\x05j6\x02\u0227\u0226\x03\x02\x02\x02' +
    '\u0228\u0229\x03\x02\x02\x02\u0229\u0227\x03\x02\x02\x02\u0229\u022A\x03' +
    '\x02\x02\x02\u022A\u022B\x03\x02\x02\x02\u022B\u022C\x07\x07\x02\x02\u022C' +
    'i\x03\x02\x02\x02\u022D\u022F\x05D#\x02\u022E\u022D\x03\x02\x02\x02\u022E' +
    '\u022F\x03\x02\x02\x02\u022F\u0230\x03\x02\x02\x02\u0230\u0232\x073\x02' +
    '\x02\u0231\u0233\x056\x1C\x02\u0232\u0231\x03\x02\x02\x02\u0232\u0233' +
    '\x03\x02\x02\x02\u0233k\x03\x02\x02\x02\u0234\u0235\x07\x15\x02\x02\u0235' +
    '\u0236\x07\x1D\x02\x02\u0236\u0238\x073\x02\x02\u0237\u0239\x056\x1C\x02' +
    '\u0238\u0237\x03\x02\x02\x02\u0238\u0239\x03\x02\x02\x02\u0239\u023A\x03' +
    '\x02\x02\x02\u023A\u0240\x05h5\x02\u023B\u023C\x07\x15\x02\x02\u023C\u023D' +
    '\x07\x1D\x02\x02\u023D\u023E\x073\x02\x02\u023E\u0240\x056\x1C\x02\u023F' +
    '\u0234\x03\x02\x02\x02\u023F\u023B\x03\x02\x02\x02\u0240m\x03\x02\x02' +
    '\x02\u0241\u0243\x05D#\x02\u0242\u0241\x03\x02\x02\x02\u0242\u0243\x03' +
    '\x02\x02\x02\u0243\u0244\x03\x02\x02\x02\u0244\u0245\x07\x1E\x02\x02\u0245' +
    '\u0247\x073\x02\x02\u0246\u0248\x056\x1C\x02\u0247\u0246\x03\x02\x02\x02' +
    '\u0247\u0248\x03\x02\x02\x02\u0248\u024A\x03\x02\x02\x02\u0249\u024B\x05' +
    'p9\x02\u024A\u0249\x03\x02\x02\x02\u024A\u024B\x03\x02\x02\x02\u024Bo' +
    '\x03\x02\x02\x02\u024C\u024E\x07\x06\x02\x02\u024D\u024F\x05Z.\x02\u024E' +
    '\u024D\x03\x02\x02\x02\u024F\u0250\x03\x02\x02\x02\u0250\u024E\x03\x02' +
    '\x02\x02\u0250\u0251\x03\x02\x02\x02\u0251\u0252\x03\x02\x02\x02\u0252' +
    '\u0253\x07\x07\x02\x02\u0253q\x03\x02\x02\x02\u0254\u0255\x07\x15\x02' +
    '\x02\u0255\u0256\x07\x1E\x02\x02\u0256\u0258\x073\x02\x02\u0257\u0259' +
    '\x056\x1C\x02\u0258\u0257\x03\x02\x02\x02\u0258\u0259\x03\x02\x02\x02' +
    '\u0259\u025A\x03\x02\x02\x02\u025A\u0260\x05p9\x02\u025B\u025C\x07\x15' +
    '\x02\x02\u025C\u025D\x07\x1E\x02\x02\u025D\u025E\x073\x02\x02\u025E\u0260' +
    '\x056\x1C\x02\u025F\u0254\x03\x02\x02\x02\u025F\u025B\x03\x02\x02\x02' +
    '\u0260s\x03\x02\x02\x02\u0261\u0263\x05D#\x02\u0262\u0261\x03\x02\x02' +
    '\x02\u0262\u0263\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02\u0264\u0265' +
    '\x07\x1F\x02\x02\u0265\u0266\x07\x13\x02\x02\u0266\u0268\x073\x02\x02' +
    '\u0267\u0269\x05X-\x02\u0268\u0267\x03\x02\x02\x02\u0268\u0269\x03\x02' +
    '\x02\x02\u0269\u026A\x03\x02\x02\x02\u026A\u026B\x05v<\x02\u026Bu\x03' +
    '\x02\x02\x02\u026C\u026E\x07\r\x02\x02\u026D\u026F\x07\x1C\x02\x02\u026E' +
    '\u026D\x03\x02\x02\x02\u026E\u026F\x03\x02\x02\x02\u026F\u0270\x03\x02' +
    '\x02\x02\u0270\u0277\x05x=\x02\u0271\u0273\x07\x1C\x02\x02\u0272\u0271' +
    '\x03\x02\x02\x02\u0272\u0273\x03\x02\x02\x02\u0273\u0274\x03\x02\x02\x02' +
    '\u0274\u0276\x05x=\x02\u0275\u0272\x03\x02\x02\x02\u0276\u0279\x03\x02' +
    '\x02\x02\u0277\u0275\x03\x02\x02\x02\u0277\u0278\x03\x02\x02\x02\u0278' +
    'w\x03\x02\x02\x02\u0279\u0277\x03\x02\x02\x02\u027A\u027D\x05z>\x02\u027B' +
    '\u027D\x05|?\x02\u027C\u027A\x03\x02\x02\x02\u027C\u027B\x03\x02\x02\x02' +
    '\u027Dy\x03\x02\x02\x02\u027E\u027F\t\x03\x02\x02\u027F{\x03\x02\x02\x02' +
    '\u0280\u0281\t\x04\x02\x02\u0281}\x03\x02\x02\x02^\x81\x88\x8C\x91\x94' +
    '\x97\x9B\xA3\xAA\xAD\xB1\xB4\xB7\xC0\xCB\xCF\xD2\xDA\xF0\xFA\xFE\u0108' +
    '\u0110\u0113\u011D\u0121\u0123\u0130\u0135\u013A\u013E\u0142\u0148\u014F' +
    '\u0155\u015C\u016A\u0172\u0175\u017A\u0182\u0187\u018A\u018D\u0193\u0196' +
    '\u019D\u01A4\u01A8\u01AC\u01B1\u01B8\u01BD\u01C1\u01C6\u01CC\u01D1\u01D7' +
    '\u01DA\u01DD\u01E2\u01E5\u01EB\u01F2\u01F5\u01FA\u01FD\u0201\u0205\u020A' +
    '\u0211\u0218\u021B\u0220\u0223\u0229\u022E\u0232\u0238\u023F\u0242\u0247' +
    '\u024A\u0250\u0258\u025F\u0262\u0268\u026E\u0272\u0277\u027C';
  public static readonly _serializedATN: string = Utils.join(
    [
      GraphQLParser._serializedATNSegment0,
      GraphQLParser._serializedATNSegment1,
    ],
    ''
  );
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!GraphQLParser.__ATN) {
      GraphQLParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(GraphQLParser._serializedATN)
      );
    }

    return GraphQLParser.__ATN;
  }
}

export class DocumentContext extends ParserRuleContext {
  public EOF(): TerminalNode {
    return this.getToken(GraphQLParser.EOF, 0);
  }
  public definition(): DefinitionContext[];
  public definition(i: number): DefinitionContext;
  public definition(i?: number): DefinitionContext | DefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DefinitionContext);
    } else {
      return this.getRuleContext(i, DefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_document;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDocument) {
      listener.enterDocument(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDocument) {
      listener.exitDocument(this);
    }
  }
}

export class DefinitionContext extends ParserRuleContext {
  public executableDefinition(): ExecutableDefinitionContext | undefined {
    return this.tryGetRuleContext(0, ExecutableDefinitionContext);
  }
  public typeSystemDefinition(): TypeSystemDefinitionContext | undefined {
    return this.tryGetRuleContext(0, TypeSystemDefinitionContext);
  }
  public typeSystemExtension(): TypeSystemExtensionContext | undefined {
    return this.tryGetRuleContext(0, TypeSystemExtensionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_definition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDefinition) {
      listener.enterDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDefinition) {
      listener.exitDefinition(this);
    }
  }
}

export class ExecutableDefinitionContext extends ParserRuleContext {
  public operationDefinition(): OperationDefinitionContext | undefined {
    return this.tryGetRuleContext(0, OperationDefinitionContext);
  }
  public fragmentDefinition(): FragmentDefinitionContext | undefined {
    return this.tryGetRuleContext(0, FragmentDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_executableDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterExecutableDefinition) {
      listener.enterExecutableDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitExecutableDefinition) {
      listener.exitExecutableDefinition(this);
    }
  }
}

export class OperationDefinitionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_operationDefinition;
  }
  public copyFrom(ctx: OperationDefinitionContext): void {
    super.copyFrom(ctx);
  }
}
export class SelectionOnlyOperationDefinitionContext extends OperationDefinitionContext {
  public selectionSet(): SelectionSetContext {
    return this.getRuleContext(0, SelectionSetContext);
  }
  constructor(ctx: OperationDefinitionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterSelectionOnlyOperationDefinition) {
      listener.enterSelectionOnlyOperationDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitSelectionOnlyOperationDefinition) {
      listener.exitSelectionOnlyOperationDefinition(this);
    }
  }
}
export class FullOperationDefinitionContext extends OperationDefinitionContext {
  public operationType(): OperationTypeContext {
    return this.getRuleContext(0, OperationTypeContext);
  }
  public selectionSet(): SelectionSetContext {
    return this.getRuleContext(0, SelectionSetContext);
  }
  public NAME(): TerminalNode | undefined {
    return this.tryGetToken(GraphQLParser.NAME, 0);
  }
  public variableDefinitions(): VariableDefinitionsContext | undefined {
    return this.tryGetRuleContext(0, VariableDefinitionsContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: OperationDefinitionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFullOperationDefinition) {
      listener.enterFullOperationDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFullOperationDefinition) {
      listener.exitFullOperationDefinition(this);
    }
  }
}

export class OperationTypeContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_operationType;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterOperationType) {
      listener.enterOperationType(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitOperationType) {
      listener.exitOperationType(this);
    }
  }
}

export class SelectionSetContext extends ParserRuleContext {
  public selection(): SelectionContext[];
  public selection(i: number): SelectionContext;
  public selection(i?: number): SelectionContext | SelectionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SelectionContext);
    } else {
      return this.getRuleContext(i, SelectionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_selectionSet;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterSelectionSet) {
      listener.enterSelectionSet(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitSelectionSet) {
      listener.exitSelectionSet(this);
    }
  }
}

export class SelectionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_selection;
  }
  public copyFrom(ctx: SelectionContext): void {
    super.copyFrom(ctx);
  }
}
export class FragmentSpreadSelectionContext extends SelectionContext {
  public fragmentSpread(): FragmentSpreadContext {
    return this.getRuleContext(0, FragmentSpreadContext);
  }
  constructor(ctx: SelectionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFragmentSpreadSelection) {
      listener.enterFragmentSpreadSelection(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFragmentSpreadSelection) {
      listener.exitFragmentSpreadSelection(this);
    }
  }
}
export class FieldSelectionContext extends SelectionContext {
  public field(): FieldContext {
    return this.getRuleContext(0, FieldContext);
  }
  constructor(ctx: SelectionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFieldSelection) {
      listener.enterFieldSelection(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFieldSelection) {
      listener.exitFieldSelection(this);
    }
  }
}
export class InlineFragmentSelectionContext extends SelectionContext {
  public inlineFragment(): InlineFragmentContext {
    return this.getRuleContext(0, InlineFragmentContext);
  }
  constructor(ctx: SelectionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInlineFragmentSelection) {
      listener.enterInlineFragmentSelection(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInlineFragmentSelection) {
      listener.exitInlineFragmentSelection(this);
    }
  }
}

export class FieldContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public alias(): AliasContext | undefined {
    return this.tryGetRuleContext(0, AliasContext);
  }
  public arguments(): ArgumentsContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public selectionSet(): SelectionSetContext | undefined {
    return this.tryGetRuleContext(0, SelectionSetContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_field;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterField) {
      listener.enterField(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitField) {
      listener.exitField(this);
    }
  }
}

export class AliasContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_alias;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterAlias) {
      listener.enterAlias(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitAlias) {
      listener.exitAlias(this);
    }
  }
}

export class ArgumentsContext extends ParserRuleContext {
  public argument(): ArgumentContext[];
  public argument(i: number): ArgumentContext;
  public argument(i?: number): ArgumentContext | ArgumentContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ArgumentContext);
    } else {
      return this.getRuleContext(i, ArgumentContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_arguments;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterArguments) {
      listener.enterArguments(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitArguments) {
      listener.exitArguments(this);
    }
  }
}

export class ArgumentContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_argument;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterArgument) {
      listener.enterArgument(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitArgument) {
      listener.exitArgument(this);
    }
  }
}

export class FragmentSpreadContext extends ParserRuleContext {
  public fragmentName(): FragmentNameContext {
    return this.getRuleContext(0, FragmentNameContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_fragmentSpread;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFragmentSpread) {
      listener.enterFragmentSpread(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFragmentSpread) {
      listener.exitFragmentSpread(this);
    }
  }
}

export class InlineFragmentContext extends ParserRuleContext {
  public selectionSet(): SelectionSetContext {
    return this.getRuleContext(0, SelectionSetContext);
  }
  public typeCondition(): TypeConditionContext | undefined {
    return this.tryGetRuleContext(0, TypeConditionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_inlineFragment;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInlineFragment) {
      listener.enterInlineFragment(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInlineFragment) {
      listener.exitInlineFragment(this);
    }
  }
}

export class FragmentDefinitionContext extends ParserRuleContext {
  public fragmentName(): FragmentNameContext {
    return this.getRuleContext(0, FragmentNameContext);
  }
  public typeCondition(): TypeConditionContext {
    return this.getRuleContext(0, TypeConditionContext);
  }
  public selectionSet(): SelectionSetContext {
    return this.getRuleContext(0, SelectionSetContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_fragmentDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFragmentDefinition) {
      listener.enterFragmentDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFragmentDefinition) {
      listener.exitFragmentDefinition(this);
    }
  }
}

export class FragmentNameContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_fragmentName;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFragmentName) {
      listener.enterFragmentName(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFragmentName) {
      listener.exitFragmentName(this);
    }
  }
}

export class TypeConditionContext extends ParserRuleContext {
  public namedType(): NamedTypeContext {
    return this.getRuleContext(0, NamedTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeCondition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeCondition) {
      listener.enterTypeCondition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeCondition) {
      listener.exitTypeCondition(this);
    }
  }
}

export class ValueContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_value;
  }
  public copyFrom(ctx: ValueContext): void {
    super.copyFrom(ctx);
  }
}
export class StringValueContext extends ValueContext {
  public STRING_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.STRING_VALUE, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterStringValue) {
      listener.enterStringValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitStringValue) {
      listener.exitStringValue(this);
    }
  }
}
export class NonEmptyObjectValueContext extends ValueContext {
  public objectField(): ObjectFieldContext[];
  public objectField(i: number): ObjectFieldContext;
  public objectField(i?: number): ObjectFieldContext | ObjectFieldContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ObjectFieldContext);
    } else {
      return this.getRuleContext(i, ObjectFieldContext);
    }
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterNonEmptyObjectValue) {
      listener.enterNonEmptyObjectValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitNonEmptyObjectValue) {
      listener.exitNonEmptyObjectValue(this);
    }
  }
}
export class EnumValueContext extends ValueContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumValue) {
      listener.enterEnumValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumValue) {
      listener.exitEnumValue(this);
    }
  }
}
export class VariableValueContext extends ValueContext {
  public variable(): VariableContext {
    return this.getRuleContext(0, VariableContext);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterVariableValue) {
      listener.enterVariableValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitVariableValue) {
      listener.exitVariableValue(this);
    }
  }
}
export class IntValueContext extends ValueContext {
  public INT_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.INT_VALUE, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterIntValue) {
      listener.enterIntValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitIntValue) {
      listener.exitIntValue(this);
    }
  }
}
export class EmptyListValueContext extends ValueContext {
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEmptyListValue) {
      listener.enterEmptyListValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEmptyListValue) {
      listener.exitEmptyListValue(this);
    }
  }
}
export class FloatValueContext extends ValueContext {
  public FLOAT_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.FLOAT_VALUE, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFloatValue) {
      listener.enterFloatValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFloatValue) {
      listener.exitFloatValue(this);
    }
  }
}
export class BooleanValueContext extends ValueContext {
  public BOOLEAN_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.BOOLEAN_VALUE, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterBooleanValue) {
      listener.enterBooleanValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitBooleanValue) {
      listener.exitBooleanValue(this);
    }
  }
}
export class NonEmptyListValueContext extends ValueContext {
  public value(): ValueContext[];
  public value(i: number): ValueContext;
  public value(i?: number): ValueContext | ValueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ValueContext);
    } else {
      return this.getRuleContext(i, ValueContext);
    }
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterNonEmptyListValue) {
      listener.enterNonEmptyListValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitNonEmptyListValue) {
      listener.exitNonEmptyListValue(this);
    }
  }
}
export class NullValueContext extends ValueContext {
  public NULL_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.NULL_VALUE, 0);
  }
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterNullValue) {
      listener.enterNullValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitNullValue) {
      listener.exitNullValue(this);
    }
  }
}
export class EmptyObjectValueContext extends ValueContext {
  constructor(ctx: ValueContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEmptyObjectValue) {
      listener.enterEmptyObjectValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEmptyObjectValue) {
      listener.exitEmptyObjectValue(this);
    }
  }
}

export class ObjectFieldContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_objectField;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterObjectField) {
      listener.enterObjectField(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitObjectField) {
      listener.exitObjectField(this);
    }
  }
}

export class VariableDefinitionsContext extends ParserRuleContext {
  public variableDefinition(): VariableDefinitionContext[];
  public variableDefinition(i: number): VariableDefinitionContext;
  public variableDefinition(
    i?: number
  ): VariableDefinitionContext | VariableDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(VariableDefinitionContext);
    } else {
      return this.getRuleContext(i, VariableDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_variableDefinitions;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterVariableDefinitions) {
      listener.enterVariableDefinitions(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitVariableDefinitions) {
      listener.exitVariableDefinitions(this);
    }
  }
}

export class VariableDefinitionContext extends ParserRuleContext {
  public variable(): VariableContext {
    return this.getRuleContext(0, VariableContext);
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext);
  }
  public defaultValue(): DefaultValueContext | undefined {
    return this.tryGetRuleContext(0, DefaultValueContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_variableDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterVariableDefinition) {
      listener.enterVariableDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitVariableDefinition) {
      listener.exitVariableDefinition(this);
    }
  }
}

export class VariableContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_variable;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterVariable) {
      listener.enterVariable(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitVariable) {
      listener.exitVariable(this);
    }
  }
}

export class DefaultValueContext extends ParserRuleContext {
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_defaultValue;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDefaultValue) {
      listener.enterDefaultValue(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDefaultValue) {
      listener.exitDefaultValue(this);
    }
  }
}

export class TypeContext extends ParserRuleContext {
  public namedType(): NamedTypeContext | undefined {
    return this.tryGetRuleContext(0, NamedTypeContext);
  }
  public nonNullType(): NonNullTypeContext | undefined {
    return this.tryGetRuleContext(0, NonNullTypeContext);
  }
  public listType(): ListTypeContext | undefined {
    return this.tryGetRuleContext(0, ListTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_type;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
}

export class NamedTypeContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_namedType;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterNamedType) {
      listener.enterNamedType(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitNamedType) {
      listener.exitNamedType(this);
    }
  }
}

export class ListTypeContext extends ParserRuleContext {
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_listType;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterListType) {
      listener.enterListType(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitListType) {
      listener.exitListType(this);
    }
  }
}

export class NonNullTypeContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_nonNullType;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterNonNullType) {
      listener.enterNonNullType(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitNonNullType) {
      listener.exitNonNullType(this);
    }
  }
}

export class DirectivesContext extends ParserRuleContext {
  public directive(): DirectiveContext[];
  public directive(i: number): DirectiveContext;
  public directive(i?: number): DirectiveContext | DirectiveContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DirectiveContext);
    } else {
      return this.getRuleContext(i, DirectiveContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_directives;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDirectives) {
      listener.enterDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDirectives) {
      listener.exitDirectives(this);
    }
  }
}

export class DirectiveContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public arguments(): ArgumentsContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_directive;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDirective) {
      listener.enterDirective(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDirective) {
      listener.exitDirective(this);
    }
  }
}

export class TypeSystemDefinitionContext extends ParserRuleContext {
  public schemaDefinition(): SchemaDefinitionContext | undefined {
    return this.tryGetRuleContext(0, SchemaDefinitionContext);
  }
  public typeDefinition(): TypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, TypeDefinitionContext);
  }
  public directiveDefinition(): DirectiveDefinitionContext | undefined {
    return this.tryGetRuleContext(0, DirectiveDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeSystemDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeSystemDefinition) {
      listener.enterTypeSystemDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeSystemDefinition) {
      listener.exitTypeSystemDefinition(this);
    }
  }
}

export class TypeSystemExtensionContext extends ParserRuleContext {
  public schemaExtension(): SchemaExtensionContext | undefined {
    return this.tryGetRuleContext(0, SchemaExtensionContext);
  }
  public typeExtension(): TypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, TypeExtensionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeSystemExtension;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeSystemExtension) {
      listener.enterTypeSystemExtension(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeSystemExtension) {
      listener.exitTypeSystemExtension(this);
    }
  }
}

export class SchemaDefinitionContext extends ParserRuleContext {
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public operationTypeDefinition(): OperationTypeDefinitionContext[];
  public operationTypeDefinition(i: number): OperationTypeDefinitionContext;
  public operationTypeDefinition(
    i?: number
  ): OperationTypeDefinitionContext | OperationTypeDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(OperationTypeDefinitionContext);
    } else {
      return this.getRuleContext(i, OperationTypeDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_schemaDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterSchemaDefinition) {
      listener.enterSchemaDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitSchemaDefinition) {
      listener.exitSchemaDefinition(this);
    }
  }
}

export class SchemaExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_schemaExtension;
  }
  public copyFrom(ctx: SchemaExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class SchemaExtensionWithoutOperationsContext extends SchemaExtensionContext {
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(ctx: SchemaExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterSchemaExtensionWithoutOperations) {
      listener.enterSchemaExtensionWithoutOperations(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitSchemaExtensionWithoutOperations) {
      listener.exitSchemaExtensionWithoutOperations(this);
    }
  }
}
export class SchemaExtensionWithOperationsContext extends SchemaExtensionContext {
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public operationTypeDefinition(): OperationTypeDefinitionContext[];
  public operationTypeDefinition(i: number): OperationTypeDefinitionContext;
  public operationTypeDefinition(
    i?: number
  ): OperationTypeDefinitionContext | OperationTypeDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(OperationTypeDefinitionContext);
    } else {
      return this.getRuleContext(i, OperationTypeDefinitionContext);
    }
  }
  constructor(ctx: SchemaExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterSchemaExtensionWithOperations) {
      listener.enterSchemaExtensionWithOperations(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitSchemaExtensionWithOperations) {
      listener.exitSchemaExtensionWithOperations(this);
    }
  }
}

export class OperationTypeDefinitionContext extends ParserRuleContext {
  public operationType(): OperationTypeContext {
    return this.getRuleContext(0, OperationTypeContext);
  }
  public namedType(): NamedTypeContext {
    return this.getRuleContext(0, NamedTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_operationTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterOperationTypeDefinition) {
      listener.enterOperationTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitOperationTypeDefinition) {
      listener.exitOperationTypeDefinition(this);
    }
  }
}

export class DescriptionContext extends ParserRuleContext {
  public STRING_VALUE(): TerminalNode {
    return this.getToken(GraphQLParser.STRING_VALUE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_description;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDescription) {
      listener.enterDescription(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDescription) {
      listener.exitDescription(this);
    }
  }
}

export class TypeDefinitionContext extends ParserRuleContext {
  public scalarTypeDefinition(): ScalarTypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, ScalarTypeDefinitionContext);
  }
  public objectTypeDefinition(): ObjectTypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, ObjectTypeDefinitionContext);
  }
  public interfaceTypeDefinition(): InterfaceTypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, InterfaceTypeDefinitionContext);
  }
  public unionTypeDefinition(): UnionTypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, UnionTypeDefinitionContext);
  }
  public enumTypeDefinition(): EnumTypeDefinitionContext | undefined {
    return this.tryGetRuleContext(0, EnumTypeDefinitionContext);
  }
  public inputObjectTypeDefinition():
    | InputObjectTypeDefinitionContext
    | undefined {
    return this.tryGetRuleContext(0, InputObjectTypeDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeDefinition) {
      listener.enterTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeDefinition) {
      listener.exitTypeDefinition(this);
    }
  }
}

export class TypeExtensionContext extends ParserRuleContext {
  public scalarTypeExtension(): ScalarTypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, ScalarTypeExtensionContext);
  }
  public objectTypeExtension(): ObjectTypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, ObjectTypeExtensionContext);
  }
  public interfaceTypeExtension(): InterfaceTypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, InterfaceTypeExtensionContext);
  }
  public unionTypeExtension(): UnionTypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, UnionTypeExtensionContext);
  }
  public enumTypeExtension(): EnumTypeExtensionContext | undefined {
    return this.tryGetRuleContext(0, EnumTypeExtensionContext);
  }
  public inputObjectTypeExtension():
    | InputObjectTypeExtensionContext
    | undefined {
    return this.tryGetRuleContext(0, InputObjectTypeExtensionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeExtension;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeExtension) {
      listener.enterTypeExtension(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeExtension) {
      listener.exitTypeExtension(this);
    }
  }
}

export class ScalarTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_scalarTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterScalarTypeDefinition) {
      listener.enterScalarTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitScalarTypeDefinition) {
      listener.exitScalarTypeDefinition(this);
    }
  }
}

export class ScalarTypeExtensionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_scalarTypeExtension;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterScalarTypeExtension) {
      listener.enterScalarTypeExtension(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitScalarTypeExtension) {
      listener.exitScalarTypeExtension(this);
    }
  }
}

export class ObjectTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public implementsInterfaces(): ImplementsInterfacesContext | undefined {
    return this.tryGetRuleContext(0, ImplementsInterfacesContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public fieldsDefinition(): FieldsDefinitionContext | undefined {
    return this.tryGetRuleContext(0, FieldsDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_objectTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterObjectTypeDefinition) {
      listener.enterObjectTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitObjectTypeDefinition) {
      listener.exitObjectTypeDefinition(this);
    }
  }
}

export class ObjectTypeExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_objectTypeExtension;
  }
  public copyFrom(ctx: ObjectTypeExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class ObjectTypeExtensionWithDirectivesContext extends ObjectTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  public implementsInterfaces(): ImplementsInterfacesContext | undefined {
    return this.tryGetRuleContext(0, ImplementsInterfacesContext);
  }
  constructor(ctx: ObjectTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterObjectTypeExtensionWithDirectives) {
      listener.enterObjectTypeExtensionWithDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitObjectTypeExtensionWithDirectives) {
      listener.exitObjectTypeExtensionWithDirectives(this);
    }
  }
}
export class ObjectTypeExtensionWithFieldsContext extends ObjectTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public fieldsDefinition(): FieldsDefinitionContext {
    return this.getRuleContext(0, FieldsDefinitionContext);
  }
  public implementsInterfaces(): ImplementsInterfacesContext | undefined {
    return this.tryGetRuleContext(0, ImplementsInterfacesContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: ObjectTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterObjectTypeExtensionWithFields) {
      listener.enterObjectTypeExtensionWithFields(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitObjectTypeExtensionWithFields) {
      listener.exitObjectTypeExtensionWithFields(this);
    }
  }
}
export class ObjectTypeExtensionWithInterfacesContext extends ObjectTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public implementsInterfaces(): ImplementsInterfacesContext {
    return this.getRuleContext(0, ImplementsInterfacesContext);
  }
  constructor(ctx: ObjectTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterObjectTypeExtensionWithInterfaces) {
      listener.enterObjectTypeExtensionWithInterfaces(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitObjectTypeExtensionWithInterfaces) {
      listener.exitObjectTypeExtensionWithInterfaces(this);
    }
  }
}

export class ImplementsInterfacesContext extends ParserRuleContext {
  public namedType(): NamedTypeContext[];
  public namedType(i: number): NamedTypeContext;
  public namedType(i?: number): NamedTypeContext | NamedTypeContext[] {
    if (i === undefined) {
      return this.getRuleContexts(NamedTypeContext);
    } else {
      return this.getRuleContext(i, NamedTypeContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_implementsInterfaces;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterImplementsInterfaces) {
      listener.enterImplementsInterfaces(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitImplementsInterfaces) {
      listener.exitImplementsInterfaces(this);
    }
  }
}

export class FieldsDefinitionContext extends ParserRuleContext {
  public fieldDefinition(): FieldDefinitionContext[];
  public fieldDefinition(i: number): FieldDefinitionContext;
  public fieldDefinition(
    i?: number
  ): FieldDefinitionContext | FieldDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FieldDefinitionContext);
    } else {
      return this.getRuleContext(i, FieldDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_fieldsDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFieldsDefinition) {
      listener.enterFieldsDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFieldsDefinition) {
      listener.exitFieldsDefinition(this);
    }
  }
}

export class FieldDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public argumentsDefinition(): ArgumentsDefinitionContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsDefinitionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_fieldDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterFieldDefinition) {
      listener.enterFieldDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitFieldDefinition) {
      listener.exitFieldDefinition(this);
    }
  }
}

export class ArgumentsDefinitionContext extends ParserRuleContext {
  public inputValueDefinition(): InputValueDefinitionContext[];
  public inputValueDefinition(i: number): InputValueDefinitionContext;
  public inputValueDefinition(
    i?: number
  ): InputValueDefinitionContext | InputValueDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(InputValueDefinitionContext);
    } else {
      return this.getRuleContext(i, InputValueDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_argumentsDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterArgumentsDefinition) {
      listener.enterArgumentsDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitArgumentsDefinition) {
      listener.exitArgumentsDefinition(this);
    }
  }
}

export class InputValueDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public defaultValue(): DefaultValueContext | undefined {
    return this.tryGetRuleContext(0, DefaultValueContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_inputValueDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInputValueDefinition) {
      listener.enterInputValueDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInputValueDefinition) {
      listener.exitInputValueDefinition(this);
    }
  }
}

export class InterfaceTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public fieldsDefinition(): FieldsDefinitionContext | undefined {
    return this.tryGetRuleContext(0, FieldsDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_interfaceTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInterfaceTypeDefinition) {
      listener.enterInterfaceTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInterfaceTypeDefinition) {
      listener.exitInterfaceTypeDefinition(this);
    }
  }
}

export class InterfaceTypeExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_interfaceTypeExtension;
  }
  public copyFrom(ctx: InterfaceTypeExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class InterfaceTypeExtensionWithFieldsContext extends InterfaceTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public fieldsDefinition(): FieldsDefinitionContext {
    return this.getRuleContext(0, FieldsDefinitionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: InterfaceTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInterfaceTypeExtensionWithFields) {
      listener.enterInterfaceTypeExtensionWithFields(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInterfaceTypeExtensionWithFields) {
      listener.exitInterfaceTypeExtensionWithFields(this);
    }
  }
}
export class InterfaceTypeExtensionWithDirectivesContext extends InterfaceTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(ctx: InterfaceTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInterfaceTypeExtensionWithDirectives) {
      listener.enterInterfaceTypeExtensionWithDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInterfaceTypeExtensionWithDirectives) {
      listener.exitInterfaceTypeExtensionWithDirectives(this);
    }
  }
}

export class UnionTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public unionMemberTypes(): UnionMemberTypesContext | undefined {
    return this.tryGetRuleContext(0, UnionMemberTypesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_unionTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterUnionTypeDefinition) {
      listener.enterUnionTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitUnionTypeDefinition) {
      listener.exitUnionTypeDefinition(this);
    }
  }
}

export class UnionMemberTypesContext extends ParserRuleContext {
  public namedType(): NamedTypeContext[];
  public namedType(i: number): NamedTypeContext;
  public namedType(i?: number): NamedTypeContext | NamedTypeContext[] {
    if (i === undefined) {
      return this.getRuleContexts(NamedTypeContext);
    } else {
      return this.getRuleContext(i, NamedTypeContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_unionMemberTypes;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterUnionMemberTypes) {
      listener.enterUnionMemberTypes(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitUnionMemberTypes) {
      listener.exitUnionMemberTypes(this);
    }
  }
}

export class UnionTypeExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_unionTypeExtension;
  }
  public copyFrom(ctx: UnionTypeExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class UnionTypeExtensionWithDirectivesContext extends UnionTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(ctx: UnionTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterUnionTypeExtensionWithDirectives) {
      listener.enterUnionTypeExtensionWithDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitUnionTypeExtensionWithDirectives) {
      listener.exitUnionTypeExtensionWithDirectives(this);
    }
  }
}
export class UnionTypeExtensionWithMembersContext extends UnionTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public unionMemberTypes(): UnionMemberTypesContext {
    return this.getRuleContext(0, UnionMemberTypesContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: UnionTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterUnionTypeExtensionWithMembers) {
      listener.enterUnionTypeExtensionWithMembers(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitUnionTypeExtensionWithMembers) {
      listener.exitUnionTypeExtensionWithMembers(this);
    }
  }
}

export class EnumTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public enumValuesDefinition(): EnumValuesDefinitionContext | undefined {
    return this.tryGetRuleContext(0, EnumValuesDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_enumTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumTypeDefinition) {
      listener.enterEnumTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumTypeDefinition) {
      listener.exitEnumTypeDefinition(this);
    }
  }
}

export class EnumValuesDefinitionContext extends ParserRuleContext {
  public enumValueDefinition(): EnumValueDefinitionContext[];
  public enumValueDefinition(i: number): EnumValueDefinitionContext;
  public enumValueDefinition(
    i?: number
  ): EnumValueDefinitionContext | EnumValueDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EnumValueDefinitionContext);
    } else {
      return this.getRuleContext(i, EnumValueDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_enumValuesDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumValuesDefinition) {
      listener.enterEnumValuesDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumValuesDefinition) {
      listener.exitEnumValuesDefinition(this);
    }
  }
}

export class EnumValueDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_enumValueDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumValueDefinition) {
      listener.enterEnumValueDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumValueDefinition) {
      listener.exitEnumValueDefinition(this);
    }
  }
}

export class EnumTypeExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_enumTypeExtension;
  }
  public copyFrom(ctx: EnumTypeExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class EnumTypeExtensionWithDirectivesContext extends EnumTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(ctx: EnumTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumTypeExtensionWithDirectives) {
      listener.enterEnumTypeExtensionWithDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumTypeExtensionWithDirectives) {
      listener.exitEnumTypeExtensionWithDirectives(this);
    }
  }
}
export class EnumTypeExtensionWithValuesContext extends EnumTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public enumValuesDefinition(): EnumValuesDefinitionContext {
    return this.getRuleContext(0, EnumValuesDefinitionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: EnumTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterEnumTypeExtensionWithValues) {
      listener.enterEnumTypeExtensionWithValues(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitEnumTypeExtensionWithValues) {
      listener.exitEnumTypeExtensionWithValues(this);
    }
  }
}

export class InputObjectTypeDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  public inputFieldsDefinition(): InputFieldsDefinitionContext | undefined {
    return this.tryGetRuleContext(0, InputFieldsDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_inputObjectTypeDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInputObjectTypeDefinition) {
      listener.enterInputObjectTypeDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInputObjectTypeDefinition) {
      listener.exitInputObjectTypeDefinition(this);
    }
  }
}

export class InputFieldsDefinitionContext extends ParserRuleContext {
  public inputValueDefinition(): InputValueDefinitionContext[];
  public inputValueDefinition(i: number): InputValueDefinitionContext;
  public inputValueDefinition(
    i?: number
  ): InputValueDefinitionContext | InputValueDefinitionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(InputValueDefinitionContext);
    } else {
      return this.getRuleContext(i, InputValueDefinitionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_inputFieldsDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInputFieldsDefinition) {
      listener.enterInputFieldsDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInputFieldsDefinition) {
      listener.exitInputFieldsDefinition(this);
    }
  }
}

export class InputObjectTypeExtensionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_inputObjectTypeExtension;
  }
  public copyFrom(ctx: InputObjectTypeExtensionContext): void {
    super.copyFrom(ctx);
  }
}
export class InputObjectTypeExtensionWithDirectivesContext extends InputObjectTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directives(): DirectivesContext {
    return this.getRuleContext(0, DirectivesContext);
  }
  constructor(ctx: InputObjectTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInputObjectTypeExtensionWithDirectives) {
      listener.enterInputObjectTypeExtensionWithDirectives(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInputObjectTypeExtensionWithDirectives) {
      listener.exitInputObjectTypeExtensionWithDirectives(this);
    }
  }
}
export class InputObjectTypeExtensionWithFieldsContext extends InputObjectTypeExtensionContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public inputFieldsDefinition(): InputFieldsDefinitionContext {
    return this.getRuleContext(0, InputFieldsDefinitionContext);
  }
  public directives(): DirectivesContext | undefined {
    return this.tryGetRuleContext(0, DirectivesContext);
  }
  constructor(ctx: InputObjectTypeExtensionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterInputObjectTypeExtensionWithFields) {
      listener.enterInputObjectTypeExtensionWithFields(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitInputObjectTypeExtensionWithFields) {
      listener.exitInputObjectTypeExtensionWithFields(this);
    }
  }
}

export class DirectiveDefinitionContext extends ParserRuleContext {
  public NAME(): TerminalNode {
    return this.getToken(GraphQLParser.NAME, 0);
  }
  public directiveLocations(): DirectiveLocationsContext {
    return this.getRuleContext(0, DirectiveLocationsContext);
  }
  public description(): DescriptionContext | undefined {
    return this.tryGetRuleContext(0, DescriptionContext);
  }
  public argumentsDefinition(): ArgumentsDefinitionContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsDefinitionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_directiveDefinition;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDirectiveDefinition) {
      listener.enterDirectiveDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDirectiveDefinition) {
      listener.exitDirectiveDefinition(this);
    }
  }
}

export class DirectiveLocationsContext extends ParserRuleContext {
  public directiveLocation(): DirectiveLocationContext[];
  public directiveLocation(i: number): DirectiveLocationContext;
  public directiveLocation(
    i?: number
  ): DirectiveLocationContext | DirectiveLocationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DirectiveLocationContext);
    } else {
      return this.getRuleContext(i, DirectiveLocationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_directiveLocations;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDirectiveLocations) {
      listener.enterDirectiveLocations(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDirectiveLocations) {
      listener.exitDirectiveLocations(this);
    }
  }
}

export class DirectiveLocationContext extends ParserRuleContext {
  public executableDirectiveLocation():
    | ExecutableDirectiveLocationContext
    | undefined {
    return this.tryGetRuleContext(0, ExecutableDirectiveLocationContext);
  }
  public typeSystemDirectiveLocation():
    | TypeSystemDirectiveLocationContext
    | undefined {
    return this.tryGetRuleContext(0, TypeSystemDirectiveLocationContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_directiveLocation;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterDirectiveLocation) {
      listener.enterDirectiveLocation(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitDirectiveLocation) {
      listener.exitDirectiveLocation(this);
    }
  }
}

export class ExecutableDirectiveLocationContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_executableDirectiveLocation;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterExecutableDirectiveLocation) {
      listener.enterExecutableDirectiveLocation(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitExecutableDirectiveLocation) {
      listener.exitExecutableDirectiveLocation(this);
    }
  }
}

export class TypeSystemDirectiveLocationContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GraphQLParser.RULE_typeSystemDirectiveLocation;
  }
  // @Override
  public enterRule(listener: GraphQLListener): void {
    if (listener.enterTypeSystemDirectiveLocation) {
      listener.enterTypeSystemDirectiveLocation(this);
    }
  }
  // @Override
  public exitRule(listener: GraphQLListener): void {
    if (listener.exitTypeSystemDirectiveLocation) {
      listener.exitTypeSystemDirectiveLocation(this);
    }
  }
}
