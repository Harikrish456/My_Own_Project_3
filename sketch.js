var bgImg;
var planeImg;
var player;
var bg;
var obstacleGroup;
var obstacleGroup2;
var gameState = "PLAY";
var buildingImg;
var upsideBuildingImg;
var reset;
var score = 0;
var attempts = 0;
var pointSound;
var hitSound;
var help;
var back;
var rod;
var rod2;
var rod3;
var backImg;
var spaceSound;

function preload(){
    bgImg = loadImage("images/background.jpg");
    planeImg = loadImage("images/plane.png");  
    buildingImg = loadImage("images/building.png");
    upsideBuildingImg = loadImage("images/upsideBuilding.png");
    pointSound = loadSound("Sounds/sfx_point.wav");
    hitSound = loadSound("Sounds/sfx_die.wav");
    backImg = loadImage("images/arrow.png");
    spaceSound = loadSound("Sounds/sfx_swooshing.wav");
}

function setup(){
    createCanvas(400,400);

    bg = createSprite(200,200,400,400);
    bg.addImage(bgImg);
    bg.x = bg.width/2;
    bg.velocityX = -3;

    obstacleGroup = createGroup();
    obstacleGroup2 = createGroup();

    player = createSprite(200,200,40,40);
    player.addImage(planeImg);
    player.velocityY = 2;
    player.scale = 0.17;
    player.setCollider("circle",0,0,80);

    reset = createSprite(350,50,30,10);
    reset.visible = false;

    help = createSprite(20,20,30,10);
    help.visible = false;

    back = createSprite(200,200,50,20);
    back.visible = false;
    back.scale = 0.4
    back.addImage(backImg);

    rod = createSprite(200,200,400,80);
    rod.visible = false;

    rod2 = createSprite(200,-90,400,20);

    rod3 = createSprite(200, 490, 400, 20);
}

function draw(){
    background("white");


    if(gameState === "PLAY"){

        help.visible = true;
    if(bg.x < 0){
    bg.x = bg.width/2;
    }

    if(keyDown("space") || keyDown(UP_ARROW)){
    player.velocityY = -9; 
    }

    player.velocityY = player.velocityY + 1;

    addObstacles();
    addObstacles2();

    if(player.isTouching(obstacleGroup)||player.isTouching(obstacleGroup2)){
        gameState = "END";
        hitSound.play();
    }

    if(frameCount % 100 === 0){
        score = score + 1;
        pointSound.play();
    }

    if(player.y > 410 ||player.y < 0){
        gameState = "END";
        hitSound.play();
    }

    }
    
    if(mousePressedOver(help)){
        gameState = "HELP";
    }

    drawSprites();
    stroke("blue");
    noFill();
    text("SCORE: " + score,50,50);
    stroke("green");
    noFill();
    text("ATTEMPTS: " + attempts, 314, 362);
    stroke("green");
    text("Help",5,35);

    if(gameState === "END"){
        reset.visible = true;
        player.velocityY = 0;

        if(mousePressedOver(reset)){
            gameState = "PLAY";
            reset.visible = false;   
            score = 0;   
            attempts = attempts + 1;
        }
    

        player.destroy();
        obstacleGroup.destroyEach();
        obstacleGroup2.destroyEach();
        bg.velocityX = 0;

        textSize(30);
        stroke("red");
        fill("red");
        text("Game Over",130,200);
 
        textSize(13);
        stroke("black");
        fill("yelloe");
        text("Reset",336,63);
    }

    if(mousePressedOver(back)){
        gameState = "PLAY";
        back.visible = false;
        player.x = 100;
        player.y = 200;
      }

    if(gameState === "HELP"){
        player.velocityY = 0;
        obstacleGroup.setVelocityYEach(0);
        obstacleGroup2.setVelocityYEach(0);
        bg.velocityY = 0;
        background("blue");
        stroke("yellow");
        textSize(30);
        text("Use space bar to go up", 50, 50);
        text("Avoid the buildings", 50, 100);
        text("Don't go out of the screen", 50, 150);
        textSize(18);
        text("BACK", 175, 240);
        back.visible = true;
        back.display();
      }

    createEdgeSprites();
    obstacleGroup2.bounceOff(rod2);
    obstacleGroup.bounceOff(rod);
    obstacleGroup.bounceOff(rod3);
    obstacleGroup2.bounceOff(rod);    

}

function addObstacles(){
    if(World.frameCount % 40 === 0){
    var obstacle = createSprite(400,random(350,380));
    obstacle.velocityX = -3;
    obstacle.velocityY = -1;
    obstacle.addImage(buildingImg);
    obstacle.scale = 0.35;
    obstacleGroup.add(obstacle);
    }
  }
  
  function addObstacles2(){
    if(World.frameCount % 40 === 0){
    var obstacle2 = createSprite(400,random(0,40));
    obstacle2.velocityX = -3;
    obstacle2.velocityY = 1;
    obstacle2.addImage(upsideBuildingImg);
    obstacle2.scale = 0.35;
    obstacleGroup2.add(obstacle2);
    }
  }
  


    
