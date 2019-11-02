/*
This script attempts to visaulize fourier series by
converting a sine wave into square wave
*/

var time = 0;
var wave = [];
let slider;
function setup() {

  createCanvas(1200, 600);
  slider=createSlider(1,50,1);
}

function draw() {
  background(220);
  translate(250, 250);
  var x = 0;
  var y = 0;
  for (var i = 0; i < slider.value(); i++) {
    let prex = x;
    let prey = y;
    n = 2 * i + 1;
    var radius = 100 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);


    noFill();
    ellipse(prex, prey, 2 * radius, 2 * radius);
    line(prex, prey, x, y);
    fill(1);
    ellipse(x, y, 1, 1);
    //translate(150, 0);
   
  }
  translate(150,0);
   line(x - 150, y, 0, wave[0]);
  wave.unshift(y);
  beginShape();
  noFill();
  for (var i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape()
  time += 0.02;
  if (wave.length > 500) {
    wave.pop();
  }
}