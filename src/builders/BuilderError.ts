import {RecognitionException} from 'antlr4ts/RecognitionException';
import Record from 'dataclass';
import {Option} from 'funfix';

export default class BuilderError extends Record<BuilderError> {
  public exception: Option<RecognitionException>;
  public line: number;
  public message: string;
  public position: number;

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
