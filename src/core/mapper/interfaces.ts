export interface MapItem<T, V> {
    key: keyof T;
    mapTo?: string;
    setter?: MapSetter<V>;
}

export interface MapSetter<T> {
    set(destination: T, key: keyof T, value: any): void;
}

export interface IMapper<T, V> {
    map(object: V, inputs: T[], excludes?: string[]): void;
}