"use strict"

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.angle = this.vel.heading();

    this.maxSpeed = 4; // max speed;
    this.maxSteerForce = 0.05; // max steering force

    this.predictLocMax = 5;
    this.desireVelDistance = 30;
    this.currentPathNo = 0;
    
    this.separateDistance = 15;
    this.neighborDistance = 20;
  }
  setVel(x, y) {
    this.vel.x = x;
    this.vel.y = y;
    this.angle = this.vel.heading();
  }

  flock(vehicles) {
    var sepaForce = this.separate(vehicles);
    var coheForce = this.cohesion(vehicles)
    //var alignForce = this.align(vehicles)
    sepaForce.mult(1.5);
    //coheForce.mult(0.5);
    
    this.applyForce(sepaForce);
    this.applyForce(coheForce);
    //this.applyForce(alignForce);
  }
  separate(others) {
    var vector = createVector(); // sum for now
    var count = 0;
    for (var i = 0; i < others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.separateDistance) {
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        // let's get the sum!
        vector.add(diff);
        count++;
      }
    }
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      // desired velocity
      vector.setMag(this.maxSpeed);
      // steering force
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector;
  }
  cohesion(others) {
    var position = createVector(0,0); //sum
    var count = 0;
    for (var i=0; i<others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if ((distance > 0) && (distance < this.neighborDistance)) {
        position.add(other.pos); // add positions to get the sum
        count++;
      }
    }
    if (count > 0) {
      position.div(count); // becames average
      return this.seek(position);
    }
    return position;
  }
  align(others) {
    var velocity = createVector(0,0); //sum
    var count = 0;
    for (var i=0; i<others.length; i++) {
      var other = others[i];
      var distance = this.pos.dist(other.pos);
      if ((distance > 0) && (distance < this.neighborDistance)) {
        velocity.add(other.vel); // add positions to get the sum
        count++;
      }
    }
    if (count > 0) {
      velocity.div(count);
      velocity.setMag(this.maxSpeed);
      var steer = p5.Vector.sub(velocity, this.vel);
      steer.limit(this.maxSteerForce);
      return steer;
    }
    return velocity;
  }

/**
 * vehicles following the path
*/
  follow(path) {
    var predict = this.vel.copy();

    predict.normalize();
    predict.mult(this.predictLocMax);
    var predictLoc = p5.Vector.add(this.pos, predict);

    /**
     * find the normal (the closest one to the path)
     */
    var normal = null;
    var target = null;
    var worldRecord = 1000000; // Start with a very high record distance that can easily be beaten
    for (var i = 0; i < path.points.length - 1; i++) {
      var a = path.points[i];
      var b = path.points[i + 1];
      var normalPoint = this.getNormalPoint(predictLoc, a, b);

      //要测试!!!
      if (i == 1) {
        if (normalPoint.x < a.x || normalPoint.x > b.x) {
          normalPoint = a.copy();
        }
      }
      if(i == 4){
        if(normalPoint.x < a.x || normalPoint.x > b.x){
          normalPoint = a.copy();
        }
      }
      if (a.x == b.x) { //vertical path // i = 0,3,5
        if (normalPoint.y > a.y || normalPoint.y < b.y) {
          if (i == 0 || i == 3) normalPoint = a.copy();
          if (i == 5 ) normalPoint = a.copy();
        }
      }
      if (i == 2) { //horizental reversed path; i = 2
        if (normalPoint.x > a.x || normalPoint.x < b.x) {
          normalPoint = a.copy();
        }
      }

      //distance between predictLoc and the normal point
      var distance = p5.Vector.dist(predictLoc, normalPoint);
      if (distance <= worldRecord) {
        worldRecord = distance;
        // If so the target we want to steer towards is the normal
        normal = normalPoint;
        var dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10); //can be more complex!
        target = normalPoint.copy();
        target.add(dir);
        this.currentPathNo = i;
      }
    }
    //finish finding the normal(closest) and the target
    if (worldRecord > path.radius && target != null) {
      //print(this.currentPathNo);
      if(this.currentPathNo == 5 && target.y < (path.getEnd().y - path.radius)){
        //start over
        this.startOver(path);
      }else{
        var targetForce = this.seek(target);
        this.applyForce(targetForce);
      }
    }

    
    //visualize it!
    if (debug) {
      push();
      stroke(255);
      line(this.pos.x, this.pos.y, predictLoc.x, predictLoc.y);
      fill(200);
      ellipse(predictLoc.x, predictLoc.y, 5, 5); //the future position
      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      fill(0, 255, 0)
      ellipse(normal.x, normal.y, 5, 5); //the normal point
      fill(200);
      if (worldRecord > path.radius) fill(255, 0, 0); //if not on the path, trigger the target.
      noStroke();
      ellipse(target.x, target.y, 8, 8); //the target
      pop();
    }
  }

  startOver(path){
    //go to the start point
    this.pos.x = path.getStart().x;
    this.pos.y = path.getStart().y;
  }
  seek(target) {
    var desiredVel = p5.Vector.sub(target, this.pos);
    desiredVel.setMag(this.maxSpeed);
    if (desiredVel.mag() > this.desireVelDistance) {
      desiredVel.setMag(this.maxSpeed); //这里可以设定一个radius，如果进入radius，则靠距离决定
    } else {
      var newMag = map(desiredVel.mag(), 0, this.desireVelDistance, 1, this.maxSpeed);
      desiredVel.setMag(newMag);
    }
    var steer = p5.Vector.sub(desiredVel, this.vel);
    steer.limit(this.maxSteerForce);
    if (debug) {
      push();
      stroke(0, 255, 0);
      var steerLine = steer.copy().add(this.pos);
      line(this.pos.x, this.pos.y, steerLine.x, steerLine.y);
      pop();
    }
    //this.applyForce(steer);
    return steer;
    
    if (debug) {
      push();
      stroke(255, 0, 0);
      noFill();
      ellipse(this.pos.x, this.pos.y, this.desireVelDistance * 2, this.desireVelDistance * 2);
      noStroke();
      pop();
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    //print(this.vel.mag());
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255);
    triangle(0, 0, -10, 4, -10, -4);
    pop();

  }

  //get normal point from a point(p) to a line(a-b)投影向量的点
  getNormalPoint(p, a, b) {
    var ap = p5.Vector.sub(p, a);
    var ab = p5.Vector.sub(b, a);
    ab.normalize();
    ab.mult(ap.dot(ab));
    var normalPoint = p5.Vector.add(a, ab);
    return normalPoint;

  }
}