// Let The bullets Fly (States Variables Edition)
// Kyle Luo
// March 25, 2019
//
// update notes for Grid Based Assignment (April 24, 2019): (to history.md pending)
// 2d arrays to create shop, introduced gold system
// health and mana system / stat calculations (combat and damage still to come, already being tested with bullets)
// introduced stats
// deleted velocity ratio introduced speed
// Initialize variables to avoid undefined values being written or read
// NOTE: pregame summor spells untouched
// inventory array complete with hover information
// pop out menu from the left side indicating stats, hoverinfo still to come
// basic stats now work properly, abilities still to come
// introduced level system, level up and stat growth works as intended, although no xp mechanic is yet implemented
// introduced mana, health, and xp bar, see HUD at bottom left corner
// Stat icon PNG are capitalized causing the 404 problem?
//
// NOTE: Although there exist parts of code that remain for the purpose of game functionality (mostly talking about the towers and bullets, to maintain the game runnable), they will be wored on ASAP
// ALSO NOTE: I was not able to get the separate file thing worked out to the effect that I wanted to so I'll tall to you after break to get help. Please let me know how I can fix the walls of text for item effects.
//
//extra for experts----------------------------------------------------------------------
//Callback Functions
//Extending Classes
//Disable Rightclicks
//Varying Cursors
//Many other features, see game and code

//define variables to be used
let loadCount;
let openShopButton;
let shopToMenuButton;
let gameoverToMenuButton;
let purchaseButton;
let files;
let state;
let currentItem;
let tstatus;
let inGameShop;
let statsToggle;
let shopSubstate;
let volumeControl;
let charpos;
let velocity;
let destinationpos;
let timer;
let abilities;
let soundOn;
let soundOff;
let bg;
let icon;
let menumusic;
let difficulty;
let globalMouseToggle;
let globalMouse;
let stats;
let price;
let translatecount;
let texts;
let images;
let sound;
let items;
let inventory = [];
let bullets = [];
let minions = [];
let enemyMinions = [];

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
  loadItems();
  loadFiles(createButtons());

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
  minionFunctions();
  showAbilities();
  countCooldown();
  // showTowers();
  createBullet();
  moveBullet();
  characterStatus();
  inGameShopDisplay();
  itemDetails();
  gameOverYet();

}

//load the basic assets needed to run the menu, notes the total amount of files to load
function setAssets() {

  bg = loadImage("assets/pictures/gamebackground.jpg");
  volumeControl = true;
  files = 37;

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
    clickItem : loadSound("assets/sounds/clickItem.wav", itemLoaded),
    buyItem : loadSound("assets/sounds/buyItem.wav", itemLoaded),
    levelUp : loadSound("assets/sounds/levelUp.mp3", itemLoaded),
  };

  images = {
    character : loadImage("assets/pictures/character.PNG", itemLoaded),
    tower : loadImage("assets/pictures/tower.png", itemLoaded),
    flash : loadImage("assets/pictures/flash.jpg", itemLoaded),
    barrier : loadImage("assets/pictures/barrier.jpg", itemLoaded),
    heal : loadImage("assets/pictures/heal.png", itemLoaded),
    ignite : loadImage("assets/pictures/ignite.png", itemLoaded),
    exhaust : loadImage("assets/pictures/exhaust.png", itemLoaded),
    gold : loadImage("assets/pictures/gold.png", itemLoaded),
    ad : loadImage("assets/pictures/ad.PNG", itemLoaded),
    ap : loadImage("assets/pictures/ap.PNG", itemLoaded),
    armor : loadImage("assets/pictures/armor.PNG", itemLoaded),
    mr : loadImage("assets/pictures/mr.PNG", itemLoaded),
    speed : loadImage("assets/pictures/speed.PNG", itemLoaded),
    crit : loadImage("assets/pictures/crit.PNG", itemLoaded),
    hpregen : loadImage("assets/pictures/hpregen.PNG", itemLoaded),
    manaregen : loadImage("assets/pictures/manaregen.PNG", itemLoaded),
    armorpen : loadImage("assets/pictures/armorpen.PNG", itemLoaded),
    magicpen : loadImage("assets/pictures/magicpen.PNG", itemLoaded),
    cdr : loadImage("assets/pictures/cdr.PNG", itemLoaded),
    friendlyCannon : loadImage("assets/pictures/friendlyCannon.png", itemLoaded),
    enemyCannon : loadImage("assets/pictures/enemyCannon.png", itemLoaded),
    friendlyMinion : loadImage("assets/pictures/friendlyMinion.png", itemLoaded),
    enemyMinion : loadImage("assets/pictures/enemyMinion.png", itemLoaded),
  };

}

