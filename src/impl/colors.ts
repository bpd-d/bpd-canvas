import { adjust, adjustSmallRange, merge } from "../core/functions";
import { CanvasPoint, IStringable, CanvasObjectCoordinates, CanvasObjectSize, HslColorDefinition, IObjectStyle, RgbColorDefinition, CanvasPatternDefinition, ErrorBase, ISetter } from "../core/interfaces";

export interface ColorConverter<T> {
    (t: T): string;
}

export class StringColorBase<T> implements IStringable, IObjectStyle {
    protected _color: T;
    private _converter: ColorConverter<T>;
    constructor(converter: ColorConverter<T>, init: T) {
        this._converter = converter;
        this._color = init;

    }

    set(color: T): void {
        this._color = {
            ...this._color,
            ...color
        }
    }

    get(): T {
        return this._color;
    }

    asString(): string {
        return this._converter(this._color);
    }

    toStyle(): string | CanvasGradient {
        return this.asString();
    }
}

/**
 * Creates instance of object style that accepts all kind of colors in string format
 */
export class Color extends StringColorBase<string> {
    constructor(name: string) {
        super((name: string) => {
            return name;
        }, name);
    }

    set(color: string) {
        this._color = color;
    }
}

/**
 * Creates instance of style object building a RGB color
 */
export class RgbColor extends StringColorBase<RgbColorDefinition> {
    constructor(color: RgbColorDefinition) {
        super((color: RgbColorDefinition) => {
            const c: RgbColorDefinition = {
                red: adjust(valueOrDefault(color.red, 0), 0, 255),
                green: adjust(valueOrDefault(color.green, 0), 0, 255),
                blue: adjust(valueOrDefault(color.blue, 0), 0, 255),
                alpha: adjustSmallRange(valueOrDefault(color.alpha, 1))
            };
            return `rgba(${c.red},${c.green},${c.blue},${c.alpha})`;
        }, color);
    }

    setRed(value: number): void {
        this._color.red = value;
    }

    setGreen(value: number): void {
        this._color.green = value;
    }

    setBlue(value: number): void {
        this._color.blue = value;
    }

    setAlpha(value: number) {
        this._color.alpha = value;
    }

    fromHex(color: string) {
        const val = parseHexToRgba(color);
        if (val) {
            this.set(val)
        }
    }
}

/**
 * Creates instance of style object building a HSL color
 */
export class HslColor extends StringColorBase<HslColorDefinition> {
    constructor(color: HslColorDefinition) {
        super((color: HslColorDefinition) => {
            const c: HslColorDefinition = {
                hue: adjust(valueOrDefault(color.hue, 0), 0, 360),
                saturation: adjust(valueOrDefault(color.saturation, 0), 0, 100),
                lightness: adjust(valueOrDefault(color.lightness, 0), 0, 100),
                alpha: adjustSmallRange(valueOrDefault(color.alpha, 1))
            };
            return `hsla(${c.hue},${c.saturation}%,${c.lightness}%,${c.alpha})`;
        },
            color);
    }

    setHue(value: number): void {
        this._color.hue = value;
    }

    setSaturation(value: number): void {
        this._color.saturation = value;
    }

    setLightness(value: number): void {
        this._color.lightness = value;
    }

    setAlpha(value: number) {
        this._color.alpha = value;
    }
}

/**
 * Creates instance of object styles that allows to build linear gradient
 */
export class CanvasLinearGradientColor implements IObjectStyle {
    private _colors: Map<number, IStringable>;
    private _context: CanvasRenderingContext2D;
    private _startingPoint: CanvasPoint;
    private _size: CanvasObjectSize;

    constructor(context: CanvasRenderingContext2D, options?: CanvasObjectCoordinates) {
        this._context = context;
        this._colors = new Map();
        this._size = {
            height: 0,
            width: 0
        };
        this._startingPoint = {
            x: 0,
            y: 0
        }

        if (options) {
            this.setPosition(options);
            this.setSize(options)
        }
    }

