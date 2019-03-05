// Let The Bullets Fly
// Kyle Luo
// March 4, 2019
//
// Extra for Experts:
// - Added Sound(both background and sound effects)
// - Utilized classes and constructors to create and track bullets (not listed as an extra of experts option but I think its worth putting in this section)

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
let flashSound;
let ghostSound;
let bgSound;
let difficulty;
let gameover;
let Bullets = [];

function preload() {
  soundFormats("mp3", "wav");
  bgSound = loadSound("assets/bgmusic.mp3");
  flashSound = loadSound("assets/flashsound.mp3");
  ghostSound = loadSound("assets/ghost.wav");
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
  createBullet();
  moveBullet();
  gameOverYet();
}

function createBullet() {
  for (let i = 0; i < 1; i++) {
    let randomvalue = random(0, difficulty - 20 * timer);
    if (randomvalue <= 150) { 
      Bullets.push(new Bullet());
    }
  }
}

function moveBullet() {
  for (let i = 0; i < Bullets.length; i++) {
    Bullets[i].move();
    if (Bullets[i].x > 0) {
      Bullets[i].display();
    }
    if (Bullets[i].x >= charx && Bullets[i].x <= charx + windowWidth / 16 && Bullets[i].y >= chary && Bullets[i].y <= chary + windowHeight / 8){
      gameover = true;
    }
  }
}

class Bullet {
  constructor() {
    this.x = width;
    this.y = random(0, height);
    this.diameter = random(30, 45);
    this.speed = 8 + floor(timer / 5);
  }

  move() {
    this.x += random(-this.speed);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function characterPosition() {
  background(bg);
  image(character, charx, chary, windowWidth / 16, windowHeight / 8);
}

function characterMovement() {
  if (charx + vx <= windowWidth - windowWidth / 16 - 75) {
    charx += vx;
  }
  if (chary + vy <= windowHeight - windowHeight / 8) {
    chary += vy;
  }

}

function showTowers() {
  image(tower, windowWidth - 75, 0, 75, 125);
  image(tower, windowWidth - 75, (windowHeight - 125) / 4, 75, 125);
  image(tower, windowWidth - 75, (windowHeight - 125) / 2, 75, 125);
  image(tower, windowWidth - 75, (windowHeight - 125) / 4 * 3, 75, 125);
  image(tower, windowWidth - 75, windowHeight - 125, 75, 125);
}

function mouseClicked() {
  dex = mouseX;
  dey = mouseY;
  if (gameover) {
    window.location = "index.html";
  }
}

function keyTyped() {
  if (key === "f" && flash === true) {
    flashSound.setVolume(0.1);
    flashSound.play();
    flash = false;
    flashCd = timer;
    if (mouseX <= windowWidth - windowWidth / 16 - 75){
      charx = mouseX;
    }
    else {
      charx = windowWidth - windowWidth / 16 - 75;
    }
    if (mouseY <= windowHeight - windowHeight / 8) {
      chary = mouseY;
    }
    else {
      chary = windowHeight - windowHeight / 8;
    }
    dex = charx;
    dey = chary;
  }
  if (key === "g" && ghost === true) {
    ghostSound.setVolume(0.4);
    ghostSound.play();
    ghost = false;
    ghostCd = timer;
    velocityRatio = 20;
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
  bgSound.setVolume(0.1);
  bgSound.loop();
  gameover = false;
  difficulty = 5000;
}

function determineVelocity() {
  if (charx !== dex) {
    vx = (dex - charx) / velocityRatio;
    vy = (dey - chary) / velocityRatio;
  }
}

function updateTimer() {
  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  textSize(24);
  stroke(255, 255, 255);
  fill(0, 255, 180);
  text(timer, windowWidth / 15, windowHeight / 10);
  if (frameCount % 60 === 0 && ! gameover) {
    timer++;
  }
}

function gameOverYet() {
  if (gameover) {
    flash = false;
    ghost = false;
    bgSound.stop();
    fill(0);
    rect(0, 0, windowWidth, windowHeight);
    stroke(255, 0 ,0);
    fill(255, 120, 0);
    text("GAME OVER! You survived " + timer + " seconds. Click to return to home screen.", windowWidth / 2, windowHeight / 2);
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
    velocityRatio = 60 - floor(timer / 6);
  }
  if (ghost === false && timer - ghostCd >= 20) {
    ghost = true;
  }
}