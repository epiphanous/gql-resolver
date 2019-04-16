import { Option, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  ArgumentContext,
  ArgumentsContext,
  ArgumentsDefinitionContext,
  DirectiveContext,
  DirectiveDefinitionContext,
  DirectivesContext,
  EnumTypeDefinitionContext,
  EnumTypeExtensionWithDirectivesContext,
  EnumTypeExtensionWithValuesContext,
  EnumValuesDefinitionContext,
  FieldDefinitionContext,
  FieldsDefinitionContext,
  GraphQLParser,
  ImplementsInterfacesContext,
  InputFieldsDefinitionContext,
  InputObjectTypeDefinitionContext,
  InputObjectTypeExtensionWithDirectivesContext,
  InputObjectTypeExtensionWithFieldsContext,
  InputValueDefinitionContext,
  InterfaceTypeDefinitionContext,
  InterfaceTypeExtensionWithDirectivesContext,
  InterfaceTypeExtensionWithFieldsContext,
  ObjectTypeDefinitionContext,
  ObjectTypeExtensionWithDirectivesContext,
  ObjectTypeExtensionWithFieldsContext,
  ObjectTypeExtensionWithInterfacesContext,
  ScalarTypeDefinitionContext,
  ScalarTypeExtensionContext,
  SchemaDefinitionContext,
  SchemaExtensionWithOperationsContext,
  SchemaExtensionWithoutOperationsContext,
  UnionMemberTypesContext,
  UnionTypeDefinitionContext,
  UnionTypeExtensionWithDirectivesContext,
  UnionTypeExtensionWithMembersContext,
} from '../../antlr4/generated/GraphQLParser';
import { GQLAnyArgument, GQLArgument } from '../../models/GQLArgument';
import { GQLDirective } from '../../models/GQLDirective';
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
import GQLDocumentBuilder from './GQLDocumentBuilder';

const STANDARD_ARG_DESCRIPTION: { [key: string]: string } = {
  bindings:
    'Optional list of one or more additional computed values to generate in results',
  boosters:
    "Optional list of one or more 'if_follows' or 'is_followed_by' boosts",
  filter: 'Optional boolean expression to filter our results',
  limit: 'Optional integer number to limit result set size',
  offset: 'Optional integer number of objects to skip before returning results',
  order: 'Optional list of one or more fields to order results by',
  patterns:
    "Optional list of one or more 'textmatch', 'geomatch' or 'geonearby' patterns to match against",
};

export default class GQLSchemaBuilder extends GQLDocumentBuilder<GQLSchema> {
  public operationTypes = Map<string, string>([
    ['query', 'Query'],
    ['mutation', 'Mutation'],
    ['subscription', 'Subscription'],
  ]).asMutable();
  public scalarTypes = Set<GQLScalarType>(
    ['ID', 'String', 'Boolean', 'Int', 'Float'].map(
      t => new GQLScalarType(t, Option.of('Built-in GraphQL type $t'))
    )
  ).asMutable();
  public interfaces = Set<GQLInterface>().asMutable();
  public objectTypes = Set<GQLObjectType>().asMutable();
  public inputTypes = Set<GQLInputType>().asMutable();
  public unions = Set<GQLUnion>().asMutable();
  public enums = Set<GQLEnum>().asMutable();
  public directives: Set<GQLDirectiveDefinition> = Set<
    GQLDirectiveDefinition
  >().asMutable();
  public allFields: Map<string, GQLFieldDefinition> = Map<
    string,
    GQLFieldDefinition
  >().asMutable();
  public schemaDirectives = Set<GQLDirective>().asMutable();

