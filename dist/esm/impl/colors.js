import { adjust, adjustSmallRange, merge } from "../core/functions";
import { ErrorBase } from "../core/interfaces";
export class StringColorBase {
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
export class Color extends StringColorBase {
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
export class RgbColor extends StringColorBase {
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
export class HslColor extends StringColorBase {
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
export class CanvasLinearGradientColor {
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
export class CanvasSourcePattern {
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
