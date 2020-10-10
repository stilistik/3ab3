/**
 * Helper to access of a NestedRecord with a string in object notation.
 * @param obj The NestedRecord to retrieve a property from
 * @param path an object string such as obj[0].x.y[1];
 * @returns the requested object property
 */
export function getBy<T>(obj: NestedRecord<T>, path: string): T {
  if (!path) {
    throw new Error('A path string is required to use getBy');
  }
  const pathArray = makePathArray(path);
  const pathObj = pathArray;
  return pathObj.reduce((current, pathPart) => {
    if (current && typeof current !== 'undefined') {
      return current[pathPart];
    }
    return undefined;
  }, obj) as T;
}

/**
 * Helper to set a property on a NestedRecord based on a string in object notation.
 * @param obj : a NestedRecord type object
 * @param path : an object string such as obj[0].x.y[1];
 * @param updater: a react style updater function or the new value
 * @retursn the updated NestedRecord
 */
export function setBy<T>(obj: NestedRecord<T>, path: string, valueUpdater: ((value: T) => T) | T): NestedRecord<T> {
  const pathArray: Array<string | number> = makePathArray(path);

  function doSet(current?: NestedRecord<T> | T): NestedRecord<T> | T {
    if (!pathArray.length) {
      return typeof valueUpdater === 'function' ? (valueUpdater as (value: T) => T)(current as T) : valueUpdater;
    }

    const key = pathArray.shift();
    if (typeof key === 'string') {
      if (typeof current === 'object') {
        const currentObject = current as NestedRecord<T>;
        return {
          ...currentObject,
          [key]: doSet(currentObject[key as string] as NestedRecord<T> | T),
        } as NestedRecord<T>;
      }
      return {
        [key]: doSet(),
      } as NestedRecord<T>;
    }

    throw new Error('Uh oh!');
  }

  return doSet(obj) as NestedRecord<T>;
}

const reFindNumbers0 = /^(\d*)$/gm;
const reFindNumbers1 = /\.(\d*)\./gm;
const reFindNumbers2 = /^(\d*)\./gm;
const reFindNumbers3 = /\.(\d*$)/gm;
const reFindMultiplePeriods = /\.{2,}/gm;

export function makePathArray(str: string): Array<string | number> {
  return str
    .replace('[', '.')
    .replace(']', '')
    .replace(reFindNumbers0, '__int__$1')
    .replace(reFindNumbers1, '.__int__$1.')
    .replace(reFindNumbers2, '__int__$1.')
    .replace(reFindNumbers3, '.__int__$1')
    .replace(reFindMultiplePeriods, '.')
    .split('.')
    .map((d) => {
      if (d.indexOf('__int__') === 0) {
        return parseInt(d.substring('__int__'.length), 10);
      }
      return d;
    });
}
