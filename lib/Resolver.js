"use strict";

var _antlr = _interopRequireDefault(require("antlr4"));

var _GQLObjectQueryModifierLexer = _interopRequireDefault(require("../lib/antlr4/GQLObjectQueryModifier/GQLObjectQueryModifierLexer"));

var _GQLObjectQueryModifierParser = _interopRequireDefault(require("../lib/antlr4/GQLObjectQueryModifier/GQLObjectQueryModifierParser"));

var _GQLObjectQueryModifierListener = _interopRequireDefault(require("../lib/antlr4/GQLObjectQueryModifier/GQLObjectQueryModifierListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = 'a > 17 && b <= a';
var chars = new _antlr.default.InputStream(input);
var lexer = new _GQLObjectQueryModifierLexer.default.GQLObjectQueryModifierLexer(chars);
var tokens = new _antlr.default.CommonTokenStream(lexer);
var parse = new _GQLObjectQueryModifierParser.default.GQLObjectQueryModifierParser(tokens);
var tree = parse.filter();
console.log(tree.toStringTree(parse.ruleNames));