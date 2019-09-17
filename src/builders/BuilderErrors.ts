import { BuilderError } from '.';

export class BuilderErrors {
  public errors: BuilderError[] = [];
  public errorCount: number = 0;
  public warningCount: number = 0;

  public addError(error: BuilderError) {
    this.errors.push(error);
    if (error.isError()) {
      this.errorCount += 1;
    } else {
      this.warningCount += 1;
    }
  }

  public map<T>(f: (err: BuilderError) => T): T[] {
    return this.errors.map<T>(e => f(e));
  }

  public isClean(): boolean {
    return this.errors.length === 0;
  }

  public isFailure(): boolean {
    return this.errorCount > 0;
  }
}
