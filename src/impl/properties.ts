import { merge } from "../core/functions";
import { IGetter, IObjectProperties, IObjectStyle, IStringable, LineCap, LineJoin, TextAlign, TextBaseline } from "../core/interfaces";

export interface IObjectPropertiesHelper {
    set(properties: IObjectProperties): IObjectPropertiesHelper;
    setFillStyle(color: IObjectStyle): IObjectPropertiesHelper;
    setStrokeStyle(color: IObjectStyle): IObjectPropertiesHelper;
    setShadowColor(color: IObjectStyle): IObjectPropertiesHelper;
    setShadow(color: IObjectStyle, offsetX: number, offsetY: number, blur?: number): IObjectPropertiesHelper;
    setFont(font: IStringable): IObjectPropertiesHelper;
    setText(font: IStringable, textAlign: TextAlign, textBaseline: TextBaseline): IObjectPropertiesHelper;
    setStrokeWidth(value: number): IObjectPropertiesHelper;
    setStroke(width?: number, lineJoin?: LineJoin, lineCap?: LineCap, lineDash?: number[], dashOffset?: number, mitterLimit?: number): IObjectPropertiesHelper;
    setStrokeDash(dash: number[], offset?: number): IObjectPropertiesHelper;
    setStrokeDetails(lineJoin: LineJoin, lineCap: LineCap, mitterLimit?: number): IObjectPropertiesHelper;
}

export class ObjectProperties implements IObjectPropertiesHelper, IGetter<IObjectProperties> {
    private _instance: IObjectProperties;
    constructor(properties?: IObjectProperties) {
        this._instance = {};
        if (properties) {
            this.set(properties);
        }
    }

    set(properties: IObjectProperties) {
        this._instance = merge(this._instance, properties);
        return this;
    }

    setFillStyle(style: IObjectStyle) {
        this._instance.fillStyle = style;
        return this;
    }

    setStrokeStyle(style: IObjectStyle) {
        this._instance.strokeStyle = style;
        return this;
    }

    setShadowColor(color: IObjectStyle) {
        this._instance.shadowColor = color
        return this;
    }

    setShadow(color: IObjectStyle, offsetX: number, offsetY: number, blur?: number) {
        return this.set({
            shadowColor: color,
            shadowOffsetX: offsetX,
            shadowOffsetY: offsetY,
            shadowBlur: blur
        })
    }

    setFont(font: IStringable) {
        this._instance.font = font
        return this;
    }

    setText(font: IStringable, textAlign: TextAlign, textBaseline: TextBaseline) {
        return this.set({
            font,
            textAlign,
            textBaseline
        });
    }

    setStrokeWidth(value: number) {
        this._instance.strokeWidth = value;
        return this;
    }

    setStroke(width?: number, lineJoin?: LineJoin, lineCap?: LineCap, lineDash?: number[], dashOffset?: number, mitterLimit?: number) {
        return this.set({
            strokeWidth: width,
            lineDashOffset: dashOffset,
            lineJoin,
            lineCap,
            lineDash,

        })
    }

    setStrokeDash(dash: number[], offset?: number) {
        this._instance.lineDash = dash;
        if (offset)
            this._instance.lineDashOffset = offset;
        return this;
    }

    setStrokeDetails(lineJoin: LineJoin, lineCap: LineCap, mitterLimit?: number) {
        return this.set({
            lineJoin,
            lineCap,
            mitterLimit
        });
    }

    get(): IObjectProperties {
        return this._instance;
    }
}