var yoff = 0.0;
var img;
var waveCenterX = 100.0;
var waveCenterY = 0.0;
var rotateAngle = 0.0;
var rotateAngle2 = 0.0;
function preload() {
  boat = loadImage('/boat.png');
  drop = loadImage('/drop-big.png');
}

function setup() {
  createCanvas(200, 200);
  imageMode(CENTER);
}

function draw() {
  background(255);
  drawWave();
  
  push();
  translate(width/2, height/2);
  rotateAngle2 = map(mouseX, 0, width, PI / 6.0,-PI / 6.0);
  rotate(rotateAngle2);
  image(boat, waveCenterX-width/2, waveCenterY-5-height/2, 15, 15);
  pop();
  
  rotateAngle = map(mouseX, 0, width, -PI / 6.0,PI / 6.0);
  push();
  translate(width/2, height/2);
  rotate(rotateAngle);
  blend(drop, 0, 0, 300, 300, -width/2-50, -height/2-50, 300,300, DARKEST);
  pop();
  

}

//for contour - 逆时针！！！
function drawDrop() {
  push();
  stroke(255, 0, 0);
  fill(255, 255, 255);
  beginShape(); //external
  vertex(0 + 10, 0 + 10);
  vertex(width - 10, 0 + 10);
  vertex(width - 10, height - 10);
  vertex(0 + 10, height - 10);
  beginContour(); //the internal drop
  vertex(100, 50);
  curveVertex(70, 100);
  curveVertex(77, 145);
  curveVertex(123, 145);
  curveVertex(130, 100);
  vertex(100, 50);
  endContour();
  endShape(CLOSE);
  pop();

}

function drawWave() {
  fill(51);
  stroke(255);
  // We are going to draw a polygon out of the wave points
  beginShape();
  var xoff = 0;

  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 5) {
    // Calculate a y value according to noise, map to
    var y = map(noise(xoff, yoff), 0, 1, height / 2 - 50, height / 2 + 100);
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    
    if(x == 100) waveCenterY = y;
    
    
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}