//Loads in all the items into its class and created the 2d array for in-game shop
function loadItems() {

  items = {

    //item creation separated by categories
    infinityEdge : new Item("Infinity Edge", width * 0.15, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/infinityEdge.png"), "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1),
    essenceReaver : new Item("Essence Reaver", width * 0.225, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/essenceReaver.png"), "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 2),
    stormRazor : new Item("Storm Razor", width * 0.3, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/stormRazor.png"), "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 3),
    starfireSpellblade : new Item("Starfire Spellbalde", width * 0.375, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/starfireSpellblade.jpg"),"assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 4),
    lastWhisper : new Item("Last Whisper", width * 0.45, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/lastWhisper.png"),"assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 5),
    frostMourne : new Item("Frost Mourne", width * 0.525, height * 0.10, width * 0.05, width * 0.05, loadImage("assets/pictures/items/frostMourne.png"), "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 6),

    rapidFirecannon : new Item("Rapid Firecannon", width * 0.15, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/rapidFirecannon.png"), "assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 7),
    thoridal : new Item("Thori'dal, Star's Fury", width * 0.225, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/thoridal.jpg"), "assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 8),
    staticShiv : new Item("Statikk Shiv", width * 0.3, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/staticShiv.png"), "assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 9),
    runnansHurricane : new Item("Runnan's Hurricane", width * 0.375, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/runnansHurricane.png"),"assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 10),
    phantomDancer : new Item("Phantom Dancer", width * 0.45, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/phantomDancer.png"), "assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 11),
    nashorsTooth : new Item("Nashor's Tooth", width * 0.525, height * 0.25, width * 0.05, width * 0.05, loadImage("assets/pictures/items/nashorsTooth.png"),"assets/cursors/startgame.cur", [221, 239, 57], [93, 152, 247], 12),

    ludensEcho : new Item("Luden's Echo", width * 0.15, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/ludensEcho.png"), "assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 13),
    rabadonsDeathcap : new Item("Rabadon's Deathcap", width * 0.225, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/rabadonsDeathcap.png"), "assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 14),
    voidStaff : new Item("Void Staff", width * 0.3, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/voidStaff.png"), "assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 15),
    lichBane : new Item("Lich Bane", width * 0.375, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/lichBane.png"), "assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 16),
    liandrysTorment : new Item("Liandry's Torment", width * 0.45, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/liandrysTorment.png"),"assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 17),
    hextechGunblade : new Item("Hextech Gunblade", width * 0.525, height * 0.4, width * 0.05, width * 0.05, loadImage("assets/pictures/items/hextechGunblade.png"),"assets/cursors/startgame.cur", [177, 30, 191], [93, 152, 247], 18),

    deadmansPlate : new Item("Dead Man's Plate", width * 0.15, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/deadmansPlate.png"), "assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 19),
    randuinsOmen : new Item("Randuin's Omen", width * 0.225, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/randuinsOmen.png"),"assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 20),
    thornMail : new Item("Thornmail", width * 0.3, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/thornMail.png"), "assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 21),
    sunfireCape : new Item("Sunfire Cape", width * 0.375, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/sunfireCape.png"),"assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 22),
    zhonyasHourglass : new Item("Zhonya's Hourglass", width * 0.45, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/zhonyasHourglass.png"),"assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 23),
    thunderFury : new Item("Thunderfury", width * 0.525, height * 0.55, width * 0.05, width * 0.05, loadImage("assets/pictures/items/thunderFury.png"),"assets/cursors/startgame.cur", [214, 80, 23], [93, 152, 247], 24),

    abyssalMask : new Item("Abyssal Mask", width * 0.15, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/abyssalMask.png"),"assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 25),
    spiritVisage : new Item("Spirit Visage", width * 0.225, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/spiritVisage.png"), "assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 26),
    adaptiveHelm : new Item("Adaptive Helm", width * 0.3, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/adaptiveHelm.png"),"assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 27),
    bansheesVeil : new Item("Banshee's Veil", width * 0.375, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/bansheesVeil.png"), "assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 28),
    hexDrinker : new Item("Hex Drinker", width * 0.45, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/hexDrinker.png"), "assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 29),
    trinityForce : new Item("Trinity Force", width * 0.525, height * 0.7, width * 0.05, width * 0.05, loadImage("assets/pictures/items/trinityForce.png"), "assets/cursors/startgame.cur", [94, 44, 135], [93, 152, 247], 30),

  };

  //shop 2-d array
  inGameShop = [[items.infinityEdge, items.essenceReaver, items.stormRazor, items.starfireSpellblade, items.lastWhisper, items.frostMourne], 
    [items.rapidFirecannon, items.thoridal, items.staticShiv, items.runnansHurricane, items.phantomDancer, items.nashorsTooth],
    [items.ludensEcho, items.rabadonsDeathcap, items.voidStaff, items.lichBane, items.liandrysTorment, items.hextechGunblade],
    [items.deadmansPlate, items.randuinsOmen, items.thornMail, items.sunfireCape, items.zhonyasHourglass, items.thunderFury],
    [items.abyssalMask, items.spiritVisage, items.adaptiveHelm, items.bansheesVeil, items.hexDrinker, items.trinityForce]];

}  
  
//Superclass that encompasses the basic coordinates
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
    fill(0, 255 ,255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

}

//Extension class responsible for clickable buttons
class Button extends GameObject {
  constructor(x, y, width, height, buttonText, textSize, textColor, clickedOn, color, hoverColor, hoverCursor) {
    super(x, y, width, height);
    this.buttonText = buttonText;
    this.textColor = textColor;
    this.textSize = textSize;
    this.clickedOn = clickedOn;
    this.color = color;
    this.hoverColor = hoverColor;
    this.hoverCursor = hoverCursor;
  }

  //function to call to use buttons previously created
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
    strokeWeight(1);
    textSize(this.textSize);
    text(this.buttonText, this.x + this.width / 2, this.y + this.height / 2);

    if(this.mouse && mouseIsPressed && !globalMouse) {
      globalMouseToggle = 1;
      this.clickedOn();
    }

  }
}

//Extension class responsible for items used in the 2d array
class Item extends GameObject {
  constructor(name, x, y, width, height, picture, hoverCursor, borderColor, hoverBorderColor, itemID) {
    super(x, y, width, height);
    this.name = name;
    this.icon = picture;
    this.hoverCursor = hoverCursor;
    this.borderColor = borderColor;
    this.hoverBorderColor = hoverBorderColor;
    this.itemID = itemID;
  }

  //Function used to call when displaying the shop/all the items
  run() {
    this.checkMouse(); 

    noFill();
    strokeWeight(7.5);

    if(this.itemID === currentItem) {
      // stroke(64, 76, 55);
      stroke(0, 255, 255);
    }
    else if (this.mouse) {
      stroke(this.hoverBorderColor);
    }
    else {
      stroke(this.borderColor);
    }

    rect(this.x, this.y, this.width, this.height);

    image(this.icon, this.x, this.y, this.width, this.height);

    if(this.mouse && mouseIsPressed && !globalMouse) {
      globalMouseToggle = 1;
      currentItem = this.itemID;
      if (volumeControl) {
        sound.clickItem.setVolume(0.1);
        sound.clickItem.play();
      }
    }

  }
}

class Creep extends GameObject {

  constructor(x, y, width, height, type, side) {
    super(x, y, width, height);
    this.type = type;
    this.side = side;
    if (type === "cannon") {
      this.hp = 300 + timer * 25;
    }
    if (type === "melee") {
      this.hp = 500 + timer * 50;
    }
    if (side === "friendly") {
      this.speed = width * 0.006;
    }
    if (side === "enemy") {
      this.speed = width * -0.006;
    }
    this.maxhp = this.hp;

  }

