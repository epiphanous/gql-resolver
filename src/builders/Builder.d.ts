import { BuilderBase } from './BuilderBase';
export declare namespace Builder {
    function parse<T>(builder: BuilderBase<T>, source: string): import("funfix-core").Try<T>;
}
