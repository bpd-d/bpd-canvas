import { CanvasLinearGradientColor, CanvasSourcePattern } from "./colors";
import { adjustSmallRange, notFalse, merge } from "../core/functions";
import { InitializationError } from "../core/interfaces";
import { getMapperDefinition } from "./mapper";
import { CanvasImage } from "./components/image";
import { CanvasPath } from "./components/path";
import { Rectangle } from "./components/rectangle";
import { CanvasText } from "./components/text";
function getWholeCanvasCoords(canvas) {
    return { x: 0, y: 0, width: canvas.width, height: canvas.height };
}
function prepareCanvasObjectSetup(context, settings, mapper, useGlobal, setup, key) {
    return {
        context,
        settings,
        mapper,
        useGlobal,
        key
    };
}
/**
 * Class wrapping up Canvas context
 */
export class CanvasAssistant {
    constructor(options) {
        var _a;
        this._canvas = options.canvas;
        const context = this._canvas.getContext('2d', {
            alpha: options.alpha,
            desynchronized: options.desynchronized
        });
        if (!context) {
            throw new InitializationError("Context was not initialized");
        }
        this._settings = (_a = options.settings) !== null && _a !== void 0 ? _a : {};
        this._useGlobalSettingsInComponents = notFalse(options.useGlobalSettings);
        this._mapper = getMapperDefinition();
        this._context = context;
        if (options.size) {
            this.setCanvasSize(options.size);
        }
    }
    getSetupForComponent() {
        return prepareCanvasObjectSetup(this._context, this._settings, this._mapper, this._useGlobalSettingsInComponents);
    }
    createPath(startingPoint) {
        return new CanvasPath(this.getSetupForComponent(), startingPoint);
    }
    createRectangle(coordinates) {
        return new Rectangle(this.getSetupForComponent(), coordinates);
    }
    createText(setup) {
        return new CanvasText(this.getSetupForComponent(), setup);
    }
    /**
     *
     * @param setup
     * @returns
     */
    createImage(setup) {
        return new CanvasImage(this.getSetupForComponent(), setup);
    }
    /**
     * Sets global canvas object properties
     * @param settings
     */
    setGlobalObjectProperties(settings) {
        this._settings = merge(this._settings, settings);
    }
    /**
     * Retrives global object properties
     * @returns object properties
     */
    getGlobalObjectProperties() {
        return this._settings;
    }
    /**
     * Sets global alpha on context
     * @param value alpha value in range 0..1 or 0...100
     */
    setGlobalAlpha(value) {
        this._context.globalAlpha = adjustSmallRange(value);
    }
    /**
     * Sets image smoothing options
     * @param enabled - sets whether smoothing is enabled
     * @param quality - {optional} - set smoothing quality (high, medium, low) - works only when enabled is true
     */
    setImageSmoothing(enabled, quality) {
        this._context.imageSmoothingEnabled = enabled;
        if (quality && enabled)
            this._context.imageSmoothingQuality = quality;
    }
    /**
     * Invokes orginial getImageData
     * @param coords data size and position
     * @returns ImageData
     */
    getImageData(coords) {
        return this._context.getImageData(coords.x, coords.y, coords.width, coords.height);
    }
    /**
     * Invokes original method putImageData with params.
     *
     * @param imageData - ImageData - data to put
     * @param position - CanvasPoint - position where data shall be put to
     * @param cutCoords - optional - coordinates of ImageData slice
     */
    putImageData(imageData, position, cutCoords) {
        if (cutCoords) {
            this._context.putImageData(imageData, position.x, position.y, cutCoords.x, cutCoords.y, cutCoords.width, cutCoords.height);
            return;
        }
        this._context.putImageData(imageData, position.x, position.y);
    }
    /**
     * Calls original [ctx.createImageData] with size
     * @param size object size
     */
    createImageData(width, height) {
        if (typeof width === 'number') {
            this._context.createImageData(width, height !== null && height !== void 0 ? height : 0);
            return;
        }
        this._context.createImageData(width);
    }
    /**
     * Saves context settings
     */
    save() {
        this._context.save();
    }
    /**
     * Restores previously saved context settings
     */
    restore() {
        this._context.restore();
    }
    setCanvasSize(size) {
        this._canvas.width = size.width;
        this._canvas.height = size.height;
    }
    getCanvasSize() {
        return {
            width: this._canvas.width,
            height: this._canvas.height
        };
    }
    getContext() {
        return this._context;
    }
    createLinearGradient(options) {
        return new CanvasLinearGradientColor(this._context, options);
    }
    createPattern(options) {
        return new CanvasSourcePattern(this._context, options);
    }
    clear(coords) {
        let co = coords !== null && coords !== void 0 ? coords : getWholeCanvasCoords(this._canvas);
        this._context.clearRect(co.x, co.y, co.width, co.height);
    }
}
