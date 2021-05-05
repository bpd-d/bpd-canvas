(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdCanvas", [], factory);
	else if(typeof exports === 'object')
		exports["bpdCanvas"] = factory();
	else
		root["bpdCanvas"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "StringColorBase", function() { return /* reexport */ StringColorBase; });
__webpack_require__.d(__webpack_exports__, "Color", function() { return /* reexport */ Color; });
__webpack_require__.d(__webpack_exports__, "RgbColor", function() { return /* reexport */ colors_RgbColor; });
__webpack_require__.d(__webpack_exports__, "HslColor", function() { return /* reexport */ colors_HslColor; });
__webpack_require__.d(__webpack_exports__, "CanvasLinearGradientColor", function() { return /* reexport */ colors_CanvasLinearGradientColor; });
__webpack_require__.d(__webpack_exports__, "CanvasSourcePattern", function() { return /* reexport */ colors_CanvasSourcePattern; });
__webpack_require__.d(__webpack_exports__, "CanvasAssistant", function() { return /* reexport */ assistant_CanvasAssistant; });
__webpack_require__.d(__webpack_exports__, "LineData", function() { return /* reexport */ LineData; });
__webpack_require__.d(__webpack_exports__, "Line", function() { return /* reexport */ Line; });
__webpack_require__.d(__webpack_exports__, "CurveData", function() { return /* reexport */ CurveData; });
__webpack_require__.d(__webpack_exports__, "Curve", function() { return /* reexport */ Curve; });
__webpack_require__.d(__webpack_exports__, "ArcData", function() { return /* reexport */ ArcData; });
__webpack_require__.d(__webpack_exports__, "Arc", function() { return /* reexport */ Arc; });
__webpack_require__.d(__webpack_exports__, "BezierCurveData", function() { return /* reexport */ BezierCurveData; });
__webpack_require__.d(__webpack_exports__, "BezierCurve", function() { return /* reexport */ BezierCurve; });
__webpack_require__.d(__webpack_exports__, "QuadraticCurveData", function() { return /* reexport */ QuadraticCurveData; });
__webpack_require__.d(__webpack_exports__, "QuadraticCurve", function() { return /* reexport */ QuadraticCurve; });
__webpack_require__.d(__webpack_exports__, "EllipseData", function() { return /* reexport */ paths_EllipseData; });
__webpack_require__.d(__webpack_exports__, "Ellipse", function() { return /* reexport */ Ellipse; });
__webpack_require__.d(__webpack_exports__, "ObjectProperties", function() { return /* reexport */ properties_ObjectProperties; });
__webpack_require__.d(__webpack_exports__, "Font", function() { return /* reexport */ font_Font; });
__webpack_require__.d(__webpack_exports__, "CanvasImage", function() { return /* reexport */ image_CanvasImage; });
__webpack_require__.d(__webpack_exports__, "Rectangle", function() { return /* reexport */ rectangle_Rectangle; });
__webpack_require__.d(__webpack_exports__, "CanvasPath", function() { return /* reexport */ path_CanvasPath; });
__webpack_require__.d(__webpack_exports__, "CanvasText", function() { return /* reexport */ text_CanvasText; });

// CONCATENATED MODULE: ./src/core/functions.ts
/**
 * Checks whether value passed is equal to false
 * @param value value to check
 * @returns false only when argument passed is equal to false, true otherwise
 */
function notFalse(value) {
    return value === false ? false : true;
}
/**
 * Checks whether value passed is equal to true
 * @param value value to check
 * @returns true only when argument passed is equal to true, false otherwise
 */
function isTrue(value) {
    return value === true ? true : false;
}
function merge(t1, t2) {
    return Object.assign(Object.assign({}, t1), t2);
}
function mergeWithInherits(input, ...ts) {
    if (ts.length === 1) {
        return Object.assign(Object.assign({}, input), ts[0]);
    }
    return ts.reduce((res, t) => {
        if (!t) {
            return res;
        }
        return Object.assign(Object.assign({}, res), t);
    }, Object.assign({}, input));
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
function* functions_counter() {
    let idx = 1;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 1;
        }
    }
}
function validator(input, keys, callback) {
    if (!input) {
        return false;
    }
    const keysCount = keys.length;
    if (keysCount === 0) {
        return true;
    }
    let key = keys[0];
    for (let i = 0; i < keysCount; i++, key = keys[i]) {
        const val = input[key];
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
function pointToString(point) {
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
function adjust(value, min, max) {
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
function adjustSmallRange(value) {
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
function getVal(key, v1, v2) {
    var _a;
    return (_a = v1[key]) !== null && _a !== void 0 ? _a : v2[key];
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
function insert(collection, items, index) {
    if (typeof index !== 'number' || index < 0 || index >= collection.length) {
        collection.push(...items);
        return;
    }
    collection.splice(index, 0, ...items);
}

// CONCATENATED MODULE: ./src/core/interfaces.ts
;
class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
class InitializationError extends ErrorBase {
    constructor(message) {
        super("InitializationError", message);
    }
}
class MissingKeyException extends ErrorBase {
    constructor(type, message) {
        super("MissingKeyException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
class IteratorException extends ErrorBase {
    constructor(type, message) {
        super("IteratorException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
class ElementException extends ErrorBase {
    constructor(type, id, message) {
        super("ElementException", `[${type}][${id}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
class SetterException extends ErrorBase {
    constructor(type, message) {
        super("SetterException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
class EnumSetterException extends SetterException {
    constructor(message) {
        super("Enum", `${message !== null && message !== void 0 ? message : ""}`);
    }
}
class MapperExecption extends ErrorBase {
    constructor(key, message) {
        super("MapperExecption", `Error occured on [${key}]: ${message}`);
    }
}
class CounterError extends ErrorBase {
    constructor(name, message) {
        super("CounterError", `Counter [${name}]: ${message}`);
    }
}

// CONCATENATED MODULE: ./src/impl/colors.ts


class StringColorBase {
    constructor(converter, init) {
        this._converter = converter;
        this._color = init;
    }
    set(color) {
        this._color = Object.assign(Object.assign({}, this._color), color);
    }
    get() {
        return this._color;
    }
    asString() {
        return this._converter(this._color);
    }
    toStyle() {
        return this.asString();
    }
}
/**
 * Creates instance of object style that accepts all kind of colors in string format
 */
class Color extends StringColorBase {
    constructor(name) {
        super((name) => {
            return name;
        }, name);
    }
    set(color) {
        this._color = color;
    }
}
/**
 * Creates instance of style object building a RGB color
 */
class colors_RgbColor extends StringColorBase {
    constructor(color) {
        super((color) => {
            const c = {
                red: adjust(valueOrDefault(color.red, 0), 0, 255),
                green: adjust(valueOrDefault(color.green, 0), 0, 255),
                blue: adjust(valueOrDefault(color.blue, 0), 0, 255),
                alpha: adjustSmallRange(valueOrDefault(color.alpha, 1))
            };
            return `rgba(${c.red},${c.green},${c.blue},${c.alpha})`;
        }, color);
    }
    setRed(value) {
        this._color.red = value;
    }
    setGreen(value) {
        this._color.green = value;
    }
    setBlue(value) {
        this._color.blue = value;
    }
    setAlpha(value) {
        this._color.alpha = value;
    }
    fromHex(color) {
        const val = parseHexToRgba(color);
        if (val) {
            this.set(val);
        }
    }
}
/**
 * Creates instance of style object building a HSL color
 */
class colors_HslColor extends StringColorBase {
    constructor(color) {
        super((color) => {
            const c = {
                hue: adjust(valueOrDefault(color.hue, 0), 0, 360),
                saturation: adjust(valueOrDefault(color.saturation, 0), 0, 100),
                lightness: adjust(valueOrDefault(color.lightness, 0), 0, 100),
                alpha: adjustSmallRange(valueOrDefault(color.alpha, 1))
            };
            return `hsla(${c.hue},${c.saturation}%,${c.lightness}%,${c.alpha})`;
        }, color);
    }
    setHue(value) {
        this._color.hue = value;
    }
    setSaturation(value) {
        this._color.saturation = value;
    }
    setLightness(value) {
        this._color.lightness = value;
    }
    setAlpha(value) {
        this._color.alpha = value;
    }
}
/**
 * Creates instance of object styles that allows to build linear gradient
 */
class colors_CanvasLinearGradientColor {
    constructor(context, options) {
        this._context = context;
        this._colors = new Map();
        this._size = {
            height: 0,
            width: 0
        };
        this._startingPoint = {
            x: 0,
            y: 0
        };
        if (options) {
            this.setPosition(options);
            this.setSize(options);
        }
    }
    /**
     * Adds color to map with specific offset
     * @param offset
     * @param color
     */
    addColor(offset, color) {
        this._colors.set(offset, color);
    }
    /**
     * Removes color from map with specific offset
     * @param offset color offset
     * @returns whether operation succeeded
     */
    removeColor(offset) {
        return this._colors.delete(offset);
    }
    /**
     * Clears color map
     */
    clearColors() {
        this._colors.clear();
    }
    /**
     * Sets gradient position
     * @param point
     */
    setPosition(point) {
        const { x, y } = point;
        this._startingPoint = {
            x, y
        };
    }
    /**
     * Sets gradient size
     * @param size
     */
    setSize(size) {
        const { width, height } = size;
        this._size = {
            width,
            height
        };
    }
    toStyle() {
        const gradient = this._context.createLinearGradient(this._startingPoint.x, this._startingPoint.y, this._size.width, this._size.height);
        this._colors.forEach((value, key) => {
            const offset = adjustSmallRange(key);
            gradient.addColorStop(offset, value.asString());
        });
        return gradient;
    }
}
class colors_CanvasSourcePattern {
    constructor(context, definition) {
        this._context = context;
        this._definition = definition !== null && definition !== void 0 ? definition : {};
    }
    set(t) {
        merge(this._definition, t);
        return this;
    }
    toStyle() {
        var _a;
        if (!this._definition || !this._definition.source) {
            throw new ErrorBase("CanvasImagePatternError", "Cannot create pattern, source is missing");
        }
        const pattern = this._context.createPattern(this._definition.source, (_a = this._definition.repeat) !== null && _a !== void 0 ? _a : "");
        if (!pattern) {
            throw new ErrorBase("CanvasImagePatternError", "Pattern was not created");
        }
        return pattern;
    }
}
function valueOrDefault(value, defaultValue) {
    return value !== null && value !== void 0 ? value : defaultValue;
}
function fromHex(hex) {
    return parseInt(hex, 16);
}
function parseHexToRgba(value) {
    const str = value.startsWith('#') ? value.substring(1) : value;
    const len = str.length;
    const callback = rgbParsersMap.get(len);
    return callback ? callback(str) : null;
}
const rgbParsersMap = new Map([
    [1, oneHexToRgba],
    [3, threeHexToRgba],
    [6, sixToRgba],
    [8, eightToRgba]
]);
/**
 * Helper function that parses single character string to RGB color space
 * @param value single character string
 */
function oneHexToRgba(value) {
    const v = fromHex(value + value);
    return {
        red: v,
        green: v,
        blue: v,
        alpha: 1
    };
}
/**
 * Helper function that parses three character string to RGB color space
 * @param value three character string
 */
function threeHexToRgba(value) {
    return {
        red: fromHex(value[0]),
        green: fromHex(value[1]),
        blue: fromHex(value[2]),
        alpha: 1
    };
}
/**
 * Helper function that parses six character string to RGB color space
 * @param value six character string
 */
function sixToRgba(value) {
    return {
        red: fromHex(value.substr(0, 2)),
        green: fromHex(value.substr(2, 2)),
        blue: fromHex(value.substr(4, 2)),
        alpha: 1
    };
}
/**
 * Helper function that parses eight character string to RGB color space
 * @param value eight character string
 */
function eightToRgba(value) {
    return Object.assign(Object.assign({}, sixToRgba(value)), { alpha: fromHex(value.substr(6, 2)) });
}

// CONCATENATED MODULE: ./src/core/mapper/setters.ts

const boolStringOptions = ['y', 't', 'true', 'yes'];
function baseSet(destination, key, value) {
    if (typeof destination[key] !== 'function' && typeof value !== 'function') {
        destination[key] = value;
    }
}
function styleSetter() {
    return {
        set: (destination, key, value) => {
            baseSet(destination, key, value.toStyle());
        }
    };
}
function boolSetter() {
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
function numberSetter(parser, defaultValue) {
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
function stringableSetter() {
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
function enumSetter(expected, defaultValue) {
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

// CONCATENATED MODULE: ./src/core/mapper/mapper.ts


class mapper_Mapper {
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
            const val = mapper_getVal(item.key, ...inner);
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
function mapper_getVal(key, ...vs) {
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

// CONCATENATED MODULE: ./src/impl/mapper.ts


function lineDashSetter() {
    return {
        set(destination, key, value) {
            if (Array.isArray(value)) {
                destination.setLineDash(value);
            }
        }
    };
}
function getMapperDefinition() {
    return new mapper_Mapper([
        { key: "strokeStyle", setter: styleSetter() },
        { key: "fillStyle", setter: styleSetter() },
        { key: "strokeWidth", mapTo: 'lineWidth', setter: numberSetter('float') },
        { key: "font", setter: stringableSetter() },
        { key: "mitterLimit", setter: numberSetter('integer') },
        { key: "lineCap", setter: enumSetter(["butt", "round", "square"], 'square') },
        { key: "lineJoin", setter: enumSetter(["bevel", "round", "miter"], 'miter') },
        { key: "lineDashOffset", setter: numberSetter('integer') },
        { key: "lineDash", setter: lineDashSetter() },
        { key: "textAlign", setter: enumSetter(["left", "right", "center", "start", "end"], 'right') },
        { key: "textBaseline", setter: enumSetter(["top", "hanging", "middle", "bottom", "alphabetic", "ideographic"], 'alphabetic') },
        { key: "shadowColor", setter: styleSetter() },
        { key: "shadowOffsetX", setter: numberSetter('float') },
        { key: "shadowOffsetY", setter: numberSetter('float') },
        { key: "shadowBlur", setter: numberSetter('float') },
    ]);
}

// CONCATENATED MODULE: ./src/impl/statics.ts


const angle360 = Math.PI * 2;
const counters = new Map([
    ['line', functions_counter()],
    ['rect', functions_counter()],
    ['path', functions_counter()],
    ['curve', functions_counter()],
    ['text', functions_counter()],
    ['ellipse', functions_counter()],
    ['image', functions_counter()],
]);
function createKey(counter, alternate) {
    const iterator = counters.get(counter);
    if (!iterator) {
        throw new IteratorException(counter, "Iterator for counter has not been found");
    }
    const entry = iterator.next();
    if (entry.done) {
        throw new IteratorException(counter, "Iterator is done");
    }
    return `${alternate !== null && alternate !== void 0 ? alternate : counter}_${entry.value}`;
}

// CONCATENATED MODULE: ./src/impl/components/base.ts


class ElementBase {
    constructor(context) {
        this._context = context;
    }
}
class base_CanvasObjectBase extends ElementBase {
    constructor(setup, init, counter) {
        var _a;
        super(setup.context);
        this._global = setup.settings;
        this._settings = Object.assign({}, this._global);
        this._useGlobalSettings = setup.useGlobal;
        this._mapper = setup.mapper;
        this._objectSetup = init;
        this.id = (_a = setup.key) !== null && _a !== void 0 ? _a : createKey(counter);
    }
    set(objectSetup) {
        if (!this._objectSetup) {
            this._objectSetup = Object.assign({}, objectSetup);
            return this;
        }
        merge(this._objectSetup, objectSetup);
        return this;
    }
    fill(flag) {
        this._settings.isFill = notFalse(flag);
        return this;
    }
    stroke(flag) {
        this._settings.isStroke = notFalse(flag);
        return this;
    }
    setSettings(settings) {
        this._settings = merge(this._settings, settings);
        return this;
    }
    getKey() {
        return this.id;
    }
    drawOptions() {
        if (this._settings.isFill) {
            this._context.fill();
        }
        if (this._settings.isStroke) {
            this._context.stroke();
        }
    }
    setStyles(excludedKeys) {
        const settings = [this._settings];
        if (this._useGlobalSettings) {
            settings.push(this._global);
        }
        this._mapper.map(this._context, settings, excludedKeys);
    }
}

// CONCATENATED MODULE: ./src/impl/components/image.ts

/**
 * Creates instance of Image drawable that draws an image on the canvas
 */
class image_CanvasImage extends base_CanvasObjectBase {
    constructor(setup, init) {
        super(setup, init !== null && init !== void 0 ? init : {}, 'image');
        if (!this._objectSetup) {
            this._objectSetup = {};
        }
    }
    draw() {
        if (!this._objectSetup.source) {
            return;
        }
        this.setStyles();
        // Draw whole image
        if (this._objectSetup.position) {
            this._context.drawImage(this._objectSetup.source, this._objectSetup.position.x, this._objectSetup.position.y);
            return;
        }
        // Draw a slice or a scaled image
        if (this._objectSetup.imageSlice && this._objectSetup.desitnationCoords) {
            this._context.drawImage(this._objectSetup.source, this._objectSetup.imageSlice.x, this._objectSetup.imageSlice.y, this._objectSetup.imageSlice.width, this._objectSetup.imageSlice.height, this._objectSetup.desitnationCoords.x, this._objectSetup.desitnationCoords.y, this._objectSetup.desitnationCoords.width, this._objectSetup.desitnationCoords.height);
        }
    }
    getRect() {
        var _a, _b, _c, _d;
        const w = (_b = (_a = this._objectSetup.source) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
        const h = (_d = (_c = this._objectSetup.source) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 0;
        return {
            x: 0,
            y: 0,
            width: w,
            height: h
        };
    }
}

// CONCATENATED MODULE: ./src/impl/components/path.ts



/**
 * Draws path on canvas. Path always consists of path elements
 */
class path_CanvasPath extends base_CanvasObjectBase {
    constructor(setup, init) {
        super(setup, init !== null && init !== void 0 ? init : { x: -1, y: -1 }, 'path');
        // for path set stroke to true by default regardless of globals
        this._settings.isStroke = true;
        this._isClosePath = false;
        this._moveBeforeBuild = true;
        this._paths = [];
    }
    from(point) {
        this._objectSetup = Object.assign({}, point);
        return this;
    }
    add(...elements) {
        insert(this._paths, elements);
        return this;
    }
    doNotMoveBeforeBuild() {
        this._moveBeforeBuild = false;
        return this;
    }
    get(index) {
        if (index > -1 && index < this._paths.length) {
            return this._paths[index];
        }
        return null;
    }
    delete(key) {
        if (!key) {
            return;
        }
        this._paths.splice(key, 1);
    }
    insertAt(index, ...paths) {
        insert(this._paths, paths, index);
        return this;
    }
    setAt(index, element) {
        if (index >= 0 && index < this._paths.length) {
            this._paths[index] = element;
        }
        return this;
    }
    close(flag) {
        this._isClosePath = notFalse(flag);
    }
    draw() {
        if (!this._objectSetup) {
            return;
        }
        this._context.beginPath();
        this.setStyles();
        let startPoint = this._objectSetup;
        try {
            if (this._moveBeforeBuild)
                this._context.moveTo(startPoint.x, startPoint.y);
            this._paths.forEach(child => {
                startPoint = child.build(this._context, startPoint);
            });
        }
        catch (e) {
            throw new ElementException('CanvasPath', this.id, e.message);
        }
        if (this._isClosePath) {
            this._context.closePath();
        }
        this.drawOptions();
    }
    getRect() {
        return {
            x: -1,
            y: -1,
            width: 0,
            height: 0
        };
    }
}

// CONCATENATED MODULE: ./src/impl/components/rectangle.ts


/**
 * Creates instance of rectangle drawable
 */
class rectangle_Rectangle extends base_CanvasObjectBase {
    constructor(setup, init) {
        super(setup, init !== null && init !== void 0 ? init : { x: -1, y: -1, width: -1, height: -1 }, 'rect');
        this._settings.isFill = true;
        if (!this._objectSetup)
            this._objectSetup = {
                x: 0, y: 0, height: 0, width: 0
            };
    }
    setPosition(point) {
        mergeWithInherits(this._objectSetup, point);
    }
    setSize(size) {
        mergeWithInherits(this._objectSetup, size);
    }
    draw() {
        this.setStyles();
        if (this._settings.isFill)
            this._context.fillRect(this._objectSetup.x, this._objectSetup.y, this._objectSetup.width, this._objectSetup.height);
        if (this._settings.isStroke)
            this._context.strokeRect(this._objectSetup.x, this._objectSetup.y, this._objectSetup.width, this._objectSetup.height);
    }
    getRect() {
        return Object.assign({}, this._objectSetup);
    }
}

// CONCATENATED MODULE: ./src/impl/components/text.ts

/**
 * Creates instance of text that will be drawn on on canvas
 */
class text_CanvasText extends base_CanvasObjectBase {
    constructor(setup, init) {
        super(setup, init !== null && init !== void 0 ? init : {}, 'text');
        this._settings.isFill = true;
        if (!this._objectSetup) {
            this._objectSetup = {};
        }
    }
    setFont(font) {
        this._settings.font = font;
        return this;
    }
    isValid() {
        if (!this._objectSetup) {
            return false;
        }
        if (!this._objectSetup.text || this._objectSetup.text.length === 0) {
            return false;
        }
        if (!this._objectSetup.position) {
            return false;
        }
        return true;
    }
    draw() {
        if (!this.isValid()) {
            return;
        }
        this.setStyles();
        if (this._settings.isFill) {
            //@ts-ignore all objectSetup fields were checked in isValid
            this._context.fillText(this._objectSetup.text, this._objectSetup.position.x, this._objectSetup.position.y);
        }
        if (this._settings.isStroke) {
            //@ts-ignore all objectSetup fields were checked in isValid
            this._context.strokeText(this._objectSetup.text, this._objectSetup.position.x, this._objectSetup.position.y);
        }
    }
    getRect() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }
}

// CONCATENATED MODULE: ./src/impl/assistant.ts








function getWholeCanvasCoords(canvas) {
    return { x: 0, y: 0, width: canvas.width, height: canvas.height };
}
function prepareCanvasObjectSetup(context, settings, mapper, useGlobal, setup, key) {
    return {
        context,
        settings,
        mapper,
        useGlobal,
        key
    };
}
/**
 * Class wrapping up Canvas context
 */
class assistant_CanvasAssistant {
    constructor(options) {
        var _a;
        this._canvas = options.canvas;
        const context = this._canvas.getContext('2d', {
            alpha: options.alpha,
            desynchronized: options.desynchronized
        });
        if (!context) {
            throw new InitializationError("Context was not initialized");
        }
        this._settings = (_a = options.settings) !== null && _a !== void 0 ? _a : {};
        this._useGlobalSettingsInComponents = notFalse(options.useGlobalSettings);
        this._mapper = getMapperDefinition();
        this._context = context;
        if (options.size) {
            this.setCanvasSize(options.size);
        }
    }
    getSetupForComponent() {
        return prepareCanvasObjectSetup(this._context, this._settings, this._mapper, this._useGlobalSettingsInComponents);
    }
    createPath(startingPoint) {
        return new path_CanvasPath(this.getSetupForComponent(), startingPoint);
    }
    createRectangle(coordinates) {
        return new rectangle_Rectangle(this.getSetupForComponent(), coordinates);
    }
    createText(setup) {
        return new text_CanvasText(this.getSetupForComponent(), setup);
    }
    /**
     *
     * @param setup
     * @returns
     */
    createImage(setup) {
        return new image_CanvasImage(this.getSetupForComponent(), setup);
    }
    /**
     * Sets global canvas object properties
     * @param settings
     */
    setGlobalObjectProperties(settings) {
        this._settings = merge(this._settings, settings);
    }
    /**
     * Retrives global object properties
     * @returns object properties
     */
    getGlobalObjectProperties() {
        return this._settings;
    }
    /**
     * Sets global alpha on context
     * @param value alpha value in range 0..1 or 0...100
     */
    setGlobalAlpha(value) {
        this._context.globalAlpha = adjustSmallRange(value);
    }
    /**
     * Sets image smoothing options
     * @param enabled - sets whether smoothing is enabled
     * @param quality - {optional} - set smoothing quality (high, medium, low) - works only when enabled is true
     */
    setImageSmoothing(enabled, quality) {
        this._context.imageSmoothingEnabled = enabled;
        if (quality && enabled)
            this._context.imageSmoothingQuality = quality;
    }
    /**
     * Invokes orginial getImageData
     * @param coords data size and position
     * @returns ImageData
     */
    getImageData(coords) {
        return this._context.getImageData(coords.x, coords.y, coords.width, coords.height);
    }
    /**
     * Invokes original method putImageData with params.
     *
     * @param imageData - ImageData - data to put
     * @param position - CanvasPoint - position where data shall be put to
     * @param cutCoords - optional - coordinates of ImageData slice
     */
    putImageData(imageData, position, cutCoords) {
        if (cutCoords) {
            this._context.putImageData(imageData, position.x, position.y, cutCoords.x, cutCoords.y, cutCoords.width, cutCoords.height);
            return;
        }
        this._context.putImageData(imageData, position.x, position.y);
    }
    /**
     * Calls original [ctx.createImageData] with size
     * @param size object size
     */
    createImageData(width, height) {
        if (typeof width === 'number') {
            this._context.createImageData(width, height !== null && height !== void 0 ? height : 0);
            return;
        }
        this._context.createImageData(width);
    }
    /**
     * Saves context settings
     */
    save() {
        this._context.save();
    }
    /**
     * Restores previously saved context settings
     */
    restore() {
        this._context.restore();
    }
    setCanvasSize(size) {
        this._canvas.width = size.width;
        this._canvas.height = size.height;
    }
    getCanvasSize() {
        return {
            width: this._canvas.width,
            height: this._canvas.height
        };
    }
    getContext() {
        return this._context;
    }
    createLinearGradient(options) {
        return new colors_CanvasLinearGradientColor(this._context, options);
    }
    createPattern(options) {
        return new colors_CanvasSourcePattern(this._context, options);
    }
    clear(coords) {
        let co = coords !== null && coords !== void 0 ? coords : getWholeCanvasCoords(this._canvas);
        this._context.clearRect(co.x, co.y, co.width, co.height);
    }
}

// CONCATENATED MODULE: ./src/impl/paths.ts



function parseOptions(input) {
    if (!input) {
        return {
            key: undefined,
            init: undefined
        };
    }
    if (typeof input === 'string') {
        return {
            key: input,
            init: undefined
        };
    }
    if (input['init']) {
        return {
            init: input['init'],
            key: input['key']
        };
    }
    return {
        key: undefined,
        init: input
    };
}
class paths_PathElementBase {
    constructor(name, counter, init, key) {
        this.id = key !== null && key !== void 0 ? key : createKey(counter);
        this.name = name;
        this.data = init;
    }
    /**
     * Retrvies an id of the path element
     * @returns key of the element
     */
    getKey() {
        return this.id;
    }
    /**
     * Sets setup data of the element
     * @param data
     * @returns
     */
    set(data) {
        this.data = merge(this.data, data);
        return this;
    }
    throw(message) {
        throw new ElementException(this.name, this.id, message);
    }
    validateKeys(keys) {
        return validator(this.data, keys, (objectName, objectType, value) => {
            if (objectType === 'undefined') {
                this.throw(`[${objectName}] not defined`);
            }
            if (objectType === 'number' && value < 0) {
                this.throw(`[${objectName}] is not correct`);
            }
            return true;
        });
    }
}
class DataBase {
    constructor(init) {
        this._data = init;
    }
    get() {
        return this._data;
    }
}
class LineData extends DataBase {
    constructor(...points) {
        super([...points]);
    }
    to(...points) {
        this._data.push(...points);
        return this;
    }
}
class Line extends paths_PathElementBase {
    constructor(options) {
        const { init, key } = parseOptions(options);
        super("Line", 'line', init !== null && init !== void 0 ? init : [], key);
    }
    set(data) {
        this.data = [...data];
        return this;
    }
    build(context, from) {
        if (this.data.length === 0) {
            this.throw("There are no lines to draw");
        }
        let last = this.data[0];
        this.data.forEach(point => {
            context.lineTo(point.x, point.y);
            last = point;
        });
        return Object.assign({}, last);
    }
}
class CurveData extends DataBase {
    constructor(data) {
        super(data !== null && data !== void 0 ? data : {});
    }
    to(point) {
        this._data.end = point;
        return this;
    }
    corner(point) {
        this._data.corner = point;
        return this;
    }
    withRadius(value) {
        this._data.radius = value;
        return this;
    }
}
/**
 * Creates curved line
 */
class Curve extends paths_PathElementBase {
    constructor(options) {
        const { init, key } = parseOptions(options);
        super("Curve", 'curve', init !== null && init !== void 0 ? init : {}, key);
    }
    build(context, from) {
        if (this.validateKeys(['corner', 'end', 'radius'])) {
            //@ts-ignore end must be defined
            context.arcTo(this.data.corner.x, this.data.corner.y, this.data.end.x, this.data.end.y, this.data.radius);
            //@ts-ignore end must be defined
            context.lineTo(this.data.end.x, this.data.end.y);
        }
        //@ts-ignore end must be defined
        return Object.assign({}, this.data.end);
    }
}
class ArcData extends DataBase {
    constructor(data) {
        super(data !== null && data !== void 0 ? data : {
            startAngle: -1,
            endAngle: -1,
            radius: -1
        });
    }
    setStartAngle(value) {
        this._data.startAngle = value;
        return this;
    }
    setEndAngle(value) {
        this._data.endAngle = value;
        return this;
    }
    setRadius(value) {
        this._data.radius = value;
        return this;
    }
}
class Arc extends paths_PathElementBase {
    constructor(settings) {
        const { init, key } = parseOptions(settings);
        super("Arc", 'curve', init !== null && init !== void 0 ? init : {
            startAngle: -1,
            endAngle: -1,
            radius: -1
        }, key);
    }
    build(context, from) {
        if (this.validateKeys(['endAngle', 'startAngle', 'radius'])) {
            context.arc(from.x, from.y, this.data.radius, this.data.startAngle, this.data.endAngle);
        }
        return Object.assign({}, from);
    }
}
class BezierCurveData extends DataBase {
    constructor(init) {
        super(init !== null && init !== void 0 ? init : {});
    }
    to(point) {
        this._data.end = point;
        return this;
    }
    by(point1, point2) {
        this._data.controlPoint = point1;
        this._data.controlPoint2 = point2;
        return this;
    }
}
class BezierCurve extends paths_PathElementBase {
    constructor(options) {
        const { init, key } = parseOptions(options);
        super("BezierCurve", 'curve', init !== null && init !== void 0 ? init : {}, key);
    }
    build(context, from) {
        if (this.validateKeys(['controlPoint2', 'controlPoint', 'end'])) {
            //@ts-ignore end must be defined
            context.bezierCurveTo(this.data.controlPoint.x, this.data.controlPoint.y, this.data.controlPoint2.x, this.data.controlPoint2.y, this.data.end.x, this.data.end.y);
        }
        //@ts-ignore end must be defined
        return Object.assign({}, this.data.end);
    }
}
class QuadraticCurveData extends DataBase {
    constructor(init) {
        super(init !== null && init !== void 0 ? init : {});
    }
    to(point) {
        this._data.end = point;
        return this;
    }
    by(point) {
        this._data.controlPoint = point;
        return this;
    }
}
class QuadraticCurve extends paths_PathElementBase {
    constructor(options) {
        const { init, key } = parseOptions(options);
        super("QuadraticCurve", 'curve', init !== null && init !== void 0 ? init : {}, key);
    }
    build(context, from) {
        if (this.validateKeys(['controlPoint', 'end'])) {
            //@ts-ignore end must be defined
            context.quadraticCurveTo(this.data.controlPoint.x, this.data.controlPoint.y, this.data.end.x, this.data.end.y);
        }
        //@ts-ignore end must be defined
        return Object.assign({}, this.data.end);
    }
}
class paths_EllipseData extends DataBase {
    constructor(init) {
        super(init !== null && init !== void 0 ? init : {
            rotation: 0,
            startAngle: 0,
            endAngle: angle360
        });
    }
    setRadius(x, y) {
        this._data.radiusX = x;
        this._data.radiusY = y !== null && y !== void 0 ? y : x;
        return this;
    }
    setAngles(start, end) {
        this._data.startAngle = start;
        this._data.endAngle = end;
        return this;
    }
    setRotation(rotation) {
        this._data.rotation = rotation;
        return this;
    }
}
class Ellipse extends paths_PathElementBase {
    constructor(options) {
        const { init, key } = parseOptions(options);
        super("Ellipse", 'ellipse', init !== null && init !== void 0 ? init : {}, key);
    }
    build(context, from) {
        if (this.validateKeys(['startAngle', 'endAngle', "radiusX", 'radiusY', 'rotation'])) {
            //@ts-ignore props must be defined
            context.ellipse(from.x, from.y, this.data.radiusX, this.data.radiusY, this.data.rotation, this.data.startAngle, this.data.endAngle);
        }
        return Object.assign({}, from);
    }
}

// CONCATENATED MODULE: ./src/impl/properties.ts

class properties_ObjectProperties {
    constructor(properties) {
        this._instance = {};
        if (properties) {
            this.set(properties);
        }
    }
    set(properties) {
        this._instance = merge(this._instance, properties);
        return this;
    }
    setFillStyle(style) {
        this._instance.fillStyle = style;
        return this;
    }
    setStrokeStyle(style) {
        this._instance.strokeStyle = style;
        return this;
    }
    setShadowColor(color) {
        this._instance.shadowColor = color;
        return this;
    }
    setShadow(color, offsetX, offsetY, blur) {
        return this.set({
            shadowColor: color,
            shadowOffsetX: offsetX,
            shadowOffsetY: offsetY,
            shadowBlur: blur
        });
    }
    setFont(font) {
        this._instance.font = font;
        return this;
    }
    setText(font, textAlign, textBaseline) {
        return this.set({
            font,
            textAlign,
            textBaseline
        });
    }
    setStrokeWidth(value) {
        this._instance.strokeWidth = value;
        return this;
    }
    setStroke(width, lineJoin, lineCap, lineDash, dashOffset, mitterLimit) {
        return this.set({
            strokeWidth: width,
            lineDashOffset: dashOffset,
            lineJoin,
            lineCap,
            lineDash,
        });
    }
    setStrokeDash(dash, offset) {
        this._instance.lineDash = dash;
        if (offset)
            this._instance.lineDashOffset = offset;
        return this;
    }
    setStrokeDetails(lineJoin, lineCap, mitterLimit) {
        return this.set({
            lineJoin,
            lineCap,
            mitterLimit
        });
    }
    get() {
        return this._instance;
    }
}

// CONCATENATED MODULE: ./src/core/font.ts

class font_Font {
    constructor(setup) {
        this._setup = {
            unit: 'px'
        };
        if (setup) {
            this.set(setup);
        }
    }
    set(setup) {
        this._setup = merge(this._setup, setup);
        return this;
    }
    setType(type) {
        this._setup.type = type;
        return this;
    }
    setSize(value) {
        this._setup.size = value;
        return this;
    }
    setUnit(value) {
        this._setup.unit = value;
        return this;
    }
    setStyle(style) {
        this._setup.style = style;
        return this;
    }
    asString() {
        var _a;
        let result = [];
        if (this._setup.style) {
            result.push(this._setup.style);
        }
        if (this._setup.size) {
            result.push((this._setup.size + ((_a = this._setup.unit) !== null && _a !== void 0 ? _a : '')));
        }
        if (this._setup.type) {
            result.push(this._setup.type);
        }
        return result.join(' ');
    }
}

// CONCATENATED MODULE: ./src/index.ts











/***/ })
/******/ ]);
});
//# sourceMappingURL=bpdCanvas.js.map