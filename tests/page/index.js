import { patternSource, picSource } from './sources.js'

const canvas = document.getElementById("canvas");
const assistant = new bpdCanvas.CanvasAssistant({
    canvas: canvas,
    size: {
        width: 400,
        height: 300
    },
    settings: {
        strokeStyle: new bpdCanvas.Color('black'),
        strokeWidth: 2,
        fillStyle: new bpdCanvas.Color('yellow'),
    }
})

const drawables = []

const path = assistant.createPath({
    x: 20,
    y: 20
})

const lineData = new bpdCanvas.LineData();
lineData.to({ x: 200, y: 20 }).to({ x: 110, y: 100 })
const line = new bpdCanvas.Line({
    init: lineData.get()
})
path.add(line)


const path2 = assistant.createPath({ x: 20, y: 20 }).add(new bpdCanvas.Arc({
    init: {
        startAngle: 0,
        endAngle: Math.PI * 2,
        radius: 6
    }
})).fill().stroke(false).setSettings({
    fillStyle: new bpdCanvas.Color('purple')
})

const path3 = assistant.createPath({ x: 200, y: 20 }).add(new bpdCanvas.Arc({
    init: {
        startAngle: 0,
        endAngle: Math.PI * 2,
        radius: 6
    }
})).fill().stroke(false).setSettings({
    fillStyle: new bpdCanvas.Color('orange')
})

const path4 = assistant.createPath({ x: 110, y: 100 }).add(new bpdCanvas.Arc({
    init: {
        startAngle: 0,
        endAngle: Math.PI * 2,
        radius: 6
    }
})).fill().stroke(false).setSettings({
    fillStyle: new bpdCanvas.Color('green')
})

const path5 = assistant.createPath({ x: 40, y: 40 })

const curveData = new bpdCanvas.CurveData();
curveData.to({
    x: 100,
    y: 50
}).withRadius(20).corner({
    x: 75,
    y: 75
})
const curve = new bpdCanvas.Curve(curveData.get());

const cl1 = new bpdCanvas.Line([{ x: 50, y: 50 }]);
const cl2 = new bpdCanvas.Line([{ x: 120, y: 40 }]);


path5.add(cl1, curve, cl2)
path5.close();

const rect1 = assistant.createRectangle({
    x: 10,
    y: 100,
    width: 20,
    height: 50
});
rect1.setSettings(new bpdCanvas.ObjectProperties().setFillStyle(new bpdCanvas.Color('pink')).setStrokeStyle(new bpdCanvas.Color('blue')).get());
rect1.stroke();

const bzCurveD = new bpdCanvas.BezierCurveData().to({
    x: 200,
    y: 100
}).by({ x: 120, y: 120 }, { x: 160, y: 80 });
const bzPath = assistant.createPath({
    x: 100,
    y: 100
}).add(new bpdCanvas.BezierCurve(bzCurveD.get()),
    new bpdCanvas.Line({ init: [{ x: 220, y: 150 }] })
)
bzPath.close();
bzPath.fill();

const text = assistant.createText({
    text: "Message",
    position: {
        x: 200,
        y: 50
    }
})
text.setSettings({
    font: new bpdCanvas.Font({
        size: 40,
        unit: 'pt',
        type: "Calibri"
    }),
    fillStyle: new bpdCanvas.Color('grey')
})

const patternImage = new Image();
patternImage.src = patternSource;

patternImage.addEventListener('load', () => {
    console.log("Pattern loaded")
    const pattern = assistant.createPattern({
        source: patternImage
    })

    const rect2 = assistant.createRectangle({
        x: 300,
        y: 150,
        width: 40,
        height: 40
    })
    rect2.setSettings({
        fillStyle: pattern
    })

    rect2.draw()
})

const imageIm = new Image();
imageIm.src = picSource;
imageIm.addEventListener('load', () => {
    console.log("Image loaded");
    const imageRect = assistant.createImage({
        source: imageIm,
        position: { x: 10, y: 180 }
    })

    imageRect.setSettings(new bpdCanvas.ObjectProperties().setShadow(new bpdCanvas.Color('black'), 4, 4, 12).get())

    imageRect.draw();
})


const ellipseSettings = new bpdCanvas.EllipseData();
ellipseSettings.setRadius(30);
ellipseSettings.setAngles(0, Math.PI * 2);
ellipseSettings.setRotation(0)
const ellipsePath = assistant.createPath({ x: 200, y: 200 });
ellipsePath.doNotMoveBeforeBuild();

ellipsePath.add(new bpdCanvas.Ellipse(ellipseSettings.get()));
ellipsePath.stroke();
ellipsePath.fill();
ellipsePath.setSettings({
    strokeStyle: new bpdCanvas.Color('green'),
    strokeWidth: 1
})


drawables.push(path, path2, path3, path4, path5, rect1, bzPath, text, ellipsePath);
drawables.forEach(path => path.draw());