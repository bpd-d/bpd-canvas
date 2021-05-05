import { ISetter, IStringable } from "./interfaces";
export interface FontSetup {
    style?: 'italic' | "normal";
    size?: number;
    unit?: string;
    type?: string;
}
export declare class Font implements IStringable, ISetter<FontSetup> {
    private _setup;
    constructor(setup?: FontSetup);
    set(setup: FontSetup): Font;
    setType(type: string): this;
    setSize(value: number): this;
    setUnit(value: string): this;
    setStyle(style: 'normal' | 'italic'): this;
    asString(): string;
}
