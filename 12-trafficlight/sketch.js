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
let greenOn;
let greenOff;
let yellowOn;
let yellowOff;
let redOn;
let redOff;
let greenc;
let redc;
let yellowc;

function setup() {
  createCanvas(600, 600);
  loadData();
}

function draw() {
  background(255);
  keepTime();
  drawOutlineOfLights();
  states();
  workStates(greenc, yellowc, redc);
}

function loadData() {
  state = 1;
  red = 0;
  greenOn = [89, 255, 0];
  greenOff = [71, 135, 55];
  yellowOn = [250, 225, 0];
  yellowOff = [193, 196, 45];
  redOn = [255, 0, 8];
  redOff = [127, 38, 41];
  greenc = greenOn;
  redc = redOff;
  yellowc = yellowOff;
}

function drawOutlineOfLights() {
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
}

function keepTime() {
  ms = millis();
}

function states() { //1000 millis = 1s
  if (state === 1 &&  ms - red >= 5000) {
    state = 2;
    green = ms;
    greenc = greenOn;
    redc = redOff;
    yellowc = yellowOff;
  }
  else if (state === 2 && ms - green >= 5000) {
    state = 3;
    yellow = ms;
    greenc = greenOff;
    yellowc = yellowOn;
    redc = redOff;
  }
  else if (state === 3 && ms - yellow >= 1000) {
    state = 1;
    red = ms;
    greenc = greenOff;
    yellowc = yellowOff;
    redc = redOn;
  }
}

function workStates(greenc, yellowc, redc) {
  fill(redc);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(yellowc);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(greenc);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
