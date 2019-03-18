// Let The bullets Fly
// Kyle Luo
// March 4, 2019
//
// Extra for Experts:
// - Added Sound(both background and sound effects)
// - Utilized classes and constructors to create and track bullets (not listed as an extra of experts option in the assignment but I think its worth putting in this section)
// - Added support to resizing windows during gameplay

//define variables to be used
let state;
let character;
let charx;
let chary;
let vx;
let vy;
let dex;
let dey;
let timer;
let abilities;
let velocityRatio;
let bg;
let tower;
let sound;
let difficulty;
let bullets = [];

//preload assets
function preload() {

  soundFormats("mp3", "wav");
  sound = {
    bg : loadSound("assets/bgmusic.mp3"),
    flash : loadSound("assets/flashsound.mp3"),
    ghost : loadSound("assets/ghost.wav"),
    barrier : loadSound("assets/barrier.wav"),
  };
  character = loadImage("assets/character.PNG");
  abilities = {
    flash : loadImage("assets/flash.jpg"),
    ghost : loadImage("assets/ghost.png"),
    barrier : loadImage("assets/barrier.jpg"),
  };
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

  drawBackground();
  showMenus();
  gameMusic();
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

  state = "menu";
  velocityRatio = 60;
  charx = width / 2;
  chary = height / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
  timer = 0;
  abilities ={
    flashs : true,
    ghosts : true,
    barriers : true,
    invincibilitys : false,
  },
  difficulty = 2500;

}

function drawBackground() {
  background(bg);
}

function showMenus() {

  if (state === "menu") {
    textAlign(CENTER);
    textSize(36);
    stroke(50, 0, 255);
    fill(0, 255, 255);
    text("Let The Bullets Fly", width / 2, height / 8);
    textSize(24);
    text("The objective of this game is to avoid the incoming bullets at all costs. Good Luck!", width / 2, height / 5);
    rectMode(CENTER);
    stroke(0, 0, 255);
    if (mouseX >= width / 2 - width / 12 && mouseX <= width / 2 + width / 12 &&
      mouseY >= height / 3 * 2 - height / 10 && mouseY <= height / 3 * 2 + height / 10) {
      fill(0, 77, 255);
    }
    rect(width / 2, height / 3 * 2, width / 6, height / 5);
    fill(0);
    textSize(32);
    text("Start", width / 2, height / 3 * 2);
  }

}

function gameMusic() {
  if (state === "game" && ! sound.bg.isPlaying()) {
    sound.bg.setVolume(0.2);
    sound.bg.play();  
  }
}

//responsible for tracking and displaying the position of the character
function characterPosition() {

  if (state === "game") {
    image(character, charx, chary, width / 16, height / 8);
  }

}

//responsible for determining the relative velocity of the character's movement relative to its destination
function determineVelocity() {

  if (charx !== dex && state === "game") {
    vx = (dex - charx) / velocityRatio;
    vy = (dey - chary) / velocityRatio;
  }

}

//responsible for moving the characters according to set restrictions (due to in game graphics) and velocities
function characterMovement() {

  if (charx + vx <= width - width / 16 - 75 && state === "game") {
    charx += vx;
  }

  if (chary + vy <= height - height / 8 && state === "game") {
    chary += vy;
  }

}

//responsible for keeping a timer which act as a guideline for game difficulty as well as player score
function updateTimer() {

  if (state === "game") {
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    textSize(24);
    stroke(255, 255, 255);
    fill(0, 255, 180);
    text(timer, width / 15, height / 10);
    if (frameCount % 60 === 0) {
      timer++;
    }
  }  
}

//responsible for showing the availability of the in-game abilities
function showAbilities() {
  if (state ==="game") {
    if (abilities.flashs) {
      image(abilities.flash, windowWidth / 15 * 13, height / 10 * 9, 60, 60);
    }

    if (abilities.ghosts) {
      image(abilities.ghost, windowWidth / 5 * 4, height / 10 * 9, 60, 60);
    }

    if (abilities.barriers) {
      image(abilities.barrier, windowWidth / 15 * 11, height / 10 * 9, 60, 60);
    }
  }
}

