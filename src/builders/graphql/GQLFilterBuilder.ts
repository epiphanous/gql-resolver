import {Map, Set} from 'funfix';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';

export default class GQLFilterBuilder extends GQLObjectQueryModifierBuilder {
    public validFields: Map<string, string>;
    public validVariables: Set<GQLVariableDefinition>;
    public vars: Map<string>;
    public prefixes: Set<string>;
    public source: string;

    constructor(
        validFields: Map<string, string>,
        validVariables: Set<GQLVariableDefinition>,
        vars: Map<string, any>,
        prefixes: Set<string>,
        source: string = 'filter'
    ) {

    }

}
