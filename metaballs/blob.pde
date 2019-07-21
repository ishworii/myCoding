class Blob
{
  PVector position;
  PVector velocity;
  float radius;
   Blob(float x, float y)
   { 
      position = new PVector(x,y);
      velocity = PVector.random2D();
      velocity.mult(random(4,8));
      radius = 40;
   }
   
   void show()
   {
     noFill();
     //strokeWeight(4);
     noStroke();
     ellipse(position.x,position.y,radius*2,radius*2);
   }
   
   void update()
   {
    position.add(velocity); 
    
    if(position.x > width-radius || position.x <radius)
    {
      velocity.x*=-1;
    }
     if(position.y > height-radius || position.y <radius)
    {
      velocity.y*=-1;
    }
   }
   
   
   float getX()
   {
     return position.x;
   }
   float getY()
   {
     return position.y;
   }
   float getR()
   {
     return radius;
   }
}
