import { ok } from 'assert';
import {Either, Failure, Left, None, Option, Right, Some, Success, Try} from 'funfix';
import {List, Map, Set} from 'immutable';
import {mapValues, partition} from 'lodash';
import { stringify } from 'querystring';
import { types } from 'util';
import { BooleanValueContext, GraphQLParser, StringValueContext } from '../../../generated/src/antlr4/GraphQLParser';
import {
    ArgumentContext,
    ArgumentsContext,
    ArrayValueContext,
    DefaultValueContext, DirectiveContext, DirectivesContext, EnumValueValueContext, FieldContext, FieldNameContext,
    FieldSelectionContext,
    FragmentDefinitionContext, FragmentSpreadContext,
    FragmentSpreadSelectionContext, FullOperationDefinitionContext, InlineFragmentContext,
    InlineFragmentSelectionContext,
    NameDirectiveContext, NumberValueContext, SelectionOnlyOperationDefinitionContext, SelectionSetContext,
    TypeConditionContext,
    ValueContext,
    ValueDirectiveContext,
    ValueOrVariableContext, VariableContext, VariableDefinitionContext, VariableDefinitionsContext
} from '../../antlr4/generated/GraphQLParser';
import { GQLAny } from '../../models/GQLAny';
import { GQLAnyArgument, GQLArgument, GQLBindingsArgument, GQLBoostersArgument, GQLFilterArgument, GQLIncludeDeprecatedArgument, GQLInvalidArgument, GQLLimitArgument, GQLNameArgument, GQLOffsetArgument, GQLOrderArgument, GQLPatternsArgument, GQLTransformsArgument } from '../../models/GQLArgument';
import { GQLBinding } from '../../models/GQLBinding';
import { GQLBooster } from '../../models/GQLBooster';
import { GQLDirective, GQLNameDirective, GQLValueDirective } from '../../models/GQLDirective';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLFieldsExecutionPlan } from '../../models/GQLFieldsExecutionPlan';
import { GQLFilter } from '../../models/GQLFilter';
import { GQLFragmentDefinition } from '../../models/GQLFragmentDefinition';
import { GQLOperation } from '../../models/GQLOperation';
import { GQLOrderBy } from '../../models/GQLOrderBy';
import { GQLPattern } from '../../models/GQLPattern';
import { GQLQueryArguments } from '../../models/GQLQueryArguments';
import { GQLQueryDocument } from '../../models/GQLQueryDocument';
import { GQLRootExecutionPlan } from '../../models/GQLRootExecutionPlan';
import { GQLSearchExecutionPlan } from '../../models/GQLSearchExecutionPlan';
import { GQLField, GQLFragmentSpread, GQLInlineFragment, GQLSelection } from '../../models/GQLSelection';
import { GQLTransform } from '../../models/GQLTransform';
import { GQLFieldDefinition } from '../../models/GQLTypeDefinition';
import {
    GQLArrayValue, GQLBooleanValue, GQLDoubleValue, GQLEnumValue, GQLIntValue, GQLLongValue, GQLNumberValue,
    GQLStringValue, GQLValue
} from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { NameAndAlias as AliasAndName} from '../../models/NameAndAlias'; // TODO: set to AliasAndName from ...
import {QueryStrategy} from '../../models/QueryStrategy';
import ResolverContext from '../../models/ResolverContext';
import Builder from '../Builder';
import BuilderError from '../BuilderError';
import GQLDocumentBuilder from './GQLDocumentBuilder';

class UnknownFieldException extends Error {
    constructor() {
        super('Field not in type');
    }
}

class SpecialObjectField {
  public returnType: string;
  public generator: (args: GQLQueryArguments) => List<QueryStrategy>;
  constructor(returnType: string, generator: (args: GQLQueryArguments) => List<QueryStrategy>)  {
    this.generator = generator;
  }
}

const ignoredObjectFields = Set('schema_item');

const ARG_TYPES = {
  ARG_BINDINGS: 'bindings',
  ARG_BOOSTERS: 'boosters',
  ARG_FILTER: 'filter',
  ARG_INCLUDE_DEPRECATED: 'includeDeprecated',
  ARG_LIMIT: 'limit',
  ARG_NAME: 'name',
  ARG_OFFSET: 'offset',
  ARG_ORDER: 'order',
  ARG_PATTERNS: 'patterns',
  ARG_TRANSFORMS: 'transforms',
};

