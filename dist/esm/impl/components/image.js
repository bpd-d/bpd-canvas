import { CanvasObjectBase } from "./base";
/**
 * Creates instance of Image drawable that draws an image on the canvas
 */
export class CanvasImage extends CanvasObjectBase {
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
