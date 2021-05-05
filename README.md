# bpd-canvas
Simple assistant for canvas related processing.

# Installation
Library comes in two version. The first one is bundled with UMD and is available as normal and minified JS file.
Second option is ESM which comes with typings so it is also supporting Typescirpt

## Common import
Use any CDN service that provides access to npm repositories

## ESM

```
npm install bpd-canvas
```

# Usage

> Note: 
> When using an UMD version then all classes arr available in **bpdCanvas** object attached to your global/window

## Assistant
To create an assistant invoke **CanvasAssistant** with options:

```
const assistance = new CanvasAssistant(options)
```

where *options* is a **AssistantOptions**:
* `canvas` - !required - Canvas element. If not passed initializer will throw an exception.
* `size` - CanvasObjectSize - optional - sets size of the canvas
* `alpha` - boolean - optional - value of global alpha
* `desynchronized` - boolean - optional - context option
* `useGlobalSettings` - boolean - optional - context option
* `settings` - IObjectProperties - optional - global settings for canvas elements

Available methods:
* `setGlobalObjectProperties` - `(properties: IObjectProperties)` - sets global components settings
* `getGlobalObjectProperties` - return reference to current global settings
* `setGlobalAlpha` - `(value: number)` - sets global alpha value to context
* `setImageSmoothing` - `(enabled: boolean, quality?: ImageSmoothingQuality)` - set image smoothing and image smoothing quality
* `getImageData` - invokes the same method from context
* `putImageData` - `(imageData: ImageData, position: CanvasPoint, cutCoords?: CanvasObjectCoordinates)` - invokes original method from context
* `createImageData` - `(width/data: number/ImageData, height?: number)` - invokes createImageData from context with data (ImageData) or creates blank image data with width and height
* `save` - calls context `save`
* `restore` - calls context `restore`
* `setCanvasSize` - `(size: CanvasObjectSize)` - sets canvas size
* `getCanvasSize` - gets current canvas size
* `getContext` - gets canvas context
* `clear` - `(coords?)` - clears canvas area. If no coordinates is provided, whole canvas gets cleared
* `createPattern` - `(options: CanvasPatternDefinition)` - creates a pattern
* `createLinearGradient` - `(options?: CanvasObjectCoordinates)` - creates linear gradient object as `CanvasLinearGradientColor`

# Components (drawables)
All objects implement method `draw()` that is used to draw it on the canvas.
Each drawable exposes (aside of `draw`) some methods used to manage how they will after draw:

* `set` - `(drawbleSetup)` - method is common for all drawables but argument differs depending on the drawable type
* `setSettings` - `(settings: IObjectProperties)` - set style settings to drawable
* `stroke` - `(flag?)` - sets whether component shall draw stroke. Stroke gets disabled only when **flag** is *false*
* `fill` - `(flag?)` - sets whether components shall be filled. Fill gets disabled when **flag** is set to *false*
* `getKey` - returns **id** of the component

## Rectangle
Creates instance of rectangle drawable. Draws a rectangular shape based on coordinates
Setup object: CanvasObjectCoordinates

> Flag `isFill` is enabled by default

### Methods
* `setPosition` - `(point: CanvasPoint)` - sets rectangle position
* `setSize` - `(size: CanvasObjectSize)` - sets rectangle size

## Image
Creates instance of Image drawable that draws an image on the canvas
Setup object: CanvasImageSetup

## Text
Creates instance of text that will be drawn on on canvas
Setup object: TextSetup

### Methods
* `setFont` - `(font: IStringable)` - sets font for displayed text. Use **Font** class to pass font settings. 

## Path
Draws path on canvas. Path always consists of path elements.
Path elements are described in a separate section.
Setup object: CanvasPoint

### Methods
* `from` - `(point)` - sets initial position of path
* `add` - `(...elements: IPathElement[])` - list of path elements
* `get` - `(index)` - retrives path element from specific index in path children
* `delete` - `(index)` - deletes path child from specific index
* `insertAt` - `(index, ...elements)` - adds elements at specific index in the children list
* `setAt` - `(index, element)`- replaces child at specific index in the children list
* `close` - `(flag?)` - sets whether path shall be closed

# Path elements
Path elements are used to build a Path.
All elements must implement method `build` which is used by component **CanvasPath** to create an element.
All elements share some methods:
* `getKey` - retrvies an **id** of the path element
* `set` - `(data)` - Sets setup data of the element. Type differs depending on element type

## Line
Line is an path element that creates next lines.

Setup object: `CanvasPoint[]`

### Examples
```javascript
const line = new Line([{x: 1, y:1}, {x: 10, y: 10}])
const line2 = new Line().set([{x: 1, y:1}, {x: 10, y: 10}])

// with LineData
const data = new LineData({x: 1, y:1})
data.to({x: 10, y: 10}).to({x: 30, y:30}, {x: 50: y: 75});

const line3 =  new Line(data.get());
```

## Curve
Creates a curved line. Requires ending point, one control point (corner) and radius value.
Setup object: `CurveOptions`

### Examples
```javascript
const curve = new Curve({
    end: {x: 10, y: 10},
    corner: {x: 20, y:20},
    radius: 10
}) 

// with CurveData

const data = new CurveData().to({x: 10, y: 10}).corner({x: 20, y: 20}).withRadius(10);
const curve2 = new Curve(data.get())
```

## Arc
Creates an arc. It requires starting angle, ending angle and radius.

Setup object: `ArcOptions`

