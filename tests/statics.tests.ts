import { createKey } from '../src/impl/statics';

describe("Tests checking [createKey]", () => {
    it("Creates key with proper counter", () => {
        const result = createKey('line');

        expect(result).toMatch(/line_\d+$/)
    })

    it("Throws an exception when counter does not exist", () => {
        let err = false;
        try {
            createKey('xx');
        } catch (e) {
            err = true;
        }

        expect(err).toBeTrue();
    })
})