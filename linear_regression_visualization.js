/*
This script implements simple linear regression
with some visualization
Inspired By Daniel Shiffmann
*/

var data = [];
var m = 1;
var b = 0;

function setup() {
  createCanvas(400, 400);
 
}

function draw() {
  background(220);
  for (i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1,height, 0);
    fill(200,100,78);
    noStroke();
    ellipse(x, y, 8);
  }
  if (data.length > 1) {
    linearRegression();
    drawLine();
    drawPerpendicular();
  }
}

function linearRegression() {
  var xsum = 0;
  var ysum = 0;
  for (i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  var xmean = xsum / data.length;
  var ymean = ysum / data.length;

  var num = 0;
  var den = 0;

  for (i = 0; i < data.length; i++) {
    num += (data[i].x - xmean) * (data[i].y - ymean);
    den += (data[i].x - xmean) * (data[i].x - xmean);
  }

  m = num / den;
  b = ymean - m * xmean;
}


function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);

  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(23, 212, 231);
  strokeWeight(2);
  line(x1, y1, x2, y2);

}

function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  var point = createVector(x, y);
  data.push(point);

}

function drawPerpendicular()
{
  for(i=0;i<data.length;i++)
  {
    var x1=map(data[i].x,0,1,0,width);
    var y1=map(data[i].y,0,1,height,0);
    //var x1=mouseX;
    //var y1=mouseY;
    var temp=(-1*(m*x1-y1+b))/(m*m+1);
    var x=x1+m*temp;
    var y=y1-temp;
    stroke(200,100,100);
    line(x1,y1,x,y);
  }
}