import { adjust, adjustSmallRange, counter, notFalse, getVal, isTrue, pointToString, merge, mergeWithInherits, validator, insert } from "../src/core/functions"
import { MergeObject, MergeObjectExt, ValidatorExample } from "./interfaces";

const title = (fName: string) => {
    return `Tests checking function [${fName}]`;
}

describe(title("adjustSmallRange"), () => {
    it('Does not adjust value is in range - 0...1', () => {
        const value = adjustSmallRange(0.4);
        expect(value).toEqual(0.4);
    })

    it('Does not adjust value is in range - 0...100', () => {
        const value = adjustSmallRange(40);
        expect(value).toEqual(0.4);
    })

    it('Does adjust value lower than 0', () => {
        const value = adjustSmallRange(-200);
        expect(value).toEqual(0);
    })

    it('Does adjust value larger than 100', () => {
        const value = adjustSmallRange(200);
        expect(value).toEqual(1);
    })
})

interface ExampleObject {
    x?: string;
}

describe(title("getVal"), () => {
    it('Gets first value when first exists', () => {
        const v1: ExampleObject = {
            x: "X"
        }
        const v2: ExampleObject = {}
        const result = getVal('x', v1, v2);
        expect(result).toEqual('X');
    })

    it('Gets second value when first does not exist', () => {
        const v1: ExampleObject = {
            x: "X"
        }
        const v2: ExampleObject = {}
        const result = getVal('x', v2, v1);
        expect(result).toEqual('X');
    })

    it('Gets fist value when both exist', () => {
        const v1: ExampleObject = {
            x: "X"
        }
        const v2: ExampleObject = { x: 'Y' }
        const result = getVal('x', v1, v2);
        expect(result).toEqual('X');
    })

    it('Gets undefined when none exists', () => {
        const v1: ExampleObject = {}
        const v2: ExampleObject = {}
        const result = getVal('x', v2, v1);
        expect(result).toBeUndefined();
    })

})


describe(title('adjust'), () => {
    it("Return passed value when it is in range", () => {
        const result = adjust(5, 0, 10);
        expect(result).toEqual(5);
    })

    it("Return minimum value is lower than min", () => {
        const result = adjust(-10, 0, 10);
        expect(result).toEqual(0);
    })

    it("Return maximum when value is larger than max", () => {
        const result = adjust(15, 0, 10);
        expect(result).toEqual(10);
    })
})

describe(title('pointToString'), () => {
    it("Converts proper point", () => {
        const result = pointToString({ x: 1, y: 20 });

        expect(result).toMatch(/x:.*1.*,.*y:.*20.*$/)
    })

    it('Returns dash when value is null', () => {
        const result = pointToString(null);
        expect(result).toEqual('-');
    })
})

describe(title('counter*'), () => {
    it("Increments value", () => {
        const iterator = counter();
        const result1 = iterator.next().value;
        const result2 = iterator.next().value;
        const result3 = iterator.next().value;

        expect(result1).toEqual(1);
        expect(result2).toEqual(2);
        expect(result3).toEqual(3);
    })
})

// describe(title("findAllIndexes"), () => {
//     it('Returns indexes that match callbac', () => {
//         const array = [1, 2, 3, 4, 3, 5];
//         const found = findAllIndexes(array, (item) => item === 3);

//         expect(found.length).toEqual(2);
//         expect(found[0]).toEqual(2);
//         expect(found[1]).toEqual(4);
//     })

//     it('Returns empty list when no item is matching', () => {
//         const array = [1, 2, 3, 4, 3, 5];
//         const found = findAllIndexes(array, (item) => item === 7);

//         expect(found.length).toEqual(0);
//     })
// })

describe(title('falseWhenFalse'), () => {
    it('Returns true when value is different than false', () => {
        const resultU = notFalse();
        const resultN = notFalse(null);
        expect(resultN).toEqual(true);
        expect(resultU).toEqual(true);
    })

    it("Returns true when value is true", () => {
        const result = notFalse(true);
        expect(result).toEqual(true);
    })

    it('Returns false when value is equal false', () => {
        const result = notFalse(false);
        expect(result).toEqual(false);
    })
})

