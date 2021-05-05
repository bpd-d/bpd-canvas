import { SetterException } from "../interfaces";
const boolStringOptions = ['y', 't', 'true', 'yes'];
export function baseSet(destination, key, value) {
    if (typeof destination[key] !== 'function' && typeof value !== 'function') {
        destination[key] = value;
    }
}
export function styleSetter() {
    return {
        set: (destination, key, value) => {
            baseSet(destination, key, value.toStyle());
        }
    };
}
export function boolSetter() {
    return {
        set: (destination, key, value) => {
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
    };
}
export function numberSetter(parser, defaultValue) {
    const callback = parser === 'float' ? parseFloat : parseInt;
    return {
        set: (destination, key, value) => {
            const parsed = callback(value);
            if (isNaN(parsed)) {
                if (!defaultValue) {
                    throw new SetterException(parser, "Value is not a number");
                }
                baseSet(destination, key, defaultValue);
                return;
            }
            baseSet(destination, key, parsed);
        }
    };
}
export function stringableSetter() {
    return {
        set: (destination, key, value) => {
            if (typeof value === 'string') {
                baseSet(destination, key, value);
                return;
            }
            baseSet(destination, key, value.asString());
        }
    };
}
export function enumSetter(expected, defaultValue) {
    return {
        set: (destination, key, value) => {
            if (expected.includes(value)) {
                baseSet(destination, key, value);
                return;
            }
            if (defaultValue) {
                baseSet(destination, key, defaultValue);
            }
        }
    };
}
