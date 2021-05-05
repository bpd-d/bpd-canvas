import { merge } from "./functions";
import { ISetter, IStringable } from "./interfaces";

export interface FontSetup {
    style?: 'italic' | "normal";
    size?: number;
    unit?: string;
    type?: string;
}

export class Font implements IStringable, ISetter<FontSetup> {
    private _setup: FontSetup;
    constructor(setup?: FontSetup) {
        this._setup = {
            unit: 'px'
        };
        if (setup) {
            this.set(setup)
        }
    }

    set(setup: FontSetup): Font {
        this._setup = merge(this._setup, setup);
        return this;
    }

    setType(type: string) {
        this._setup.type = type;
        return this;
    }

    setSize(value: number) {
        this._setup.size = value;
        return this;
    }

    setUnit(value: string) {
        this._setup.unit = value;
        return this;
    }

    setStyle(style: 'normal' | 'italic') {
        this._setup.style = style;
        return this;
    }

    asString(): string {
        let result = [];
        if (this._setup.style) {
            result.push(this._setup.style)
        }
        if (this._setup.size) {
            result.push((this._setup.size + (this._setup.unit ?? '')))
        }
        if (this._setup.type) {
            result.push(this._setup.type)
        }

        return result.join(' ');
    }

}