  moveAttack() {
    if (this.type === "melee" && this.side === "enemy") {
      if (this.x - minions[0].x >= this.width * 1.05) {
        this.x += this.speed;
      }
      else {
        for (let i = 0; i < 3; i++) {
          if (minions[i].y === this.y && frameCount % 60 === 0){
            minions[i].hp -= 20 + 2 * timer;
          }
        }
      }
    }
    if (this.type === "melee" && this.side === "friendly") {
      if (enemyMinions[0].x - this.x >= this.width * 1.05) {
        this.x += this.speed;
      }
      else {
        for (let i = 0; i < 3; i++) {
          if (enemyMinions[i].y === this.y && frameCount % 60 === 0){
            enemyMinions[i].hp -= 20 + 2 * timer;
          }
        }
      }
    }
    if (this.type === "cannon" && this.side === "enemy") {
      if (this.x - minions[0].x >= this.width * 2.5) {
        this.x += this.speed;
      }
      else {
        for (let i = 0; i < 3; i++) {
          if (minions[i].y === this.y && frameCount % 60 === 0){
            minions[i].hp -= 30 + 3 * timer;
          }
        }
      }
    }
    if (this.type === "cannon" && this.side === "friendly" ) {
      if (enemyMinions[0].x - this.x >= this.width * 2.5) {
        this.x += this.speed;
      }
      else {
        for (let i = 0; i < 3; i++) {
          if (enemyMinions[i].y === this.y && frameCount % 60 === 0){
            enemyMinions[i].hp -= 30 + 3 * timer;
          }
        }
      }
    }
  }

  show() {

    if (this.type === "melee" && this.side === "friendly") {
      image(images.friendlyMinion, this.x, this.y, this.width, this.height);
    }
    else if (this.type === "melee" && this.side === "enemy") {
      image(images.enemyMinion, this.x, this.y, this.width, this.height);
    }
    else if (this.type === "cannon" && this.side === "friendly") {
      image(images.friendlyCannon, this.x, this.y, this.width, this.height);
    }
    else if (this.type === "cannon" && this.side === "enemy") {
      image(images.enemyCannon, this.x, this.y, this.width, this.height);
    }

    //hp
    fill(81, 85, 91);
    stroke(0);
    rect(this.x, this.y - height * 0.02, width * 0.05, height * 0.01);
    fill(214, 22, 19);
    rect(this.x, this.y - height * 0.02, width * 0.05 * (this.hp / this.maxhp), height * 0.01);

  }

}

//function called when all the loading is done, initializing buttons
function createButtons() {

  openShopButton = new Button(width / 8, height * (13/24), width * 0.75, height / 8, "Loadout", 36, 0, 
    openShop, [209, 19, 221], [103, 19, 109], "assets/cursors/shop.cur");
  shopToMenuButton = new Button(width * 0.15, height * 0.85, width * 0.7, height * 0.1, "Done", 36, 0, 
    shopToMenu, [209, 19, 221], [103, 19, 109], "assets/cursors/shop.cur");
  gameoverToMenuButton = new Button(width * 0.15, height * 0.85, width * 0.7, height * 0.1, "Return To Menu", 36, 0, 
    gmToMenu, [0, 255, 255], [0, 77, 255], "assets/cursors/gotomenu.cur");

}

//button function that opens the shop
function openShop() {
  state = "shop";
  if (volumeControl) {
    sound.openstore.setVolume(0.05);
    sound.openstore.play();
  }
}

//button function that closes the shop
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

//button function that returned to the main menu from gameover screen
function gmToMenu() {
  state = "menu";
  resetGame();
  if (volumeControl) {
    sound.startgame.play();
  }
}

//assign initial values and default stats to variables
function loadData() {

  state = "menu";
  shopSubstate = false;
  currentItem = 0;
  translatecount = 0;
  tstatus = false;
  loadCount = 0;
  statsToggle = false;
  stats = {
    health : 500,
    maxhp : 500,
    mana : 200,
    maxmana : 200,
    ad : 50,
    ap : 0,
    crit : 0,
    cdr : 0,
    armor : 25,
    mr : 15,
    armorpen : 0,
    magicpen : 0,
    hpregen : 2,
    manaregen : 5,
    speed : 0,
    xp : 0,
    lvlupxp : 100,
    lvl : 1,
    gold : 100000,
  };
  texts = {
    effect1 : "",
    effect2 : "",
    effect3 : "",
    effect4 : "",
    effect5 : "",
    effect6 : "",
    additionaltexts : "",
    additionaltexts2 : "",
  };
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
      textSize(55);
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
    menumusic.play();
  }

  if (state === "game" && ! sound.bg.isPlaying() && volumeControl) {
    sound.bg.setVolume(0.2);
    sound.bg.play();  
  }

}

//function used in classes to prevent bugging out or multiclicking buttons
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

//responsible for tracking and displaying the position of the character
function characterPosition() {

  if (state === "game") {
    image(images.character, charpos.x, charpos.y, width / 16, height / 8);
  }

}

//responsible for determining the relative velocity of the character's movement relative to its destination
function determineVelocity() {

  let speedstat;
  if (150 - stats.speed > 50) {
    speedstat = stats.speed;
  }
  else {
    speedstat = 100;
  }

  if (charpos.x !== destinationpos.x && state === "game") {
    velocity.x = (destinationpos.x - charpos.x) / (150 - speedstat);
    velocity.y = (destinationpos.y - charpos.y) / (150 - speedstat);
  }

}

//responsible for moving the characters according to set restrictions (due to in game graphics) and velocities
function characterMovement() {

  if (!shopSubstate && charpos.x + velocity.x <= width - width / 16 - 75 && state === "game") {
    charpos.x += velocity.x;
  }

  if (!shopSubstate && charpos.y + velocity.y <= height - height / 8 && state === "game") {
    charpos.y += velocity.y;
  }

}

//responsible for keeping a timer which act as a guideline for game difficulty as well as player score and spawn minions
function updateTimer() {

  if (state === "game") {

    textStyle(ITALIC);
    textSize(24); 
    stroke(255, 255, 255);
    fill(0, 255, 180);
    text(timer, width / 15, height / 10);
    if (!shopSubstate && frameCount % 60 === 0) {
      timer++;
      minionsSpawn();
    }
  }
}

function minionsSpawn() {

  if (timer % 30 === 5) {
    spawnMelee();
  }
  if (timer % 30 === 8) {
    spawnCannon();
  }

}

function spawnMelee() {

  minions.push(new Creep(0, height * 0.2, width * 0.06, height * 0.1, "melee", "friendly"));
  minions.push(new Creep(0, height * 0.4, width * 0.06, height * 0.1, "melee", "friendly"));
  minions.push(new Creep(0, height * 0.6, width * 0.06, height * 0.1, "melee", "friendly"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.2, width * 0.06, height * 0.1, "melee", "enemy"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.4, width * 0.06, height * 0.1, "melee", "enemy"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.6, width * 0.06, height * 0.1, "melee", "enemy"));

}

