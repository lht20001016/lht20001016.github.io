let triangleVertices = [
  {x: 400, y: 100},
  {x: 100, y: 600},
  {x: 700, y: 600},
];

let depth = 0;


function setup() {
  createCanvas(800, 700);
}

function draw() {
  background(220);
  sierpinski(triangleVertices, depth);

}

function getMid(point1, point2) {
  let xdiff = point1.x + point2.x;
  let ydiff = point1.y + point2.y;
  let mid = {
    x : xdiff / 2,
    y : ydiff /2,
  };
  return mid;
}

function sierpinski(points, degree) {

  let colors = ["red", "purple", "blue", "green", "orange", "pink", "yellow"];

  noStroke();
  fill (colors[degree % 7]);

  triangle(points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y);

  if (degree > 0) {

    sierpinski([points[0], getMid(points[0], points[1]), getMid(points[0], points[2])], degree - 1);
    sierpinski([points[1], getMid(points[0], points[1]), getMid(points[1], points[2])], degree - 1);
    sierpinski([points[2], getMid(points[0], points[2]), getMid(points[1], points[2])], degree - 1);
  }

}

function mouseClicked() {
  depth += 1;
}