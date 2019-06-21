"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const funfix_1 = require("funfix");
const immutable_1 = require("immutable");
const Builder_1 = require("./builders/Builder");
const GQLQueryBuilder_1 = require("./builders/graphql/GQLQueryBuilder");
class Resolver {
    constructor(context) {
        this.context = context;
    }
    resolve(query, vars = immutable_1.Map(), operationName = funfix_1.None) {
        const queryBuilder = new GQLQueryBuilder_1.GQLQueryBuilder(this.context, vars, operationName);
        return Builder_1.Builder.parse(queryBuilder, query).map(doc => doc.execute(queryBuilder));
    }
}
exports.Resolver = Resolver;
//# sourceMappingURL=Resolver.js.map