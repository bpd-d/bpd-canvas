import { CanvasLinearGradientColor, CanvasSourcePattern } from "./colors";
import { CanvasPoint, CanvasObjectCoordinates, IObjectProperties, CanvasObjectSize, TextSetup, AssistantOptions, CanvasImageSetup, CanvasObjectSetup, CanvasPatternDefinition } from "../core/interfaces";
import { CanvasImage } from "./components/image";
import { CanvasPath } from "./components/path";
import { Rectangle } from "./components/rectangle";
import { CanvasText } from "./components/text";
/**
 * Class wrapping up Canvas context
 */
export declare class CanvasAssistant {
    private _canvas;
    private _context;
    private _settings;
    private _mapper;
    private _useGlobalSettingsInComponents;
    constructor(options: AssistantOptions);
    getSetupForComponent(): CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>;
    createPath(startingPoint?: CanvasPoint): CanvasPath;
    createRectangle(coordinates?: CanvasObjectCoordinates): Rectangle;
    createText(setup?: TextSetup): CanvasText;
    /**
     *
     * @param setup
     * @returns
     */
    createImage(setup?: CanvasImageSetup): CanvasImage;
    /**
     * Sets global canvas object properties
     * @param settings
     */
    setGlobalObjectProperties(settings: IObjectProperties): void;
    /**
     * Retrives global object properties
     * @returns object properties
     */
    getGlobalObjectProperties(): IObjectProperties;
    /**
     * Sets global alpha on context
     * @param value alpha value in range 0..1 or 0...100
     */
    setGlobalAlpha(value: number): void;
    /**
     * Sets image smoothing options
     * @param enabled - sets whether smoothing is enabled
     * @param quality - {optional} - set smoothing quality (high, medium, low) - works only when enabled is true
     */
    setImageSmoothing(enabled: boolean, quality?: ImageSmoothingQuality): void;
    /**
     * Invokes orginial getImageData
     * @param coords data size and position
     * @returns ImageData
     */
    getImageData(coords: CanvasObjectCoordinates): ImageData;
    /**
     * Invokes original method putImageData with params.
     *
     * @param imageData - ImageData - data to put
     * @param position - CanvasPoint - position where data shall be put to
     * @param cutCoords - optional - coordinates of ImageData slice
     */
    putImageData(imageData: ImageData, position: CanvasPoint, cutCoords?: CanvasObjectCoordinates): void;
    /**
     * Calls original [ctx.createImageData] with size
     * @param size object size
     */
    createImageData(width: number | ImageData, height?: number): void;
    /**
     * Saves context settings
     */
    save(): void;
    /**
     * Restores previously saved context settings
     */
    restore(): void;
    setCanvasSize(size: CanvasObjectSize): void;
    getCanvasSize(): CanvasObjectSize;
    getContext(): CanvasRenderingContext2D;
    createLinearGradient(options?: CanvasObjectCoordinates): CanvasLinearGradientColor;
    createPattern(options?: CanvasPatternDefinition): CanvasSourcePattern;
    clear(coords?: CanvasObjectCoordinates): void;
}
