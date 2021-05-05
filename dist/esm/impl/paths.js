import { merge, validator } from "../core/functions";
import { ElementException } from "../core/interfaces";
import { angle360, createKey, } from "./statics";
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
class PathElementBase {
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
export class LineData extends DataBase {
    constructor(...points) {
        super([...points]);
    }
    to(...points) {
        this._data.push(...points);
        return this;
    }
}
export class Line extends PathElementBase {
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
export class CurveData extends DataBase {
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
export class Curve extends PathElementBase {
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
export class ArcData extends DataBase {
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
export class Arc extends PathElementBase {
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
export class BezierCurveData extends DataBase {
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
export class BezierCurve extends PathElementBase {
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
export class QuadraticCurveData extends DataBase {
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
export class QuadraticCurve extends PathElementBase {
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
export class EllipseData extends DataBase {
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
export class Ellipse extends PathElementBase {
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
