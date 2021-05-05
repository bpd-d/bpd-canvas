import { CanvasImageSetup, CanvasObjectCoordinates, CanvasObjectSetup, ICanvasDrawable, IObjectProperties } from "../../core/interfaces";
import { CanvasObjectBase } from "./base";

/**
 * Creates instance of Image drawable that draws an image on the canvas
 */
export class CanvasImage extends CanvasObjectBase<CanvasImageSetup> implements ICanvasDrawable {
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init?: CanvasImageSetup) {
        super(setup, init ?? {}, 'image');
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
            this._context.drawImage(this._objectSetup.source,
                this._objectSetup.imageSlice.x, this._objectSetup.imageSlice.y, this._objectSetup.imageSlice.width, this._objectSetup.imageSlice.height,
                this._objectSetup.desitnationCoords.x, this._objectSetup.desitnationCoords.y, this._objectSetup.desitnationCoords.width, this._objectSetup.desitnationCoords.height,
            )
        }
    }

    getRect(): CanvasObjectCoordinates {
        const w = <number>this._objectSetup.source?.width ?? 0;
        const h = <number>this._objectSetup.source?.height ?? 0;
        return {
            x: 0,
            y: 0,
            width: w,
            height: h
        }
    }
}