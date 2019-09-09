//RJ Pupunu
//Word Game
//wordgame.js

// Object Array - Initial, Win, Loss.
let aux = [
    {
        "name": "intial",
        "text": "Can you guess the make of the car?"
    },
    {
        "name": "win",
        "text": "Winner, Winner, Chicken Dinner!"
    },
    {
        "name": "loss",
        "text": "SO SORRY, you LOSE!"
    }
];

//Car make object array: audi, bugatti, ferrari, ford, lamborghini, mclaren, pagoni, porsche
let words = [
    {
        "carName": "audi"
    },
    {
        "carName": "bugatti"
    },
    {
        "carName": "ferrari"
    },
    {
        "carName": "Ford"
    },
    {
        "carName": "lamborghini"
    },
    {
        "carName": "mclaren"
    },
    {
        "carName": "pagoni"
    },
    {
        "carName": "porsche"
    }
];

//Gobal varibles
let wordsRandomOrder = randomOrder(words);
let currentIndex = 0;
let currentHiddenWordArray = []
let currentHiddenWord = "";
let gameOver = false;
let wins = 0;
let currentWord = "";
let guessesRemaining = 12;
let lettersGuessed = ""
let gameAlreadyStarted = false;

main();

//Run the game function

function main() {

    //Press any key to initiate game
    document.onkeyup = function (event) {

        //Determine if this is the first keypress event
        if (gameAlreadyStarted === false) {
            init(wordsRandomOrder);
        }

        //If not this game continues and checkes to determine if game is over and must be reset
        else {
            processInput(event);

            if (gameOver === true) {
                resetGame();
            }
        }
    }
}

//Compares the user input against previous input to check for duplicates
function isDuplicate(letter) {

    for (let i = 0; i < lettersGuessed.length; i++) {
        //charAt(i) used to check against every letter in the array
        if (letter === lettersGuessed.charAt(i)) {
            return true;
        }
    }
    return false;
}

//Game reset function to reset values and generate a new word from the words array
function resetGame() {

    updateWinCount();
    wordsRandomOrder = randomOrder(words);
    guessesRemaining = 12;
    gameAlreadyStarted = false;
    lettersGuessed = "";
    currentHiddenWord = "";
    currentHiddenWordArray = [];
    document.querySelector("#letters-guessed").innerHTML = lettersGuessed;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#wins").innerHTML = 0;
    document.querySelector("#hidden-word").innerHTML = "";
    document.querySelector("#letters-guessed").innerHTML = "None Yet!"
    gameOver = false;
}

//updates win counter
function updateWinCount() {

    console.log("updateWinCount " + guessesRemaining);
    //if guesses remaining is greater than 0 is a win
    if (guessesRemaining > 0) {

        wins += 1;
        console.log("wins " + wins);
        document.querySelector("#wins").innerHTML = wins;
        document.getElementById("heading").innerHTML = aux[1].text;
        document.querySelector("#start-msg").innerHTML = "Good Job!";
    }

    //else it is a loss
    else {

        wins = 0;
        document.getElementById("heading").innerHTML = aux[2].text;
        document.querySelector("#start-msg").innerHTML = "Try another one!"
    }
}

//Event to compare input against currentWord, if correct add letter to current word, if inccorect add letter to lettersGuessed and subtract from guessesRemaining and if out of guesses, resetGame
function processInput(event) {

    let input = event.key;
    let keyInput = input.toLowerCase();

    if (!isDuplicate(keyInput) && !isTheCorrectLetter(keyInput)) {
        guessesRemaining--;

        if (guessesRemaining ==11) {
            console.log("processInput 11 " + guessesRemaining);
            lettersGuessed = keyInput;
        }
        else if (guessesRemaining > 0) {
            console.log("processInput > 0" + guessesRemaining);
            lettersGuessed = lettersGuessed + "," + keyInput;
        }
        else {
            console.log("processInput == 0 " + guessesRemaining);
            gameOver = true;
        }
    }
    document.querySelector("#letters-guessed").innerHTML = lettersGuessed;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
}

//check if input matches any characters in the currentWord
function isTheCorrectLetter(letter) {
    let atLeastOneLetterChanged = false;

    for (var i= 0; i < currentWord.length; i++) {
        
        if (currentWord.charAt(i) === letter) {
            currentHiddenWordArray[i] = letter;
            atLeastOneLetterChanged = true;
        }
    }
    //check to see if word is solved
    currentHiddenWord = currentHiddenWordArray.toString();

    if(atLeastOneLetterChanged) {

        document.querySelector("#hidden-word").innerHTML = currentHiddenWord.replace(/,/g, ' ');
        if (currentHiddenWord.replace(/,/g, '') === currentWord) { gameOver =true; }

        return true;
    }
    return false;
}

//Update start message and sets gameAlreadyStarted flag
function updateStartChanges() {

    document.getElementById("heading").innerHTML = aux[0].text;
    document.querySelector("#start-msg").innerHTML = "Good Luck!";
    gameAlreadyStarted = true;
}

//Initialize game data
function init(arr) {

    updateStartChanges();
    initCurrentAndDashedWord(arr);
}

//Initializes currentHiddenWordArray and the dashes
function initCurrentAndDashedWord(arr) {

    for (let i = 0; i < arr[currentIndex].carName.length; i++) {
        currentHiddenWordArray.push("_");
    }

    currentWord = arr[currentIndex].carName;
    currentHiddenWord = currentHiddenWordArray.join(" ");
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#hidden-word").innerHTML = currentHiddenWord;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#letters-guessed").innerHTML = "None Yet!"
}
//Returns a randomly ordered object array
function randomOrder(arr) {

    let currentIndex = arr.length;
    let tempObj = []
    let rand = 0;

    for (let i = 0; i < arr.length; i++) {
        rand = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempObj = arr[currentIndex];
        arr[currentIndex] = arr[rand]
        arr[rand] = tempObj;
    }
    return arr;
}



    