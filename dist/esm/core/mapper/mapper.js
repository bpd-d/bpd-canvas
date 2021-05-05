import { MapperExecption } from "../interfaces";
import { baseSet } from "./setters";
export class Mapper {
    constructor(map) {
        this._map = map;
    }
    map(destination, inner, excludes) {
        const excl = excludes !== null && excludes !== void 0 ? excludes : [];
        this._map.forEach(item => {
            var _a;
            const key = item.key.toString();
            if (excl.includes(key)) {
                return;
            }
            const val = getVal(item.key, ...inner);
            if (val) {
                // In case where key is the same in both objects - set only key
                const key = (_a = item.mapTo) !== null && _a !== void 0 ? _a : item.key;
                if (item.setter) {
                    item.setter.set(destination, key, val);
                    return;
                }
                try {
                    baseSet(destination, key, val);
                }
                catch (e) {
                    throw new MapperExecption(key + "", e.message);
                }
            }
        });
    }
}
function getVal(key, ...vs) {
    const len = vs.length;
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
function is(val) {
    return typeof val !== 'undefined' && val !== null;
}
