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

  public addValues(values: List<[string, any]>) {
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
              const howManyLevelsToDeepen = this.getDepth(element, 1) - 3;
              const flattened = flattenDepth(element, (howManyLevelsToDeepen > 0 ? howManyLevelsToDeepen : 0));
              if (lastPathToFollowForScalars !== pathToFollow.join('.')) {
                lastPathToFollowForScalars = pathToFollow.join('.');
                resolveLevel(flattened, pathToFollow);
              }
            } else {
              const prev = get(obj, pathToFollow.join('.'), []);
              set(obj, pathToFollow.join('.'), prev.concat(this.addScalars(element)));
            }
          } else {
            if (this.isObj(element[0])) {
              if (lastPathToFollow !== pathToFollow.join('.')) {
                lastPathToFollow = pathToFollow.join('.');
                resolveLevel(element, pathToFollow);
              } else {
                throw {'status': 'done', lastPath: pathToFollow};
              }
            }
            if (this.isObj(element)) {
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
      if (message['status'] === 'done') {
        return resolve(obj);
      } else {
        console.warn(message);
        return reject(message);
      }
    }
  });

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
