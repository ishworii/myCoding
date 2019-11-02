let unicorn;
let trains= [];
let uImg;
let tImg;
let bImg;
let soundClassifier;

function preload()
{
  const options = { probabilityThreshold: 0.957 };
  
  soundClassifier = ml5.soundClassifier("SpeechCommands18w",options);
  uImg = loadImage('asset/unicorn.png');
  tImg = loadImage('asset/train.png');
  bImg = loadImage('asset/background.jpg');
}


function setup() {
  createCanvas(580, 420);
  unicorn = new Unicorn();
  soundClassifier.classify(gotCommand);
  
}
function mousePressed()
{
  trains.push(new Train())
}
function gotCommand(error,results)
{
  if(error)
  {
    console.error(error);
  }
  console.log(results[0].label,results[0].confidence);
  if(results[0].label == 'up')
  {
    unicorn.jump();
  }
}

function keyPressed()
{
  if(key == ' ')
  {
    
  }
}

function draw() {

//     if(random(1) < 0.005)
//     {
//       trains.push(new Train())
//     }
  
  
  background(bImg);
  for (let t of trains)
  {
      t.show();
      t.move();
    
      if(unicorn.hits(t))
      {
        console.log('game over');
        noLoop();
      }
  }
  
  
  unicorn.show();
  unicorn.move();
  
  
}