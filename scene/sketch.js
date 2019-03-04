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
let timer;
let flash;
let flashAbility;
let flashCd;

function preload() {
  character = loadImage('assets/character.PNG');
  flashAbility = loadImage('assets/flash.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadData();
}

function draw() {
  characterPosition();
  determineVelocity();
  characterMovement();
  updateTimer();
  showAbilities();
  countCooldown();
}

function characterPosition() {
  background(250);
  image(character, charx, chary, windowWidth / 16, windowHeight / 8);
}

function mouseClicked() {
  dex = mouseX;
  dey = mouseY;
}

function keyTyped() {
  if (key === 'f' && flash === true) {
    flash = false;
    flashCd = timer;
    charx = mouseX;
    chary = mouseY;
    dex = charx;
    dey = chary;
  }
}

function loadData() {
  charx = windowWidth / 2;
  chary = windowHeight / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
  timer = 0;
  flash = true;
}

function determineVelocity() {
  if (charx !== dex) {
    vx = (dex - charx) / 60;
    vy = (dey - chary) / 60;
  }
}

function characterMovement() {
  if (vx <= 0 || charx <= dex - windowWidth / 16) {
    charx += vx;
  }
  if (vy <= 0 || chary <= dey - windowHeight / 8) {
    chary += vy;
  }
}

function updateTimer() {
  textAlign(CENTER, CENTER);
  textSize(24);
  text(timer, windowWidth / 15, windowHeight / 10);
  if (frameCount % 60 === 0) {
    timer++;
  }
}

function showAbilities() {
  if (flash === true) {
    image(flashAbility, 50, 100, 60, 60)
  }
}

function countCooldown() {
  if (flash === false && timer - flashCd >= 5) {
    flash = true;
  }
}