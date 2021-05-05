import { ArcOptions, BezierCurveOptions, CanvasPoint, CurveOptions, EllipseOptions, IGetter, IIdentifyable, IKey, IPathElement, ISetter, PathElementOptions, QuadraticCurveOptions } from "../core/interfaces";
declare class PathElementBase<T> implements IIdentifyable, IKey<string>, ISetter<T> {
    id: string;
    name: string;
    data: T;
    constructor(name: string, counter: string, init: T, key?: string);
    /**
     * Retrvies an id of the path element
     * @returns key of the element
     */
    getKey(): string;
    /**
     * Sets setup data of the element
     * @param data
     * @returns
     */
    set(data: T): this;
    throw(message: string): void;
    validateKeys(keys: (keyof T)[]): boolean;
}
declare class DataBase<T> implements IGetter<T> {
    protected _data: T;
    constructor(init: T);
    get(): T;
}
export declare class LineData extends DataBase<CanvasPoint[]> {
    constructor(...points: CanvasPoint[]);
    to(...points: CanvasPoint[]): this;
}
export declare class Line extends PathElementBase<CanvasPoint[]> implements IPathElement {
    constructor(options: PathElementOptions<CanvasPoint[]> | CanvasPoint[] | string | undefined);
    set(data: CanvasPoint[]): this;
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class CurveData extends DataBase<CurveOptions> {
    constructor(data?: CurveOptions);
    to(point: CanvasPoint): this;
    corner(point: CanvasPoint): this;
    withRadius(value: number): this;
}
/**
 * Creates curved line
 */
export declare class Curve extends PathElementBase<CurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<CurveOptions> | CurveOptions | string | undefined);
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class ArcData extends DataBase<ArcOptions> {
    constructor(data?: ArcOptions);
    setStartAngle(value: number): this;
    setEndAngle(value: number): this;
    setRadius(value: number): this;
}
export declare class Arc extends PathElementBase<ArcOptions> implements IPathElement {
    constructor(settings: PathElementOptions<ArcOptions> | ArcOptions | string | undefined);
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class BezierCurveData extends DataBase<BezierCurveOptions> {
    constructor(init?: BezierCurveOptions);
    to(point: CanvasPoint): this;
    by(point1: CanvasPoint, point2: CanvasPoint): this;
}
export declare class BezierCurve extends PathElementBase<BezierCurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<BezierCurveOptions> | BezierCurveOptions | string | undefined);
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class QuadraticCurveData extends DataBase<QuadraticCurveOptions> {
    constructor(init?: QuadraticCurveOptions);
    to(point: CanvasPoint): this;
    by(point: CanvasPoint): this;
}
export declare class QuadraticCurve extends PathElementBase<QuadraticCurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<QuadraticCurveOptions> | QuadraticCurveOptions | string | undefined);
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export declare class EllipseData extends DataBase<EllipseOptions> {
    constructor(init?: EllipseOptions);
    setRadius(x: number, y?: number): this;
    setAngles(start: number, end: number): this;
    setRotation(rotation: number): this;
}
export declare class Ellipse extends PathElementBase<EllipseOptions> implements IPathElement {
    constructor(options: PathElementOptions<EllipseOptions> | EllipseOptions | string | undefined);
    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint;
}
export {};
