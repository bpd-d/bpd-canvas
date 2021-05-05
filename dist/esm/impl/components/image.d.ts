import { CanvasImageSetup, CanvasObjectCoordinates, CanvasObjectSetup, ICanvasDrawable, IObjectProperties } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";
/**
 * Creates instance of Image drawable that draws an image on the canvas
 */
export declare class CanvasImage extends CanvasObjectBase<CanvasImageSetup> implements ICanvasDrawable {
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init?: CanvasImageSetup);
    draw(): void;
    getRect(): CanvasObjectCoordinates;
}
