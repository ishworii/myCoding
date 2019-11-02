class Unicorn
{
  constructor()
  {
    this.r = 70;
    this.x = 30;
    this.y = height-this.r;
    this.vy = 0;
    this.gravity = 1;
  }
  show()
  {
    image(uImg,this.x,this.y,this.r,this.r);
  }
  move()
  {
    this.y +=  this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y,0,height-this.r);
  }
  jump()
  {
    if(this.y == height-this.r)
    {
      this.vy=-20;
    }
  }
  hits(train)
  {
    let x1 = this.x
    return collideCircleCircle(this.x,this.y,this.r,train.x,train.y,this.r);
  }
}