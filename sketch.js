var dog, dog1;
var happyDog, happyDog1;
var database;
var foodS;
var foodStock;
var feedDog;
var addFoods;
var fedTime;
var lastFed;

function preload()
{
	dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 500);

  dog1 = createSprite(850, 350, 50, 50);
  dog1.addImage(dog);
  dog1.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", function(data){
     foodS = data.val();
  });

  foodObj = new Food(0, 0, 50, 50);

  feed=createButton("Feed the Dog");
  feed.position(900, 65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1000, 65);
  addFood.mousePressed(addFoods);

}


function draw() {  
  
  background(46, 139, 87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })


  drawSprites();

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>= 12){
    text("Last  Feed  :  "  + lastFed%12  + "  PM"  ,  350, 30);
  }else if(lastFed==0){
     text("Last  Feed :  12 AM", 350, 30);
    }else{
     text("Last Feed :  "  + lastFed +  "  AM" , 350, 30);
    }
}


function feedDog(){
    dog1.addImage(happyDog);

   if(foodObj.getFoodStock()<=0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0);
   }
   else{
     foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   }
}

function  addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })

}
