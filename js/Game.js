class Game {
  constructor(){}

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
      car1=createSprite(200,100);
      car1.addImage(car1Img);
      car2=createSprite(200,300);
      car2.addImage(car2Img);
      car3=createSprite(200,500);
      car3.addImage(car3Img);
      car4=createSprite(200,700);
      car4.addImage(car4Img);
      cars=[car1,car2,car3,car4];
      
    }
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(groundImg);
      image (trackImg,-displayWidth*4,0,displayWidth*5,displayHeight);
      var index=0;
      var x;
      var y=50;
      
      for(var i in allPlayers){
        index=index+1;
        x=displayWidth-allPlayers[i].distance;
        y=y+200;
cars[index-1].x=x
cars[index-1].y=y
        if (index ===  player.index){
cars[index-1].shapeColor="red";
camera.position.x=cars[index-1].x;
camera.position.y=displayHeight/2;
        }
          
      }
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance>93000){
      gameState=2;
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended")
  }
}