function spawnCannon() {
  minions.push(new Creep(0, height * 0.2, width * 0.06, height * 0.1, "cannon", "friendly"));
  minions.push(new Creep(0, height * 0.4, width * 0.06, height * 0.1, "cannon", "friendly"));
  minions.push(new Creep(0, height * 0.6, width * 0.06, height * 0.1, "cannon", "friendly"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.2, width * 0.06, height * 0.1, "cannon", "enemy"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.4, width * 0.06, height * 0.1, "cannon", "enemy"));
  enemyMinions.push(new Creep(width * 0.95, height * 0.6, width * 0.06, height * 0.1, "cannon", "enemy"));
}

function minionFunctions() {

  if (state === "game") {
    //move minions
    for (let i = 0; i < minions.length; i++) {
      if (minions[i].hp <= 0) {
        //kill upon 0hp
        minions.splice(i, 1);
      }
      if (! shopSubstate) {
        minions[i].moveAttack();
      }
      minions[i].show();
    }

    for (let i = 0; i < enemyMinions.length; i++) {
      if (enemyMinions[i].hp <= 0) {
        //kill upon 0hp
        enemyMinions.splice(i, 1);
      }
      if (! shopSubstate) {
        enemyMinions[i].moveAttack();
      }
      enemyMinions[i].show();
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

//responsible for keeping track of the ability cooldowns in-game
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
// function showTowers() {

//   if (state === "game") {
//     image(images.tower, width - 75, 0, 75, 125);
//     image(images.tower, width - 75, (height - 125) / 4, 75, 125);
//     image(images.tower, width - 75, (height - 125) / 2, 75, 125);
//     image(images.tower, width - 75, (height - 125) / 4 * 3, 75, 125);
//     image(images.tower, width - 75, height - 125, 75, 125);
//   }
// }

//responsible for the creation of the bullets
function createBullet() {

  if (!shopSubstate && state === "game") {

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
      if (!shopSubstate) {
        bullets[i].move();
      }

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
        stats.health -= 50;
        bullets.splice(i, 1);
        if (volumeControl){
          sound.clickItem.setVolume(0.1);
          sound.clickItem.play();
        }
      }

    }
  }
}

//one the major functions that tracks the stats and status of the character in game and manages how they interact during gameplay
function characterStatus() {

  if (state === "game") { 

    //natural regeneration of stats
    if (!shopSubstate && frameCount % 60 === 0) {
      stats.mana += stats.manaregen;
      stats.health += stats.hpregen;
    }

    //failsafe of stats
    if (stats.mana <= 0) {
      stats.mana = 0;
    }
    else if (stats.mana >= stats.maxmana) {
      stats.mana = stats.maxmana;
    }

    if (stats.health >= stats.maxhp) {
      stats.health = stats.maxhp;
    }

    healthbar();

    manabar();

    expbar();

    lvlandgold();

    itemDisplay();

    statsMenu();

  }

}

//hp bar
function healthbar(){

  stroke(0);
  strokeWeight(2.5);
  
  if (stats.health / stats.maxhp >= 0.6) {
    fill(13, 91, 2);
  }
  else if (stats.health / stats.maxhp >= 0.3) {
    fill(73, 63, 2);
  }
  else {
    fill(112, 16, 16);
  }
  beginShape();
  vertex(0, height * 0.95);
  vertex(width * 0.27, height * 0.95);
  vertex(width * 0.3, height);
  vertex(0, height);
  endShape();

  if (stats.health / stats.maxhp >= 0.6) {
    fill(3, 186, 28);
  }
  else if (stats.health / stats.maxhp >= 0.3) {
    fill(219, 186, 2);
  }
  else {
    fill(219, 49, 2);
  }
  noStroke();
  beginShape();
  vertex(0, height * 0.95);
  vertex(width * 0.27 * (stats.health / stats.maxhp), height * 0.95);
  vertex(width * 0.27 * (stats.health / stats.maxhp) + width * 0.03, height);
  vertex(0, height);
  endShape();
  strokeWeight(1);
  stroke(255);
  fill(0);
  text(floor(stats.health), width * 0.11, height * 0.975);
  text("/", width * 0.15, height * 0.975);
  text(stats.maxhp, width * 0.2, height * 0.975);

}

//mana bar
function manabar() {

  stroke(0);
  strokeWeight(2.5);
  fill(5, 26, 104);
  beginShape();
  vertex(0, height * 0.93);
  vertex(width * 0.18, height * 0.93);
  vertex(width * 0.2, height * 0.95);
  vertex(0, height * 0.95);
  endShape();

  fill(2, 36, 209);
  noStroke();
  beginShape();
  vertex(0, height * 0.93);
  vertex(width * 0.18 * (stats.mana / stats.maxmana), height * 0.93);
  if (stats.mana !== 0) {
    vertex(width * 0.18 * (stats.mana / stats.maxmana) + width * 0.02, height * 0.95);
  }
  else {
    vertex(0, height * 0.95);
  }
  vertex(0, height * 0.95);
  endShape();

  strokeWeight(1);
  stroke(255);
  fill(0);
  textSize(18);
  text(floor(stats.mana), width * 0.05, height * 0.94);
  text("/", width * 0.1, height * 0.94);
  text(stats.maxmana, width * 0.13, height * 0.94);

}

//experience bar
function expbar() {

  stroke(0);
  strokeWeight(2.5);
  noFill();
  beginShape();
  vertex(0, height * 0.915);
  vertex(width * 0.13, height * 0.915);
  vertex(width * 0.15, height * 0.93);
  vertex(0, height * 0.93);
  endShape();
  
  fill(0, 255, 140);
  noStroke();
  beginShape();
  vertex(0, height * 0.915);
  vertex(width * 0.13 * (stats.xp / stats.lvlupxp), height * 0.915);
  if (stats.xp !== 0) {
    vertex(width * 0.13 * (stats.xp / stats.lvlupxp) + width * 0.02, height * 0.93);
  }
  else {
    vertex(0, height * 0.93);
  }
  vertex(0, height * 0.93);
  endShape();

}

//level and gold indicators and level up growth stats
function lvlandgold() {

  //gold
  fill(255, 255, 0);
  image(images.gold, width * 0.05, height * 0.88, height * 0.03, height * 0.03);
  text(stats.gold, width * 0.085, height * 0.895);
  if (!shopSubstate && frameCount % 60 === 0) {
    stats.gold += 5;
  }

  //level up
  fill(255);
  textSize(26);
  text("Lvl. " + stats.lvl, width * 0.0225, height * 0.8975);

  if (stats.xp >= stats.lvlupxp) {
    stats.xp -= stats.lvlupxp;
    stats.lvlupxp += 50;
    stats.lvl += 1;
    stats.maxhp += 50;
    stats.health += 50;
    stats.mana += 20;
    stats.maxmana += 20;
    stats.armor += 2;
    stats.speed += 5;
    stats.ad += 5;
    stats.hpregen += 1;
    stats.manaregen += 0.5;
    if (volumeControl){
      sound.levelUp.setVolume(0.3);
      sound.levelUp.play();
    }
  }

}

//display of items after purchase
function itemDisplay() {
  
  //item display, separate loops are for text priority over icons
  for (let itemcount = 0; itemcount < inventory.length; itemcount++) {
    image(inventory[itemcount].icon, width * 0.32 + itemcount * width * 0.04, height * 0.95, height * 0.05, height * 0.05);
  }
  
  for (let itemcount = 0; itemcount < inventory.length; itemcount++) {
    if (mouseX >= width * 0.32 + itemcount * width * 0.04 && mouseX <= width * 0.32 + itemcount * width * 0.04 + height * 0.05 && mouseY >= height * 0.95 && mouseY <= height) {
      fill(0, 0, 0, 75);
      noStroke();
      rect(mouseX - width * 0.02, mouseY - height * 0.17, width * 0.15, height * 0.17, 25);
      fill(255);
      textSize(18);
      currentItem = inventory[itemcount].itemID;
      text(inventory[itemcount].name, mouseX + width * 0.05, mouseY - height * 0.14);
      textSize(12);
      text(texts.effect1, mouseX + width * 0.055, mouseY - height * 0.12);
      text(texts.effect2, mouseX + width * 0.055, mouseY - height * 0.10);
      text(texts.effect3, mouseX + width * 0.055, mouseY - height * 0.08);
      text(texts.effect4, mouseX + width * 0.055, mouseY - height * 0.06);
      text(texts.effect5, mouseX + width * 0.055, mouseY - height * 0.04);
      text(texts.effect6, mouseX + width * 0.055, mouseY - height * 0.02);
    }
  }

}

//stats menu display (AD, AP, SPEED, MR, ARMOR, ARMORPEN, MAGICPEN, HPREGEN, MANAREGEN, CRIT, CDR)
function statsMenu() {

  push();

  if (! statsToggle) {
  //sliding animation when stat menu is requested
    translate(0 + translatecount, 0);
    if (mouseX >= 0 && mouseX <= 15 && mouseY >= height * 0.15 && mouseY <= height * 0.6) {
      tstatus = true;
    }
    if (mouseX >= width * 0.4) {
      tstatus = false;
    }
    if (tstatus && translatecount < width * 0.1) {
      translatecount += 20;
    }
    else if (! tstatus && translatecount > 0) {
      translatecount -= 20;
    }
  }

  else if (statsToggle) {
    translate(width * 0.1, 0);
  }
  
  //stat menu with the values and icons
  fill(0, 0, 0, 75);
  noStroke();
  rect(width * - 0.1, height* 0.15, width * 0.1, height * 0.45, 50);
  fill(255);
  textSize(28);
  image(images.ad, width * -0.085, height * 0.16, height * 0.03, height * 0.03);
  text(stats.ad, width * -0.04, height * 0.175);
  image(images.ap, width * -0.085, height * 0.20, height * 0.03, height * 0.03);
  text(stats.ap, width * -0.04, height * 0.215);
  image(images.speed, width * -0.085, height * 0.24, height * 0.03, height * 0.03);
  text(stats.speed, width * -0.04, height * 0.255);
  image(images.armor, width * -0.085, height * 0.28, height * 0.03, height * 0.03);
  text(stats.armor, width * -0.04, height * 0.295);
  image(images.mr, width * -0.085, height * 0.32, height * 0.03, height * 0.03);
  text(stats.mr, width * -0.04, height * 0.335);
  image(images.magicpen, width * -0.085, height * 0.36, height * 0.03, height * 0.03);
  text(stats.magicpen, width * -0.04, height * 0.375);
  image(images.armorpen, width * -0.085, height * 0.4, height * 0.03, height * 0.03);
  text(stats.armorpen, width * -0.04, height * 0.415);
  image(images.hpregen, width * -0.085, height * 0.44, height * 0.03, height * 0.03);
  text(stats.hpregen, width * -0.04, height * 0.455);
  image(images.manaregen, width * -0.085, height * 0.48, height * 0.03, height * 0.03);
  text(stats.manaregen, width * -0.04, height * 0.495);
  image(images.crit, width * -0.085, height * 0.52, height * 0.03, height * 0.03);
  text(stats.crit, width * -0.04, height * 0.535);
  image(images.cdr, width * -0.085, height * 0.56, height * 0.03, height * 0.03);
  text(stats.cdr, width * -0.04, height * 0.575);
  
  pop();
}

//function that runs the items previously loaded
function inGameShopDisplay() {
  if (shopSubstate && state === "game") {

    fill(154, 191, 167);
    rect(width * 0.13, height * 0.08, width * 0.7, height * 0.8);

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 5; x++) {
        inGameShop[x][y].run();
      }
    }

    textSize(64);
    fill(111, 242, 24);
    stroke(15, 66, 32);
    text("shop", width * 0.7, height * 0.13);

  } 
}