    /**
     * Adds color to map with specific offset
     * @param offset 
     * @param color 
     */
    addColor(offset: number, color: IStringable) {
        this._colors.set(offset, color);
    }

    /**
     * Removes color from map with specific offset
     * @param offset color offset
     * @returns whether operation succeeded
     */
    removeColor(offset: number): boolean {
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
    setPosition(point: CanvasPoint) {
        const { x, y } = point;
        this._startingPoint = {
            x, y
        }
    }

    /**
     * Sets gradient size
     * @param size 
     */
    setSize(size: CanvasObjectSize) {
        const { width, height } = size;
        this._size = {
            width,
            height

        }
    }

    toStyle(): string | CanvasGradient {
        const gradient = this._context.createLinearGradient(this._startingPoint.x, this._startingPoint.y, this._size.width, this._size.height);
        this._colors.forEach((value: IStringable, key: number) => {
            const offset = adjustSmallRange(key);
            gradient.addColorStop(offset, value.asString());
        })
        return gradient;
    }
}

export class CanvasSourcePattern implements IObjectStyle, ISetter<CanvasPatternDefinition> {
    private _context: CanvasRenderingContext2D;
    private _definition: CanvasPatternDefinition;
    constructor(context: CanvasRenderingContext2D, definition?: CanvasPatternDefinition) {
        this._context = context;
        this._definition = definition ?? {};
    }

    set(t: CanvasPatternDefinition): ISetter<CanvasPatternDefinition> {
        merge(this._definition, t);
        return this;
    }


    toStyle(): string | CanvasGradient | CanvasPattern {
        if (!this._definition || !this._definition.source) {
            throw new ErrorBase("CanvasImagePatternError", "Cannot create pattern, source is missing")
        }
        const pattern = this._context.createPattern(this._definition.source, this._definition.repeat ?? "");
        if (!pattern) {
            throw new ErrorBase("CanvasImagePatternError", "Pattern was not created")
        }
        return pattern;
    }

}




function valueOrDefault<T>(value: T | undefined, defaultValue: T): T {
    return value ?? defaultValue;
}

function fromHex(hex: string): number {
    return parseInt(hex, 16);
}

function parseHexToRgba(value: string): RgbColorDefinition | null {
    const str = value.startsWith('#') ? value.substring(1) : value;
    const len = str.length;
    const callback = rgbParsersMap.get(len);
    return callback ? callback(str) : null;


}

const rgbParsersMap = new Map<number, (v: string) => RgbColorDefinition>([
    [1, oneHexToRgba],
    [3, threeHexToRgba],
    [6, sixToRgba],
    [8, eightToRgba]
])

/**
 * Helper function that parses single character string to RGB color space
 * @param value single character string
 */
function oneHexToRgba(value: string): RgbColorDefinition {
    const v = fromHex(value + value);
    return {
        red: v,
        green: v,
        blue: v,
        alpha: 1
    }
}

/**
 * Helper function that parses three character string to RGB color space
 * @param value three character string
 */
function threeHexToRgba(value: string): RgbColorDefinition {
    return {
        red: fromHex(value[0]),
        green: fromHex(value[1]),
        blue: fromHex(value[2]),
        alpha: 1
    }
}

/**
 * Helper function that parses six character string to RGB color space
 * @param value six character string
 */
function sixToRgba(value: string): RgbColorDefinition {
    return {
        red: fromHex(value.substr(0, 2)),
        green: fromHex(value.substr(2, 2)),
        blue: fromHex(value.substr(4, 2)),
        alpha: 1
    }
}


/**
 * Helper function that parses eight character string to RGB color space
 * @param value eight character string
 */
function eightToRgba(value: string): RgbColorDefinition {
    return {
        ...sixToRgba(value),
        alpha: fromHex(value.substr(6, 2))
    }
}