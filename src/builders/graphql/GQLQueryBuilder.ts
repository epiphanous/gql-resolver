import { Either, Left, None, Option, Right, Some, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { mapValues } from 'lodash';
import {
  ArgumentContext,
  ArgumentsContext,
  ArrayValueContext,
  BooleanValueContext,
  DefaultValueContext,
  DirectiveContext,
  DirectivesContext,
  EnumValueValueContext,
  FieldContext,
  FieldNameContext,
  FieldSelectionContext,
  FragmentDefinitionContext,
  FragmentSpreadContext,
  FragmentSpreadSelectionContext,
  FullOperationDefinitionContext,
  GraphQLParser,
  InlineFragmentContext,
  InlineFragmentSelectionContext,
  NameDirectiveContext,
  NumberValueContext,
  SelectionOnlyOperationDefinitionContext,
  SelectionSetContext,
  StringValueContext,
  TypeConditionContext,
  ValueContext,
  ValueDirectiveContext,
  ValueOrVariableContext,
  VariableContext,
  VariableDefinitionContext,
  VariableDefinitionsContext,
} from '../../antlr4/generated/GraphQLParser';
import { DEFAULT_PREFIXES, INTERNAL_ID_KEY } from '../../models/Constants';
import { GQLAny } from '../../models/GQLAny';
import * as GQLArg from '../../models/GQLArgument';
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
  GQLArrayValue,
  GQLBooleanValue,
  GQLDoubleValue,
  GQLEnumValue,
  GQLIntValue,
  GQLStringValue,
  GQLValue,
} from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import NameAlias from '../../models/NameAlias';
import { QueryStrategy } from '../../models/QueryStrategy';
import ResolverContext from '../../models/ResolverContext';
import Builder from '../Builder';
import BuilderError from '../BuilderError';
import GQLBindingsBuilder from './GQLBindingsBuilder';
import GQLBoostersBuilder from './GQLBoostersBuilder';
import GQLDocumentBuilder from './GQLDocumentBuilder';
import GQLFilterBuilder from './GQLFilterBuilder';
import GQLOrderByBuilder from './GQLOrderByBuilder';
import GQLPatternsBuilder from './GQLPatternsBuilder';
import GQLTransformsBuilder from './GQLTransformsBuilder';

class UnknownFieldException extends Error {
  constructor() {
    super('Field not in type');
  }
}

class SpecialObjectField {
  public returnType: string;
  public generator: (args: GQLQueryArguments) => List<QueryStrategy>;

  constructor(
    returnType: string,
    generator: (args: GQLQueryArguments) => List<QueryStrategy>,
  ) {
    this.generator = generator;
  }
}

