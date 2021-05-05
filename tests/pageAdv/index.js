// Statics
const particles = [];
const particleColor = 'black';
const particleCount = 100;
const angle360 = Math.PI * 2;
const canvasWidth = 800;
const canvasHeight = 400;
const speedScale = 1;

// Classes
class Particle {
    constructor(drawable, x, y, rate) {
        // 0..1
        this.rate = rate ?? 0;
        this._path = drawable;
        this.x = x;
        this.y = y;
        this.color = new bpdCanvas.RgbColor({ red: 0, green: 0, blue: 0, alpha: 1 });
        this._path.stroke(false);
        this.moveXRate = this.rate * speedScale;
        this.moveYRate = this.rate * speedScale;
        this.red = 0;
        this.closestDistanceToOther = 10000;
        this.size = calculateParticleSize(this.rate, 5, 0.3)
        this.circle = createCircle(this.size)
        this._path.add(this.circle)
    }

    calculate() {
        if (this.closestDistanceToOther <= this.size) {
            this.moveXRate = -1 * this.moveXRate;
            this.moveYRate = -1 * this.moveYRate;
        }
        this.x += this.moveXRate;
        this.y += this.moveYRate;
        this.red = this.closestDistanceToOther > 50 ? 0 : (1 - (this.closestDistanceToOther / 50)) * 255;
        this.moveXRate = revertValue(this.moveXRate, this.x, 0, canvasWidth);
        this.moveYRate = revertValue(this.moveYRate, this.y, 0, canvasHeight);

    }

    setClosestDistance(value) {
        if (value < this.closestDistanceToOther) {
            this.closestDistanceToOther = value;
        }
    }

    draw() {
        this.color.setRed(this.red);
        this._path.from({ x: this.x, y: this.y })
        this._path.setSettings({
            fillStyle: this.color
        })
        this._path.fill();
        this._path.draw();
        this.closestDistanceToOther = 10000;
    }
}
// Functions

function calculateParticleSize(rate, multiplier, min) {
    const size = 1 - Math.abs(rate)
    const adjustedSize = size > min ? size : min
    return Math.round(adjustedSize * multiplier)
}

function revertValue(value, comparable, min, max) {
    if (comparable >= min && comparable <= max) {
        return value;
    }
    return -1 * value;
}



function FpsCounter() {
    let _fps = 0;
    let _timestamp = 0;
    return {
        count: (timestamp) => {
            let diff = timestamp - _timestamp;
            _fps = Math.round(1000 / diff);
            _timestamp = timestamp;
            return _fps;
        },
        getFps: () => {
            return _fps;
        }
    }
}

function getDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
}

function calcDistances() {
    let i = 0;
    let j = 0;
    let current = null;
    let next = null;
    for (i = 0; i < particleCount; i++) {
        current = particles[i];
        for (j = i + 1; j < particleCount; j++) {
            next = particles[j];
            const dx = current.x - next.x;
            const dy = current.y - next.y;
            const distance = getDistance(dx, dy);
            next.setClosestDistance(distance);
            current.setClosestDistance(distance);
        }
    }
}

function draw(wrapper, particles, stats) {
    let running = false;
    let items = [...particles]
    const fpsCounter = FpsCounter();

    function updateStats(timestamp, stats) {
        if (!stats) return;
        const fps = fpsCounter.count(timestamp);
        stats.fps.textContent = fps;
    }

    function paint(timestamp) {
        wrapper.clear();
        items.forEach(item => {
            item.calculate();
            item.draw();
        });
        updateStats(timestamp, stats);
        calcDistances();
        if (running)
            requestAnimationFrame(paint)
    }

    return {
        stop: () => {
            if (!running)
                return;
            prevTimestamp = -1;
            running = false;
        },
        start: () => {
            if (running) return;
            running = true;
            requestAnimationFrame(paint);
        },
        add: (...particles) => {
            items.push(...particles);
        }
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
}

function createCircle(size) {
    return new bpdCanvas.Arc({
        startAngle: 0,
        endAngle: angle360,
        radius: size
    })
}


function createParticles(wrapper) {
    for (let i = 0; i < particleCount; i++) {
        const { width, height } = wrapper.getCanvasSize();
        const x = Math.floor(getRandom(0, width));
        const y = Math.floor(getRandom(0, height));
        const rate = getRandom(-1, 1);
        const drawble = wrapper.createPath({ x, y });
        particles.push(new Particle(drawble, x, y, rate));
    }
}
/** MAIN */
const canvas = document.getElementById('canvas');
const assistant = new bpdCanvas.CanvasAssistant({
    canvas: canvas
})
assistant.setCanvasSize({ width: canvasWidth, height: canvasHeight })

const fpsText = document.getElementById('fps_text');

createParticles(assistant);

const drawer = draw(assistant, particles, {
    fps: fpsText
})
drawer.start();