//Containts the information of all the items and displays it in shop
function itemDetails() {

  //empty strings as templates
  texts.effect1 = "";
  texts.effect2 = "";
  texts.effect3 = "";
  texts.effect4 = "";
  texts.effect5 = "";
  texts.effect6 = "";
  texts.additionaltexts = "";
  texts.additionaltexts2 = "";

  itemInfo();

  //Display the item information when selected
  if (currentItem !== 0 && shopSubstate) {
    purchaseButton = new Button(width * 0.6, height * 0.8, width * 0.2, height * 0.05, "Purchase (" + price + ")", 28, 0, 
      purchaseItem, [11, 232, 176], [45, 142, 118], "assets/cursors/shop.cur");
    image(inGameShop[ceil(currentItem / 6) - 1][(currentItem - 1) % 6].icon, width * 0.67, height * 0.28, width * 0.06, width * 0.06);
    purchaseButton.run();
    noStroke();
    fill(0);
    textSize(36);
    textStyle(BOLD);
    text(inGameShop[ceil(currentItem / 6) - 1][(currentItem - 1) % 6].name, width * 0.7, height * 0.24);
  }

  if (shopSubstate) {
    textSize(20);
    textStyle(NORMAL);
    text(texts.effect1, width * 0.7, height * 0.45);
    text(texts.effect2, width * 0.7, height * 0.48);
    text(texts.effect3, width * 0.7, height * 0.51);
    text(texts.effect4, width * 0.7, height * 0.54);
    text(texts.effect5, width * 0.7, height * 0.57);
    text(texts.effect6, width * 0.7, height * 0.6);
    textStyle(ITALIC);
    text(texts.additionaltexts, width * 0.7, height * 0.65);
    text(texts.additionaltexts2, width * 0.7, height * 0.68);
  }


}