### Example
```javascript
// Creates a circle
const arc =  new Arc({
    startAngle: 0,
    endAngle: Math.PI * 2,
    radius: 10
})
// with ArcData
const data =  new ArcData().setStartAngle(0).setEndAngle(Math.PI * 2).setRadius(10);
const arc2 = new Arc(data.get());
```
## BezierCurve
Creates bezier curve. Requires two control points and ending point

Setup object: `BezierCurveOptions`

### Examples
```javascript
const bzCurve = new BezierCurve({
    controlPoint: {x: 10, y: 20},
    controlPoint2: {x:30, y: 50},
    end: {x: 40, y: 40}
})

// with BezierCurveData
const data = new BezierCurveData().to({x: 40, y:40}).by({x: 10, y: 20}, {x: 30, y: 40});
const bzCurve2 = new BezierCurve(data.get());
```
## QuadraticCurve
Creates quadratic curve. Requires a control point and ending point.

Setup object: `QuadraticCurveOptions`

### Examples
```javascript
const qCurve = new QuadraticCurve({
    controlPoint: {x: 10, y: 20},
    end: {x: 40, y: 40}
})

// with BezierCurveData
const data = new QuadraticCurveData().to({x: 40, y:40}).by({x: 10, y: 20});
const qCurve2 = new QuadraticCurve(data.get());
```
## Ellipse
Creates an ellipse. It requires some elements properties:
* radiusX
* radiusY
* rotation (in radians)
* startAngle
* endAngle

Setup object: `EllipseOptions`

### Examples
```javascript
const ellipse = new Ellipse({
    radiusX: 20,
    radiusY: 20,
    rotation: Math.PI / 4,
    startAngle: 0,
    endAngle: Math.PI * 2  
})

// with EllipseData
const data =  new EllipseData().setRadius(20).setAngles(0, Math.PI *2).setRotation(0);
// Note: Call setRadius(x, y) when you want to set different radius for each axis
const ellipse2 = new Ellipse(data.get());
```

# Styles

## CanvasLinearGradientColor
Creates instance of object styles that allows to build linear gradient

### Methods
* `addColor` - `(offset: number, color: IStringable)` - adds color definition at specific offset
* `removeColor` - `(offset)` - removes color definition from specific offset
* `clearColors` - clears color map
* `setPosition` - `(position)`
* `setSize` - `(size)`

## HslColor
Creates instance of style object building a HSL color

### Methods
* `set` - `(definition: HslColorDefinition)` - sets color definiton
* `setHue` - `(value)` - hue value 0...360
* `setSaturation` - `(value)` - saturation value 0...100
* `setLightness` - `(value)` - lightness value 0...100
* `setAlpha` - `(value)` - lightness value 0...100/0...1

## RgbColor
Creates instance of style object building a RGB color

### Methods
* `set` - `(color: RgbColorDefinition)`  
* `setRed` - `(value)` - red value 0...255
* `setGreen` - `(value)` - green value 0...255
* `setBlue` - `(value)` - blue value 0...255
* `setAlpha` - `(value)` - alpha value 0...100
* `fromHex` - `(value: string)` - parses hex representation of color

## Color
Creates instance of object style that accepts all kind of colors in string format

### Methods
* `set` - `(value: string)`


# Interfaces

## CanvasObjectSize
* `width` - number
* `height` - number

## IObjectProperties
* `fillStyle`? - IObjectStyle;
* `strokeWidth`? -  number;
* `isFill`? - boolean - internal flag to set whether 
* `isStroke`? - boolean;
* `font`? - IStringable;
* `mitterLimit`? - number;
* `lineCap`? - LineCap;
* `lineJoin`? - LineJoin;
* `lineDashOffset`? - number;
* `lineDash`? - number[];
* `textAlign`? - TextAlign;
* `textBaseline`? - TextBaseline;
* `shadowColor`? - IObjectStyle;
* `shadowOffsetX`? - number;
* `shadowOffsetY`? - number;
* `shadowBlur`?: number;

## IObjectStyle 
* `toStyle`() - string | CanvasGradient | CanvasPattern

## CanvasPoint
* `x` - number
* `y` - number

## CanvasPatternDefinition
* `source`?: CanvasImageSource
* `repeat`?: PatternRepetition

## PatternRepetition
"repeat" | 'repeat-x' | 'repeat-y' | 'no-repeat'

## CanvasObjectCoordinates
* `x`: number
* `y`: number
* `width`: number
* `height`: number

## HslColorDefinition
* `hue`?: number
* `saturation`?: number
* `lightness`?: number
* `alpha`?: number

## RgbColorDefinition
* `red`?: number;
* `green`?: number;
* `blue`?: number;
* `alpha`?: number;

## CanvasImageSetup
* `source`?: CanvasImageSource
* `position`?: CanvasPoint
* `imageSlice`?: CanvasObjectCoordinates
* `desitnationCoords`?: CanvasObjectCoordinates

## TextSetup
* `text`?: string - text to be displayed
* `position`?: CanvasPoint - text position

## CurveOptions 
* `radius`?: number
* `corner`?: CanvasPoint
* `end`?: CanvasPoint

## BezierCurveOptions 
* `controlPoint`?: CanvasPoint;
* `controlPoint2`?: CanvasPoint;
* `end`?: CanvasPoint;


## QuadraticCurveOptions 
* `controlPoint`?: CanvasPoint;
* `end`?: CanvasPoint;


## EllipseOptions 
* `rotation`?: number;
* `radiusX`?: number;
* `radiusY`?: number;
* `startAngle`?: number;
* `endAngle`?: number;

## ArcOptions 
* startAngle: number;
* endAngle: number;
* radius: number;