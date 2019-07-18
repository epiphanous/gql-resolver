import { None, Option, Some, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import {
  ArgumentContext,
  ArgumentsContext,
  DirectiveContext,
  DirectivesContext,
  DocumentContext,
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
import { DEFAULT_PREFIXES } from '../../models/Constants';
import { GQLAny } from '../../models/GQLAny';
import {
  GQLAfterArgument,
  GQLAnyArgument,
  GQLArgument,
  GQLBeforeArgument,
  GQLBindingsArgument,
  GQLBoostersArgument,
  GQLFilterArgument,
  GQLFirstArgument,
  GQLIncludeDeprecatedArgument,
  GQLInvalidArgument,
  GQLLastArgument,
  GQLNameArgument,
  GQLPatternsArgument,
  GQLSortByArgument,
  GQLTransformsArgument,
} from '../../models/GQLArgument';
import { GQLBinding } from '../../models/GQLBinding';
import { GQLBooster } from '../../models/GQLBooster';
import { GQLDirective } from '../../models/GQLDirective';
import { GQLFilter } from '../../models/GQLFilter';
import { GQLFragmentDefinition } from '../../models/GQLFragmentDefinition';
import { GQLOperation } from '../../models/GQLOperation';
import { GQLSortBy } from '../../models/GQLSortBy';
import { GQLPattern } from '../../models/GQLPattern';
import { GQLQueryArguments } from '../../models/GQLQueryArguments';
import { GQLQueryDocument } from '../../models/GQLQueryDocument';
import { GQLSchema } from '../../models/GQLSchema';
// import { GQLRootExecutionPlan } from '../../models/GQLRootExecutionPlan';
// import { GQLSearchExecutionPlan } from '../../models/GQLSearchExecutionPlan';
import {
  GQLField,
  GQLFragmentSpread,
  GQLInlineFragment,
  GQLSelection,
} from '../../models/GQLSelection';
import { GQLTransform } from '../../models/GQLTransform';
import {
  GQLDirectiveDefinition,
  GQLFieldDefinition,
  GQLInputType,
} from '../../models/GQLTypeDefinition';
import { GQLStringValue, GQLVariableValue } from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { ResolverContext } from '../../models/ResolverContext';
import { Builder } from '../Builder';
import { GQLBindingsBuilder } from './GQLBindingsBuilder';
import { GQLBoostersBuilder } from './GQLBoostersBuilder';
import { GQLDocumentBuilder } from './GQLDocumentBuilder';
import { GQLFilterBuilder } from './GQLFilterBuilder';
import { GQLOrderByBuilder } from './GQLOrderByBuilder';
import { GQLPatternsBuilder } from './GQLPatternsBuilder';
import { GQLTransformsBuilder } from './GQLTransformsBuilder';

const ARG_TYPES = {
  ARG_BINDINGS: 'bindings',
  ARG_BOOSTERS: 'boosters',
  ARG_FILTER: 'filter',
  ARG_INCLUDE_DEPRECATED: 'includeDeprecated',
  ARG_FIRST: 'first',
  ARG_LAST: 'last',
  ARG_NAME: 'name',
  ARG_BEFORE: 'before',
  ARG_AFTER: 'after',
  ARG_SORT_BY: 'sortBy',
  ARG_PATTERNS: 'patterns',
  ARG_TRANSFORMS: 'transforms',
};

export class GQLQueryBuilder extends GQLDocumentBuilder<GQLQueryDocument> {
  public schema: GQLSchema;
  public context: ResolverContext;
  public vars: Map<string, any>;
  public operationName: Option<string>;
  // these collections are mutable
  public operations = List<GQLOperation>().asMutable();
  public fragmentDefinitions = Set<GQLFragmentDefinition>().asMutable();
  public variables = Set<GQLVariableDefinition>().asMutable();

  constructor(
    context: ResolverContext,
    vars: Map<string, any> = Map<string, any>(),
    operationName: Option<string> = None
  ) {
    super();
    this.context = context;
    this.schema = context.schema;
    this.vars = vars.asMutable();
    this.operationName = operationName;
  }

  public getPrefixes() {
    return DEFAULT_PREFIXES;
  }

  public build(parser: GraphQLParser) {
    return Try.of(() => {
      this.parseWith(parser);

      if (this.errorCount > 0) {
        throw this.errorReport.asThrowable();
      }

      if (this.warningCount > 0) {
        this.errors.forEach(w => console.warn(w));
      }

      return new GQLQueryDocument(
        this.operations,
        this.fragmentDefinitions.asImmutable(),
        this.context,
        this.vars
      );
    });
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
      } else if (arg instanceof GQLSortByArgument) {
        const a = arg as GQLSortByArgument;
        return qa.copy({
          sortBy: this.processOrder(a.resolve(this.vars), allFields),
        });
      } else if (arg instanceof GQLTransformsArgument) {
        const a = arg as GQLTransformsArgument;
        return qa.copy({
          transforms: this.processTransforms(a.resolve(this.vars)),
        });
      } else if (arg instanceof GQLAfterArgument) {
        const a = arg as GQLAfterArgument;
        const after = Some(a.resolve(this.vars));
        return qa.copy({ after });
      } else if (arg instanceof GQLBeforeArgument) {
        const a = arg as GQLBeforeArgument;
        const before = Some(a.resolve(this.vars));
        return qa.copy({ before });
      } else if (arg instanceof GQLFirstArgument) {
        const a = arg as GQLFirstArgument;
        const first = Some(parseInt(a.resolve(this.vars), 10));
        return qa.copy({ first });
      } else if (arg instanceof GQLLastArgument) {
        const a = arg as GQLFirstArgument;
        const last = Some(parseInt(a.resolve(this.vars), 10));
        return qa.copy({ last });
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
    // For cases where we have nested str identifiers in the GQL query but need to pass onto other builders
    console.log('filter expression', filterExpr);
    const builtFilter = new GQLFilterBuilder(
      validFields,
      this.variables,
      this.vars,
      Set(this.getPrefixes().keys()),
      filterExpr
    );
    console.log('variables', this.variables.toJSON());
    console.log('builtFilter', builtFilter);
    // const exprWithoutDoubleEscape = filterExpr.replace(/\\/g, '');
    return Builder.parse<GQLFilter>(
      builtFilter,
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
    return Builder.parse<List<GQLSortBy>>(
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

  public exitDocument(ctx: DocumentContext) {
    const numOps = this.operations.size;
    let selectedOp: Option<GQLOperation> = None;
    if (
      this.check(
        numOps > 0,
        'no executable operations found in query',
        ctx,
        true
      ) &&
      this.check(
        numOps === 1 || (numOps > 1 && this.operationName.nonEmpty()),
        'query has multiple executable operations but no operation name was provided',
        ctx,
        true
      ) &&
      this.operationName
        .map(opName => {
          selectedOp = Option.of(this.operations.find(o => o.name === opName));
          return this.check(
            selectedOp.nonEmpty(),
            `operation with requested name ${opName} not found in query`,
            ctx,
            true
          );
        })
        .getOrElse(true)
    ) {
      if (selectedOp.isEmpty()) {
        selectedOp = Option.of(this.operations.first());
      }
      selectedOp.map(op => op.select());
    }
  }

  public exitFullOperationDefinition(ctx: FullOperationDefinitionContext) {
    const operation = new GQLOperation({
      name: this.textOf(ctx.NAME()!),
      operationType: ctx.operationType().text,
      variables: this.processVariableDefinitions(
        Option.of(ctx.variableDefinitions())
      ),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()),
    });
    const unresolved = operation.findUnresolvedVariables(this.vars);
    this.check(
      unresolved.isEmpty(),
      `variable${unresolved.size > 1 ? 's' : ''} ${unresolved
        .map(u => u.name)
        .join(', ')} ${
        unresolved.size > 1 ? 'have no values' : 'has no value'
      } provided`,
      ctx,
      true
    );
    this.operations.push(operation);
  }

  public exitSelectionOnlyOperationDefinition(
    ctx: SelectionOnlyOperationDefinitionContext
  ): void {
    this.operations.push(
      new GQLOperation({
        name: '',
        operationType: 'query',
        variables: List<GQLVariableDefinition>(),
        directives: List<GQLDirective>(),
        selections: this.processSelectionSet(ctx.selectionSet()),
      })
    );
  }

  public processVariableDefinitions(
    ctxOpt: Option<VariableDefinitionsContext>
  ) {
    return ctxOpt
      .map(vdc =>
        List(vdc.variableDefinition()).map(vd =>
          this.processVariableDefinition(vd)
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
            default:
              throw new Error('Unsupported context' + sc.constructor);
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
    const fdOpt = this.schema.getFieldDefinition(name);
    return new GQLField({
      name,
      alias,
      args: this.getArguments(Option.of(ctx.arguments()), fdOpt),
      directives: this.processDirectives(Option.of(ctx.directives())),
      selections: this.processSelectionSet(ctx.selectionSet()!),
    });
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
    const typeDefOpt = this.schema.getDirectiveDefinition(name);
    const args = this.getArguments(Option.of(ctx.arguments()), typeDefOpt);
    return new GQLDirective(name, args);
  }

  public getArguments(
    ctxOpt: Option<ArgumentsContext>,
    typeDefOpt: Option<
      GQLFieldDefinition | GQLDirectiveDefinition | GQLInputType
    >
  ): List<GQLArgument> {
    return ctxOpt
      .map(args =>
        List(args.argument().map(arg => this.getArgument(arg, typeDefOpt)))
      )
      .getOrElse(List<GQLArgument>());
  }

  public getArgument(
    ctx: ArgumentContext,
    typeDef: Option<GQLFieldDefinition | GQLDirectiveDefinition | GQLInputType>
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
      const argDef = argDefOpt.get();
      const expectedType = argDef!.gqlType.name;
      const v = this.processValue(ctx.value());
      let typeOk = false;
      switch (v.constructor.name) {
        case 'GQLVariableValue':
          const hasVar = this.variables.find(
            a => a.name === (v as GQLVariableValue).value.name
          );
          if (hasVar) {
            typeOk = hasVar.gqlType.name === expectedType;
          }
          break;
        case 'GQLStringValue':
          typeOk = expectedType === 'String';
          break;
        case 'GQLIntValue':
          typeOk = expectedType === 'Int';
          break;
        case 'GQLFloatValue':
          typeOk = expectedType === 'Float';
          break;
        case 'GQLBooleanValue':
          typeOk = expectedType === 'Boolean';
          break;
        default:
          typeOk = this.schema.inputTypes
            .keySeq()
            .includes(expectedType);
          break;
        // todo: add more?
      }

      if (typeOk) {
        switch (name) {
          case ARG_TYPES.ARG_FILTER:
            return new GQLFilterArgument(name, v);
          case ARG_TYPES.ARG_SORT_BY:
            return new GQLSortByArgument(name, v);
          case ARG_TYPES.ARG_FIRST:
            return new GQLFirstArgument(name, v);
          case ARG_TYPES.ARG_LAST:
            return new GQLLastArgument(name, v);
          case ARG_TYPES.ARG_BEFORE:
            return new GQLBeforeArgument(name, v);
          case ARG_TYPES.ARG_AFTER:
            return new GQLAfterArgument(name, v);
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
          .typeCondition()!
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
