import { TextSetup, ICanvasDrawable, ISetter, CanvasObjectSetup, IObjectProperties, IStringable, CanvasObjectCoordinates } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";
/**
 * Creates instance of text that will be drawn on on canvas
 */
export declare class CanvasText extends CanvasObjectBase<TextSetup> implements ICanvasDrawable, ISetter<TextSetup> {
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init?: TextSetup);
    setFont(font: IStringable): this;
    isValid(): boolean;
    draw(): void;
    getRect(): CanvasObjectCoordinates;
}
