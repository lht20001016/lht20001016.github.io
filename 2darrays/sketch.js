//2d arrays

function setup () {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid();
}

function create2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < cols; i++) {
    emptyArray.push([]);
    for (let j = 0; j < rows; j++){
      emptyArray[i].push(0);
    }
  }

  return emptyArray;
} 


function createrRandom2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < cols; i++) {
    emptyArray.push([]);
    for (let j = 0; j < rows; j++){
      if (random(100) < 50){
        emptyArray[].push(0);
      }
      else { 
        emptyArray[i].push(0);
      }
    }
  }

  return emptyArray;
} 