export default class GQLQueryBuilder extends GQLDocumentBuilder<GQLQueryDocument> {
  public context: ResolverContext;
  public vars: Map<string, any>;
  public operations: Set<GQLOperation> = Set();
  public fragmentDefinitions: Set<GQLFragmentDefinition> = Set();
  public variables: Set<GQLVariableDefinition> = Set();
  public GQLRootExecutionPlan;

  constructor(context: ResolverContext, vars: Map<string, any>) {
    super();
    this.context = context;
    this.vars = vars;
  }

  public getSchema() {
    return this.context.schema;
  }

  public getPrefixes() {
    return this.context.prefixes;
  }

  public build(parser: GraphQLParser): Try<GQLQueryDocument> {
    try {
      super.build(parser);
      this.resolveDefaults(this.vars);
      if (this.errorCount > 0) {
          throw this.errorReport;
      } else {
        if (this.warningCount > 0) {
          this.errors.forEach((w) => console.warn(w));
        }
        return Try.success(new GQLQueryDocument(
          this.operations.valueSeq().toList().map(
            (op: GQLOperation) => this.withExecutionPlan(op)
            )));
      }
    } catch (error) {
      return Try.failure(error);
    }
  }

  public withExecutionPlan(operation: GQLOperation): GQLOperation {
    console.debug(`withExecutionPlan: operation = ${operation}`);
    const fop = this.withFlattenedSelections(operation);
    return fop.operationType === 'query' ?
      fop.copy({
        executionPlan:
          this.getRootExecutionPlan(fop.name, fop.fields, fop.selections)})
      : fop;

  }

  public withFlattenedSelections(operation: GQLOperation) {
    const opType = this.getSchema().operationTypes.get(operation.operationType);
    const fields = this.flattenSelections(opType, operation.selections);
    return operation.copy({fields});
  }

  public flattenSelections(parentType: string, selections: List<GQLSelection>): List<[string, GQLField]> {
    return selections.flatMap((s: GQLSelection) => this.flattenSelection(parentType, s));
  }

  public flattenSelection(parentType: string, selection: GQLSelection): List<[string, GQLField]> {
    if (selection instanceof GQLField) {
      const field = selection as GQLField;
      return this.getSchema().getFieldType(field.name).map((t: string) => {
        const fields = this.flattenSelections(t, field.selections);
        return List<[string, GQLField]>([parentType, field.copy({fields})]);
      }).getOrElseL(() => {
        throw Error(`unable to getFieldType(${field.name})`);
      });
    } else if (selection instanceof GQLInlineFragment) {
      const frag = selection as GQLInlineFragment;
      return this.flattenSelections(frag.typeConditions, frag.selections);
    } else if (selection instanceof GQLFragmentSpread) {
      const spread = selection as GQLFragmentSpread;
      return Option.of(
        this.fragmentDefinitions.find((d: GQLFragmentDefinition) => d.name === spread.name)
      ).map((frag: GQLFragmentDefinition) => {
        return this.flattenSelections(frag.typeCondition, frag.selections);
      }).getOrElseL(() => {
        throw Error(`undefined fragment spread ${spread.name}`);
      });
    }
  }

  public resolveDefaults(vars: Map<string, any>) {
    return vars.withMutations(map => {
    this.variables.forEach((vd) => {
      const isRequired = vd.gqlType.isRequired;
      const defVoV = vd.defaultValue;
      if (defVoV.nonEmpty) {
        if (defVoV.get().isLeft) {
          const defValue = defVoV.get()._L.value;
          map.update(vd.name, defValue);
        }
      } else if (isRequired && Option.of(vars.get(vd.name)).isEmpty()) {
        this.addError(new BuilderError(`missing required value for variable ${vd.name}`, 0, 0));
      }
    }); });
  }

