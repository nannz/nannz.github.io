var r = 70.0;
var angle;
var s, m, h;
var mouseAng;
var mouseIsDragged = false;

function setup() {
  createCanvas(200, 200);
  background(0);
  angle = 2 * PI / 12;
  textSize(12);
  textAlign(CENTER);
}

function draw() {
  m = minute(); // 0 - 59
  h = hour(); //0 - 23
  s = second();
  secAng = map(s, 0, 60, PI, -PI);
  minAng = map(m, 0, 60, PI, -PI);
  hourAng = map(h, 0, 23, PI, -PI);
  background(0);
  translate(width / 2, height / 2);
  ellipse(0, 0, 8, 8);
  fill(255);
  strokeWeight(1);
  for (var i = 0; i < 12; i++) {
    push();
    fill(255);
    strokeWeight(1);
    translate(r * sin(angle * i), r * cos(angle * i));
    text('NOW', 0, 0);
    pop();
  }
  stroke(255);
  print(mouseAng);
  if (mouseIsDragged) {
    push();

    var mouseDir = createVector(mouseX - width / 2, mouseY - height / 2);
    var mouseAng = mouseDir.heading();
    mouseDir.normalize();

    push();
    strokeWeight(1);
    line(0, 0, r * mouseDir.x * 0.75, r * mouseDir.y * 0.75);
    strokeWeight(2);
    line(0, 0, r * mouseDir.x * 0.65, r * mouseDir.y * 0.65);
    strokeWeight(4);
    line(0, 0, r * mouseDir.x * 0.45, r * mouseDir.y * 0.45);
    pop();
  } else {
    push();
    strokeWeight(1);
    line(0, 0, r * sin(secAng) * 0.75, r * cos(secAng) * 0.75);
    strokeWeight(2);
    line(0, 0, r * sin(minAng) * 0.65, r * cos(minAng) * 0.65);
    strokeWeight(4);
    line(0, 0, r * sin(hourAng) * 0.45, r * cos(hourAng) * 0.45);
    pop();
  }





}

function drawClockLegs(_secAng, _minAng, _hourAng) {
  push();
  strokeWeight(1);
  line(0, 0, r * sin(_secAng) * 0.75, r * cos(_secAng) * 0.75);
  strokeWeight(2);
  line(0, 0, r * sin(_minAng) * 0.65, r * cos(_minAng) * 0.65);
  strokeWeight(4);
  line(0, 0, r * sin(_hourAng) * 0.45, r * cos(_hourAng) * 0.45);
  pop();
}


function mouseDragged() {
  mouseIsDragged = true;
}

function mouseReleased() {
  if (mouseIsDragged == true) mouseIsDragged = false;
}