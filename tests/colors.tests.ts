import { Color, HslColor, RgbColor } from '../src/impl/colors';

describe("Test checking colors implementation [Color]", () => {
    it('Checks base case', () => {
        const color = new Color("xx");
        const output = color.asString();

        expect(output).toEqual('xx');

    })

    it('Checks base case - get', () => {
        const color = new Color("xx");
        const output = color.get();
        expect(output).toEqual('xx');

    })

    it('Checks base case - set updates', () => {
        const color = new Color("xx");
        color.set("YY")
        const output = color.asString();
        expect(output).toEqual('YY');
    })
})


describe("Test checking colors implementation [RgbColor]", () => {
    it('Checks base case', () => {
        const color = new RgbColor({ red: 200, green: 100, blue: 20, alpha: 0.1 });
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.1\)$/);

    })

    it('Checks base case - setBlue', () => {
        const color = new RgbColor({ red: 200, green: 100, alpha: 0.1 });
        color.setBlue(20)
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.1\)$/);

    })

    it('Checks base case - setGreen', () => {
        const color = new RgbColor({ red: 200, blue: 20, alpha: 0.1 });
        color.setGreen(100)
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.1\)$/);

    })

    it('Checks base case - setRed', () => {
        const color = new RgbColor({ green: 100, blue: 20, alpha: 0.1 });
        color.setRed(200)
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.1\)$/);
    })


    it('Checks base case - setAlpha 0...100', () => {
        const color = new RgbColor({ red: 200, green: 100, blue: 20, alpha: 0.1 });
        color.setAlpha(50)
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.5\)$/);
    })

    it('Checks base case - setAlpha 0...1', () => {
        const color = new RgbColor({ red: 200, green: 100, blue: 20, alpha: 0.1 });
        color.setAlpha(0.2)
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*20,.*0.2\)$/);
    })

    it('Checks base case - set - only blue so only blue gets overridden', () => {
        const color = new RgbColor({ red: 200, green: 100, blue: 20, alpha: 0.1 });
        color.set({
            blue: 190
        })
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*100,.*190,.*0.1\)$/);
    })

    it('Colors larger than range shall be corrected', () => {
        const color = new RgbColor({ red: 200, green: 100, blue: 20, alpha: 0.1 });
        color.set({
            blue: 300,
            green: 350
        })
        const output = color.asString();

        expect(output).toMatch(/rgba\(200,.*255,.*255,.*0.1\)$/);
    })
})

describe("Tests checking class [HslColor]", () => {
    it("Base option with init", () => {
        const color = new HslColor({ hue: 100, saturation: 50, lightness: 50, alpha: 0.9 })
        const result = color.asString();

        expect(result).toMatch(/hsla\(100.*,.*50%.*,.*50%.*,.*0\.9.*\)$/)
    })

    it("Sets each color via separate functions", () => {
        const color = new HslColor({ hue: 100, saturation: 50, lightness: 50, alpha: 0.9 })
        color.setHue(120);
        color.setSaturation(20);
        color.setLightness(30);
        color.setAlpha(0.2)
        const result = color.asString();

        expect(result).toMatch(/hsla\(120.*,.*20%.*,.*30%.*,.*0\.2.*\)$/)
    })

    it("Assigns proper max/min on color if it exceeds value range", () => {
        const color = new HslColor({ hue: 400, saturation: 130, lightness: -10, alpha: -1 })
        const result = color.asString();
        expect(result).toMatch(/hsla\(360.*,.*100%.*,.*0%.*,.*0.*\)$/)
    })

    it("Supports alpha with setting range 0...1", () => {
        const color = new HslColor({ hue: 100, saturation: 50, lightness: 50, alpha: 0.9 })
        color.setAlpha(0.1)
        const result = color.asString();

        expect(result).toMatch(/hsla\(100.*,.*50%.*,.*50%.*,.*0\.1.*\)$/)
    })

    it("Supports alpha with setting range 0...100", () => {
        const color = new HslColor({ hue: 100, saturation: 50, lightness: 50, alpha: 0.9 })
        color.setAlpha(80);
        const result = color.asString();

        expect(result).toMatch(/hsla\(100.*,.*50%.*,.*50%.*,.*0\.8.*\)$/)
    })


})