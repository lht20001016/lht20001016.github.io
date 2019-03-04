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
let tower;

function preload() {
  character = loadImage("assets/character.PNG");
  flashAbility = loadImage("assets/flash.jpg");
  ghostAbility = loadImage("assets/ghost.png");
  bg = loadImage("assets/gamebackground.jpg");
  tower = loadImage("assets/tower.png");
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
  showTowers();
  countCooldown();
}

function characterPosition() {
  background(bg);
  image(character, charx, chary, windowWidth / 16, windowHeight / 8);
}

function showTowers() {
  image(tower, 0, 0, 75, 125);
  image(tower, windowWidth / 4, 0, 75, 125);
  image(tower, windowWidth / 2, 0, 75, 125);
  image(tower, windowWidth / 4 * 3, 0, 75, 125);
  image(tower, windowWidth - 75, 0, 75, 125);
  image(tower, 0, windowHeight / 4, 75, 125);
  image(tower, windowWidth - 75, windowHeight / 4, 75, 125);
}

function mouseClicked() {
  dex = mouseX;
  dey = mouseY;
}

function keyTyped() {
  if (key === "f" && flash === true) {
    flash = false;
    flashCd = timer;
    charx = mouseX;
    chary = mouseY;
    dex = charx;
    dey = chary;
  }
  if (key === "g" && ghost === true) {
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
  raySpeed = 10;
  rayy= 0;
}

function determineVelocity() {
  if (charx !== dex) {
    vx = (dex - charx) / velocityRatio;
    vy = (dey - chary) / velocityRatio;
  }
}

function characterMovement() {
  if (charx + vx >= 75 && charx + vx <= windowWidth - windowWidth / 16- 75) {
    charx += vx;
  }
  if (chary + vy >= 125 && chary + vy <= windowHeight - windowHeight / 8) {
    chary += vy;
  }
}

function updateTimer() {
  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  textSize(24);
  stroke(255, 255, 255);
  fill(0, 255, 180);
  text(timer, windowWidth / 15 * 14, windowHeight / 10 * 9);
  if (frameCount % 60 === 0) {
    timer++;
  }
}

function showAbilities() {
  if (flash === true) {
    image(flashAbility, windowWidth / 15 * 13, windowHeight / 10 * 9, 60, 60);
  }
  if (ghost === true) {
    image(ghostAbility, windowWidth / 5 * 4, windowHeight / 10 * 9, 60, 60);
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