var hit = false;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255);
  fill(0);
	rect(200,200,100,150);
	rect(mouseX,mouseY,50,75);

	hit = collideRectRect(200,200,100,150,mouseX,mouseY,50,75);

	console.log("colliding? " + hit);

}