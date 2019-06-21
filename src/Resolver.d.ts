import { Option } from 'funfix';
import { Map } from 'immutable';
import { ResolverContext } from './models/ResolverContext';
export declare class Resolver {
    context: ResolverContext;
    constructor(context: ResolverContext);
    resolve(query: string, vars?: Map<string, any>, operationName?: Option<string>): import("funfix").Try<Promise<import("./models").QueryResult>>;
}
