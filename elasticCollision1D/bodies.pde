class Body
{
  float x,y;
  float radius;
  float mass;
  float velocityInitial;
  float velocityFinal;
 
 Body(float v,float m,float x_)
 {
   mass=m;
   velocityInitial=v;
   x=x_; //position
   y=height/2;
   radius=m*20;
 }
 
  void make()
  {
    fill(122,234,12);
    ellipse(x,y,radius,radius);
  }
  void move()
  {
    x+=velocityInitial;
  }
  void wallDetection()
  {
    if(x+radius/2>width ||x<radius/2)
    {
      velocityInitial=-velocityInitial;
    }
  }
  void bodiesCollision(Body b)
  {
    if(abs(x-b.x)<radius)
    {
      b.velocityFinal=(2*mass*velocityInitial+b.velocityInitial*(b.mass-mass))/(mass+b.mass);
      velocityFinal=(2*b.mass*b.velocityInitial+velocityInitial*(mass-b.mass))/(mass+b.mass);
      velocityInitial=velocityFinal;
      b.velocityInitial=b.velocityFinal;
    }
  }
}
 
