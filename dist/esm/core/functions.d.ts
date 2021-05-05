import { CanvasPoint } from "./interfaces";
/**
 * Checks whether value passed is equal to false
 * @param value value to check
 * @returns false only when argument passed is equal to false, true otherwise
 */
export declare function notFalse(value?: boolean): boolean;
/**
 * Checks whether value passed is equal to true
 * @param value value to check
 * @returns true only when argument passed is equal to true, false otherwise
 */
export declare function isTrue(value?: boolean): boolean;
export declare function merge<T>(t1: T, t2: T): T;
export declare function mergeWithInherits<T extends V, V>(input: T, ...ts: V[]): V;
/**
 * Returns an iterator that incerments value on each call
 * It goes from 1...200000 and resets
 */
export declare function counter(): Iterator<number>;
export declare function validator<T>(input: T | undefined, keys: (keyof T)[], callback: (objectName: string, objectType: string, value: any) => boolean): boolean;
/**
 * Converts point it string representation
 * @param point
 * @returns String representation of point in format of x: 0, y: 0
 */
export declare function pointToString(point: CanvasPoint): string;
/**
 * Adjusts value to specified range
 * @param value value to be checked
 * @param min range minimum
 * @param max range maximum
 * @returns Value that is within the range
 */
export declare function adjust(value: number, min: number, max: number): number;
/**
 * Adjusts range to 0..1.
 * If value is smaller than 1 then value stays
 * If value is bigger than 1 is treated as percentage and divided by 100
 * Value smaller than 0 is defaulted to 0
 * @param value
 * @returns value adjusted to 0..1 range
 */
export declare function adjustSmallRange(value: number): number;
/**
 * Gets value of key from first or second object regarding which object this key exists on.
 * If both have key existing, first one is returned
 * @param key object property name
 * @param v1 first object
 * @param v2 second object
 * @returns found value or undefined
 */
export declare function getVal<V>(key: keyof V, v1: V, v2: V): V[keyof V] | undefined;
/**
 * Inserts items at specific position in the collection.
 * When position is not provided or does not fit to collection range then items are appended to collection
 * @param collection collection
 * @param items items to be added
 * @param index? positions
 *
 * @example insert([1,2,3], [5], 1)
 */
export declare function insert<T>(collection: T[], items: T[], index?: number): void;
