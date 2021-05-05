import { IMapper, MapItem } from "./interfaces";
export declare class Mapper<T, V> implements IMapper<T, V> {
    private _map;
    constructor(map: MapItem<T, V>[]);
    map(destination: V, inner: T[], excludes?: string[]): void;
}
