var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var invisibleGround;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  survivalTime = 0;
 
}



function setup() {
  // creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  

   score = 0;
  
  
  
}


function draw() {
  background(255);
  text("Survival Time: "+ score, 200,50);
  
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(gameState === PLAY){
    
    score=Math.ceil(frameCount/frameRate());
  //  score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(4 + 3* score/100)
    //scoring
   // score = score + Math.round(frameCount/60);
    
    if(score>0 && score%100 === 0){
    }
  
    
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
 // if(keyDown("space") ){
   // monkey.velocityY = -12;
 // }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  //calling the function
  spawnBananas();
  spawnObstacles();
  
    
    if(obstacleGroup.isTouching(monkey)){
        monkey.velocityY = -12;
      gameState = END;
        
    }
    
    if(bananaGroup.isTouching(monkey)){
      
      score = score+1;
        
        
    }
  }
  
   else if(gameState === END){
    
    ground.velocityX = 0;
      monkey.velocityY = 0;
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
  }
  drawSprites();
  
}

function spawnBananas(){
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  
}
   }

function spawnObstacles(){
  if (frameCount % 60 === 0){
   var obstacle = createSprite(600,299,10,40);
obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    //obstacle.debug = true;
   obstacle.velocityX = -(6 + score/100);
    obstacle.addImage(obstacleImage);
   
//assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function reset(){
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
 
  
  score = 0;
  
}







