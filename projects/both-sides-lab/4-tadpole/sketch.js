"use strict";
var mumR = 30;
var childR = 10;
var t;
var C_GRAVITY = 20;
var mumPos;
var tadpoles = [];
function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  ellipseMode(CENTER);
  fill(0);
  mumPos = createVector(width / 2, height / 2);
  t = new Tadpole(random(width), random(height), childR);
  
  for (var i = 0;i<20; i++){
    tadpoles.push(new Tadpole(random(width), random(height), childR));
  }
}

function draw() {
  background(255);
  var mouseVec = createVector(mouseX, mouseY);
  
  
  for(var i = 0; i < tadpoles.length; i++){
    var t = tadpoles[i];
    t.flock(tadpoles);
    t.update();
    t.checkEdges();
    t.display();
  }
  

  if (mouseX != 0 && mouseY != 0) {
    mumPos.x = mouseX;
    mumPos.y = mouseY;
    ellipse(mouseX, mouseY, mumR, mumR);
  } else {
    mumPos.x = width / 2;
    mumPos.y = height / 2;
    ellipse(width / 2, height / 2, mumR, mumR);
  }
}