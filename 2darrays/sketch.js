// Grid Demo
// Dan Schellenberg
// April 1, 2019

let gridSize = 50;
let grid;
let cellSize;
let autoplay;

function setup() {
  if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  grid = createRandom2DArray(gridSize, gridSize);
  cellSize = width/gridSize;
}

function draw() {
  background(255);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}


function create2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      emptyArray[i].push(0);
    }
  }
  return emptyArray;
}

function createRandom2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      if (random(100) < 50) {
        emptyArray[i].push(0);
      }
      else {
        emptyArray[i].push(1);
      }
    }
  }
  return emptyArray;
}

function update() {
  let nextTurn = create2DArray(gridSize, gridSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let friends = 0;
      //look at 3x3 grid
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (i+k >= 0 && i+k < gridSize && j+l >= 0 && j+l < gridSize){
            friends += grid[i+k][j+l];
          }
        }
      }
      friends -= grid[i][j];

      //apply rules
      if (grid[i][j] === 1 && (friends === 2 || friends === 3)) {
        nextTurn[i][j] = 1;
      }
      else if (grid[i][j] === 0 && friends === 3) {
        nextTurn[i][j] = 1;
      }
    }
  }
  grid = nextTurn;
}

function keyPressed() {
  if (key === " "){
    window.clearInterval(autoplay);
    update();
  }
  if (key === "c"){
    grid = create2DArray(gridSize, gridSize);
  }
  if (key === "r"){
    grid = createRandom2DArray(gridSize, gridSize);
  }
  if (key === "a"){
    autoplay = window.setInterval(update, 50);
  }
  if (key === "s"){
    saveJSON(grid, "thegrid.json");
  }
  if (key === "l"){
    noLoop();
    grid = loadJSON("assets/thegrid.json", done);
  }
}

function done(){
  loop();
}

function mousePressed() {
  let xcoord = floor(mouseX / cellSize);
  let ycoord = floor(mouseY / cellSize);

  if (grid[ycoord][xcoord] === 1) {
    grid[ycoord][xcoord] = 0;
  }
  else {
    grid[ycoord][xcoord] = 1;
  }
}