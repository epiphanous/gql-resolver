import { RecognitionException } from 'antlr4ts/RecognitionException';
import { Option } from 'funfix';
export interface IBuilderError {
    message: string;
    line: number;
    position: number;
    exception: Option<RecognitionException>;
}
export declare class BuilderError implements IBuilderError {
    message: string;
    line: number;
    position: number;
    exception: Option<RecognitionException>;
    constructor(message: string, line: number, position: number, exception?: Option<RecognitionException>);
    isError(): () => this is import("funfix").TSome<RecognitionException>;
    isWarning(): boolean;
    report(): string;
}
