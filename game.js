var buttonColours = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function() {
    if(!started) {

      $("#level-title").text("Level " + level );
      nextSequence();

      started = true;
    }
});

$(".btn").on("click", function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    /* console.log(userClickedPattern); */

    playSound(userChosenColour); /* play the corresponding sound */

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); //check answer
    
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        
        console.log("success");

    if (gamePattern.length -1 === currentLevel) {
        setTimeout(function() {
            nextSequence();
        },1000);
    }

  } else {
    console.log("wrong");
    playWrongSong();
    }

    //console.log("userClickedPattern:", userClickedPattern);
    //console.log("gamePattern:", gamePattern);
}

function nextSequence() {
    userClickedPattern = [];

    level++; //increas the level by 1

    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var $button = $("#" + randomChosenColour); /* select specific class which is colours */
    $button.fadeIn(100).fadeOut(100).fadeIn(100); /* the flashing effect */

    playSound(randomChosenColour); /* refactor the code so it will work for both playing sound in next sequence and when user clicks a button */
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playWrongSong() { //play wrong song function
    var wrongAudio = new Audio("sounds/" + "wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over"); //apply CSS style to the body

    $("h1").text("Game Over man, Press F5 to restart")

    setTimeout(function() {
    $("body").removeClass("game-over"); //remove it after 200 milliseconds or 0.2 seconds   
    startOver();
  }, 200);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}