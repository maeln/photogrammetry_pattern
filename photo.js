const canvas = document.getElementById('mcv')
const ctx = canvas.getContext('2d');
ctx.save()

const { width, height } = canvas.getBoundingClientRect();

// background
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, width, height)


// the circle
var circle = new Path2D()
circle.arc(width / 2, height / 2, width / 2 - 5, 0, 2 * Math.PI)

ctx.lineWidth = 2;
ctx.strokeStyle = 'white'
ctx.stroke(circle)

const clockLine = (i, m) => {
    ctx.save()
    ctx.fillStyle = `hsl(${Math.floor(i / m * 360)},100%,50%)`
    console.log(`hsl(${Math.floor(i / m * 360)},100%,50%)`)
    ctx.translate(-2.5, -5)
    ctx.fillRect(0, 0, 5, 10)
    ctx.restore()
}


ctx.translate(width / 2, height / 2) // move origin to center

const step = 60
for (let d = 0; d < step; ++d) {
    ctx.save()
    const rad = 2 * Math.PI / step * d
    console.log(rad)
    ctx.rotate(rad)
    ctx.translate(0, -height / 2 + 5)

    clockLine(d, step)
    ctx.restore()
}