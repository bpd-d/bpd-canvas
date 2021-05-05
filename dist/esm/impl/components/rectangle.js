import { mergeWithInherits } from "../../core/functions";
import { CanvasObjectBase } from "./base";
/**
 * Creates instance of rectangle drawable
 */
export class Rectangle extends CanvasObjectBase {
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
