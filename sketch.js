var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400, 400);
  
  var survivalTime=0;
  
  //Creating monkey
   player=createSprite(80,315,20,20);
   player.addAnimation("moving", monkey_running);
   player.scale=0.1
  
  //Creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  obstaclesGroup = new Group();
  FoodGroup = new Group();

}

function draw() {
  
  
  background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") ) {
    player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
  
    spawnObstacles();
    spawnFood();
 
  drawSprites();        
  
  if(obstaclesGroup.isTouching(player)){
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

}
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime,100,50);
}

function spawnFood() {
  //Spawning the Bananas
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    //Image of bananas
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
    
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //Image of obstacles
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstaclesGroup.add(obstacle);    
    obstacle.lifetime = 300;
    
  }
}