  public processArgs(args: List<GQLArgument>, allFields: Map<string, string>): GQLQueryArguments {
    return args.reduce((qa, arg) => {
      if (arg instanceof GQLAnyArgument) {
        const anyArg = arg as GQLAnyArgument;
        if (anyArg.value.isRight) {
          const variable = anyArg.value._A;
          const value = Option.of(this.vars.get(variable.name));
          return qa.copy({any: Some(new GQLAny(anyArg.name, value))});
        } else {
          return qa.copy({any: Some(new GQLAny(anyArg.name, None))});
        }
      } else if (arg instanceof GQLFilterArgument) {
        const a = arg as GQLFilterArgument;
        return qa.copy({filter: Some(this.processFilter(a.resolve(this.vars), allFields))});
      } else if (arg instanceof GQLPatternsArgument) {
        const a = arg as GQLPatternsArgument;
        return qa.copy({patterns: this.processPatterns(a.resolve(this.vars), allFields)});
      } else if (arg instanceof GQLBoostersArgument) {
        const a = arg as GQLBoostersArgument;
        return qa.copy({boosters: this.processBoosters(a.resolve(this.vars), allFields)});
      } else if (arg instanceof GQLBindingsArgument) {
        const a = arg as GQLBindingsArgument;
        return qa.copy({bindings: this.processBindings(a.resolve(this.vars), allFields)});
      } else if (arg instanceof GQLOrderArgument) {
        const a = arg as GQLOrderArgument;
        return qa.copy({order: this.processOrder(a.resolve(this.vars), allFields)});
      } else if (arg instanceof GQLTransformsArgument) {
        const a = arg as GQLTransformsArgument;
        return qa.copy({transforms: this.processTransforms(a.resolve(this.vars), allFields)});
      } else if (arg instanceof GQLLimitArgument) {
        const a = arg as GQLLimitArgument;
        const limit = Some(parseInt(a.resolve(this.vars), 10));
        if (qa.offset.nonEmpty) {
          return qa.copy({limit});
        } else {
          return qa.copy({limit, offset: Some(0)});
        }
      } else if (arg instanceof GQLOffsetArgument) {
        const a = arg as GQLOffsetArgument;
        const offset = Some(parseInt(a.resolve(this.vars), 10));
        return qa.copy({offset});
      } else if (arg instanceof GQLNameArgument) {
        const a = arg as GQLNameArgument;
        return qa.copy({name: Some(a.resolve(this.vars))});
      } else if (arg instanceof GQLIncludeDeprecatedArgument) {
        const a = arg as GQLIncludeDeprecatedArgument;
        const b = /^(1|t|true)$/.test(a.resolve(this.vars).toLowerCase());
        return qa.copy({includeDeprecated: Some(b)});
      } else { return qa; }
    }, new GQLQueryArguments());
  }

  public processFilter(filterExpr: string, validFields: Map<string, string>) {
    return Builder.parse<GQLFilter>(
      new GQLFilterBuilder(
        validFields, this.variables, this.vars, this.getPrefixes()), filterExpr).get();
  }

  public processPatterns(patternsExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLPattern>>(
      new GQLPatternsBuilder(validFields, this.variables, this.vars, this.getPrefixes()), patternsExpr).get();
  }

  public processBindings(bindingsExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLBinding>>(
      new GQLBindingsBuilder(validFields, this.variables, this.vars, this.getPrefixes()), bindingsExpr).get();
  }

  public processBoosters(boostersExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLBooster>>(
        new GQLBoostersBuilder(validFields, this.variables, this.vars, this.getPrefixes()), boostersExpr).get();
  }

  public processOrder(orderExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLOrderBy>>(
        new GQLOrderByBuilder(validFields, this.variables, this.vars, this.getPrefixes()), orderExpr).get();
  }

  public processTransforms(transformsExpr: string) {
    return Builder.parse<List<GQLTransform>>(new GQLTransformsBuilder(this.getPrefixes()), transformsExpr).get();
  }

  public getSearchSubPlans(name: string, selections: List<GQLSelection>, objects: List<[string, GQLField]>) {
    console.log(`subPlans name = ${name} objects = ${objects}`);
    const plans: List<GQLSearchExecutionPlan> =
      objects.flatMap(tf => {
        const [t, f] = tf;
        console.log(`creating subplan ${f.name} from fields ${f.fields}`);
        return this.getQueryExecutionPlan(t, f.name, f.alias.getOrElse(f.name), f.fields, selections, f.arguments);
      });
    console.log(`subplans for ${name} = ${plans}`);
    return plans;
  }

