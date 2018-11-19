import { expect } from 'chai';
import { List, Map } from 'immutable';
import 'mocha';
import { sortMapByProjectionOrder } from '../MapSorter';

describe('sortMapByProjectionOrder', () => {
  const map = Map<number>({
    one: 1,
    two: 2,
    seventeen: 17,
    'negative one': -1,
  });
  const projections = List(['seventeen', 'two']);
  const out = sortMapByProjectionOrder(map, projections);
  const keys = out.keySeq();
  it('should sort map by projection order', () => {
    expect(keys.take(projections.size).toArray()).to.eql(projections.toArray());
  });
  it('should handle incomplete projections', () => {
    expect(map.size).to.equal(keys.size);
  });
});
