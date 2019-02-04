import { NotImplementedError } from 'funfix';
import { List, Set, Map } from 'immutable';
import { GQLSchema } from './GQLSchema';
// import { GQLSearchExecutionPlan } from './GQLSearchExecutionPlan';
import { GQLExecutionPlan } from './GQLExecutionPlan';
import { GQLField } from './GQLSelection';
import QueryStrategy from './QueryStrategy';
import { RDFPrefixes } from './RDFPrefixes';

export class RDFQueryService {
  public static createSearchStrategyCreator(
    plan: GQLExecutionPlan,
    prefixes: RDFPrefixes,
    schema: GQLSchema
  ): (parentIRIs: List<string>) => List<QueryStrategy> {
    throw new NotImplementedError('not implemented');
  }

  public static createFieldsStrategyCreator(
    subjectTypes: Set<string>,
    projectionsByType: Map<string, List<GQLField>>,
    prefixes: RDFPrefixes,
    schema: GQLSchema
  ): (subjectIRIs: List<string>) => List<QueryStrategy> {
    throw new NotImplementedError('not implemented');
  }
}
