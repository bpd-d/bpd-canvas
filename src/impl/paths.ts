import { merge, validator } from "../core/functions";
import { ArcOptions, BezierCurveOptions, CanvasPoint, CurveOptions, ElementException, EllipseOptions, IGetter, IIdentifyable, IKey, IPathElement, ISetter, PathElementOptions, QuadraticCurveOptions } from "../core/interfaces";
import { angle360, createKey, } from "./statics";


function parseOptions<T>(input: PathElementOptions<T> | T | string | undefined): PathElementOptions<T> {
    if (!input) {
        return {
            key: undefined,
            init: undefined
        }
    }
    if (typeof input === 'string') {
        return {
            key: input,
            init: undefined
        }
    }
    if ((<any>input)['init']) {
        return {
            init: (<any>input)['init'],
            key: (<any>input)['key']
        }
    }
    return {
        key: undefined,
        init: <any>input
    }
}

class PathElementBase<T> implements IIdentifyable, IKey<string>, ISetter<T> {
    id: string;
    name: string;
    data: T;
    constructor(name: string, counter: string, init: T, key?: string) {
        this.id = key ?? createKey(counter);
        this.name = name;
        this.data = init;
    }

    /**
     * Retrvies an id of the path element
     * @returns key of the element 
     */
    getKey(): string {
        return this.id;
    }

    /**
     * Sets setup data of the element
     * @param data 
     * @returns 
     */
    set(data: T) {
        this.data = merge(this.data, data);
        return this;
    }

    throw(message: string) {
        throw new ElementException(this.name, this.id, message)
    }

    validateKeys(keys: (keyof T)[]): boolean {
        return validator(this.data, keys, (objectName: string, objectType: string, value: any) => {
            if (objectType === 'undefined') {
                this.throw(`[${objectName}] not defined`);
            }
            if (objectType === 'number' && value < 0) {
                this.throw(`[${objectName}] is not correct`);
            }
            return true;
        })
    }
}

class DataBase<T> implements IGetter<T> {
    protected _data: T;
    constructor(init: T) {
        this._data = init;
    }

    get(): T {
        return this._data;
    }
}

export class LineData extends DataBase<CanvasPoint[]>  {
    constructor(...points: CanvasPoint[]) {
        super([...points])
    }

    to(...points: CanvasPoint[]) {
        this._data.push(...points);
        return this;
    }
}

export class Line extends PathElementBase<CanvasPoint[]> implements IPathElement {
    constructor(options: PathElementOptions<CanvasPoint[]> | CanvasPoint[] | string | undefined) {
        const { init, key } = parseOptions(options)
        super("Line", 'line', init ?? [], key);
    }

    set(data: CanvasPoint[]) {
        this.data = [...data];
        return this;
    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.data.length === 0) {
            this.throw("There are no lines to draw");
        }
        let last = this.data[0];
        this.data.forEach(point => {
            context.lineTo(point.x, point.y)
            last = point;
        })

        return {
            ...last
        }
    }
}

export class CurveData extends DataBase<CurveOptions> {
    constructor(data?: CurveOptions) {
        super(data ?? {});
    }

    to(point: CanvasPoint) {
        this._data.end = point;
        return this;
    }

    corner(point: CanvasPoint) {
        this._data.corner = point;
        return this;
    }

    withRadius(value: number) {
        this._data.radius = value;
        return this;
    }
}


/**
 * Creates curved line
 */
export class Curve extends PathElementBase<CurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<CurveOptions> | CurveOptions | string | undefined) {
        const { init, key } = parseOptions<CurveOptions>(options);
        super("Curve", 'curve', init ?? {}, key)
    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.validateKeys(['corner', 'end', 'radius'])) {
            //@ts-ignore end must be defined
            context.arcTo(this.data.corner.x, this.data.corner.y, this.data.end.x, this.data.end.y, this.data.radius);
            //@ts-ignore end must be defined
            context.lineTo(this.data.end.x, this.data.end.y)
        }
        //@ts-ignore end must be defined
        return {
            ...this.data.end
        }
    }
}

export class ArcData extends DataBase<ArcOptions> {
    constructor(data?: ArcOptions) {
        super(data ?? {
            startAngle: -1,
            endAngle: -1,
            radius: -1
        })
    }

