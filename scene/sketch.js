// Shooting Stars
// Kyle Luo
// February 26, 2019
//
// Extra for Experts:
// - Added Sound
// - Made Custom Shapes

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  createGame();
}

function draw() {
  ellipse(100, 100, 100)
}

function createGame() {
  strokeWeight(4);
  stroke(0, 255, 255);
  noFill();
  beginShape();
  vertex(windowWidth / 3, windowHeight / 6);  
  vertex(windowWidth / 3, windowHeight / 6 * 5);
  vertex(windowWidth / 3 * 2, windowHeight / 6 * 5);
  vertex(windowWidth / 3 * 2, windowHeight / 6);
  endShape();
}
