// Let The bullets Fly (States Variables Edition)
// Kyle Luo
// March 25, 2019
//
// Extra for Experts:
// - Used Array to store objects in a class
// - Callback Functions
// - Push/Pop rotation with text in loadout menu
// - Classes and constructors
// ...other things that I have learned from the internet to better develop my game


//define variables to be used
let loadCount;
let openShopButton;
let shopToMenuButton;
let gameoverToMenuButton;
let files;
let state;
let currentItem;
let inGameShop;
let shopSubstate;
let volumeControl;
let charpos;
let velocity;
let destinationpos;
let timer;
let abilities;
let soundOn;
let soundOff;
let velocityRatio;
let bg;
let icon;
let images;
let sound;
let menumusic;
let difficulty;
let globalMouseToggle;
let globalMouse;
let bullets = [];
let items;

//preload assets
function preload() {

  menumusic = loadSound("assets/sounds/menumusic.wav");
  soundOn = loadImage("assets/pictures/soundon.png");
  soundOff = loadImage("assets/pictures/soundoff.png");
  setAssets();

}

//set up variables and play sounds files to begin game
function setup() {

  createCanvas(windowWidth, windowHeight);
  loadData();
  loadFiles(createButtons());
  createShop();
  loadItems();

}

//game functions
function draw() {

  drawBackground();
  showCursor();
  showMenus();
  showShop();
  showSound();
  gameMusic();
  globalMouseControl();
  gameMode();
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
  inGameShopDisplay();
  
}

//load the basic assets needed to run the menu, notes the total amount of files to load
function setAssets() {

  bg = loadImage("assets/pictures/gamebackground.jpg");
  volumeControl = true;
  files = 18;

}

//load files
function loadFiles() {

  soundFormats("mp3", "wav");
  sound = {
    bg : loadSound("assets/sounds/bgmusic.mp3", itemLoaded),
    flash : loadSound("assets/sounds/flashsound.wav", itemLoaded),
    barrier : loadSound("assets/sounds/barrier.wav", itemLoaded),
    ignite : loadSound("assets/sounds/ignite.wav", itemLoaded),
    heal : loadSound("assets/sounds/heal.wav", itemLoaded),
    exhaust : loadSound("assets/sounds/exhaust.wav", itemLoaded),
    openstore : loadSound("assets/sounds/openstore.wav", itemLoaded),
    closestore : loadSound("assets/sounds/closestore.wav", itemLoaded),
    startgame : loadSound("assets/sounds/startgame.wav", itemLoaded),
    gameover : loadSound("assets/sounds/gameover.wav", itemLoaded),
    click : loadSound("assets/sounds/click.mp3", itemLoaded),
  };

  images = {
    character : loadImage("assets/pictures/character.PNG", itemLoaded),
    tower : loadImage("assets/pictures/tower.png", itemLoaded),
    flash : loadImage("assets/pictures/flash.jpg", itemLoaded),
    barrier : loadImage("assets/pictures/barrier.jpg", itemLoaded),
    heal : loadImage("assets/pictures/heal.png", itemLoaded),
    ignite : loadImage("assets/pictures/ignite.png", itemLoaded),
    exhaust : loadImage("assets/pictures/exhaust.png", itemLoaded),
  };

}

function createShop() {

  inGameShop = [[images.character, images.character, images.character, images.character, images.character, images.character], 
    [images.character, images.character, images.character, images.character, images.character, images.character],
    [images.character, images.character, images.character, images.character, images.character, images.character],
    [images.character, images.character, images.character, images.character, images.character, images.character],
    [images.character, images.character, images.character, images.character, images.character, images.character]];

}
                                                                                                                                                                                                                                               
class GameObject {
  constructor(x, y, width, height) {
    //position cords
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouse;
  }

