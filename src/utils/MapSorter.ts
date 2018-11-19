import { List, Map, OrderedMap } from 'immutable';

export function sortMapByProjectionOrder<K, V>(
  map: Map<K, V>,
  projectionOrder: List<K>
): OrderedMap<K, V> {
  const missing = map
    .keySeq()
    .toOrderedSet()
    .sort()
    .subtract(projectionOrder);
  const completeProjectionOrder = projectionOrder.concat(missing).toList();
  return map
    .sortBy(
      (value, key) => completeProjectionOrder.indexOf(key),
      (a, b) => (a > b ? 1 : a < b ? -1 : 0)
    )
    .toOrderedMap();
}
