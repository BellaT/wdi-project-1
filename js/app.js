//Mastermind
//computer choice is hidden
//player has 10 choices - 11 rows all together (top one computer's hidden choice)
//The computer will choose an array of random colours from a selection of colours [red, blue, black, green, purple, yellow] - (or images??)
//those will be selected at random from the beginning and every time player clicks on PLAY AGAIN
//the player will choose 4 colours at a time from the selection printed on the screen
// use CLICK event here to select colours to input into the first block, then 2nd, then 3rd, then 4th
// Therefore you need to work out how when the player selects one of the colours, that colour is then moved into the first box etc.
//PUSH each choice into an ARRAY called "PLAYERMOVE"
// you will need to compare the array of colours the player has chosen to the array the computer has chosen
// then calculate whether the player has chosen any of the right colours, and IF so are they in the right place?
// ....IF there is one right color but not in the right position DISPLAY a "white" icon
// ....IF there is one right color AND in the right position DISPLAY a "black" icon
// ....ELSE return false? or null? or ""? (emply html)
// IF the player guesses correctly within the 10 choices display that in some way - party gif popping up?
// ELSE if they don't correct within the 10 choices they lose.

$(function() {

  var computerSelection = [];
  var playerSelection   = [];
  var $rows             = $(".singleRows");
  var $column1          = $(".singleRows > li:nth-child(1)").splice(1,10);
  var $cells            = $(".cells");
  var $check            = $("#check");
  var $playAgain        = $("#playAgain")
  var numberOfGos       = 0;
  var numberOfGuesses   = 0;
  var $playAgain        = $("#playAgain")

  $playAgain.on("click", function() {
    $(".solution li").css("background-color", "#36ddd4");
    $(".singleRows li").css("background-color", "#36ddd4");
    playerSelection   = [];
    computerSelection = [];
    computerClone     = [];
    guessClone        = [];
    numberOfGos       = 0;
    numberOfGuesses   = 0;
    computerChoice();
    $(".selector").removeClass("selector");
    $($column1[0]).addClass("selector");
  })

  $($column1[0]).addClass("selector");


  function computerChoice() {
    //this function is for the computer to select 4 colours out of the 6 at random
    //then save them into a new array which will then by compared to player's choice
    var colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange'];
    for (var i = 0; i < 4; i++) {
      var selectedColor = colors[Math.floor(Math.random()*colors.length)];
      computerSelection.push(selectedColor);
    } 
    console.log(computerSelection)
    return computerSelection;
  }
  
  computerChoice();
  

  $(".colorChoice button").on("click", function(){
    // Check for 4 guesses
    if (numberOfGuesses === 4) {
      var audio = new Audio("./bonk_rock_hit.mp3");
         audio.play();
      return alert("You can't guess anymore!");
    }


    // Get the selected color
    var color       = this.id;
    // Find the row, according to the number of "gos" you've had (4xguesses)
    var $rowToPlay  = $($rows[1 + numberOfGos]);
    // Find the next cell to play, according to the number of guesses you've had
    var $cellToPlay = $($rowToPlay.children(".cells")[1+numberOfGuesses])
    // Change the cell to play to be the colour of the button that you have clicked
    $cellToPlay.css("background-color", color);
    playerSelection.push(color);
    // playerSelection.toString();
    // console.log(playerSelection);

    numberOfGuesses++;
  })

  $check.on("click", function(){
    if (numberOfGuesses !== 4) return alert("Guess more pegs!");

    numberOfGos++;
    numberOfGuesses = 0;

    calculateScore(playerSelection, computerSelection);
    $($column1[numberOfGos-1]).removeClass("selector");
    $($column1[numberOfGos]).addClass("selector");
  });


  function calculateScore(guess, computer) {
    // console.log(guess, computer);
    var computerClone = computer.slice(0);
    var guessClone    = guess.slice(0);    

    var black = 0;
    var white = 0;

    // Loop through to match if there are any exact matches
    for (var i = 0; i < guessClone.length; i++) {
      if (guessClone[i] === computerClone[i]) {
        black++;
        // Remove from both arrays
        guessClone[i] = null;
        computerClone[i] = null;
      }
    }

    // Loop through the guessArray
    for (var i = 0; i < guessClone.length; i++) {
      // Loop through the computerArray
      for (var x = 0; x < computerClone.length; x++) {
        // Check the first value in the guessArray for every value in the computerArray
        // If the guess is and the computer do not equal null (therefore aren't black matches)
        if (guessClone[i] && computerClone[x]) {
          // If there is a match, they must be a white
          if (guessClone[i] === computerClone[x]) {
            white++;
            // Set both to be null so they don't get counted twice
            computerClone[x] = null;
            guessClone[i]    = null;
          }
        }
      }
    }
    
    var result = {
      black: black,
      white: white
    }

    // Clear selection
    playerSelection = [];

    return displayScore(result)
    // return result;
  }

  function displayScore(display) {
    // Create variables seperated by commas
    var results, b, w, ww;

    var results = $(".results").eq(numberOfGos - 1).find(".resultGrid");

    for (var b = 0; b < display.black; b++){
      $(results[b]).css("background-color", "black");
      var audio = new Audio("./ping_ping.mp3");
        audio.play();
    }

    for (ww = display.white, w = b; ww > 0; ww--, w++){
      $(results[w]).css("background-color", "white");
      var audio = new Audio("./ping_ping.mp3");
        audio.play();
    }

    if (display.black === 4) {
      showSolution();
      var audio = new Audio("./yiiiiiiihoo.mp3");
         audio.play();
      alert("Winner! Ding Ding Ding");
    }

    if (numberOfGos >= 10) {
      showSolution();
      var audio = new Audio("./raven.mp3");
         audio.play();
      alert("Oh no! The bot won this round!");
    }
  }

  function showSolution() {
    $.each(computerSelection, function(index, value) {
      $("#compChoice" + index).css("background-color", value);
    });
  }

});