//info of every item (name is already added during creation of items)
function itemInfo() {

  if (currentItem === 1) {
    texts.effect1 = "Damage + 100";
    texts.effect2 = "Critical Strike Chance + 30%";
    texts.effect3 = "Critical Strike Damage + 20%";
    texts.additionaltexts = "MASSIVELY enhance critical strikes";
    price = 4000;
  }
  if (currentItem === 2) {
    texts.effect1 = "Damage + 70";
    texts.effect2 = "Mana Regeneration + 5 / Second";
    texts.effect3 = "Mana + 200";
    texts.effect4 = "Abilities Cooldown - 20% (Max 70%)";
    texts.additionaltexts = "Legend has it that this blade was the";
    texts.additionaltexts2 = "harvestor of essence";
    price = 3500;
  }
  if (currentItem === 3) {
    texts.effect1 = "Damage + 40";
    texts.effect2 = "Critical Chance + 30% (Max 100%)";
    texts.effect3 = "Speed + 20";
    texts.effect4 = "Abilities Cooldown - 20% (Max 70%)";
    texts.additionaltexts = "From the depth of the tempest";
    price = 3500;
  }
  if (currentItem === 4) {

    texts.effect1 = "Damage + 50";
    texts.effect2 = "Ability Power + 80";
    texts.effect3 = "Mana + 400";
    texts.effect4 = "Deals Increased Damaged to Low Health Targets";
    texts.additionaltexts = "The lost blade of the Archangel";
    price = 3600;
  }
  if (currentItem === 5) {
    texts.effect1 = "Damage + 40";
    texts.effect2 = "Armor Penetration + 40%";
    texts.additionaltexts = "Lethal, through any armor";
    price = 2800;
  }

  if (currentItem === 6) {
    texts.effect1 = "Damage + 30";
    texts.effect2 = "Heals for 10% of Damage Dealt";
    texts.effect3 = "Ability Cooldown - 10% (Max 70%)";
    texts.effect4 = "Attacks Deal Additional Damage Equals";
    texts.effect5 = "to 2% of the Target's Current Health";
    texts.additionaltexts = "A mythical blade that drain souls";
    price = 3600;
  }
  if (currentItem === 7) {
    texts.effect1 = "Ability Cooldown - 20% (Max 70%)";
    texts.effect2 = "Critical Strike Chance + 30% (Max 100%)";
    texts.effect3 = "Speed + 25";
    texts.additionaltexts = "Loaded and ready";
    price = 2500;
  }
  if (currentItem === 8) {
    texts.effect1 = "Dealing Damage Generates Gold";
    texts.effect2 = "Ability Cooldowns - 10% (Max 70%)";
    texts.effect3 = "Mana + 200";
    texts.effect4 = "Critical Strike Chance + 10% (Max 100%)";
    texts.additionaltexts = "The wrath of gods";
    price = 2750;
  }
  if (currentItem === 9) {
    texts.effect1 = "Ability Cooldown - 20% (Max 70%)";
    texts.effect2 = "Critical Strike Chance + 20% (Max 100%)";
    texts.effect3 = "Speed + 10";
    texts.effect4 = "Abilities can Shock Enemies";
    texts.additionaltexts = "Forged with lightning and thunder";
    price = 2500;
  }
  if (currentItem === 10) {
    texts.effect1 = "Damage + 40";
    texts.effect2 = "Ability Cooldowns - 10% (Max 70%)";
    texts.effect3 = "Critical Strike Chance + 10% (Max 100%)";
    texts.effect4 = "Attacks Have a Small Chance";
    texts.effect5 = "to deal Double Damage";
    texts.additionaltexts = "An utter devastation";
    price = 2800;
  }
  if (currentItem === 11) {
    texts.effect1 = "Speed + 20 (Max 80)";
    texts.effect2 = "Ability Cooldowns - 20% (Max 70%)";
    texts.effect3 = "Critical Strike Chance + 20% (Max 100%)";
    texts.effect4 = "(IN PROGRESS) Go Invisible";
    texts.additionaltexts = "The unseen blade is the deadliest";
    price = 2800;
  }

  if (currentItem === 12) {
    texts.effect1 = "Ability Power + 80";
    texts.effect2 = "Ability Cooldowns - 20% (Max 70%)";
    texts.effect3 = "Critical Strike Chance + 20%";
    texts.additionaltexts = "The tooth of an ancient beast";
    price = 3000;
  }
  if (currentItem === 13) {
    texts.effect1 = "Ability Power + 100";
    texts.effect2 = "Mana + 400";
    texts.effect3 = "Ability Cooldowns - 20% (Max 70%)";
    texts.additionaltexts = "The staff of an ancient archmage";
    price = 3200;
  }
  if (currentItem === 14) {
    texts.effect1 = "Ability Power + 150";
    texts.effect2 = "Ability Power Increased by 20%";
    texts.additionaltexts = "Descend into madness...";
    price = 4000;
  }
  if (currentItem === 15) {
    texts.effect1 = "Ability Power + 80";
    texts.effect2 = "Magic Penetration + 40%";
    texts.additionaltexts = "Dispel and destroy";
    price = 3000;
  }
  if (currentItem === 16) {
    texts.effect1 = "You Have 50 Points of Attack Damage";
    texts.effect2 = "Ability Power + 200";
    texts.effect3 = "Speed + 10";
    texts.effect4 = "Your Abilities Have a Chance to Heal You";
    texts.effect5 = "Loses 5 Health / Second";
    texts.additionaltexts = "The curse was never lifted...";
    price = 3800;
  }
  if (currentItem === 17) {
    texts.effect1 = "Ability Power + 60";
    texts.effect2 = "Magic Penetration + 15%";
    texts.effect3 = "Health + 250";
    texts.effect4 = "Spell Burn the Target Equal to 1%";
    texts.effect5 = "of it's Maximum Health";
    texts.additionaltexts = "It's truely an honor, isn't it?";
    texts.additionaltexts2 = "to be remembered? Pity you";
    price = 2800;
  }

  if (currentItem === 18) {
    texts.effect1 = "Damage + 40";
    texts.effect2 = "Ability Power + 80";
    texts.effect3 = "Heals for 5% of All Damage Dealt";
    texts.effect4 = "Mana + 150";
    texts.additionaltexts = "The only way to stop war is war";
    price = 3600;
  }
  if (currentItem === 19) {
    texts.effect1 = "Armor + 40";
    texts.effect2 = "Health + 400";
    texts.effect3 = "You Gain Increased Speed Based on Missing Health";
    texts.effect4 = "up to a Maximum of 30";
    texts.additionaltexts = "There is one way you are getting this armor from me...";
    price = 3500;
  }
  if (currentItem === 20) {
    texts.effect1 = "Armor + 30";
    texts.effect2 = "Health + 450";
    texts.effect3 = "-30% From Critical Strikes";
    texts.additionaltexts = "I have no weaknesses";
    price = 3500;
  }
  if (currentItem === 21) {
    texts.effect1 = "Health + 250";
    texts.effect2 = "Armor + 80";
    texts.effect3 = "Reflect 5% of Physical Damage Taken";
    texts.additionaltexts = "How did he even put it on in the first place?";
    price = 3500;
  }
  if (currentItem === 22) {
    texts.effect1 = "Health + 500";
    texts.effect2 = "Health Renegeration + 8 / Second";
    texts.additionaltexts = "It embodies all possible meanings of";
    texts.additionaltexts2 = "the word 'indestructible'";
    price = 4000;
  }
  if (currentItem === 23) {
    texts.effect1 = "Ability Power + 50";
    texts.effect2 = "Armor + 40";
    texts.effect3 = "Upon Taking Lethal Damage, Prevent Death";
    texts.effect4 = "and Return to 500 or 20% Maximum Health";
    texts.effect5 = "(Whichever is Greater, Works Once)";
    texts.additionaltexts = "Even time bends to my will";
    price = 3500;
  }
  if (currentItem === 24) {
    texts.effect1 = "Damage + 60";
    texts.effect2 = "Armor + 30";
    texts.effect3 = "Magic Peneration + 20%";
    texts.additionaltexts = "Sharp and energetic";
    price = 3300;
  }
  if (currentItem === 25) {
    texts.effect1 = "Health + 350";
    texts.effect2 = "Magic Resist + 45";
    texts.effect3 = "Mana + 250";
    texts.effect4 = "Mana Regeneration + 4 / Second";
    texts.additionaltexts = "Who am I? None of your business";
    price = 4000;
  }
  if (currentItem === 26) {
    texts.effect1 = "Health + 450";
    texts.effect2 = "Mana + 250";
    texts.effect3 = "Mana Regeneration + 2 / Second";
    texts.effect4 = "Health Regeneration + 4 / Second";
    texts.effect5 = "Magic Resist + 55";
    texts.effect6 = "Improve Healing of all Sources by 20";
    texts.additionaltexts = "Blessed by the kings of the court";
    texts.additionaltexts2 = "and maintained by the purest magic";
    price = 3800;
  }
  if (currentItem === 27) {
    texts.effect1 = "Health + 250";
    texts.effect2 = "Mana + 200";
    texts.effect3 = "Mana Regeneration + 5 / Second";
    texts.effect4 = "Gain Armor and Magic Resist Over Time,";
    texts.effect5 = "up to a Maximum of 30 for Each";
    texts.additionaltexts = "Flexible yet strong";
    price = 3500;
  }
  if (currentItem === 28) {
    texts.effect1 = "Magic Penetration + 10%";
    texts.effect2 = "Ability Power + 65";
    texts.effect3 = "Magic Resist + 35";
    texts.effect4 = "10% Chance to Prevent Spells";
    texts.additionaltexts = "It was destined to doom once the";
    texts.additionaltexts2 = "secret was unveiled...";
    price = 3600;
  }
  if (currentItem === 29) {
    texts.effect1 = "Damage + 60";
    texts.effect2 = "Magic Resist + 40";
    texts.effect3 = "Prevent 15% of Magic Damage Taken";
    texts.additionaltexts = "It feasts upon magic";
    price = 3300;
  }

  if (currentItem === 30) {
    texts.effect1 = "Health + 300   Mana + 200";
    texts.effect2 = "Speed + 20   Magic Resist + 30";
    texts.effect3 = "Armor + 30   Armor Peneration + 20%";
    texts.effect4 = "Magic Penetration + 20%";
    texts.effect5 = "Ability Cooldowns - 20%";
    texts.effect6 = "Critical Strike Chance + 20%";
    texts.additionaltexts = "A true display of skill";
    price = 5000;
  }

}

