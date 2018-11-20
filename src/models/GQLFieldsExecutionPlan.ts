import {Option} from 'funfix';
import {List, Map, OrderedMap, Set} from 'immutable';
import * as _ from 'lodash';
import {sortMapByProjectionOrder} from '../utils/MapSorter';
import {DEFAULT_PREFIXES, ID_BINDING, INTERNAL_PREFIX, SUBJECT_BINDING, TYPENAME_BINDING} from './Constants';
import {GQLExecutionPlan} from './GQLExecutionPlan';
import {GQLField} from './GQLSelection';
import AliasAndName from './NameAndAlias';
import {QueryStrategy} from './QueryStrategy';

export class GQLFieldsExecutionPlan extends GQLExecutionPlan {
    public projectionOrder: List<AliasAndName> = List<AliasAndName>();
    public projectionsByType: Map<string, List<GQLField>> = Map<string,
        List<GQLField>>();
    public strategies: (slist: List<string>) => List<QueryStrategy> = null;
    public nameToPrefix = Map(_.invert(DEFAULT_PREFIXES.toObject()));

    constructor(
        parentTypes: Set<string>,
        name: string,
        key: string,
        subPlans: List<GQLExecutionPlan> = List(),
        errors: List<Error> = List(),
        projectionOrder: List<AliasAndName> = List<AliasAndName>(),
        projectionsByType: Map<string, List<GQLField>> = Map<string, List<GQLField>>()
    ) {
        super(parentTypes, name, key, subPlans, errors);
        this.projectionOrder = projectionOrder;
        this.projectionsByType = projectionsByType;
    }

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


    public shouldHaveOnlyOne(key: string) {
        return Set([ID_BINDING, TYPENAME_BINDING])
                .contains(key) || key.startsWith(INTERNAL_PREFIX);
    }

    public iriWithNameToPrefixedString(iri: string) {
        const keys = this.nameToPrefix.keySeq().toArray();
        const name = keys.find(nameToFind => iri.startsWith(nameToFind));
        return iri.replace(name, this.nameToPrefix.get(name) + '_') || iri;
    }
    public execute(
        subjectIris: List<string>,
        executor: (strategy: QueryStrategy) => List<Map<string, any>>,
    ): OrderedMap<string, any> { // TODO: swap back to List<OrderedMap<...>> if needed
        // parentIris is the list of subjects to return data for

        const results: List<OrderedMap<string, any>> = this.strategies(subjectIris)
            .flatMap((strat) => executor(strat))
            .groupBy((map) => map.get(SUBJECT_BINDING))
            .valueSeq()
            .map((listOfMaps: List<Map<string, any>>) => {
                const mapOfLists: Map<string, List<any>> = this.combineMaps(listOfMaps);
                const specialFields: Map<string, List<any>> = Map<any>([
                    [
                        ID_BINDING,
                        Option.of(
                            mapOfLists.get(SUBJECT_BINDING)
                        ).getOrElse(List<any>()),
                    ],
                    [
                        TYPENAME_BINDING,
                        Option.of(
                            mapOfLists.get(TYPENAME_BINDING),
                        ).getOrElse(List<any>()),
                    ],
                ]).map(x => List(this.iriWithNameToPrefixedString(x.toString)));

                const mapOfListsWithSpecialFields: Map<string,
                    List<any>> = mapOfLists.concat(specialFields);

                const unsorted: Map<string,
                    any> = mapOfListsWithSpecialFields
                    .filterNot((v) => v.isEmpty())
                    .map((v, k) =>
                        this.shouldHaveOnlyOne(k) ? [k, v.first()] : [k, v],
                    );

                const unsortedAliased: Map<string, any> =
                    this.projectionOrder.reduce<Map<string, any>>((acc: Map<string, any>, an: AliasAndName) => {
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
