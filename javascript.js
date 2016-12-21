var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('trash', 'Images/trashT.png');
    game.load.image('back', 'Images/background.jpg');
    game.load.image('ground', 'Images/ground.png');
}
var trash;
var spawn;
var text;
var counter = 0;
function create() {
   var image = game.add.image(0, 0, "back");image.width = game.width;image.height = game.height;
    ground = game.add.sprite(0,window.innerHeight - 320, 'ground'); ground.width = window.innerWidth;ground.height = 320;
    //creates 30 bottles with gravity
    for (var i = 0; i < 30; i++) {
        trash = game.add.group();
        trash.enableBody = true;
        trash.physicsBodyType = Phaser.Physics.ARCADE;



        var trash = trash.create(game.world.randomX, game.world.randomY, 'trash');
        trash.scale.setTo(2.2, 2.2)
        //This allows your sprite to collide with the world bounds like they were objects
        trash.body.collideWorldBounds = true;
        trash.body.gravity.x = game.rnd.integerInRange(-50, 50);
        trash.body.gravity.y = 100 + Math.random() * 100;
        trash.body.bounce.setTo(1.0, 1.0);
        trash.inputEnabled = true;
        // trash.input.enableDrag();

        // trash.events.onDragStart.add(startDrag, this);
        // trash.events.onDragStop.add(stopDrag, this);
        trash.inputEnabled = true;
        trash.input.useHandCursor = true;
        trash.events.onInputDown.add(destroySprite, this);
    


    }
    // Gives the position of text and color
    text = game.add.text(window.innerWidth / 2 - 250, window.innerHeight/2, '', { fill: '#FF5555' ,font:"50px Arial"});

    timeCounter = 15;

    textCounter = game.add.text(game.world.centerX, game.world.centerY, 'Counter:' + timeCounter, { font: "64px Arial", fill: "#ffffff", align: "center" });
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

}

function updateCounter() {
    
    if(timeCounter > 0){
    
    timeCounter--;

    textCounter.setText('Counter: ' + timeCounter);
    }
    else{
        game.world.removeAll();
        text = game.add.text(window.innerWidth / 2 - 250, window.innerHeight/2, '', { fill: '#FF5555' ,font:"50px Arial"});
        points = game.add.text(window.innerWidth / 2 + 100, window.innerHeight/2, '2', { fill: '#FF5555' ,font:"50px Arial"});
        points.text = "Points: +" + counter;
        text.text = 'You Lose! ';
        
    }
    

}
// Destroys sprite when clicked
function destroySprite(sprite) {
    sprite.destroy();
    counter++;
    if (counter === 30) {
        game.world.removeAll()
        text = game.add.text(window.innerWidth / 2 - 250, window.innerHeight/2, '', { fill: '#FF5555' ,font:"50px Arial"});

        text.text = 'You Win! ';
        image.destroy();

    }
}
// For drag 
function startDrag() {

    trash.body.moves = false;

}
function stopDrag() {

    trash.body.moves = true;

}
function update() {

}

//Bugs
/*

You can click on enemies on end losing screen


*/
