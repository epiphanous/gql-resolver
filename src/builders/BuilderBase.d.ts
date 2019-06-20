import { ANTLRInputStream, Lexer, Parser, TokenStream } from 'antlr4ts';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Try } from 'funfix';
import { BuilderError } from './BuilderError';
import { BuildErrorReport } from './BuildErrorReport';
import { IBuilder } from './IBuilder';
export declare class BuilderBase<T> implements IBuilder<T>, ParseTreeListener {
    errors: BuilderError[];
    readonly errorCount: number;
    readonly warningCount: number;
    readonly errorReport: BuildErrorReport;
    parser(tokenStream: TokenStream): Parser;
    lexer(inputStream: ANTLRInputStream): Lexer;
    build(parser: Parser): Try<T>;
    addError(error: BuilderError): void;
    textOf(t: TerminalNode, stripQuotes?: boolean): string;
    check(ok: boolean, message: string, ctx: ParserRuleContext, isError?: boolean): boolean;
    enterEveryRule(): void;
}
