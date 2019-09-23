import { None, Option, Some, Try } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLDocumentBuilder, GQLFilterBuilder, GQLOrderBysBuilder } from '.';
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
  GQLValueType,
  GQLVariableDefinition,
  ResolverContext,
} from '../../models';
import { Builder } from '../Builder';
import { BuilderError } from '../BuilderError';

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
  public vars: Map<string, GQLValueType>;
  public operationName: Option<string>;
  // these collections are mutable
  public operations = List<GQLOperation>().asMutable();
  public fragmentDefinitions = Set<GQLFragmentDefinition>().asMutable();
  public variables = Set<GQLVariableDefinition>().asMutable();

  constructor(
    context: ResolverContext,
    vars: Map<string, GQLValueType>,
    operationName: Option<string> = None
  ) {
    super();
    this.context = context;
    this.schema = context.schema;
    this.vars = vars.asMutable();
    this.operationName = operationName;
  }

  public build(parser: GraphQLParser) {
    return Try.of(() => {
      this.parseWith(parser);

      // resolve default variables
      this.variables
        .filterNot(vd => vd.resolve(this.vars))
        .forEach(vd => {
          this.addError(
            new BuilderError(
              `no value provided for variable ${vd.name}`,
              1,
              1,
              None,
              true
            )
          );
        });

      if (this.errorCount > 0) {
        throw this.errors;
      }

      return new GQLQueryDocument(
        this.operations,
        this.fragmentDefinitions.asImmutable(),
        this.context,
        this.vars.asImmutable()
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
          filter: Some(
            this.processFilter(arg.resolve(this.vars) as string, allFields)
          ),
        });
      } else if (arg instanceof GQLOrderByArgument) {
        return qa.copy({
          orderBys: Some(
            this.processOrderBys(arg.resolve(this.vars) as string, allFields)
          ),
        });
      } else if (arg instanceof GQLAfterArgument) {
        const after = Option.of(arg.resolve(this.vars) as string | null);
        return qa.copy({ after });
      } else if (arg instanceof GQLBeforeArgument) {
        const before = Option.of(arg.resolve(this.vars) as string | null);
        return qa.copy({ before });
      } else if (arg instanceof GQLFirstArgument) {
        const first = Option.of(arg.resolve(this.vars) as number | null);
        return qa.copy({ first });
      } else if (arg instanceof GQLLastArgument) {
        const last = Option.of(arg.resolve(this.vars) as number | null);
        return qa.copy({ last });
      } else if (arg instanceof GQLNameArgument) {
        const name = Option.of(arg.resolve(this.vars) as string | null);
        return qa.copy({ name });
      } else if (arg instanceof GQLIncludeDeprecatedArgument) {
        const includeDeprecated = Option.of(arg.resolve(this.vars) as
          | boolean
          | null);
        return qa.copy({ includeDeprecated });
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
      new GQLOrderBysBuilder(validFields, this.variables, this.vars, orderExpr),
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
    typeDefOpt: Option<GQLFieldDefinition | GQLDirectiveDefinition>
  ): List<GQLArgument> {
    return ctxOpt
      .map(args =>
        List(args.argument().map(arg => this.getArgument(arg, typeDefOpt)))
      )
      .getOrElse(List<GQLArgument>());
  }

  public getArgument(
    ctx: ArgumentContext,
    typeDefOpt: Option<GQLFieldDefinition | GQLDirectiveDefinition>
  ): GQLArgument {
    const name = this.textOf(ctx.NAME());
    const badArg = new GQLInvalidArgument(name, 'error');
    return typeDefOpt
      .map(typeDef => {
        return Option.of(typeDef.args.find(arg => arg.name === name))
          .map(ad => {
            const expectedType = ad.gqlType.xsdType();
            const isList = ad.gqlType.isList;
            const isReq = ad.gqlType.isRequired;
            const argValue = this.processValue(ctx.value());
            const argType = typeof argValue;
            const errMessage = (actualType: string = argType) =>
              Some(
                `[${name}] expected argument type ${expectedType} , got ${actualType}`
              );
            const typeOK = (() => {
              if (argType === 'string') {
                if (/^\$[_A-Za-z][_0-9A-Za-z]*$/.test(argValue as string)) {
                  return None;
                } else {
                  return expectedType === 'xsd:string' ? None : errMessage();
                }
              } else if (argType === 'number') {
                return List([
                  'xsd:decimal',
                  'xsd:integer',
                  'xsd:float',
                ]).contains(expectedType)
                  ? None
                  : errMessage();
              } else if (argType === 'boolean') {
                return expectedType === 'xsd:boolean' ? None : errMessage();
              } else if (argValue instanceof List) {
                return isList ? None : errMessage('list');
              } else if (argValue instanceof Map) {
                return List(['string', 'number', 'boolean']).contains(
                  expectedType
                ) || isList
                  ? errMessage('object')
                  : None;
              } else if (argValue == null) {
                return isReq ? errMessage('null') : None;
              }
            })()
              .map(errMsg => {
                this.check(false, errMsg, ctx, true);
                return false;
              })
              .getOrElse(true);

            if (typeOK) {
              switch (name) {
                case ARG_TYPES.ARG_FILTER:
                  return new GQLFilterArgument(name, argValue);
                case ARG_TYPES.ARG_SORT_BY:
                  return new GQLOrderByArgument(name, argValue);
                case ARG_TYPES.ARG_FIRST:
                  return new GQLFirstArgument(name, argValue);
                case ARG_TYPES.ARG_LAST:
                  return new GQLLastArgument(name, argValue);
                case ARG_TYPES.ARG_BEFORE:
                  return new GQLBeforeArgument(name, argValue);
                case ARG_TYPES.ARG_AFTER:
                  return new GQLAfterArgument(name, argValue);
                case ARG_TYPES.ARG_INCLUDE_DEPRECATED:
                  return new GQLIncludeDeprecatedArgument(name, argValue);
                case ARG_TYPES.ARG_NAME:
                  return new GQLNameArgument(name, argValue);
                default:
                  return new GQLAnyArgument(name, argValue);
              }
            } else {
              return badArg;
            }
          })
          .getOrElse(badArg);
      })
      .getOrElse(badArg);
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
