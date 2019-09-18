import { None, Option, Some, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLDocumentBuilder, GQLFilterBuilder, GQLOrdersByBuilder } from '.';
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
  VariableDefinitionContext,
  VariableDefinitionsContext,
} from '../../antlr4';
import {
  DEFAULT_PREFIXES,
  GQLAfterArgument,
  GQLAny,
  GQLAnyArgument,
  GQLArgument,
  GQLBeforeArgument,
  GQLDirective,
  GQLDirectiveDefinition,
  GQLField,
  GQLFieldDefinition,
  GQLFilter,
  GQLFilterArgument,
  GQLFirstArgument,
  GQLFragmentDefinition,
  GQLFragmentSpread,
  GQLIncludeDeprecatedArgument,
  GQLInlineFragment,
  GQLInputType,
  GQLInvalidArgument,
  GQLLastArgument,
  GQLNameArgument,
  GQLOperation,
  GQLOperationType,
  GQLOrderByArgument,
  GQLOrderBys,
  GQLQueryArguments,
  GQLQueryDocument,
  GQLSchema,
  GQLSelection,
  GQLStringValue,
  GQLVariableDefinition,
  GQLVariableValue,
  ResolverContext,
} from '../../models';
import { Builder } from '../Builder';

const ARG_TYPES = {
  ARG_FILTER: 'filter',
  ARG_INCLUDE_DEPRECATED: 'includeDeprecated',
  ARG_FIRST: 'first',
  ARG_LAST: 'last',
  ARG_NAME: 'name',
  ARG_BEFORE: 'before',
  ARG_AFTER: 'after',
  ARG_SORT_BY: 'sortBy',
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
        throw this.errors;
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
    allFields: List<GQLFieldDefinition>
  ): GQLQueryArguments {
    return args.reduce<GQLQueryArguments>((qa, arg) => {
      if (arg instanceof GQLAnyArgument) {
        return qa.copy({
          any: qa.any.push(
            new GQLAny(arg.name, Option.of(arg.resolve(this.vars)))
          ),
        });
      } else if (arg instanceof GQLFilterArgument) {
        return qa.copy({
          filter: Some(this.processFilter(arg.resolve(this.vars), allFields)),
        });
      } else if (arg instanceof GQLOrderByArgument) {
        return qa.copy({
          orderBys: Some(
            this.processOrderBys(arg.resolve(this.vars), allFields)
          ),
        });
      } else if (arg instanceof GQLAfterArgument) {
        const after = Some(arg.resolve(this.vars));
        return qa.copy({ after });
      } else if (arg instanceof GQLBeforeArgument) {
        const before = Some(arg.resolve(this.vars));
        return qa.copy({ before });
      } else if (arg instanceof GQLFirstArgument) {
        const first = Some(parseInt(arg.resolve(this.vars), 10));
        return qa.copy({ first });
      } else if (arg instanceof GQLLastArgument) {
        const last = Some(parseInt(arg.resolve(this.vars), 10));
        return qa.copy({ last });
      } else if (arg instanceof GQLNameArgument) {
        return qa.copy({ name: Some(arg.resolve(this.vars)) });
      } else if (arg instanceof GQLIncludeDeprecatedArgument) {
        const b = /^(1|t|true)$/.test(arg.resolve(this.vars).toLowerCase());
        return qa.copy({ includeDeprecated: Some(b) });
      } else {
        return qa;
      }
    }, new GQLQueryArguments());
  }

  public processFilter(
    filterExpr: string,
    validFields: List<GQLFieldDefinition>
  ): GQLFilter {
    return Builder.parse<GQLFilter>(
      new GQLFilterBuilder(validFields, this.variables, this.vars, filterExpr),
      filterExpr
    ).get();
  }

  public processOrderBys(
    orderExpr: string,
    validFields: List<GQLFieldDefinition>
  ): GQLOrderBys {
    return Builder.parse<GQLOrderBys>(
      new GQLOrdersByBuilder(validFields, this.variables, this.vars, orderExpr),
      orderExpr
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
        selectedOp = Option.of(this.operations.first() as GQLOperation);
      }
      selectedOp.map(op => op.select());
    }
  }

  public exitFullOperationDefinition(ctx: FullOperationDefinitionContext) {
    const operation = new GQLOperation({
      name: this.textOf(ctx.NAME()!),
      operationType: ctx.operationType().text as GQLOperationType,
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

  // public processVariable(ctx: VariableContext): GQLVariable {
  //   return new GQLVariable(this.textOf(ctx.NAME()));
  // }

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
          typeOk = this.schema.inputTypes.keySeq().includes(expectedType);
          break;
        // todo: add more?
      }

      if (typeOk) {
        switch (name) {
          case ARG_TYPES.ARG_FILTER:
            return new GQLFilterArgument(name, v);
          case ARG_TYPES.ARG_SORT_BY:
            return new GQLOrderByArgument(name, v);
          case ARG_TYPES.ARG_FIRST:
            return new GQLFirstArgument(name, v);
          case ARG_TYPES.ARG_LAST:
            return new GQLLastArgument(name, v);
          case ARG_TYPES.ARG_BEFORE:
            return new GQLBeforeArgument(name, v);
          case ARG_TYPES.ARG_AFTER:
            return new GQLAfterArgument(name, v);
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
