import { Mapper } from '../src/core/mapper/mapper';

interface DestinationObject {
    x: string;
    y: number;
    z: boolean;
    x1: string;
}

interface InputObject {
    a?: string;
    y?: number;
    c?: boolean;
}

describe("Checks implementation of [Mapper]", () => {
    let mapper: Mapper<InputObject, DestinationObject>;
    let destination: DestinationObject;

    beforeEach(() => {
        destination = {
            x: "x",
            y: 1,
            z: false,
            x1: "x1"
        }

        mapper = new Mapper([
            { key: 'a', mapTo: 'x' },
            { key: 'y', },
            { key: 'c', mapTo: 'z' },
        ])
    })

    it("Basic check of [map]", () => {
        let input: InputObject = {
            a: "a",
            y: -1,
            c: true
        }

        mapper.map(destination, [input]);

        expect(destination.x).toEqual('a');
        expect(destination.y).toEqual(-1);
        expect(destination.z).toBeTrue();
        expect(destination.x1).toEqual('x1');
    })

    it("Basic check of [map] - multiple objects", () => {
        let input: InputObject = {
            a: "a",
            c: true
        }

        let input2: InputObject = {
            a: "b",
            y: -1,
        }

        mapper.map(destination, [input, input2]);

        expect(destination.x).toEqual('a');
        expect(destination.y).toEqual(-1);
        expect(destination.z).toBeTrue();
        expect(destination.x1).toEqual('x1');
    })

    it("Basic check of [map] - don't update value with empty", () => {
        let input: InputObject = {
            a: "a",
            c: true
        }

        let input2: InputObject = {
            a: "b",
        }

        mapper.map(destination, [input, input2]);

        expect(destination.y).toEqual(1);
    })

    it("Basic check of [map] - exclude keys", () => {
        let input: InputObject = {
            a: "a",
            c: true
        }

        let input2: InputObject = {
            a: "b",
            c: true
        }

        mapper.map(destination, [input, input2], ['a']);

        expect(destination.x).toEqual('x');
    })
})
