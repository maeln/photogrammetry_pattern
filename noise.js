const randRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

class P {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const minDistance = (samples, numSamples, p1) => {
  let minDist = 0.0;
  for (let i = 0; i < numSamples; ++i) {
    const p2 = samples[i];
    let dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    if (i == 0 || dist < minDist) {
      minDist = dist;
    }
  }
  return minDist;
};

const poissonCircle = (points) => {
  const nb_attempt = 100;
  const samples = new Array(points);
  for (let i = 0; i < points; ++i) {
    let bestPoint = new P(0.0, 0.0);
    let bestMinDist = 0.0;
    for (let attempt = 0; attempt < nb_attempt; ++attempt) {
      const radius = Math.random();
      const theta = 2 * Math.PI * Math.random();
      const tx = radius * Math.cos(theta);
      const ty = radius * Math.sin(theta);
      const minDist = minDistance(samples, i, new P(tx, ty));
      if (minDist > bestMinDist) {
        bestPoint = new P(tx, ty);
        bestMinDist = minDist;
      }
    }
    samples[i] = bestPoint;
  }

  return samples;
};