  //check mouseover
  checkMouse() {
    this.mouse = mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
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

class Button extends GameObject {
  constructor(x, y, width, height, buttonText, textColor, clickedOn, color, hoverColor, hoverCursor) {
    super(x, y, width, height);
    this.buttonText = buttonText;
    this.textColor = textColor;
    this.clickedOn = clickedOn;
    this.color = color;
    this.hoverColor = hoverColor;
    this.hoverCursor = hoverCursor;
  }

  run() {
    this.checkMouse();

    fill(this.color);
    if(this.mouse) {
      fill(this.hoverColor);
      cursor(this.hoverCursor);
    }
    rect(this.x, this.y, this.width, this.height);
    noFill();
    stroke(this.hoverColor);
    rect(this.x, this.y, this.width, this.height);

    fill(this.textColor);
    stroke(this.hoverColor);
    text(this.buttonText, this.x + this.width / 2, this.y + this.height / 2);

    if(this.mouse && mouseIsPressed && !globalMouse) {
      globalMouseToggle = 1;
      this.clickedOn();
    }

  }
}

class Item extends GameObject {
  constructor(x, y, width, height, image, clickedOn, hoverCursor, borderColor, hoverBorderColor, itemID) {
    super(x, y, width, height);
    this.image = image;
    this.clickedOn = clickedOn;
    this.hoverCursor = hoverCursor;
    this.borderColor = borderColor;
    this.hoverBorderColor = hoverBorderColor;
    this.itemID = itemID;
  }

  run() {
    this.checkMouse(); 

    noFill();
    strokeWeight(2);

    if(this.itemID === currentItem) {
      stroke(64, 76, 55);
    }
    else if (this.mouse) {
      stroke(this.hoverBorderColor);
    }
    else {
      stroke(this.borderColor);
    }

    rect(this.x, this.y, this.width, this.height);

    image(this.image, this.x, this.y, this.width, this.height);

    if(this.mouse && mouseIsPressed && !globalMouse) {
      globalMouseToggle = 1;
      this.clickedOn();
    }

  }
}

function createButtons() {
  openShopButton = new Button(width / 8, height * (13/24), width * 0.75, height / 8, "Loadout", 0, 
    openShop, [209, 19, 221], [103, 19, 109], "assets/cursors/shop.cur");
  shopToMenuButton = new Button(width * 0.15, height * 0.85, width * 0.7, height * 0.1, "Done", 0, 
    shopToMenu, [209, 19, 221], [103, 19, 109], "assets/cursors/shop.cur");
  gameoverToMenuButton = new Button(width * 0.15, height * 0.85, width * 0.7, height * 0.1, "Return To Menu", 0, 
    gmToMenu, [0, 255, 255], [0, 77, 255], "assets/cursors/gotomenu.cur");
}

function openShop() {
  state = "shop";
  if (volumeControl) {
    sound.openstore.setVolume(0.05);
    sound.openstore.play();
  }
}

function shopToMenu() {
  state = "menu";
  if (volumeControl) {
    sound.closestore.setVolume(0.05);
    sound.closestore.play();
  }
  icon = {
    flash : false,
    heal : false,
    exhaust : false,
    ignite : false,
    barrier : false,
  };
}

function gmToMenu() {
  state = "menu";
  sound.startgame.play();
}

//assign initial values and default stats to variables
function loadData() {

  state = "menu";
  shopSubstate = false;
  currentItem = 0;
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
    flashs : false,
    barriers : false,
    ignites : false,
    heals : false,
    exhausts : false,
    invincibilitys : false,
  };
  icon = {
    flash : false,
    heal : false,
    exhaust : false,
    ignite : false,
    barrier : false,
  };
  timer = 0;
  difficulty = 2500;

}

//tracks the number and percentage of total files loaded
function itemLoaded() {
  loadCount += 1;
}

//function drawing the background
function drawBackground() {
  background(bg);
}

//basic game cursor, called here to be overwritten later if needed
function showCursor() {

  cursor("assets/cursors/gamecursor1.cur");

}

//menuscreen using rectangles and text boxes, including hovering lighting and changing cursors
function showMenus() {

  if (state === "menu") {

    textAlign(CENTER, CENTER);
    rectMode(CORNER);
    textSize(36);
    stroke(50, 0, 255);
    fill(0, 255, 255);
    text("Let The Bullets Fly", width / 2, height / 8);
    textSize(24);
    text("The objective of this game is to avoid the incoming bullets at all costs. Good Luck!", width / 2, height / 5);
    
    stroke(0, 0, 255);
    noFill();
    rect(width / 10, height / 4 * 3, width * 0.8, height / 6);
    if (loadCount < files) {
      fill(255, 0 ,0);
    }
    else if (mouseX >= width / 10 && mouseX <= width * 0.9 &&
      mouseY >= height * 0.75 && mouseY <= height / 4 * 3 + height / 6 && loadCount === files) {
      fill(0, 77, 255);
      cursor("assets/cursors/startgame.cur");
    }
    else {
      fill(0, 255, 255);
    }
    rect(width / 10, height * 0.75, width * 0.8 / files * loadCount, height / 6);

    fill(0);
    textSize(32);
    if (loadCount < files) {
      text("Loading...(" + floor(loadCount / files * 100) + "%)", width / 2, height * (27/32));
    }

    //first button
    if (loadCount === files) {
      
      openShopButton.run();
      text("Start", width / 2, height * (27/32));

    }
  }

}

//shop menu, still to come
function showShop() {
  if (state === "shop") {

    shopToMenuButton.run();

    noFill();
    strokeWeight(10);
    if (mouseX >= width * 0.1 && mouseX <= width * 0.2 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      cursor("assets/cursors/shop.cur");
    }
    if (icon.flash) {
      stroke(0, 255, 255);
    }
    else {
      stroke(53, 0, 96);
    }
    rect(width * 0.1, height * 0.1, width * 0.1, height * 0.2);
    image(images.flash, width * 0.1, height * 0.1, width * 0.1, height * 0.2);

    if (mouseX >= width * 0.225 && mouseX <= width * 0.325 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      cursor("assets/cursors/shop.cur");
    }
    if (icon.heal) {
      stroke(0, 255, 255);
    }
    else {
      stroke(53, 0, 96);
    }
    rect(width * 0.225, height * 0.1, width * 0.1, height * 0.2);
    image(images.heal, width * 0.225, height * 0.1, width * 0.1, height * 0.2);

    if (mouseX >= width * 0.35 && mouseX <= width * 0.45 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      cursor("assets/cursors/shop.cur");
    }
    if (icon.barrier) {
      stroke(0, 255, 255);
    }
    else {
      stroke(53, 0, 96);
    }
    rect(width * 0.35, height * 0.1, width * 0.1, height * 0.2);
    image(images.barrier, width * 0.35, height * 0.1, width * 0.1, height * 0.2);

    if (mouseX >= width * 0.475 && mouseX <= width * 0.575 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      cursor("assets/cursors/shop.cur");
    }
    if (icon.ignite) {
      stroke(0, 255, 255);
    }
    else {
      stroke(53, 0, 96);
    }
    rect(width * 0.475, height * 0.1, width * 0.1, height * 0.2);
    image(images.ignite, width * 0.475, height * 0.1, width * 0.1, height * 0.2);

    if (mouseX >= width * 0.6 && mouseX <= width * 0.7 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      cursor("assets/cursors/shop.cur");
    }
    if (icon.exhaust) {
      stroke(0, 255, 255);
    }
    else {
      stroke(53, 0, 96);
    }
    rect(width * 0.6, height * 0.1, width * 0.1, height * 0.2);
    image(images.exhaust, width * 0.6, height * 0.1, width * 0.1, height * 0.2);
    
  }

  strokeWeight(1);
}

//images responsible for displaying the control of sound
function showSound() {
  if (state !== "game") {
    if (volumeControl) {
      image(soundOn, width * 0.95, height * 0.9, height / 15, height / 15);
    }
    else {
      image(soundOff, width * 0.95, height * 0.9, height / 15, height / 15);
    }
  }
}

//plays the approperiate music for the gamestate
function gameMusic() {

  if (state !== "game" && ! menumusic.isPlaying() && volumeControl) { 
    menumusic.setVolume(1.0);
    menumusic.loop();
  }

  if (state === "game" && ! sound.bg.isPlaying() && volumeControl) {
    sound.bg.setVolume(0.2);
    sound.bg.loop();  
  }
}

function globalMouseControl() {
  if(globalMouseToggle > 0) {
    globalMouse = globalMouseToggle;
  }
  else if(!mouseIsPressed) {
    globalMouse = 0;
  }
  globalMouseToggle = 0;
}

//diable right clicks in game
function gameMode() {

  document.addEventListener("contextmenu", event => event.preventDefault());

}

function inGameShopDisplay() {
  if (shopSubstate && state === "game") {

    fill(154, 191, 167);
    rect(width * 0.13, height * 0.08, width * 0.7, height * 0.8);

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 5; x++) {
        // noFill();
        // strokeWeight(2);
        // stroke(45, 145, 78);
        // rect(width * 0.15 + y * (width * 0.08), height * 0.11 + x * (width * 0.08),
        //   width * 0.05, width * 0.05);
        // image(inGameShop[x][y], width * 0.15 + y * (width * 0.08), height * 0.11 + x * (width * 0.08),
        //   width * 0.05, width * 0.05);
        inGameShop[x][y].run();
      }
    }

