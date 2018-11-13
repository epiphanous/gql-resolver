import BuilderError from './BuilderError';

export class BuildErrorReport {
  public issues: BuilderError[] = [];

  constructor(issues: BuilderError[]) {
    this.issues = issues;
  }

  get errors() {
    return this.issues.filter((e) => e.isError());
  }

  get warnings() {
    return this.issues.filter((e) => e.isWarning());
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  get hasWarnings() {
    return this.warnings.length > 0;
  }

  public asThrowable() {
    return new Error(this.issues.map((e) => e.report()).join('\n'));
  }
}
