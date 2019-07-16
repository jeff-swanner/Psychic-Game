document.addEventListener('DOMContentLoaded', function() {
    // Define Variables
    var words = [
        "cowboys", 
        "indians",
        "lasso",
        "holster",
        "rodeo",
        "howdy",
        "lawless",
        "outlaw",
        "saloon",
        "sheriff",
        "saddlebags",
        "stallion",
        "gallop",
        "gunslinger",
    ];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var wins = 0;
    var remainingGuesses = 0;
    var remainingLetters = 0;
    var guesses = [];
    var wordDisplay = [];
    var randWord ="";

    // New Game Reset
    function newGame() {
        // Randomizes word
        randWord = words[Math.floor(Math.random() * words.length)];
        randWord = randWord.toUpperCase();
        wordDisplay = [];
        // Generates blank word 
        document.getElementById("hmText").innerHTML = "";
        for (i=0;i<randWord.length;i++) {
            wordDisplay.push("_");
            var newDiv = document.createElement("b");
            newDiv.innerHTML = wordDisplay[i];
            document.getElementById("hmText").append(newDiv);
        };
        // Resets variables
        remainingGuesses = 7;
        remainingLetters = randWord.length;
        guesses = [];
        document.getElementById("guesses").innerHTML = "";
        document.getElementById("guessCount").textContent = "Guesses Remaining: "+remainingGuesses;
        // Reset stick figure
        document.getElementById("head").style.display ="none";
        document.getElementById("bod").style.display ="none";
        document.getElementById("hand").style.display ="none";
        document.getElementById("handright").style.display ="none";
        document.getElementById("leg").style.display ="none";
        document.getElementById("legright").style.display ="none";
    };
    newGame(); //Calls initial new game function

    // Main Game Loop
    document.onkeyup = function(event) {
        var userInput = event.key.toUpperCase();
        if (letters.indexOf(userInput) >= 0 && remainingGuesses > 0 && guesses.indexOf(userInput) === -1) {
            // Updates guess array
            guesses.push(userInput);
            document.getElementById("guesses").innerHTML = "Guesses: "+guesses;
            var incorrectGuess = true; // Tracks whether guess is correct
            document.getElementById("hmText").innerHTML = ""; //Clears hangman text
            for (i=0;i<wordDisplay.length;i++) {
                // Checks if guess is a match
                if (userInput === randWord[i]) {
                    wordDisplay[i] = randWord[i];
                    remainingLetters -= 1;
                    incorrectGuess = false;
                    var correctAudio = document.getElementById("myAudio");
                    correctAudio.pause();
                    correctAudio.currentTime = 0;
                    correctAudio.play();
                }; 
                // Updates Hangman text
                var newDiv = document.createElement("b");
                newDiv.innerHTML = wordDisplay[i];
                document.getElementById("hmText").append(newDiv);
            };
            // Incorrect guess logic
            if (incorrectGuess) {
                remainingGuesses -= 1;
                document.getElementById("guessCount").textContent = "Guesses Remaining: "+remainingGuesses;
                var incorrectAudio = document.getElementById("myAudio2");
                incorrectAudio.pause();
                incorrectAudio.currentTime = 0;
                incorrectAudio.play();
                if (remainingGuesses === 6) {
                    document.getElementById("head").style.display ="block";
                };
                if (remainingGuesses === 5) {
                    document.getElementById("bod").style.display ="block";
                };
                if (remainingGuesses === 4) {
                    document.getElementById("hand").style.display ="block";
                };
                if (remainingGuesses === 3) {
                    document.getElementById("handright").style.display ="block";
                };
                if (remainingGuesses === 2) {
                    document.getElementById("leg").style.display ="block";
                };
                if (remainingGuesses === 1) {
                    document.getElementById("legright").style.display ="block";
                };
            };
            // Checks lose condition
            if (remainingGuesses === 0) {
                alert("You lost! Correct Word: "+randWord);
                newGame();
            };
            // Checks win condition
            if (remainingLetters === 0) {
                wins++;
                document.getElementById("wins").textContent = "Wins: "+wins;
                alert("You won! Correct Word: "+randWord);
                newGame();
            };
        };
    };
});