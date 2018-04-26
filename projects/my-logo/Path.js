"use strict"

class Path{
  constructor(){
    this.radius = 5; //how far is it ok for the vehicle to wander off
    this.points = [];
  }
  
  //add a point to the path
  addPoint(x,y){
    var point = createVector(x,y);
    this.points.push(point);
  }
  getStart(){
    return this.points[0];
  }
  getEnd(){
    return this.points[this.points.length-1];
  }
  
  //display the path
  display(){
    push();
    //the thick path - radius
    stroke(99);
    strokeWeight(this.radius *2);
    noFill();
    beginShape();
    for(var i = 0; i < this.points.length; i++){
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
    //the path itself
    stroke(255,0,0);
    strokeWeight(1);
    noFill();
    beginShape();
    for(var i = 0; i < this.points.length; i++){
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }
  
  
}