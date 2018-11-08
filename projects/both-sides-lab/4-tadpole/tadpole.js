"use strict";

class Tadpole {
  constructor(_x, _y) {
      this.pos = createVector(_x, _y);
      this.vel = createVector(0, 0);
      this.acc = createVector();
      this.r = 8;
      this.mass = 1;
      this.isDead = false;

      this.maxSpeed = 2; // max speed;
      this.maxSteerForce = 0.05; // max steering force
      this.separateDist = 20;

      //for the tail
      this.xx = [];
      this.yy = [];
      this.segNum = 15;
      this.segLength = 1;
      for (var i = 0; i < this.segNum; i++) {
        this.xx[i] = 0;
        this.yy[i] = 0;
      }
    }
   

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.angle = this.vel.heading();
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    return steer;
  }
  separate(tadpoles) {
    var vector = createVector();
    var count = 0;
    for (var i = 0; i < tadpoles.length; i++) {
      var other = tadpoles[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.separateDist) {
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        vector.add(diff);
        count++;
      }
    }
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      vector.setMag(this.maxSpeed);
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector; //the average separate force
  }
  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }
  flock(tadpoles) {
    //attracted by the mouse
    var mouseVec = createVector(mouseX, mouseY);
    var seekForce = this.seek(mouseVec);
    var sepaForce = this.separate(tadpoles);
    seekForce.mult(1.0);
    sepaForce.mult(1.0);

    this.applyForce(seekForce);
    this.applyForce(sepaForce);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }


  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    ellipse(0, 0, this.r, this.r);
    //triangle(0, 5, 0, -5, -20, 0);
    // this.dragSegment(0, mouseX, mouseY);
    pop();
    push();
    this.dragSegment(0, this.pos.x, this.pos.y);
    for (var i = 0; i < this.xx.length - 1; i++) {
      this.dragSegment(i + 1, this.xx[i], this.yy[i]);
    }
    pop();
  }
  
   //for the tail
  dragSegment(i, xin, yin) {
    var dx = xin - this.xx[i];
    var dy = yin - this.yy[i];
    var angle = atan2(dy, dx);
    this.xx[i] = xin - cos(angle) * this.segLength;
    this.yy[i] = yin - sin(angle) * this.segLength;
    this.segment(this.xx[i], this.yy[i], angle);
  }
  segment(x, y, a) {
    push();
    translate(x, y);
    rotate(a);
    stroke(0);
    strokeWeight(2.5);
    line(0, 0, this.segLength, 0);
    noStroke();
    pop();
  }
}