    textSize(36);
    fill(0);
    stroke(15, 66, 32);
    text("shop", width * 0.712, height * 0.12);


  } 
}

//responsible for tracking and displaying the position of the character
function characterPosition() {

  if (state === "game") {
    image(images.character, charpos.x, charpos.y, width / 16, height / 8);
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
      image(images.flash, width / 15 * 13, height / 10 * 9, 60, 60);
    }

    if (abilities.barriers) {
      image(images.barrier, width / 15 * 11, height / 10 * 9, 60, 60);
    }
  }
}

//responsible for keeping track of teh ability cooldowns in-game
function countCooldown() {
  if (state === "game") {
    if (! abilities.flashs && timer - abilities.flashcd >= 30) {
      abilities.flashs = true;
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
    image(images.tower, width - 75, 0, 75, 125);
    image(images.tower, width - 75, (height - 125) / 4, 75, 125);
    image(images.tower, width - 75, (height - 125) / 2, 75, 125);
    image(images.tower, width - 75, (height - 125) / 4 * 3, 75, 125);
    image(images.tower, width - 75, height - 125, 75, 125);
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
      if ((bullets[i].x - 0.5 * bullets[i].diameter >= charpos.x && bullets[i].x - 0.5 * bullets[i].diameter <= charpos.x + width / 16 && bullets[i].y >= charpos.y && bullets[i].y <= charpos.y + height / 8 ||
      bullets[i].x + 0.5 * bullets[i].diameter >= charpos.x && bullets[i].x + 0.5 * bullets[i].diameter <= charpos.x + width / 16 && bullets[i].y >= charpos.y && bullets[i].y <= charpos.y + height / 8 ||
      bullets[i].x >= charpos.x && bullets[i].x <= charpos.x + width / 16 && bullets[i].y + 0.5 * bullets[i].diameter >= charpos.y && bullets[i].y + 0.5 * bullets[i].diameter <= charpos.y + height / 8 ||
      bullets[i].x >= charpos.x && bullets[i].x <= charpos.x + width / 16 && bullets[i].y - 0.5 * bullets[i].diameter >= charpos.y && bullets[i].y - 0.5 * bullets[i].diameter <= charpos.y + height / 8) &&
       ! abilities.invincibilitys) {
        state = "gameover";
        if (volumeControl){
          sound.gameover.setVolume(0.1);
          sound.gameover.play();
        }
      }

    }
  }
}

