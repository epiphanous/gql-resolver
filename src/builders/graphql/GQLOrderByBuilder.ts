import {Parser} from 'antlr4ts';
import {List, Map, Set} from 'immutable';
import {Option} from 'funfix';
import {OrderByContext, OrderBysContext, QueryModificationParser} from '../../antlr4/generated/QueryModificationParser';
import {GQLOrderBy} from '../../models/GQLOrderBy';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';
import GQLObjectQueryModifierBuilder from './GQLObjectQueryModifierBuilder';

export default class GQLOrderByBuilder extends GQLObjectQueryModifierBuilder {
    public result: List<GQLOrderBy>;
    constructor(
        validFields: Map<string, string>,
        validVariables: Set<GQLVariableDefinition>,
        vars: Map<string, any>,
        prefixes: Set<string>,
        source: string = 'order'
    ) {
        super(
            validFields,
            validVariables,
            vars,
            prefixes,
            source
        );
    }

    public parse(parser: Parser) {
        return (parser as QueryModificationParser).orderBys();
    }

    public exitOrderBys(context: OrderBysContext) {
        this.result = this.processOrderBys(context);
    }

    public processOrderBys(context: OrderBysContext) {
        return List(context.orderBy()).map(a => this.processOrderBy(a));
    }

    public processOrderBy(context: OrderByContext) {
        const expression = this.processExpression(context.expression()).expression;
        const desc = Option.of(context.DESC()).nonEmpty();
        return new GQLOrderBy(expression, desc);
    }

}
