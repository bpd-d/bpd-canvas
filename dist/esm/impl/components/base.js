import { merge, notFalse } from "../../core/functions";
import { createKey } from "../statics";
class ElementBase {
    constructor(context) {
        this._context = context;
    }
}
export class CanvasObjectBase extends ElementBase {
    constructor(setup, init, counter) {
        var _a;
        super(setup.context);
        this._global = setup.settings;
        this._settings = Object.assign({}, this._global);
        this._useGlobalSettings = setup.useGlobal;
        this._mapper = setup.mapper;
        this._objectSetup = init;
        this.id = (_a = setup.key) !== null && _a !== void 0 ? _a : createKey(counter);
    }
    set(objectSetup) {
        if (!this._objectSetup) {
            this._objectSetup = Object.assign({}, objectSetup);
            return this;
        }
        merge(this._objectSetup, objectSetup);
        return this;
    }
    fill(flag) {
        this._settings.isFill = notFalse(flag);
        return this;
    }
    stroke(flag) {
        this._settings.isStroke = notFalse(flag);
        return this;
    }
    setSettings(settings) {
        this._settings = merge(this._settings, settings);
        return this;
    }
    getKey() {
        return this.id;
    }
    drawOptions() {
        if (this._settings.isFill) {
            this._context.fill();
        }
        if (this._settings.isStroke) {
            this._context.stroke();
        }
    }
    setStyles(excludedKeys) {
        const settings = [this._settings];
        if (this._useGlobalSettings) {
            settings.push(this._global);
        }
        this._mapper.map(this._context, settings, excludedKeys);
    }
}
