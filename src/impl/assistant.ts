import { CanvasLinearGradientColor, CanvasSourcePattern } from "./colors";
import { adjustSmallRange, notFalse, merge } from "../core/functions";
import { CanvasPoint, InitializationError, CanvasObjectCoordinates, IObjectProperties, CanvasObjectSize, TextSetup, AssistantOptions, CanvasImageSetup, CanvasObjectSetup, CanvasPatternDefinition, IObjectStyle } from "../core/interfaces";
import { getMapperDefinition } from "./mapper";
import { IMapper } from "../core/mapper/interfaces";
import { CanvasImage } from "./components/image";
import { CanvasPath } from "./components/path";
import { Rectangle } from "./components/rectangle";
import { CanvasText } from "./components/text";

function getWholeCanvasCoords(canvas: HTMLCanvasElement): CanvasObjectCoordinates {
    return { x: 0, y: 0, width: canvas.width, height: canvas.height }
}

function prepareCanvasObjectSetup<T, V, K>(context: T, settings: V, mapper: IMapper<V, T>, useGlobal: boolean, setup?: K, key?: string): CanvasObjectSetup<T, V> {
    return {
        context,
        settings,
        mapper,
        useGlobal,
        key
    }
}

/**
 * Class wrapping up Canvas context
 */
export class CanvasAssistant {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _settings: IObjectProperties;
    private _mapper: IMapper<IObjectProperties, CanvasRenderingContext2D>;
    private _useGlobalSettingsInComponents: boolean;
    constructor(options: AssistantOptions) {
        this._canvas = options.canvas;
        const context = this._canvas.getContext('2d', {
            alpha: options.alpha,
            desynchronized: options.desynchronized
        });
        if (!context) {
            throw new InitializationError("Context was not initialized")
        }
        this._settings = options.settings ?? {}
        this._useGlobalSettingsInComponents = notFalse(options.useGlobalSettings);
        this._mapper = getMapperDefinition();

        this._context = context
        if (options.size) {
            this.setCanvasSize(options.size)
        }
    }

    getSetupForComponent(): CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties> {
        return prepareCanvasObjectSetup(this._context, this._settings, this._mapper, this._useGlobalSettingsInComponents)
    }

    createPath(startingPoint?: CanvasPoint) {
        return new CanvasPath(this.getSetupForComponent(), startingPoint);
    }

    createRectangle(coordinates?: CanvasObjectCoordinates) {
        return new Rectangle(this.getSetupForComponent(), coordinates);
    }

    createText(setup?: TextSetup) {
        return new CanvasText(this.getSetupForComponent(), setup);
    }

    /**
     * 
     * @param setup 
     * @returns 
     */
    createImage(setup?: CanvasImageSetup): CanvasImage {
        return new CanvasImage(this.getSetupForComponent(), setup)
    }

    /**
     * Sets global canvas object properties
     * @param settings 
     */
    setGlobalObjectProperties(settings: IObjectProperties) {
        this._settings = merge(this._settings, settings);
    }

    /**
     * Retrives global object properties
     * @returns object properties
     */
    getGlobalObjectProperties(): IObjectProperties {
        return this._settings;
    }

    /**
     * Sets global alpha on context
     * @param value alpha value in range 0..1 or 0...100
     */
    setGlobalAlpha(value: number) {
        this._context.globalAlpha = adjustSmallRange(value);
    }

    /**
     * Sets image smoothing options
     * @param enabled - sets whether smoothing is enabled
     * @param quality - {optional} - set smoothing quality (high, medium, low) - works only when enabled is true
     */
    setImageSmoothing(enabled: boolean, quality?: ImageSmoothingQuality) {
        this._context.imageSmoothingEnabled = enabled;
        if (quality && enabled)
            this._context.imageSmoothingQuality = quality;
    }

    /**
     * Invokes orginial getImageData
     * @param coords data size and position
     * @returns ImageData
     */
    getImageData(coords: CanvasObjectCoordinates) {
        return this._context.getImageData(coords.x, coords.y, coords.width, coords.height);
    }


    /**
     * Invokes original method putImageData with params.
     * 
     * @param imageData - ImageData - data to put
     * @param position - CanvasPoint - position where data shall be put to
     * @param cutCoords - optional - coordinates of ImageData slice 
     */
    putImageData(imageData: ImageData, position: CanvasPoint, cutCoords?: CanvasObjectCoordinates) {
        if (cutCoords) {
            this._context.putImageData(imageData, position.x, position.y, cutCoords.x, cutCoords.y, cutCoords.width, cutCoords.height)
            return;
        }
        this._context.putImageData(imageData, position.x, position.y);
    }

    /**
     * Calls original [ctx.createImageData] with size
     * @param size object size
     */
    createImageData(width: number | ImageData, height?: number) {
        if (typeof width === 'number') {
            this._context.createImageData(width, height ?? 0);
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

    setCanvasSize(size: CanvasObjectSize) {
        this._canvas.width = size.width;
        this._canvas.height = size.height;
    }

    getCanvasSize(): CanvasObjectSize {
        return {
            width: this._canvas.width,
            height: this._canvas.height
        }
    }

    getContext(): CanvasRenderingContext2D {
        return this._context;
    }

    createLinearGradient(options?: CanvasObjectCoordinates): CanvasLinearGradientColor {
        return new CanvasLinearGradientColor(this._context, options);
    }

    createPattern(options?: CanvasPatternDefinition): CanvasSourcePattern {
        return new CanvasSourcePattern(this._context, options);
    }

    clear(coords?: CanvasObjectCoordinates) {
        let co = coords ?? getWholeCanvasCoords(this._canvas)
        this._context.clearRect(co.x, co.y, co.width, co.height);
    }
}