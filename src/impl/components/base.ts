import { merge, notFalse } from "../../core/functions";
import { IFillable, IStrokable, IIdentifyable, IKey, IObjectProperties, CanvasObjectSetup } from "../../core/interfaces";
import { IMapper } from "../../core/mapper/interfaces";
import { createKey } from "../statics";

class ElementBase {
    _context: CanvasRenderingContext2D
    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }
}


export class CanvasObjectBase<T> extends ElementBase implements IFillable, IStrokable, IIdentifyable, IKey<string> {
    protected _settings: IObjectProperties;
    protected _global: IObjectProperties;
    protected _mapper: IMapper<IObjectProperties, CanvasRenderingContext2D>;
    protected _objectSetup: T;
    private _useGlobalSettings: boolean;
    id: string;
    constructor(setup: CanvasObjectSetup<CanvasRenderingContext2D, IObjectProperties>, init: T, counter: string) {
        super(setup.context);
        this._global = setup.settings;
        this._settings = {
            ...this._global
        }
        this._useGlobalSettings = setup.useGlobal;
        this._mapper = setup.mapper;
        this._objectSetup = init;
        this.id = setup.key ?? createKey(counter);
    }

    set(objectSetup: T) {
        if (!this._objectSetup) {
            this._objectSetup = {
                ...objectSetup
            }
            return this;
        }
        merge(this._objectSetup, objectSetup);
        return this;
    }

    fill(flag?: boolean) {
        this._settings.isFill = notFalse(flag);
        return this;
    }

    stroke(flag?: boolean) {
        this._settings.isStroke = notFalse(flag);
        return this;
    }

    setSettings(settings: IObjectProperties) {
        this._settings = merge(this._settings, settings);
        return this;
    }

    getKey(): string {
        return this.id;
    }

    protected drawOptions() {
        if (this._settings.isFill) {
            this._context.fill();
        }

        if (this._settings.isStroke) {
            this._context.stroke();
        }
    }

    protected setStyles(excludedKeys?: string[]) {
        const settings = [this._settings];
        if (this._useGlobalSettings) {
            settings.push(this._global)
        }
        this._mapper.map(this._context, settings, excludedKeys)
    }
}