  public build(parser: GraphQLParser): Try<GQLSchema> {
    this.parseWith(parser);
    if (this.errorCount) {
      return Try.failure(this.errorReport.asThrowable());
    } else {
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
        u,
        this.schemaDirectives.asImmutable()
      );
      return Try.success(schema);
    }
  }

  // ------------[ SCHEMA / OPERATION TYPES ]------------

  public exitSchemaDefinition(
    ctx: SchemaDefinitionContext | SchemaExtensionWithOperationsContext
  ) {
    ctx.operationTypeDefinition().forEach(otd => {
      const opNamedType = this.textOf(otd.namedType().NAME());
      const opType = otd.operationType().text;
      if (this.operationTypes.has(opType)) {
        const oldNamedType = this.operationTypes.get(opType);
        this.check(
          false,
          `warning: operation type ${opType} changed from ${oldNamedType} to ${opNamedType}`,
          ctx,
          false
        );
      }
      this.operationTypes.set(opType, opNamedType);
    });
    this.getDirectives(Option.of(ctx.directives())).forEach(d =>
      this.schemaDirectives.add(d)
    );
  }

  public exitSchemaExtensionWithOperations(
    ctx: SchemaExtensionWithOperationsContext
  ) {
    this.exitSchemaDefinition(ctx);
  }

  public exitSchemaExtensionWithoutOperations(
    ctx: SchemaExtensionWithoutOperationsContext
  ) {
    this.getDirectives(Option.of(ctx.directives())).forEach(d =>
      this.schemaDirectives.add(d)
    );
  }

  // ------------[ SCALAR TYPES ]------------

  public exitScalarTypeDefinition(ctx: ScalarTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.scalarTypes.find(d => d.name === name);
    if (!def) {
      this.scalarTypes.add(
        new GQLScalarType(
          name,
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate scalar type definition ${name}`, ctx, true);
    }
  }

  public exitScalarTypeExtension(ctx: ScalarTypeExtensionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.scalarTypes.find(d => d.name === name);
    if (def) {
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(
        false,
        `can't extend non-existent scalar type ${name}`,
        ctx,
        true
      );
    }
  }

  // ------------[ OUTPUT TYPES ]------------

  public exitObjectTypeDefinition(ctx: ObjectTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.objectTypes.find(d => d.name === name);
    if (!def) {
      this.objectTypes.add(
        new GQLObjectType(
          name,
          this.getFieldDefinitions(Option.of(ctx.fieldsDefinition())),
          this.getInterfaces(Option.of(ctx.implementsInterfaces())),
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate type definition ${name}`, ctx, true);
    }
  }

  public exitObjectTypeExtensionWithFields(
    ctx: ObjectTypeExtensionWithFieldsContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.objectTypes.find(d => d.name === name);
    if (def) {
      def.interfaces.withMutations(i =>
        i.merge(this.getInterfaces(Option.of(ctx.implementsInterfaces())))
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
      def.fields.withMutations(f =>
        f.merge(this.getFieldDefinitions(Option.of(ctx.fieldsDefinition())))
      );
    } else {
      this.check(false, `can't extend non-existent type ${name}`, ctx, false);
    }
  }

  public exitObjectTypeExtensionWithDirectives(
    ctx: ObjectTypeExtensionWithDirectivesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.objectTypes.find(d => d.name === name);
    if (def) {
      def.interfaces.withMutations(i =>
        i.merge(this.getInterfaces(Option.of(ctx.implementsInterfaces())))
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(false, `can't extend non-existent type ${name}`, ctx, false);
    }
  }

  public exitObjectTypeExtensionWithInterfaces(
    ctx: ObjectTypeExtensionWithInterfacesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.objectTypes.find(d => d.name === name);
    if (def) {
      def.interfaces.withMutations(i =>
        i.merge(this.getInterfaces(Option.of(ctx.implementsInterfaces())))
      );
    } else {
      this.check(false, `can't extend non-existent type ${name}`, ctx, false);
    }
  }

  // ------------[ INTERFACE TYPES ]------------

  public exitInterfaceTypeDefinition(ctx: InterfaceTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.interfaces.find(d => d.name === name);
    if (!def) {
      this.interfaces.add(
        new GQLInterface(
          name,
          this.getFieldDefinitions(Option.of(ctx.fieldsDefinition())),
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate interface definition ${name}`, ctx, true);
    }
  }

  public exitInterfaceTypeExtensionWithFields(
    ctx: InterfaceTypeExtensionWithFieldsContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.interfaces.find(d => d.name === name);
    if (def) {
      def.fields.withMutations(f =>
        f.merge(this.getFieldDefinitions(Option.of(ctx.fieldsDefinition())))
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(
        false,
        `can't extend non-existent interface ${name}`,
        ctx,
        true
      );
    }
  }

  public exitInterfaceTypeExtensionWithDirectives(
    ctx: InterfaceTypeExtensionWithDirectivesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.interfaces.find(d => d.name === name);
    if (def) {
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(
        false,
        `can't extend non-existent interface ${name}`,
        ctx,
        true
      );
    }
  }

  // ------------[ UNION TYPES ]------------

  public exitUnionTypeDefinition(ctx: UnionTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.unions.find(d => d.name === name);
    if (!def) {
      this.unions.add(
        new GQLUnion(
          name,
          this.getUnionMembers(Option.of(ctx.unionMemberTypes())),
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate union definition ${name}`, ctx, true);
    }
  }

  public exitUnionTypeExtensionWithMembers(
    ctx: UnionTypeExtensionWithMembersContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.unions.find(d => d.name === name);
    if (def) {
      def.gqlTypes.withMutations(u =>
        u.merge(this.getUnionMembers(Option.of(ctx.unionMemberTypes())))
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(false, `can't extend non-existent union ${name}`, ctx, true);
    }
  }

  public exitUnionTypeExtensionWithDirectives(
    ctx: UnionTypeExtensionWithDirectivesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.unions.find(d => d.name === name);
    if (def) {
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(false, `can't extend non-existent union ${name}`, ctx, true);
    }
  }

  // ------------[ ENUM TYPES ]------------

  public exitEnumTypeDefinition(ctx: EnumTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.enums.find(d => d.name === name);
    if (!def) {
      const values = this.getEnumValues(Option.of(ctx.enumValuesDefinition()));
      this.enums.add(
        new GQLEnum(
          name,
          this.getEnumValues(Option.of(ctx.enumValuesDefinition())),
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate enum definition ${name}`, ctx, true);
    }
  }

  public exitEnumTypeExtensionWithValues(
    ctx: EnumTypeExtensionWithValuesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.enums.find(d => d.name === name);
    if (!def) {
      def.values.withMutations(v =>
        v.merge(this.getEnumValues(Option.of(ctx.enumValuesDefinition())))
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(false, `can't extend non-existant enum ${name}`, ctx, true);
    }
  }

  public exitEnumTypeExtensionWithDirectives(
    ctx: EnumTypeExtensionWithDirectivesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.enums.find(d => d.name === name);
    if (!def) {
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(false, `can't extend non-existant enum ${name}`, ctx, true);
    }
  }

  // ------------[ INPUT TYPES ]------------

  public exitInputObjectTypeDefinition(ctx: InputObjectTypeDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.inputTypes.find(d => d.name === name);
    if (!def) {
      this.inputTypes.add(
        new GQLInputType(
          name,
          this.getArgumentDefinitions(Option.of(ctx.inputFieldsDefinition())),
          this.getDescription(Option.of(ctx.description())),
          this.getDirectives(Option.of(ctx.directives()))
        )
      );
    } else {
      this.check(false, `duplicate input type definition ${name}`, ctx, true);
    }
  }

  public exitInputObjectTypeExtensionWithFields(
    ctx: InputObjectTypeExtensionWithFieldsContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.inputTypes.find(d => d.name === name);
    if (!def) {
      def.args.withMutations(a =>
        a.merge(
          this.getArgumentDefinitions(Option.of(ctx.inputFieldsDefinition()))
        )
      );
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(
        false,
        `can't extend non-existent input type ${name}`,
        ctx,
        true
      );
    }
  }

  public exitInputObjectTypeExtensionWithDirectives(
    ctx: InputObjectTypeExtensionWithDirectivesContext
  ) {
    const name = this.textOf(ctx.NAME());
    const def = this.inputTypes.find(d => d.name === name);
    if (!def) {
      def.directives.withMutations(d =>
        d.merge(this.getDirectives(Option.of(ctx.directives())))
      );
    } else {
      this.check(
        false,
        `can't extend non-existent input type ${name}`,
        ctx,
        true
      );
    }
  }

  // ------------[ DIRECTIVES ]------------

  public exitDirectiveDefinition(ctx: DirectiveDefinitionContext) {
    const name = this.textOf(ctx.NAME());
    const def = this.directives.find(d => d.name === name);

    if (!def) {
      const locations = List(
        ctx
          .directiveLocations()
          .directiveLocation()
          .map(dl => dl.typeSystemDirectiveLocation().text)
      );

      this.directives.add(
        new GQLDirectiveDefinition(
          name,
          this.getArgumentDefinitions(Option.of(ctx.argumentsDefinition())),
          locations,
          this.getDescription(Option.of(ctx.description()))
        )
      );
    } else {
      this.check(false, `duplicate directive definition ${name}`, ctx, true);
    }
  }

  // -----[SUPPORTING METHODS]-----

  public getArgumentDefinitions(
    ctxOpt: Option<ArgumentsDefinitionContext | InputFieldsDefinitionContext>
  ) {
    return ctxOpt
      .map(aid => List(aid.inputValueDefinition()))
      .getOrElse(List<InputValueDefinitionContext>())
      .map(a => {
        const argName = this.textOf(a.NAME());
        let argDesc = this.getDescription(Option.of(a.description()));
        if (
          argDesc.isEmpty() &&
          STANDARD_ARG_DESCRIPTION.hasOwnProperty(argName)
        ) {
          argDesc = Option.of(STANDARD_ARG_DESCRIPTION[argName]);
        }
        return new GQLArgumentDefinition(
          argName,
          this.getType(a.type()),
          this.processDefaultValue(Option.of(a.defaultValue())),
          argDesc,
          this.getDirectives(Option.of(a.directives()))
        );
      });
  }

  public getInterfaces(ctxOpt: Option<ImplementsInterfacesContext>) {
    return ctxOpt
      .map(iic => List(iic.namedType().map(nt => this.textOf(nt.NAME()))))
      .getOrElse(List<string>());
  }

  public getFieldDefinitions(ctxOpt: Option<FieldsDefinitionContext>) {
    return ctxOpt
      .map(fds =>
        List(fds.fieldDefinition().map(fd => this.getFieldDefinition(fd)))
      )
      .getOrElse(List<GQLFieldDefinition>());
  }

  public getEnumValues(ctxOpt: Option<EnumValuesDefinitionContext>) {
    return ctxOpt
      .map(evds =>
        List(
          evds.enumValueDefinition().map(evd => {
            return new GQLEnumValueDefinition(
              this.textOf(evd.NAME()),
              this.getDescription(Option.of(evd.description())),
              this.getDirectives(Option.of(evd.directives()))
            );
          })
        )
      )
      .getOrElse(List<GQLEnumValueDefinition>());
  }

  public getFieldDefinition(ctx: FieldDefinitionContext) {
    const fieldName = this.textOf(ctx.NAME());
    const fieldType = this.getType(ctx.type());

    const fd = new GQLFieldDefinition(
      fieldName,
      fieldType,
      this.getArgumentDefinitions(Option.of(ctx.argumentsDefinition())),
      this.getDescription(Option.of(ctx.description())),
      this.getDirectives(Option.of(ctx.directives()))
    );
    this.allFields.set(fieldName, fd);
    return fd;
  }

  public getUnionMembers(ctxOpt: Option<UnionMemberTypesContext>) {
    return ctxOpt
      .map(umt => List(umt.namedType().map(t => this.textOf(t.NAME()))))
      .getOrElse(List<string>());
  }

  public getDirectives(ctxOpt: Option<DirectivesContext>): List<GQLDirective> {
    return ctxOpt
      .map(dcs => List(dcs.directive().map(dc => this.getDirective(dc))))
      .getOrElse(List<GQLDirective>());
  }

  public getDirective(ctx: DirectiveContext): GQLDirective {
    const name = this.textOf(ctx.NAME());
    const args = this.getArguments(Option.of(ctx.arguments()));
    return new GQLDirective(name, args);
  }

  public getArguments(ctxOpt: Option<ArgumentsContext>): List<GQLArgument> {
    return ctxOpt
      .map(args => List(args.argument().map(arg => this.getArgument(arg))))
      .getOrElse(List<GQLArgument>());
  }

  public getArgument(ctx: ArgumentContext): GQLArgument {
    const name = this.textOf(ctx.NAME());
    const value = this.processValue(ctx.value());
    return new GQLAnyArgument(name, value);
  }
}