//responsible for resetting and cleaning up the game after it is done
function gameOverYet() {

  if (state === "gameover") {
    sound.bg.stop();
    fill(0, 255, 255);
    text("GAME OVER! You survived " + timer + " seconds.", width / 2, height / 8);
    gameoverToMenuButton.run();
  }

}

//called everytime the game is reset, reset sounds, arrays, and assigns the default value to all relavent variables
function resetGame() {

  shopSubstate = false;
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
    flashs : false,
    barriers : false,
    ignites : false,
    heals : false,
    exhausts : false,
    invincibilitys : false,
  };
  if (volumeControl) {
    sound.bg.setVolume(0.05);
    sound.bg.loop();
  }
  timer = 0;
  difficulty = 2500;
  menumusic.stop();
  bullets = [];

}

//mouseclicks determine the destination of the character movement and to navigate through the menus
function mousePressed() {

  if (state === "menu" && mouseX >= width / 10 && mouseX <= width * 0.9 &&
    mouseY >= height * 0.75 && mouseY <= height / 4 * 3 + height / 6 && loadCount === files) {
    state = "game";
    resetGame();
    if (volumeControl) {
      sound.startgame.setVolume(0.1);
      sound.startgame.play();
    }
  }

  if (state === "game") {
    destinationpos.x = mouseX;
    destinationpos.y = mouseY;
    if (volumeControl) {
      sound.click.setVolume(0.1);
      sound.click.play();
    }
  }

  if (mouseX >= width * 0.95 && mouseX <= width * 0.95 + height / 15 && mouseY >= height * 0.9 && mouseY <= height * (29/30) && state !== "game") {
    volumeControl = ! volumeControl;
    if (! volumeControl) {
      menumusic.stop();
    }
  }

  if (state === "shop") {

    if (mouseX >= width * 0.1 && mouseX <= width * 0.2 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      if (!icon.flash) {
        icon = {
          flash : true,
          heal : false,
          exhaust : false,
          ignite : false,
          barrier : false,
        };
        if (volumeControl) {
          sound.flash.setVolume(0.1);
          sound.flash.play();
        }
      }
      else if (icon.flash) {
        icon.flash = false;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
    }
  
    else if (mouseX >= width * 0.225 && mouseX <= width * 0.325 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      if (!icon.heal) {
        icon = {
          flash : false,
          heal : true,
          exhaust : false,
          ignite : false,
          barrier : false,
        };
        if (volumeControl) {
          sound.heal.setVolume(0.1);
          sound.heal.play();
        }
      }
      else if (icon.heal) {
        icon.heal = false;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
    }
  
    else if (mouseX >= width * 0.35 && mouseX <= width * 0.45 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      if (!icon.barrier) {
        icon = {
          flash : false,
          heal : false,
          exhaust : false,
          ignite : false,
          barrier : true,
        };
        if (volumeControl) {
          sound.barrier.setVolume(0.1);
          sound.barrier.play();
        }
      }
      else if (icon.barrier) {
        icon.barrier = false;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
    }
  
    else if (mouseX >= width * 0.475 && mouseX <= width * 0.575 && mouseY >= height * 0.1 && mouseY <= height * 0.3) {
      if (!icon.ignite) {
        icon = {
          flash : false,
          heal : false,
          exhaust : false,
          ignite : true,
          barrier : false,
        };
        if (volumeControl) {
          sound.ignite.setVolume(0.1);
          sound.ignite.play();
        }
      }
      else if (icon.ignite) {
        icon.ignite = false;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
    }
  
    else if (mouseX >= width * 0.6 && mouseX <= width * 0.7 && mouseY >= height * 0.1 && mouseY <= height * 0.3 ) {
      if (!icon.exhaust) {
        icon = {
          flash : false,
          heal : false,
          exhaust : true,
          ignite : false,
          barrier : false,
        };
        if (volumeControl) {
          sound.exhaust.setVolume(0.1);
          sound.exhaust.play();
        }
      }
      else if (icon.exhaust) {
        icon.exhaust = false;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
    }

    else if (icon.flash || icon.heal || icon.barrier || icon.ignite || icon.exhaust) {
      icon = {
        flash : false,
        heal : false,
        exhaust : false,
        ignite : false,
        barrier : false,
      };
      if (volumeControl) {
        sound.closestore.setVolume(0.1);
        sound.closestore.play();
      }
    }
  }

}

//responsible for the use of abilities upon keytyped
function keyTyped() {

  if (state === "game") {

    if ((key === "`" || key === "p") && state === "game") {
      shopSubstate = !shopSubstate;
      if (!shopSubstate) {
        currentItem = 0;
      }

    }
  
    if (key === "d" && abilities.flashs) {
      if (volumeControl) {
        sound.flash.setVolume(0.1);
        sound.flash.play();
      }
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

    if (key === "f" && abilities.barriers) {
      if (volumeControl) {
        sound.barrier.setVolume(0.1);
        sound.barrier.play();
      }
      abilities.barriers = false;
      abilities.barriercd = timer;
      abilities.invincibilitys = true;
    }
  }

}

//provides some support for resizing windows during gameplay
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  createButtons();
  createShop();

}