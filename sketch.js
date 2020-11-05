var database;
var ball;
var ballpos;
var pos;

function setup(){
   database = firebase.database();

    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ballpos = database.ref('ball/position');
    ballpos.on("value", readPosition, showErr);
   
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').set({
        'x': pos.x + x,
        'y': pos.y + y
    })
}

function readPosition(data){
   pos = data.val();
   console.log(pos);

   ball.x=pos.x;
   ball.y=pos.y;

}

function showErr(){
    console.log("Error in Database");
}
