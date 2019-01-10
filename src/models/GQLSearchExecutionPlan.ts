import Record from 'dataclass';
import { Option } from 'funfix';
import { List, Map, OrderedMap, Set } from 'immutable';
import { sortMapByProjectionOrder } from '../utils/MapSorter';
import {
  DEFAULT_PREFIXES,
  PARENT_BINDING,
  SUBJECT_BINDING,
  TYPENAME_BINDING,
} from './Constants';
import { GQLExecutionPlan, IGQLExecutionPlan } from './GQLExecutionPlan';
import { GQLQueryArguments } from './GQLQueryArguments';
import AliasAndName from './NameAndAlias';
import { QueryStrategy } from './QueryStrategy';

interface IGQLSearchExecutionPlan extends IGQLExecutionPlan {
  projectionOrder: List<AliasAndName>;
  queryArguments: GQLQueryArguments;
  subjectTypes: List<string>;
  strategies: (slist: List<string>) => List<QueryStrategy>;
}

export class GQLSearchExecutionPlan extends GQLExecutionPlan
  implements IGQLSearchExecutionPlan {
  public projectionOrder: List<AliasAndName>;
  public queryArguments: GQLQueryArguments;
  public subjectTypes: List<string>;
  public strategies: (slist: List<string>) => List<QueryStrategy> = null;

  constructor(data: Partial<IGQLSearchExecutionPlan> = {}) {
    super(data.parentTypes, data.name, data.key, data.subPlans, data.errors);
    this.projectionOrder = data.projectionOrder;
    this.queryArguments = data.queryArguments;
    this.subjectTypes = data.subjectTypes;
  }

  public hasLimits() {
    return !this.queryArguments.limit.isEmpty();
  }

  public copy(fields: Partial<IGQLSearchExecutionPlan>) {
    return new GQLSearchExecutionPlan({ ...(this as object), ...fields });
  }

  public execute(
    parentIris: List<string>,
    executor: (strategy: QueryStrategy) => List<Map<string, any>>
  ): OrderedMap<string, List<OrderedMap<string, any>>> {
    const topType = 'Query';

    class IRIAndType extends Record<IRIAndType> {
      public iri: string;
      public iriType: string;
    }

    class MaybeParentAndSubject extends Record<MaybeParentAndSubject> {
      public parent: Option<string>;
      public subject: string;
    }

    const results: List<Map<string, any>> = this.strategies(parentIris).flatMap(
      strat => executor(strat)
    );
    // TODO: merge outputs from multiple strategies

    const parentIdsToSubjectIdsMap = results
      .map(
        bindings =>
          new MaybeParentAndSubject({
            parent: Option.of(bindings.get(PARENT_BINDING).toString()),
            subject: bindings.get(SUBJECT_BINDING).toString(),
          })
      )
      .filterNot(ps => ps.parent.isEmpty())
      .map(ps => [ps.parent.get(), ps.subject])
      .groupBy(([parent]) => parent)
      .map((subjects, parent) => [
        parent,
        subjects
          .flatten()
          .toSet()
          .toList(),
      ])
      .toMap();

    // assume every result has subject and typename fields
    const subjectIds: List<IRIAndType> = results.map(
      r =>
        new IRIAndType({
          iri: r.get(SUBJECT_BINDING),
          iriType: r.get(TYPENAME_BINDING),
        })
    );

    const subPlanData: List<
      OrderedMap<string, List<OrderedMap<string, any>>>
    > = this.subPlans.map((child: GQLExecutionPlan) => {
      const subjectIdsOfType = subjectIds
        .filter(c => child.parentTypes.contains(c.iriType))
        .map(c => c.iri);

      if (subjectIdsOfType.isEmpty()) {
        return OrderedMap<string, List<OrderedMap<string, any>>>();
      } else {
        const childFields: OrderedMap<
          string,
          List<OrderedMap<string, any>>
        > = child.execute(subjectIdsOfType, executor);
        return childFields;
      }
    });

    const merged: List<any> = this.mergedSubjects(
      subjectIds.map(s => s.iri),
      subPlanData,
      this.key
    );

    const subjectsById: Map<string, OrderedMap<string, any>> = Map<any>(
      merged.map(x => [x.get(SUBJECT_BINDING), x])
    );

    let ordered: OrderedMap<any, any>;
    if (this.parentTypes === Set(topType)) {
      ordered = OrderedMap([[[this.key], merged]]);
    } else {
      const reGroupedByParent: List<
        OrderedMap<string, any>
      > = this.regroupByParent(
        parentIris,
        this.key,
        parentIdsToSubjectIdsMap,
        subjectsById
      );

      ordered = OrderedMap([[this.key], reGroupedByParent]);
    }

    return ordered;
  }

  public regroupByParent(
    parentIri: List<string>,
    key: string,
    parentIdsToSubjectIdsMap: Map<string, Array<string | List<string>>>,
    merged: Map<string, OrderedMap<string, any>>
  ): List<OrderedMap<string, any>> {
    return parentIri.map(parentId => {
      const followees = List(parentIdsToSubjectIdsMap.get(parentId)) || List();
      return OrderedMap({
        [SUBJECT_BINDING]: parentId,
        [key]: followees.map((id: string) => merged.get(id) || id),
      });
    });
  }

  public flattened(
    data: List<OrderedMap<string, List<OrderedMap<string, any>>>>
  ): List<OrderedMap<string, any>> {
    return data.flatMap(
      (x: OrderedMap<string, List<OrderedMap<string, any>>>) => {
        return x
          .toList()
          .reduce<List<OrderedMap<string, any>>>((acc, value) =>
            acc.merge(value)
          );
      }
    );
  }

  public combineMaps(maps: List<Map<string, any>>): Map<string, any> {
    return maps.reduce<Map<string, any>>((acc, value) => acc.merge(value));
  }

  public mergedSubjects(
    subjects: List<string>,
    data: List<OrderedMap<string, List<OrderedMap<string, any>>>>,
    key: string
  ): List<OrderedMap<string, any>> {
    const dataBySubject: Map<string, OrderedMap<string, any>> = this.flattened(
      data
    )
      .groupBy(m => m.get(SUBJECT_BINDING.toString()))
      .map(value => value.toList())
      .map(maps => {
        const unsortedCombined = this.combineMaps(maps);
        return sortMapByProjectionOrder(
          unsortedCombined,
          this.projectionOrder.map(an => an.alias)
        );
      })
      .toMap();

    return subjects.map(s => dataBySubject.get(s));
  }
}
