// Let The Bullets Fly
// Kyle Luo
// February 26, 2019
//
// Extra for Experts:
// - Added Sound
// - Made Custom Shapes

let character;
let charx;
let chary;
let vx;
let vy;
let dex;
let dey;

function preload() {
  character = loadImage("assets/character.PNG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  charx = windowWidth / 2;
  chary = windowHeight / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
}

function draw() {
  background(250);
  image(character, charx, chary, windowWidth / 16, windowHeight / 8);
  if (charx !== dex) {
    vx = (dex - charx) / 60;
    vy = (dey - chary) / 60;
  }
  if (vx <= 0 || charx <= dex - windowWidth / 16) {
    charx += vx;
  }
  if (vy <= 0 || chary <= dey - windowHeight / 8) {
    chary += vy;
  }
}

function mouseClicked() {
  dex = mouseX;
  dey = mouseY;
}

