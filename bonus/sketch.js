// Refactor the following code
// - in other words, keep the same functionality, but improve the method used

let xspace;
let yspace;
let ssize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadData();
}

function draw() {
  background(0);
  for (let i = 1; i < 16; i++) {
    for (let j = 1; j < 9; j++) {
      rect(i * xspace, j * yspace, ssize, ssize);
      line(width / 2, height / 2, i * xspace + ssize / 2, j * yspace + ssize / 2);
    }
  }
}

function loadData() {
  xspace = width / 16;
  yspace = height / 9;
  ssize = width / 500;
  stroke(255);
  strokeWeight(0.1)
}