describe(title('isTrue'), () => {
    it('Returns true when value equals true', () => {
        const result = isTrue(true);
        expect(result).toBeTrue();
    })

    it('Return false when value is false', () => {
        const result = isTrue(false);
        expect(result).toBeFalse();
    })

    it("Returns false when value is not defined or null", () => {
        const resU = isTrue();
        const resN = isTrue(null);

        expect(resU).toBeFalse();
        expect(resN).toBeFalse();
    })
})


describe(title('merge'), () => {
    it("Merges two objects, both fill different fields", () => {
        const result = merge<MergeObject>({ a: 'a' }, { b: 'b' })

        expect(result.a).toEqual('a');
        expect(result.b).toEqual('b');
    })

    it("If two objects have the same field, it second is taken", () => {
        const result = merge<MergeObject>({
            a: 'a', b: 'b'
        }, { a: "X" })

        expect(result.a).toEqual('X');
        expect(result.b).toEqual('b');
    })
})

describe(title('mergeWithInherits'), () => {
    it("Merges object child with parent", () => {
        const ext: MergeObjectExt = { a: "a", b: "b", c: "c" };
        const child: MergeObject = { a: "aa", b: 'bb' }
        const result: MergeObjectExt = mergeWithInherits(ext, child);

        expect(result.a).toEqual('aa');
        expect(result.b).toEqual('bb');
        expect(result.c).toEqual('c');
    })


    it("Merges object multiple children with parent", () => {
        const ext: MergeObjectExt = { a: "a", b: "b", c: "c" };
        const child: MergeObject = { a: "aa", b: 'bb' }
        const child2: MergeObject = { a: "aaa", }
        const result: MergeObjectExt = mergeWithInherits(ext, child, child2);

        expect(result.a).toEqual('aaa');
        expect(result.b).toEqual('bb');
        expect(result.c).toEqual('c');
    })

    it("Merges returns copy of parent when there is no children", () => {
        const ext: MergeObjectExt = { a: "a", b: "b", c: "c" };
        const result: MergeObjectExt = mergeWithInherits(ext);

        expect(result.a).toEqual('a');
        expect(result.b).toEqual('b');
        expect(result.c).toEqual('c');
    })
})

describe(title('validator'), () => {
    it("Returns true on proper object", () => {
        const input: ValidatorExample = {
            x: "x",
            y: "y",
        }

        const result = validator(input, ['x', 'y'], (name, type, value) => {
            return type !== 'undefined';
        })
        expect(result).toBeTrue();
    })

    it("Returns false when at least key does not pass condition", () => {
        const input: ValidatorExample = {
            x: "x",
        }
        const result = validator(input, ['x', 'y'], (name, type, value) => {
            console.log(name + " " + type)
            return type !== 'undefined';
        })
        expect(result).toBeFalse();
    })

    it("Returns false when input is not defined", () => {
        const result = validator(undefined, ['x', 'y'], (name, type, value) => {
            return type !== 'undefined';
        })
        expect(result).toBeFalse();
    })

    it("Returns true when keys array is empty", () => {
        const result = validator({ x: 'x' }, [], (name, type, value) => {
            return type !== 'undefined';
        })
        expect(result).toBeTrue();
    })
})

describe(title('insertAt'), () => {
    let arr: number[];

    beforeEach(() => {
        arr = [1, 2, 3]
    })

    it("Adds elements at index 0", () => {
        insert(arr, [5], 0)
        expect(arr[0]).toEqual(5);
    })

    it("Adds elements at index last when no index is provided", () => {
        insert(arr, [5])
        const len = arr.length;
        expect(arr[len - 1]).toEqual(5);
    })

    it("Adds elements at index last when index is lower that 0", () => {
        insert(arr, [5], -2)
        const len = arr.length;
        expect(arr[len - 1]).toEqual(5);
    })

    it("Adds elements at index last when index is larger than collection size", () => {
        insert(arr, [5], 10)
        const len = arr.length;
        expect(arr[len - 1]).toEqual(5);
    })

    it("Adds elements at specific index", () => {
        insert(arr, [5, 6], 1)

        expect(arr[1]).toEqual(5);
        expect(arr[2]).toEqual(6);
    })
})