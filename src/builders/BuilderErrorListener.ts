import {ANTLRErrorListener} from 'antlr4ts/ANTLRErrorListener';
import BuilderBase from './BuilderBase';
import BuilderError from './BuilderError';

export default class BuilderErrorListener<T> implements ANTLRErrorListener<any> {
  public builder: BuilderBase<T>;
  constructor(builder) {
    this.builder = builder;
  }

  public syntaxError(parser, offendingSymbol, line, position, message, exception) {
    this.builder.addError(
      new BuilderError({ line, position, message, exception }),
    );
  }
}
