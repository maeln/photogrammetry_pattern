const left = document.getElementById("left");
const canvas = document.getElementById("mcv");
const ctx = canvas.getContext("2d");

let { width, height } = left.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

// const ratio = Math.min(width / referenceWidth, height / referenceHeight);
// ctx.scale(ratio, ratio);

let backgroundColor = "black";
let objNum = 25;

let figMinSize = 15;
let figMaxSize = 30;

const randRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const drawCircle = () => {
  const diam = randRange(figMinSize, figMaxSize);
  const c = new Path2D();
  c.arc(0, 0, diam / 2, 0, 2 * Math.PI);
  ctx.stroke(c);
  ctx.fill(c);
};

const drawRect = () => {
  const fwidth = randRange(figMinSize, figMaxSize);
  const c = new Path2D();
  c.rect(0, 0, fwidth, fwidth);
  ctx.stroke(c);
  ctx.fill(c);
};

const drawPattern = () => {
  ctx.save();
  // background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // the circle
  const circleSpacing = 5;
  var circle = new Path2D();

  const minSize = Math.min(width, height);
  circle.arc(
    width / 2,
    height / 2,
    minSize / 2 - circleSpacing,
    0,
    2 * Math.PI
  );

  ctx.lineWidth = 2;
  ctx.strokeStyle = backgroundColor === "white" ? "black" : "white";
  ctx.stroke(circle);

  const rectWidth = 5;
  const rectHeight = 10;
  const clockLine = (i, m) => {
    ctx.save();
    ctx.fillStyle = `hsl(${Math.floor((i / m) * 360)},100%,50%)`;
    ctx.translate(-rectWidth / 2, -rectHeight / 2);
    ctx.fillRect(0, 0, rectWidth, rectHeight);
    ctx.restore();
  };

  ctx.translate(width / 2, height / 2); // move origin to center
  const step = 60;
  for (let d = 0; d < step; ++d) {
    ctx.save();
    const rad = ((2 * Math.PI) / step) * d;
    ctx.rotate(rad);
    ctx.translate(0, -minSize / 2 + circleSpacing);
    clockLine(d, step);
    ctx.restore();
  }

  for (let i = 0; i < objNum; ++i) {
    ctx.save();

    const radius =
      (width / 2 - figMaxSize - circleSpacing) * Math.sqrt(Math.random());
    const theta = 2 * Math.PI * Math.random();
    const tx = radius * Math.cos(theta);
    const ty = radius * Math.sin(theta);

    const rot = 2 * Math.PI * Math.random();
    ctx.translate(tx, ty);
    ctx.rotate(rot);

    ctx.lineWidth = 4;
    const colRnd = Math.random();
    ctx.fillStyle = `hsl(${Math.floor(colRnd * 360)},100%,50%)`;
    ctx.strokeStyle = `hsl(${Math.floor(
      (colRnd * 360 + 180) % 360
    )}, 100%, 50%)`;

    const elem = Math.floor(Math.random() * 2);
    switch (elem) {
      case 0:
        drawCircle();
        break;
      case 1:
        drawRect();
        break;
    }

    ctx.restore();
  }

  ctx.restore();
};

drawPattern("black", 25);

const bgRadios = document.querySelectorAll('input[type=radio][name="bgcol"]');

bgRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    backgroundColor = event.target.value;
    drawPattern();
  });
});

const objNumberSlider = document.getElementById("objnumber-slider");
const objNumberText = document.getElementById("objnumber-text");

objNumberSlider.addEventListener("change", (event) => {
  objNum = event.target.value;
  objNumberText.value = event.target.value;
  drawPattern();
});

objNumberText.addEventListener("change", (event) => {
  objNum = event.target.value;
  objNumberSlider.value = event.target.value;
  drawPattern();
});

const objMinSizeInput = document.getElementById("objsize-min");
const objMaxSizeInput = document.getElementById("objsize-max");

objMinSizeInput.addEventListener("change", (event) => {
  figMinSize = event.target.value;
  drawPattern();
});

objMaxSizeInput.addEventListener("change", (event) => {
  figMaxSize = event.target.value;
  drawPattern();
});

window.addEventListener("resize", () => {
  const { width: nw, height: nh } = left.getBoundingClientRect();
  canvas.width = nw;
  canvas.height = nh;
  width = nw;
  height = nh;
  drawPattern();
});
