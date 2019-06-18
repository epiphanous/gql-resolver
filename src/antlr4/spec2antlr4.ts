import cheerio = require('cheerio');
import fetch from 'node-fetch';

const sourceCharMap = {
  all: '.',
  nole: '~[\\r\\n\\u0085\\u2028\\u2029]',
  noqs: '~["\'\\\\]',
  noleqs: '~["\'\\r\\n\\u0085\\u2028\\u2029\\\\]',
};

const lexicals: { [key: string]: boolean } = {};

const addToLexicals: string[] = [];

const ruleStart = '\n  : ';
const ruleSep = '\n  | ';
const ruleEnd = '\n  ;\n';

const emitIgnored = () =>
  `IGNORED${ruleStart}[ ,\\t\\r\\n\\ufeff]+ -> skip${ruleEnd}`;

const screamingCase = (s: string) =>
  s.replace(/(.)([A-Z])/g, '$1_$2').toUpperCase();

const downFirstCase = (s: string) => s.charAt(0).toLowerCase() + s.substring(1);

const caseName = (name: string) =>
  lexicals[name] ? screamingCase(name) : downFirstCase(name);

const emitHeader = () => {
  const now = new Date();
  const year = now.getFullYear();
  console.log(`
/***********************************************************************
 * Copyright 2019${year > 2019 ? `-${year}` : ''} Epiphanous Consulting, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Generated from https://facebook.github.io/graphql/draft/#sec-Appendix-Grammar-Summary
 * on ${new Date().toISOString()}
 *
 * The GraphQL spec is (C)opyright 2012-${year} Facebook.
 */

  `);
};

class Production {
  public section: string;
  public name: string;
  public rules: Rule[];

  constructor(section: string, name: string, rules: Rule[]) {
    this.section = section;
    this.name = name;
    this.rules = rules;
    if (
      this.section !== 'Document' ||
      (name === 'BooleanValue' || name === 'NullValue' || name === 'EnumValue')
    ) {
      lexicals[name] = true;
    }
  }

  public emit(): string {
    const rhs = this.rules.map(rule => rule.emit()).join(ruleSep);
    const name = caseName(this.name);
    const stdDef = `${name}${ruleStart}${rhs}${ruleEnd}`;
    // handle special case lexicals
    switch (this.name) {
      case 'Document':
        return `grammar GraphQL${ruleEnd}\n${name}${ruleStart}${rhs} EOF${ruleEnd}`;
      case 'SourceCharacter':
      case 'Token':
      case 'Punctuator':
      case 'UnicodeBOM':
      case 'LineTerminator':
      case 'Comma':
      case 'WhiteSpace':
      case 'Ignored':
        return ''; // ignore these
      case 'BooleanValue':
      case 'NullValue':
      case 'EnumValue':
        addToLexicals.push(stdDef); // migrate these to lexicals
        return '';
      case 'CommentChar':
        return `fragment ${name}${ruleStart}${sourceCharMap.nole}${ruleEnd}`;
      case 'Comment': // comments are ignored as well
        return `${name}${ruleStart}${rhs} -> skip${ruleEnd}`;
      case 'StringCharacter':
        return (
          `fragment ${name}${ruleStart}${sourceCharMap.noleqs}${ruleSep}` +
          `'\\\\u' ${caseName('EscapedUnicode')}${ruleSep}` +
          `'\\\\' ${caseName('EscapedCharacter')}${ruleEnd}`
        );
      case 'BlockStringCharacter':
        return (
          `fragment ${name}${ruleStart}${sourceCharMap.noqs}${ruleSep}` +
          `'\\\\u' ${caseName('EscapedUnicode')}${ruleSep}` +
          `'\\\\' ${caseName('EscapedCharacter')}${ruleEnd}`
        );
      case 'EscapedUnicode':
        return (
          `fragment HEX${ruleStart}[A-Fa-f0-9]${ruleEnd}\n` +
          `fragment ${name}${ruleStart}HEX HEX HEX HEX${ruleEnd}`
        );
      case 'EscapedCharacter':
        return `fragment ${name}${ruleStart}["'\/bfnrt]${ruleEnd}`;
      case 'NonZeroDigit':
        return `fragment ${name}${ruleStart}[1-9]${ruleEnd}`;
      case 'Digit':
        return `fragment ${name}${ruleStart}[0-9]${ruleEnd}`;
      case 'IntegerPart':
      case 'NegativeSign':
      case 'FractionalPart':
      case 'ExponentPart':
      case 'ExponentIndicator':
      case 'Sign':
        return `fragment ${name}${ruleStart}${rhs}${ruleEnd}`;
      default:
        return stdDef;
    }
  }
}

class Rule {
  public type: string;
  public tokens: Token[];

  constructor(type: string, tokens: Token[]) {
    this.type = type;
    this.tokens = tokens;
  }

  public emit(): string {
    return this.type === 'spec-rhs' ? this.emitRhs() : this.emitOneOf();
  }

