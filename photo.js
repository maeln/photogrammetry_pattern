const tri = new Path2D("m57 62-50-27 48-30 0.93 29z")
const star = new Path2D("m143 58-10-17-18-9.1 17-10 9.1-18 10 17 18 9.1-17 10z")
const blaze = new Path2D("m70 53 2.9-18-13-12 18-2.6 7.8-16 7.9 16 18 2.5-13 12 3.1 18-16-8.2z")
const pac = new Path2D("m-31 114a27 29 0 0 1-32-11 27 29 0 0 1 4.3-36 27 29 0 0 1 34-2.3 27 29 0 0 1 8.5 36l-24-12z")

const canvas = document.getElementById('mcv')
const ctx = canvas.getContext('2d');
const { width, height } = canvas.getBoundingClientRect();

const drawPattern = (backgroundColor) => {
    ctx.save()
    // background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // the circle
    const circleSpacing = 5
    var circle = new Path2D()
    circle.arc(width / 2, height / 2, width / 2 - circleSpacing, 0, 2 * Math.PI)

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white'
    ctx.stroke(circle)

    const rectWidth = 5
    const rectHeight = 10
    const clockLine = (i, m) => {
        ctx.save()
        ctx.fillStyle = `hsl(${Math.floor(i / m * 360)},100%,50%)`
        ctx.translate(-rectWidth / 2, -rectHeight / 2)
        ctx.fillRect(0, 0, rectWidth, rectHeight)
        ctx.restore()
    }

    ctx.translate(width / 2, height / 2) // move origin to center
    const step = 60
    for (let d = 0; d < step; ++d) {
        ctx.save()
        const rad = 2 * Math.PI / step * d
        ctx.rotate(rad)
        ctx.translate(0, -height / 2 + circleSpacing)
        clockLine(d, step)
        ctx.restore()
    }

    const figWidth = 15
    const figHeight = 15

    const drawCircle = () => {
        const c = new Path2D()
        c.arc(0, 0, figWidth / 2, 0, 2 * Math.PI)
        ctx.stroke(c)
        ctx.fill(c)
    }

    const drawRect = () => {
        const c = new Path2D()
        c.rect(0, 0, figWidth, figHeight)
        ctx.stroke(c)
        ctx.fill(c)
    }

    const nbFig = 10
    for (let i = 0; i < nbFig; ++i) {
        ctx.save()

        // We should really try to use a low descrepency noise for this

        const rot1 = 2 * Math.PI * Math.random()
        const rot2 = 2 * Math.PI * Math.random()
        const radius = (width / 2 - figWidth - circleSpacing) * Math.random()
        const tx = radius * Math.cos(rot1)
        const ty = radius * Math.sin(rot1)

        ctx.translate(tx, ty)
        ctx.rotate(rot2)

        ctx.lineWidth = 4;
        const colRnd = Math.random()
        ctx.fillStyle = `hsl(${Math.floor(colRnd * 360)},100%,50%)`
        ctx.strokeStyle = `hsl(${Math.floor((colRnd * 360 + 180) % 360)}, 100%, 50%)`

        const elem = Math.floor(Math.random() * 2)
        switch (elem) {
            case 0:
                drawCircle()
                break
            case 1:
                drawRect()
                break
        }

        ctx.restore()
    }

    ctx.restore()
}

drawPattern('black');

const bgRadios = document.querySelectorAll('input[type=radio][name="bgcol"]');

bgRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        drawPattern(event.target.value);
    })
})
