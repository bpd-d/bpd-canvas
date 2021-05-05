import { CanvasPoint, IStringable, CanvasObjectCoordinates, CanvasObjectSize, HslColorDefinition, IObjectStyle, RgbColorDefinition, CanvasPatternDefinition, ISetter } from "../core/interfaces";
export interface ColorConverter<T> {
    (t: T): string;
}
export declare class StringColorBase<T> implements IStringable, IObjectStyle {
    protected _color: T;
    private _converter;
    constructor(converter: ColorConverter<T>, init: T);
    set(color: T): void;
    get(): T;
    asString(): string;
    toStyle(): string | CanvasGradient;
}
/**
 * Creates instance of object style that accepts all kind of colors in string format
 */
export declare class Color extends StringColorBase<string> {
    constructor(name: string);
    set(color: string): void;
}
/**
 * Creates instance of style object building a RGB color
 */
export declare class RgbColor extends StringColorBase<RgbColorDefinition> {
    constructor(color: RgbColorDefinition);
    setRed(value: number): void;
    setGreen(value: number): void;
    setBlue(value: number): void;
    setAlpha(value: number): void;
    fromHex(color: string): void;
}
/**
 * Creates instance of style object building a HSL color
 */
export declare class HslColor extends StringColorBase<HslColorDefinition> {
    constructor(color: HslColorDefinition);
    setHue(value: number): void;
    setSaturation(value: number): void;
    setLightness(value: number): void;
    setAlpha(value: number): void;
}
/**
 * Creates instance of object styles that allows to build linear gradient
 */
export declare class CanvasLinearGradientColor implements IObjectStyle {
    private _colors;
    private _context;
    private _startingPoint;
    private _size;
    constructor(context: CanvasRenderingContext2D, options?: CanvasObjectCoordinates);
    /**
     * Adds color to map with specific offset
     * @param offset
     * @param color
     */
    addColor(offset: number, color: IStringable): void;
    /**
     * Removes color from map with specific offset
     * @param offset color offset
     * @returns whether operation succeeded
     */
    removeColor(offset: number): boolean;
    /**
     * Clears color map
     */
    clearColors(): void;
    /**
     * Sets gradient position
     * @param point
     */
    setPosition(point: CanvasPoint): void;
    /**
     * Sets gradient size
     * @param size
     */
    setSize(size: CanvasObjectSize): void;
    toStyle(): string | CanvasGradient;
}
export declare class CanvasSourcePattern implements IObjectStyle, ISetter<CanvasPatternDefinition> {
    private _context;
    private _definition;
    constructor(context: CanvasRenderingContext2D, definition?: CanvasPatternDefinition);
    set(t: CanvasPatternDefinition): ISetter<CanvasPatternDefinition>;
    toStyle(): string | CanvasGradient | CanvasPattern;
}