  public emitRhs(): string {
    return this.tokens.map(token => token.emit()).join(' ');
  }

  public emitOneOf(): string {
    return this.tokens.map(token => token.emit()).join(' | ');
  }
}

class Token {
  public type: string;
  public name: string;
  public isOptional: boolean = false;
  public isList: boolean = false;
  public constraints: Token[] = []; // don't emit these, just consume them

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }

  public emit(): string {
    const qual = this.isList
      ? this.isOptional
        ? '*'
        : '+'
      : this.isOptional
      ? '?'
      : '';
    const maybeConstraints = this.constraints
      .map(token => token.emit())
      .join(' | ');
    switch (this.type) {
      case 'spec-t':
        let value = this.name;
        switch (value) {
          case '\\u':
            value = '\\\\u';
            break;
          case '\\':
            value = '\\\\';
            break;
          default:
            value = value.replace(/\\([^u])/g, '\\\\$1');
            break;
        }
        return `'${value}'${qual}`;
      default:
        return `${caseName(this.name)}${qual}`;
    }
  }
}

class Quantifier {
  public optional: boolean;
  public list: boolean;

  constructor(optional: boolean, list: boolean) {
    this.optional = optional;
    this.list = list;
  }
}

async function getSpecHtml() {
  const response = await fetch('https://facebook.github.io/graphql/draft');
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const body = await response.text();
  const cs = cheerio.load(body);
  cs('.spec-condition not').remove();
  return cs;
}

function parse($: CheerioStatic): Production[] {
  const productions = $('#sec-Appendix-Grammar-Summary .spec-production');
  return productions.map((_, el) => parseProduction($, $(el))).get();
}

function parseProduction($: CheerioStatic, prod: Cheerio): Production {
  const section = prod
    .parent()
    .find('h2, h3')
    .first()
    .contents()
    .last()
    .text()
    .replace(/^Appendix: Grammar Summary$/, 'Global');
  const name = prod.attr('id');
  const rules = prod
    .find('>.spec-rhs, >.spec-oneof')
    .map((_, el) => parseRule($, $(el)))
    .get();
  return new Production(section, name, rules);
}

function parseRule($: CheerioStatic, rule: Cheerio): Rule {
  let result: Rule;

  if (rule.hasClass('spec-rhs')) {
    result = new Rule(
      'spec-rhs',
      rule
        .find('>span:not(.spec-condition)')
        .map((_, el) => parseToken($, $(el)))
        .get()
    );
  } /*if (rule.hasClass('spec-oneof'))*/ else {
    result = new Rule(
      'spec-oneof',
      rule
        .find('.spec-rhs')
        .map((_, el) => parseRule($, $(el)))
        .get()
    );
  }
  return result;
}

function parseToken($: CheerioStatic, token: Cheerio): Token {
  const tokenType = token.attr('class');
  switch (tokenType) {
    case 'spec-t':
    case 'spec-lookahead not':
      return new Token(tokenType, token.text());
    case 'spec-prose':
      const prose = token.text();
      if (/^[^(]+\(U\+([0-9A-F]{4})\)/.test(prose)) {
        return new Token('spec-t', `\\u${RegExp.$1}`);
      } else {
        return new Token(tokenType, prose);
      }
    case 'spec-rx':
      const fragment = token
        .text()
        .replace(/(^\/|\/$)/g, '')
        .replace(/\]\[/g, '] [');
      return new Token(tokenType, fragment);
    case 'spec-nt':
      return new Token(tokenType, token.children('a').text());
    case 'spec-constrained':
      const ctoken = parseToken($, token.children().first());
      ctoken.constraints = token
        .children('.spec-butnot')
        .children()
        .map((_, el) => parseToken($, $(el)))
        .get();
      return ctoken;
    case 'spec-quantified':
      const qtoken = parseToken($, token.children().first());
      const quant = parseQuantifiers(
        $,
        token.children('.spec-quantifiers').first()
      );
      qtoken.isOptional = quant.optional;
      qtoken.isList = quant.list;
      return qtoken;
    default:
      throw tokenType;
  }
}

function parseQuantifiers($: CheerioStatic, quantifiers: Cheerio): Quantifier {
  const optional = quantifiers.children('.optional').length > 0;
  const list = quantifiers.children('.list').length > 0;
  return new Quantifier(optional, list);
}

getSpecHtml()
  .then($ => {
    const productions = parse($);
    emitHeader();
    ['Document', 'Lexical Tokens', 'Ignored Tokens'].forEach(section => {
      const prods = productions.filter(prod => prod.section === section);
      const sectionValue = prods.map(prod => prod.emit()).join('\n');
      if (section === 'Lexical Tokens') {
        console.log(
          `//----------------[ ${section.toUpperCase()}]----------------\n` +
            `${sectionValue}\n${addToLexicals.join('\n')}`
        );
      } else {
        console.log(sectionValue);
      }
    });
    console.log(emitIgnored());
  })
  .catch(err => {
    console.error(err);
  });
