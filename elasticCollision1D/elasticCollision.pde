/*
This program simulates perfectly ellastic collision in 1D.
Inspiration from Coding Train(Daniel Shiffman)
*/
Body[] bodies=new Body[2];
void setup()
{
 size(600,600);
 bodies[0]=new Body(4,2,60); //change the mass to see various effects.
 bodies[1]=new Body(-2,2,400);
 
}


void draw()
{
  background(100);
  for(int i=0;i<2;i++)
  {
    bodies[i].make();
    bodies[i].move();
    bodies[i].wallDetection();
  }
  bodies[0].bodiesCollision(bodies[1]);
}