//Function of the Purchase button, adds stats to the character and the item to the inventory
function purchaseItem() {

  if (stats.gold >= price && inventory.length < 6) {

    //deducts gold and adds the item to inventory
    stats.gold -= price;
    inventory.push(inGameShop[ceil(currentItem / 6) - 1][(currentItem - 1) % 6]);

    //purchase sound
    if (volumeControl) {
      sound.buyItem.setVolume(0.1);
      sound.buyItem.play();
    }

    addStats();

  }

  //insufficient gold sound
  else if (volumeControl) {
    sound.gameover.setVolume(0.1);
    sound.gameover.play();
  }

}

//stats added for each item
function addStats() {

  if (currentItem === 1) {
    stats.ad += 100;
    stats.crit += 30;
    //special ability +20 crit damage
  }
  if (currentItem === 2) {
    stats.ad += 70;
    stats.manaregen += 5;
    stats.maxmana += 200;
    stats.mana += 200;
    stats.cdr += 20;
  }
  if (currentItem === 3) {
    stats.ad += 40;
    stats.crit += 30;
    stats.speed += 20;
    stats.cdr += 20;
  }
  if (currentItem === 4) {
    stats.ad += 50;
    stats.ap += 80;
    stats.maxmana += 400;
    stats.mana += 400;
    //special ability does increased dmg to low hp targets
  }
  if (currentItem === 5) {
    stats.armorpen += 40;
    stats.ad += 40;
  }
  if (currentItem === 6){
    stats.ad += 30;
    stats.cdr += 10;
    //special ability heals for 10% AND does 2% current HP
  }
  if (currentItem === 7) {
    stats.cdr += 20;
    stats.speed += 25;
    stats.crit += 30;
  }
  if (currentItem === 8) {
    stats.cdr += 10;
    stats.maxmana += 200;
    stats.mana += 200;
    stats.crit += 10;
    //special ability dealing damage geneartes gold
  }
  if (currentItem === 9) {
    stats.cdr += 20;
    stats.crit += 20;
    stats.speed += 10;
    //special ability shock kenemies
  }
  if (currentItem === 10) {
    stats.ad += 40;
    stats.cdr += 10;
    stats.crit += 10;
    //special ability chance to double dmg
  }
  if (currentItem === 11) {
    stats.speed += 20;
    stats.cdr += 20;
    stats.crit += 20;
    //go invisible
  }
  if (currentItem === 12) {
    stats.ap += 80;
    stats.cdr += 20;
    stats.crit += 20;
  }
  if (currentItem === 13) {
    stats.ap += 100;
    stats.maxmana += 400;
    stats.mana += 400;
    stats.cdr += 20;
  }
  if (currentItem === 14) {
    stats.ap += 150;
    //special ability +20% total ap
  }
  if (currentItem === 15){
    stats.ap += 80;
    stats.magicpen += 40;
  }
  if (currentItem === 16) {
    stats.ap += 200;
    stats.speed += 10;
    //health regen is always -5, ad is always 50, special ability heal you
  }
  if (currentItem === 17) {
    stats.ap += 60;
    stats.magicpen += 15;
    stats.maxhp += 250;
    stats.health += 250;
    //special ability burn 1% maximum health 
  }
  if (currentItem === 18) {
    stats.ad += 40;
    stats.ap += 80;
    stats.maxmana += 150;
    stats.mana + 150;
    //special ability heal 5%
  }
  if (currentItem === 19) {
    stats.armor += 40;
    stats.maxhp += 400;
    stats.health += 400;
    //gain increased speed (up to 30%) based on missing hp
  }
  if (currentItem === 20) {
    stats.armor += 30;
    stats.maxhp += 450;
    stats.health += 450;
    //special ability -30% from crits
  }
  if (currentItem === 21) {
    stats.maxhp += 250;
    stats.health += 250;
    stats.armor += 80;
    //special ability reflect 5% Physical damage
  }
  if (currentItem === 22) {
    stats.maxhp += 500;
    stats.health += 500;
    stats.hpregen += 8;
  }
  if (currentItem === 23) {
    stats.ap += 50;
    stats.armor += 40;
    //GA effect
  }
  if (currentItem === 24) {
    stats.ad += 60;
    stats.armor += 30;
    stats.magicpen += 20;
  }
  if (currentItem === 25) {
    stats.maxhp += 350;
    stats.health += 350;
    stats.mr += 45;
    stats.maxmana += 250;
    stats.mana += 250;
    stats.manaregen += 4;
  }
  if (currentItem === 26) {
    stats.maxhp += 450;
    stats.health += 450;
    stats.maxmana += 250;
    stats.mana += 250;
    stats.manaregen += 2;
    stats.hpregen += 4;
    stats.mr += 55;
    //special ablity improve healing
  }
  if (currentItem === 27) {
    stats.maxhp += 250;
    stats.health += 250;
    stats.maxmana += 200;
    stats.mana += 200;
    stats.manaregen += 5;
    //gain armor and magic resist over time up to 30 of each
  }
  if (currentItem === 28) {
    stats.magicpen += 10;
    stats.ap += 65;
    stats.mr += 35;
    //10% to prevent spells
  }
  if (currentItem === 29) {
    stats.ad += 60;
    stats.mr += 40;
    //special ability prevent 15% all magic damage
  }
  if (currentItem === 30) {
    stats.maxhp += 300;
    stats.health += 300;
    stats.maxmana += 200;
    stats.mana += 200;
    stats.speed += 20;
    stats.mr += 30;
    stats.armor += 30;
    stats.armorpen += 20;
    stats.magicpen += 20;
    stats.cdr += 20;
    stats.crit += 20;
  }

}

