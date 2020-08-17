//Create variables here
var dog,happyDog,dogSprite;
var database;
var foodS,foodStock;


function preload()
{
  //load images here
  dog = loadImage("images/dog1.png");
  happyDog = loadImage("images/dog2.png");
}

function setup() {
	createCanvas(500, 500);
  dogSprite = createSprite(250,250,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("green");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  drawSprites();
  text("Milk Left " + foodS,200,150)
   text("Press Up Arrow Key",10,25);
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<0){
    x=20;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

