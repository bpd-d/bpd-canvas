import { CanvasObjectCoordinates, ICanvasDrawable, CanvasObjectSetup, IObjectProperties, CanvasPoint, CanvasObjectSize } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";
/**
 * Creates instance of rectangle drawable
 */
export declare class Rectangle extends CanvasObjectBase<CanvasObjectCoordinates> implements ICanvasDrawable {
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init?: CanvasObjectCoordinates);
    setPosition(point: CanvasPoint): void;
    setSize(size: CanvasObjectSize): void;
    draw(): void;
    getRect(): CanvasObjectCoordinates;
}
