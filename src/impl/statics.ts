import { counter } from "../core/functions";
import { IteratorException } from "../core/interfaces";

export const angle360: number = Math.PI * 2;

const counters: Map<string, Iterator<number>> = new Map([
    ['line', counter()],
    ['rect', counter()],
    ['path', counter()],
    ['curve', counter()],
    ['text', counter()],
    ['ellipse', counter()],
    ['image', counter()],
]);

export function createKey(counter: string, alternate?: string): string {
    const iterator = counters.get(counter);
    if (!iterator) {
        throw new IteratorException(counter, "Iterator for counter has not been found");
    }
    const entry = iterator.next();
    if (entry.done) {
        throw new IteratorException(counter, "Iterator is done");
    }
    return `${alternate ?? counter}_${entry.value}`
}


