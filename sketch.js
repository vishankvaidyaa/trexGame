var trex,trexRunning,trex2,trexOut,ground,gameOver,restart,gameOverImage,restartImageinvisibleGround,groundImage,cloudImage,cloudsGroup,obstaclesGroup,o1,o2,o3,o4,o5,o6,die,jump,cp;

var PLAY = 1;
var END = 0;
var gameState=PLAY;

var score=0;

function preload (){
  
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  trexOut=loadImage("trex_collided.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  die=loadSound("die.mp3");
  cp=loadSound("checkPoint.mp3");
  jump=loadSound("jump.mp3");
  
  o1=loadImage("obstacle1.png");
   o2=loadImage("obstacle2.png");
   o3=loadImage("obstacle3.png");
   o4=loadImage("obstacle4.png");
   o5=loadImage("obstacle5.png");
   o6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(800, 300);
  trex=createSprite(50,270);
  trex.addAnimation("running",trexRunning)
  trex.addAnimation("out",trexOut)
  
  restart=createSprite(400,200,800,20);
    gameOver=createSprite(400,250,800,20);
    
    gameOver.addImage(gameOverImage);
    restart.addImage(restartImage);
  
  trex.scale=0.5
  
  ground=createSprite(400,280,800,20);
  ground.addImage(groundImage);
   ground.x=ground.width/2; 
  invisibleGround=createSprite(400,285,800,5);
  invisibleGround.visible=false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
    }

function draw() {
  
  background("#d9ff00");
  text("Score : "+score,300,50)
  
  trex.collide(invisibleGround);
  //console.log(trex.y);
  
  if(gameState===PLAY){
    
    if (score>0 && score%100 === 0){ cp.play(); }
    
    gameOver.visible=false;
    restart.visible=false;
    
    if(keyDown("space")&&trex.y>=254){
     trex.velocityY=-12;
      jump.play();
     } 
    
    if(ground.x<0){
     ground.x=ground.width/2;
     }
  
  ground.velocityX=-(6 + 3*score/100);;
 score = score + Math.round(getFrameRate()/60);
  
  trex.velocityY=trex.velocityY+0.5
  
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      //playSound("die.mp3");
      die.play();
      gameState = END;
     // trex2=createSprite(50,270);
  trex.changeAnimation("out",trexOut);
      //trex.destroy();
      //trex2.scale=0.5;
     // trex.x=trex2.x;
      //trex.y=trex2.y;
    }
    
     }
  
  else if (gameState===END){
    
    gameOver.visible=true;
    restart.visible=true;
    
     trex.scale=0.5;
    gameOver.scale=0.5;
    restart.scale=0.5;
    
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    //trex.setAnimation("trex_collided");
    trex.velocityY = 0;   
    
    if (mousePressedOver(restart)) {
     reset();  
      }
           }
  
//if(keyDown("Up_Arrow")&&trex.y>=254){
   // trex.velocityY=-12;
   //  }
        
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,180,40,10);
    cloud.y = random(80,150);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,265,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    console.log(rand);
    switch(rand){
      case 1:obstacle.addImage(o1); 
      break ; 
      
      case 2:obstacle.addImage(o2); 
      break ; 
      
      case 3:obstacle.addImage(o3); 
      break ; 
      
      case 4:obstacle.addImage(o4); 
      break ; 
      
      case 5:obstacle.addImage(o5); 
      break ; 
      
      case 6:obstacle.addImage(o6); 
      break ; 
           }
    //assign scale and lifetime to the obstacle            
    obstacle.scale = 0.5;
    obstacle.lifetime = 134;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
score=0;
  trex.changeAnimation("running",trexRunning);
       //trex.y=380;
       obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
   gameState = PLAY; 
}