import { RecognitionException } from 'antlr4ts/RecognitionException';
import { None, Option } from 'funfix';

export interface IBuilderError {
  message: string;
  line: number;
  column: number;
  severity: 'ERROR' | 'WARNING';
}

export class BuilderError implements IBuilderError {
  public message: string;
  public line: number;
  public column: number;
  public severity: 'ERROR' | 'WARNING';

  constructor(
    message: string,
    line: number,
    column: number,
    exception: Option<RecognitionException> = None,
    isError: boolean = false
  ) {
    this.line = line;
    this.column = column;
    this.severity = exception.nonEmpty() || isError ? 'ERROR' : 'WARNING';
    const baseMessage = `${this.severity}: ${message}`;
    this.message = exception
      .map(e => `${baseMessage}\nDETAILS: ${e.message}`)
      .getOrElse(baseMessage);
  }

  public isError() {
    return this.severity === 'ERROR';
  }

  public isWarning() {
    return !this.isError();
  }
}
