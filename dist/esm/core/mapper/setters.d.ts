import { MapSetter } from "./interfaces";
export declare function baseSet<V>(destination: V, key: keyof V, value: any): void;
export declare function styleSetter<T>(): MapSetter<T>;
export declare function boolSetter<T>(): MapSetter<T>;
export declare function numberSetter<T>(parser: 'float' | 'integer', defaultValue?: number): MapSetter<T>;
export declare function stringableSetter<T>(): MapSetter<T>;
export declare function enumSetter<T, V>(expected: T[], defaultValue?: T): MapSetter<V>;
