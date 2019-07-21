
/*
 All thanks to Metaballs Coding Challenge by Daniel Shiffmann.
 Link to the video:https://www.youtube.com/watch?v=ccYLb7cLB1I
 Code is almost same with slighest differences.
*/
Blob[] blobs =  new Blob[5];
void setup()
{
  size(600,400);
  for(int i=0;i<blobs.length;i++)
  {
    blobs[i] = new Blob(random(40,width),random(40,height));
  }
}


void draw()
{
  colorMode(HSB);
  loadPixels();
  for(int x = 0; x < width; x++)
  {
    for(int y = 0; y < height; y++)
    {
      int index = x+width*y;
      int sum = 0;
      for(Blob b : blobs)
      {
      float d = dist(x,y,b.getX(),b.getY());
      sum += 150*b.getR()/d;
      }
      pixels[index] = color(sum,200,255);
    }
  }
  updatePixels();
  for(Blob b:blobs)
  {
  b.show();
  b.update();
  }
}
