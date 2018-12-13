import {TerminalNode} from 'antlr4ts/tree/TerminalNode';
import {None, Option, Try} from 'funfix';
import {Map, Set} from 'immutable';
import { List } from 'immutable';
import {
    ArrayValueContext,
    BooleanValueContext,
    DefaultValueContext,
    DeprecatedContext,
    DirectiveDefinitionContext,
    EnumTypeDefinitionContext,
    EnumValueValueContext,
    FieldDefinitionContext,
    GraphQLParser,
    InputObjectTypeDefinitionContext,
    InterfaceTypeDefinitionContext,
    NumberValueContext,
    ObjectTypeDefinitionContext,
    ScalarTypeDefinitionContext,
    SchemaDefinitionContext,
    SchemaMutationDefinitionContext,
    SchemaQueryDefinitionContext,
    SchemaSubscriptionDefinitionContext,
    StringValueContext,
    UnionTypeDefinitionContext,
    ValueContext,
    ValueOrVariableContext,
} from '../../antlr4/generated/GraphQLParser';
import {GQLDirective} from '../../models/GQLDirective';
import {GQLSchema} from '../../models/GQLSchema';
import {GQLType} from '../../models/GQLType';
import {
    GQLArgumentDefinition,
    GQLDirectiveDefinition,
    GQLEnum, GQLEnumValueDefinition,
    GQLFieldDefinition,
    GQLInputType,
    GQLInterface,
    GQLObjectType,
    GQLScalarType,
    GQLTypeDefinition,
    GQLUnion
} from '../../models/GQLTypeDefinition';
import {
    GQLArrayValue,
    GQLBooleanValue,
    GQLDoubleValue,
    GQLEnumValue,
    GQLIntValue,
    GQLStringValue, GQLValue
} from '../../models/GQLValue';
import GQLDocumentBuilder from './GQLDocumentBuilder';

const STANDARD_ARG_DESCRIPTION: { [key: string]: string } = {
    bindings:
        'Optional semi-colon separated list of one or more additional computed values to generate in results',
    boosters:
        'Optional semi-colon separated list of one or more followsUser, followedByUser, or sameRaceAs boosts',
    filter: 'Optional boolean expression to filter our results',
    limit: 'Optional integer number to limit result set size',
    offset: 'Optional integer number of objects to skip before returning results',
    order:
        'Optional comma or semi-colon separated list of one or more fields to order results by',
    patterns:
        'Optional semi-colon separated list of one or more textmatch, geomatch or geonearby patterns to match against',
};

export default class GQLSchemaBuilder extends GQLDocumentBuilder<GQLSchema> {
    public operationTypes: Map<string, string>;
    public scalarTypes: Set<GQLScalarType>;
    public interfaces: Set<GQLInterface>;
    public objectTypes: Set<GQLObjectType>;
    public inputTypes: Set<GQLInputType>;
    public unions: Set<GQLUnion>;
    public enums: Set<GQLEnum>;
    public directives: Set<GQLDirectiveDefinition>;
    public allTypes: Map<string, GQLTypeDefinition>;
    public allFields: Map<string, GQLFieldDefinition>;

    constructor() {
        super();
        this.operationTypes = Map();
        this.scalarTypes = Set();
        this.interfaces = Set();
        this.objectTypes = Set();
        this.inputTypes = Set();
        this.unions = Set();
        this.enums = Set();
        this.directives = Set();
        this.allTypes = Map();
        this.allFields = Map();
    }

    public build(parser: GraphQLParser): Try<GQLSchema> {
        this.parseWith(parser);
        if (this.errorCount) {
            Try.failure(this.errorReport.asThrowable());
        } else {
            this.scalarTypes.withMutations((set) =>
                ['ID', 'String', 'Boolean', 'Int', 'Float'].forEach((t) =>
                    set.add(
                        new GQLScalarType(
                        t,
                        'Built-in GraphQL type $t',
                        Option.of(t)
                    ))));
            const s = Map<string, GQLScalarType>(this.scalarTypes.map<[string, GQLScalarType]>((x) => [x.name, x]).toArray());
            const i = Map<string, GQLInterface>(this.interfaces.map<[string, GQLInterface]>((x) => [x.name, x]).toArray());
            const o = Map<string, GQLObjectType>(this.objectTypes.map<[string, GQLObjectType]>((x) => [x.name, x]).toArray());
            const u = Map<string, GQLUnion>(this.unions.map<[string, GQLUnion]>((x) => [x.name, x]).toArray());
            const e = Map<string, GQLEnum>(this.enums.map<[string, GQLEnum]>((x) => [x.name, x]).toArray());
            const d = Map<string, GQLDirectiveDefinition>(this.directives.map<[string, GQLDirectiveDefinition]>((x) => [x.name, x]).toArray());
            const n = Map<string, GQLInputType>(this.inputTypes.map<[string, GQLInputType]>((x) => [x.name, x]).toArray());
            const allTypes = Map<string, GQLTypeDefinition>().withMutations(map =>
                map.merge(s).merge(i).merge(o).merge(u).merge(e)
            );
            const schema = new GQLSchema(
                this.allFields,
                allTypes,
                d,
                e,
                n,
                i,
                o,
                this.operationTypes,
                s,
                u,
            );
            return Try.of(() => schema);
        }
    }

