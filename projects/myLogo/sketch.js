/**
 * Assignment for week 1
 * make behicle following path
 * based on my logo
 */
"use strict"
var path;
var logoImg;
var debug = false;
var vehicles = [];
var numOfVehicles = 10;

var RES = 360;
var sinArray  = [];
var cosArray = [];
function preload() {
  logoImg = loadImage("data/logo.jpg");
}

function setup() {
  createCanvas(1200, 600);
  background(0);
  for(var i = 0; i<RES; i++){
    cosArray.push(cos(radians(i)));
    sinArray.push(sin(radians(i)));
  }
  
  //logoImg.resize(width, logoImg.height * width/logoImg.width);
  //image(logoImg,0,0);
  pixelDensity(1);
  noStroke();
  newPath();

  for (var i = 0; i < numOfVehicles; i++) {
    //var v = new Vehicle(random(0,width/2),random(20,height - 20));
    var v = new Blob(random(0,width/2),random(20,height - 20), random(0.1, 0.8));
    v.setVel(random(0.3, 0.5), random(-0.4, 0.4));
    vehicles.push(v);
  }
  
  //vehicles.push(new Blob(random(0,width/2),random(20,height - 20), 0.7));

}

function draw() {
  background(0,80);
  
  if (debug) {
    path.display();
  }
  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.flock(vehicles);
    v.follow(path);
    v.update();
    v.display();
  }
  
  var instruction1 = "click space to see debug mode";
  var instruction2 = "click mouse to add more";
  textSize(15);
  fill(255);
  noStroke();
  text(instruction2, 10, 15);
  text(instruction1, 10, 30);
}

function newPath() {
  path = new Path();
  // path.addPoint(0, height/2 - 30);
  // path.addPoint(width,height/2 + 30);
  
  
  //path.addPoint(width / 2 - 102, height);
  path.addPoint(width / 2 - 102 *1.2, height / 2 + 52*1.2);
  path.addPoint(width / 2 - 102*1.2, height / 2 - 56*1.2);
  path.addPoint(width / 2 + 64*1.2, height / 2 + 52*1.2);
  path.addPoint(width / 2 + 2*1.2, height / 2 + 52*1.2);
  path.addPoint(width / 2 + 2*1.2, height / 2 - 22*1.2);
  path.addPoint(width / 2 + 116*1.2, height / 2 + 52*1.2);
  path.addPoint(width / 2 + 116*1.2, height / 2 - 56*1.2);
  //path.addPoint(width / 2 + 116, 0);
}

function mousePressed(){
  for(var i = 0; i < 20; i ++){
    var v = new Blob(mouseX + random(-20,20), mouseY+ random(-20,20), random(0.1, 0.8));
    v.setVel(random(0.3, 0.5), random(-0.4, 0.4));
     vehicles.push(v);
  }
  // var v = new Vehicle(mouseX, mouseY);
  // v.setVel(random(0.3, 0.5), random(-0.4, 0.4));
  // vehicles.push(v);
}

function fastSin(myRadians){
  //floor to round the index number! 
  // % TWO_PI! because my adians keeps increasing!
  var index = floor(map(myRadians % TWO_PI, 0, TWO_PI, 0, RES));
  return sinArray[index];
}
function fastCos(myRadians){
  var index = floor(map(myRadians % TWO_PI, 0, TWO_PI, 0, RES));//floor to round the index number!
  return cosArray[index];
}

function keyPressed(){
  if(key == " "){
    if(debug == true){
      debug = false;
    }else{
      debug = true;
    }
  }
}