  public getRootExecutionPlan(name: string, fields: List<[string, GQLField]>, selections: List<GQLSelection>) {
    console.log(`plan ${name}: partitioning fields ${fields}`);
    const {scalars, objects, errors} = this.getSchema().partitionFields(fields);
    if (objects.isEmpty) {
      // return Option.none();
        return null;
    } else {
      Some(this.getRootPlan(name, selections, objects, errors));
    }
  }

  public getQueryExecutionPlan(parentType: string, name: string, key: string, fields: List<[string, GQLField]>, selections: List<GQLSelection>, args: List<GQLArgument>) {

    console.log(`plan ${name}: partitioning fields ${fields}`);
    const { scalars, objects, errors } = this.getSchema().partitionFields(fields);

    console.log(`plan ${name}: scalars    = ${scalars}`);
    console.log(`plan ${name}: objects    = ${objects}`);
    console.log(`plan ${name}: errors     = ${errors}`);
    console.log(`plan ${name}: args       = ${args}`);
    console.log(`plan ${name}: selections = ${selections}`);

    if (scalars.isEmpty && objects.isEmpty) {
      const fieldsFromFragment =
        this.getSchema().inlineFragmentChildFieldMappingsOf(selections)(name)
          .filter(a => typeof(a[1]) !== 'undefined')
            .reduce((acc, item) => {
              acc.push(item[1].map(field => [this.getSchema().getFieldType(name).getOrElse(name), field]));
              return acc;
            }, []);

      console.log(`*** plan ${name} has fieldsFromFragment : ${fieldsFromFragment}`);

      if (fieldsFromFragment.nonEmpty) {
        Some(this.getSearchPlan(parentType, name, key, selections, args, fields, fieldsFromFragment, objects, errors));
      } else {
        console.info(`no plan for ${name}`);
        return null;
      }
    } else {
      Some(this.getSearchPlan(parentType, name, key, selections, args, fields, scalars, objects, errors));
    }
  }

  public getRootPlan(name: string, selections: List<GQLSelection>, objects: List<[string, GQLField]>, errors: List<Error>) {

    const mySubPlans = this.getSearchSubPlans(name, selections, objects);

    return new GQLRootExecutionPlan(name, mySubPlans, errors); // TODO other fields?
  }

 public specialObjectFields: () => Map<string, SpecialObjectField> = () => Map(List(
     Map({
         'athlinks_steps': new SpecialObjectField(
            'athlinks_StepAction', ( args: GQLQueryArguments ) =>
                 RDFQueryService.createStepsStrategies(args, RDFQueryService.this.getPrefixes(), this.getSchema()),
         ),
         'schema_dataFeedElement': new SpecialObjectField(
             'schema_DataFeedItem', (
                 args: GQLQueryArguments,
             ) =>
               RDFQueryService.createDataFeedStrategy(args, RDFQueryService.this.getPrefixes(), this.getSchema())
         ),
     })
  ))

