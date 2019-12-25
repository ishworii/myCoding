function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true,true,true,true];

  this.highlight = function()
  {
    x = this.i*w;
    y = this.j *w;
    noStroke();
    fill(0,255,0,100);
    rect(x,y,w,w);
  }

  this.checkNeighbors = function()
  {
    let neightbors = [];

    let top    = grid[index(i,j-1)];
    let right  = grid[index(i+1,j)];
    let bottom = grid[index(i,j+1)];
    let left   = grid[index(i-1,j)];

    if(top && !top.visited)
    {
        neightbors.push(top);
    }
    if(right && !right.visited)
    {
        neightbors.push(right);
    }
    if(bottom && !bottom.visited)
    {
        neightbors.push(bottom);
    }
    if(left && !left.visited)
    {
        neightbors.push(left);
    }

    if (neightbors.length > 0 )
    {
        r = floor(random(0,neightbors.length));
        return neightbors[r];
    }
    else
    {
        return undefined;
    }
  }

  this.show = function()
  {
    x = this.i*w;
    y = this.j *w;
    stroke(255);
    if (this.walls[0])
    {
      line(x,y,x+w,y);
    }
    if (this.walls[1])
    {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2])
    {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3])
    {
       line(x,y+w,x,y);
    }
    // if (this.visited)
    // {
    //     noStroke();
    //     fill(255,0,255,100);
    //     rect(x,y,w,w);
    // }

  }

}
