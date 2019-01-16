import { ANTLRInputStream, Lexer, Parser, TokenStream } from 'antlr4ts';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { NotImplementedError, Option, Try } from 'funfix';
import BuilderError from './BuilderError';
import { BuildErrorReport } from './BuildErrorReport';
import IBuilder from './IBuilder';

export default class BuilderBase<T> implements IBuilder<T>, ParseTreeListener {
  public errors: BuilderError[] = [];

  public parser(tokenStream: TokenStream): Parser {
    throw new NotImplementedError('not implemented');
  }

  public lexer(inputStream: ANTLRInputStream): Lexer {
    throw new NotImplementedError('not implemented');
  }

  public build(parser: Parser): Try<T> {
    throw new NotImplementedError('not implemented');
  }

  get errorCount() {
    return this.errors.filter(e => e.isError()).length;
  }

  get warningCount() {
    return this.errors.filter(e => e.isWarning()).length;
  }

  get errorReport() {
    return new BuildErrorReport(this.errors);
  }

  public addError(error: BuilderError) {
    this.errors.push(error);
  }

  public textOf(t: TerminalNode, stripQuotes: boolean = true): string {
    return stripQuotes
      ? t.text.replace(/^['"]/, '').replace(/['"]$/, '')
      : t.text;
  }

  public check(
    ok: boolean,
    message: string,
    ctx: ParserRuleContext,
    isError: boolean = true
  ) {
    if (!ok) {
      const start = ctx.start;
      const error = new BuilderError(
        message,
        start.line,
        start.charPositionInLine,
        Option.of(ctx.exception)
      );
      this.addError(error);
    }
  }

  // keeps typescript happy
  public enterEveryRule() {
    // noop
  }
}
