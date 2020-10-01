const tri = new Path2D("m57 62-50-27 48-30 0.93 29z");
const star = new Path2D(
  "m143 58-10-17-18-9.1 17-10 9.1-18 10 17 18 9.1-17 10z"
);
const blaze = new Path2D(
  "m70 53 2.9-18-13-12 18-2.6 7.8-16 7.9 16 18 2.5-13 12 3.1 18-16-8.2z"
);
const pac = new Path2D(
  "m-31 114a27 29 0 0 1-32-11 27 29 0 0 1 4.3-36 27 29 0 0 1 34-2.3 27 29 0 0 1 8.5 36l-24-12z"
);

const canvas = document.getElementById("mcv");
const ctx = canvas.getContext("2d");
const { width, height } = canvas.getBoundingClientRect();

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
  const width = randRange(figMinSize, figMaxSize);
  const c = new Path2D();
  c.rect(0, 0, width, width);
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
  circle.arc(width / 2, height / 2, width / 2 - circleSpacing, 0, 2 * Math.PI);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
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
    ctx.translate(0, -height / 2 + circleSpacing);
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
