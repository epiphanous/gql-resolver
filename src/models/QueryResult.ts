import { List } from 'immutable';
import { flattenDepth, get, set } from 'lodash';

export default class QueryResult {
  public values = List<any>().asMutable(); // todo type
  public startTime; // ms since unix epoch (Timezone: UTC)
  public duration = 0;
  public bytes = 0;
  public count = 0; // no. of records
  public done = false;
  public ok = false;
  public errors = List<string>();

  constructor(
    values: List<[string, any]> = List<[string, any]>(),
    startTime: number = 0,
    duration: number = 0
  ) {
    values.forEach(v => this.addValue(v));
    this.startTime = startTime || new Date().getTime();
    this.duration = duration;
  }

  public bps() {
    return (this.bytes / (this.duration + 1)) * 1000;
  }

  public addValue(value: [string, any]) {
    this.values.push(value);
    this.bytes += `${value.join('')}`.length;
    this.count++;
  }

  public addValues(values: List<List<[string, any]>>) {
    values.map(v => this.addValue(v));
  }

  public async getResult() {
    try {
      return await this.fixResult(this.values.toJS());
    } catch (err) {
      console.error(err);
    }
  }

  public fixResult = (arrayOfResults) => new Promise((resolve, reject) => {
    const obj = {};
    let lastPathToFollow = '';
    let lastPathToFollowForScalars = '';
    // recursive fn
    const resolveLevel = (array, pathToFollow) => {
      if (Array.isArray(array)) {
        array.forEach((element, index) => {
          if (Array.isArray(element[0])) {
            if (Array.isArray(element[0][0])) {
              /** The element contains a (nested) array of scalar values at the deepest level
               * Figures out how many levels it needs to be flattened until we get an array of arrays of scalar values,
               * (a single group of scalar values), flattens the list up to that level
               * then it goes back and recurses with that flattened array to pick out the scalar values and map them
               */
              if (lastPathToFollowForScalars !== pathToFollow.join('.')) {
                const howManyLevelsToDeepen = this.getDepth(element, 1) - 3;
                const flattened = flattenDepth(element, (howManyLevelsToDeepen > 0 ? howManyLevelsToDeepen : 0));
                lastPathToFollowForScalars = pathToFollow.join('.');
                resolveLevel(flattened, pathToFollow);
              }
            } else {
              /** The element is a list of scalar values,
               * i.e. [['s_id, 'some_identifier_value'], ['geo_lat', '42.2141'], ['geo_lon', '12.4214']]
               * Basically formulates an object which nested objects would be appended to, inside the resulting object.
               * This is the only place where values are actually written to the result object.
               */
              const prev = get(obj, pathToFollow.join('.'), []);
              set(obj, pathToFollow.join('.'), prev.concat(this.addScalars(element)));
              /**
               * premise: this gets invoked whenever we only have resolved scalar fields for one single object
               * issue faced before: list of scalar values were accessed first, then looped back onto a higher-level array,
               * came back to a list of scalar values, then stopped, effectively doubling the results already in the object.
               *
               * TEST !
               */
              if (!lastPathToFollowForScalars) {
                throw {'status': 'done', lastPath: pathToFollow};
              }
            }
          } else {
            /**
             * If the first value of the current array is an object AND if we haven't already passed through this array,
             * update the lastPathToFollow and iterate again.
             * If we've already passed through the array, we consider it done as there isn't a deeper level to go to.
             */
            if (element[0] && this.isObj(element[0])) {
              if (lastPathToFollow !== pathToFollow.join('.')) {
                lastPathToFollow = pathToFollow.join('.');
                resolveLevel(element, pathToFollow);
              } else {
                throw {'status': 'done', lastPath: pathToFollow};
              }
            }
            if (this.isObj(element)) {
              /**
               * The current object is an element, therefore we update the current path and resume onwards into a new
               * iteration. If the path to follow ends with a number, it means that this is a 2nd or nth object inside
               * the higher-level object and we should append to that object instead of the first one.
               */
              console.log('Object', element);
              if (pathToFollow.length > 0) {
                if (Number(pathToFollow[pathToFollow.length - 1])) {
                  pathToFollow.push((Number(pathToFollow[pathToFollow.length - 1]) + 1).toString());
                } else {
                  pathToFollow.push('0');
                }
              }
              pathToFollow.push(this.toBaseObjName(element));
              resolveLevel(array[1], pathToFollow);
            } else {
              throw {'status': 'done', lastPath: pathToFollow};
            }
          }
        });
      }
    };

    try {
      resolveLevel(arrayOfResults, []);
    } catch (message) {
      if (message.status === 'done') {
        return resolve(obj);
      } else {
        console.warn(message);
        return reject(message);
      }
    }
  })

  /**
   * Returns an object of resolved scalar values
   * @param scalarArray
   * @returns {{}}
   */
  public addScalars = (scalarArray) => {
    const objOfScalars = {};
    scalarArray.forEach(([fieldName, value]) => {
      objOfScalars[fieldName] = value;
    });
    return objOfScalars;
  }

  /**
   * Returns the depth of an array
   * @param element
   * @param prevDepth
   * @returns {any}
   */
  public getDepth = (element, prevDepth) => {
    let depth = prevDepth;
    if (Array.isArray(element[0])) {
      depth++;
      return this.getDepth(element[0], depth);
    } else {
      return depth;
    }
  }

  // helper methods
  public isObj = val => val.includes('ox_');
  public toBaseObjName = val => val.split('ox_')[1];
}
