import { RecognitionException } from 'antlr4ts';
import { ANTLRErrorListener } from 'antlr4ts/ANTLRErrorListener';
import { Option } from 'funfix';
import { BuilderBase, BuilderError } from '.';

export class BuilderErrorListener<T> implements ANTLRErrorListener<any> {
  public builder: BuilderBase<T>;

  constructor(builder: BuilderBase<T>) {
    this.builder = builder;
  }

  public syntaxError(
    parser: any,
    offendingSymbol: any,
    line: number,
    position: number,
    message: string,
    exception: RecognitionException | undefined
  ) {
    this.builder.addError(
      new BuilderError(message, line, position, Option.of(exception))
    );
  }
}
