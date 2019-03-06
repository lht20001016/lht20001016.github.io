// Let The Bullets Fly
// Kyle Luo
// March 4, 2019
//
// Extra for Experts:
// - Added Sound(both background and sound effects)
// - Utilized classes and constructors to create and track bullets (not listed as an extra of experts option in the assignment but I think its worth putting in this section)
// - Added support to resizing windows during gameplay

//define variables to be used
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
let barrier;
let barrierAbility;
let barrierCd;
let invincibility;
let velocityRatio;
let bg;
let tower;
let flashSound;
let ghostSound;
let barrierSound;
let bgSound;
let difficulty;
let gameover;
let Bullets = [];

//preload assets
function preload() {

  soundFormats("mp3", "wav");
  bgSound = loadSound("assets/bgmusic.mp3");
  flashSound = loadSound("assets/flashsound.mp3");
  ghostSound = loadSound("assets/ghost.wav");
  barrierSound = loadSound("assets/barrier.wav");
  character = loadImage("assets/character.PNG");
  flashAbility = loadImage("assets/flash.jpg");
  ghostAbility = loadImage("assets/ghost.png");
  barrierAbility = loadImage("assets/barrier.jpg");
  bg = loadImage("assets/gamebackground.jpg");
  tower = loadImage("assets/tower.png");

}

//set up variables and play sounds files to begin game
function setup() {

  createCanvas(windowWidth, windowHeight);
  loadData();

}

//game functions
function draw() {

  characterPosition();
  determineVelocity();
  characterMovement();
  updateTimer();
  showAbilities();
  countCooldown();
  showTowers();
  createBullet();
  moveBullet();
  gameOverYet();
  
}

//assign initial values and default stats to variables
function loadData() {

  velocityRatio = 60;
  charx = width / 2;
  chary = height / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
  timer = 0;
  flash = true;
  ghost = true;
  barrier = true;
  bgSound.setVolume(0.1);
  bgSound.loop();
  gameover = false;
  difficulty = 3000;

}

//responsible for tracking and displaying the position of the character
function characterPosition() {

  background(bg);
  image(character, charx, chary, width / 16, height / 8);

}

//responsible for determining the relative velocity of the character's movement relative to its destination
function determineVelocity() {

  if (charx !== dex) {
    vx = (dex - charx) / velocityRatio;
    vy = (dey - chary) / velocityRatio;
  }

}

//responsible for moving the characters according to set restrictions (due to in game graphics) and velocities
function characterMovement() {

  if (charx + vx <= width - width / 16 - 75) {
    charx += vx;
  }

  if (chary + vy <= height - height / 8) {
    chary += vy;
  }

}

//responsible for keeping a timer which act as a guideline for game difficulty as well as player score
function updateTimer() {

  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  textSize(24);
  stroke(255, 255, 255);
  fill(0, 255, 180);
  text(timer, width / 15, height / 10);
  if (frameCount % 60 === 0 && ! gameover) {
    timer++;

  }
  
}

//responsible for showing the availability of the in-game abilities
function showAbilities() {

  if (flash) {
    image(flashAbility, width / 15 * 13, height / 10 * 9, 60, 60);
  }

  if (ghost) {
    image(ghostAbility, width / 5 * 4, height / 10 * 9, 60, 60);
  }

  if (barrier) {
    image(barrierAbility, width / 15 * 11, height / 10 * 9, 60, 60);
  }

}

//responsible for keeping track of teh ability cooldowns in-game
function countCooldown() {

  if (! flash && timer - flashCd >= 30) {
    flash = true;
  }

  //restores the original velocity (with some increase over time)
  if (! ghost && timer - ghostCd >= 5) {
    velocityRatio = 60 - floor(timer / 6);
  }

  if (! ghost && timer - ghostCd >= 20) {
    ghost = true;
  }

  if (! barrier && timer - barrierCd >= 2) {
    invincibility = false;
  }

  if (! barrier && timer - barrierCd >= 60) {
    barrier = true;
  }

}

//displays the image of the towers, representing the side which hostile projectiles are launched
function showTowers() {

  image(tower, width - 75, 0, 75, 125);
  image(tower, width - 75, (height - 125) / 4, 75, 125);
  image(tower, width - 75, (height - 125) / 2, 75, 125);
  image(tower, width - 75, (height - 125) / 4 * 3, 75, 125);
  image(tower, width - 75, height - 125, 75, 125);

}

