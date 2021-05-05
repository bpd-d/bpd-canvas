import { MapperExecption } from "../interfaces";
import { IMapper, MapItem } from "./interfaces";
import { baseSet } from "./setters";

export class Mapper<T, V> implements IMapper<T, V> {
    private _map: MapItem<T, V>[];
    constructor(map: MapItem<T, V>[]) {
        this._map = map;
    }

    map(destination: V, inner: T[], excludes?: string[]) {
        const excl = excludes ?? [];
        this._map.forEach(item => {
            const key = item.key.toString();
            if (excl.includes(key)) {
                return;
            }
            const val = getVal(item.key, ...inner)
            if (val) {
                // In case where key is the same in both objects - set only key
                const key: keyof V = item.mapTo ?? <any>item.key;
                if (item.setter) {
                    item.setter.set(destination, key, val)
                    return;
                }
                try {
                    baseSet(destination, key, val);
                } catch (e) {
                    throw new MapperExecption(key + "", e.message);
                }

            }
        })
    }
}


function getVal<V>(key: keyof V, ...vs: V[]): V[keyof V] | undefined {
    const len = vs.length
    if (len === 0) {
        return undefined;
    }
    for (let i = 0; i < len; i++) {
        const inst = vs[i][key];
        if (is(inst)) {
            return inst;
        }
    }
    return undefined;
}

function is(val: any): boolean {
    return typeof val !== 'undefined' && val !== null;
}