//responsible for keeping track of teh ability cooldowns in-game
function countCooldown() {
  if (state === "game") {
    if (! abilities.flashs && timer - abilities.flashcd >= 30) {
      abilities.flashs = true;
    }

    //restores the original velocity (with some increase over time)
    if (! abilities.ghosts && timer - abilities.ghostcd >= 5) {
      velocityRatio = 60 - floor(timer / 6);
    }

    if (! abilities.ghosts && timer - abilities.ghostcd >= 20) {
      abilities.ghosts = true;
    }

    if (! abilities.barriers && timer - abilities.barriercd >= 2) {
      abilities.invincibilitys = false;
    }

    if (! abilities.barriers && timer - abilities.barriercd >= 60) {
      abilities.barriers = true;
    }
  }
}

//displays the image of the towers, representing the side which hostile projectiles are launched
function showTowers() {

  if (state === "game") {
    image(tower, width - 75, 0, 75, 125);
    image(tower, width - 75, (height - 125) / 4, 75, 125);
    image(tower, width - 75, (height - 125) / 2, 75, 125);
    image(tower, width - 75, (height - 125) / 4 * 3, 75, 125);
    image(tower, width - 75, height - 125, 75, 125);
  }
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

  if (state === "game") {

    //loop that cycles through every frame and, depending on the difficulty and timer, there is a possibility of generating a bullet according to the class code above, which is then pushed into an array defined at the beginning
    for (let i = 0; i < 1; i++) {
      let randomvalue = random(0, difficulty - 20 * timer);
      if (randomvalue <= 40) { 
        bullets.push(new Bullet());
      }
    }
  }

}

//responsible for the individual movement of each bullet
function moveBullet() {

  if (state === "game") {
    stroke(0, 0, 255);

    //moves each bullet in the array bullets, defined at the beginning, according to the class code above
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].move();

      //display the bullets that are on screen
      if (bullets[i].x > 0) {
        bullets[i].display();
      }

      //gameover if the bullet is colliding with the character
      if (bullets[i].x - 0.5 * bullets[i].diameter >= charx && bullets[i].x - 0.5 * bullets[i].diameter <= charx + width / 16 && bullets[i].y >= chary && bullets[i].y <= chary + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x + 0.5 * bullets[i].diameter >= charx && bullets[i].x + 0.5 * bullets[i].diameter <= charx + width / 16 && bullets[i].y >= chary && bullets[i].y <= chary + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x >= charx && bullets[i].x <= charx + width / 16 && bullets[i].y + 0.5 * bullets[i].diameter >= chary && bullets[i].y + 0.5 * bullets[i].diameter <= chary + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x >= charx && bullets[i].x <= charx + width / 16 && bullets[i].y - 0.5 * bullets[i].diameter >= chary && bullets[i].y - 0.5 * bullets[i].diameter <= chary + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

    }
  }
}

//responsible for resetting and cleaning up the game after it is done
function gameOverYet() {

  if (state === "gameover") {
    sound.bg.stop();
    text("GAME OVER! You survived " + timer + " seconds. Press SPACEBAR to return to home screen.", width / 2, height / 2);
  }

}

function resetGame() {

  velocityRatio = 60;
  charx = width / 2;
  chary = height / 2;
  dex = charx;
  dey = chary;
  vx = 0;
  vy = 0;
  timer = 0;
  abilities.flashs = true;
  abilities.ghosts = true;
  abilities.barriers = true;
  sound.bg.setVolume(0.2);
  sound.bg.loop();
  difficulty = 2500;
  bullets = [];

}

//mouseclicks determine the destination of the character movement
function mouseClicked() {

  if (state === "menu" && mouseX >= width / 2 - width / 12 && mouseX <= width / 2 + width / 12 &&
    mouseY >= height / 3 * 2 - height / 10 && mouseY <= height / 3 * 2 + height / 10) {
    state = "game";
    resetGame();
  }

  if (state === "game") {
    dex = mouseX;
    dey = mouseY;
  }

}

//responsible for the use of abilities
function keyTyped() {

  if (state === "game") {
    if (key === "f" && abilities.flashs) {
      sound.flash.setVolume(0.1);
      sound.flash.play();
      abilities.flashs = false;
      abilities.flashcd = timer;

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

    if (key === "g" && abilities.ghosts) {
      sound.ghost.setVolume(0.4);
      sound.ghost.play();
      abilities.ghosts = false;
      abilities.ghostcd = timer;
      velocityRatio = 20;
    }

    if (key === "b" && abilities.barriers) {
      sound.barrier.setVolume(0.1);
      sound.barrier.play();
      abilities.barriers = false;
      abilities.barriercd = timer;
      abilities.invincibilitys = true;
    }
  }

  //pressing space while game is over returns the user to the main menu
  if (key === " " && state === "gameover") {
    state = "menu";
  }
}

//provides some support for resizing windows during gameplay
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}