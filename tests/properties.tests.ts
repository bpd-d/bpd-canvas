import { ObjectProperties } from '../src/impl/properties';
import { Color } from '../src/impl/colors';

describe("Tests checking class [ObjectProperties] implementing [IObjectPropertiesHelper]", () => {

    let properties: ObjectProperties;
    beforeEach(() => {
        properties = new ObjectProperties();
    })

    it('Checks method [setFillStyle]', () => {
        properties.setFillStyle(new Color('black'));

        const result = properties.get();
        expect(result.fillStyle).toBeDefined();
    })
})