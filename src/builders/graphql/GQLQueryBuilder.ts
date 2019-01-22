import { Left, None, Option, Some, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  ArgumentContext,
  ArgumentsContext,
  DirectiveContext,
  DirectivesContext,
  FieldContext,
  FieldSelectionContext,
  FragmentDefinitionContext,
  FragmentSpreadContext,
  FragmentSpreadSelectionContext,
  FullOperationDefinitionContext,
  GraphQLParser,
  InlineFragmentContext,
  InlineFragmentSelectionContext,
  SelectionOnlyOperationDefinitionContext,
  SelectionSetContext,
  TypeConditionContext,
  VariableContext,
  VariableDefinitionContext,
  VariableDefinitionsContext,
} from '../../antlr4/generated/GraphQLParser';
import { DEFAULT_PREFIXES, INTERNAL_ID_KEY } from '../../models/Constants';
import { GQLAny } from '../../models/GQLAny';
import {
  GQLArgument,
  GQLAnyArgument,
  GQLFilterArgument,
  GQLPatternsArgument,
  GQLBoostersArgument,
  GQLBindingsArgument,
  GQLOrderArgument,
  GQLTransformsArgument,
  GQLLimitArgument,
  GQLOffsetArgument,
  GQLNameArgument,
  GQLIncludeDeprecatedArgument,
  GQLInvalidArgument,
} from '../../models/GQLArgument';
import * as GQLArg from '../../models/GQLArgument';
import { GQLBinding } from '../../models/GQLBinding';
import { GQLBooster } from '../../models/GQLBooster';
import { GQLDirective } from '../../models/GQLDirective';
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
import {
  GQLField,
  GQLFragmentSpread,
  GQLInlineFragment,
  GQLSelection,
} from '../../models/GQLSelection';
import { GQLTransform } from '../../models/GQLTransform';
import {
  GQLFieldDefinition,
  GQLDirectiveDefinition,
  GQLTypeDefinition,
} from '../../models/GQLTypeDefinition';
import { GQLStringValue, GQLVariableValue } from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import NameAlias from '../../models/NameAlias';
import { RDFQueryService } from '../../models/RDFQueryService';
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

export default class GQLQueryBuilder extends GQLDocumentBuilder<
  GQLQueryDocument
