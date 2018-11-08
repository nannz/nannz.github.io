"use strict";
var mumR = 30;
var childR = 10;
var t;
var C_GRAVITY = 20;
var mumPos;
var tadpoles = [];
var thisTime;

function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  ellipseMode(CENTER);
  fill(0);
  mumPos = createVector(width / 2, height / 2);
  t = new Tadpole(random(width), random(height), childR);

  for (var i = 0; i < 10; i++) {
    tadpoles.push(new Tadpole(random(width), random(height), childR));
  }

  thisTime = millis();
}

function draw() {
  background(255);
  var mouseVec = createVector(mouseX, mouseY);

  // //var newTadpoles = tadpoles.slice();
  // var deadTadpoles = [];
  // //update the tadpoles
  tadpoles.forEach(function(t) {
  //   var dist2Mouse = mouseVec.dist(t.pos);
  //   if (dist2Mouse < mumR / 2) {
  //     //this t dies.
  //     t.isDead = true;
  //   }
  //   if(t.isDead){deadTadpoles.push(t);}
    t.flock(tadpoles);
    t.update();
    t.checkEdges();
    t.display();
  });
  // console.log(deadTadpoles);
  // var newTadpoles = tadpoles.filter(function(t){t.isDead==true});
  
  
  //draw the mouse
  if (mouseX != 0 && mouseY != 0) {
    mumPos.x = mouseX;
    mumPos.y = mouseY;
    ellipse(mouseX, mouseY, mumR, mumR);
  } else {
    mumPos.x = width / 2;
    mumPos.y = height / 2;
    ellipse(width / 2, height / 2, mumR, mumR);
  }


  //draw new tabpoles
  //set a timer, each 1 sseconds
  if (millis() - thisTime > 200) {
    drawTabpoles();
    thisTime = millis();
  }

  //if the length exceeds 20, delete the old tadpoles
  if (tadpoles.length >= 50) {
    //tadpoles = tadpoles.reverse();
    //tadpoles.pop();
    tadpoles = tadpoles.slice(1);
  }

  //if it is in the black circle(mouse), it die.

}

function drawTabpoles() {
  var newT = new Tadpole(random(200), random(200));
  tadpoles.push(newT);
}

function mouseClicked() {
  tadpoles = [];
}