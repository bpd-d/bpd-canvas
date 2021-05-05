import { CanvasObjectBase } from "./base";
/**
 * Creates instance of text that will be drawn on on canvas
 */
export class CanvasText extends CanvasObjectBase {
    constructor(setup, init) {
        super(setup, init !== null && init !== void 0 ? init : {}, 'text');
        this._settings.isFill = true;
        if (!this._objectSetup) {
            this._objectSetup = {};
        }
    }
    setFont(font) {
        this._settings.font = font;
        return this;
    }
    isValid() {
        if (!this._objectSetup) {
            return false;
        }
        if (!this._objectSetup.text || this._objectSetup.text.length === 0) {
            return false;
        }
        if (!this._objectSetup.position) {
            return false;
        }
        return true;
    }
    draw() {
        if (!this.isValid()) {
            return;
        }
        this.setStyles();
        if (this._settings.isFill) {
            //@ts-ignore all objectSetup fields were checked in isValid
            this._context.fillText(this._objectSetup.text, this._objectSetup.position.x, this._objectSetup.position.y);
        }
        if (this._settings.isStroke) {
            //@ts-ignore all objectSetup fields were checked in isValid
            this._context.strokeText(this._objectSetup.text, this._objectSetup.position.x, this._objectSetup.position.y);
        }
    }
    getRect() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }
}
