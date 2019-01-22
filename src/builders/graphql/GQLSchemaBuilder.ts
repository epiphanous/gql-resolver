import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { None, Option, Try } from 'funfix';
import { Map, Set } from 'immutable';
import { List } from 'immutable';
import {
  BooleanValueContext,
  DefaultValueContext,
  DirectiveDefinitionContext,
  EmptyListValueContext,
  EnumTypeDefinitionContext,
  EnumValueValueContext,
  FieldDefinitionContext,
  GraphQLParser,
  InputObjectTypeDefinitionContext,
  InterfaceTypeDefinitionContext,
  IntValueContext,
  ObjectTypeDefinitionContext,
  ScalarTypeDefinitionContext,
  SchemaDefinitionContext,
  StringValueContext,
  UnionTypeDefinitionContext,
  ValueContext,
  FieldsDefinitionContext,
  ArgumentsDefinitionContext,
} from '../../antlr4/generated/GraphQLParser';
import {
  EmptyObjectValueContext,
  NonEmptyListValueContext,
} from '../../antlr4/generated/GraphQLParser';
import {
  FloatValueContext,
  VariableValueContext,
} from '../../antlr4/generated/GraphQLParser';
import {
  NonEmptyObjectValueContext,
  NullValueContext,
} from '../../antlr4/generated/GraphQLParser';
import { GQLSchema } from '../../models/GQLSchema';
import {
  GQLArgumentDefinition,
  GQLDirectiveDefinition,
  GQLEnum,
  GQLEnumValueDefinition,
  GQLFieldDefinition,
  GQLInputType,
  GQLInterface,
  GQLObjectType,
  GQLScalarType,
  GQLTypeDefinition,
  GQLUnion,
} from '../../models/GQLTypeDefinition';
import {
  GQLBooleanValue,
  GQLEnumValue,
  GQLFloatValue,
  GQLIntValue,
  GQLKeyedValueList,
  GQLNullValue,
  GQLStringValue,
  GQLValue,
  GQLValueList,
  GQLVariableValue,
} from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import GQLDocumentBuilder from './GQLDocumentBuilder';
import {
  DescriptionContext,
  InputValueDefinitionContext,
} from '../../antlr4/generated/GraphQLParser';

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
  public operationTypes: Map<string, string> = Map<string, string>([
    ['query', 'Query'],
    ['mutation', 'Mutation'],
    ['subscription', 'Subscription'],
  ]).asMutable();
  public scalarTypes: Set<GQLScalarType> = Set<GQLScalarType>().asMutable();
  public interfaces: Set<GQLInterface> = Set<GQLInterface>().asMutable();
  public objectTypes: Set<GQLObjectType> = Set<GQLObjectType>().asMutable();
  public inputTypes: Set<GQLInputType> = Set<GQLInputType>().asMutable();
  public unions: Set<GQLUnion> = Set<GQLUnion>().asMutable();
  public enums: Set<GQLEnum> = Set<GQLEnum>().asMutable();
  public directives: Set<GQLDirectiveDefinition> = Set<
    GQLDirectiveDefinition
  >().asMutable();
  public allFields: Map<string, GQLFieldDefinition> = Map<
    string,
    GQLFieldDefinition
  >().asMutable();

  public build(parser: GraphQLParser): Try<GQLSchema> {
    this.parseWith(parser);
    if (this.errorCount) {
      Try.failure(this.errorReport.asThrowable());
    } else {
      this.scalarTypes.withMutations(set =>
        ['ID', 'String', 'Boolean', 'Int', 'Float'].forEach(t =>
          set.add(
            new GQLScalarType(t, 'Built-in GraphQL type $t', Option.of(t))
          )
        )
      );
      const s = Map<string, GQLScalarType>(
        this.scalarTypes
          .map<[string, GQLScalarType]>(x => [x.name, x])
          .toArray()
      );
      const i = Map<string, GQLInterface>(
        this.interfaces.map<[string, GQLInterface]>(x => [x.name, x]).toArray()
      );
      const o = Map<string, GQLObjectType>(
        this.objectTypes
          .map<[string, GQLObjectType]>(x => [x.name, x])
          .toArray()
      );
      const u = Map<string, GQLUnion>(
        this.unions.map<[string, GQLUnion]>(x => [x.name, x]).toArray()
      );
      const e = Map<string, GQLEnum>(
        this.enums.map<[string, GQLEnum]>(x => [x.name, x]).toArray()
      );
      const d = Map<string, GQLDirectiveDefinition>(
        this.directives
          .map<[string, GQLDirectiveDefinition]>(x => [x.name, x])
          .toArray()
      );
      const n = Map<string, GQLInputType>(
        this.inputTypes.map<[string, GQLInputType]>(x => [x.name, x]).toArray()
      );
      const allTypes = Map<string, GQLTypeDefinition>().withMutations(map =>
        map
          .merge(s)
          .merge(i)
          .merge(o)
          .merge(u)
          .merge(e)
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
        u
      );
      return Try.success(schema);
    }
  }

  public getDescription(ctxOpt: Option<DescriptionContext>) {
    return ctxOpt.map(dc => this.textOf(dc.STRING_VALUE())).getOrElse('');
  }

  public exitSchemaDefinition(ctx: SchemaDefinitionContext) {
    ctx.operationTypeDefinition().forEach(otd => {
      const opNamedType = this.textOf(otd.namedType().NAME());
      const opType = otd.operationType().text;
      this.operationTypes.set(opType, opNamedType);
    });
  }

  public exitScalarTypeDefinition(ctx: ScalarTypeDefinitionContext) {
    const sType: string = this.textOf(ctx.NAME());
    const nativeTypes: Map<string, string> = Map([
      ['ID', 'xsd_anyURI'],
      ['Boolean', 'xsd_boolean'],
      ['Float', 'xsd_float'],
      ['Int', 'xsd_integer'],
      ['String', 'xsd_string'],
      ['URL', 'xsd_anyURI'],
      ['Date', 'xsd_date'],
      ['Time', 'xsd_time'],
      ['DateTime', 'xsd_dateTime'],
      ['Duration', 'xsd_duration'],
    ]);
    const nType: Option<string> = Option.of(nativeTypes.get(sType));
    this.scalarTypes.add(
      new GQLScalarType(
        sType,
        this.getDescription(Option.of(ctx.description())),
        nType
      )
    );
  }

  public exitInterfaceTypeDefinition(ctx: InterfaceTypeDefinitionContext) {
    // console.log({ interface: this.textOf(ctx.interfaceType().NAME()) });
    this.interfaces.add(
      new GQLInterface(
        this.textOf(ctx.NAME()),
        this.getDescription(Option.of(ctx.description())),
        this.getFieldDefinitions(Option.of(ctx.fieldsDefinition()))
      )
    );
  }

  public getFieldDefinitions(ctxOpt: Option<FieldsDefinitionContext>) {
    return ctxOpt
      .map(fds =>
        List(fds.fieldDefinition().map(fd => this.getFieldDefinition(fd)))
      )
      .getOrElse(List<GQLFieldDefinition>());
  }

  public exitObjectTypeDefinition(ctx: ObjectTypeDefinitionContext) {
    // console.log({ object: this.textOf(ctx.objectType().NAME()) });

    const interfaces = Option.of(ctx.implementsInterfaces())
      .map(iic => List(iic.namedType().map(nt => this.textOf(nt.NAME()))))
      .getOrElse(List<string>());

    this.objectTypes.add(
      new GQLObjectType(
        this.textOf(ctx.NAME()),
        this.getDescription(Option.of(ctx.description())),
        this.getFieldDefinitions(Option.of(ctx.fieldsDefinition())),
        interfaces
      )
    );
  }

  public exitUnionTypeDefinition(ctx: UnionTypeDefinitionContext) {
    // console.log({ union: this.textOf(ctx.unionType().NAME()) });
    const members = Option.of(ctx.unionMemberTypes())
      .map(umt => List(umt.namedType().map(t => this.textOf(t.NAME()))))
      .getOrElse(List<string>());

    this.unions.add(
      new GQLUnion(
        this.textOf(ctx.NAME()),
        this.getDescription(Option.of(ctx.description())),
        members
      )
    );
  }

  public exitEnumTypeDefinition(ctx: EnumTypeDefinitionContext) {
    // console.log({ enum: this.textOf(ctx.NAME()) });
    const values = Option.of(ctx.enumValuesDefinition())
      .map(evds =>
        List(
          evds.enumValueDefinition().map(evd => {
            const name = this.textOf(evd.ENUM_VALUE());
            const desc = this.getDescription(Option.of(evd.description()));

            // console.log({ name });
            // todo: process directives
            const [isDeprecated, deprecationReason] = [false, None];
            return new GQLEnumValueDefinition(
              name,
              desc,
              isDeprecated,
              deprecationReason
            );
          })
        )
      )
      .getOrElse(List<GQLEnumValueDefinition>());

    this.enums.add(
      new GQLEnum(
        this.textOf(ctx.NAME()),
        this.getDescription(Option.of(ctx.description())),
        values
      )
    );
  }

  public exitDirectiveDefinition(ctx: DirectiveDefinitionContext) {
    const inputs = Option.of(ctx.argumentsDefinition())
      .map(ad => List(ad.inputValueDefinition()))
      .getOrElse(List<InputValueDefinitionContext>());

    const locations = List(
      ctx
        .directiveLocations()
        .directiveLocation()
        .map(dl => dl.typeSystemDirectiveLocation().text)
    );

    this.directives.add(
      new GQLDirectiveDefinition(
        this.textOf(ctx.NAME()),
        this.getDescription(Option.of(ctx.description())),
        this.getArgumentDefinitions(inputs),
        locations
      )
    );
  }

  public exitInputObjectTypeDefinition(ctx: InputObjectTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    // console.log({ inputObject: name });
    const inputs = Option.of(ctx.inputFieldsDefinition())
      .map(ifdc => List(ifdc.inputValueDefinition()))
      .getOrElse(List<InputValueDefinitionContext>());

    const desc = this.getDescription(Option.of(ctx.description()));
    this.inputTypes.add(
      new GQLInputType(name, desc, this.getArgumentDefinitions(inputs))
    );
  }

  public getArgumentDefinitions(ctx: List<InputValueDefinitionContext>) {
    return ctx.map(a => {
      const argName = this.textOf(a.NAME());
      let argDesc = this.getDescription(Option.of(a.description()));
      if (argDesc.length === 0) {
        argDesc = STANDARD_ARG_DESCRIPTION[argName] || '';
      }
      return new GQLArgumentDefinition(
        argName,
        argDesc,
        this.getType(a.type()),
        this.processDefaultValue(Option.of(a.defaultValue()))
      );
    });
  }

  public getFieldDefinition(ctx: FieldDefinitionContext) {
    const fieldName = this.textOf(ctx.NAME());
    // console.log({ field: fieldName });

    const fieldType = this.getType(ctx.type());

    const inputs = Option.of(ctx.argumentsDefinition())
      .map(ad => List(ad.inputValueDefinition()))
      .getOrElse(List<InputValueDefinitionContext>());

    // todo: process directives
    const [isDeprecated, deprecationReason] = [false, None];

    const fd = new GQLFieldDefinition(
      fieldName,
      this.getDescription(Option.of(ctx.description())),
      fieldType,
      isDeprecated,
      deprecationReason,
      this.getArgumentDefinitions(inputs)
    );
    this.allFields.set(fieldName, fd);
    return fd;
  }

  public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
    return ctxOpt.map(dv => this.processValue(dv.value()));
  }

  public processValue(ctx: ValueContext): GQLValue {
    if (ctx instanceof VariableValueContext) {
      const varName = this.textOf(
        (ctx as VariableValueContext).variable().NAME()
      );
      return new GQLVariableValue(new GQLVariable(varName));
    }
    if (ctx instanceof IntValueContext) {
      return new GQLIntValue(
        parseInt(this.textOf((ctx as IntValueContext).INT_VALUE()), 10)
      );
    }
    if (ctx instanceof FloatValueContext) {
      return new GQLFloatValue(
        parseFloat(this.textOf((ctx as FloatValueContext).FLOAT_VALUE()))
      );
    }
    if (ctx instanceof StringValueContext) {
      return new GQLStringValue(
        this.textOf((ctx as StringValueContext).STRING_VALUE())
      );
    }
    if (ctx instanceof BooleanValueContext) {
      return new GQLBooleanValue(
        this.textOf((ctx as BooleanValueContext).BOOLEAN_VALUE()) === 'true'
      );
    }

    if (ctx instanceof NullValueContext) {
      return new GQLNullValue();
    }

    if (ctx instanceof EnumValueValueContext) {
      return new GQLEnumValue(
        this.textOf((ctx as EnumValueValueContext).ENUM_VALUE())
      );
    }

    if (ctx instanceof EmptyListValueContext) {
      return new GQLValueList(List<GQLValue>());
    }

    if (ctx instanceof NonEmptyListValueContext) {
      return new GQLValueList(
        List(
          (ctx as NonEmptyListValueContext)
            .value()
            .map(vc => this.processValue(vc))
        )
      );
    }

    if (ctx instanceof EmptyObjectValueContext) {
      return new GQLKeyedValueList(Map<string, GQLValue>());
    }

    if (ctx instanceof NonEmptyObjectValueContext) {
      return new GQLKeyedValueList(
        Map(
          (ctx as NonEmptyObjectValueContext)
            .objectField()
            .map<[string, GQLValue]>(of => {
              return [this.textOf(of.NAME()), this.processValue(of.value())];
            })
        )
      );
    }
  }
}
