// Generated from GraphQL.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { GraphQLListener } from "./GraphQLListener";

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
	public static readonly BOOLEAN = 31;
	public static readonly NAMETYPE = 32;
	public static readonly NAME = 33;
	public static readonly STRING = 34;
	public static readonly COMMENT = 35;
	public static readonly NUMBER = 36;
	public static readonly WS = 37;
	public static readonly RULE_document = 0;
	public static readonly RULE_definition = 1;
	public static readonly RULE_operationDefinition = 2;
	public static readonly RULE_selectionSet = 3;
	public static readonly RULE_operationType = 4;
	public static readonly RULE_selection = 5;
	public static readonly RULE_field = 6;
	public static readonly RULE_fieldName = 7;
	public static readonly RULE_alias = 8;
	public static readonly RULE_arguments = 9;
	public static readonly RULE_argument = 10;
	public static readonly RULE_fragmentSpread = 11;
	public static readonly RULE_inlineFragment = 12;
	public static readonly RULE_fragmentDefinition = 13;
	public static readonly RULE_fragmentName = 14;
	public static readonly RULE_typeSystemDefinition = 15;
	public static readonly RULE_typeDefinition = 16;
	public static readonly RULE_scalarType = 17;
	public static readonly RULE_scalarTypeDefinition = 18;
	public static readonly RULE_objectType = 19;
	public static readonly RULE_objectTypeDefinition = 20;
	public static readonly RULE_implementsInterfaces = 21;
	public static readonly RULE_implementsList = 22;
	public static readonly RULE_fieldDefinition = 23;
	public static readonly RULE_deprecated = 24;
	public static readonly RULE_deprecationReason = 25;
	public static readonly RULE_argumentsDefinition = 26;
	public static readonly RULE_inputValueDefinition = 27;
	public static readonly RULE_interfaceType = 28;
	public static readonly RULE_interfaceTypeDefinition = 29;
	public static readonly RULE_unionType = 30;
	public static readonly RULE_unionTypeDefinition = 31;
	public static readonly RULE_unionMembers = 32;
	public static readonly RULE_value = 33;
	public static readonly RULE_enumType = 34;
	public static readonly RULE_enumTypeDefinition = 35;
	public static readonly RULE_enumValueDefinition = 36;
	public static readonly RULE_enumValue = 37;
	public static readonly RULE_inputObjectTypeDefinition = 38;
	public static readonly RULE_typeExtensionDefinition = 39;
	public static readonly RULE_directiveDefinition = 40;
	public static readonly RULE_directiveLocations = 41;
	public static readonly RULE_directives = 42;
	public static readonly RULE_directive = 43;
	public static readonly RULE_typeCondition = 44;
	public static readonly RULE_variableDefinitions = 45;
	public static readonly RULE_variableDefinition = 46;
	public static readonly RULE_variable = 47;
	public static readonly RULE_defaultValue = 48;
	public static readonly RULE_valueOrVariable = 49;
	public static readonly RULE_type = 50;
	public static readonly RULE_typeName = 51;
	public static readonly RULE_listType = 52;
	public static readonly RULE_nonNullType = 53;
	public static readonly RULE_array = 54;
	public static readonly RULE_schemaDefinition = 55;
	public static readonly RULE_schemaQueryDefinition = 56;
	public static readonly RULE_schemaMutationDefinition = 57;
	public static readonly RULE_schemaSubscriptionDefinition = 58;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"document", "definition", "operationDefinition", "selectionSet", "operationType", 
		"selection", "field", "fieldName", "alias", "arguments", "argument", "fragmentSpread", 
		"inlineFragment", "fragmentDefinition", "fragmentName", "typeSystemDefinition", 
		"typeDefinition", "scalarType", "scalarTypeDefinition", "objectType", 
		"objectTypeDefinition", "implementsInterfaces", "implementsList", "fieldDefinition", 
		"deprecated", "deprecationReason", "argumentsDefinition", "inputValueDefinition", 
		"interfaceType", "interfaceTypeDefinition", "unionType", "unionTypeDefinition", 
		"unionMembers", "value", "enumType", "enumTypeDefinition", "enumValueDefinition", 
		"enumValue", "inputObjectTypeDefinition", "typeExtensionDefinition", "directiveDefinition", 
		"directiveLocations", "directives", "directive", "typeCondition", "variableDefinitions", 
		"variableDefinition", "variable", "defaultValue", "valueOrVariable", "type", 
		"typeName", "listType", "nonNullType", "array", "schemaDefinition", "schemaQueryDefinition", 
		"schemaMutationDefinition", "schemaSubscriptionDefinition",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "','", "'}'", "'query'", "'mutation'", "'subscription'", 
		"':'", "'('", "')'", "'...'", "'on'", "'fragment'", "'scalar'", "'implements'", 
		"'&'", "'@'", "'deprecated'", "'interface'", "'union'", "'='", "'|'", 
		"'enum'", "'input'", "'extend'", "'directive'", "'$'", "'['", "']'", "'!'", 
		"'schema'", undefined, "'type'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "BOOLEAN", "NAMETYPE", "NAME", "STRING", 
		"COMMENT", "NUMBER", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(GraphQLParser._LITERAL_NAMES, GraphQLParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return GraphQLParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "GraphQL.g4"; }

	// @Override
	public get ruleNames(): string[] { return GraphQLParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return GraphQLParser._serializedATN; }

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
			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 118;
				this.definition();
				}
				}
				this.state = 121;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GraphQLParser.T__0) | (1 << GraphQLParser.T__3) | (1 << GraphQLParser.T__4) | (1 << GraphQLParser.T__5) | (1 << GraphQLParser.T__11) | (1 << GraphQLParser.T__12) | (1 << GraphQLParser.T__17) | (1 << GraphQLParser.T__18) | (1 << GraphQLParser.T__21) | (1 << GraphQLParser.T__22) | (1 << GraphQLParser.T__23) | (1 << GraphQLParser.T__24) | (1 << GraphQLParser.T__29))) !== 0) || _la === GraphQLParser.NAMETYPE || _la === GraphQLParser.COMMENT);
			this.state = 123;
			this.match(GraphQLParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public definition(): DefinitionContext {
		let _localctx: DefinitionContext = new DefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, GraphQLParser.RULE_definition);
		try {
			this.state = 128;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 125;
				this.operationDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 126;
				this.fragmentDefinition();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 127;
				this.typeSystemDefinition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operationDefinition(): OperationDefinitionContext {
		let _localctx: OperationDefinitionContext = new OperationDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, GraphQLParser.RULE_operationDefinition);
		let _la: number;
		try {
			this.state = 153;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				_localctx = new SelectionOnlyOperationDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GraphQLParser.COMMENT) {
					{
					{
					this.state = 130;
					this.match(GraphQLParser.COMMENT);
					}
					}
					this.state = 135;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 136;
				this.selectionSet();
				}
				break;

			case 2:
				_localctx = new FullOperationDefinitionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GraphQLParser.COMMENT) {
					{
					{
					this.state = 137;
					this.match(GraphQLParser.COMMENT);
					}
					}
					this.state = 142;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 143;
				this.operationType();
				this.state = 144;
				this.match(GraphQLParser.NAME);
				this.state = 146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__7) {
					{
					this.state = 145;
					this.variableDefinitions();
					}
				}

				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__15) {
					{
					this.state = 148;
					this.directives();
					}
				}

				this.state = 151;
				this.selectionSet();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectionSet(): SelectionSetContext {
		let _localctx: SelectionSetContext = new SelectionSetContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, GraphQLParser.RULE_selectionSet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			this.match(GraphQLParser.T__0);
			this.state = 156;
			this.selection();
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__1 || _la === GraphQLParser.T__9 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (GraphQLParser.NAMETYPE - 32)) | (1 << (GraphQLParser.NAME - 32)) | (1 << (GraphQLParser.COMMENT - 32)))) !== 0)) {
				{
				{
				this.state = 158;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1) {
					{
					this.state = 157;
					this.match(GraphQLParser.T__1);
					}
				}

				this.state = 160;
				this.selection();
				}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 166;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operationType(): OperationTypeContext {
		let _localctx: OperationTypeContext = new OperationTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, GraphQLParser.RULE_operationType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GraphQLParser.T__3) | (1 << GraphQLParser.T__4) | (1 << GraphQLParser.T__5))) !== 0))) {
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
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selection(): SelectionContext {
		let _localctx: SelectionContext = new SelectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, GraphQLParser.RULE_selection);
		try {
			this.state = 173;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				_localctx = new FieldSelectionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 170;
				this.field();
				}
				break;

			case 2:
				_localctx = new FragmentSpreadSelectionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 171;
				this.fragmentSpread();
				}
				break;

			case 3:
				_localctx = new InlineFragmentSelectionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 172;
				this.inlineFragment();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public field(): FieldContext {
		let _localctx: FieldContext = new FieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, GraphQLParser.RULE_field);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 175;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 181;
			this.fieldName();
			this.state = 183;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__7) {
				{
				this.state = 182;
				this.arguments();
				}
			}

			this.state = 186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 185;
				this.directives();
				}
			}

			this.state = 189;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__0) {
				{
				this.state = 188;
				this.selectionSet();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldName(): FieldNameContext {
		let _localctx: FieldNameContext = new FieldNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, GraphQLParser.RULE_fieldName);
		try {
			this.state = 194;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 191;
				this.match(GraphQLParser.NAMETYPE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 192;
				this.alias();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 193;
				this.match(GraphQLParser.NAME);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
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
			this.state = 196;
			this.match(GraphQLParser.NAME);
			this.state = 197;
			this.match(GraphQLParser.T__6);
			this.state = 198;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let _localctx: ArgumentsContext = new ArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, GraphQLParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			this.match(GraphQLParser.T__7);
			this.state = 201;
			this.argument();
			this.state = 208;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__1 || _la === GraphQLParser.NAME || _la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1) {
					{
					this.state = 202;
					this.match(GraphQLParser.T__1);
					}
				}

				this.state = 205;
				this.argument();
				}
				}
				this.state = 210;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 211;
			this.match(GraphQLParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argument(): ArgumentContext {
		let _localctx: ArgumentContext = new ArgumentContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, GraphQLParser.RULE_argument);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 213;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 218;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 219;
			this.match(GraphQLParser.NAME);
			this.state = 220;
			this.match(GraphQLParser.T__6);
			this.state = 221;
			this.valueOrVariable();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fragmentSpread(): FragmentSpreadContext {
		let _localctx: FragmentSpreadContext = new FragmentSpreadContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, GraphQLParser.RULE_fragmentSpread);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.match(GraphQLParser.T__9);
			this.state = 224;
			this.fragmentName();
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 225;
				this.directives();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inlineFragment(): InlineFragmentContext {
		let _localctx: InlineFragmentContext = new InlineFragmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, GraphQLParser.RULE_inlineFragment);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.match(GraphQLParser.T__9);
			this.state = 229;
			this.match(GraphQLParser.T__10);
			this.state = 230;
			this.typeCondition();
			this.state = 232;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 231;
				this.directives();
				}
			}

			this.state = 234;
			this.selectionSet();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fragmentDefinition(): FragmentDefinitionContext {
		let _localctx: FragmentDefinitionContext = new FragmentDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, GraphQLParser.RULE_fragmentDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 239;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 236;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 241;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 242;
			this.match(GraphQLParser.T__11);
			this.state = 243;
			this.fragmentName();
			this.state = 244;
			this.match(GraphQLParser.T__10);
			this.state = 245;
			this.typeCondition();
			this.state = 247;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 246;
				this.directives();
				}
			}

			this.state = 249;
			this.selectionSet();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fragmentName(): FragmentNameContext {
		let _localctx: FragmentNameContext = new FragmentNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, GraphQLParser.RULE_fragmentName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 251;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeSystemDefinition(): TypeSystemDefinitionContext {
		let _localctx: TypeSystemDefinitionContext = new TypeSystemDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, GraphQLParser.RULE_typeSystemDefinition);
		try {
			this.state = 257;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 253;
				this.typeDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 254;
				this.typeExtensionDefinition();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 255;
				this.directiveDefinition();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 256;
				this.schemaDefinition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDefinition(): TypeDefinitionContext {
		let _localctx: TypeDefinitionContext = new TypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, GraphQLParser.RULE_typeDefinition);
		try {
			this.state = 265;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 259;
				this.scalarTypeDefinition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 260;
				this.objectTypeDefinition();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 261;
				this.interfaceTypeDefinition();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 262;
				this.unionTypeDefinition();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 263;
				this.enumTypeDefinition();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 264;
				this.inputObjectTypeDefinition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scalarType(): ScalarTypeContext {
		let _localctx: ScalarTypeContext = new ScalarTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, GraphQLParser.RULE_scalarType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 267;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scalarTypeDefinition(): ScalarTypeDefinitionContext {
		let _localctx: ScalarTypeDefinitionContext = new ScalarTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, GraphQLParser.RULE_scalarTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 269;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 275;
			this.match(GraphQLParser.T__12);
			this.state = 276;
			this.scalarType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objectType(): ObjectTypeContext {
		let _localctx: ObjectTypeContext = new ObjectTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, GraphQLParser.RULE_objectType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 278;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objectTypeDefinition(): ObjectTypeDefinitionContext {
		let _localctx: ObjectTypeDefinitionContext = new ObjectTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, GraphQLParser.RULE_objectTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 280;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 285;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 286;
			this.match(GraphQLParser.NAMETYPE);
			this.state = 287;
			this.objectType();
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__13) {
				{
				this.state = 288;
				this.implementsInterfaces();
				}
			}

			this.state = 291;
			this.match(GraphQLParser.T__0);
			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 292;
				this.fieldDefinition();
				}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (GraphQLParser.NAMETYPE - 32)) | (1 << (GraphQLParser.NAME - 32)) | (1 << (GraphQLParser.COMMENT - 32)))) !== 0));
			this.state = 297;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public implementsInterfaces(): ImplementsInterfacesContext {
		let _localctx: ImplementsInterfacesContext = new ImplementsInterfacesContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, GraphQLParser.RULE_implementsInterfaces);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 299;
			this.match(GraphQLParser.T__13);
			this.state = 300;
			this.implementsList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public implementsList(): ImplementsListContext {
		let _localctx: ImplementsListContext = new ImplementsListContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, GraphQLParser.RULE_implementsList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 302;
			this.interfaceType();
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 2)) & ~0x1F) === 0 && ((1 << (_la - 2)) & ((1 << (GraphQLParser.T__1 - 2)) | (1 << (GraphQLParser.T__14 - 2)) | (1 << (GraphQLParser.NAME - 2)))) !== 0)) {
				{
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1 || _la === GraphQLParser.T__14) {
					{
					this.state = 303;
					_la = this._input.LA(1);
					if (!(_la === GraphQLParser.T__1 || _la === GraphQLParser.T__14)) {
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

				this.state = 307;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 306;
					this.interfaceType();
					}
					}
					this.state = 309;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === GraphQLParser.NAME);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldDefinition(): FieldDefinitionContext {
		let _localctx: FieldDefinitionContext = new FieldDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, GraphQLParser.RULE_fieldDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 313;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 318;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 319;
			_la = this._input.LA(1);
			if (!(_la === GraphQLParser.NAMETYPE || _la === GraphQLParser.NAME)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 320;
				this.deprecated();
				}
			}

			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__7) {
				{
				this.state = 323;
				this.argumentsDefinition();
				}
			}

			this.state = 326;
			this.match(GraphQLParser.T__6);
			this.state = 327;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deprecated(): DeprecatedContext {
		let _localctx: DeprecatedContext = new DeprecatedContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, GraphQLParser.RULE_deprecated);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 329;
			this.match(GraphQLParser.T__15);
			this.state = 330;
			this.match(GraphQLParser.T__16);
			this.state = 335;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 331;
				this.match(GraphQLParser.T__7);
				this.state = 332;
				this.deprecationReason();
				this.state = 333;
				this.match(GraphQLParser.T__8);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deprecationReason(): DeprecationReasonContext {
		let _localctx: DeprecationReasonContext = new DeprecationReasonContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, GraphQLParser.RULE_deprecationReason);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			this.match(GraphQLParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argumentsDefinition(): ArgumentsDefinitionContext {
		let _localctx: ArgumentsDefinitionContext = new ArgumentsDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, GraphQLParser.RULE_argumentsDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 339;
			this.match(GraphQLParser.T__7);
			this.state = 340;
			this.inputValueDefinition();
			this.state = 347;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__1 || _la === GraphQLParser.NAME || _la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 342;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1) {
					{
					this.state = 341;
					this.match(GraphQLParser.T__1);
					}
				}

				this.state = 344;
				this.inputValueDefinition();
				}
				}
				this.state = 349;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 350;
			this.match(GraphQLParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inputValueDefinition(): InputValueDefinitionContext {
		let _localctx: InputValueDefinitionContext = new InputValueDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, GraphQLParser.RULE_inputValueDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 355;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 352;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 357;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 358;
			this.match(GraphQLParser.NAME);
			this.state = 359;
			this.match(GraphQLParser.T__6);
			this.state = 360;
			this.type();
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__19) {
				{
				this.state = 361;
				this.defaultValue();
				}
			}

			this.state = 365;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 364;
				this.directives();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceType(): InterfaceTypeContext {
		let _localctx: InterfaceTypeContext = new InterfaceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, GraphQLParser.RULE_interfaceType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 367;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceTypeDefinition(): InterfaceTypeDefinitionContext {
		let _localctx: InterfaceTypeDefinitionContext = new InterfaceTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, GraphQLParser.RULE_interfaceTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 372;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 369;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 374;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 375;
			this.match(GraphQLParser.T__17);
			this.state = 376;
			this.interfaceType();
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 377;
				this.directives();
				}
			}

			this.state = 380;
			this.match(GraphQLParser.T__0);
			this.state = 382;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 381;
				this.fieldDefinition();
				}
				}
				this.state = 384;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (GraphQLParser.NAMETYPE - 32)) | (1 << (GraphQLParser.NAME - 32)) | (1 << (GraphQLParser.COMMENT - 32)))) !== 0));
			this.state = 386;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unionType(): UnionTypeContext {
		let _localctx: UnionTypeContext = new UnionTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, GraphQLParser.RULE_unionType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 388;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unionTypeDefinition(): UnionTypeDefinitionContext {
		let _localctx: UnionTypeDefinitionContext = new UnionTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, GraphQLParser.RULE_unionTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 393;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 390;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 395;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 396;
			this.match(GraphQLParser.T__18);
			this.state = 397;
			this.unionType();
			this.state = 399;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 398;
				this.directives();
				}
			}

			this.state = 401;
			this.match(GraphQLParser.T__19);
			this.state = 402;
			this.unionMembers();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unionMembers(): UnionMembersContext {
		let _localctx: UnionMembersContext = new UnionMembersContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, GraphQLParser.RULE_unionMembers);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this.typeName();
			this.state = 405;
			this.match(GraphQLParser.T__20);
			{
			this.state = 406;
			this.typeName();
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__20) {
				{
				{
				this.state = 407;
				this.match(GraphQLParser.T__20);
				this.state = 408;
				this.typeName();
				}
				}
				this.state = 413;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, GraphQLParser.RULE_value);
		try {
			this.state = 419;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GraphQLParser.STRING:
				_localctx = new StringValueContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 414;
				this.match(GraphQLParser.STRING);
				}
				break;
			case GraphQLParser.NUMBER:
				_localctx = new NumberValueContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 415;
				this.match(GraphQLParser.NUMBER);
				}
				break;
			case GraphQLParser.BOOLEAN:
				_localctx = new BooleanValueContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 416;
				this.match(GraphQLParser.BOOLEAN);
				}
				break;
			case GraphQLParser.T__26:
				_localctx = new ArrayValueContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 417;
				this.array();
				}
				break;
			case GraphQLParser.NAME:
			case GraphQLParser.COMMENT:
				_localctx = new EnumValueValueContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 418;
				this.enumValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumType(): EnumTypeContext {
		let _localctx: EnumTypeContext = new EnumTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, GraphQLParser.RULE_enumType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 421;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumTypeDefinition(): EnumTypeDefinitionContext {
		let _localctx: EnumTypeDefinitionContext = new EnumTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, GraphQLParser.RULE_enumTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 423;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 428;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 429;
			this.match(GraphQLParser.T__21);
			this.state = 430;
			this.enumType();
			this.state = 432;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__15) {
				{
				this.state = 431;
				this.directives();
				}
			}

			this.state = 434;
			this.match(GraphQLParser.T__0);
			this.state = 435;
			this.enumValueDefinition();
			this.state = 442;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__1 || _la === GraphQLParser.NAME || _la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 437;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1) {
					{
					this.state = 436;
					this.match(GraphQLParser.T__1);
					}
				}

				this.state = 439;
				this.enumValueDefinition();
				}
				}
				this.state = 444;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 445;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumValueDefinition(): EnumValueDefinitionContext {
		let _localctx: EnumValueDefinitionContext = new EnumValueDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, GraphQLParser.RULE_enumValueDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 447;
			this.enumValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumValue(): EnumValueContext {
		let _localctx: EnumValueContext = new EnumValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, GraphQLParser.RULE_enumValue);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 452;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 449;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 454;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 455;
			this.match(GraphQLParser.NAME);
			this.state = 457;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 456;
				this.deprecated();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inputObjectTypeDefinition(): InputObjectTypeDefinitionContext {
		let _localctx: InputObjectTypeDefinitionContext = new InputObjectTypeDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, GraphQLParser.RULE_inputObjectTypeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 462;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 459;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 464;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 465;
			this.match(GraphQLParser.T__22);
			this.state = 466;
			this.match(GraphQLParser.NAME);
			this.state = 467;
			this.match(GraphQLParser.T__0);
			this.state = 469;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 468;
				this.inputValueDefinition();
				}
				}
				this.state = 471;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === GraphQLParser.NAME || _la === GraphQLParser.COMMENT);
			this.state = 473;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeExtensionDefinition(): TypeExtensionDefinitionContext {
		let _localctx: TypeExtensionDefinitionContext = new TypeExtensionDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, GraphQLParser.RULE_typeExtensionDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 475;
			this.match(GraphQLParser.T__23);
			this.state = 476;
			this.objectTypeDefinition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directiveDefinition(): DirectiveDefinitionContext {
		let _localctx: DirectiveDefinitionContext = new DirectiveDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, GraphQLParser.RULE_directiveDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 481;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 478;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 483;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 484;
			this.match(GraphQLParser.T__24);
			this.state = 485;
			this.match(GraphQLParser.T__15);
			this.state = 486;
			this.match(GraphQLParser.NAME);
			this.state = 488;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__7) {
				{
				this.state = 487;
				this.argumentsDefinition();
				}
			}

			this.state = 490;
			this.match(GraphQLParser.T__10);
			this.state = 491;
			this.directiveLocations();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directiveLocations(): DirectiveLocationsContext {
		let _localctx: DirectiveLocationsContext = new DirectiveLocationsContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, GraphQLParser.RULE_directiveLocations);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 494;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 493;
				this.match(GraphQLParser.NAME);
				}
				}
				this.state = 496;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directives(): DirectivesContext {
		let _localctx: DirectivesContext = new DirectivesContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, GraphQLParser.RULE_directives);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 499;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 498;
				this.directive();
				}
				}
				this.state = 501;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === GraphQLParser.T__15);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directive(): DirectiveContext {
		let _localctx: DirectiveContext = new DirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, GraphQLParser.RULE_directive);
		try {
			this.state = 515;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				_localctx = new ValueDirectiveContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 503;
				this.match(GraphQLParser.T__15);
				this.state = 504;
				this.match(GraphQLParser.NAME);
				this.state = 505;
				this.match(GraphQLParser.T__6);
				this.state = 506;
				this.valueOrVariable();
				}
				break;

			case 2:
				_localctx = new NameDirectiveContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 507;
				this.match(GraphQLParser.T__15);
				this.state = 508;
				this.match(GraphQLParser.NAME);
				}
				break;

			case 3:
				_localctx = new ArgumentDirectiveContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 509;
				this.match(GraphQLParser.T__15);
				this.state = 510;
				this.match(GraphQLParser.NAME);
				this.state = 511;
				this.match(GraphQLParser.T__7);
				this.state = 512;
				this.argument();
				this.state = 513;
				this.match(GraphQLParser.T__8);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeCondition(): TypeConditionContext {
		let _localctx: TypeConditionContext = new TypeConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, GraphQLParser.RULE_typeCondition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 517;
			this.typeName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDefinitions(): VariableDefinitionsContext {
		let _localctx: VariableDefinitionsContext = new VariableDefinitionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, GraphQLParser.RULE_variableDefinitions);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 519;
			this.match(GraphQLParser.T__7);
			this.state = 520;
			this.variableDefinition();
			this.state = 527;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.T__1 || _la === GraphQLParser.T__25 || _la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 522;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__1) {
					{
					this.state = 521;
					this.match(GraphQLParser.T__1);
					}
				}

				this.state = 524;
				this.variableDefinition();
				}
				}
				this.state = 529;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 530;
			this.match(GraphQLParser.T__8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDefinition(): VariableDefinitionContext {
		let _localctx: VariableDefinitionContext = new VariableDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, GraphQLParser.RULE_variableDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 532;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 537;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 538;
			this.variable();
			this.state = 539;
			this.match(GraphQLParser.T__6);
			this.state = 540;
			this.type();
			this.state = 542;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GraphQLParser.T__19) {
				{
				this.state = 541;
				this.defaultValue();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, GraphQLParser.RULE_variable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 544;
			this.match(GraphQLParser.T__25);
			this.state = 545;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public defaultValue(): DefaultValueContext {
		let _localctx: DefaultValueContext = new DefaultValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, GraphQLParser.RULE_defaultValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 547;
			this.match(GraphQLParser.T__19);
			this.state = 548;
			this.valueOrVariable();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public valueOrVariable(): ValueOrVariableContext {
		let _localctx: ValueOrVariableContext = new ValueOrVariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, GraphQLParser.RULE_valueOrVariable);
		try {
			this.state = 552;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GraphQLParser.T__26:
			case GraphQLParser.BOOLEAN:
			case GraphQLParser.NAME:
			case GraphQLParser.STRING:
			case GraphQLParser.COMMENT:
			case GraphQLParser.NUMBER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 550;
				this.value();
				}
				break;
			case GraphQLParser.T__25:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 551;
				this.variable();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, GraphQLParser.RULE_type);
		let _la: number;
		try {
			this.state = 562;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GraphQLParser.NAME:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 554;
				this.typeName();
				this.state = 556;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__28) {
					{
					this.state = 555;
					this.nonNullType();
					}
				}

				}
				break;
			case GraphQLParser.T__26:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 558;
				this.listType();
				this.state = 560;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === GraphQLParser.T__28) {
					{
					this.state = 559;
					this.nonNullType();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let _localctx: TypeNameContext = new TypeNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, GraphQLParser.RULE_typeName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 564;
			this.match(GraphQLParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listType(): ListTypeContext {
		let _localctx: ListTypeContext = new ListTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, GraphQLParser.RULE_listType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 566;
			this.match(GraphQLParser.T__26);
			this.state = 567;
			this.type();
			this.state = 568;
			this.match(GraphQLParser.T__27);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonNullType(): NonNullTypeContext {
		let _localctx: NonNullTypeContext = new NonNullTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, GraphQLParser.RULE_nonNullType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 570;
			this.match(GraphQLParser.T__28);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, GraphQLParser.RULE_array);
		let _la: number;
		try {
			this.state = 585;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 572;
				this.match(GraphQLParser.T__26);
				this.state = 573;
				this.value();
				this.state = 578;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GraphQLParser.T__1) {
					{
					{
					this.state = 574;
					this.match(GraphQLParser.T__1);
					this.state = 575;
					this.value();
					}
					}
					this.state = 580;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 581;
				this.match(GraphQLParser.T__27);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 583;
				this.match(GraphQLParser.T__26);
				this.state = 584;
				this.match(GraphQLParser.T__27);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaDefinition(): SchemaDefinitionContext {
		let _localctx: SchemaDefinitionContext = new SchemaDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, GraphQLParser.RULE_schemaDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 590;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 587;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 592;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 593;
			this.match(GraphQLParser.T__29);
			this.state = 594;
			this.match(GraphQLParser.T__0);
			this.state = 598;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 598;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 71, this._ctx) ) {
				case 1:
					{
					this.state = 595;
					this.schemaQueryDefinition();
					}
					break;

				case 2:
					{
					this.state = 596;
					this.schemaMutationDefinition();
					}
					break;

				case 3:
					{
					this.state = 597;
					this.schemaSubscriptionDefinition();
					}
					break;
				}
				}
				this.state = 600;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & ((1 << (GraphQLParser.T__3 - 4)) | (1 << (GraphQLParser.T__4 - 4)) | (1 << (GraphQLParser.T__5 - 4)) | (1 << (GraphQLParser.COMMENT - 4)))) !== 0));
			this.state = 602;
			this.match(GraphQLParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaQueryDefinition(): SchemaQueryDefinitionContext {
		let _localctx: SchemaQueryDefinitionContext = new SchemaQueryDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, GraphQLParser.RULE_schemaQueryDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 607;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 604;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 609;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 610;
			this.match(GraphQLParser.T__3);
			this.state = 611;
			this.match(GraphQLParser.T__6);
			this.state = 612;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaMutationDefinition(): SchemaMutationDefinitionContext {
		let _localctx: SchemaMutationDefinitionContext = new SchemaMutationDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, GraphQLParser.RULE_schemaMutationDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 617;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 614;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 619;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 620;
			this.match(GraphQLParser.T__4);
			this.state = 621;
			this.match(GraphQLParser.T__6);
			this.state = 622;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaSubscriptionDefinition(): SchemaSubscriptionDefinitionContext {
		let _localctx: SchemaSubscriptionDefinitionContext = new SchemaSubscriptionDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, GraphQLParser.RULE_schemaSubscriptionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 627;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GraphQLParser.COMMENT) {
				{
				{
				this.state = 624;
				this.match(GraphQLParser.COMMENT);
				}
				}
				this.state = 629;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 630;
			this.match(GraphQLParser.T__5);
			this.state = 631;
			this.match(GraphQLParser.T__6);
			this.state = 632;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\'\u027D\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x03" +
		"\x02\x06\x02z\n\x02\r\x02\x0E\x02{\x03\x02\x03\x02\x03\x03\x03\x03\x03" +
		"\x03\x05\x03\x83\n\x03\x03\x04\x07\x04\x86\n\x04\f\x04\x0E\x04\x89\v\x04" +
		"\x03\x04\x03\x04\x07\x04\x8D\n\x04\f\x04\x0E\x04\x90\v\x04\x03\x04\x03" +
		"\x04\x03\x04\x05\x04\x95\n\x04\x03\x04\x05\x04\x98\n\x04\x03\x04\x03\x04" +
		"\x05\x04\x9C\n\x04\x03\x05\x03\x05\x03\x05\x05\x05\xA1\n\x05\x03\x05\x07" +
		"\x05\xA4\n\x05\f\x05\x0E\x05\xA7\v\x05\x03\x05\x03\x05\x03\x06\x03\x06" +
		"\x03\x07\x03\x07\x03\x07\x05\x07\xB0\n\x07\x03\b\x07\b\xB3\n\b\f\b\x0E" +
		"\b\xB6\v\b\x03\b\x03\b\x05\b\xBA\n\b\x03\b\x05\b\xBD\n\b\x03\b\x05\b\xC0" +
		"\n\b\x03\t\x03\t\x03\t\x05\t\xC5\n\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03" +
		"\v\x03\v\x05\v\xCE\n\v\x03\v\x07\v\xD1\n\v\f\v\x0E\v\xD4\v\v\x03\v\x03" +
		"\v\x03\f\x07\f\xD9\n\f\f\f\x0E\f\xDC\v\f\x03\f\x03\f\x03\f\x03\f\x03\r" +
		"\x03\r\x03\r\x05\r\xE5\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xEB" +
		"\n\x0E\x03\x0E\x03\x0E\x03\x0F\x07\x0F\xF0\n\x0F\f\x0F\x0E\x0F\xF3\v\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xFA\n\x0F\x03\x0F\x03" +
		"\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u0104\n\x11" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u010C\n\x12\x03" +
		"\x13\x03\x13\x03\x14\x07\x14\u0111\n\x14\f\x14\x0E\x14\u0114\v\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x07\x16\u011C\n\x16\f\x16" +
		"\x0E\x16\u011F\v\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0124\n\x16\x03\x16" +
		"\x03\x16\x06\x16\u0128\n\x16\r\x16\x0E\x16\u0129\x03\x16\x03\x16\x03\x17" +
		"\x03\x17\x03\x17\x03\x18\x03\x18\x05\x18\u0133\n\x18\x03\x18\x06\x18\u0136" +
		"\n\x18\r\x18\x0E\x18\u0137\x05\x18\u013A\n\x18\x03\x19\x07\x19\u013D\n" +
		"\x19\f\x19\x0E\x19\u0140\v\x19\x03\x19\x03\x19\x05\x19\u0144\n\x19\x03" +
		"\x19\x05\x19\u0147\n\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u0152\n\x1A\x03\x1B\x03\x1B\x03\x1C\x03" +
		"\x1C\x03\x1C\x05\x1C\u0159\n\x1C\x03\x1C\x07\x1C\u015C\n\x1C\f\x1C\x0E" +
		"\x1C\u015F\v\x1C\x03\x1C\x03\x1C\x03\x1D\x07\x1D\u0164\n\x1D\f\x1D\x0E" +
		"\x1D\u0167\v\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u016D\n\x1D\x03" +
		"\x1D\x05\x1D\u0170\n\x1D\x03\x1E\x03\x1E\x03\x1F\x07\x1F\u0175\n\x1F\f" +
		"\x1F\x0E\x1F\u0178\v\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u017D\n\x1F\x03" +
		"\x1F\x03\x1F\x06\x1F\u0181\n\x1F\r\x1F\x0E\x1F\u0182\x03\x1F\x03\x1F\x03" +
		" \x03 \x03!\x07!\u018A\n!\f!\x0E!\u018D\v!\x03!\x03!\x03!\x05!\u0192\n" +
		"!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x03\"\x03\"\x07\"\u019C\n\"\f\"\x0E" +
		"\"\u019F\v\"\x03#\x03#\x03#\x03#\x03#\x05#\u01A6\n#\x03$\x03$\x03%\x07" +
		"%\u01AB\n%\f%\x0E%\u01AE\v%\x03%\x03%\x03%\x05%\u01B3\n%\x03%\x03%\x03" +
		"%\x05%\u01B8\n%\x03%\x07%\u01BB\n%\f%\x0E%\u01BE\v%\x03%\x03%\x03&\x03" +
		"&\x03\'\x07\'\u01C5\n\'\f\'\x0E\'\u01C8\v\'\x03\'\x03\'\x05\'\u01CC\n" +
		"\'\x03(\x07(\u01CF\n(\f(\x0E(\u01D2\v(\x03(\x03(\x03(\x03(\x06(\u01D8" +
		"\n(\r(\x0E(\u01D9\x03(\x03(\x03)\x03)\x03)\x03*\x07*\u01E2\n*\f*\x0E*" +
		"\u01E5\v*\x03*\x03*\x03*\x03*\x05*\u01EB\n*\x03*\x03*\x03*\x03+\x06+\u01F1" +
		"\n+\r+\x0E+\u01F2\x03,\x06,\u01F6\n,\r,\x0E,\u01F7\x03-\x03-\x03-\x03" +
		"-\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x03-\x05-\u0206\n-\x03.\x03.\x03" +
		"/\x03/\x03/\x05/\u020D\n/\x03/\x07/\u0210\n/\f/\x0E/\u0213\v/\x03/\x03" +
		"/\x030\x070\u0218\n0\f0\x0E0\u021B\v0\x030\x030\x030\x030\x050\u0221\n" +
		"0\x031\x031\x031\x032\x032\x032\x033\x033\x053\u022B\n3\x034\x034\x05" +
		"4\u022F\n4\x034\x034\x054\u0233\n4\x054\u0235\n4\x035\x035\x036\x036\x03" +
		"6\x036\x037\x037\x038\x038\x038\x038\x078\u0243\n8\f8\x0E8\u0246\v8\x03" +
		"8\x038\x038\x038\x058\u024C\n8\x039\x079\u024F\n9\f9\x0E9\u0252\v9\x03" +
		"9\x039\x039\x039\x039\x069\u0259\n9\r9\x0E9\u025A\x039\x039\x03:\x07:" +
		"\u0260\n:\f:\x0E:\u0263\v:\x03:\x03:\x03:\x03:\x03;\x07;\u026A\n;\f;\x0E" +
		";\u026D\v;\x03;\x03;\x03;\x03;\x03<\x07<\u0274\n<\f<\x0E<\u0277\v<\x03" +
		"<\x03<\x03<\x03<\x03<\x02\x02\x02=\x02\x02\x04\x02\x06\x02\b\x02\n\x02" +
		"\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02" +
		"\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x02" +
		"8\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02" +
		"T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02" +
		"p\x02r\x02t\x02v\x02\x02\x05\x03\x02\x06\b\x04\x02\x04\x04\x11\x11\x03" +
		"\x02\"#\u029B\x02y\x03\x02\x02\x02\x04\x82\x03\x02\x02\x02\x06\x9B\x03" +
		"\x02\x02\x02\b\x9D\x03\x02\x02\x02\n\xAA\x03\x02\x02\x02\f\xAF\x03\x02" +
		"\x02\x02\x0E\xB4\x03\x02\x02\x02\x10\xC4\x03\x02\x02\x02\x12\xC6\x03\x02" +
		"\x02\x02\x14\xCA\x03\x02\x02\x02\x16\xDA\x03\x02\x02\x02\x18\xE1\x03\x02" +
		"\x02\x02\x1A\xE6\x03\x02\x02\x02\x1C\xF1\x03\x02\x02\x02\x1E\xFD\x03\x02" +
		"\x02\x02 \u0103\x03\x02\x02\x02\"\u010B\x03\x02\x02\x02$\u010D\x03\x02" +
		"\x02\x02&\u0112\x03\x02\x02\x02(\u0118\x03\x02\x02\x02*\u011D\x03\x02" +
		"\x02\x02,\u012D\x03\x02\x02\x02.\u0130\x03\x02\x02\x020\u013E\x03\x02" +
		"\x02\x022\u014B\x03\x02\x02\x024\u0153\x03\x02\x02\x026\u0155\x03\x02" +
		"\x02\x028\u0165\x03\x02\x02\x02:\u0171\x03\x02\x02\x02<\u0176\x03\x02" +
		"\x02\x02>\u0186\x03\x02\x02\x02@\u018B\x03\x02\x02\x02B\u0196\x03\x02" +
		"\x02\x02D\u01A5\x03\x02\x02\x02F\u01A7\x03\x02\x02\x02H\u01AC\x03\x02" +
		"\x02\x02J\u01C1\x03\x02\x02\x02L\u01C6\x03\x02\x02\x02N\u01D0\x03\x02" +
		"\x02\x02P\u01DD\x03\x02\x02\x02R\u01E3\x03\x02\x02\x02T\u01F0\x03\x02" +
		"\x02\x02V\u01F5\x03\x02\x02\x02X\u0205\x03\x02\x02\x02Z\u0207\x03\x02" +
		"\x02\x02\\\u0209\x03\x02\x02\x02^\u0219\x03\x02\x02\x02`\u0222\x03\x02" +
		"\x02\x02b\u0225\x03\x02\x02\x02d\u022A\x03\x02\x02\x02f\u0234\x03\x02" +
		"\x02\x02h\u0236\x03\x02\x02\x02j\u0238\x03\x02\x02\x02l\u023C\x03\x02" +
		"\x02\x02n\u024B\x03\x02\x02\x02p\u0250\x03\x02\x02\x02r\u0261\x03\x02" +
		"\x02\x02t\u026B\x03\x02\x02\x02v\u0275\x03\x02\x02\x02xz\x05\x04\x03\x02" +
		"yx\x03\x02\x02\x02z{\x03\x02\x02\x02{y\x03\x02\x02\x02{|\x03\x02\x02\x02" +
		"|}\x03\x02\x02\x02}~\x07\x02\x02\x03~\x03\x03\x02\x02\x02\x7F\x83\x05" +
		"\x06\x04\x02\x80\x83\x05\x1C\x0F\x02\x81\x83\x05 \x11\x02\x82\x7F\x03" +
		"\x02\x02\x02\x82\x80\x03\x02\x02\x02\x82\x81\x03\x02\x02\x02\x83\x05\x03" +
		"\x02\x02\x02\x84\x86\x07%\x02\x02\x85\x84\x03\x02\x02\x02\x86\x89\x03" +
		"\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x8A\x03" +
		"\x02\x02\x02\x89\x87\x03\x02\x02\x02\x8A\x9C\x05\b\x05\x02\x8B\x8D\x07" +
		"%\x02\x02\x8C\x8B\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C\x03" +
		"\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x91\x03\x02\x02\x02\x90\x8E\x03" +
		"\x02\x02\x02\x91\x92\x05\n\x06\x02\x92\x94\x07#\x02\x02\x93\x95\x05\\" +
		"/\x02\x94\x93\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x97\x03\x02" +
		"\x02\x02\x96\x98\x05V,\x02\x97\x96\x03\x02\x02\x02\x97\x98\x03\x02\x02" +
		"\x02\x98\x99\x03\x02\x02\x02\x99\x9A\x05\b\x05\x02\x9A\x9C\x03\x02\x02" +
		"\x02\x9B\x87\x03\x02\x02\x02\x9B\x8E\x03\x02\x02\x02\x9C\x07\x03\x02\x02" +
		"\x02\x9D\x9E\x07\x03\x02\x02\x9E\xA5\x05\f\x07\x02\x9F\xA1\x07\x04\x02" +
		"\x02\xA0\x9F\x03\x02\x02\x02\xA0\xA1\x03\x02\x02\x02\xA1\xA2\x03\x02\x02" +
		"\x02\xA2\xA4\x05\f\x07\x02\xA3\xA0\x03\x02\x02\x02\xA4\xA7\x03\x02\x02" +
		"\x02\xA5\xA3\x03\x02\x02\x02\xA5\xA6\x03\x02\x02\x02\xA6\xA8\x03\x02\x02" +
		"\x02\xA7\xA5\x03\x02\x02\x02\xA8\xA9\x07\x05\x02\x02\xA9\t\x03\x02\x02" +
		"\x02\xAA\xAB\t\x02\x02\x02\xAB\v\x03\x02\x02\x02\xAC\xB0\x05\x0E\b\x02" +
		"\xAD\xB0\x05\x18\r\x02\xAE\xB0\x05\x1A\x0E\x02\xAF\xAC\x03\x02\x02\x02" +
		"\xAF\xAD\x03\x02\x02\x02\xAF\xAE\x03\x02\x02\x02\xB0\r\x03\x02\x02\x02" +
		"\xB1\xB3\x07%\x02\x02\xB2\xB1\x03\x02\x02\x02\xB3\xB6\x03\x02\x02\x02" +
		"\xB4\xB2\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB7\x03\x02\x02\x02" +
		"\xB6\xB4\x03\x02\x02\x02\xB7\xB9\x05\x10\t\x02\xB8\xBA\x05\x14\v\x02\xB9" +
		"\xB8\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02\xBA\xBC\x03\x02\x02\x02\xBB" +
		"\xBD\x05V,\x02\xBC\xBB\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBF" +
		"\x03\x02\x02\x02\xBE\xC0\x05\b\x05\x02\xBF\xBE\x03\x02\x02\x02\xBF\xC0" +
		"\x03\x02\x02\x02\xC0\x0F\x03\x02\x02\x02\xC1\xC5\x07\"\x02\x02\xC2\xC5" +
		"\x05\x12\n\x02\xC3\xC5\x07#\x02\x02\xC4\xC1\x03\x02\x02\x02\xC4\xC2\x03" +
		"\x02\x02\x02\xC4\xC3\x03\x02\x02\x02\xC5\x11\x03\x02\x02\x02\xC6\xC7\x07" +
		"#\x02\x02\xC7\xC8\x07\t\x02\x02\xC8\xC9\x07#\x02\x02\xC9\x13\x03\x02\x02" +
		"\x02\xCA\xCB\x07\n\x02\x02\xCB\xD2\x05\x16\f\x02\xCC\xCE\x07\x04\x02\x02" +
		"\xCD\xCC\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE\xCF\x03\x02\x02\x02" +
		"\xCF\xD1\x05\x16\f\x02\xD0\xCD\x03\x02\x02\x02\xD1\xD4\x03\x02\x02\x02" +
		"\xD2\xD0\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02\xD3\xD5\x03\x02\x02\x02" +
		"\xD4\xD2\x03\x02\x02\x02\xD5\xD6\x07\v\x02\x02\xD6\x15\x03\x02\x02\x02" +
		"\xD7\xD9\x07%\x02\x02\xD8\xD7\x03\x02\x02\x02\xD9\xDC\x03\x02\x02\x02" +
		"\xDA\xD8\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\xDD\x03\x02\x02\x02" +
		"\xDC\xDA\x03\x02\x02\x02\xDD\xDE\x07#\x02\x02\xDE\xDF\x07\t\x02\x02\xDF" +
		"\xE0\x05d3\x02\xE0\x17\x03\x02\x02\x02\xE1\xE2\x07\f\x02\x02\xE2\xE4\x05" +
		"\x1E\x10\x02\xE3\xE5\x05V,\x02\xE4\xE3\x03\x02\x02\x02\xE4\xE5\x03\x02" +
		"\x02\x02\xE5\x19\x03\x02\x02\x02\xE6\xE7\x07\f\x02\x02\xE7\xE8\x07\r\x02" +
		"\x02\xE8\xEA\x05Z.\x02\xE9\xEB\x05V,\x02\xEA\xE9\x03\x02\x02\x02\xEA\xEB" +
		"\x03\x02\x02\x02\xEB\xEC\x03\x02\x02\x02\xEC\xED\x05\b\x05\x02\xED\x1B" +
		"\x03\x02\x02\x02\xEE\xF0\x07%\x02\x02\xEF\xEE\x03\x02\x02\x02\xF0\xF3" +
		"\x03\x02\x02\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xF4" +
		"\x03\x02\x02\x02\xF3\xF1\x03\x02\x02\x02\xF4\xF5\x07\x0E\x02\x02\xF5\xF6" +
		"\x05\x1E\x10\x02\xF6\xF7\x07\r\x02\x02\xF7\xF9\x05Z.\x02\xF8\xFA\x05V" +
		",\x02\xF9\xF8\x03\x02\x02\x02\xF9\xFA\x03\x02\x02\x02\xFA\xFB\x03\x02" +
		"\x02\x02\xFB\xFC\x05\b\x05\x02\xFC\x1D\x03\x02\x02\x02\xFD\xFE\x07#\x02" +
		"\x02\xFE\x1F\x03\x02\x02\x02\xFF\u0104\x05\"\x12\x02\u0100\u0104\x05P" +
		")\x02\u0101\u0104\x05R*\x02\u0102\u0104\x05p9\x02\u0103\xFF\x03\x02\x02" +
		"\x02\u0103\u0100\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0103\u0102" +
		"\x03\x02\x02\x02\u0104!\x03\x02\x02\x02\u0105\u010C\x05&\x14\x02\u0106" +
		"\u010C\x05*\x16\x02\u0107\u010C\x05<\x1F\x02\u0108\u010C\x05@!\x02\u0109" +
		"\u010C\x05H%\x02\u010A\u010C\x05N(\x02\u010B\u0105\x03\x02\x02\x02\u010B" +
		"\u0106\x03\x02\x02\x02\u010B\u0107\x03\x02\x02\x02\u010B\u0108\x03\x02" +
		"\x02\x02\u010B\u0109\x03\x02\x02\x02\u010B\u010A\x03\x02\x02\x02\u010C" +
		"#\x03\x02\x02\x02\u010D\u010E\x07#\x02\x02\u010E%\x03\x02\x02\x02\u010F" +
		"\u0111\x07%\x02\x02\u0110\u010F\x03\x02\x02\x02\u0111\u0114\x03\x02\x02" +
		"\x02\u0112\u0110\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113\u0115" +
		"\x03\x02\x02\x02\u0114\u0112\x03\x02\x02\x02\u0115\u0116\x07\x0F\x02\x02" +
		"\u0116\u0117\x05$\x13\x02\u0117\'\x03\x02\x02\x02\u0118\u0119\x07#\x02" +
		"\x02\u0119)\x03\x02\x02\x02\u011A\u011C\x07%\x02\x02\u011B\u011A\x03\x02" +
		"\x02\x02\u011C\u011F\x03\x02\x02\x02\u011D\u011B\x03\x02\x02\x02\u011D" +
		"\u011E\x03\x02\x02\x02\u011E\u0120\x03\x02\x02\x02\u011F\u011D\x03\x02" +
		"\x02\x02\u0120\u0121\x07\"\x02\x02\u0121\u0123\x05(\x15\x02\u0122\u0124" +
		"\x05,\x17\x02\u0123\u0122\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02" +
		"\u0124\u0125\x03\x02\x02\x02\u0125\u0127\x07\x03\x02\x02\u0126\u0128\x05" +
		"0\x19\x02\u0127\u0126\x03\x02\x02\x02\u0128\u0129\x03\x02\x02\x02\u0129" +
		"\u0127\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u012B\x03\x02" +
		"\x02\x02\u012B\u012C\x07\x05\x02\x02\u012C+\x03\x02\x02\x02\u012D\u012E" +
		"\x07\x10\x02\x02\u012E\u012F\x05.\x18\x02\u012F-\x03\x02\x02\x02\u0130" +
		"\u0139\x05:\x1E\x02\u0131\u0133\t\x03\x02\x02\u0132\u0131\x03\x02\x02" +
		"\x02\u0132\u0133\x03\x02\x02\x02\u0133\u0135\x03\x02\x02\x02\u0134\u0136" +
		"\x05:\x1E\x02\u0135\u0134\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02" +
		"\u0137\u0135\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02\u0138\u013A\x03" +
		"\x02\x02\x02\u0139\u0132\x03\x02\x02\x02\u0139\u013A\x03\x02\x02\x02\u013A" +
		"/\x03\x02\x02\x02\u013B\u013D\x07%\x02\x02\u013C\u013B\x03\x02\x02\x02" +
		"\u013D\u0140\x03\x02\x02\x02\u013E\u013C\x03\x02\x02\x02\u013E\u013F\x03" +
		"\x02\x02\x02\u013F\u0141\x03\x02\x02\x02\u0140\u013E\x03\x02\x02\x02\u0141" +
		"\u0143\t\x04\x02\x02\u0142\u0144\x052\x1A\x02\u0143\u0142\x03\x02\x02" +
		"\x02\u0143\u0144\x03\x02\x02\x02\u0144\u0146\x03\x02\x02\x02\u0145\u0147" +
		"\x056\x1C\x02\u0146\u0145\x03\x02\x02\x02\u0146\u0147\x03\x02\x02\x02" +
		"\u0147\u0148\x03\x02\x02\x02\u0148\u0149\x07\t\x02\x02\u0149\u014A\x05" +
		"f4\x02\u014A1\x03\x02\x02\x02\u014B\u014C\x07\x12\x02\x02\u014C\u0151" +
		"\x07\x13\x02\x02\u014D\u014E\x07\n\x02\x02\u014E\u014F\x054\x1B\x02\u014F" +
		"\u0150\x07\v\x02\x02\u0150\u0152\x03\x02\x02\x02\u0151\u014D\x03\x02\x02" +
		"\x02\u0151\u0152\x03\x02\x02\x02\u01523\x03\x02\x02\x02\u0153\u0154\x07" +
		"$\x02\x02\u01545\x03\x02\x02\x02\u0155\u0156\x07\n\x02\x02\u0156\u015D" +
		"\x058\x1D\x02\u0157\u0159\x07\x04\x02\x02\u0158\u0157\x03\x02\x02\x02" +
		"\u0158\u0159\x03\x02\x02\x02\u0159\u015A\x03\x02\x02\x02\u015A\u015C\x05" +
		"8\x1D\x02\u015B\u0158\x03\x02\x02\x02\u015C\u015F\x03\x02\x02\x02\u015D" +
		"\u015B\x03\x02\x02\x02\u015D\u015E\x03\x02\x02\x02\u015E\u0160\x03\x02" +
		"\x02\x02\u015F\u015D\x03\x02\x02\x02\u0160\u0161\x07\v\x02\x02\u01617" +
		"\x03\x02\x02\x02\u0162\u0164\x07%\x02\x02\u0163\u0162\x03\x02\x02\x02" +
		"\u0164\u0167\x03\x02\x02\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0166\x03" +
		"\x02\x02\x02\u0166\u0168\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0168" +
		"\u0169\x07#\x02\x02\u0169\u016A\x07\t\x02\x02\u016A\u016C\x05f4\x02\u016B" +
		"\u016D\x05b2\x02\u016C\u016B\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02" +
		"\u016D\u016F\x03\x02\x02\x02\u016E\u0170\x05V,\x02\u016F\u016E\x03\x02" +
		"\x02\x02\u016F\u0170\x03\x02\x02\x02\u01709\x03\x02\x02\x02\u0171\u0172" +
		"\x07#\x02\x02\u0172;\x03\x02\x02\x02\u0173\u0175\x07%\x02\x02\u0174\u0173" +
		"\x03\x02\x02\x02\u0175\u0178\x03\x02\x02\x02\u0176\u0174\x03\x02\x02\x02" +
		"\u0176\u0177\x03\x02\x02\x02\u0177\u0179\x03\x02\x02\x02\u0178\u0176\x03" +
		"\x02\x02\x02\u0179\u017A\x07\x14\x02\x02\u017A\u017C\x05:\x1E\x02\u017B" +
		"\u017D\x05V,\x02\u017C\u017B\x03\x02\x02\x02\u017C\u017D\x03\x02\x02\x02" +
		"\u017D\u017E\x03\x02\x02\x02\u017E\u0180\x07\x03\x02\x02\u017F\u0181\x05" +
		"0\x19\x02\u0180\u017F\x03\x02\x02\x02\u0181\u0182\x03\x02\x02\x02\u0182" +
		"\u0180\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02\u0183\u0184\x03\x02" +
		"\x02\x02\u0184\u0185\x07\x05\x02\x02\u0185=\x03\x02\x02\x02\u0186\u0187" +
		"\x07#\x02\x02\u0187?\x03\x02\x02\x02\u0188\u018A\x07%\x02\x02\u0189\u0188" +
		"\x03\x02\x02\x02\u018A\u018D\x03\x02\x02\x02\u018B\u0189\x03\x02\x02\x02" +
		"\u018B\u018C\x03\x02\x02\x02\u018C\u018E\x03\x02\x02\x02\u018D\u018B\x03" +
		"\x02\x02\x02\u018E\u018F\x07\x15\x02\x02\u018F\u0191\x05> \x02\u0190\u0192" +
		"\x05V,\x02\u0191\u0190\x03\x02\x02\x02\u0191\u0192\x03\x02\x02\x02\u0192" +
		"\u0193\x03\x02\x02\x02\u0193\u0194\x07\x16\x02\x02\u0194\u0195\x05B\"" +
		"\x02\u0195A\x03\x02\x02\x02\u0196\u0197\x05h5\x02\u0197\u0198\x07\x17" +
		"\x02\x02\u0198\u019D\x05h5\x02\u0199\u019A\x07\x17\x02\x02\u019A\u019C" +
		"\x05h5\x02\u019B\u0199\x03\x02\x02\x02\u019C\u019F\x03\x02\x02\x02\u019D" +
		"\u019B\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02\u019EC\x03\x02\x02" +
		"\x02\u019F\u019D\x03\x02\x02\x02\u01A0\u01A6\x07$\x02\x02\u01A1\u01A6" +
		"\x07&\x02\x02\u01A2\u01A6\x07!\x02\x02\u01A3\u01A6\x05n8\x02\u01A4\u01A6" +
		"\x05L\'\x02\u01A5\u01A0\x03\x02\x02\x02\u01A5\u01A1\x03\x02\x02\x02\u01A5" +
		"\u01A2\x03\x02\x02\x02\u01A5\u01A3\x03\x02\x02\x02\u01A5\u01A4\x03\x02" +
		"\x02\x02\u01A6E\x03\x02\x02\x02\u01A7\u01A8\x07#\x02\x02\u01A8G\x03\x02" +
		"\x02\x02\u01A9\u01AB\x07%\x02\x02\u01AA\u01A9\x03\x02\x02\x02\u01AB\u01AE" +
		"\x03\x02\x02\x02\u01AC\u01AA\x03\x02\x02\x02\u01AC\u01AD\x03\x02\x02\x02" +
		"\u01AD\u01AF\x03\x02\x02\x02\u01AE\u01AC\x03\x02\x02\x02\u01AF\u01B0\x07" +
		"\x18\x02\x02\u01B0\u01B2\x05F$\x02\u01B1\u01B3\x05V,\x02\u01B2\u01B1\x03" +
		"\x02\x02\x02\u01B2\u01B3\x03\x02\x02\x02\u01B3\u01B4\x03\x02\x02\x02\u01B4" +
		"\u01B5\x07\x03\x02\x02\u01B5\u01BC\x05J&\x02\u01B6\u01B8\x07\x04\x02\x02" +
		"\u01B7\u01B6\x03\x02\x02\x02\u01B7\u01B8\x03\x02\x02\x02\u01B8\u01B9\x03" +
		"\x02\x02\x02\u01B9\u01BB\x05J&\x02\u01BA\u01B7\x03\x02\x02\x02\u01BB\u01BE" +
		"\x03\x02\x02\x02\u01BC\u01BA\x03\x02\x02\x02\u01BC\u01BD\x03\x02\x02\x02" +
		"\u01BD\u01BF\x03\x02\x02\x02\u01BE\u01BC\x03\x02\x02\x02\u01BF\u01C0\x07" +
		"\x05\x02\x02\u01C0I\x03\x02\x02\x02\u01C1\u01C2\x05L\'\x02\u01C2K\x03" +
		"\x02\x02\x02\u01C3\u01C5\x07%\x02\x02\u01C4\u01C3\x03\x02\x02\x02\u01C5" +
		"\u01C8\x03\x02\x02\x02\u01C6\u01C4\x03\x02\x02\x02\u01C6\u01C7\x03\x02" +
		"\x02\x02\u01C7\u01C9\x03\x02\x02\x02\u01C8\u01C6\x03\x02\x02\x02\u01C9" +
		"\u01CB\x07#\x02\x02\u01CA\u01CC\x052\x1A\x02\u01CB\u01CA\x03\x02\x02\x02" +
		"\u01CB\u01CC\x03\x02\x02\x02\u01CCM\x03\x02\x02\x02\u01CD\u01CF\x07%\x02" +
		"\x02\u01CE\u01CD\x03\x02\x02\x02\u01CF\u01D2\x03\x02\x02\x02\u01D0\u01CE" +
		"\x03\x02\x02\x02\u01D0\u01D1\x03\x02\x02\x02\u01D1\u01D3\x03\x02\x02\x02" +
		"\u01D2\u01D0\x03\x02\x02\x02\u01D3\u01D4\x07\x19\x02\x02\u01D4\u01D5\x07" +
		"#\x02\x02\u01D5\u01D7\x07\x03\x02\x02\u01D6\u01D8\x058\x1D\x02\u01D7\u01D6" +
		"\x03\x02\x02\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9\u01D7\x03\x02\x02\x02" +
		"\u01D9\u01DA\x03\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB\u01DC\x07" +
		"\x05\x02\x02\u01DCO\x03\x02\x02\x02\u01DD\u01DE\x07\x1A\x02\x02\u01DE" +
		"\u01DF\x05*\x16\x02\u01DFQ\x03\x02\x02\x02\u01E0\u01E2\x07%\x02\x02\u01E1" +
		"\u01E0\x03\x02\x02\x02\u01E2\u01E5\x03\x02\x02\x02\u01E3\u01E1\x03\x02" +
		"\x02\x02\u01E3\u01E4\x03\x02\x02\x02\u01E4\u01E6\x03\x02\x02\x02\u01E5" +
		"\u01E3\x03\x02\x02\x02\u01E6\u01E7\x07\x1B\x02\x02\u01E7\u01E8\x07\x12" +
		"\x02\x02\u01E8\u01EA\x07#\x02\x02\u01E9\u01EB\x056\x1C\x02\u01EA\u01E9" +
		"\x03\x02\x02\x02\u01EA\u01EB\x03\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02" +
		"\u01EC\u01ED\x07\r\x02\x02\u01ED\u01EE\x05T+\x02\u01EES\x03\x02\x02\x02" +
		"\u01EF\u01F1\x07#\x02\x02\u01F0\u01EF\x03\x02\x02\x02\u01F1\u01F2\x03" +
		"\x02\x02\x02\u01F2\u01F0\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02\u01F3" +
		"U\x03\x02\x02\x02\u01F4\u01F6\x05X-\x02\u01F5\u01F4\x03\x02\x02\x02\u01F6" +
		"\u01F7\x03\x02\x02\x02\u01F7\u01F5\x03\x02\x02\x02\u01F7\u01F8\x03\x02" +
		"\x02\x02\u01F8W\x03\x02\x02\x02\u01F9\u01FA\x07\x12\x02\x02\u01FA\u01FB" +
		"\x07#\x02\x02\u01FB\u01FC\x07\t\x02\x02\u01FC\u0206\x05d3\x02\u01FD\u01FE" +
		"\x07\x12\x02\x02\u01FE\u0206\x07#\x02\x02\u01FF\u0200\x07\x12\x02\x02" +
		"\u0200\u0201\x07#\x02\x02\u0201\u0202\x07\n\x02\x02\u0202\u0203\x05\x16" +
		"\f\x02\u0203\u0204\x07\v\x02\x02\u0204\u0206\x03\x02\x02\x02\u0205\u01F9" +
		"\x03\x02\x02\x02\u0205\u01FD\x03\x02\x02\x02\u0205\u01FF\x03\x02\x02\x02" +
		"\u0206Y\x03\x02\x02\x02\u0207\u0208\x05h5\x02\u0208[\x03\x02\x02\x02\u0209" +
		"\u020A\x07\n\x02\x02\u020A\u0211\x05^0\x02\u020B\u020D\x07\x04\x02\x02" +
		"\u020C\u020B\x03\x02\x02\x02\u020C\u020D\x03\x02\x02\x02\u020D\u020E\x03" +
		"\x02\x02\x02\u020E\u0210\x05^0\x02\u020F\u020C\x03\x02\x02\x02\u0210\u0213" +
		"\x03\x02\x02\x02\u0211\u020F\x03\x02\x02\x02\u0211\u0212\x03\x02\x02\x02" +
		"\u0212\u0214\x03\x02\x02\x02\u0213\u0211\x03\x02\x02\x02\u0214\u0215\x07" +
		"\v\x02\x02\u0215]\x03\x02\x02\x02\u0216\u0218\x07%\x02\x02\u0217\u0216" +
		"\x03\x02\x02\x02\u0218\u021B\x03\x02\x02\x02\u0219\u0217\x03\x02\x02\x02" +
		"\u0219\u021A\x03\x02\x02\x02\u021A\u021C\x03\x02\x02\x02\u021B\u0219\x03" +
		"\x02\x02\x02\u021C\u021D\x05`1\x02\u021D\u021E\x07\t\x02\x02\u021E\u0220" +
		"\x05f4\x02\u021F\u0221\x05b2\x02\u0220\u021F\x03\x02\x02\x02\u0220\u0221" +
		"\x03\x02\x02\x02\u0221_\x03\x02\x02\x02\u0222\u0223\x07\x1C\x02\x02\u0223" +
		"\u0224\x07#\x02\x02\u0224a\x03\x02\x02\x02\u0225\u0226\x07\x16\x02\x02" +
		"\u0226\u0227\x05d3\x02\u0227c\x03\x02\x02\x02\u0228\u022B\x05D#\x02\u0229" +
		"\u022B\x05`1\x02\u022A\u0228\x03\x02\x02\x02\u022A\u0229\x03\x02\x02\x02" +
		"\u022Be\x03\x02\x02\x02\u022C\u022E\x05h5\x02\u022D\u022F\x05l7\x02\u022E" +
		"\u022D\x03\x02\x02\x02\u022E\u022F\x03\x02\x02\x02\u022F\u0235\x03\x02" +
		"\x02\x02\u0230";
	private static readonly _serializedATNSegment1: string =
		"\u0232\x05j6\x02\u0231\u0233\x05l7\x02\u0232\u0231\x03\x02\x02\x02\u0232" +
		"\u0233\x03\x02\x02\x02\u0233\u0235\x03\x02\x02\x02\u0234\u022C\x03\x02" +
		"\x02\x02\u0234\u0230\x03\x02\x02\x02\u0235g\x03\x02\x02\x02\u0236\u0237" +
		"\x07#\x02\x02\u0237i\x03\x02\x02\x02\u0238\u0239\x07\x1D\x02\x02\u0239" +
		"\u023A\x05f4\x02\u023A\u023B\x07\x1E\x02\x02\u023Bk\x03\x02\x02\x02\u023C" +
		"\u023D\x07\x1F\x02\x02\u023Dm\x03\x02\x02\x02\u023E\u023F\x07\x1D\x02" +
		"\x02\u023F\u0244\x05D#\x02\u0240\u0241\x07\x04\x02\x02\u0241\u0243\x05" +
		"D#\x02\u0242\u0240\x03\x02\x02\x02\u0243\u0246\x03\x02\x02\x02\u0244\u0242" +
		"\x03\x02\x02\x02\u0244\u0245\x03\x02\x02\x02\u0245\u0247\x03\x02\x02\x02" +
		"\u0246\u0244\x03\x02\x02\x02\u0247\u0248\x07\x1E\x02\x02\u0248\u024C\x03" +
		"\x02\x02\x02\u0249\u024A\x07\x1D\x02\x02\u024A\u024C\x07\x1E\x02\x02\u024B" +
		"\u023E\x03\x02\x02\x02\u024B\u0249\x03\x02\x02\x02\u024Co\x03\x02\x02" +
		"\x02\u024D\u024F\x07%\x02\x02\u024E\u024D\x03\x02\x02\x02\u024F\u0252" +
		"\x03\x02\x02\x02\u0250\u024E\x03\x02\x02\x02\u0250\u0251\x03\x02\x02\x02" +
		"\u0251\u0253\x03\x02\x02\x02\u0252\u0250\x03\x02\x02\x02\u0253\u0254\x07" +
		" \x02\x02\u0254\u0258\x07\x03\x02\x02\u0255\u0259\x05r:\x02\u0256\u0259" +
		"\x05t;\x02\u0257\u0259\x05v<\x02\u0258\u0255\x03\x02\x02\x02\u0258\u0256" +
		"\x03\x02\x02\x02\u0258\u0257\x03\x02\x02\x02\u0259\u025A\x03\x02\x02\x02" +
		"\u025A\u0258\x03\x02\x02\x02\u025A\u025B\x03\x02\x02\x02\u025B\u025C\x03" +
		"\x02\x02\x02\u025C\u025D\x07\x05\x02\x02\u025Dq\x03\x02\x02\x02\u025E" +
		"\u0260\x07%\x02\x02\u025F\u025E\x03\x02\x02\x02\u0260\u0263\x03\x02\x02" +
		"\x02\u0261\u025F\x03\x02\x02\x02\u0261\u0262\x03\x02\x02\x02\u0262\u0264" +
		"\x03\x02\x02\x02\u0263\u0261\x03\x02\x02\x02\u0264\u0265\x07\x06\x02\x02" +
		"\u0265\u0266\x07\t\x02\x02\u0266\u0267\x05f4\x02\u0267s\x03\x02\x02\x02" +
		"\u0268\u026A\x07%\x02\x02\u0269\u0268\x03\x02\x02\x02\u026A\u026D\x03" +
		"\x02\x02\x02\u026B\u0269\x03\x02\x02\x02\u026B\u026C\x03\x02\x02\x02\u026C" +
		"\u026E\x03\x02\x02\x02\u026D\u026B\x03\x02\x02\x02\u026E\u026F\x07\x07" +
		"\x02\x02\u026F\u0270\x07\t\x02\x02\u0270\u0271\x05f4\x02\u0271u\x03\x02" +
		"\x02\x02\u0272\u0274\x07%\x02\x02\u0273\u0272\x03\x02\x02\x02\u0274\u0277" +
		"\x03\x02\x02\x02\u0275\u0273\x03\x02\x02\x02\u0275\u0276\x03\x02\x02\x02" +
		"\u0276\u0278\x03\x02\x02\x02\u0277\u0275\x03\x02\x02\x02\u0278\u0279\x07" +
		"\b\x02\x02\u0279\u027A\x07\t\x02\x02\u027A\u027B\x05f4\x02\u027Bw\x03" +
		"\x02\x02\x02N{\x82\x87\x8E\x94\x97\x9B\xA0\xA5\xAF\xB4\xB9\xBC\xBF\xC4" +
		"\xCD\xD2\xDA\xE4\xEA\xF1\xF9\u0103\u010B\u0112\u011D\u0123\u0129\u0132" +
		"\u0137\u0139\u013E\u0143\u0146\u0151\u0158\u015D\u0165\u016C\u016F\u0176" +
		"\u017C\u0182\u018B\u0191\u019D\u01A5\u01AC\u01B2\u01B7\u01BC\u01C6\u01CB" +
		"\u01D0\u01D9\u01E3\u01EA\u01F2\u01F7\u0205\u020C\u0211\u0219\u0220\u022A" +
		"\u022E\u0232\u0234\u0244\u024B\u0250\u0258\u025A\u0261\u026B\u0275";
	public static readonly _serializedATN: string = Utils.join(
		[
			GraphQLParser._serializedATNSegment0,
			GraphQLParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GraphQLParser.__ATN) {
			GraphQLParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(GraphQLParser._serializedATN));
		}

		return GraphQLParser.__ATN;
	}

}

export class DocumentContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(GraphQLParser.EOF, 0); }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_document; }
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
	public operationDefinition(): OperationDefinitionContext | undefined {
		return this.tryGetRuleContext(0, OperationDefinitionContext);
	}
	public fragmentDefinition(): FragmentDefinitionContext | undefined {
		return this.tryGetRuleContext(0, FragmentDefinitionContext);
	}
	public typeSystemDefinition(): TypeSystemDefinitionContext | undefined {
		return this.tryGetRuleContext(0, TypeSystemDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_definition; }
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


export class OperationDefinitionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_operationDefinition; }
	public copyFrom(ctx: OperationDefinitionContext): void {
		super.copyFrom(ctx);
	}
}
export class SelectionOnlyOperationDefinitionContext extends OperationDefinitionContext {
	public selectionSet(): SelectionSetContext {
		return this.getRuleContext(0, SelectionSetContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
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
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public selectionSet(): SelectionSetContext {
		return this.getRuleContext(0, SelectionSetContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
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
	public get ruleIndex(): number { return GraphQLParser.RULE_selectionSet; }
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


export class OperationTypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_operationType; }
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


export class SelectionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_selection; }
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
	public fieldName(): FieldNameContext {
		return this.getRuleContext(0, FieldNameContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
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
	public get ruleIndex(): number { return GraphQLParser.RULE_field; }
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


export class FieldNameContext extends ParserRuleContext {
	public NAMETYPE(): TerminalNode | undefined { return this.tryGetToken(GraphQLParser.NAMETYPE, 0); }
	public alias(): AliasContext | undefined {
		return this.tryGetRuleContext(0, AliasContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_fieldName; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterFieldName) {
			listener.enterFieldName(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitFieldName) {
			listener.exitFieldName(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.NAME);
		} else {
			return this.getToken(GraphQLParser.NAME, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_alias; }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_arguments; }
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
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public valueOrVariable(): ValueOrVariableContext {
		return this.getRuleContext(0, ValueOrVariableContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_argument; }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_fragmentSpread; }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_inlineFragment; }
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
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public directives(): DirectivesContext | undefined {
		return this.tryGetRuleContext(0, DirectivesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_fragmentDefinition; }
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
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_fragmentName; }
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


export class TypeSystemDefinitionContext extends ParserRuleContext {
	public typeDefinition(): TypeDefinitionContext | undefined {
		return this.tryGetRuleContext(0, TypeDefinitionContext);
	}
	public typeExtensionDefinition(): TypeExtensionDefinitionContext | undefined {
		return this.tryGetRuleContext(0, TypeExtensionDefinitionContext);
	}
	public directiveDefinition(): DirectiveDefinitionContext | undefined {
		return this.tryGetRuleContext(0, DirectiveDefinitionContext);
	}
	public schemaDefinition(): SchemaDefinitionContext | undefined {
		return this.tryGetRuleContext(0, SchemaDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_typeSystemDefinition; }
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
	public inputObjectTypeDefinition(): InputObjectTypeDefinitionContext | undefined {
		return this.tryGetRuleContext(0, InputObjectTypeDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_typeDefinition; }
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


export class ScalarTypeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_scalarType; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterScalarType) {
			listener.enterScalarType(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitScalarType) {
			listener.exitScalarType(this);
		}
	}
}


export class ScalarTypeDefinitionContext extends ParserRuleContext {
	public scalarType(): ScalarTypeContext {
		return this.getRuleContext(0, ScalarTypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_scalarTypeDefinition; }
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


export class ObjectTypeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_objectType; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterObjectType) {
			listener.enterObjectType(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitObjectType) {
			listener.exitObjectType(this);
		}
	}
}


export class ObjectTypeDefinitionContext extends ParserRuleContext {
	public objectType(): ObjectTypeContext {
		return this.getRuleContext(0, ObjectTypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public implementsInterfaces(): ImplementsInterfacesContext | undefined {
		return this.tryGetRuleContext(0, ImplementsInterfacesContext);
	}
	public fieldDefinition(): FieldDefinitionContext[];
	public fieldDefinition(i: number): FieldDefinitionContext;
	public fieldDefinition(i?: number): FieldDefinitionContext | FieldDefinitionContext[] {
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
	public get ruleIndex(): number { return GraphQLParser.RULE_objectTypeDefinition; }
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


export class ImplementsInterfacesContext extends ParserRuleContext {
	public implementsList(): ImplementsListContext {
		return this.getRuleContext(0, ImplementsListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_implementsInterfaces; }
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


export class ImplementsListContext extends ParserRuleContext {
	public interfaceType(): InterfaceTypeContext[];
	public interfaceType(i: number): InterfaceTypeContext;
	public interfaceType(i?: number): InterfaceTypeContext | InterfaceTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceTypeContext);
		} else {
			return this.getRuleContext(i, InterfaceTypeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_implementsList; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterImplementsList) {
			listener.enterImplementsList(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitImplementsList) {
			listener.exitImplementsList(this);
		}
	}
}


export class FieldDefinitionContext extends ParserRuleContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public NAMETYPE(): TerminalNode | undefined { return this.tryGetToken(GraphQLParser.NAMETYPE, 0); }
	public NAME(): TerminalNode | undefined { return this.tryGetToken(GraphQLParser.NAME, 0); }
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public deprecated(): DeprecatedContext | undefined {
		return this.tryGetRuleContext(0, DeprecatedContext);
	}
	public argumentsDefinition(): ArgumentsDefinitionContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_fieldDefinition; }
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


export class DeprecatedContext extends ParserRuleContext {
	public deprecationReason(): DeprecationReasonContext | undefined {
		return this.tryGetRuleContext(0, DeprecationReasonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_deprecated; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterDeprecated) {
			listener.enterDeprecated(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitDeprecated) {
			listener.exitDeprecated(this);
		}
	}
}


export class DeprecationReasonContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(GraphQLParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_deprecationReason; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterDeprecationReason) {
			listener.enterDeprecationReason(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitDeprecationReason) {
			listener.exitDeprecationReason(this);
		}
	}
}


export class ArgumentsDefinitionContext extends ParserRuleContext {
	public inputValueDefinition(): InputValueDefinitionContext[];
	public inputValueDefinition(i: number): InputValueDefinitionContext;
	public inputValueDefinition(i?: number): InputValueDefinitionContext | InputValueDefinitionContext[] {
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
	public get ruleIndex(): number { return GraphQLParser.RULE_argumentsDefinition; }
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
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
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
	public get ruleIndex(): number { return GraphQLParser.RULE_inputValueDefinition; }
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


export class InterfaceTypeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_interfaceType; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterInterfaceType) {
			listener.enterInterfaceType(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitInterfaceType) {
			listener.exitInterfaceType(this);
		}
	}
}


export class InterfaceTypeDefinitionContext extends ParserRuleContext {
	public interfaceType(): InterfaceTypeContext {
		return this.getRuleContext(0, InterfaceTypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public directives(): DirectivesContext | undefined {
		return this.tryGetRuleContext(0, DirectivesContext);
	}
	public fieldDefinition(): FieldDefinitionContext[];
	public fieldDefinition(i: number): FieldDefinitionContext;
	public fieldDefinition(i?: number): FieldDefinitionContext | FieldDefinitionContext[] {
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
	public get ruleIndex(): number { return GraphQLParser.RULE_interfaceTypeDefinition; }
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


export class UnionTypeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_unionType; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterUnionType) {
			listener.enterUnionType(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitUnionType) {
			listener.exitUnionType(this);
		}
	}
}


export class UnionTypeDefinitionContext extends ParserRuleContext {
	public unionType(): UnionTypeContext {
		return this.getRuleContext(0, UnionTypeContext);
	}
	public unionMembers(): UnionMembersContext {
		return this.getRuleContext(0, UnionMembersContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public directives(): DirectivesContext | undefined {
		return this.tryGetRuleContext(0, DirectivesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_unionTypeDefinition; }
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


export class UnionMembersContext extends ParserRuleContext {
	public typeName(): TypeNameContext[];
	public typeName(i: number): TypeNameContext;
	public typeName(i?: number): TypeNameContext | TypeNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeNameContext);
		} else {
			return this.getRuleContext(i, TypeNameContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_unionMembers; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterUnionMembers) {
			listener.enterUnionMembers(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitUnionMembers) {
			listener.exitUnionMembers(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_value; }
	public copyFrom(ctx: ValueContext): void {
		super.copyFrom(ctx);
	}
}
export class StringValueContext extends ValueContext {
	public STRING(): TerminalNode { return this.getToken(GraphQLParser.STRING, 0); }
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
export class EnumValueValueContext extends ValueContext {
	public enumValue(): EnumValueContext {
		return this.getRuleContext(0, EnumValueContext);
	}
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterEnumValueValue) {
			listener.enterEnumValueValue(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitEnumValueValue) {
			listener.exitEnumValueValue(this);
		}
	}
}
export class BooleanValueContext extends ValueContext {
	public BOOLEAN(): TerminalNode { return this.getToken(GraphQLParser.BOOLEAN, 0); }
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
export class NumberValueContext extends ValueContext {
	public NUMBER(): TerminalNode { return this.getToken(GraphQLParser.NUMBER, 0); }
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterNumberValue) {
			listener.enterNumberValue(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitNumberValue) {
			listener.exitNumberValue(this);
		}
	}
}
export class ArrayValueContext extends ValueContext {
	public array(): ArrayContext {
		return this.getRuleContext(0, ArrayContext);
	}
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterArrayValue) {
			listener.enterArrayValue(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitArrayValue) {
			listener.exitArrayValue(this);
		}
	}
}


export class EnumTypeContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_enumType; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterEnumType) {
			listener.enterEnumType(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitEnumType) {
			listener.exitEnumType(this);
		}
	}
}


export class EnumTypeDefinitionContext extends ParserRuleContext {
	public enumType(): EnumTypeContext {
		return this.getRuleContext(0, EnumTypeContext);
	}
	public enumValueDefinition(): EnumValueDefinitionContext[];
	public enumValueDefinition(i: number): EnumValueDefinitionContext;
	public enumValueDefinition(i?: number): EnumValueDefinitionContext | EnumValueDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumValueDefinitionContext);
		} else {
			return this.getRuleContext(i, EnumValueDefinitionContext);
		}
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public directives(): DirectivesContext | undefined {
		return this.tryGetRuleContext(0, DirectivesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_enumTypeDefinition; }
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


export class EnumValueDefinitionContext extends ParserRuleContext {
	public enumValue(): EnumValueContext {
		return this.getRuleContext(0, EnumValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_enumValueDefinition; }
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


export class EnumValueContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public deprecated(): DeprecatedContext | undefined {
		return this.tryGetRuleContext(0, DeprecatedContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_enumValue; }
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


export class InputObjectTypeDefinitionContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public inputValueDefinition(): InputValueDefinitionContext[];
	public inputValueDefinition(i: number): InputValueDefinitionContext;
	public inputValueDefinition(i?: number): InputValueDefinitionContext | InputValueDefinitionContext[] {
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
	public get ruleIndex(): number { return GraphQLParser.RULE_inputObjectTypeDefinition; }
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


export class TypeExtensionDefinitionContext extends ParserRuleContext {
	public objectTypeDefinition(): ObjectTypeDefinitionContext {
		return this.getRuleContext(0, ObjectTypeDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_typeExtensionDefinition; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterTypeExtensionDefinition) {
			listener.enterTypeExtensionDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitTypeExtensionDefinition) {
			listener.exitTypeExtensionDefinition(this);
		}
	}
}


export class DirectiveDefinitionContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public directiveLocations(): DirectiveLocationsContext {
		return this.getRuleContext(0, DirectiveLocationsContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public argumentsDefinition(): ArgumentsDefinitionContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_directiveDefinition; }
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
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.NAME);
		} else {
			return this.getToken(GraphQLParser.NAME, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_directiveLocations; }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_directives; }
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_directive; }
	public copyFrom(ctx: DirectiveContext): void {
		super.copyFrom(ctx);
	}
}
export class ArgumentDirectiveContext extends DirectiveContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public argument(): ArgumentContext {
		return this.getRuleContext(0, ArgumentContext);
	}
	constructor(ctx: DirectiveContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterArgumentDirective) {
			listener.enterArgumentDirective(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitArgumentDirective) {
			listener.exitArgumentDirective(this);
		}
	}
}
export class NameDirectiveContext extends DirectiveContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(ctx: DirectiveContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterNameDirective) {
			listener.enterNameDirective(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitNameDirective) {
			listener.exitNameDirective(this);
		}
	}
}
export class ValueDirectiveContext extends DirectiveContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	public valueOrVariable(): ValueOrVariableContext {
		return this.getRuleContext(0, ValueOrVariableContext);
	}
	constructor(ctx: DirectiveContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterValueDirective) {
			listener.enterValueDirective(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitValueDirective) {
			listener.exitValueDirective(this);
		}
	}
}


export class TypeConditionContext extends ParserRuleContext {
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_typeCondition; }
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


export class VariableDefinitionsContext extends ParserRuleContext {
	public variableDefinition(): VariableDefinitionContext[];
	public variableDefinition(i: number): VariableDefinitionContext;
	public variableDefinition(i?: number): VariableDefinitionContext | VariableDefinitionContext[] {
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
	public get ruleIndex(): number { return GraphQLParser.RULE_variableDefinitions; }
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
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public defaultValue(): DefaultValueContext | undefined {
		return this.tryGetRuleContext(0, DefaultValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_variableDefinition; }
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
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_variable; }
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
	public valueOrVariable(): ValueOrVariableContext {
		return this.getRuleContext(0, ValueOrVariableContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_defaultValue; }
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


export class ValueOrVariableContext extends ParserRuleContext {
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_valueOrVariable; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterValueOrVariable) {
			listener.enterValueOrVariable(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitValueOrVariable) {
			listener.exitValueOrVariable(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	public typeName(): TypeNameContext | undefined {
		return this.tryGetRuleContext(0, TypeNameContext);
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
	public get ruleIndex(): number { return GraphQLParser.RULE_type; }
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


export class TypeNameContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(GraphQLParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_typeName; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterTypeName) {
			listener.enterTypeName(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitTypeName) {
			listener.exitTypeName(this);
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
	public get ruleIndex(): number { return GraphQLParser.RULE_listType; }
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
	public get ruleIndex(): number { return GraphQLParser.RULE_nonNullType; }
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


export class ArrayContext extends ParserRuleContext {
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_array; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
}


export class SchemaDefinitionContext extends ParserRuleContext {
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	public schemaQueryDefinition(): SchemaQueryDefinitionContext[];
	public schemaQueryDefinition(i: number): SchemaQueryDefinitionContext;
	public schemaQueryDefinition(i?: number): SchemaQueryDefinitionContext | SchemaQueryDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SchemaQueryDefinitionContext);
		} else {
			return this.getRuleContext(i, SchemaQueryDefinitionContext);
		}
	}
	public schemaMutationDefinition(): SchemaMutationDefinitionContext[];
	public schemaMutationDefinition(i: number): SchemaMutationDefinitionContext;
	public schemaMutationDefinition(i?: number): SchemaMutationDefinitionContext | SchemaMutationDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SchemaMutationDefinitionContext);
		} else {
			return this.getRuleContext(i, SchemaMutationDefinitionContext);
		}
	}
	public schemaSubscriptionDefinition(): SchemaSubscriptionDefinitionContext[];
	public schemaSubscriptionDefinition(i: number): SchemaSubscriptionDefinitionContext;
	public schemaSubscriptionDefinition(i?: number): SchemaSubscriptionDefinitionContext | SchemaSubscriptionDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SchemaSubscriptionDefinitionContext);
		} else {
			return this.getRuleContext(i, SchemaSubscriptionDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_schemaDefinition; }
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


export class SchemaQueryDefinitionContext extends ParserRuleContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_schemaQueryDefinition; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterSchemaQueryDefinition) {
			listener.enterSchemaQueryDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitSchemaQueryDefinition) {
			listener.exitSchemaQueryDefinition(this);
		}
	}
}


export class SchemaMutationDefinitionContext extends ParserRuleContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_schemaMutationDefinition; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterSchemaMutationDefinition) {
			listener.enterSchemaMutationDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitSchemaMutationDefinition) {
			listener.exitSchemaMutationDefinition(this);
		}
	}
}


export class SchemaSubscriptionDefinitionContext extends ParserRuleContext {
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMENT(): TerminalNode[];
	public COMMENT(i: number): TerminalNode;
	public COMMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GraphQLParser.COMMENT);
		} else {
			return this.getToken(GraphQLParser.COMMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GraphQLParser.RULE_schemaSubscriptionDefinition; }
	// @Override
	public enterRule(listener: GraphQLListener): void {
		if (listener.enterSchemaSubscriptionDefinition) {
			listener.enterSchemaSubscriptionDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: GraphQLListener): void {
		if (listener.exitSchemaSubscriptionDefinition) {
			listener.exitSchemaSubscriptionDefinition(this);
		}
	}
}