> {
  public context: ResolverContext;
  public vars: Map<string, any>;
  // these sets are mutable
  public operations: Set<GQLOperation> = Set().asMutable();
  public fragmentDefinitions: Set<GQLFragmentDefinition> = Set().asMutable();
  public variables: Set<GQLVariableDefinition> = Set().asMutable();

  public GQLRootExecutionPlan: GQLRootExecutionPlan;

  constructor(
    context: ResolverContext,
    vars: Map<string, any> = Map<string, any>()
  ) {
    super();
    this.context = context;
    this.vars = vars.asMutable();
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
              .map((op: GQLOperation) => this.withExecutionPlan(op))
          )
        );
      }
    } catch (error) {
      console.log(JSON.stringify(this.errors));
      return Try.failure(error);
    }
  }

  public withExecutionPlan(operation: GQLOperation): GQLOperation {
    console.debug(
      `withExecutionPlan: operation = ${JSON.stringify(operation, null, 2)}`
    );
    const fop = this.withFlattenedSelections(operation);
    return fop.operationType === 'query'
      ? fop.copy({
          executionPlan: this.getRootExecutionPlan(
            fop.name,
            fop.fields,
            fop.selections
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
    selections: List<GQLSelection>
  ): List<[string, GQLField]> {
    const k = selections.flatMap((s: GQLSelection) =>
      this.flattenSelection(parentType, s)
    );
    return List<[string, GQLField]>(k);
  }

  public flattenSelection(
    parentType: string,
    selection: GQLSelection
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
          field.copy({
            fields: this.flattenSelections(ft.get(), field.selections),
          }),
        ];
        return List<[string, GQLField]>([tuple]);

      case GQLInlineFragment:
        const frag = selection as GQLInlineFragment;
        return this.flattenSelections(frag.typeCondition, frag.selections);

      case GQLFragmentSpread:
        const spread = selection as GQLFragmentSpread;
        const fragDef = this.fragmentDefinitions.find(
          d => d.name === spread.name
        );
        if (!fragDef) {
          throw new Error(`bad fragment spread ${spread.name}`);
        }
        return this.flattenSelections(
          fragDef.typeCondition,
          fragDef.selections
        );
    }
  }

  public processArgs(
    args: List<GQLArgument>,
    allFields: Map<string, string>
  ): GQLQueryArguments {
    return args.reduce<GQLQueryArguments>((qa, arg) => {
      if (arg instanceof GQLAnyArgument) {
        const a = arg as GQLAnyArgument;
        return qa.copy({
          any: qa.any.push(new GQLAny(a.name, Option.of(a.resolve(this.vars)))),
        });
      } else if (arg instanceof GQLFilterArgument) {
        const a = arg as GQLFilterArgument;
        return qa.copy({
          filter: Some(this.processFilter(a.resolve(this.vars), allFields)),
        });
      } else if (arg instanceof GQLPatternsArgument) {
        const a = arg as GQLPatternsArgument;
        return qa.copy({
          patterns: this.processPatterns(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLBoostersArgument) {
        const a = arg as GQLBoostersArgument;
        return qa.copy({
          boosters: this.processBoosters(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLBindingsArgument) {
        const a = arg as GQLBindingsArgument;
        return qa.copy({
          bindings: this.processBindings(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLOrderArgument) {
        const a = arg as GQLOrderArgument;
        return qa.copy({
          order: this.processOrder(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLTransformsArgument) {
        const a = arg as GQLTransformsArgument;
        return qa.copy({
          transforms: this.processTransforms(a.resolve(this.vars)),
        });
      } else if (arg instanceof GQLLimitArgument) {
        const a = arg as GQLLimitArgument;
        const limit = Some(parseInt(a.resolve(this.vars), 10));
        if (qa.offset.nonEmpty) {
          return qa.copy({ limit });
        } else {
          return qa.copy({ limit, offset: Some(0) });
        }
      } else if (arg instanceof GQLOffsetArgument) {
        const a = arg as GQLOffsetArgument;
        const offset = Some(parseInt(a.resolve(this.vars), 10));
        return qa.copy({ offset });
      } else if (arg instanceof GQLNameArgument) {
        const a = arg as GQLNameArgument;
        return qa.copy({ name: Some(a.resolve(this.vars)) });
      } else if (arg instanceof GQLIncludeDeprecatedArgument) {
        const a = arg as GQLIncludeDeprecatedArgument;
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
        Set(this.getPrefixes().keys())
      ),
      filterExpr
    ).get();
  }

  public processPatterns(
    patternsExpr: string,
    validFields: Map<string, string>
  ) {
    return Builder.parse<List<GQLPattern>>(
      new GQLPatternsBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys())
      ),
      patternsExpr
    ).get();
  }

  public processBindings(
    bindingsExpr: string,
    validFields: Map<string, string>
  ) {
    return Builder.parse<List<GQLBinding>>(
      new GQLBindingsBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys())
      ),
      bindingsExpr
    ).get();
  }

  public processBoosters(
    boostersExpr: string,
    validFields: Map<string, string>
  ) {
    return Builder.parse<List<GQLBooster>>(
      new GQLBoostersBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys())
      ),
      boostersExpr
    ).get();
  }

  public processOrder(orderExpr: string, validFields: Map<string, string>) {
    return Builder.parse<List<GQLOrderBy>>(
      new GQLOrderByBuilder(
        validFields,
        this.variables,
        this.vars,
        Set(this.getPrefixes().keys())
      ),
      orderExpr
    ).get();
  }

  public processTransforms(transformsExpr: string) {
    return Builder.parse<List<GQLTransform>>(
      new GQLTransformsBuilder(Set(this.getPrefixes().keys())),
      transformsExpr
    ).get();
  }

  public getSearchSubPlans(
    name: string,
    selections: List<GQLSelection>,
    objects: List<[string, GQLField]>
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
          f.args
        ).value;
      }
    );
    console.log(`subplans for ${name} = ${plans}`);
    return plans;
  }

  public getRootExecutionPlan(
    name: string,
    fields: List<[string, GQLField]>,
    selections: List<GQLSelection>
  ) {
    // console.log(`plan ${name}: partitioning fields ${JSON.stringify(fields, null, 2)}`);
    const [, objects, errors] = this.getSchema().partitionFields(fields);
    if (errors.size > 0) {
      console.error(`Errors in field partitioning: ${errors}`);
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
    args: List<GQLArgument>
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
            ])
          );
          return acc;
        }, []);

      console.log(
        `*** plan ${name} has fieldsFromFragment : ${fieldsFromFragment}`
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
            errors
          )
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
          errors
        )
      );
    }
  }

  public getRootPlan(
    name: string,
    selections: List<GQLSelection>,
    objects: List<[string, GQLField]>,
    errors: List<Error>
  ) {
    const mySubPlans = this.getSearchSubPlans(name, selections, objects);

    return new GQLRootExecutionPlan(
      Set<string>(),
      name,
      'key',
      mySubPlans,
      errors
    ); // TODO other fields?
  }

  public getSearchPlan(
    parentType: string,
    name: string,
    key: string,
    selections: List<GQLSelection>,
    args: List<GQLArgument>,
    fields: List<[string, GQLField]>,
    scalars: List<[string, GQLField]>,
    objects: List<[string, GQLField]>,
    errors: List<UnknownFieldException>
  ) {
    const queryFields: List<[string, GQLField]> = scalars;
    console.log(`queryFields for plan ${name} = ${queryFields}`);

    const fullProjectionOrder = fields
      .concat(objects)
      .map(([_, d]) => new NameAlias(d.alias.value || d.name, d.name));

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
    const hiddenIdFields = Map(
      objects
        .map(([t]) => t)
        .flatMap(t => this.getSchema().getImplementingTypes(t))
        .map<[string, List<GQLField>]>(it => [it, List([hiddenIdField])])
    );

    console.log(`getPlan ${name} hiddenIdFields = ${hiddenIdFields}`);

    const projectionsByType = hiddenIdFields.merge(
      queryFields
        .flatMap(([t, f]) => {
          const types = this.getSchema()
            .getImplementingTypes(t)
            .map<[string, GQLField]>(it => [it, f]);
          console.log(`implementing types of ${t} = ${types}`);
          return types;
        })
        .groupBy(([x]) => x)
        .map(v => v.map(w => w[1]).toList())
    );

    console.log(`getPlan ${name} hiddenIdFields = ${hiddenIdFields}`);
    console.log(`getPlan ${name} objects = ${objects}`);
    console.log(`getPlan ${name} projectionsByType = ${projectionsByType}`);

    const subjectTypes = projectionsByType.keySeq().toSet();

    const ptype = this.getSchema()
      .getFieldType(name)
      .getOrElse(parentType);

    const queryArgs = this.processArgs(
      args,
      this.getSchema().validFieldsForType(ptype)
    ); // TODO Add method to schema

    const fieldsPlanParentTypes = subjectTypes.filterNot(
      x => x.startsWith('O_xsd') // TODO: might need to change this?
    );

    const fieldsPlan = fieldsPlanParentTypes.isEmpty()
      ? List<GQLFieldsExecutionPlan>()
      : List<GQLFieldsExecutionPlan>([
          new GQLFieldsExecutionPlan(
            fieldsPlanParentTypes.toSet(),
            name,
            key,
            fullProjectionOrder,
            projectionsByType,
            // TODO: list of strategies
            RDFQueryService.createFieldsStrategyCreator(
              subjectTypes,
              projectionsByType,
              RDFQueryService.prefixes,
              this.getSchema()
            )
          ),
        ]);

    const subPlans = this.getSearchSubPlans(name, selections, objects).concat(
      fieldsPlan
    );

    const plan = new GQLSearchExecutionPlan({
      parentTypes: Set(parentType),
      name,
      key,
      subPlans,
      errors,
      projectionOrder: fullProjectionOrder,
      queryArguments: queryArgs,
      subjectTypes,
    });

    plan.copy({
      strategies: RDFQueryService.createSearchStrategyCreator(
        plan,
        this.getPrefixes().keys(),
        this.getSchema()
      ),
    });

    return plan;
  }

  public exitFullOperationDefinition(ctx: FullOperationDefinitionContext) {
    console.log('EXIT FULL OPERATION DEFINITION');
    const gqlOp = new GQLOperation({
      name: this.textOf(ctx.NAME()),
      operationType: ctx.operationType().text,
      variables: this.processVariableDefinitions(
        Option.of(ctx.variableDefinitions())
      ),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()),
    });
    console.log(gqlOp);
    this.operations.add(gqlOp);
    console.log('Operations in GQBuilder:', this.operations);
  }

  public processVariableDefinitions(
    ctxOpt: Option<VariableDefinitionsContext>
  ): List<GQLVariableDefinition> {
    return ctxOpt
      .map(vdc =>
        List(
          vdc.variableDefinition().map(vd => this.processVariableDefinition(vd))
        )
      )
      .getOrElse(List<GQLVariableDefinition>());
  }

  public processVariableDefinition(ctx: VariableDefinitionContext) {
    const vd = new GQLVariableDefinition(
      this.textOf(ctx.variable().NAME()),
      this.getType(ctx.type()),
      this.processDefaultValue(Option.of(ctx.defaultValue())),
      this.processDirectives(Option.of(ctx.directives()))
    );
    this.variables.add(vd);
    return vd;
  }

  public processVariable(ctx: VariableContext): GQLVariable {
    return new GQLVariable(this.textOf(ctx.NAME()));
  }

  public processDirectives(
    ctxOpt: Option<DirectivesContext>
  ): List<GQLDirective> {
    return ctxOpt
      .map(dcs => List(dcs.directive().map(dc => this.processDirective(dc))))
      .getOrElse(List<GQLDirective>());
  }

  public processDirective(ctx: DirectiveContext): GQLDirective {
    const name = this.textOf(ctx.NAME());
    // should pass this for validation: this.getSchema().getDirectiveDefinition(name);
    //                                +-----------------------------v
    const args = this.processArguments(Option.of(ctx.arguments()), None);
    return new GQLDirective(name, args);
  }

  public exitSelectionOnlyOperationDefinition(
    ctx: SelectionOnlyOperationDefinitionContext
  ): void {
    this.operations.add(
      new GQLOperation({
        name: '',
        operationType: 'query',
        variables: List<GQLVariableDefinition>(),
        directives: List<GQLDirective>(),
        selections: this.processSelectionSet(ctx.selectionSet()),
      })
    );
  }

  public exitFragmentDefinition(ctx: FragmentDefinitionContext): void {
    this.fragmentDefinitions = this.fragmentDefinitions.add(
      new GQLFragmentDefinition(
        this.textOf(ctx.fragmentName().NAME()),
        this.processTypeCondition(ctx.typeCondition()),
        this.processDirectives(Option.of(ctx.directives())),
        this.processSelectionSet(ctx.selectionSet())
      )
    );
  }

  public processTypeCondition(ctx: TypeConditionContext) {
    return this.textOf(ctx.namedType().NAME());
  }

  public processSelectionSet(ctx: SelectionSetContext): List<GQLSelection> {
    if (ctx) {
      return List(
        ctx.selection().map(sc => {
          switch (sc.constructor) {
            case FieldSelectionContext:
              return this.processField((sc as FieldSelectionContext).field());
            case InlineFragmentSelectionContext:
              return this.processInlineFragment(
                (sc as InlineFragmentSelectionContext).inlineFragment()
              );
            case FragmentSpreadSelectionContext:
              return this.processFragmentSpread(
                (sc as FragmentSpreadSelectionContext).fragmentSpread()
              );
          }
        })
      );
    } else {
      return List<GQLSelection>();
    }
  }

  public processField(ctx: FieldContext): GQLField {
    const alias = Option.of(ctx.alias()).map(a => this.textOf(a.NAME()));
    const name = this.textOf(ctx.NAME());
    const fdOpt = this.getSchema().getFieldDefinition(name);
    return new GQLField({
      name,
      alias,
      args: this.processArguments(Option.of(ctx.arguments()), fdOpt),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()),
    });
  }

  public processArguments(
    ctxOpt: Option<ArgumentsContext>,
    fdOpt: Option<GQLFieldDefinition>
  ): List<GQLArgument> {
    if (ctxOpt.nonEmpty()) {
      return List(ctxOpt.get().argument()).map(arg =>
        this.processArgument(arg, fdOpt)
      );
    } else {
      return List<GQLArgument>();
    }
  }

  public processArgument(
    ctx: ArgumentContext,
    typeDef: Option<GQLFieldDefinition | GQLDirectiveDefinition>
  ): GQLArgument {
    const name = this.textOf(ctx.NAME());
    const typeDefName = typeDef.map(d => d.name).getOrElse('unknown');
    const argDefOpt = typeDef.map(d => d.args.find(def => def.name === name));
    if (argDefOpt.isEmpty()) {
      this.check(
        false,
        `unknown argument '${name}' on ${typeDef.constructor.name
          .replace(/(GQL|Definition)/, '')
          .toLowerCase()} '${typeDefName}`,
        ctx
      );
      return new GQLInvalidArgument(name, new GQLStringValue('error'));
    } else {
      const expectedType = argDefOpt.get().gqlType.xsdType();
      const v = this.processValue(ctx.value());
      let typeOk = false;
      switch (v.constructor.name) {
        case 'GQLVariableValue':
          const hasVar = this.variables.find(
            a => a.name === (v as GQLVariableValue).value.name
          );
          if (hasVar) {
            typeOk = hasVar.gqlType.xsdType() === expectedType;
          }
          break;
        case 'GQLStringValue':
          typeOk = expectedType === 'xsd:string';
          break;
        case 'GQLIntValue':
          typeOk = expectedType === 'xsd:integer';
          break;
        case 'GQLFloatValue':
          typeOk = expectedType === 'xsd:float';
          break;
        case 'GQLBooleanValue':
          typeOk = expectedType === 'xsd:boolean';
          break;
        // todo: add more?
      }

      if (typeOk) {
        switch (name) {
          case ARG_TYPES.ARG_FILTER:
            return new GQLFilterArgument(name, v);
          case ARG_TYPES.ARG_ORDER:
            return new GQLOrderArgument(name, v);
          case ARG_TYPES.ARG_LIMIT:
            return new GQLLimitArgument(name, v);
          case ARG_TYPES.ARG_OFFSET:
            return new GQLOffsetArgument(name, v);
          case ARG_TYPES.ARG_TRANSFORMS:
            return new GQLTransformsArgument(name, v);
          case ARG_TYPES.ARG_PATTERNS:
            return new GQLPatternsArgument(name, v);
          case ARG_TYPES.ARG_BOOSTERS:
            return new GQLBoostersArgument(name, v);
          case ARG_TYPES.ARG_BINDINGS:
            return new GQLBindingsArgument(name, v);
          case ARG_TYPES.ARG_INCLUDE_DEPRECATED:
            return new GQLIncludeDeprecatedArgument(name, v);
          case ARG_TYPES.ARG_NAME:
            return new GQLNameArgument(name, v);
          default:
            return new GQLAnyArgument(name, v);
        }
      } else {
        return new GQLInvalidArgument(name, new GQLStringValue('error'));
      }
    }
  }

  public processInlineFragment(ctx: InlineFragmentContext): GQLInlineFragment {
    return new GQLInlineFragment(
      this.textOf(
        ctx
          .typeCondition()
          .namedType()
          .NAME()
      ),
      this.processSelectionSet(ctx.selectionSet()),
      this.processDirectives(Option.of(ctx.directives()))
    );
  }

  public processFragmentSpread(ctx: FragmentSpreadContext): GQLFragmentSpread {
    return new GQLFragmentSpread(
      this.textOf(ctx.fragmentName().NAME()),
      this.processDirectives(Option.of(ctx.directives()))
    );
  }
}
