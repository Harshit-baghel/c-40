class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image)
    car2 = createSprite(300,200);
    car2.addImage(car2Image)

    car3 = createSprite(500,200);
    car3.addImage(car3Image)

    car4 = createSprite(700,200);
    car4.addImage(car4Image)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsatend();
    if(allPlayers !== undefined){
      //var display_position = 100;
      //background(ground)
      image(ground,0,-height*5,width,height*7)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;
      image(track,0,-height*4,width,height*5)

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill(220)
          ellipse(x,y,60,120)
          fill(220,0,0)
        
         
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          text(player.name,x,y)
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
if(player.distance>3750){
  gameState=2;
  player.rank++
  Player.updatecarsatend(player.rank)
  background(255)
textSize(35)
fill(255)
text("You reach on the Destination and you rank is -"+player.rank,width/3,height/2)
//var t=createElement("h1")
//t.html("You reach on the Destination and you rank is -"+player.rank)
//t.position(width/3,height/2)
}
   
  }
  end(){
    console.log("game ended")
    console.log(player.rank)
    var t=createElement("h1")
    t.html("You reach on the Destination and you rank is -"+player.rank)
    t.position(width/3,height/2)
  }
}