//class is used to track and display bullets
class Bullet {

  //sets up the variables of each individual bullet including position, size, and velocity
  constructor() {
    this.x = width;
    this.y = random(0, height);
    this.diameter = random(width / 25, height / 35);
    this.speed = random(3, 10 + floor(timer / 4));
  }

  //function responsible for the movement of each bullet
  move() {
    this.x += random(-this.speed);
  }

  //function to displays the bullets
  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

}

//responsible for the creation of the bullets
function createBullet() {

  //loop that cycles through every frame and, depending on the difficulty and timer, there is a possibility of generating a bullet according to the class code above, which is then pushed into an array defined at the beginning
  for (let i = 0; i < 1; i++) {
    let randomvalue = random(0, difficulty - 25 * timer);
    if (randomvalue <= 40) { 
      Bullets.push(new Bullet());
    }
  }

}

//responsible for the individual movement of each bullet
function moveBullet() {

  stroke(0, 0, 255);

  //moves each bullet in the array Bullets, defined at the beginning, according to the class code above
  for (let i = 0; i < Bullets.length; i++) {
    Bullets[i].move();

    //display the bullets that are on screen
    if (Bullets[i].x > 0) {
      Bullets[i].display();
    }

    //gameover if the bullet is colliding with the character
    if (Bullets[i].x - 0.5 * Bullets[i].diameter >= charx && Bullets[i].x - 0.5 * Bullets[i].diameter <= charx + width / 16 && Bullets[i].y >= chary && Bullets[i].y <= chary + height / 8 && ! invincibility) {
      gameover = true;
    }

    if (Bullets[i].x + 0.5 * Bullets[i].diameter >= charx && Bullets[i].x + 0.5 * Bullets[i].diameter <= charx + width / 16 && Bullets[i].y >= chary && Bullets[i].y <= chary + height / 8 && ! invincibility) {
      gameover = true;
    }

    if (Bullets[i].x >= charx && Bullets[i].x <= charx + width / 16 && Bullets[i].y + 0.5 * Bullets[i].diameter >= chary && Bullets[i].y + 0.5 * Bullets[i].diameter <= chary + height / 8 && ! invincibility) {
      gameover = true;
    }

    if (Bullets[i].x >= charx && Bullets[i].x <= charx + width / 16 && Bullets[i].y - 0.5 * Bullets[i].diameter >= chary && Bullets[i].y - 0.5 * Bullets[i].diameter <= chary + height / 8 && ! invincibility) {
      gameover = true;
    }

  }

}

//responsible for resetting and cleaning up the game after it is done
function gameOverYet() {

  if (gameover) {
    flash = false;
    ghost = false;
    bgSound.stop();
    fill(0);
    rect(0, 0, width, height);
    stroke(255, 0 ,0);
    fill(255, 120, 0);
    text("GAME OVER! You survived " + timer + " seconds. Press SPACEBAR to return to home screen.", width / 2, height / 2);
  }

}

//mouseclicks determine the destination of the character movement
function mouseClicked() {

  dex = mouseX;
  dey = mouseY;

}

//responsible for the use of abilities
function keyTyped() {

  if (key === "f" && flash) {
    flashSound.setVolume(0.1);
    flashSound.play();
    flash = false;
    flashCd = timer;

    if (mouseX <= width - width / 16 - 75){
      charx = mouseX;
    }
    
    else {
      charx = width - width / 16 - 75;
    }

    if (mouseY <= height - height / 8) {
      chary = mouseY;
    }

    else {
      chary = height - height / 8;
    }
    dex = charx;
    dey = chary;

  }

  if (key === "g" && ghost) {
    ghostSound.setVolume(0.4);
    ghostSound.play();
    ghost = false;
    ghostCd = timer;
    velocityRatio = 20;
  }

  if (key === "b" && barrier) {
    barrierSound.setVolume(0.1);
    barrierSound.play();
    barrier = false;
    barrierCd = timer;
    invincibility = true;
  }

  //pressing space while game is over returns the user to the main menu
  if (key === " " && gameover) {
    window.location = "index.html";
  }

}

//provides some support for resizing windows during gameplay
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}