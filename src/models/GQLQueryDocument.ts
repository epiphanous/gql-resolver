import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLOperation } from './GQLOperation';
import {
  GQLField,
  GQLFragmentSpread,
  GQLInlineFragment,
  GQLSelection,
} from './GQLSelection';
import ResolverContext from './ResolverContext';
import { GQLFragmentDefinition } from './GQLFragmentDefinition';

export class GQLQueryDocument {
  public operations: List<GQLOperation>;
  public fragmentDefinitions: Set<GQLFragmentDefinition>;
  public selectedOperation: GQLOperation;
  public plan: GQLExecutionPlan;
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

  public async execute(queryBuilder) {
    return await this.plan.execute(queryBuilder);
  }

  protected makeExecutionPlan() {
    const operation = this.operations.find(op => op.isSelected);
    if (Option.of(operation).isEmpty()) {
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

  protected withFlattenedSelections(operation: GQLOperation) {
    const outputTypeName = this.context.schema.operationTypes.get(
      operation.operationType
    );
    const operationOpt = this.context.schema
      .getTypeDefinition(outputTypeName)
      .map(td => {
        const [outputType, fields] = this.flattenSelections(
          td.name,
          operation.selections
        );
        return operation.copy({ outputType, fields });
      });
    if (operationOpt.isEmpty()) {
      throw new Error(`Can't find type ${outputTypeName}`);
    }
    return operationOpt.get();
  }

  protected flattenSelections(
    parentType: string,
    selections: List<GQLSelection>
  ): [string, List<GQLField>] {
    return [
      parentType,
      selections.flatMap(
        (s: GQLSelection) => this.flattenSelection(parentType, s)[1]
      ),
    ];
  }

  protected flattenSelection(parentType: string, selection: GQLSelection) {
    switch (selection.constructor) {
      case GQLField:
        const field = selection as GQLField;
        const typedFieldOpt = this.context.schema
          .getFieldType(field.name)
          .map<[string, List<GQLField>]>(ft => {
            const [outputType, fields] = this.flattenSelections(
              ft,
              field.selections
            );
            return [parentType, List([field.copy({ outputType, fields })])];
          });
        if (typedFieldOpt.isEmpty()) {
          throw new Error(`can't find field definition ${field.name}`);
        }
        return typedFieldOpt.get();

      case GQLInlineFragment:
        const frag = selection as GQLInlineFragment;
        const inlineFragOpt = this.context.schema
          .getFieldType(frag.typeCondition)
          .map(ft => this.flattenSelections(ft, frag.selections));
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
          .getFieldType(fragDef.typeCondition)
          .map(ft => this.flattenSelections(ft, fragDef.selections));
        if (fragOpt.isEmpty()) {
          throw new Error(
            `can't find fragment ${spread.name} type ${fragDef.typeCondition}`
          );
        }
        return fragOpt.get();
    }
  }
}
