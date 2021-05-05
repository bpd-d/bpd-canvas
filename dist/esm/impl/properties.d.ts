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
export declare class ObjectProperties implements IObjectPropertiesHelper, IGetter<IObjectProperties> {
    private _instance;
    constructor(properties?: IObjectProperties);
    set(properties: IObjectProperties): this;
    setFillStyle(style: IObjectStyle): this;
    setStrokeStyle(style: IObjectStyle): this;
    setShadowColor(color: IObjectStyle): this;
    setShadow(color: IObjectStyle, offsetX: number, offsetY: number, blur?: number): this;
    setFont(font: IStringable): this;
    setText(font: IStringable, textAlign: TextAlign, textBaseline: TextBaseline): this;
    setStrokeWidth(value: number): this;
    setStroke(width?: number, lineJoin?: LineJoin, lineCap?: LineCap, lineDash?: number[], dashOffset?: number, mitterLimit?: number): this;
    setStrokeDash(dash: number[], offset?: number): this;
    setStrokeDetails(lineJoin: LineJoin, lineCap: LineCap, mitterLimit?: number): this;
    get(): IObjectProperties;
}
