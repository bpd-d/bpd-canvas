import { merge } from "./functions";
export class Font {
    constructor(setup) {
        this._setup = {
            unit: 'px'
        };
        if (setup) {
            this.set(setup);
        }
    }
    set(setup) {
        this._setup = merge(this._setup, setup);
        return this;
    }
    setType(type) {
        this._setup.type = type;
        return this;
    }
    setSize(value) {
        this._setup.size = value;
        return this;
    }
    setUnit(value) {
        this._setup.unit = value;
        return this;
    }
    setStyle(style) {
        this._setup.style = style;
        return this;
    }
    asString() {
        var _a;
        let result = [];
        if (this._setup.style) {
            result.push(this._setup.style);
        }
        if (this._setup.size) {
            result.push((this._setup.size + ((_a = this._setup.unit) !== null && _a !== void 0 ? _a : '')));
        }
        if (this._setup.type) {
            result.push(this._setup.type);
        }
        return result.join(' ');
    }
}
