import { CanvasPoint, ICanvasDrawable, IPathElement, CanvasObjectSetup, IObjectProperties, CanvasObjectCoordinates } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";
/**
 * Draws path on canvas. Path always consists of path elements
 */
export declare class CanvasPath extends CanvasObjectBase<CanvasPoint> implements ICanvasDrawable {
    _isClosePath: boolean;
    _moveBeforeBuild: boolean;
    private _paths;
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init?: CanvasPoint);
    from(point: CanvasPoint): this;
    add(...elements: IPathElement[]): this;
    doNotMoveBeforeBuild(): this;
    get(index: number): IPathElement | null;
    delete(key: number): void;
    insertAt(index: number, ...paths: IPathElement[]): this;
    setAt(index: number, element: IPathElement): this;
    close(flag?: boolean): void;
    draw(): void;
    getRect(): CanvasObjectCoordinates;
}
