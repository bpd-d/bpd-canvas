import { insert, notFalse } from "../../core/functions";
import { ElementException } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";
/**
 * Draws path on canvas. Path always consists of path elements
 */
export class CanvasPath extends CanvasObjectBase {
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
