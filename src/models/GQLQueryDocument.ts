import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLFragmentDefinition } from './GQLFragmentDefinition';
import { GQLOperation } from './GQLOperation';
import {
  GQLField,
  GQLFragmentSpread,
  GQLInlineFragment,
  GQLSelection,
} from './GQLSelection';
import { ResolverContext } from './ResolverContext';
import {GQLQueryBuilder} from '../builders/graphql/GQLQueryBuilder';

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

  public async execute(queryBuilder: GQLQueryBuilder) {
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
    this.selectedOperation = this.withFlattenedSelections(Option.of(operation));
    this.plan = this.selectedOperation.getExecutionPlan(
      this.context,
      this.vars
    );
  }

  protected withFlattenedSelections(operation: Option<GQLOperation>) {
    if (operation.nonEmpty()) {
      const operationVal = operation.get();
      const outputTypeName = this.context.schema.operationTypes.get(
        operationVal.operationType,
        'query'
      );
      const operationOpt = this.context.schema
        .getTypeDefinition(outputTypeName)
        .map(td => {
          const fields: List<[string, GQLField]> = this.flattenSelections(
            td.name,
            operationVal.selections
          );
          const firstField = fields.get(0);
          if (!firstField) {
            throw new Error('No field accessible!');
          } else {
            const outputType = firstField[0];
            return operationVal.copy({ fields, outputType });
          }
        });
      if (operationOpt.isEmpty()) {
        throw new Error(`Can't find type ${outputTypeName}`);
      }
      return operationOpt.get();
    }
    throw new Error(`Op doesn't exist: ${operation}`);
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
