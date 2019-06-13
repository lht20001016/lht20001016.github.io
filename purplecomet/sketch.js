//example adapted from Jeffrey Thompson
let hit = false;
let poly = [[], []];
let randomPoly = [[], []];
let x = 150;

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(255);

  poly[0][0] = createVector(50, 50);
  poly[0][1] = createVector(100, 100);
  poly[0][2] = createVector(80, 110);
  poly[0][3] = createVector(30, 60);

  randomPoly[0][0] = createVector(mouseX, mouseY);
  randomPoly[0][1] = createVector(mouseX + 100, mouseY - 60);
  randomPoly[0][2] = createVector(mouseX + 60, mouseY - 20);
  randomPoly[0][3] = createVector(mouseX - 40, mouseY - 40);

  beginShape();
  for (let i=0; i < poly[0].length; i++){
    vertex(poly[0][i].x,poly[0][i].y);
  }
  endShape(CLOSE);

  beginShape();
  for (let i=0; i < randomPoly[0].length; i++){
    vertex(randomPoly[0][i].x,randomPoly[0][i].y);
  }
  endShape(CLOSE);

  hit = collidePolyPoly(poly[0],randomPoly[0],true);

  print("colliding? " + hit);
  
  let theta = PI / 20;
  let x = 500;
  let y = 500;
  let rwidth = 50;
  let rheight = 50;

  push();
  translate(x, y);
  rotate(theta);
  rect(0, 0, rwidth. rheight);
  pop();

  beginShape();
  vertex(500, 500);
  vertex(500 + 50 * cos(theta), 500 + 50 * sin(theta));
  vertex(500 + 50 * cos(theta) - 50 * sin(theta), 500 + 50 * sin(theta) + 50 * cos(theta));
  vertex();
  endShape(CLOSE);

}
