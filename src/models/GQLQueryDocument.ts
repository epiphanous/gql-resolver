import { List, Map, Set } from 'immutable';
import {
  GQLExecutionPlan,
  GQLField,
  GQLFragmentDefinition,
  GQLFragmentSpread,
  GQLInlineFragment,
  GQLOperation,
  GQLSelection,
  QueryResult,
  ResolverContext,
} from '.';
import { GQLQueryBuilder } from '../builders/graphql';

export class GQLQueryDocument {
  public operations: List<GQLOperation>;
  public fragmentDefinitions: Set<GQLFragmentDefinition>;
  public selectedOperation!: GQLOperation | null;
  public plan!: GQLExecutionPlan;
  public context: ResolverContext;
  public vars: Map<string, any>;

  constructor(
    operations: List<GQLOperation>,
    fragmentDefinitions: Set<GQLFragmentDefinition>,
    context: ResolverContext,
    vars: Map<string, any>
  ) {
    this.operations = operations;
    this.fragmentDefinitions = fragmentDefinitions;
    this.context = context;
    this.vars = vars;
    this.makeExecutionPlan();
  }

  public async execute(queryBuilder: GQLQueryBuilder): Promise<QueryResult> {
    return await this.plan.execute(queryBuilder);
  }

  protected makeExecutionPlan() {
    const operation = this.operations.find(op => op.isSelected) as GQLOperation;
    if (!operation) {
      // shouldn't happen given checks in the query builder, but...
      throw new Error(
        'GQLQueryDocument initialized without a selected operation'
      );
    }
    this.selectedOperation = this.withFlattenedSelections(operation);
    this.plan = this.selectedOperation.getExecutionPlan(
      this.context,
      this.vars
    );
  }

  protected withFlattenedSelections(operation: GQLOperation): GQLOperation {
    const operationType: string = this.context.schema.operationTypes.get(
      operation.operationType,
      'Query'
    );
    const operationOpt = this.context.schema
      .getTypeDefinition(operationType)
      .map(td => {
        const fields: List<[string, GQLField]> = this.flattenSelections(
          td.name,
          operation.selections
        );
        const firstField = fields.get(0);
        if (!firstField) {
          // unlikely to happen
          throw new Error(
            `Operation type ${operationType} has no fields defined!`
          );
        } else {
          const outputType = firstField[0];
          return operation.copy({ fields, outputType });
        }
      });
    if (operationOpt.isEmpty()) {
      throw new Error(`Can't find operation type ${operationType}`);
    }
    return operationOpt.get()!;
  }

  protected flattenSelections(
    parentType: string,
    selections: List<GQLSelection>
  ): List<[string, GQLField]> {
    if (!selections.isEmpty()) {
      return selections.flatMap(s => this.flattenSelection(parentType, s));
    }
    return List<[string, GQLField]>();
  }

  protected flattenSelection(parentType: string, selection: GQLSelection) {
    switch (selection.constructor) {
      case GQLField:
        const field = selection as GQLField;
        const typedFieldOpt = this.context.schema
          .getFieldType(field.name)
          .map(ft => {
            const fields = this.flattenSelections(ft, field.selections);
            return List<[string, GQLField]>([
              [parentType, field.copy({ fields })],
            ]);
          });
        if (typedFieldOpt.isEmpty()) {
          throw new Error(`can't find field definition ${field.name}`);
        }
        return typedFieldOpt.get();

      case GQLInlineFragment:
        const frag = selection as GQLInlineFragment;
        const inlineFragOpt = this.context.schema
          // .getFieldType(frag.typeCondition)
          .getTypeDefinition(frag.typeCondition)
          .map(ft => this.flattenSelections(ft.name, frag.selections));
        if (inlineFragOpt.isEmpty()) {
          throw new Error(`can't find fragment type ${frag.typeCondition}`);
        }
        return inlineFragOpt.get();

      case GQLFragmentSpread:
        const spread = selection as GQLFragmentSpread;
        const fragDef = this.fragmentDefinitions.find(
          d => d.name === spread.name
        );
        if (!fragDef) {
          throw new Error(`can't find fragment definition ${spread.name}`);
        }
        const fragOpt = this.context.schema
          .getTypeDefinition(fragDef.typeCondition)
          .map(ft => this.flattenSelections(ft.name, fragDef.selections));
        if (fragOpt.isEmpty()) {
          throw new Error(
            `can't find fragment ${spread.name} type ${fragDef.typeCondition}`
          );
        }
        return fragOpt.get();
      default:
        return List<[string, GQLField]>();
    }
  }
}
