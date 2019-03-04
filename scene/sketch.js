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
let ghost;
let ghostAbility;
let ghostCd;
let velocityRatio;
let bg;

function preload() {
  character = loadImage('assets/character.PNG');
  flashAbility = loadImage('assets/flash.jpg');
  ghostAbility = loadImage('assets/ghost.png');
  bg = loadImage('assets/gamebackground.jpg')
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
  background(bg);
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
  if (key === 'g' && ghost === true) {
    ghost = false;
    ghostCd = timer;
    velocityRatio = 30;
  }
}

function loadData() {
  velocityRatio = 60;
  charx = windowWidth / 2;
  chary = windowHeight / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
  timer = 0;
  flash = true;
  ghost = true;
}

function determineVelocity() {
  if (charx !== dex) {
    vx = (dex - charx) / velocityRatio;
    vy = (dey - chary) / velocityRatio;
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
  textStyle(ITALIC);
  textSize(24);
  stroke(255, 255, 255);
  fill(0, 255, 180);
  text(timer, windowWidth / 15, windowHeight / 10);
  if (frameCount % 60 === 0) {
    timer++;
  }
}

function showAbilities() {
  if (flash === true) {
    image(flashAbility, 100, 150, 60, 60);
  }
  if (ghost === true) {
    image(ghostAbility, 100, 250, 60, 60);
  }
}

function countCooldown() {
  if (flash === false && timer - flashCd >= 45) {
    flash = true;
  }
  if (ghost === false && timer - ghostCd >= 5) {
    velocityRatio = 60;
  }
  if (ghost === false && timer - ghostCd >= 20) {
    ghost = true;
  }
}