/*
This program demonstrates genetic algorithm in its simplest form.
The rockets find their path using genetic algorithm.
Inspiration from Coding Train(Daniel Shiffman)
*/

var rocket;
var population;
var lifeSpan = 350;
var count = 0;
var lifeP;
var avgP;
var target;
var rx=40;
var ry = 200;
var rw =500;
var rh = 30;
var maxForce=0.2;
var gen=1;

function setup()
{
  createCanvas(600,400);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  avgP = createP();
  target = createVector(width/2,40);
}

function draw()
{
  background(20);
  population.run();
  lifeP.html(gen);
  count++;

  if(count == lifeSpan)
  {
    //population = new Population();
    population.evaluate();
    population.naturalSelection();
    gen++;
    count = 0;
  }

  noStroke();
  fill(10,200,20);
  ellipse(target.x,target.y,20,20);



  noStroke();
  fill(255,0,10);
  rect(rx,ry,rw,rh);

}


function Population()
{
  this.rockets = [];
  this.popSize = 50;
  this.matingPool = [];

  for(var i = 0; i <this.popSize ; i++)
  {
    this.rockets[i] = new Rocket();
  }

  this.run = function()
  {
    for(var i=0; i<this.popSize;i++)
    {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.evaluate = function()
  {
    var maxFitness = 0;
    var avg;
    for(var i=0;i<this.popSize;i++)
    {
      this.rockets[i].calculateFitness();

      if(this.rockets[i].fitness > maxFitness)
      {
        maxFitness = this.rockets[i].fitness;
      }


    }
    var sum=0;
    for(var i=0 ; i<this.popSize;i++)
    {
      sum+=this.rockets[i].fitness;
      this.rockets[i].fitness /= maxFitness
      this.rockets[i].fitness=pow(this.rockets[i].fitness,4);
      //console.log(sum);
    }
    var per =(sum*100)/(this.popSize*maxFitness)
    avgP.html(per);


    this.matingPool = [];
    for(var i=0;i<this.popSize;i++)
    {
      var n = this.rockets[i].fitness*100;
      for(var j=0;j<n;j++)
      {
        this.matingPool.push(this.rockets[i]);
      }
    }
    sum=0;
  }

  this.naturalSelection = function()
  {
    var newRockets = [];
    for(var i=0 ;i<this.rockets.length;i++)
     {
      var father = random(this.matingPool).dna;
      var mother = random(this.matingPool).dna;
      var child =  father.crossover(mother);
      child.mutation();
      newRockets[i] = new Rocket(child);
     }

     this.rockets = newRockets;

   }
}



function DNA(genes)
{
  if(genes)
  {
    this.genes = genes;
  }
  else {
    this.genes = [];
    for (var i=0; i<lifeSpan ; i++)
    {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxForce);
    }
  }


  this.crossover = function(partner)
  {
    var newgenes=[];
    var mid = floor(random(this.genes.length));
    for(var i=0;i<this.genes.length;i++)
    {
      if(i>mid)
      {
        newgenes[i] = this.genes[i];
      }
      else {
        {
          newgenes[i] = partner.genes[i];
        }
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function()
  {
    for(var i=0;i<this.genes.length;i++)
      {
        if(random(1)<0.01)
        {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxForce);
        }
      }
  }
}



function Rocket(dna)
{
  this.position = createVector(width/2,height);
  this.velocity = createVector();
  this.accn = createVector();
  this.fitness = 0;
  this.completed=false;
  this.crashed = false;
  this.rocketWidth=25;
  this.rocketHeight=10;

  if(dna)
  {
    this.dna = dna;
  }
  else {
    this.dna = new DNA();
  }



  this.applyForce = function(force)
  {
    this.accn.add(force);
  }

  this.show = function()
  {
    push();
    noStroke();
    fill(200);
    translate(this.position.x,this.position.y);
    rotate(this.velocity.heading())
    rectMode(CENTER);
    rect(0,0,this.rocketWidth,this.rocketHeight);
    pop();
  }

  this.update = function()
  {
    var d = dist(this.position.x,this.position.y,target.x,target.y);
    if(d<5)
    {
      this.completed=true;
      this.position = target.copy();
    }

    if(this.position.x > rx && this.position.x < rx+rw && this.position.y > ry && this.position.y < ry+rh)
    {
      this.crashed = true;
      this.rocketWidth=0;
      this.rocketHeight=0;
    }
    if(this.position.x > width || this.position.x < 0)
    {
      this.crashed = true;
      this.rocketWidth=0;
      this.rocketHeight=0;
    }
    if(this.position.y > height || this.position.y < 0)
    {
      this.crashed = true;
      this.rocketWidth=0;
      this.rocketHeight=0;
    }

    this.applyForce(this.dna.genes[count]);
    if(!this.completed && !this.crashed)
    {
    this.velocity.add(this.accn);
    this.position.add(this.velocity);
    this.accn.mult(0);
    this.velocity.limit(4);
    }
   }


  this.calculateFitness = function()
  {
    var d = dist(this.position.x,this.position.y,target.x,target.y);

    this.fitness = map(d, 0, width, width, 0);

    if(this.completed)
    {
      this.fitness*=10;
    }
    if(this.crashed)
    {
      this.fitness = 1;
    }
  }
}
