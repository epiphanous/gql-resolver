import { BuilderError } from './BuilderError';
export declare class BuildErrorReport {
    issues: BuilderError[];
    constructor(issues: BuilderError[]);
    readonly errors: BuilderError[];
    readonly warnings: BuilderError[];
    readonly hasErrors: boolean;
    readonly hasWarnings: boolean;
    report(): string;
    asThrowable(): Error;
}