 public getSearchPlan(parentType: string, name: string, key: string, selections: List < GQLSelection > , args: List<GQLArgument>, fields: List <[string, GQLField]> , scalars: List <[string, GQLField]> , objects: List <[string, GQLField]> , errors: List<UnknownFieldException>) {

    const queryFields: List<[string, GQLField]> = scalars;
    console.log(`queryFields for plan ${name} = ${queryFields}`);

    const fullProjectionOrder: () => List<AliasAndName> = () => fields.map(x => x[0]).concat(objects.map(x => x[1]))
      .map((x) => new AliasAndName(x.alias || x.name, x.name));

    const hiddenIdField = new GQLField('id', Some(RDFQueryService.INTERNAL_ID_KEY), List().clear(), List().clear(), List().clear(), List().clear());

     // That's quite a mouthful
    const requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom =
      objects
        .map(x => x[0])
        .flatMap((typ) => this.getSchema().getImplementingTypes(typ))
        .map((it) => [it, List().set(0, hiddenIdField)])
        .toMap;

    console.log(`getPlan ${name} requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom = ${requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom}`);

    const projectionsByType: Map<string, List<GQLField>> =
      requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom().merge(
        mapValues(queryFields.flatMap(tf => {
              const [t, f] = tf;
              const types = this.getSchema().getImplementingTypes(t).map(it => [it, f]);
              console.log(`implementing types of ${t} = ${types}`);
              return types;
            }).groupBy(x => x[0]), value => value.map(x => x[1])));

    console.log(`getPlan ${name} objects = ${objects}`);
    console.log(`getPlan ${name} projectionsByType = ${projectionsByType}`);

    const subjectTypes: List<string> = List(projectionsByType.keys());

    const ptype: string = this.getSchema().getFieldType(name).getOrElse(parentType);
    const queryArgs = this.processArgs(args, this.getSchema().validFieldsForType(ptype));

    const fieldsPlanParentTypes = subjectTypes.filterNot(x => x.startsWith('O_xsd'));
    const fieldsPlan = () => {
        if (fieldsPlanParentTypes.isEmpty) {
            return List().clear();
        } else {
            return List().set(0,
                new GQLFieldsExecutionPlan(
                    fieldsPlanParentTypes.toSet(),
                    name,
                    key,
                    RDFQueryService.createFieldsStrategyCreator(subjectTypes.toSet, projectionsByType, RDFQueryService.this.getPrefixes(), this.getSchema()),
                    List().clear(),
                    fullProjectionOrder(),
                    projectionsByType,
                ),
            );
        }
    };

    const [specialObjects, normalObjects] = partition(objects, ((x: [string, GQLField]) => Set(Object.keys(this.specialObjectFields)).contains(x[1].name));
    const specialPlans: List<GQLFieldsExecutionPlan> = specialObjects.map((o) => {
    const args = this.processArgs(o[1].arguments, this.getSchema().validFieldsForType(this.specialObjectFields()[o[1].name].returnType));
    return new GQLFieldsExecutionPlan(Set(
          parentType),
          o[1].name,
          key,
          this.specialObjectFields(o[1].name).generator(args)), // TODO I'm not sure this should be here..
          List().clear(),
          fullProjectionOrder().filter(a => a.alias === o[1].alias.getOrElse(o[1].name)),
          projectionsByType;
    });
    console.info(`specialObjects = ${specialObjects}`);
    console.info(`normalObjects = ${normalObjects}`);
    console.info(`fields plan ${fieldsPlan}`);
    const nonIgnoredNormalObjects = normalObjects.filter(f => !ignoredObjectFields.contains(f[1].name));
    const mySubPlans: List<GQLExecutionPlan> = fieldsPlan().unshift(specialPlans.unshift(...this.getSearchSubPlans(name, selections, nonIgnoredNormalObjects)));
    const plan = new GQLSearchExecutionPlan(Set(parentType), name, key, mySubPlans, errors, fullProjectionOrder(), queryArgs, subjectTypes);

    plan.copy({ strategies: RDFQueryService.createSearchStrategyCreator(plan, RDFQueryService.this.getPrefixes(), this.getSchema()) });
  }

 public exitFullOperationDefinition(ctx: FullOperationDefinitionContext) {
    const description = Option.of(ctx.COMMENT()).getOrElse(List<string>()).join('\n');
    this.operations.add(new GQLOperation({
            name: this.textOf(ctx.NAME()),
            description: Option.of(description),
            operationType: ctx.operationType().getText,
            variables: this.processVariableDefinitions(Option.of(ctx.variableDefinitions())),
            directives: this.processDirectives(Option.of(ctx.directives())),
            selections: this.processSelectionSet(ctx.selectionSet())}));
  }

 public processVariableDefinitions(
    ctxOpt: Option<VariableDefinitionsContext>): List<GQLVariableDefinition> {
      return ctxOpt.isEmpty() ? ctxOpt.variableDefinition().asScala.toList.map(this.processVariableDefinition) : List().clear();
  }

public processVariableDefinition(ctx: VariableDefinitionContext) {
    const description = Option.of(ctx.COMMENT()).getOrElse(List<string>().clear()).join('\n');
    const vd = new GQLVariableDefinition(this.textOf(ctx.variable().NAME()), this.getType(ctx.`type`(), description),
      this.processDefaultValue(Option.of(ctx.defaultValue())));
    this.variables = this.variables.add(vd);
    return vd;
  }

    public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
        return ctxOpt.map(dv => this.processValueOrVariable(dv.valueOrVariable());
    }

    public processValueOrVariable(ctx: ValueOrVariableContext): Either<GQLValue, GQLVariable> {
      if (Option.of(ctx.value()).nonEmpty()) {
          if (Option.of(ctx.variable()).nonEmpty()) {
              throw new Error('wat?'); // legacy
          } else {
              return Left(this.processValue(ctx.value()));
          }
      }  else if (Option.of(ctx.variable()).nonEmpty()) {
          return Right(this.processVariable(ctx.variable()));
      } else {
          throw new Error('wat?');
      }
    }

  public processValue(ctx: ValueContext): GQLValue {
    switch (ctx.constructor) {
        case StringValueContext: return new GQLStringValue(this.textOf(ctx.STRING()));
        case BooleanValueContext: return new GQLBooleanValue(this.textOf(ctx.BOOLEAN()).toBoolean());
        case EnumValueValueContext: return new GQLEnumValue(this.textOf(ctx.enumValue().NAME()));
        case NumberValueContext:
            const numText = ctx.NUMBER().getText();
            if (numText.includes('.')) {
                return new GQLDoubleValue(parseFloat(numText));
            } else {
                if (Try.of(numText.toInt()).isSuccess()) {
                    return new GQLIntValue(numText.toInt());
                } else { // JS doesn't have a 'long' type, so I just omitted that part for the lack of a better idea
                    throw new Error('Failed to find the type of number in value processing..');
                }
            }
        case ArrayValueContext: return new GQLArrayValue(List(ctx).map(x => this.processValue(x)));
    }
  }

   public processVariable(ctx: VariableContext): GQLVariable {
      return new GQLVariable(this.textOf(ctx.NAME()));
  }

  public processDirectives(ctxOpt: Option<DirectivesContext>) {
      if (ctxOpt.nonEmpty()) {
          return List(ctxOpt.directive()).map(x => this.processDirective(x));
      } else {
          return List().clear();
      }
  }

 public processDirective(ctx: DirectiveContext) {
      switch (ctx.constructor) {
          case ValueDirectiveContext: return new GQLValueDirective(this.textOf(ctx.NAME()),
              this.processValueOrVariable(ctx.valueOrVariable()));
          case NameDirectiveContext: return new GQLNameDirective(this.textOf(ctx.NAME()));
      }
  }

 public exitSelectionOnlyOperationDefinition(
    ctx: SelectionOnlyOperationDefinitionContext): void {
    this.operations = this.operations.add(new GQLOperation({
        name: '',
        operationType: 'query',
        fields: List().clear(),
        variables: List<GQLVariableDefinition>().clear(),
        directives: List<GQLDirective>().clear(),
        selections: this.processSelectionSet(ctx.selectionSet())})
    );
  }

public exitFragmentDefinition(ctx: FragmentDefinitionContext): void {
    this.fragmentDefinitions = this.fragmentDefinitions.add(new GQLFragmentDefinition(this.textOf(ctx.fragmentName().NAME()),
      new this.processTypeCondition(ctx.typeCondition()), this.processDirectives(Option.of(ctx.directives())),
      new this.processSelectionSet(ctx.selectionSet())));
  }

public processTypeCondition(ctx: TypeConditionContext) {
    return this.textOf(ctx.typeName().NAME());
  }

public processSelectionSet(ctx: SelectionSetContext): List<GQLSelection> {
      if (Option.of(ctx).nonEmpty()) {
          switch (ctx.constructor) {
              case Some(ctx): return List(ctx).map(c => c.constructor === FieldSelectionContext ? this.processField(c) : null);
              case InlineFragmentSelectionContext: return this.processInlineFragment(ctx.inlineFragment());
              case FragmentSpreadSelectionContext: return this.processFragmentSpread(ctx.fragmentSpread());
          }
      } else {
          return List().clear();
      }
  }

public processField(ctx: FieldContext): GQLField {
    const [name, alias] = this.processFieldName(ctx.fieldName());
    const fd = this.getSchema().getFieldDefinition(name);
    return new GQLField(name, alias, this.processArguments(Option.of(ctx.arguments()), fd), this.processDirectives(Option.of(ctx.directives())),
      this.processSelectionSet(ctx.selectionSet()));
  }

public processFieldName(ctx: FieldNameContext) {
      return [Option.of(ctx.NAMETYPE()).value(), Option.of(ctx.NAME()).value(), Option.of(ctx.alias()).value()]
          .map((c, index) => {
              if (c && c !== None) {
                  if (index < 2) {
                      return [this.textOf(c), None];
                  } else {
                      const na = c.NAME().split('').reverse().map(n => this.textOf(n))[0];
                      return [na, Some(c.last())];
                  }
              } else { return ['', None]; }
          });
}

public processArguments(ctxOpt: Option<ArgumentsContext>, fdOpt: Option<GQLFieldDefinition>) {
      if (Option.of(ctxOpt).nonEmpty()) {
          return List(ctxOpt.argument()).map(a => this.processArgument(a, fdOpt));
      } else {
          return List().clear();
      }
  }

public processArgument(ctx: ArgumentContext, fdOpt: Option<GQLFieldDefinition>): GQLArgument {
    const name = this.textOf(ctx.NAME());
    const [fieldName, argDefOpt] = Option.of(fdOpt).nonEmpty() ? [fdOpt.value.name, fdOpt.value.args.find(a => a.name === name)] : None;
    if (argDefOpt.isEmpty()) {
      this.check(ok = false, `unknown argument '${name}' on field '${fieldName}`, ctx); // TODO ?
      return new GQLInvalidArgument(name, Left(new GQLStringValue('error')));
    } else {
      const expectedType = argDefOpt.get.gqlType.xsdType;
      const v = this.processValueOrVariable(ctx.valueOrVariable());
      switch (v) {
          case Left(_: GQLStringValue): return expectedType === 'xsd:string';
          case Left(_: GQLIntValue): return expectedType === 'xsd:integer';
          case Left(_: GQLBooleanValue): return expectedType === 'xsd:boolean';
          case Right(some_val): switch (variables.find(a => a.name === variable.name)) {
              case Some(vd: GQLVariableDefinition): return vd.gqlType.xsdType === expectedType;
              default: return false;
          }
      }
      (name, typeOk); match; {
        public case(ARG_FILTER,      true) => public GQLFilterArgument(name, v);
        public case(ARG_ORDER,      true) => public GQLOrderArgument(name, v);
        public case(ARG_LIMIT,      true) => public GQLLimitArgument(name, v);
        public case(ARG_OFFSET,      true) => public GQLOffsetArgument(name, v);
        public case(ARG_TRANSFORMS,      true) => public GQLTransformsArgument(name, v);
        public case(ARG_PATTERNS,      true) => public GQLPatternsArgument(name, v);
        public case(ARG_BOOSTERS,      true) => public GQLBoostersArgument(name, v);
        public case(ARG_BINDINGS,      true) => public GQLBindingsArgument(name, v);
        public case(ARG_INCLUDE_DEPRECATED,      true) => public GQLIncludeDeprecatedArgument(name, v);
        public case(ARG_NAME,      true) => public GQLNameArgument(name, v);
        public case(x,      true) => {
          logger.info(`name = ${v}`);
          GQLAnyArgument(name, v);
        }
        case (_) => /* keep compiler happy */ new GQLInvalidArgument(name, Left(new GQLStringValue('error')));
      }
    }
  }

public processInlineFragment(ctx: InlineFragmentContext): GQLInlineFragment {
    return new GQLInlineFragment(textOf(ctx.typeCondition().typeName().NAME()),
        this.processDirectives(Option.of(ctx.directives())),
      this.processSelectionSet(ctx.selectionSet()));
}

public processFragmentSpread(ctx: FragmentSpreadContext): GQLFragmentSpread {
    return new GQLFragmentSpread(this.textOf(ctx.fragmentName().NAME()),
        this.processDirectives(Option.of(ctx.directives())));
    }
}
