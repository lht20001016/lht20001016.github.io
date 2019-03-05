// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let state;
let green;
let red;
let yellow;
let ms;

function setup() {
  createCanvas(600, 600);
  loadData();
}

function draw() {
  background(255);
  ms = millis();
  drawOutlineOfLights();
  states();
  workStates();
}

function loadData() {
  state = 1;
  red = 0;
}

function drawOutlineOfLights() {
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
}

function states() { //1000 millis = 1s
  if (state === 1 &&  ms - red >= 15000) {
    state = 2;
    green = ms;
  }
  else if (state === 2 && ms - green >= 2000) {
    state = 3;
    yellow = ms;
  }
  else if (state === 3 && ms - yellow >= 20000) {
    state = 1;
    red = ms;
  }
}

function workStates() {

  if (state === 1) { //green
    fill(127, 38, 41);
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill(193, 196, 45);
    ellipse(width/2, height/2, 50, 50); //middle
    fill(89, 255, 0);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }

  if (state === 2) { //yellow
    fill(127, 38, 41);
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill(250, 225, 0);
    ellipse(width/2, height/2, 50, 50); //middle
    fill(71, 135, 55);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }

  if (state === 3) { //red
    fill(255, 0, 8);
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill(193, 196, 45);
    ellipse(width/2, height/2, 50, 50); //middle
    fill(71, 135, 55);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }

}
