import { RecognitionException } from 'antlr4ts';
import { ANTLRErrorListener } from 'antlr4ts/ANTLRErrorListener';
import { BuilderBase } from './BuilderBase';
export declare class BuilderErrorListener<T> implements ANTLRErrorListener<any> {
    builder: BuilderBase<T>;
    constructor(builder: BuilderBase<T>);
    syntaxError(parser: any, offendingSymbol: any, line: number, position: number, message: string, exception: RecognitionException | undefined): void;
}
