import { IObjectStyle, IStringable, SetterException } from "../interfaces";
import { MapSetter } from "./interfaces";

const boolStringOptions: string[] = ['y', 't', 'true', 'yes'];

export function baseSet<V>(destination: V, key: keyof V, value: any) {
    if (typeof destination[key] !== 'function' && typeof value !== 'function') {
        destination[key] = value;
    }
}

export function styleSetter<T>(): MapSetter<T> {
    return {
        set: <T>(destination: T, key: keyof T, value: any) => {
            baseSet(destination, key, (<IObjectStyle>value).toStyle());
        }
    }
}

export function boolSetter<T>(): MapSetter<T> {
    return {
        set: <T>(destination: T, key: keyof T, value: any) => {
            let resVal = false;
            switch (typeof value) {
                case 'boolean':
                    resVal = value;
                    break;
                case 'number':
                    resVal = value > 0;
                    break;
                case 'string':
                    resVal = boolStringOptions.includes(value.toLowerCase());
                    break;
            }
            baseSet(destination, key, resVal);
        }
    }
}

export function numberSetter<T>(parser: 'float' | 'integer', defaultValue?: number): MapSetter<T> {
    const callback = parser === 'float' ? parseFloat : parseInt;
    return {
        set: <T>(destination: T, key: keyof T, value: any) => {
            const parsed = callback(value);
            if (isNaN(parsed)) {
                if (!defaultValue) {
                    throw new SetterException(parser, "Value is not a number")
                }
                baseSet(destination, key, defaultValue)
                return
            }
            baseSet(destination, key, parsed)
        }
    }
}


export function stringableSetter<T>(): MapSetter<T> {
    return {
        set: <T>(destination: T, key: keyof T, value: any) => {

            if (typeof value === 'string') {
                baseSet(destination, key, value);
                return;
            }
            baseSet(destination, key, (<IStringable>value).asString());
        }
    }
}

export function enumSetter<T, V>(expected: T[], defaultValue?: T): MapSetter<V> {
    return {
        set: <V>(destination: V, key: keyof V, value: any) => {
            if (expected.includes(value)) {
                baseSet(destination, key, value)
                return;
            }
            if (defaultValue) {
                baseSet(destination, key, defaultValue)
            }
        }
    }
}
