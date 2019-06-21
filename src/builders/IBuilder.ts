import { ANTLRInputStream, Lexer, Parser, TokenStream } from 'antlr4ts';
import { Try } from 'funfix';
import { BuilderError } from './BuilderError';

export interface IBuilder<T> {
  errors: BuilderError[];

  lexer(inputStream: ANTLRInputStream): Lexer;

  parser(tokenStream: TokenStream): Parser;

  build(parser: Parser): Try<T>;
}
