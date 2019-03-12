// Refactor the following code
// - in other words, keep the same functionality, but improve the method used

function setup() {
  createCanvas(600, 600);
}

function draw() {
  for (let i = 0; i <= 525; i += 75) {
    for (let j = 0; j <= 525; j += 75) {
      if ((i + j) % 2 === 0) {
        fill(255);
      }
      else {
        fill(0);
      }
      rect(i, j, 75, 75);
    }
  }
}