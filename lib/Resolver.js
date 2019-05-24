"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var funfix_1 = require("funfix");
var immutable_1 = require("immutable");
var Builder_1 = require("./builders/Builder");
var GQLQueryBuilder_1 = require("./builders/graphql/GQLQueryBuilder");
var Resolver = (function () {
    function Resolver(context) {
        this.context = context;
    }
    Resolver.prototype.resolve = function (query, vars, operationName) {
        if (vars === void 0) { vars = immutable_1.Map(); }
        if (operationName === void 0) { operationName = funfix_1.None; }
        var queryBuilder = new GQLQueryBuilder_1.GQLQueryBuilder(this.context, vars, operationName);
        return Builder_1.Builder.parse(queryBuilder, query).map(function (doc) {
            return doc.execute(queryBuilder);
        });
    };
    return Resolver;
}());
exports.Resolver = Resolver;
//# sourceMappingURL=Resolver.js.map