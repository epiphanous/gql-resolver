import { RecognitionException } from 'antlr4ts/RecognitionException';
import { None, Option } from 'funfix';

interface IBuilderError {
  message: string;
  line: number;
  position: number;
  exception: Option<RecognitionException>;
}

export default class BuilderError implements IBuilderError {
  public message: string;
  public line: number;
  public position: number;
  public exception: Option<RecognitionException>;

  constructor(
    message: string,
    line: number,
    position: number,
    exception: Option<RecognitionException> = None
  ) {
    this.message = message;
    this.line = line;
    this.position = position;
    this.exception = exception;
  }

  public isError() {
    return this.exception.nonEmpty;
  }

  public isWarning() {
    return !this.exception.nonEmpty;
  }

  public report() {
    const label = this.isError() ? 'error' : 'warning';
    return `${label}:${this.line}:${this.position}: ${this.message}`;
  }
}
