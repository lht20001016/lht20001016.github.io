let infinityEdge;
let infinityEdgePicture;

class GameObject {
  constructor(x, y, width, height) {
    //position cords
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouse;
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

function preload() {
  infinityEdgePicture = loadImage("assets/pictures/infinityEdge.jpg");
}

function createShop() {
  infinityEdge = new Item(width * 0.15, height * 0.11, width * 0.05, width * 0.05, infinityEdgePicture, infinityEdgeFunction, 
    "assets/cursors/startgame.cur", [25, 104, 232], [93, 152, 247], 1);
}