import {Option} from 'funfix-core';
import {List, Map, OrderedMap} from 'immutable';
import {sortMapByProjectionOrder} from '../utils/MapSorter';
import {AliasAndName} from './AliasAndName';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {GQLField} from './GQLField';
import {QueryStrategy} from './QueryStrategy';
import {INTERNAL_PREFIX, SUBJECT_BINDING, TYPENAME_BINDING} from './Constants';

export class GQLFieldsExecutionPlan extends GQLExecutionPlan {
    public projectionOrder: List<AliasAndName> = List<AliasAndName>();
    public projectionsByType: Map<string, List<GQLField>> = Map<string,
        List<GQLField>>();
    public strategies: (slist: List<string>) => List<QueryStrategy> = null;

    /**
     * Convert a list of maps into a map of lists, maintaining order of the list data.
     *
     * @param maps a list of maps from string to option(any)
     * @return a map from string to list(any)
     */
    public combineMaps(maps: List<Map<string, any>>): Map<string, List<any>> {
        const keys = maps.first(Map<any>({})).keySeq();
        return Map(
            keys
                .map<[string, List<any>]>((key) => {
                    const list = maps
                        .flatMap<any>((map) => map.get(key))
                        .toSet()
                        .toList();
                    return [key, list];
                })
                .toArray(),
        );
    }

    public execute(
        subjectIris: List<string>,
        executor: (strategy: QueryStrategy) => List<Map<string, any>>,
    ): OrderedMap<string, List<OrderedMap<string, any>>> {
        // parentIris is the list of subjects to return data for

        const results: List<OrderedMap<string, any>> = this.strategies(subjectIris)
            .flatMap((strat) => executor(strat))
            .groupBy((map) => map.get(SUBJECT_BINDING))
            .valueSeq()
            .map((listOfMaps: List<Map<string, any>>) => {
                const mapOfLists: Map<string, List<any>> = this.combineMaps(listOfMaps);
                const specialFields: Map<string, List<any>> = Map([
                    [
                        BINDINGS.get('id'),
                        Option.of(mapOfLists.get(SUBJECT_BINDING)).getOrElse(
                            List<any>(),
                        ),
                    ],
                    [
                        TYPENAME_BINDING,
                        Option.of(
                            mapOfLists.get(TYPENAME_BINDING),
                        ).getOrElse(List<any>()),
                    ],
                ]).map((x) => RDFPrefixes.iriWithNameToPrefixedString(x.toString));

                const mapOfListsWithSpecialFields: Map<string,
                    List<any>> = mapOfLists.concat(specialFields);

                const unsorted: Map<string,
                    any> = mapOfListsWithSpecialFields
                    .filterNot((v) => v.isEmpty())
                    .map((v, k) =>
                        RDFQueryService.shouldHaveOnlyOne(k) ? [k, v.first()] : [k, v],
                    );

                const unsortedAliased: Map<string, any> = this.projectionOrder.reduce<Map<string, any>>((acc: Map<string, any>, an: AliasAndName) => {
                    if (unsorted.has(an.name)) {
                        acc.set(an.alias, unsorted.get(an.name));
                    }
                    return acc;
                }, unsorted.filter((kv) => kv._1.startsWith(INTERNAL_PREFIX)));

                const sorted = sortMapByProjectionOrder(
                    unsortedAliased,
                    this.projectionOrder.map((p) => p.alias),
                );
                return sorted;
            })
            .toList();

        return OrderedMap([[this.key, results]]);
    }
}
