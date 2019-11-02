class Train
{
  constructor()
  {
    this.r = 60 ;
    this.x = width;
    this.y = height - this.r
    this.vx = -5;
  }
  show()
  {
    image(tImg,this.x,this.y,this.r,this.r);
  }
  move()
  {
    this.x += this.vx;
  }
}