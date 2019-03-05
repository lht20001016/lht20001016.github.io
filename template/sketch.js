// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state;
let rectx;
let recty;
let rects;
let vx;
let vy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = 1;
  rectx = 0;
	recty = 0;
	rects = 75;
  vx = windowWidth / 50;
	vy = windowHeight / 25;
}

function draw() {
  background(255);
  fill(0)
  rect(rectx, recty, rects, rects)
  if (state === 1 && rectx + vx <= windowWidth - rects) {
    rectx += vx;
  }
  else if (state === 2 && recty + vy <= windowHeight - rects) {
    recty += vy;
  }
  else if (state === 3 && rectx - vx >= 0) {
    rectx -= vx;
  }
  else if (state === 4 && recty - vy >= 0) {
    recty -= vy;
  }
  else {
		if (state !== 4){
      state++;
    }
    else {
      state = 1;
    }
  }
}