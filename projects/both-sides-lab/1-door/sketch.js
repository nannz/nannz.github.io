var h = 0;
var s=50;
var b=100;
var myCanvas;
var r1 = 15;
var r2 = 25;
function setup() {
  createCanvas(200,200);
  colorMode(HSB, 360, 100, 100, 1).
  background(h,s,b);
  noStroke();
}

function draw() {
  background(h,s,b);
  if(mouseX > 0 && mouseX <200 && mouseY >0 && mouseY < 200){
    b = 100;
  }else{
    b = 0;
  }
  h += 1;
  if(h>360){
    h = 0;
  }
  
  //draw the window
  
  fill(0,0,100); //should be white
  //a circle and a rect
  drawShape(r1, width/2 - 50, height/2 + 10);
  drawShape(r2, width/2, height/2 - 2 * (r2-r1) + 10);
  
}

function drawShape(_r, _translateX, _translateY){
  //console.log('run the function');
  push();
  translate(_translateX, _translateY);
  rect(0, 0, 2 * _r, 2 * _r);
  ellipse(_r,0,2 *_r,2 *_r);
  pop();
}