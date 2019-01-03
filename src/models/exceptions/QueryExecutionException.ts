export default class QueryExecutionException extends Error {
    constructor(errString: string) {
        super(errString);
        Object.setPrototypeOf(this, QueryExecutionException.prototype);
    }
}
