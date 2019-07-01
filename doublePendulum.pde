/*
This simple program simulates the double pendulum and its chaotic nature in Processing(java). Even if you change the angle by 
a small value the results will be entirely different.
All thanks to Daniel Shiffman and his awesome tutorials.
Link to his video:https://www.youtube.com/watch?v=uWzPe_S-RVE&t=865s
*/

float x1,y1;     //position of first bob(bob1)
float x2,y2;     //position of second bob(bob2)
float a1=PI/2;   //initial angle for bob1
float a2=PI/2;   //initial angle for bob2,you can change this angle to see the chaotic nature
float r1=100;    //length
float r2=100;    
float m1=20;     //mass
float m2=20;
float a1_v=0;    //intial angular velocity
float a2_v=0;
float a1_a=0;    //angular acceleration
float a2_a=0;
float px1=-1;    //previousX and previousY, required to make the curve
float py1=-1;
float px2=-1;
float py2=-1;
float g=1;       //acceleration due to gravity, 1 for simplicity
PGraphics  canvas;
void setup()
{
  
  fullScreen();
  //size(800,630);
  canvas=createGraphics(width,height);
  canvas.beginDraw();
  canvas.background(1);
  canvas.endDraw();
}


void draw()
{
  
  float num1=-g*(2*m1+m2)*sin(a1); //formula implementation for a1_a,broken down to lines for simplicity
  float num2=-m2*g*sin(a1-2*a2);
  float num3=-2*sin(a1-a2)*m2;
  float num4=a2_v*a2_v*r2+a1_v*a1_v*r1*cos(a1-a2);
  float den=r1*(2*m1+m2-m2*cos(2*a1-2*a2));
  
  a1_a=(num1+num2+num3*num4)/den;
  
  num1=2*sin(a1-a2);              //formula implementation for a2_a
  num2=a1_v*a1_v*r1*(m1+m2);
  num3=g*(m1+m2)*cos(a1);
  num4=a2_v*a2_v*r2*m2*cos(a1-a2);
  den=r2*(2*m1+m2-m2*cos(2*a1-2*a2));
  
  a2_a=(num1*(num2+num3+num4))/den;
  
  image(canvas,0,0);
  translate(width/2,height/2);
  x1=r1*sin(a1);
  y1=r1*cos(a1);
  stroke(1);
  strokeWeight(2);
  //line(0,0,x1,y1);
  fill(10,200,20);
  ellipse(x1,y1,m1,m1);
  
  x2=x1+r2*sin(a2);
  y2=y1+r2*cos(a2);
  //stroke(1);
  //strokeWeight(2);
  //line(x1,y1,x2,y2);
  fill(10,30,200);
  ellipse(x2,y2,m2,m2);
  
  a1_v+=a1_a;
  a1+=a1_v;
  a2_v+=a2_a;
  a2+=a2_v;
 
  
  canvas.beginDraw();
  canvas.translate(width/2,height/2);
  canvas.strokeWeight(1);
  if(frameCount>1)
  {
    //canvas.stroke(10,200,20,80);
    //canvas.line(px1,py1,x1,y1);
    canvas.stroke(10,200,200,100);
    canvas.line(px2,py2,x2,y2);
  }
  canvas.endDraw();
  px1=x1;
  py1=y1;
  px2=x2;
  py2=y2;

}
