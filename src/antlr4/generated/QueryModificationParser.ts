// Generated from QueryModification.g4 by ANTLR 4.7.3-SNAPSHOT

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
  public static readonly XSD_STRING = 23;
  public static readonly XSD_DECIMAL = 24;
  public static readonly XSD_DOUBLE = 25;
  public static readonly XSD_INTEGER = 26;
  public static readonly XSD_BOOLEAN = 27;
  public static readonly XSD_DATE = 28;
  public static readonly XSD_TIME = 29;
  public static readonly XSD_DATETIME = 30;
  public static readonly XSD_DURATION = 31;
  public static readonly XSD_MONTHDAY = 32;
  public static readonly AND = 33;
  public static readonly AS = 34;
  public static readonly ASC = 35;
  public static readonly BOOST = 36;
  public static readonly DESC = 37;
  public static readonly FALSE = 38;
  public static readonly IN = 39;
  public static readonly NOT = 40;
  public static readonly OF = 41;
  public static readonly OR = 42;
  public static readonly TRUE = 43;
  public static readonly IRI_REF = 44;
  public static readonly PNAME_NS = 45;
  public static readonly PNAME_LN = 46;
  public static readonly INTEGER = 47;
  public static readonly DECIMAL = 48;
  public static readonly DOUBLE = 49;
  public static readonly EXPONENT = 50;
  public static readonly STRING_LITERAL1 = 51;
  public static readonly STRING_LITERAL2 = 52;
  public static readonly ECHAR = 53;
  public static readonly EMPTY_PARENS = 54;
  public static readonly VARNAME = 55;
  public static readonly PN_PREFIX = 56;
  public static readonly PN_LOCAL = 57;
  public static readonly WS = 58;
  public static readonly RULE_filter = 0;
  public static readonly RULE_orderBys = 1;
  public static readonly RULE_orderBy = 2;
  public static readonly RULE_transforms = 3;
  public static readonly RULE_searchCondition = 4;
  public static readonly RULE_searchConditionAnd = 5;
  public static readonly RULE_searchConditionNot = 6;
  public static readonly RULE_predicate = 7;
  public static readonly RULE_expression = 8;
  public static readonly RULE_expressionAtom = 9;
  public static readonly RULE_expressionList = 10;
  public static readonly RULE_functionCall = 11;
  public static readonly RULE_xsdType = 12;
  public static readonly RULE_numericLiteral = 13;
  public static readonly RULE_varRef = 14;
  public static readonly RULE_fieldRef = 15;
  public static readonly RULE_comparisonOp = 16;
  public static readonly RULE_unaryOp = 17;
  public static readonly RULE_factorOp = 18;
  public static readonly RULE_termOp = 19;
  public static readonly RULE_stringLiteral = 20;
  public static readonly RULE_booleanLiteral = 21;
  public static readonly RULE_iriRef = 22;
  public static readonly RULE_prefixedName = 23;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'filter',
    'orderBys',
    'orderBy',
    'transforms',
    'searchCondition',
    'searchConditionAnd',
    'searchConditionNot',
    'predicate',
    'expression',
    'expressionAtom',
    'expressionList',
    'functionCall',
    'xsdType',
    'numericLiteral',
    'varRef',
    'fieldRef',
    'comparisonOp',
    'unaryOp',
    'factorOp',
    'termOp',
    'stringLiteral',
    'booleanLiteral',
    'iriRef',
    'prefixedName',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "','",
    "'|'",
    "'('",
    "')'",
    "'['",
    "']'",
    "'$'",
    "'>'",
    "'>='",
    "'<'",
    "'<='",
    "'='",
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
    "'xsd:string'",
    "'xsd:decimal'",
    "'xsd:double'",
    "'xsd:integer'",
    "'xsd:boolean'",
    "'xsd:date'",
    "'xsd_time'",
    "'xsd_datetime'",
    "'xsd:duration'",
    "'xsd:monthday'",
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
    'XSD_STRING',
    'XSD_DECIMAL',
    'XSD_DOUBLE',
    'XSD_INTEGER',
    'XSD_BOOLEAN',
    'XSD_DATE',
    'XSD_TIME',
    'XSD_DATETIME',
    'XSD_DURATION',
    'XSD_MONTHDAY',
    'AND',
    'AS',
    'ASC',
    'BOOST',
    'DESC',
    'FALSE',
    'IN',
    'NOT',
    'OF',
    'OR',
    'TRUE',
    'IRI_REF',
    'PNAME_NS',
    'PNAME_LN',
    'INTEGER',
    'DECIMAL',
    'DOUBLE',
    'EXPONENT',
    'STRING_LITERAL1',
    'STRING_LITERAL2',
    'ECHAR',
    'EMPTY_PARENS',
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
  // @NotNull
  public get vocabulary(): Vocabulary {
    return QueryModificationParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

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

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(QueryModificationParser._ATN, this);
  }
  // @RuleVersion(0)
  public filter(): FilterContext {
    let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, QueryModificationParser.RULE_filter);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 48;
        this.searchCondition();
        this.state = 49;
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
    this.enterRule(_localctx, 2, QueryModificationParser.RULE_orderBys);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 51;
        this.orderBy();
        this.state = 56;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 52;
              this.match(QueryModificationParser.T__0);
              this.state = 53;
              this.orderBy();
            }
          }
          this.state = 58;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 59;
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
    this.enterRule(_localctx, 4, QueryModificationParser.RULE_orderBy);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 61;
        this.fieldRef();
        this.state = 63;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === QueryModificationParser.ASC ||
          _la === QueryModificationParser.DESC
        ) {
          {
            this.state = 62;
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
    this.enterRule(_localctx, 6, QueryModificationParser.RULE_transforms);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 65;
        this.functionCall();
        this.state = 72;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          _la === QueryModificationParser.T__0 ||
          _la === QueryModificationParser.T__1 ||
          (((_la - 44) & ~0x1f) === 0 &&
            ((1 << (_la - 44)) &
              ((1 << (QueryModificationParser.IRI_REF - 44)) |
                (1 << (QueryModificationParser.PNAME_NS - 44)) |
                (1 << (QueryModificationParser.PNAME_LN - 44)))) !==
              0)
        ) {
          {
            {
              this.state = 67;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === QueryModificationParser.T__0 ||
                _la === QueryModificationParser.T__1
              ) {
                {
                  this.state = 66;
                  _la = this._input.LA(1);
                  if (
                    !(
                      _la === QueryModificationParser.T__0 ||
                      _la === QueryModificationParser.T__1
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

              this.state = 69;
              this.functionCall();
            }
          }
          this.state = 74;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 75;
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
  public searchCondition(): SearchConditionContext {
    let _localctx: SearchConditionContext = new SearchConditionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 8, QueryModificationParser.RULE_searchCondition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 77;
        this.searchConditionAnd();
        this.state = 82;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.OR) {
          {
            {
              this.state = 78;
              this.match(QueryModificationParser.OR);
              this.state = 79;
              this.searchConditionAnd();
            }
          }
          this.state = 84;
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
      10,
      QueryModificationParser.RULE_searchConditionAnd
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 85;
        this.searchConditionNot();
        this.state = 90;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.AND) {
          {
            {
              this.state = 86;
              this.match(QueryModificationParser.AND);
              this.state = 87;
              this.searchConditionNot();
            }
          }
          this.state = 92;
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
      12,
      QueryModificationParser.RULE_searchConditionNot
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 94;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === QueryModificationParser.NOT) {
          {
            this.state = 93;
            this.match(QueryModificationParser.NOT);
          }
        }

        this.state = 96;
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
    this.enterRule(_localctx, 14, QueryModificationParser.RULE_predicate);
    let _la: number;
    try {
      this.state = 120;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
        case 1:
          _localctx = new ComparisonPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 98;
            this.expression(0);
            this.state = 99;
            this.comparisonOp();
            this.state = 100;
            this.expression(0);
          }
          break;

        case 2:
          _localctx = new InPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 102;
            this.expression(0);
            this.state = 104;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.NOT) {
              {
                this.state = 103;
                this.match(QueryModificationParser.NOT);
              }
            }

            this.state = 106;
            this.match(QueryModificationParser.IN);
            this.state = 107;
            this.expressionList();
          }
          break;

        case 3:
          _localctx = new InVarPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 109;
            this.expression(0);
            this.state = 111;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === QueryModificationParser.NOT) {
              {
                this.state = 110;
                this.match(QueryModificationParser.NOT);
              }
            }

            this.state = 113;
            this.match(QueryModificationParser.IN);
            this.state = 114;
            this.varRef();
          }
          break;

        case 4:
          _localctx = new ParenPredicateContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 116;
            this.match(QueryModificationParser.T__2);
            this.state = 117;
            this.searchCondition();
            this.state = 118;
            this.match(QueryModificationParser.T__3);
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
    let _startState: number = 16;
    this.enterRecursionRule(
      _localctx,
      16,
      QueryModificationParser.RULE_expression,
      _p
    );
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 131;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case QueryModificationParser.T__17:
          case QueryModificationParser.T__18:
            {
              _localctx = new UnaryExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;

              this.state = 123;
              this.unaryOp();
              this.state = 124;
              this.expression(5);
            }
            break;
          case QueryModificationParser.T__6:
          case QueryModificationParser.FALSE:
          case QueryModificationParser.TRUE:
          case QueryModificationParser.IRI_REF:
          case QueryModificationParser.PNAME_NS:
          case QueryModificationParser.PNAME_LN:
          case QueryModificationParser.INTEGER:
          case QueryModificationParser.DECIMAL:
          case QueryModificationParser.DOUBLE:
          case QueryModificationParser.STRING_LITERAL1:
          case QueryModificationParser.VARNAME:
            {
              _localctx = new PrimitiveExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 126;
              this.expressionAtom();
            }
            break;
          case QueryModificationParser.T__2:
            {
              _localctx = new ParenExpressionContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 127;
              this.match(QueryModificationParser.T__2);
              this.state = 128;
              this.expression(0);
              this.state = 129;
              this.match(QueryModificationParser.T__3);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 143;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 141;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 11, this._ctx)
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
                    this.state = 133;
                    if (!this.precpred(this._ctx, 4)) {
                      throw new FailedPredicateException(
                        this,
                        'this.precpred(this._ctx, 4)'
                      );
                    }
                    this.state = 134;
                    this.factorOp();
                    this.state = 135;
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
                    this.state = 137;
                    if (!this.precpred(this._ctx, 3)) {
                      throw new FailedPredicateException(
                        this,
                        'this.precpred(this._ctx, 3)'
                      );
                    }
                    this.state = 138;
                    this.termOp();
                    this.state = 139;
                    this.expression(4);
                  }
                  break;
              }
            }
          }
          this.state = 145;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
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
    this.enterRule(_localctx, 18, QueryModificationParser.RULE_expressionAtom);
    try {
      this.state = 153;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
        case 1:
          _localctx = new FunctionCallAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 146;
            this.functionCall();
          }
          break;

        case 2:
          _localctx = new StringLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 147;
            this.stringLiteral();
          }
          break;

        case 3:
          _localctx = new NumericLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 148;
            this.numericLiteral();
          }
          break;

        case 4:
          _localctx = new BooleanLiteralAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 149;
            this.booleanLiteral();
          }
          break;

        case 5:
          _localctx = new IriRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 150;
            this.iriRef();
          }
          break;

        case 6:
          _localctx = new FieldRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 151;
            this.fieldRef();
          }
          break;

        case 7:
          _localctx = new VarRefAtomContext(_localctx);
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 152;
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
  public expressionList(): ExpressionListContext {
    let _localctx: ExpressionListContext = new ExpressionListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 20, QueryModificationParser.RULE_expressionList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 155;
        this.match(QueryModificationParser.T__2);
        this.state = 156;
        this.expression(0);
        this.state = 161;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === QueryModificationParser.T__0) {
          {
            {
              this.state = 157;
              this.match(QueryModificationParser.T__0);
              this.state = 158;
              this.expression(0);
            }
          }
          this.state = 163;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 164;
        this.match(QueryModificationParser.T__3);
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
    this.enterRule(_localctx, 22, QueryModificationParser.RULE_functionCall);
    try {
      this.state = 178;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
        case 1:
          _localctx = new FuncWithoutArgsContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 166;
            this.iriRef();
            this.state = 167;
            this.match(QueryModificationParser.T__4);
            this.state = 168;
            this.xsdType();
            this.state = 169;
            this.match(QueryModificationParser.T__5);
            this.state = 170;
            this.match(QueryModificationParser.EMPTY_PARENS);
          }
          break;

        case 2:
          _localctx = new FuncWithArgsContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 172;
            this.iriRef();
            this.state = 173;
            this.match(QueryModificationParser.T__4);
            this.state = 174;
            this.xsdType();
            this.state = 175;
            this.match(QueryModificationParser.T__5);
            this.state = 176;
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
  public xsdType(): XsdTypeContext {
    let _localctx: XsdTypeContext = new XsdTypeContext(this._ctx, this.state);
    this.enterRule(_localctx, 24, QueryModificationParser.RULE_xsdType);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 180;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 23) & ~0x1f) === 0 &&
            ((1 << (_la - 23)) &
              ((1 << (QueryModificationParser.XSD_STRING - 23)) |
                (1 << (QueryModificationParser.XSD_DECIMAL - 23)) |
                (1 << (QueryModificationParser.XSD_DOUBLE - 23)) |
                (1 << (QueryModificationParser.XSD_INTEGER - 23)) |
                (1 << (QueryModificationParser.XSD_BOOLEAN - 23)) |
                (1 << (QueryModificationParser.XSD_DATE - 23)) |
                (1 << (QueryModificationParser.XSD_TIME - 23)) |
                (1 << (QueryModificationParser.XSD_DATETIME - 23)) |
                (1 << (QueryModificationParser.XSD_DURATION - 23)) |
                (1 << (QueryModificationParser.XSD_MONTHDAY - 23)))) !==
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
  public numericLiteral(): NumericLiteralContext {
    let _localctx: NumericLiteralContext = new NumericLiteralContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 26, QueryModificationParser.RULE_numericLiteral);
    try {
      this.state = 185;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.INTEGER:
          _localctx = new IntegerLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 182;
            this.match(QueryModificationParser.INTEGER);
          }
          break;
        case QueryModificationParser.DECIMAL:
          _localctx = new DecimalLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 183;
            this.match(QueryModificationParser.DECIMAL);
          }
          break;
        case QueryModificationParser.DOUBLE:
          _localctx = new DoubleLiteralContext(_localctx);
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 184;
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
    this.enterRule(_localctx, 28, QueryModificationParser.RULE_varRef);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 187;
        this.match(QueryModificationParser.T__6);
        this.state = 188;
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
    this.enterRule(_localctx, 30, QueryModificationParser.RULE_fieldRef);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 190;
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
    this.enterRule(_localctx, 32, QueryModificationParser.RULE_comparisonOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 192;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << QueryModificationParser.T__7) |
                (1 << QueryModificationParser.T__8) |
                (1 << QueryModificationParser.T__9) |
                (1 << QueryModificationParser.T__10) |
                (1 << QueryModificationParser.T__11) |
                (1 << QueryModificationParser.T__12) |
                (1 << QueryModificationParser.T__13) |
                (1 << QueryModificationParser.T__14) |
                (1 << QueryModificationParser.T__15) |
                (1 << QueryModificationParser.T__16))) !==
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
    this.enterRule(_localctx, 34, QueryModificationParser.RULE_unaryOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 194;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.T__17 ||
            _la === QueryModificationParser.T__18
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
    this.enterRule(_localctx, 36, QueryModificationParser.RULE_factorOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 196;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << QueryModificationParser.T__19) |
                (1 << QueryModificationParser.T__20) |
                (1 << QueryModificationParser.T__21))) !==
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
    this.enterRule(_localctx, 38, QueryModificationParser.RULE_termOp);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 198;
        _la = this._input.LA(1);
        if (
          !(
            _la === QueryModificationParser.T__17 ||
            _la === QueryModificationParser.T__18
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
    this.enterRule(_localctx, 40, QueryModificationParser.RULE_stringLiteral);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 200;
        this.match(QueryModificationParser.STRING_LITERAL1);
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
    this.enterRule(_localctx, 42, QueryModificationParser.RULE_booleanLiteral);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 202;
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
  public iriRef(): IriRefContext {
    let _localctx: IriRefContext = new IriRefContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, QueryModificationParser.RULE_iriRef);
    try {
      this.state = 206;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case QueryModificationParser.IRI_REF:
          _localctx = new LiteralIriRefContext(_localctx);
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 204;
            this.match(QueryModificationParser.IRI_REF);
          }
          break;
        case QueryModificationParser.PNAME_NS:
        case QueryModificationParser.PNAME_LN:
          _localctx = new PrefixedNameIriRefContext(_localctx);
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 205;
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
    this.enterRule(_localctx, 46, QueryModificationParser.RULE_prefixedName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 208;
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

  public sempred(
    _localctx: RuleContext,
    ruleIndex: number,
    predIndex: number
  ): boolean {
    switch (ruleIndex) {
      case 8:
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

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03<\xD5\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03' +
    '\x07\x039\n\x03\f\x03\x0E\x03<\v\x03\x03\x03\x03\x03\x03\x04\x03\x04\x05' +
    '\x04B\n\x04\x03\x05\x03\x05\x05\x05F\n\x05\x03\x05\x07\x05I\n\x05\f\x05' +
    '\x0E\x05L\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x07\x06S\n\x06' +
    '\f\x06\x0E\x06V\v\x06\x03\x07\x03\x07\x03\x07\x07\x07[\n\x07\f\x07\x0E' +
    '\x07^\v\x07\x03\b\x05\ba\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t' +
    '\x03\t\x05\tk\n\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\tr\n\t\x03\t\x03\t' +
    '\x03\t\x03\t\x03\t\x03\t\x03\t\x05\t{\n\t\x03\n\x03\n\x03\n\x03\n\x03' +
    '\n\x03\n\x03\n\x03\n\x03\n\x05\n\x86\n\n\x03\n\x03\n\x03\n\x03\n\x03\n' +
    '\x03\n\x03\n\x03\n\x07\n\x90\n\n\f\n\x0E\n\x93\v\n\x03\v\x03\v\x03\v\x03' +
    '\v\x03\v\x03\v\x03\v\x05\v\x9C\n\v\x03\f\x03\f\x03\f\x03\f\x07\f\xA2\n' +
    '\f\f\f\x0E\f\xA5\v\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03' +
    '\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\xB5\n\r\x03\x0E\x03\x0E\x03\x0F' +
    '\x03\x0F\x03\x0F\x05\x0F\xBC\n\x0F\x03\x10\x03\x10\x03\x10\x03\x11\x03' +
    '\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03' +
    '\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x05\x18\xD1\n\x18\x03\x19' +
    '\x03\x19\x03\x19\x02\x02\x03\x12\x1A\x02\x02\x04\x02\x06\x02\b\x02\n\x02' +
    '\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02' +
    '\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x02\x02\n\x04\x02%' +
    "%''\x03\x02\x03\x04\x03\x02\x19\"\x03\x02\n\x13\x03\x02\x14\x15\x03" +
    '\x02\x16\x18\x04\x02((--\x03\x02/0\x02\xD7\x022\x03\x02\x02\x02\x045\x03' +
    '\x02\x02\x02\x06?\x03\x02\x02\x02\bC\x03\x02\x02\x02\nO\x03\x02\x02\x02' +
    '\fW\x03\x02\x02\x02\x0E`\x03\x02\x02\x02\x10z\x03\x02\x02\x02\x12\x85' +
    '\x03\x02\x02\x02\x14\x9B\x03\x02\x02\x02\x16\x9D\x03\x02\x02\x02\x18\xB4' +
    '\x03\x02\x02\x02\x1A\xB6\x03\x02\x02\x02\x1C\xBB\x03\x02\x02\x02\x1E\xBD' +
    '\x03\x02\x02\x02 \xC0\x03\x02\x02\x02"\xC2\x03\x02\x02\x02$\xC4\x03\x02' +
    '\x02\x02&\xC6\x03\x02\x02\x02(\xC8\x03\x02\x02\x02*\xCA\x03\x02\x02\x02' +
    ',\xCC\x03\x02\x02\x02.\xD0\x03\x02\x02\x020\xD2\x03\x02\x02\x0223\x05' +
    '\n\x06\x0234\x07\x02\x02\x034\x03\x03\x02\x02\x025:\x05\x06\x04\x0267' +
    '\x07\x03\x02\x0279\x05\x06\x04\x0286\x03\x02\x02\x029<\x03\x02\x02\x02' +
    ':8\x03\x02\x02\x02:;\x03\x02\x02\x02;=\x03\x02\x02\x02<:\x03\x02\x02\x02' +
    '=>\x07\x02\x02\x03>\x05\x03\x02\x02\x02?A\x05 \x11\x02@B\t\x02\x02\x02' +
    'A@\x03\x02\x02\x02AB\x03\x02\x02\x02B\x07\x03\x02\x02\x02CJ\x05\x18\r' +
    '\x02DF\t\x03\x02\x02ED\x03\x02\x02\x02EF\x03\x02\x02\x02FG\x03\x02\x02' +
    '\x02GI\x05\x18\r\x02HE\x03\x02\x02\x02IL\x03\x02\x02\x02JH\x03\x02\x02' +
    '\x02JK\x03\x02\x02\x02KM\x03\x02\x02\x02LJ\x03\x02\x02\x02MN\x07\x02\x02' +
    '\x03N\t\x03\x02\x02\x02OT\x05\f\x07\x02PQ\x07,\x02\x02QS\x05\f\x07\x02' +
    'RP\x03\x02\x02\x02SV\x03\x02\x02\x02TR\x03\x02\x02\x02TU\x03\x02\x02\x02' +
    'U\v\x03\x02\x02\x02VT\x03\x02\x02\x02W\\\x05\x0E\b\x02XY\x07#\x02\x02' +
    'Y[\x05\x0E\b\x02ZX\x03\x02\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02\x02\x02' +
    '\\]\x03\x02\x02\x02]\r\x03\x02\x02\x02^\\\x03\x02\x02\x02_a\x07*\x02\x02' +
    '`_\x03\x02\x02\x02`a\x03\x02\x02\x02ab\x03\x02\x02\x02bc\x05\x10\t\x02' +
    'c\x0F\x03\x02\x02\x02de\x05\x12\n\x02ef\x05"\x12\x02fg\x05\x12\n\x02' +
    'g{\x03\x02\x02\x02hj\x05\x12\n\x02ik\x07*\x02\x02ji\x03\x02\x02\x02jk' +
    '\x03\x02\x02\x02kl\x03\x02\x02\x02lm\x07)\x02\x02mn\x05\x16\f\x02n{\x03' +
    '\x02\x02\x02oq\x05\x12\n\x02pr\x07*\x02\x02qp\x03\x02\x02\x02qr\x03\x02' +
    '\x02\x02rs\x03\x02\x02\x02st\x07)\x02\x02tu\x05\x1E\x10\x02u{\x03\x02' +
    '\x02\x02vw\x07\x05\x02\x02wx\x05\n\x06\x02xy\x07\x06\x02\x02y{\x03\x02' +
    '\x02\x02zd\x03\x02\x02\x02zh\x03\x02\x02\x02zo\x03\x02\x02\x02zv\x03\x02' +
    '\x02\x02{\x11\x03\x02\x02\x02|}\b\n\x01\x02}~\x05$\x13\x02~\x7F\x05\x12' +
    '\n\x07\x7F\x86\x03\x02\x02\x02\x80\x86\x05\x14\v\x02\x81\x82\x07\x05\x02' +
    '\x02\x82\x83\x05\x12\n\x02\x83\x84\x07\x06\x02\x02\x84\x86\x03\x02\x02' +
    '\x02\x85|\x03\x02\x02\x02\x85\x80\x03\x02\x02\x02\x85\x81\x03\x02\x02' +
    '\x02\x86\x91\x03\x02\x02\x02\x87\x88\f\x06\x02\x02\x88\x89\x05&\x14\x02' +
    '\x89\x8A\x05\x12\n\x07\x8A\x90\x03\x02\x02\x02\x8B\x8C\f\x05\x02\x02\x8C' +
    '\x8D\x05(\x15\x02\x8D\x8E\x05\x12\n\x06\x8E\x90\x03\x02\x02\x02\x8F\x87' +
    '\x03\x02\x02\x02\x8F\x8B\x03\x02\x02\x02\x90\x93\x03\x02\x02\x02\x91\x8F' +
    '\x03\x02\x02\x02\x91\x92\x03\x02\x02\x02\x92\x13\x03\x02\x02\x02\x93\x91' +
    '\x03\x02\x02\x02\x94\x9C\x05\x18\r\x02\x95\x9C\x05*\x16\x02\x96\x9C\x05' +
    '\x1C\x0F\x02\x97\x9C\x05,\x17\x02\x98\x9C\x05.\x18\x02\x99\x9C\x05 \x11' +
    '\x02\x9A\x9C\x05\x1E\x10\x02\x9B\x94\x03\x02\x02\x02\x9B\x95\x03\x02\x02' +
    '\x02\x9B\x96\x03\x02\x02\x02\x9B\x97\x03\x02\x02\x02\x9B\x98\x03\x02\x02' +
    '\x02\x9B\x99\x03\x02\x02\x02\x9B\x9A\x03\x02\x02\x02\x9C\x15\x03\x02\x02' +
    '\x02\x9D\x9E\x07\x05\x02\x02\x9E\xA3\x05\x12\n\x02\x9F\xA0\x07\x03\x02' +
    '\x02\xA0\xA2\x05\x12\n\x02\xA1\x9F\x03\x02\x02\x02\xA2\xA5\x03\x02\x02' +
    '\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA6\x03\x02\x02' +
    '\x02\xA5\xA3\x03\x02\x02\x02\xA6\xA7\x07\x06\x02\x02\xA7\x17\x03\x02\x02' +
    '\x02\xA8\xA9\x05.\x18\x02\xA9\xAA\x07\x07\x02\x02\xAA\xAB\x05\x1A\x0E' +
    '\x02\xAB\xAC\x07\b\x02\x02\xAC\xAD\x078\x02\x02\xAD\xB5\x03\x02\x02\x02' +
    '\xAE\xAF\x05.\x18\x02\xAF\xB0\x07\x07\x02\x02\xB0\xB1\x05\x1A\x0E\x02' +
    '\xB1\xB2\x07\b\x02\x02\xB2\xB3\x05\x16\f\x02\xB3\xB5\x03\x02\x02\x02\xB4' +
    '\xA8\x03\x02\x02\x02\xB4\xAE\x03\x02\x02\x02\xB5\x19\x03\x02\x02\x02\xB6' +
    '\xB7\t\x04\x02\x02\xB7\x1B\x03\x02\x02\x02\xB8\xBC\x071\x02\x02\xB9\xBC' +
    '\x072\x02\x02\xBA\xBC\x073\x02\x02\xBB\xB8\x03\x02\x02\x02\xBB\xB9\x03' +
    '\x02\x02\x02\xBB\xBA\x03\x02\x02\x02\xBC\x1D\x03\x02\x02\x02\xBD\xBE\x07' +
    '\t\x02\x02\xBE\xBF\x079\x02\x02\xBF\x1F\x03\x02\x02\x02\xC0\xC1\x079\x02' +
    '\x02\xC1!\x03\x02\x02\x02\xC2\xC3\t\x05\x02\x02\xC3#\x03\x02\x02\x02\xC4' +
    "\xC5\t\x06\x02\x02\xC5%\x03\x02\x02\x02\xC6\xC7\t\x07\x02\x02\xC7'\x03" +
    '\x02\x02\x02\xC8\xC9\t\x06\x02\x02\xC9)\x03\x02\x02\x02\xCA\xCB\x075\x02' +
    '\x02\xCB+\x03\x02\x02\x02\xCC\xCD\t\b\x02\x02\xCD-\x03\x02\x02\x02\xCE' +
    '\xD1\x07.\x02\x02\xCF\xD1\x050\x19\x02\xD0\xCE\x03\x02\x02\x02\xD0\xCF' +
    '\x03\x02\x02\x02\xD1/\x03\x02\x02\x02\xD2\xD3\t\t\x02\x02\xD31\x03\x02' +
    '\x02\x02\x14:AEJT\\`jqz\x85\x8F\x91\x9B\xA3\xB4\xBB\xD0';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!QueryModificationParser.__ATN) {
      QueryModificationParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(QueryModificationParser._serializedATN)
      );
    }

    return QueryModificationParser.__ATN;
  }
}

export class FilterContext extends ParserRuleContext {
  public searchCondition(): SearchConditionContext {
    return this.getRuleContext(0, SearchConditionContext);
  }
  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_filter;
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

export class OrderBysContext extends ParserRuleContext {
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
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_orderBys;
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
  public fieldRef(): FieldRefContext {
    return this.getRuleContext(0, FieldRefContext);
  }
  public ASC(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.ASC, 0);
  }
  public DESC(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.DESC, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_orderBy;
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
  public functionCall(): FunctionCallContext[];
  public functionCall(i: number): FunctionCallContext;
  public functionCall(i?: number): FunctionCallContext | FunctionCallContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FunctionCallContext);
    } else {
      return this.getRuleContext(i, FunctionCallContext);
    }
  }
  public EOF(): TerminalNode {
    return this.getToken(QueryModificationParser.EOF, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_transforms;
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

export class SearchConditionContext extends ParserRuleContext {
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
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchCondition;
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
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchConditionAnd;
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
  public predicate(): PredicateContext {
    return this.getRuleContext(0, PredicateContext);
  }
  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.NOT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_searchConditionNot;
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
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class InPredicateContext extends PredicateContext {
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
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class InVarPredicateContext extends PredicateContext {
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
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class ParenPredicateContext extends PredicateContext {
  public searchCondition(): SearchConditionContext {
    return this.getRuleContext(0, SearchConditionContext);
  }
  constructor(ctx: PredicateContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class UnaryExpressionContext extends ExpressionContext {
  public unaryOp(): UnaryOpContext {
    return this.getRuleContext(0, UnaryOpContext);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class FactorExpressionContext extends ExpressionContext {
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
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class TermExpressionContext extends ExpressionContext {
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
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class PrimitiveExpressionContext extends ExpressionContext {
  public expressionAtom(): ExpressionAtomContext {
    return this.getRuleContext(0, ExpressionAtomContext);
  }
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class ParenExpressionContext extends ExpressionContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class FunctionCallAtomContext extends ExpressionAtomContext {
  public functionCall(): FunctionCallContext {
    return this.getRuleContext(0, FunctionCallContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class StringLiteralAtomContext extends ExpressionAtomContext {
  public stringLiteral(): StringLiteralContext {
    return this.getRuleContext(0, StringLiteralContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class NumericLiteralAtomContext extends ExpressionAtomContext {
  public numericLiteral(): NumericLiteralContext {
    return this.getRuleContext(0, NumericLiteralContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
  public booleanLiteral(): BooleanLiteralContext {
    return this.getRuleContext(0, BooleanLiteralContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class IriRefAtomContext extends ExpressionAtomContext {
  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class FieldRefAtomContext extends ExpressionAtomContext {
  public fieldRef(): FieldRefContext {
    return this.getRuleContext(0, FieldRefContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class VarRefAtomContext extends ExpressionAtomContext {
  public varRef(): VarRefContext {
    return this.getRuleContext(0, VarRefContext);
  }
  constructor(ctx: ExpressionAtomContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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

export class ExpressionListContext extends ParserRuleContext {
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_expressionList;
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
export class FuncWithoutArgsContext extends FunctionCallContext {
  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }
  public xsdType(): XsdTypeContext {
    return this.getRuleContext(0, XsdTypeContext);
  }
  public EMPTY_PARENS(): TerminalNode {
    return this.getToken(QueryModificationParser.EMPTY_PARENS, 0);
  }
  constructor(ctx: FunctionCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class FuncWithArgsContext extends FunctionCallContext {
  public iriRef(): IriRefContext {
    return this.getRuleContext(0, IriRefContext);
  }
  public xsdType(): XsdTypeContext {
    return this.getRuleContext(0, XsdTypeContext);
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }
  constructor(ctx: FunctionCallContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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

export class XsdTypeContext extends ParserRuleContext {
  public XSD_STRING(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_STRING, 0);
  }
  public XSD_DECIMAL(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_DECIMAL, 0);
  }
  public XSD_DOUBLE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_DOUBLE, 0);
  }
  public XSD_INTEGER(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_INTEGER, 0);
  }
  public XSD_BOOLEAN(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_BOOLEAN, 0);
  }
  public XSD_DATE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_DATE, 0);
  }
  public XSD_TIME(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_TIME, 0);
  }
  public XSD_DATETIME(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_DATETIME, 0);
  }
  public XSD_DURATION(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_DURATION, 0);
  }
  public XSD_MONTHDAY(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.XSD_MONTHDAY, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_xsdType;
  }
  // @Override
  public enterRule(listener: QueryModificationListener): void {
    if (listener.enterXsdType) {
      listener.enterXsdType(this);
    }
  }
  // @Override
  public exitRule(listener: QueryModificationListener): void {
    if (listener.exitXsdType) {
      listener.exitXsdType(this);
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
export class IntegerLiteralContext extends NumericLiteralContext {
  public INTEGER(): TerminalNode {
    return this.getToken(QueryModificationParser.INTEGER, 0);
  }
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
export class DecimalLiteralContext extends NumericLiteralContext {
  public DECIMAL(): TerminalNode {
    return this.getToken(QueryModificationParser.DECIMAL, 0);
  }
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
  public DOUBLE(): TerminalNode {
    return this.getToken(QueryModificationParser.DOUBLE, 0);
  }
  constructor(ctx: NumericLiteralContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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

export class VarRefContext extends ParserRuleContext {
  public VARNAME(): TerminalNode {
    return this.getToken(QueryModificationParser.VARNAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_varRef;
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
  public VARNAME(): TerminalNode {
    return this.getToken(QueryModificationParser.VARNAME, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_fieldRef;
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
  public STRING_LITERAL1(): TerminalNode {
    return this.getToken(QueryModificationParser.STRING_LITERAL1, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_stringLiteral;
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

export class BooleanLiteralContext extends ParserRuleContext {
  public TRUE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.TRUE, 0);
  }
  public FALSE(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.FALSE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_booleanLiteral;
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
  public IRI_REF(): TerminalNode {
    return this.getToken(QueryModificationParser.IRI_REF, 0);
  }
  constructor(ctx: IriRefContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
  public prefixedName(): PrefixedNameContext {
    return this.getRuleContext(0, PrefixedNameContext);
  }
  constructor(ctx: IriRefContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
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
  public PNAME_LN(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.PNAME_LN, 0);
  }
  public PNAME_NS(): TerminalNode | undefined {
    return this.tryGetToken(QueryModificationParser.PNAME_NS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return QueryModificationParser.RULE_prefixedName;
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
