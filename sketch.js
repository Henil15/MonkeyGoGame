var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,obstacle_moving
var FoodGroup, obstacleGroup
var score
var ground,invisibleGround

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200)
  
  ground = createSprite(200,190,800,10);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(50,200,100,10)
  invisibleGround.visible = false
  
  monkey = createSprite(50,175,20,50)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.08
  
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  //monkey.debug = true
  
  score = 0;
  
}


function draw() {
background(249)
  
text("Survival Time: "+ score, 270,20);
 
if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -12;
}
monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround)
  
  spawnFood();
  spawnObstacle();
  
  drawSprites();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+5
  }
  
  if(obstacleGroup.isTouching(monkey)){
        obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    monkey.velocityY = 0
    
  }
  
}

function spawnFood(){
   if (frameCount % 60 === 0){
 var Food = createSprite(600,165,10,40);
 Food.velocityX = -(8 + score/100);
Food.y = Math.round(random(80,120));
Food .addImage(bananaImage)

   Food.scale = 0.1;
  Food.lifetime = 300;
  
    FoodGroup.add(Food);
  }
}

function spawnObstacle(){
  if (frameCount % 60 === 0){
 var obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = -(10 + score/100);
obstacle.addImage(obstacleImage)
obstacle.y = Math.round(random(180,180));
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
  
    
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}