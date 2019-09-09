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
// var wordObject = {
//     carName: ["audi", "bugatti", "ferrari", "ford", "lamborghini", "mclaren", "pagoni", "porsche"],
//     carPic: ["assets/images/audir8.jpeg", "assets/images/bugatti.jpeg", "assets/images/farrari.jpeg", "assets/images/fordgt.jpeg", "assets/images/lamborghini.jpeg", "assets/images/mclaren.jpeg", "assets/images/pagonizonda.jpeg", "assets/images/porsche.jpeg"]
// }

let words = [
    {
        carName : "audi",
        carPic : "assets/images/audir8.jpeg"
    },
    {
        carName: "bugatti",
        carPic : "assets/images/bugatti.jpeg",
    },
    {
        carName: "ferrari",
        carPic : "assets/images/ferrari.jpeg",
    },
    {
        carName: "ford",
        carPic : "assets/images/fordgt.jpeg"
    },
    {
        carName: "lamborghini",
        carPic : "assets/images/lamborghini.jpeg"
    },
    {
        carName: "mclaren",
        carPic : "assets/images/mclaren.jpeg"
    },
    {
        carName: "pagoni",
        carPic : "assets/images/pagonizonda.jpeg"
    },
    {
        carName: "porsche",
        carPic : "assets/images/porsche.jpeg"
    }
];

//Gobal varibles
let randomWordNumber
//let currentIndex = 0;
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
            init();
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
    guessesRemaining = 12;
    gameAlreadyStarted = false;
    lettersGuessed = "";
    currentHiddenWord = "";
    currentHiddenWordArray = [];
    document.querySelector("#letters-guessed").innerHTML = lettersGuessed;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#hidden-word").innerHTML = "";
    document.querySelector("#letters-guessed").innerHTML = "None Yet!";
    document.querySelector('#hidden-pic').src = words[randomWordNumber].carPic;
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
function init() {

    updateStartChanges();
    initCurrentAndDashedWord();
}

//Initializes currentHiddenWordArray and the dashes
function initCurrentAndDashedWord() {
    randomWordNumber = Math.floor(Math.random() * words.length);

    for (let i = 0; i < words[randomWordNumber].carName.length; i++) {
        currentHiddenWordArray.push("_");
    }

    currentWord = words[randomWordNumber].carName;
    currentHiddenWord = currentHiddenWordArray.join(" ");
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#hidden-word").innerHTML = currentHiddenWord;
    document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;
    document.querySelector("#letters-guessed").innerHTML = "None Yet!";
    document.querySelector('#hidden-pic').src = words[randomWordNumber].carPic;
}
//Returns a randomly ordered object array


// function randomOrder(arr) {

//     let currentIndex = arr.length;
//     let tempObj = []
//     let rand = 0;

//     for (let i = 0; i < arr.length; i++) {
//         rand = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//         tempObj = arr[currentIndex];
//         arr[currentIndex] = arr[rand]
//         arr[rand] = tempObj;
//     }
//     randomWordNumber = Math.floor(Math.random() * words.length);
//     return randomWordNumber;
// }



    