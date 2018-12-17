// create global variables for the game to work
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var wordPicked = "";
var pickedWordPlaceholders = [];
var lettersGuessedArray = [];
var incorrectLettersGuessed = [];
var gameActive = false;

// create variables for DOM element reference
var $wins = document.getElementById("wins-count");
var $losses = document.getElementById("losses-count");
var $gameBtn = document.getElementById("new-game");
var $placeholders = document.getElementById("placeholders");
var $guessesLeft = document.getElementById("guesses-left");
var $incorrectLetters = document.getElementById("incorrect-letters");


// create a function to start a new game
function newGame() {
  // reset game variables
  guessesLeft = 9;
  pickedWordPlaceholders = [];
  lettersGuessedArray = [];
  incorrectLettersGuessed = [];

  // turn on game
  gameActive = true;

  // pick a new word to play against
  wordPicked = wordbank[Math.floor(Math.random() * wordbank.length)];
  console.log(wordPicked);
  
  // generate placeholders based on wordPicked
  for (var i = 0; i < wordPicked.length; i++ ) {
    if (wordPicked[i] === " ") {
      pickedWordPlaceholders.push(" ");
    }
    else {
      pickedWordPlaceholders.push("_");
    }
  }

  // write information to the page to let user know that game has restarted
  $guessesLeft.textContent = guessesLeft;
  // this turns an array into a string for the page to read
  $placeholders.textContent = pickedWordPlaceholders.join(" ");
  $incorrectLetters.textContent = "";

}


// create a function to check if letter guessed is correct (game logic)
function checkLetter(letter) {

  // check to see if letter is in pickedWord (use loop)
  for (var i = 0; i < wordPicked.length; i++) {
    // if pickedWord at this index's character matches the letter we picked, let's swap the placeholder "_" with the correct character 
    if (wordPicked[i].toLowerCase() === letter.toLowerCase()) {
      pickedWordPlaceholders[i] = wordPicked[i];
    }
  }

  // write placeholders to page to reflect a correct guess
  $placeholders.textContent = pickedWordPlaceholders.join(" ");

  // check for incorrect by seeing if letter made it into placeholders
  if (!pickedWordPlaceholders.includes(letter)) {
    // decrease guesses
     guessesLeft--;
     // update page to reflect less guesses
     $guessesLeft.textContent = guessesLeft;
    // add incorrect letter to incorrect letter bank
     incorrectLettersGuessed.push(letter);
    // let user know what incorrect letter was pressed
     $incorrectLetters.textContent = incorrectLettersGuessed.join(", ");
  }

  // check if win
  if (wordPicked.toLowerCase() === pickedWordPlaceholders.join("").toLowerCase()) {
    wins++;
    $wins.textContent = wins;
    gameActive = false;
  }

  // check if loss
  if (guessesLeft === 0) {
    losses++;
    $losses.textContent = losses;
    gameActive = false;
  }

}



// set up onkeyup event to capture letter
document.onkeyup = function(event) {
  console.log(event.key);

  // check if game is running
  if (gameActive === false) {
    alert("You need to press the button and start a new game");
    return false;
  } 

  // check if we actually pressed a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // check if we already guessed this letter
    if (lettersGuessedArray.includes(event.key)) {
      alert("You already guessed this letter!");
      return false;
    }
    // push letter into lettersGuessedArray
    lettersGuessedArray.push(event.key);

    // send letter to function to check if correct
    checkLetter(event.key);

  }
  else {
    alert("Press a letter!");
  }
}


// set up event listener for when user clicks new game button to start a new game 
$gameBtn.addEventListener("click", newGame);