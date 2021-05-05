import { Font } from '../src/core/font';

describe('Tests check class [Font]', () => {
    it('Inits with values', () => {
        const font = new Font({
            size: 10,
            unit: 'px',
            type: "Arial",
            style: "italic"
        })

        const result = font.asString();

        expect(result).toMatch(/italic\s10px\sArial$/)
    })

    it('Sets values via separate functions', () => {
        const font = new Font({
            size: 10,
            unit: 'px',
            type: "Arial",
            style: "italic"
        });

        font.setSize(20).setStyle('normal').setUnit('em').setType('Calibri')

        const result = font.asString();

        expect(result).toMatch(/normal\s20em\sCalibri$/)
    })


    /**
     * In example init will contain three values of four
     * then set function will pass two fields - one missing and one exisiting to overwrite
     */
    it('Function [set] merges existing config with current', () => {
        const font = new Font({
            size: 10,
            unit: 'px',
            type: "Arial"
        });

        font.set({
            type: "Calibri",
            style: 'normal'
        })

        const result = font.asString();

        expect(result).toMatch(/normal\s10px\sCalibri$/)
    })


    it('Method [asString] supports options where there are arguments missing', () => {
        const fontS = new Font({
            size: 10,
            unit: 'px',
            type: "Arial"
        });

        const fontSt = new Font({
            size: 10,
            unit: 'px',
        });

        const fontN = new Font();

        const resultS = fontS.asString();
        const resultSt = fontSt.asString();
        const resultN = fontN.asString();

        expect(resultS).toMatch(/10px\sArial$/);
        expect(resultSt).toMatch(/10px$/);
        expect(resultN).toEqual('');
    })
})