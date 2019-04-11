
let k;
let aimage;

function preload() {
  aimage = loadImage("assets/gear.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  k = [[aimage, aimage], [aimage, aimage]];
  image(k[1][0], 60, 60, 260, 260);
}