const ignoredObjectFields = Set(['schema_item']);

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
  // these sets are mutable
  public operations: Set<GQLOperation> = Set().asMutable();
  public fragmentDefinitions: Set<GQLFragmentDefinition> = Set().asMutable();
  public variables: Set<GQLVariableDefinition> = Set().asMutable();

  public GQLRootExecutionPlan: GQLRootExecutionPlan;

  constructor(context: ResolverContext, vars: Map<string, any>) {
    super();
    this.context = context;
    this.vars = vars;
  }

  public getSchema() {
    return this.context.schema;
  }

  public getPrefixes() {
    return DEFAULT_PREFIXES;
  }

  public build(parser: GraphQLParser): Try<GQLQueryDocument> {
    try {
      this.parseWith(parser);
      this.resolveDefaults(this.vars);
      if (this.errorCount > 0) {
        throw this.errorReport;
      } else {
        if (this.warningCount > 0) {
          this.errors.forEach(w => console.warn(w));
        }
        return Try.success(
          new GQLQueryDocument(
            this.operations
              .valueSeq()
              .toList()
              .map((op: GQLOperation) => this.withExecutionPlan(op)),
          ),
        );
      }
    } catch (error) {
      console.log(JSON.stringify(this.errors));
      return Try.failure(error);
    }
  }

  public withExecutionPlan(operation: GQLOperation): GQLOperation {
    console.debug(`withExecutionPlan: operation = ${JSON.stringify(operation, null, 2)}`);
    const fop = this.withFlattenedSelections(operation);
    return fop.operationType === 'query'
      ? fop.copy({
        executionPlan: this.getRootExecutionPlan(
          fop.name,
          fop.fields,
          fop.selections,
        ),
      })
      : fop;
  }

  public withFlattenedSelections(operation: GQLOperation) {
    const opType = this.getSchema().operationTypes.get(operation.operationType);
    const fields = this.flattenSelections(opType, operation.selections);
    return operation.copy({ fields });
  }

  public flattenSelections(
    parentType: string,
    selections: List<GQLSelection>,
  ): List<[string, GQLField]> {
    const k = selections.flatMap((s: GQLSelection) =>
      this.flattenSelection(parentType, s),
    );
    return List<[string, GQLField]>(k);
  }

  public flattenSelection(
    parentType: string,
    selection: GQLSelection,
  ): List<[string, GQLField]> {
    switch (selection.constructor) {
      case GQLField:
        const field = selection as GQLField;
        const ft = this.getSchema().getFieldType(field.name);
        if (ft.isEmpty()) {
          throw new Error(`unable to getFieldType(${field.name})`);
        }
        const tuple: [string, GQLField] = [
          parentType,
          field.copy({ fields: this.flattenSelections(ft.get(), field.selections) })
        ];
        return List<[string, GQLField]>([tuple]);

      case GQLInlineFragment:
        const frag = selection as GQLInlineFragment;
        return this.flattenSelections(frag.typeCondition, frag.selections);

      case GQLFragmentSpread:
        const spread = selection as GQLFragmentSpread;
        const fragDef = this.fragmentDefinitions.find(d => d.name === spread.name);
        if (!fragDef) {
          throw new Error(`bad fragment spread ${spread.name}`);
        }
        return this.flattenSelections(fragDef.typeCondition, fragDef.selections);
    }
  }

  public resolveDefaults(vars: Map<string, any>) {
    return vars.withMutations(map => {
      this.variables.forEach(vd => {
        const isRequired = vd.gqlType.isRequired;
        const defVoV = vd.defaultValue;
        if (defVoV.nonEmpty) {
          if (defVoV.get().isLeft) {
            const defValue = defVoV.get()._L.value;
            map.update(vd.name, defValue);
          }
        } else if (isRequired && Option.of(vars.get(vd.name)).isEmpty()) {
          this.addError(
            new BuilderError(
              `missing required value for variable ${vd.name}`,
              0,
              0,
            ),
          );
        }
      });
    });
  }

  public processArgs(
    args: List<GQLArg.GQLArgument>,
    allFields: Map<string, string>,
  ): GQLQueryArguments {
    return args.reduce((qa, arg) => {
      if (arg instanceof GQLArg.GQLAnyArgument) {
        const anyArg = arg as GQLArg.GQLAnyArgument;
        if (anyArg.value.isRight) {
          const variable = anyArg.value._A;
          const value = Option.of(this.vars.get(variable.name));
          return qa.copy({ any: Some(new GQLAny(anyArg.name, value)) });
        } else {
          return qa.copy({ any: Some(new GQLAny(anyArg.name, None)) });
        }
      } else if (arg instanceof GQLArg.GQLFilterArgument) {
        const a = arg as GQLArg.GQLFilterArgument;
        return qa.copy({
          filter: Some(this.processFilter(a.resolve(this.vars), allFields)),
        });
      } else if (arg instanceof GQLArg.GQLPatternsArgument) {
        const a = arg as GQLArg.GQLPatternsArgument;
        return qa.copy({
          patterns: this.processPatterns(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLArg.GQLBoostersArgument) {
        const a = arg as GQLArg.GQLBoostersArgument;
        return qa.copy({
          boosters: this.processBoosters(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLArg.GQLBindingsArgument) {
        const a = arg as GQLArg.GQLBindingsArgument;
        return qa.copy({
          bindings: this.processBindings(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLArg.GQLOrderArgument) {
        const a = arg as GQLArg.GQLOrderArgument;
        return qa.copy({
          order: this.processOrder(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLArg.GQLTransformsArgument) {
        const a = arg as GQLArg.GQLTransformsArgument;
        return qa.copy({
          transforms: this.processTransforms(a.resolve(this.vars)),
        });
      } else if (arg instanceof GQLArg.GQLLimitArgument) {
        const a = arg as GQLArg.GQLLimitArgument;
        const limit = Some(parseInt(a.resolve(this.vars), 10));
        if (qa.offset.nonEmpty) {
          return qa.copy({ limit });
        } else {
          return qa.copy({ limit, offset: Some(0) });
        }
      } else if (arg instanceof GQLArg.GQLOffsetArgument) {
        const a = arg as GQLArg.GQLOffsetArgument;
        const offset = Some(parseInt(a.resolve(this.vars), 10));
        return qa.copy({ offset });
      } else if (arg instanceof GQLArg.GQLNameArgument) {
        const a = arg as GQLArg.GQLNameArgument;
        return qa.copy({ name: Some(a.resolve(this.vars)) });
      } else if (arg instanceof GQLArg.GQLIncludeDeprecatedArgument) {
        const a = arg as GQLArg.GQLIncludeDeprecatedArgument;
        const b = /^(1|t|true)$/.test(a.resolve(this.vars).toLowerCase());
        return qa.copy({ includeDeprecated: Some(b) });
      } else {
        return qa;
      }
    }, new GQLQueryArguments());
  }

  public processFilter(filterExpr: string, validFields: Map<string, string>) {
    return Builder.parse<GQLFilter>(
      new GQLFilterBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys()),
      ),
      filterExpr,
    ).get();
  }

  public processPatterns(
    patternsExpr: string,
    validFields: Map<string, string>,
  ) {
    return Builder.parse<List<GQLPattern>>(
      new GQLPatternsBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys()),
      ),
      patternsExpr,
    ).get();
  }

  public processBindings(
    bindingsExpr: string,
    validFields: Map<string, string>,
  ) {
    return Builder.parse<List<GQLBinding>>(
      new GQLBindingsBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys()),
      ),
      bindingsExpr,
    ).get();
  }

  public processBoosters(
    boostersExpr: string,
    validFields: Map<string, string>,
  ) {
    return Builder.parse<List<GQLBooster>>(
      new GQLBoostersBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys()),
      ),
      boostersExpr,
    ).get();
  }

  public processOrder(orderExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLOrderBy>>(
      new GQLOrderByBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys()),
      ),
      orderExpr,
    ).get();
  }

  public processTransforms(transformsExpr: string) {
    return Builder.parse<List<GQLTransform>>(
      new GQLTransformsBuilder(Set(this.getPrefixes().keys())),
      transformsExpr,
    ).get();
  }

  public getSearchSubPlans(
    name: string,
    selections: List<GQLSelection>,
    objects: List<[string, GQLField]>,
  ) {
    console.log(`subPlans name = ${name} objects = ${objects}`);
    const plans: List<GQLSearchExecutionPlan> = objects.map(
      (tf: [string, GQLField]) => {
        const [t, f] = tf;
        console.log(`creating subplan ${f.name} from fields ${f.fields}`);
        return this.getQueryExecutionPlan(
          t,
          f.name,
          f.alias.getOrElse(f.name),
          f.fields,
          selections,
          f.args,
        ).value;
      },
    );
    console.log(`subplans for ${name} = ${plans}`);
    return plans;
  }

  public getRootExecutionPlan(
    name: string,
    fields: List<[string, GQLField]>,
    selections: List<GQLSelection>,
  ) {
    // console.log(`plan ${name}: partitioning fields ${JSON.stringify(fields, null, 2)}`);
    const [scalars, objects, errors] = this.getSchema().partitionFields(fields);
    if (errors.size > 0) {
      console.error(`Errors in field partitioning: ${ errors }`);
    }
    if (objects.isEmpty()) {
      console.log(`no plan for ${name}`);
      return None;
    } else {
      return Some(this.getRootPlan(name, selections, objects, errors));
    }
  }

  public getQueryExecutionPlan(
    parentType: string,
    name: string,
    key: string,
    fields: List<[string, GQLField]>,
    selections: List<GQLSelection>,
    args: List<GQLArg.GQLArgument>,
  ) {
    console.log(`plan ${name}: partitioning fields ${fields}`);
    const [scalars, objects, errors] = this.getSchema().partitionFields(fields);

    console.log(`plan ${name}: scalars    = ${scalars}`);
    console.log(`plan ${name}: objects    = ${objects}`);
    console.log(`plan ${name}: errors     = ${errors}`);
    console.log(`plan ${name}: args       = ${args}`);
    console.log(`plan ${name}: selections = ${selections}`);

    if (scalars.isEmpty() && objects.isEmpty()) {
      const fieldsFromFragment = this.getSchema()
        .inlineFragmentChildFieldMappingsOf(selections, name)
        .filter((a: any) => typeof a[1] !== 'undefined')
        .reduce((acc, item: any) => {
          acc.push(
            item[1].map((field: any) => [
              this.getSchema()
                .getFieldType(name)
                .getOrElse(name),
              field,
            ]),
          );
          return acc;
        }, []);

      console.log(
        `*** plan ${name} has fieldsFromFragment : ${fieldsFromFragment}`,
      );

      if (fieldsFromFragment.length > 0) {
        return Some(
          this.getSearchPlan(
            parentType,
            name,
            key,
            selections,
            args,
            fields,
            List(fieldsFromFragment),
            objects,
            errors,
          ),
        );
      } else {
        console.info(`no plan for ${name}`);
        return None;
      }
    } else {
      return Some(
        this.getSearchPlan(
          parentType,
          name,
          key,
          selections,
          args,
          fields,
          scalars,
          objects,
          errors,
        ),
      );
    }
  }

  public getRootPlan(
    name: string,
    selections: List<GQLSelection>,
    objects: List<[string, GQLField]>,
    errors: List<Error>,
  ) {
    const mySubPlans = this.getSearchSubPlans(name, selections, objects);

    return new GQLRootExecutionPlan(
      Set<string>(),
      name,
      'key',
      mySubPlans,
      errors,
    ); // TODO other fields?
  }

  public specialObjectFields(): Map<string, SpecialObjectField> {
    return Map(List());

    // TODO Legacy code here, need to implement for Jubel
    // return Map({
    //   athlinks_steps: new SpecialObjectField(
    //     'athlinks_StepAction',
    //     (args: GQLQueryArguments) =>
    //       RDFQueryService.createStepsStrategies(
    //         args,
    //         Set(this.getPrefixes().keys()),
    //         this.getSchema()
    //       )
    //   ),
    //   schema_dataFeedElement: new SpecialObjectField(
    //     'schema_DataFeedItem',
    //     (args: GQLQueryArguments) =>
    //       RDFQueryService.createDataFeedStrategy(
    //         args,
    //         Set(this.getPrefixes().keys()),
    //         this.getSchema()
    //       )
    //   ),
    // });
  }

  public getSearchPlan(
    parentType: string,
    name: string,
    key: string,
    selections: List<GQLSelection>,
    args: List<GQLArg.GQLArgument>,
    fields: List<[string, GQLField]>,
    scalars: List<[string, GQLField]>,
    objects: List<[string, GQLField]>,
    errors: List<UnknownFieldException>,
  ) {
    const queryFields: List<[string, GQLField]> = scalars;
    console.log(`queryFields for plan ${name} = ${queryFields}`);

    const fullProjectionOrder: () => List<NameAlias> = () =>
      fields
        .map(([_, field]) => field)
        .concat(objects.map((_, field) => field))
        .map(
          (x: GQLField) => new NameAlias(x.alias.value || x.name, x.name),
        );

    const hiddenIdField = new GQLField({
      name: 'id',
      alias: Some(INTERNAL_ID_KEY),
      args: List(),
      directives: List(),
      selections: List(),
      fields: List(),
    });

    // request hidden id field for objects we are requesting objects
    // from but maybe arent requesting scalars from
    const hiddenIdFields =  Map(
      objects
        .map(([t]) => t)
        .flatMap(t => this.getSchema().getImplementingTypes(t))
        .map<[string, List<GQLField>]>(it => [it, List([hiddenIdField])])
    );
    console.log(`getPlan ${name} hiddenIdFields = ${hiddenIdFields}`);
    const projectionsByType = hiddenIdFields.merge(queryFields
      .flatMap(tf => {
        const t = tf[0];
        const f = tf[1];
        const types = this.getSchema()
          .getImplementingTypes(t)
          .map<[string, GQLField]>(it => [it, f]);
        console.log(`implementing types of ${t} = ${types}`);
        return types;
      })
      .groupBy(([x]) => x)
      .map(v => v.map(w => w[1]).toList()));

    console.log(`getPlan ${name} objects = ${objects}`);
    console.log(`getPlan ${name} projectionsByType = ${projectionsByType}`);

    const subjectTypes: List<string> = List(projectionsByType.keys());

    const ptype: string = this.getSchema()
      .getFieldType(name)
      .getOrElse(parentType);
    const queryArgs = this.processArgs(
      args,
      this.getSchema().validFieldsForType(ptype),
    ); // TODO Add method to schema

    const fieldsPlanParentTypes = subjectTypes.filterNot(x =>
      x.startsWith('O_xsd'),
    );
    const fieldsPlan = () => {
      return List(); // for now
      // if (fieldsPlanParentTypes.isEmpty()) {
      //   return List().clear();
      // } else {
      //   return List().set(
      //     0,
      //     new GQLFieldsExecutionPlan(
      //       fieldsPlanParentTypes.toSet(),
      //       name,
      //       key,
      //       RDFQueryService.createFieldsStrategyCreator(
      //         subjectTypes.toSet,
      //         projectionsByType,
      //         this.getPrefixes().keys(),
      //         this.getSchema()
      //       ),
      //       List().clear(),
      //       fullProjectionOrder(),
      //       projectionsByType
      //     )
      //   );
      // }
    };
    const specialObjects = objects.filter(x =>
      Set(Object.keys(this.specialObjectFields())).contains(x[1].name),
    );
    const normalObjects = objects.filter(
      x => !Set(Object.keys(this.specialObjectFields())).contains(x[1].name),
    );
    const specialPlans: List<GQLFieldsExecutionPlan> = specialObjects.map(
      (o: [string, GQLField]) => {
        const arg = this.processArgs(
          o[1].args,
          this.getSchema().validFieldsForType(
            this.specialObjectFields().get(o[1].name).returnType,
          ),
        );
        return new GQLFieldsExecutionPlan(
          Set(parentType),
          o[1].name,
          key,
          // this.specialObjectFields().get(o[1].name).generator(arg)),
          List<GQLExecutionPlan>(),
          List().clear(),
          fullProjectionOrder().filter(
            a => a.alias === o[1].alias.getOrElse(o[1].name),
          ),
          projectionsByType,
        );
      },
    );
    console.info(`specialObjects = ${specialObjects}`);
    console.info(`normalObjects = ${normalObjects}`);
    console.info(`fields plan ${fieldsPlan}`);
    const nonIgnoredNormalObjects = List(
      normalObjects.filter(f => !ignoredObjectFields.contains(f[1].name)),
    );
    const mySubPlans = List<GQLExecutionPlan>();
    // const mySubPlans: List<GQLExecutionPlan> = fieldsPlan().unshift(
    //   specialPlans.unshift(
    //     ...this.getSearchSubPlans(name, selections, nonIgnoredNormalObjects)
    //   )
    // );
    const plan = new GQLSearchExecutionPlan({
      parentTypes: Set(parentType),
      name,
      key,
      subPlans: mySubPlans,
      errors,
      projectionOrder: fullProjectionOrder(),
      queryArguments: queryArgs,
      subjectTypes,
    });
    // plan.copy({
    //   strategies: RDFQueryService.createSearchStrategyCreator(
    //     plan,
    //     this.getPrefixes().keys(),
    //     this.getSchema()
    //   ),
    // });
    return plan;
  }

  public exitFullOperationDefinition(
    ctx: FullOperationDefinitionContext,
  ) {
    console.log('EXIT FULL OPERATION DEFINITION');
    const description = Option.of(ctx.COMMENT())
      .getOrElse(List<string>())
      .join('\n');
    const gqlOp = new GQLOperation({
      name: this.textOf(ctx.NAME()),
      description: Option.of(description),
      operationType: ctx.operationType().text,
      variables: this.processVariableDefinitions(
        Option.of(ctx.variableDefinitions()),
      ),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()),
    });
    console.log(gqlOp);
    this.operations.add(
      gqlOp,
    );
    console.log('Operations in GQBuilder:', this.operations);
  }

  public processVariableDefinitions(
    ctxOpt: Option<VariableDefinitionsContext>,
  ): List<GQLVariableDefinition> {
    return ctxOpt.nonEmpty()
      ? List(ctxOpt.value.variableDefinition()).map(
        this.processVariableDefinition,
      )
      : List().clear();
  }

  public processVariableDefinition(ctx: VariableDefinitionContext) {
    const description = Option.of(ctx.COMMENT())
      .getOrElse(List<string>().clear())
      .join('\n');
    const vd = new GQLVariableDefinition(
      this.textOf(ctx.variable().NAME()),
      this.getType(ctx.type()),
      Option.of(description),
      this.processDefaultValue(Option.of(ctx.defaultValue())),
    );
    this.variables = this.variables.add(vd);
    return vd;
  }

  public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
    return ctxOpt.map(dv => this.processValueOrVariable(dv.valueOrVariable()));
  }

  public processValueOrVariable(
    ctx: ValueOrVariableContext,
  ): Either<GQLValue, GQLVariable> {
    if (Option.of(ctx.value()).nonEmpty()) {
      return Left(this.processValue(ctx.value()));
    } else if (Option.of(ctx.variable()).nonEmpty()) {
      return Right(this.processVariable(ctx.variable()));
    } else {
      throw new Error('wat?');
    }
  }

  public processValue(ctx: ValueContext): GQLValue {
    switch (ctx.constructor) {
      case StringValueContext:
        const s = this.textOf((ctx as StringValueContext).STRING());
        return new GQLStringValue(s);
      case BooleanValueContext:
        return new GQLBooleanValue(this.textOf((ctx as BooleanValueContext).BOOLEAN()));
      case EnumValueValueContext:
        return new GQLEnumValue(
          this.textOf(
            (ctx as EnumValueValueContext).enumValue().NAME(),
          ),
        );
      case NumberValueContext:
        const numText = this.textOf((ctx as NumberValueContext).NUMBER());
        if (numText.includes('.')) {
          return new GQLDoubleValue(parseFloat(numText));
        } else {
          return new GQLIntValue(parseInt(numText, 10));
        }
      case ArrayValueContext:
        return new GQLArrayValue(
          List((ctx as ArrayValueContext).array().value()).map(vc => this.processValue(vc)),
        );
    }
  }

  public processVariable(ctx: VariableContext): GQLVariable {
    return new GQLVariable(this.textOf(ctx.NAME()));
  }

  public processDirectives(ctxOpt: Option<DirectivesContext>) {
    if (ctxOpt.nonEmpty()) {
      return List(ctxOpt.value.directive()).map(x => this.processDirective(x));
    } else {
      return List().clear();
    }
  }

  public processDirective(ctx: DirectiveContext) {
    switch (ctx.constructor) {
      case ValueDirectiveContext:
        return new GQLValueDirective(
          this.textOf(ctx.constructor().NAME()),
          this.processValueOrVariable(ctx.constructor().valueOrVariable()),
        );
      case NameDirectiveContext:
        return new GQLNameDirective(this.textOf(ctx.constructor().NAME()));
    }
  }

  public exitSelectionOnlyOperationDefinition(
    ctx: SelectionOnlyOperationDefinitionContext,
  ): void {
    this.operations.add(
      new GQLOperation({
        name: '',
        operationType: 'query',
        variables: List<GQLVariableDefinition>(),
        directives: List<GQLDirective>(),
        selections: this.processSelectionSet(ctx.selectionSet()),
      }),
    );
  }

  public exitFragmentDefinition(
    ctx: FragmentDefinitionContext,
  ): void {
    this.fragmentDefinitions = this.fragmentDefinitions.add(
      new GQLFragmentDefinition(
        this.textOf(ctx.fragmentName().NAME()),
        this.processTypeCondition(ctx.typeCondition()),
        this.processDirectives(Option.of(ctx.directives())),
        this.processSelectionSet(ctx.selectionSet()),
      ),
    );
  }

  public processTypeCondition(ctx: TypeConditionContext) {
    return this.textOf(ctx.typeName().NAME());
  }

  public processSelectionSet(
    ctx: SelectionSetContext,
  ): List<GQLSelection> {
    if (ctx) {
      return List(ctx.selection().map(sc => {
        switch (sc.constructor) {
          case FieldSelectionContext:
            return this.processField((sc as FieldSelectionContext).field());
          case InlineFragmentSelectionContext:
            return this.processInlineFragment((sc as InlineFragmentSelectionContext).inlineFragment());
          case FragmentSpreadSelectionContext:
            return this.processFragmentSpread((sc as FragmentSpreadSelectionContext).fragmentSpread());
        }
      }));
    } else {
      return List<GQLSelection>();
    }
  }

  public processField(ctx: FieldContext): GQLField {
    const [name, alias] = this.processFieldName(ctx.fieldName());
    const fdOpt = this.getSchema().getFieldDefinition(name);
    return new GQLField({
      name,
      alias,
      args: this.processArguments(Option.of(ctx.arguments()), fdOpt),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()),
    });
  }

  public processFieldName(ctx: FieldNameContext): [string, Option<string>] {
    const nameTypeOpt = Option.of(ctx.NAMETYPE());
    const nameOpt = Option.of(ctx.NAME());
    const aliasOpt = Option.of(ctx.alias());
    if (aliasOpt.isEmpty()) {
      const n = Option.of(nameTypeOpt.getOrElse(nameOpt.get()));
      return [n.map(t => this.textOf(t)).getOrElse(''), None];
    }
    const na = aliasOpt.value.NAME().reverse().map(t => this.textOf(t));
    return [na[0], Option.of(na[1])];
  }

  public processArguments(
    ctxOpt: Option<ArgumentsContext>,
    fdOpt: Option<GQLFieldDefinition>,
  ): List<GQLArg.GQLArgument> {
    if (ctxOpt.nonEmpty()) {
      return List(ctxOpt.get().argument()).map(arg => this.processArgument(arg, fdOpt));
    } else {
      return List<GQLArg.GQLArgument>();
    }
  }

  public processArgument(
    ctx: ArgumentContext,
    fdOpt: Option<GQLFieldDefinition>,
  ): GQLArg.GQLArgument {
    const name = this.textOf(ctx.NAME());
    const fieldName = fdOpt.map(fd => fd.name).getOrElse('unknown');
    const argDefOpt = fdOpt.map(fd => fd.args.find(def => def.name === name));
    if (argDefOpt.isEmpty()) {
      this.check(
        false,
        `unknown argument '${name}' on field '${fieldName}`,
        ctx,
      );
      return new GQLArg.GQLInvalidArgument(
        name,
        Left(new GQLStringValue('error')),
      );
    } else {
      const expectedType = argDefOpt.get().gqlType.xsdType();
      const v = this.processValueOrVariable(ctx.valueOrVariable());
      let typeOk = false;
      if (v.isLeft()) {
        switch (v.value.constructor.name) {
          case 'GQLStringValue':
            typeOk = expectedType === 'xsd:string';
            break;
          case 'GQLIntValue':
            typeOk = expectedType === 'xsd:integer';
            break;
          case 'GQLBooleanValue':
            typeOk = expectedType === 'xsd:boolean';
        }
      } else {
        const hasVar = this.variables.find(a => a.name === v.get().name);
        if (hasVar) {
          typeOk = hasVar.gqlType.xsdType() === expectedType;
        }
      }

      if (typeOk) {
        switch (name) {
          case ARG_TYPES.ARG_FILTER:
            return new GQLArg.GQLFilterArgument(name, v);
          case ARG_TYPES.ARG_ORDER:
            return new GQLArg.GQLOrderArgument(name, v);
          case ARG_TYPES.ARG_LIMIT:
            return new GQLArg.GQLLimitArgument(name, v);
          case ARG_TYPES.ARG_OFFSET:
            return new GQLArg.GQLOffsetArgument(name, v);
          case ARG_TYPES.ARG_TRANSFORMS:
            return new GQLArg.GQLTransformsArgument(name, v);
          case ARG_TYPES.ARG_PATTERNS:
            return new GQLArg.GQLPatternsArgument(name, v);
          case ARG_TYPES.ARG_BOOSTERS:
            return new GQLArg.GQLBoostersArgument(name, v);
          case ARG_TYPES.ARG_BINDINGS:
            return new GQLArg.GQLBindingsArgument(name, v);
          case ARG_TYPES.ARG_INCLUDE_DEPRECATED:
            return new GQLArg.GQLIncludeDeprecatedArgument(name, v);
          case ARG_TYPES.ARG_NAME:
            return new GQLArg.GQLNameArgument(name, v);
          default:
            return new GQLArg.GQLAnyArgument(name, v);
        }
      } else {
        return new GQLArg.GQLInvalidArgument(
          name,
          Left(new GQLStringValue('error')),
        );
      }
    }
  }

  public processInlineFragment(
    ctx: InlineFragmentContext,
  ): GQLInlineFragment {
    return new GQLInlineFragment(
      this.textOf(
        ctx
          .typeCondition()
          .typeName()
          .NAME(),
      ),
      this.processDirectives(Option.of(ctx.directives())),
      this.processSelectionSet(ctx.selectionSet()),
    );
  }

  public processFragmentSpread(
    ctx: FragmentSpreadContext,
  ): GQLFragmentSpread {
    return new GQLFragmentSpread(
      this.textOf(ctx.fragmentName().NAME()),
      this.processDirectives(Option.of(ctx.directives())),
    );
  }
}
