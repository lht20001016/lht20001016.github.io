// Let The bullets Fly
// Kyle Luo
// March 25, 2019
//
// CURRENT LOADING FILES COUNT : 9
//
// Extra for Experts:
// - Used Array to store objects in a class
// - Callback Functions

//define variables to be used
let loadCount;
let state;
let character;
let charpos;
let velocity;
let destinationpos;
let timer;
let abilities;
let flashp;
let ghostp;
let barrierp;
let velocityRatio;
let bg;
let tower;
let sound;
let difficulty;
let bullets = [];

//preload assets
function preload() {

  bg = loadImage("assets/gamebackground.jpg");

}

//set up variables and play sounds files to begin game
function setup() {

  createCanvas(windowWidth, windowHeight);
  loadData();
  loadSoundFiles();
  loadAssets();
}

//game functions
function draw() {

  drawBackground();
  showMenus();
  gameMusic();
  showCursor();
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

function loadAssets() {
  character = loadImage("assets/character.PNG", itemLoaded);
  tower = loadImage("assets/tower.png", itemLoaded);
  flashp = loadImage("assets/flash.jpg", itemLoaded);
  ghostp = loadImage("assets/ghost.png", itemLoaded);
  barrierp = loadImage("assets/barrier.jpg", itemLoaded);
}

//assign initial values and default stats to variables
function loadData() {

  state = "menu";
  loadCount = 0;
  velocityRatio = 60;
  charpos = {
    x : width / 2,
    y : height / 2,
  };
  destinationpos = {
    x : charpos.x,
    y : charpos.y,
  };
  velocity = {
    x : 0,
    y : 0,
  };
  abilities ={
    flashs : true,
    ghosts : true,
    barriers : true,
    invincibilitys : false,
  };
  timer = 0;
  difficulty = 2500;

}

function loadSoundFiles() {
  soundFormats("mp3", "wav");
  sound = {
    bg : loadSound("assets/bgmusic.mp3", itemLoaded),
    flash : loadSound("assets/flashsound.mp3", itemLoaded),
    ghost : loadSound("assets/ghost.wav", itemLoaded),
    barrier : loadSound("assets/barrier.wav", itemLoaded),
  };
}

function itemLoaded() {
  loadCount += 1;
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
    if (loadCount < 9) {
      fill(255, 0 ,0);
    }
    if (mouseX >= width / 2 - width / 12 && mouseX <= width / 2 + width / 12 &&
      mouseY >= height / 3 * 2 - height / 10 && mouseY <= height / 3 * 2 + height / 10 && loadCount === 9) {
      fill(0, 77, 255);
    }
    rect(width / 2, height / 3 * 2, width / 6, height / 5);
    fill(0);
    textSize(32);
    if (loadCount < 9) {
      text("Loading...", width / 2, height / 3 * 2);
    }
    if (loadCount === 9) {
      text("Start", width / 2, height / 3 * 2);
    }
  }

}

function gameMusic() {
  if (state === "game" && ! sound.bg.isPlaying()) {
    sound.bg.setVolume(0.2);
    sound.bg.play();  
  }
}

function showCursor() {
  if (mouseX >= width / 2 - width / 12 && mouseX <= width / 2 + width / 12 &&
    mouseY >= height / 3 * 2 - height / 10 && mouseY <= height / 3 * 2 + height / 10 && loadCount === 9 && state === "menu") {
    cursor("assets/gamecursor1.cur");
  }
  else if (state === "game") {
    cursor("assets/gamecursor1.cur");
  }
}

//responsible for tracking and displaying the position of the character
function characterPosition() {

  if (state === "game") {
    image(character, charpos.x, charpos.y, width / 16, height / 8);
  }

}

//responsible for determining the relative velocity of the character's movement relative to its destination
function determineVelocity() {

  if (charpos.x !== destinationpos.x && state === "game") {
    velocity.x = (destinationpos.x - charpos.x) / velocityRatio;
    velocity.y = (destinationpos.y - charpos.y) / velocityRatio;
  }

}

//responsible for moving the characters according to set restrictions (due to in game graphics) and velocities
function characterMovement() {

  if (charpos.x + velocity.x <= width - width / 16 - 75 && state === "game") {
    charpos.x += velocity.x;
  }

  if (charpos.y + velocity.y <= height - height / 8 && state === "game") {
    charpos.y += velocity.y;
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
      image(flashp, width / 15 * 13, height / 10 * 9, 60, 60);
    }

    if (abilities.ghosts) {
      image(ghostp, width / 5 * 4, height / 10 * 9, 60, 60);
    }

    if (abilities.barriers) {
      image(barrierp, width / 15 * 11, height / 10 * 9, 60, 60);
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
    let randomvalue = random(0, difficulty - 20 * timer);
    if (randomvalue <= 40) { 
      bullets.push(new Bullet());
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
      if (bullets[i].x - 0.5 * bullets[i].diameter >= charpos.x && bullets[i].x - 0.5 * bullets[i].diameter <= charpos.x + width / 16 && bullets[i].y >= charpos.y && bullets[i].y <= charpos.y + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x + 0.5 * bullets[i].diameter >= charpos.x && bullets[i].x + 0.5 * bullets[i].diameter <= charpos.x + width / 16 && bullets[i].y >= charpos.y && bullets[i].y <= charpos.y + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x >= charpos.x && bullets[i].x <= charpos.x + width / 16 && bullets[i].y + 0.5 * bullets[i].diameter >= charpos.y && bullets[i].y + 0.5 * bullets[i].diameter <= charpos.y + height / 8 && ! abilities.invincibilitys) {
        state = "gameover";
      }

      if (bullets[i].x >= charpos.x && bullets[i].x <= charpos.x + width / 16 && bullets[i].y - 0.5 * bullets[i].diameter >= charpos.y && bullets[i].y - 0.5 * bullets[i].diameter <= charpos.y + height / 8 && ! abilities.invincibilitys) {
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
  charpos = {
    x : width / 2,
    y : height / 2,
  };
  destinationpos = {
    x : charpos.x,
    y : charpos.y,
  };
  velocity = {
    x : 0,
    y : 0,
  };
  abilities = {
    flashs : true,
    ghosts : true,
    barriers : true,
  };
  sound.bg.setVolume(0.2);
  sound.bg.loop();
  timer = 0;
  difficulty = 2500;
  bullets = [];

}

//mouseclicks determine the destination of the character movement
function mouseClicked() {

  if (state === "menu" && mouseX >= width / 2 - width / 12 && mouseX <= width / 2 + width / 12 &&
    mouseY >= height / 3 * 2 - height / 10 && mouseY <= height / 3 * 2 + height / 10 && loadCount === 9) {
    state = "game";
    resetGame();
  }

  if (state === "game") {
    destinationpos.x = mouseX;
    destinationpos.y = mouseY;
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
        charpos.x = mouseX;
      }
    
      else {
        charpos.x = width - width / 16 - 75;
      }

      if (mouseY <= height - height / 8) {
        charpos.y = mouseY;
      }

      else {
        charpos.y = height - height / 8;
      }
      destinationpos.x = charpos.x;
      destinationpos.y = charpos.y;

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