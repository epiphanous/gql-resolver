import { CodePointCharStream, Lexer, Parser, TokenStream } from 'antlr4ts';
import { Try } from 'funfix';
import { BuilderErrors } from '.';

export interface IBuilder<T> {
  errors: BuilderErrors;

  lexer(inputStream: CodePointCharStream): Lexer;

  parser(tokenStream: TokenStream): Parser;

  build(parser: Parser): Try<T>;
}
