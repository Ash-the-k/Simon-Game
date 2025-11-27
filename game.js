// ==========================================
// 1. GAME CONFIGURATION & STATE VARIABLES
// ==========================================
const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let level = 0;
let started = false;

// ==========================================
// 2. EVENT LISTENERS (INPUTS)
// ==========================================

// Start the game on keypress or touch
$(document).on("keypress touchstart", function() {
    if (!started) {
        started = true;
        
        // 1. Responsive Check
        const isMobile = $(window).width() < 600;
        const totalBlocks = isMobile ? 13 : 25; 
        const speed = 1500 / totalBlocks;

        // 2. Set Font for Loading Bar
        $("#level-title").css("font-family", "'Courier New', monospace");

        // 3. Run the Loading Loop
        for (let i = 0; i <= totalBlocks; i++) {
            setTimeout(() => {
                const filled = "█".repeat(i); 
                const empty = "░".repeat(totalBlocks - i);
                
                $("#level-title").html(`LOADING - [${filled}${empty}]`);
                
            }, i * speed);
        }

        // 4. Start Game after Loading finishes
        setTimeout(() => {
            $("#level-title").css("font-family", "");
            nextSequence();
        }, (totalBlocks * speed) + 200);
    }
});

// Handle user clicks
$(".btn").click(function () {
    if (started && level > 0) {
        // Get user input
        const userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        
        // feedback to user
        playSound(userChosenColour);
        animatePress(userChosenColour);
        
        // Check logic
        checkAnswer(userClickedPattern.length - 1);
    }
});

// ==========================================
// 3. CORE GAME LOGIC
// ==========================================

function nextSequence() {
    // Reset user pattern for the new level
    userClickedPattern.length = 0;
    
    // Update level
    level++;
    $("#level-title").text(`Level ${level}`);

    // Generate random colour
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Show sequence to user
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    // 1. Check if the most recent click is correct
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        // 2. Check if the user has finished the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }

    } else {
        // 3. Handle Game Over
        console.log("Wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game Over - Press Any Key");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern.length = 0;
}

// ==========================================
// 4. UI & HELPER FUNCTIONS
// ==========================================

function playSound(name) {
    // It's often safer to create a new audio object each time for rapid playback
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');

    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}