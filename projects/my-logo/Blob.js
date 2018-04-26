"use strict";

class Blob extends Vehicle {
  constructor(x, y, size) {
    super(x,y,size);
    // super(y);
    this.pos = createVector(x, y);
    this.size = size;
    this.sizeFreq = random(0.01, 0.05);
    this.scale = 1.0;
    this.particles = [];
    var randomNumber = floor(random(3, 5));
    for (var i = 0; i < randomNumber; i++) {
      this.particles.push(new Particle(this.pos.x, this.pos.y));
    }

  }
  update() {
    this.scale = this.size * map(fastSin(frameCount * this.sizeFreq), -1, 1, 0.9, 1.1);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    //print(this.vel.mag());
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  display() {
    if (debug == false) {
      push();
      noStroke();
      translate(this.pos.x, this.pos.y);
      scale(this.scale);
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].display();
      }
      pop();
    } else {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      noStroke();
      fill(255);
      triangle(0, 0, -10, 4, -10, -4);
      pop();
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.dia = random(5, 10);
    this.angle = random(TWO_PI);
    this.aVel = random(0.01, 0.05);
    this.distance = random(3, 6);
  }
  display() {
    this.angle += this.aVel;

    this.pos.x = fastCos(this.angle) * this.distance;
    this.pos.y = fastSin(this.angle) * this.distance;
    var dia = fastSin(this.angle) * this.distance;

    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 5 + this.dia, 5 + this.dia);
    ellipse(this.pos.x, this.pos.y, 10 + this.dia, 10 + this.dia);
    ellipse(this.pos.x, this.pos.y, 15 + this.dia, 15 + this.dia);
  }
}