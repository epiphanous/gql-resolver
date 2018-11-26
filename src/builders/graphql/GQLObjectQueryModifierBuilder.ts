import {CharStream, Parser, TokenStream} from 'antlr4ts';
import { Failure, Some, Try, None} from 'funfix';
import Map, {List} from 'immutable';
import {QueryModificationParser} from '../../antlr4/generated/QueryModificationParser';
import {
    GQLObjectQueryModifierConjunction,
    GQLObjectQueryModifierDisjunction
} from '../../models/GQLObjectQueryModifierExpression';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';
import BuilderBase from '../BuilderBase';

abstract class GQLObjectQueryModifierBuilder extends BuilderBase<any> {
    public PREFIXED_IRI_PATTERN: string;
    public rPREFIXED_IRI_PATTERN: RegExp;
    constructor(
        validFields: Map[string],
        validVariables: Set<GQLVariableDefinition>,
        vars: Map[any],
        prefixes: Set<string>,
        source: string = 'filter'
    ) {
        super();
        const PREFIXED_IRI_PATTERN = `(${prefixes.join('|')})_(.*)`;
        const rPREFIXED_IRI_PATTERN = new RegExp(PREFIXED_IRI_PATTERN);

        const result: any;

    }

    public parser(tokenStream: TokenStream) {
        return new QueryModificationParser(tokenStream);
    }

    public lexer(input: CharStream) {
        return new GQLObjectQueryModifierLexer(input);
    }

    public build(parser: Parser) {
        const tryParse = Try.of(this.parse(parser));
        if (tryParse.isSuccess()) {
            if (this.errorReport.hasErrors()) {
                return Failure(this.errorReport.asThrowable());
            } else {
                if (this.errorReport.hasWarnings()) {
                    this.errorReport.warnings.foreach(warn => console.warn(warn));
                }
                return Success(this.result); // ??
            }
        }
    }

    public simplifyConjunction(conjunction: GQLObjectQueryModifierConjunction): GQLObjectQueryModifierConjunction {
        const newConjunctives = conjunction.conjunctives.flatMap(conjunctive => {
            if (!conjunctive.hasNot) {
                let disjunctionOpt: Option[GQLObjectQueryModifierDisjunction] = conjunctive.expr.expr;
                if (conjunctive.expr.expr.constructor.name === 'GQLObjectQueryModifierParensExpression') {
                    if (conjuctive.expr.expr.expr.constructor.name === 'GQLObjectQueryModifierDisjunction') {
                        disjunctionOpt = Some(conjunctive.expr.expr.expr);
                        break;
                    } else {
                        disjunctionOpt = None;
                        break;
                    }
                } else if (conjunctive.expr.expr.constructor.name === 'GQLObjectQueryModifierDisjunction'){
                    disjunctionOpt = Some(conjunctive.expr.expr);
                    break;
                } else {
                    disjunctionOpt = None;
                    break;
                }
                if (disjunctionOpt.isDefined()) {
                    const disjunction = this.simplifyDisjunction(disjunctionOpt.get);
                    if (disjunction.disjunctives.size === 1 && disjunction.values.isEmpty()) {
                        return disjuction.disjunctives[0].conjuctives;
                    } else {
                        return List(conjunctive);
                    }
                } else {
                    return List(conjuctive);
                }
            } else {
                return List(conjuctive);
            }
        });
    }

    public simplifyDisjunction(disjunction: GQLObjectQueryModifierDisjunction): GQLObjectQueryModifierDisjunction {
        if (disjunction.value.isEmpty) {
            const newDisjunctives = disjunction.disjunctives.map(a => this.simplifyConjunction(a)).flatMap(disjunctive => {
                const conjunction = disjunctive;
                if (conjunction.conjuctives.size === 1 && !!conjunction.conjuctives[0]) {
                    const disjunctionOpt: Option;
                    if (conjunction.conjuctives[0].expr.expr.constructor.name === 'GQLObjectQueryModifierParensExpression') {
                        if (conjunction.conjuctives[0].expr.expr.expr.constructor.name === 'GQLObjectQueryModifierDisjunction') {
                            this.disjunctionOpt = Some(conjunction.conjuctives[0].expr.expr.expr);
                        } else {
                            this.disjunctionOpt = None;
                        }
                    } else if (conjunction.conjuctives[0].expr.expr.constructor.name === 'GQLObjectQueryModifierDisjunction') {
                        this.disjunctionOpt = Some(conjunction.conjuctives[0].expr.expr);
                    } else {
                        return None;
                    }
                    if (disjunctionOpt.isDefined()) {
                        return disjunctionOpt.get.disjunctives;
                    } else {
                        return List(disjunctive);
                    }
                } else {
                    return List(disjunctive);
                }
            });
            return GQLObjectQueryModifierDisjunction(newDisjunctives, List().clear());
        } else {
            return disjunction;
        }
    }
}