    setStartAngle(value: number) {
        this._data.startAngle = value;
        return this;
    }

    setEndAngle(value: number) {
        this._data.endAngle = value;
        return this;
    }

    setRadius(value: number) {
        this._data.radius = value;
        return this;
    }

}


export class Arc extends PathElementBase<ArcOptions> implements IPathElement {
    constructor(settings: PathElementOptions<ArcOptions> | ArcOptions | string | undefined) {
        const { init, key } = parseOptions(settings)
        super("Arc", 'curve', init ?? {
            startAngle: -1,
            endAngle: -1,
            radius: -1
        }, key);

    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.validateKeys(['endAngle', 'startAngle', 'radius'])) {
            context.arc(from.x, from.y, this.data.radius, this.data.startAngle, this.data.endAngle);
        }

        return {
            ...from
        }
    }
}

export class BezierCurveData extends DataBase<BezierCurveOptions> {
    constructor(init?: BezierCurveOptions) {
        super(init ?? {})
    }

    to(point: CanvasPoint) {
        this._data.end = point;
        return this;
    }

    by(point1: CanvasPoint, point2: CanvasPoint) {
        this._data.controlPoint = point1;
        this._data.controlPoint2 = point2;
        return this;
    }
}

export class BezierCurve extends PathElementBase<BezierCurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<BezierCurveOptions> | BezierCurveOptions | string | undefined) {
        const { init, key } = parseOptions(options)
        super("BezierCurve", 'curve', init ?? {}, key);
    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.validateKeys(['controlPoint2', 'controlPoint', 'end'])) {
            //@ts-ignore end must be defined
            context.bezierCurveTo(this.data.controlPoint.x, this.data.controlPoint.y, this.data.controlPoint2.x, this.data.controlPoint2.y, this.data.end.x, this.data.end.y);
        }


        //@ts-ignore end must be defined
        return {
            ...this.data.end
        }
    }
}

export class QuadraticCurveData extends DataBase<QuadraticCurveOptions> {
    constructor(init?: QuadraticCurveOptions) {
        super(init ?? {})
    }

    to(point: CanvasPoint) {
        this._data.end = point;
        return this;
    }

    by(point: CanvasPoint) {
        this._data.controlPoint = point;
        return this;
    }
}

export class QuadraticCurve extends PathElementBase<QuadraticCurveOptions> implements IPathElement {
    constructor(options: PathElementOptions<QuadraticCurveOptions> | QuadraticCurveOptions | string | undefined) {
        const { init, key } = parseOptions(options)
        super("QuadraticCurve", 'curve', init ?? {}, key);
    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.validateKeys(['controlPoint', 'end'])) {
            //@ts-ignore end must be defined
            context.quadraticCurveTo(this.data.controlPoint.x, this.data.controlPoint.y, this.data.end.x, this.data.end.y);
        }

        //@ts-ignore end must be defined
        return {
            ...this.data.end
        }
    }
}

export class EllipseData extends DataBase<EllipseOptions> {
    constructor(init?: EllipseOptions) {
        super(init ?? {
            rotation: 0,
            startAngle: 0,
            endAngle: angle360
        });
    }

    setRadius(x: number, y?: number) {
        this._data.radiusX = x;
        this._data.radiusY = y ?? x;
        return this;

    }

    setAngles(start: number, end: number) {
        this._data.startAngle = start;
        this._data.endAngle = end;
        return this;
    }

    setRotation(rotation: number) {
        this._data.rotation = rotation
        return this;
    }
}


export class Ellipse extends PathElementBase<EllipseOptions> implements IPathElement {
    constructor(options: PathElementOptions<EllipseOptions> | EllipseOptions | string | undefined) {
        const { init, key } = parseOptions(options)
        super("Ellipse", 'ellipse', init ?? {}, key);
    }

    build(context: CanvasRenderingContext2D, from: CanvasPoint): CanvasPoint {
        if (this.validateKeys(['startAngle', 'endAngle', "radiusX", 'radiusY', 'rotation'])) {
            //@ts-ignore props must be defined
            context.ellipse(from.x, from.y, this.data.radiusX, this.data.radiusY, this.data.rotation, this.data.startAngle, this.data.endAngle);
        }
        return {
            ...from
        }
    }
}
