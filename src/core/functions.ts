import { CanvasPoint } from "./interfaces";

/**
 * Checks whether value passed is equal to false
 * @param value value to check
 * @returns false only when argument passed is equal to false, true otherwise
 */
export function notFalse(value?: boolean) {
    return value === false ? false : true;
}

/**
 * Checks whether value passed is equal to true
 * @param value value to check
 * @returns true only when argument passed is equal to true, false otherwise
 */
export function isTrue(value?: boolean) {
    return value === true ? true : false;
}

export function merge<T>(t1: T, t2: T): T {
    return {
        ...t1,
        ...t2
    }
}

export function mergeWithInherits<T extends V, V>(input: T, ...ts: V[]): V {
    if (ts.length === 1) {
        return {
            ...input,
            ...ts[0]
        };
    }
    return ts.reduce((res, t) => {
        if (!t) {
            return res;
        }
        return {
            ...res,
            ...t
        }
    }, { ...input });
}


// function isIterator<T>(obj: Iterable<T>) {
//     return typeof obj[Symbol.iterator] === 'function';
// }

// function getIterator<T>(obj: Iterable<T>): Iterator<T> | null {
//     return isIterator(obj) ? obj[Symbol.iterator]() : null;
// }


// function enumerate<T>(iterator: Iterator<T>, callback: (value: T, index: number) => void): void {
//     let index = 0;
//     let current = iterator.next();
//     while (!current.done) {
//         callback(current.value, index);
//         index++;
//         current = iterator.next();
//     }
// }

// /**
//  * Finds all indexes of items that passes condition
//  * @param iterable object to find in
//  * @param callback function that provides condition
//  * @returns list of indexes found
//  */
// export function findAllIndexes<T>(iterable: Iterable<T>, callback: (value: T, index: number) => boolean): number[] {
//     const result: number[] = [];
//     const iterator = getIterator(iterable);
//     if (!iterator) {
//         return result;
//     }
//     enumerate(iterator, (value: T, index: number) => {
//         if (callback(value, index)) {
//             result.push(index)
//         }
//     })
//     return result;
// }


/**
 * Returns an iterator that incerments value on each call
 * It goes from 1...200000 and resets
 */
export function* counter(): Iterator<number> {
    let idx = 1;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 1;
        }
    }
}

export function validator<T>(input: T | undefined, keys: (keyof T)[], callback: (objectName: string, objectType: string, value: any) => boolean): boolean {
    if (!input) {
        return false;
    }
    const keysCount = keys.length;
    if (keysCount === 0) {
        return true
    }
    let key: keyof T = keys[0];
    for (let i = 0; i < keysCount; i++, key = keys[i]) {
        const val = input[key] as any;
        if (!callback(key.toString(), typeof input[key], val)) {
            return false;
        }
    }
    return true;
}

/**
 * Converts point it string representation
 * @param point 
 * @returns String representation of point in format of x: 0, y: 0 
 */
export function pointToString(point: CanvasPoint): string {
    if (!point) {
        return "-";
    }
    return `x:${point.x}, y:${point.y}`;
}


/**
 * Adjusts value to specified range
 * @param value value to be checked
 * @param min range minimum
 * @param max range maximum
 * @returns Value that is within the range
 */
export function adjust(value: number, min: number, max: number) {
    return Math.round(Math.max(Math.min(max, value), 0));
}

/**
 * Adjusts range to 0..1.
 * If value is smaller than 1 then value stays
 * If value is bigger than 1 is treated as percentage and divided by 100
 * Value smaller than 0 is defaulted to 0
 * @param value 
 * @returns value adjusted to 0..1 range
 */
export function adjustSmallRange(value: number): number {
    value = Math.max(value, 0);
    return value > 1 ? Math.min(value, 100) / 100 : value;
}


/**
 * Gets value of key from first or second object regarding which object this key exists on.
 * If both have key existing, first one is returned
 * @param key object property name
 * @param v1 first object
 * @param v2 second object
 * @returns found value or undefined
 */
export function getVal<V>(key: keyof V, v1: V, v2: V): V[keyof V] | undefined {
    return v1[key] ?? v2[key];
}

/**
 * Inserts items at specific position in the collection.
 * When position is not provided or does not fit to collection range then items are appended to collection
 * @param collection collection
 * @param items items to be added
 * @param index? positions
 *  
 * @example insert([1,2,3], [5], 1)
 */
export function insert<T>(collection: T[], items: T[], index?: number) {
    if (typeof index !== 'number' || index < 0 || index >= collection.length) {
        collection.push(...items);
        return;
    }
    collection.splice(index, 0, ...items)
}