//responsible for resetting and cleaning up the game after it is done
function gameOverYet() {

  //Dies if health falls below 0
  if (state === "game" && stats.health <= 0) {
    state = "gameover";
    if (volumeControl) {
      sound.gameover.setVolume(0.1);
      sound.gameover.play();
    }
  }
 
  //jumps to end screen thereafter
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
  translatecount = 0;
  tstatus = false;
  statsToggle = false;
  stats = {
    health : 500,
    maxhp : 500,
    mana : 200,
    maxmana : 200,
    ad : 50,
    ap : 0,
    crit : 0,
    cdr : 0,
    armor : 25,
    mr : 15,
    armorpen : 0,
    magicpen : 0,
    hpregen : 1,
    manaregen : 2,
    speed : 0,
    xp : 0,
    lvlupxp : 100,
    lvl : 1,
    gold : 100000,
  };
  texts = {
    effect1 : "",
    effect2 : "",
    effect3 : "",
    effect4 : "",
    effect5 : "",
    effect6 : "",
    additionaltexts : "",
    additionaltexts2 : "",
  };
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
  timer = 0;
  difficulty = 2500;
  bullets = [];
  minions = [];
  enemyMinions = [];

}

//mouseclicks determine the destination of the character movement and to navigate through the menus
function mousePressed() {

  //Start button and Loading bar
  if (state === "menu" && mouseX >= width / 10 && mouseX <= width * 0.9 &&
    mouseY >= height * 0.75 && mouseY <= height / 4 * 3 + height / 6 && loadCount === files) {
    state = "game";
    menumusic.stop();
    if (volumeControl) {
      sound.startgame.setVolume(0.1);
      sound.startgame.play();
    }
  }

  //Move Commands
  if (!shopSubstate && state === "game") {
    destinationpos.x = mouseX;
    destinationpos.y = mouseY;
    if (volumeControl) {
      sound.click.setVolume(0.1);
      sound.click.play();
    }
  }

  //Sound Control
  if (mouseX >= width * 0.95 && mouseX <= width * 0.95 + height / 15 && mouseY >= height * 0.9 && mouseY <= height * (29/30) && state !== "game") {
    volumeControl = ! volumeControl;
    if (! volumeControl) {
      menumusic.stop();
    }
  }

  //Loading Screen Summoner Spell Buttons
  if (state === "shop") {

    //flash
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
  
    //heal
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
  
    //barrier
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
  
    //ignite
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
  
    //exhaust
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

    //deselect if click elsewhere
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

    //Opens and closes the in-game shop
    if ((key === "`" || key === "p") && state === "game") {
      shopSubstate = !shopSubstate;
      if (!shopSubstate) {
        currentItem = 0;
        if (volumeControl) {
          sound.closestore.setVolume(0.1);
          sound.closestore.play();
        }
      }
      else if (shopSubstate && volumeControl) {
        sound.openstore.setVolume(0.1);
        sound.openstore.play();
      }

    }

    if (key === "c" && state === "game") {
      statsToggle = ! statsToggle;
    }
  
    //flash
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

    //barrier
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
  loadItems();

}