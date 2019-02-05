import BuilderError from './BuilderError';

export class BuildErrorReport {
  public issues: BuilderError[] = [];

  constructor(issues: BuilderError[]) {
    this.issues = issues;
  }

  get errors() {
    return this.issues.filter(e => e.isError());
  }

  get warnings() {
    return this.issues.filter(e => e.isWarning());
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  get hasWarnings() {
    return this.warnings.length > 0;
  }

  public report() {
    const errors = this.errors.map(e => e.report());
    const warnings = this.warnings.map(w => w.report());
    const errLabel = `error${errors.length !== 1 ? 's' : ''}`;
    const warnLabel = `warning${warnings.length !== 1 ? 's' : ''}`;
    return (
      `Found ${errors.length || 'no'} ${errLabel} and ${warnings.length ||
        'no'} ${warnLabel}\n` +
      (errors.length ? `  - ${errors.join('\n  - ')}\n` : '') +
      (warnings.length ? `  * ${warnings.join('\n * ')}\n` : '')
    );
  }

  public asThrowable() {
    return new Error(this.report());
  }
}
