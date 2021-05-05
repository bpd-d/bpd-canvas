import { merge } from "../core/functions";
export class ObjectProperties {
    constructor(properties) {
        this._instance = {};
        if (properties) {
            this.set(properties);
        }
    }
    set(properties) {
        this._instance = merge(this._instance, properties);
        return this;
    }
    setFillStyle(style) {
        this._instance.fillStyle = style;
        return this;
    }
    setStrokeStyle(style) {
        this._instance.strokeStyle = style;
        return this;
    }
    setShadowColor(color) {
        this._instance.shadowColor = color;
        return this;
    }
    setShadow(color, offsetX, offsetY, blur) {
        return this.set({
            shadowColor: color,
            shadowOffsetX: offsetX,
            shadowOffsetY: offsetY,
            shadowBlur: blur
        });
    }
    setFont(font) {
        this._instance.font = font;
        return this;
    }
    setText(font, textAlign, textBaseline) {
        return this.set({
            font,
            textAlign,
            textBaseline
        });
    }
    setStrokeWidth(value) {
        this._instance.strokeWidth = value;
        return this;
    }
    setStroke(width, lineJoin, lineCap, lineDash, dashOffset, mitterLimit) {
        return this.set({
            strokeWidth: width,
            lineDashOffset: dashOffset,
            lineJoin,
            lineCap,
            lineDash,
        });
    }
    setStrokeDash(dash, offset) {
        this._instance.lineDash = dash;
        if (offset)
            this._instance.lineDashOffset = offset;
        return this;
    }
    setStrokeDetails(lineJoin, lineCap, mitterLimit) {
        return this.set({
            lineJoin,
            lineCap,
            mitterLimit
        });
    }
    get() {
        return this._instance;
    }
}
