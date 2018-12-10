import {Parser} from 'antlr4ts';
import {List, Map, Set} from 'immutable';
import {BindingContext, BindingsContext, QueryModificationParser} from '../../antlr4/generated/QueryModificationParser';
import {GQLBinding} from '../../models/GQLBinding';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';
import GQLObjectQueryModifierBuilder from './GQLObjectQueryModifierBuilder';

export default class GQLBindingsBuilder extends GQLObjectQueryModifierBuilder {
    public result: List<GQLBinding>;

    constructor(
        validFields: Map<string, string>,
        validVariables: Set<GQLVariableDefinition>,
        vars: Map<string, any>,
        prefixes: Set<string>,
        source: string = 'bindings'
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
        return (parser as QueryModificationParser).bindings();
    }

    public exitBindings(context: BindingsContext) {
        this.result = this.processBindings(context);
    }

    public processBindings(context: BindingsContext) {
        return List(context.binding()).map(a => this.processBinding(a));
    }

    public processBinding(context: BindingContext) {
        const expression = this.processExpression(context.expression());
        const varName = context.VARNAME().text;
        this.check(
            this.validFields.get(varName).isEmpty(),
            `binding variable ${varName} clashes with existing field name`,
            context
        );
        this.check(
            !this.validVariables.some(a => a.name === varName),
            `binding variable ${varName} clashes with existing variable name`,
            context
        );
        return new GQLBinding(varName, expression);
    }

}
