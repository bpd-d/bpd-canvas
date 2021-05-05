import { IFillable, IStrokable, IIdentifyable, IKey, IObjectProperties, CanvasObjectSetup } from "../../core/interfaces";
import { IMapper } from "../../core/mapper/interfaces";
declare class ElementBase {
    _context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D);
}
export declare class CanvasObjectBase<T> extends ElementBase implements IFillable, IStrokable, IIdentifyable, IKey<string> {
    protected _settings: IObjectProperties;
    protected _global: IObjectProperties;
    protected _mapper: IMapper<IObjectProperties, CanvasRenderingContext2D>;
    protected _objectSetup: T;
    private _useGlobalSettings;
    id: string;
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init: T, counter: string);
    set(objectSetup: T): this;
    fill(flag?: boolean): this;
    stroke(flag?: boolean): this;
    setSettings(settings: IObjectProperties): this;
    getKey(): string;
    protected drawOptions(): void;
    protected setStyles(excludedKeys?: string[]): void;
}
export {};