    public getComment(comments: Option<TerminalNode[]>) {
        return comments
            .map((nodes) =>
                nodes.map((t) => this.textOf(t).replace('#\\s*', '')).join('\n'),
            )
            .getOrElse('');
    }

    public exitSchemaQueryDefinition(ctx: SchemaQueryDefinitionContext) {
        this.operationTypes.set(
            'query',
            this.textOf(
                ctx
                    .type()
                    .typeName()
                    .NAME(),
            ),
        );
    }

    public exitSchemaMutationDefinition(ctx: SchemaMutationDefinitionContext) {
        this.operationTypes.set(
            'mutation',
            this.textOf(
                ctx
                    .type()
                    .typeName()
                    .NAME(),
            ),
        );
    }

    public exitSchemaSubscriptionDefinition(ctx: SchemaSubscriptionDefinitionContext) {
        this.operationTypes.set(
            'subscription',
            this.textOf(
                ctx
                    .type()
                    .typeName()
                    .NAME(),
            ),
        );
    }

    public exitSchemaDefinition(ctx: SchemaDefinitionContext) {
        this.check(
            ctx.schemaQueryDefinition().length === 1,
            'missing query definition',
            ctx,
        );
    }

    public exitScalarTypeDefinition(ctx: ScalarTypeDefinitionContext) {
        const sType: string = this.textOf(ctx.scalarType().NAME());
        const xsdToType: {[key: string]: string} = {
            xsd_anyURI: 'ID',
            xsd_boolean: 'Boolean',
            xsd_float: 'Float',
            xsd_integer: 'Int',
            xsd_string: 'String',
        };
        const nType: Option<string> = Option.of(xsdToType[sType]);
        this.scalarTypes.add(
            new GQLScalarType(
                this.getComment(Option.of(ctx.COMMENT())),
                sType,
                nType,
            ),
        );
    }

    public exitInterfaceTypeDefinition(ctx: InterfaceTypeDefinitionContext) {
        this.interfaces.add(
            new GQLInterface(
                this.textOf(ctx.interfaceType().NAME()),
                this.getComment(Option.of(ctx.COMMENT())),
                List(ctx.fieldDefinition()
                    .map((fd) =>  this.getFieldDefinition(fd))) || List<GQLFieldDefinition>()
            ),
        );
    }

    public exitObjectTypeDefinition(ctx: ObjectTypeDefinitionContext) {
        this.objectTypes.add(
            new GQLObjectType(
                this.textOf(ctx.objectType().NAME()),
                this.getComment(Option.of(ctx.COMMENT())),
                List(ctx.fieldDefinition().map((fdc) => this.getFieldDefinition(fdc))),
                Option.of(ctx.implementsInterfaces()).map((il) => {
                    return List(il.implementsList()
                        .interfaceType()
                        .map((i) => this.textOf(i.NAME())));
                }).getOrElse(List<string>())
            ),
        );
    }

    public exitUnionTypeDefinition(ctx: UnionTypeDefinitionContext) {
        this.unions.add(
            new GQLUnion(
                this.textOf(ctx.unionType().NAME()),
                this.getComment(Option.of(ctx.COMMENT())),
                List(ctx
                    .unionMembers()
                    .typeName()
                    .map((t) => this.textOf(t.NAME()))),
            ),
        );
    }

    public exitEnumTypeDefinition(ctx: EnumTypeDefinitionContext) {
        this.enums.add(
            new GQLEnum(
                this.textOf(ctx.enumType().NAME()),
                this.getComment(Option.of(ctx.COMMENT())),
                List(ctx.enumValueDefinition().map((ev) => {
                const evc = ev.enumValue();
                const name = this.textOf(evc.NAME());
                const desc = this.getComment(Option.of(evc.COMMENT()));
                const [isDeprecated, deprecationReason] = this.getDeprecation(
                    Option.of(evc.deprecated()),
                );
                return new GQLEnumValueDefinition(
                    name,
                    desc,
                    isDeprecated,
                    deprecationReason,
                );
            })),
    ),
    )
        ;
    }

