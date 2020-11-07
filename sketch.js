var ghost,ghost_img
var tower,tower_img
var climber,climber_img
var door,door_img
var doorgroup,railgroup
var blockgroup,block
var spooksound
var gamestate = "PLAY"
var PLAY = 1,END = 0


function preload(){
  ghost_img = loadImage("ghost-jumping.png")
  
  tower_img = loadImage("tower.png")
  
  climber_img = loadImage("climber.png")
  
  door_img = loadImage("door.png")
  
  spooksound = loadSound("spooky.wav")
  
  blockgroup = new Group();
  doorgroup = new Group();
  railgroup = new Group();
}

function setup(){
  createCanvas(600,600)
  
  tower = createSprite(300,300)
  tower.addImage(tower_img)
  tower.velocityY = 2
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghost_img)
  ghost.scale = 0.3
  
  spooksound.loop()
}

function draw(){
  
  background("black")
  
  if(gamestate === "PLAY"){
    if(tower.y > 400){
    tower.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  
  ghost.velocityY = ghost.velocityY + 0.8
  
  if(keyDown("LEFT_ARROW")){
    ghost.x -= 3
  }
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x += 3
  }
  
  if(railgroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  
  if(blockgroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy();
    gamestate = "END"
  }
  
        
  spawndoors();
  
  }
  
  if(gamestate === "END"){
    tower.visible = false   
    doorgroup.destroyEach()
    railgroup.destroyEach()
    stroke("yellow")
    fill("red")
    textSize(30)
    text("GAME OVER",200,300)
    
  }
  
  drawSprites();
}

function spawndoors(){
  if(frameCount % 240 === 0){
   door = createSprite(200,-50)
   door.addImage(door_img)
   door.x = Math.round(random(120,400))
   door.velocityY = 2
   door.lifetime = 500 
   doorgroup.add(door) 
   climber = createSprite(door.x,10)
   climber.addImage(climber_img)
   climber.velocityY = 2
   climber.lifetime = 500
   railgroup.add(climber)
   ghost.depth = door.depth
   ghost.depth += 1
   block = createSprite(climber.x,15,climber.width,2)
   block.velocityY = 2
   blockgroup.add(block)         
   block.debug = true;
   
   }
  }
