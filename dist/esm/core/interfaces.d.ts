import { IMapper } from "./mapper/interfaces";
export interface IStringable {
    asString(): string;
}
export interface ISetter<T> {
    set(t: T): ISetter<T>;
}
export interface IGetter<T> {
    get(): T;
}
export interface AssistantOptions {
    canvas: HTMLCanvasElement;
    size?: CanvasObjectSize;
    settings?: IObjectProperties;
    alpha?: boolean;
    desynchronized?: boolean;
    useGlobalSettings?: boolean;
}
export declare type TextAlign = "left" | "right" | "center" | "start" | "end";
export declare type TextBaseline = "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
export declare type LineCap = "butt" | "round" | "square";
export declare type LineJoin = "bevel" | "round" | "miter";
export declare type PatternRepetition = "repeat" | 'repeat-x' | 'repeat-y' | 'no-repeat';
export interface IObjectProperties {
    strokeStyle?: IObjectStyle;
    fillStyle?: IObjectStyle;
    strokeWidth?: number;
    isFill?: boolean;
    isStroke?: boolean;
    font?: IStringable;
    mitterLimit?: number;
    lineCap?: LineCap;
    lineJoin?: LineJoin;
    lineDashOffset?: number;
    lineDash?: number[];
    textAlign?: TextAlign;
    textBaseline?: TextBaseline;
    shadowColor?: IObjectStyle;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
}
export interface CanvasObjectSetup<T, V> {
    context: T;
    settings: V;
    mapper: IMapper<V, T>;
    useGlobal: boolean;
    key?: string;
}
export interface IObjectStyle {
    toStyle(): string | CanvasGradient | CanvasPattern;
}
export interface RgbColorDefinition {
    red?: number;
    green?: number;
    blue?: number;
    alpha?: number;
}
export interface HslColorDefinition {
    hue?: number;
    saturation?: number;
    lightness?: number;
    alpha?: number;
}
export interface CanvasPatternDefinition {
    source?: CanvasImageSource;
    repeat?: PatternRepetition;
}
export interface CanvasObjectSize {
    width: number;
    height: number;
}
export interface CanvasPoint {
    x: number;
    y: number;
}
export interface IIdentifyable {
    id: string;
}
export interface IKey<T> {
    getKey(): T;
}
export interface PathElementOptions<T> {
    key?: string;
    init?: T;
}
export interface TextSetup {
    text?: string;
    position?: CanvasPoint;
}
export interface CanvasImageSetup {
    source?: CanvasImageSource;
    position?: CanvasPoint;
    imageSlice?: CanvasObjectCoordinates;
    desitnationCoords?: CanvasObjectCoordinates;
}
export interface CanvasObjectCoordinates extends CanvasObjectSize, CanvasPoint {
}
export interface ArcOptions {
    startAngle: number;
    endAngle: number;
    radius: number;
}
export interface CurveOptions {
    radius?: number;
    corner?: CanvasPoint;
    end?: CanvasPoint;
}
export interface BezierCurveOptions {
    controlPoint?: CanvasPoint;
    controlPoint2?: CanvasPoint;
    end?: CanvasPoint;
}
export interface QuadraticCurveOptions {
    controlPoint?: CanvasPoint;
    end?: CanvasPoint;
}
export interface EllipseOptions {
    rotation?: number;
    radiusX?: number;
    radiusY?: number;
    startAngle?: number;
    endAngle?: number;
}
export interface ICanvasDrawable extends IIdentifyable {
    draw(): void;
    getRect(): CanvasObjectCoordinates;
}
export interface IFillable {
    fill(flag?: boolean): void;
}
export interface IStrokable {
    stroke(flag?: boolean): void;
}
export interface ICollectionOperator<T, V> {
    first(collection: T[], t: V): T | null;
    delete(collection: T[], t: V): void;
    set(collection: T[], t: V, element: T): void;
}
export interface IPathElement extends IIdentifyable, IKey<string> {
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class ErrorBase extends Error {
    constructor(name: string, message?: string);
}
export declare class InitializationError extends ErrorBase {
    constructor(message?: string);
}
export declare class MissingKeyException extends ErrorBase {
    constructor(type: string, message?: string);
}
export declare class IteratorException extends ErrorBase {
    constructor(type: string, message?: string);
}
export declare class ElementException extends ErrorBase {
    constructor(type: string, id: string, message?: string);
}
export declare class SetterException extends ErrorBase {
    constructor(type: string, message?: string);
}
export declare class EnumSetterException extends SetterException {
    constructor(message?: string);
}
export declare class MapperExecption extends ErrorBase {
    constructor(key: string, message: string);
}
export declare class CounterError extends ErrorBase {
    constructor(name: string, message: string);
}
