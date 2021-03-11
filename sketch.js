var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;

function preload()
{
  //load images here
  backgroundImg = loadImage("images/bg.png");
  dogImage = loadImage("images/dogImg.png");
  dogImage1 = loadImage("images/dogImg1.png");
  foodImage = loadImage("milk.png");
  bathImage = loadImage("Wash Room.png");
  sleepImage = loadImage("Bed Room.png");
  playImage = loadImage("Living Room.png");
  walkImage = loadImage("running.png");
  

}

function setup() {
  createCanvas(480, 480);

  //Sprites

  food = createSprite(90,410,50,50);
  food.addImage(foodImage);
  food.scale = 0.15;


  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.35;

  //Firebase
  database = firebase.database();

  //Reference for food
  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);


}


function draw() {  
  background(backgroundImg);
  drawSprites();
  
  //add styles here
  textSize(27);
  stroke("black");
  strokeWeight(3.5);
  fill("white");
  textFont("Cookie Regular")
  text("Bottles in the Stock: "+foodStock,130,430);

  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }

  var Bath = createButton("I want to take Bath");
  Bath.position(100,35);
  if(Bath.mousePressed(function(){
     database.ref('/').update({'gameState':gameState})
  }));

  

   var sleep = createButton("I am very Sleepy");
   sleep.position(360,35)
   if(sleep.mousePressed(function(){
    database.ref('/').update({'gameState':gameState})
 })); 
  
   var Play = createButton("Let's Play !");
   Play.position(250,35)
   if(Play.mousePressed(function(){
    database.ref('/').update({'gameState':gameState})
 })); 

  var PlayInGarden = createButton("Let's Play In Park");
      PlayInGarden.position(227,75)
  if(PlayInGarden.mousePressed(function(){
      database.ref('/').update({'gameState':gameState})
     }));












}
  if(keyWentUp(LEFT_ARROW)){
   
    dog.addImage(playImage);
    dog.scale = 1
    dog.x = 250-10;
    dog.y = 250-80;
    
    
  }

  if(keyCode === 32){
    
    dog.addImage(walkImage);
    dog.scale = 0.45
 }



function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(DOWN_ARROW)){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  
  dog.scale = 0.35;
 

  }
  
  if(keyWentUp(DOWN_ARROW)){
    
    foodStock = foodStock;
    dog.addImage(dogImage);
    fill("red");

    dog.scale = 0.35;
    food.x = 90;
    food.y = 410;
    food.scale = 0.15;
    
  }
}
