import { IObjectStyle, IStringable } from "../src/core/interfaces";
import { MapSetter } from "../src/core/mapper/interfaces";
import { baseSet, boolSetter, enumSetter, numberSetter, stringableSetter, styleSetter } from "../src/core/mapper/setters";

interface DestObject<T> {
    x: T;
}


describe("Tests checking setter [baseSet]", () => {
    let destination: DestObject<string>;

    beforeEach(() => {
        destination = {
            x: 'x'
        }
    })

    it('Base check', () => {
        baseSet(destination, 'x', 'xx');
        expect(destination.x).toEqual('xx')
    })

    it('Base check - ignore function passed as value', () => {
        baseSet(destination, 'x', () => { return 'xx' });
        expect(destination.x).toEqual('x')
    })
})

describe("Tests checking setter [boolSetter]", () => {
    let destination: DestObject<boolean>;
    let setter: MapSetter<DestObject<boolean>> = boolSetter();

    beforeEach(() => {
        destination = {
            x: false
        }
    })

    it('Base check - bool value', () => {
        setter.set(destination, 'x', true);

        expect(destination.x).toBeTrue();
    })

    it('Base check - number positive value', () => {
        setter.set(destination, 'x', 1);
        expect(destination.x).toBeTrue();
    })

    it('Base check - number negative value', () => {
        setter.set(destination, 'x', -1);
        expect(destination.x).toBeFalse();
    })

    it('Base check - string positive value', () => {
        setter.set(destination, 'x', 'y');
        expect(destination.x).toBeTrue();
    })

    it('Base check - string negative value', () => {
        setter.set(destination, 'x', 'f');
        expect(destination.x).toBeFalse();
    })

    it('Base check - undefined', () => {
        setter.set(destination, 'x', undefined);
        expect(destination.x).toBeFalse();
    })
})

describe("Tests checking setter [styleSetter]", () => {
    let destination: DestObject<string>;
    let setter: MapSetter<DestObject<string>> = styleSetter();
    beforeEach(() => {
        destination = {
            x: 'x'
        }
    })

    it('Base check', () => {
        let input: IObjectStyle = {
            toStyle: () => {
                return "XX";
            }
        }
        setter.set(destination, 'x', input);
        expect(destination.x).toEqual('XX')
    })

    it('Base check - throw error when setting incorrect value', () => {
        let errr = false;
        try {
            setter.set(destination, 'x', 'xxx');
        } catch (e) {
            errr = true;
        }

        expect(destination.x).toEqual('x');
        expect(errr).toBeTrue();
    })
})

describe("Tests checking setter [numberSetter]", () => {
    let destination: DestObject<number>;
    let setter: MapSetter<DestObject<number>>
    beforeEach(() => {
        setter = numberSetter('integer');
        destination = {
            x: 1
        }
    })

    it('Base check - integer', () => {
        setter.set(destination, 'x', 2);
        expect(destination.x).toEqual(2);
    })

    it('Base check - integer and float passed', () => {
        setter.set(destination, 'x', 2.5);
        expect(destination.x).toEqual(2);
    })

    it('Base check - floats', () => {
        setter = numberSetter('float');
        setter.set(destination, 'x', 2.5);
        expect(destination.x).toEqual(2.5);
    })

    it('Pass number in a format of string', () => {
        setter.set(destination, 'x', '20');
        expect(destination.x).toEqual(20);
    })

    it('Pass not number and add default', () => {
        setter = numberSetter('integer', 5);
        setter.set(destination, 'x', 'xxx');
        expect(destination.x).toEqual(5);
    })

    it('Pass not number and without default - throw an error', () => {
        let err = false;
        try {
            setter.set(destination, 'x', 'xxx');
        } catch (e) {
            err = true
        }

        expect(destination.x).toEqual(1);
        expect(err).toBeTrue();
    })
})

describe("Tests checking setter [stringableSetter]", () => {
    let destination: DestObject<string>;
    let setter: MapSetter<DestObject<string>>;
    beforeEach(() => {
        setter = stringableSetter();
        destination = {
            x: "x"
        }
    })

    it('Base check', () => {
        const input: IStringable = {
            asString: () => {
                return "y";
            }
        }
        setter.set(destination, 'x', input);
        expect(destination.x).toEqual('y');
    })

    it('Base check - use plain string', () => {
        setter.set(destination, 'x', 'xx');
        expect(destination.x).toEqual('xx');
    })

    it('Throw an error if input type is wrong', () => {
        let err = false;
        try {
            setter.set(destination, 'x', 222);
        } catch (e) {
            err = true
        }

        expect(destination.x).toEqual('x');
        expect(err).toBeTrue();
    })


})

describe("Tests checking setter [enumSetter]", () => {
    let destination: DestObject<string>;
    let setter: MapSetter<DestObject<string>>;
    beforeEach(() => {
        setter = enumSetter(['x', 'a', 'v']);
        destination = {
            x: "x"
        }
    })

    it('Base check', () => {
        setter.set(destination, 'x', 'a');
        expect(destination.x).toEqual('a');
    })

    it('Base check - use default when value does not match', () => {
        setter = enumSetter(['x', 'a', 'v'], 'v');
        setter.set(destination, 'x', 'xx');
        expect(destination.x).toEqual('v');
    })

    it('Do not set value when not matching and no default', () => {
        setter.set(destination, 'x', 'b');
        expect(destination.x).toEqual('x');
    })
})