import { IObjectProperties } from "../core/interfaces";
import { MapSetter } from "../core/mapper/interfaces";
import { Mapper } from "../core/mapper/mapper";
import { styleSetter, numberSetter, stringableSetter, enumSetter } from "../core/mapper/setters";

export function lineDashSetter(): MapSetter<CanvasRenderingContext2D> {
    return {
        set(destination: CanvasRenderingContext2D, key: string, value: any) {
            if (Array.isArray(value)) {
                destination.setLineDash(value);
            }
        }
    }
}

export function getMapperDefinition(): Mapper<IObjectProperties, CanvasRenderingContext2D> {
    return new Mapper([
        { key: "strokeStyle", setter: styleSetter() },
        { key: "fillStyle", setter: styleSetter() },
        { key: "strokeWidth", mapTo: 'lineWidth', setter: numberSetter('float') },
        { key: "font", setter: stringableSetter() },
        { key: "mitterLimit", setter: numberSetter('integer') },
        { key: "lineCap", setter: enumSetter(["butt", "round", "square"], 'square') },
        { key: "lineJoin", setter: enumSetter(["bevel", "round", "miter"], 'miter') },
        { key: "lineDashOffset", setter: numberSetter('integer') },
        { key: "lineDash", setter: lineDashSetter() },
        { key: "textAlign", setter: enumSetter(["left", "right", "center", "start", "end"], 'right') },
        { key: "textBaseline", setter: enumSetter(["top", "hanging", "middle", "bottom", "alphabetic", "ideographic"], 'alphabetic') },
        { key: "shadowColor", setter: styleSetter() },
        { key: "shadowOffsetX", setter: numberSetter('float') },
        { key: "shadowOffsetY", setter: numberSetter('float') },
        { key: "shadowBlur", setter: numberSetter('float') },
    ]);
}