    public exitDirectiveDefinition(ctx: DirectiveDefinitionContext) {
        const args = Option.of(ctx.argumentsDefinition())
            .map((ad) =>
                List(ad
                    .inputValueDefinition()
                    .map(
                        (a) =>
                            new GQLArgumentDefinition(
                                this.textOf(a.NAME()),
                                this.getComment(Option.of(a.COMMENT())),
                                this.getType(a.type()),
                                this.processDefaultValue(Option.of(a.defaultValue())),
                            ),
                    )
                ),
            )
            .getOrElse(List<GQLArgumentDefinition>());
        const locations = Option.of(ctx.directiveLocations())
            .map((l) => List(l.NAME().map((n) => this.textOf(n))))
            .getOrElse(List<string>());
        this.directives.add(
            new GQLDirectiveDefinition(
                this.textOf(ctx.NAME()),
                this.getComment(Option.of(ctx.COMMENT())),
                args,
                locations,
            ),
        );
    }

    public exitInputObjectTypeDefinition(ctx: InputObjectTypeDefinitionContext) {
        const name = this.textOf(ctx.NAME());
        const desc = this.getComment(Option.of(ctx.COMMENT()));
        const args = Option.of(
            List(ctx
                .inputValueDefinition()
                .map(
                    (a) =>
                        new GQLArgumentDefinition(
                            this.textOf(a.NAME()),
                            this.getComment(Option.of(a.COMMENT())),
                            this.getType(a.type()),
                            this.processDefaultValue(Option.of(a.defaultValue())),
                        ),
                )
            ),
        ).getOrElse(List<GQLArgumentDefinition>());
        this.inputTypes.add(new GQLInputType(name, desc, args));
    }

    public getFieldDefinition(ctx: FieldDefinitionContext) {
        const fieldName = this.textOf(Option.of(ctx.NAMETYPE()).getOrElse(ctx.NAME()));
        const fieldType = this.getType(ctx.type());
        const args = Option.of(ctx.argumentsDefinition())
            .map((ad) =>
                List(ad.inputValueDefinition().map((a) => {
                    const argName = this.textOf(a.NAME());
                    let argDesc = this.getComment(Option.of(a.COMMENT()));
                    if (argDesc.length === 0) {
                        argDesc = STANDARD_ARG_DESCRIPTION[argName] || '';
                    }
                    return new GQLArgumentDefinition(
                        this.textOf(a.NAME()),
                        argDesc,
                        this.getType(a.type()),
                        this.processDefaultValue(Option.of(a.defaultValue())),
                    );
                })),
            )
            .getOrElse(List<GQLArgumentDefinition>());
        const [isDeprecated, deprecationReason] = this.getDeprecation(
            Option.of(ctx.deprecated()),
        );
        const fd = new GQLFieldDefinition(
            fieldName,
            this.getComment(Option.of(ctx.COMMENT())),
            fieldType,
            isDeprecated,
            deprecationReason,
            args,
        );
        this.allFields.set(fieldName, fd);
        return fd;
    }

    public getDeprecation(ctxOpt: Option<DeprecatedContext>): [boolean, Option<string>] {
        if (!ctxOpt.isEmpty()) {
            const drcOpt = Option.of(ctxOpt.get().deprecationReason());
            if (!drcOpt.isEmpty()) {
                const dr = this.textOf(drcOpt.get().STRING());
                return [true, Option.of(dr)];
            }
            return [true, None];
        } else {
            return [false, None];
        }
    }

    public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
        return ctxOpt.map((dv) => this.processValueOrVariable(dv.valueOrVariable()));
    }

    public processValueOrVariable(ctx: ValueOrVariableContext) {
        const valueOpt = Option.of(ctx.value());
        const varOpt = Option.of(ctx.variable());
        if (!valueOpt.isEmpty() && varOpt.isEmpty()) {
            return this.processValue(valueOpt.get());
        }
        throw new Error('wat?');
    }

    public processValue(ctx: ValueContext): GQLValue {
        if (ctx instanceof StringValueContext) {
            return new GQLStringValue(this.textOf(ctx.STRING()));
        }
        if (ctx instanceof NumberValueContext) {
            const numText = ctx.NUMBER().text;
            if (numText.indexOf('.') > -1) {
                return new GQLDoubleValue(parseFloat(numText));
            } else {
                return new GQLIntValue(parseInt(numText, 10));
            }
        }
        if (ctx instanceof BooleanValueContext) {
            return new GQLBooleanValue(this.textOf(ctx.BOOLEAN()));
        }
        if (ctx instanceof ArrayValueContext) {
            return new GQLArrayValue(
                ctx
                    .array()
                    .value()
                    .map(this.processValue),
            );
        }
        if (ctx instanceof EnumValueValueContext) {
            return new GQLEnumValue(this.textOf(ctx.enumValue().NAME()));
        }
    }
}
