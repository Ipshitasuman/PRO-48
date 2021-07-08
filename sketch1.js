// giving local variables
var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;
var zombie,z1i,z2i,z3i,z4i;
var bg,di , story, logo , restart;
var score = 0;

function preload(){
    // loading animations and images of the game
    z1i = loadAnimation("characters/z1.gif");
    z2i = loadAnimation("characters/z2.gif");
    z3i = loadAnimation("characters/z3.gif");
    z4i = loadAnimation("characters/z4.gif");
    ai1 = loadImage("mg/ai1.png");
    d1i = loadAnimation("scary/clown.gif");
    di = loadAnimation("scary/9BLC.gif");
    d2i = loadAnimation("scary/danger.gif");
    d3i = loadAnimation("scary/giphy.gif");
    d4i = loadAnimation("scary/salems-lot.gif");
    d5i = loadAnimation("scary/skull.gif");
    d6i = loadAnimation("scary/tenor.gif");
    d7i = loadAnimation("scary/mf.gif");
    sbg = loadImage("mg/bg.jpg");
    bg = loadImage("mg/bg2.jpg");
    GO = loadImage("mg/go.jpg");
    yrdi = loadImage("scary/yrd.png"); 
    logoi = loadImage("mg/Ef.png");
    bs = loadSound("mg/backs.mp3");
    blast = loadSound("mg/blast.mp3");  
    ss = loadSound("mg/so.mp3");
    gs = loadSound("mg/gunshot.mp3");
    cannon = loadImage("mg/normal.png");
    fired_cannon = loadImage("mg/fired.png");
    bombi = loadImage("mg/bomb.jpg");
    boom = loadImage("mg/boom.png");
}

function setup(){

createCanvas(1400,750);

// creating sprites of various components of the game
logo = createSprite(750,360,100,100);
logo.addImage("logo",logoi);
logo.scale = 0.775;
logo.visible = true;

// how to play using the game will be modified
story = createSprite(705,350,10,650);
story.addImage("story and how to play",ai1);
story.visible = false;
story.scale = 0.73;
story.depth = logo.depth+2;

// background of the game
bg1 = createSprite(750,350,100,200);
bg1.addImage("background",bg);
bg1.visible = false;

// player of the game
player = createSprite(200,685,10,10);
player.addAnimation("player means cannon",cannon);
player.addAnimation(" cannon when fired",fired_cannon);
player.visible = false;
player.scale = 0.7;
player.depth = bg1.depth + 4;

// game over sprite
go = createSprite(745,325,21,20);
go.addImage("gameOver",GO);
go.visible = false;

// you are dead sprite
yrd = createSprite(765,320,21,20);
yrd.addImage("you are dead image",yrdi);
yrd.scale = 2;
yrd.visible = false;

// diffrent groups
zombieGroup = new Group();
scaryGroup = new Group();
bombGroup = new Group();
score = 0;

}

function draw(){

    if(gameState === START ){
       logo.visible = true;

     if(mousePressedOver(logo)){
       story.visible = true;
       story.depth = bg1.depth+2;
     }

     if(frameCount % 300 === 0 ){
        bg1.visible = true; 
        bg1.depth = story.depth+2;
        gameState = PLAY;
     }
    }
    
    
   if(gameState === PLAY){
        spawnZombie();
        spawnScary();
        player.visible = true;
        player.depth = bg1.depth + 4;
        bs.loop();

         if(keyWentDown("space")){
            player.x = 400;
            player.y = 560;  
            player.changeAnimation(" cannon when fired",fired_cannon);
            player.x = 240;       
            gs.play();
            Bomb();
        }

        if (keyWentUp("space")){
           player.changeAnimation("player means cannon",cannon);
        }

        if(bombGroup.isTouching(zombieGroup)){
            blast.play();
            zombieGroup.destroyEach();
            bombGroup.destroyEach();
            score = score + 2;
        }

        textSize(20);
        strokeWeight(2);
        stroke(255);
        fill(255);
        text("Score : ",1200,150);
       
        if(zombieGroup.isTouching(player)){
           gameState = END;
        }
    }

    if(gameState === END){
        go.visible = true;
        // go.depth = yrd.depth+2;
        go.lifetime = 100;
        yrd.visible = true;
        zombieGroup.setLifetimeEach(-1);
        zombieGroup.setVelocityXEach(0);
        scaryGroup.setLifetimeEach(-1);
        scaryGroup.setVelocityXEach(0);
        bombGroup.setLifetimeEach(-1);
        bombGroup.setVelocityXEach(0);

        if(mousePressedOver(yrd)){
            reset();
        }
    }
    drawSprites();
}

// creating obstacles for the game
function spawnZombie() {
    if(frameCount % 250 === 0 && gameState === PLAY) {
     var zombie = createSprite(random(900,1350),random(600,620),20,50);
     zombie.velocityX = random(-1,-4);
     zombie.depth = bg1.depth+2;
     zombie.lifetime = 1400;
     zombie.setCollider("rectangle",0,0,150,350);
     
     //  generate random zombie
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: zombie.addAnimation("1",z1i);
                zombie.scale = 0.7;
                break;
        case 2: zombie.addAnimation("2",z2i);
                zombie.scale = 0.6;
                break;
        case 3: zombie.addAnimation("3",z3i);
                zombie.scale = 0.4;
                break;
        case 4: zombie.addAnimation("4",z4i);
                zombie.scale = 0.6;
                break;
        default: break;
   }
     zombieGroup.add(zombie);
   }
   }

// spawning scary gif in middle to make the game interesting
function spawnScary(){
    if(frameCount % 700 === 0 && gameState === PLAY) {
     var scary = createSprite(750,325,100,100);
     scary.depth = bg1.depth+5;
     scary.lifetime = 100;

     var rand = Math.round(random(1,8));
      switch(rand) {
        case 1: scary.addAnimation("9BLC",di);
                scary.scale = 4.1;
                break;
        case 2: scary.addAnimation("clown",d1i);
                scary.scale = 4.3;
                break;
        case 3: scary.addAnimation("crawl",d2i);
                scary.scale = 2.5;
                break;
        case 4: scary.addAnimation("face",d3i);
                scary.y = 350;
                scary.scale = 3.5;
                break;
        case 5: scary.addAnimation("dracula",d4i);
                scary.scale = 2.5;
                break;
        case 6: scary.addAnimation("skull",d5i);
                scary.scale = 0.5;
                break;
        case 7: scary.addAnimation("momo",d6i);
                scary.scale = 2.2;
                break;
        case 8: scary.addAnimation("mface",d7i);
                scary.scale = 3.5;
                break;
        default: break;
      }
      scaryGroup.add(scary);
    }
}

function Bomb(){
        bomb = createSprite(230,520,2,2);
        bomb.addAnimation("bb",bombi);
        bomb.scale = 0.1;   
        bomb.velocityX = 3;
        bomb.depth = bg1.depth+5;
        bombGroup.add(bomb);
}

function reset(){
     gameState = START;
     score = 0;
     scaryGroup.destroyEach();
     zombieGroup.destroyEach();
     bombGroup.destroyEach();
     yrd.visible = false;
     go.visible = false;

}