// alert("Hello, World!");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).on("keypress touchstart", function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        // console.log(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }

    else{
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    currentLevel = 0;
    level++;

    $("#level-title").text("Level "+level);
    randomNumber = Math.floor((Math.random()* 4));      //generate random num 0-3
    randomChosenColour = buttonColours[randomNumber];     //convert it to color
    gamePattern.push(randomChosenColour);       //record new color

    //adding Flash effect for generated color
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    //playing corresp sound for the color
    playSound(randomChosenColour);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
        }, 100);

}


