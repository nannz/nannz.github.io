
"use strict";

class Vehicle{
  
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;
    this.maxDesiredVel = 4.0;
    this.maxSteelForce = 0.2;
    
  }
  checkEdges(){
    //x asix
    if(this.pos.x < 0){
      this.pos.x = width;
    }
    if(this.pos.x > width){
      this.pos.x = 0;
    }
    //y asix
    if(this.pos.y < 0){
      this.pos.y = width;
    }
    if(this.pos.y > width){
      this.pos.y = 0;
    }
  }
  applyForce(f){
    //f.div(this.mass)
    this.acc.add(f);
  }
  seek(target){
    var desiredVel = p5.Vector.sub(target,this.pos);
    desiredVel.normalize();
    desiredVel.mult(this.maxDesiredVel);
    
    var steelForce = p5.Vector.sub(desiredVel, this.vel);
    steelForce.limit(this.maxSteelForce);
    this.applyForce(steelForce);
  }
  flow(angle){
    var desiredVel = p5.Vector.fromAngle(angle);
    desiredVel.mult(this.maxDesiredVel);
    
    var steelForce = p5.Vector.sub(desiredVel, this.vel);
    steelForce.limit(this.maxSteelForce);
    this.applyForce(steelForce);
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);// this.angle = this.vel.heading();
    noStroke();
    fill(255);
    triangle(0,0,-20,8,-20,-8);
    pop();
  }
}