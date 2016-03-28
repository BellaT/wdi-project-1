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
  var $cells            = $(".cells");
  var $check            = $("#check");
  var $delete           = $("#delete");
  var $playAgain        = $("#playAgain")
  var numberOfGos       = 0;
  var numberOfGuesses   = 0;
  var $playAgain        = $("#playAgain")


  $playAgain.on("click", function() {
    $(".solution li").css("background-color", "#A26236");
    $(".singleRows li").css("background-color", "#A26236");
    playerSelection   = [];
    computerSelection = [];
    computerClone     = [];
    guessClone        = [];
    numberOfGos       = 0;
    computerChoice();
    // numberOfGuesses   = 0;
    // computerChoice();

        // $($rows).each(function(i, row){
    //   $(row).children('li').empty();
    // })
    // for(i = 1; i < $rows.length; i++) {
    //   $rows[i]
    // }
    // for (j = 0; j < $rows.length; j++) {
    //   $($rows[j][0] + " li").empty();
    //   $(".solution li").empty();
    // }
  })

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

    // Increment the number of guesses
    numberOfGuesses++;

    if (numberOfGuesses === 4) {
      numberOfGos++;
      numberOfGuesses = 0;
      // Check for matches
      // Add the marker pins
    }
  })

  $check.on("click", function(){
    calculateScore(playerSelection, computerSelection)
  });

  function calculateScore(guess, computer) {
    console.log(guess, computer);
    var computerClone = computer.slice(0);
    var guessClone    = guess.slice(0);

    console.log("comp", computerClone);
    console.log("guess", guessClone);

    var black = 0;
    var white = 0;

    // Loop through to match if there are any exact matches
    for (var i = 0; i < guessClone.length; i++) {
      if (guessClone[i] === computerClone[i]) {
        black++;
        // Make that colour in the computer array null to prevent double lookup
        computerClone[i] = null;
      }
    }

    console.log("comp2", computerClone);
    console.log("guess2", guessClone);

    // Then loop through the remaining to see if there are any that appear in the array
    for (var i = 0; i < guessClone.length; i++) {
      var index = computerClone.indexOf(guessClone[i]);
      if (index >= 0) {
        white++;
        // Remove that item from the array so as not to double count
        computerClone.splice(index, 1);
      }
    }
    
    var result = {
      black: black,
      white: white
    }

    console.log("result", result);

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
    }

    for (ww = display.white, w = b; ww > 0; ww--, w++){
      $(results[w]).css("background-color", "white");
    }

    if (display.black === 4) {
      showSolution();
      alert("Winner! Ding Ding Ding");
    }
  }

  function showSolution() {
    $.each(computerSelection, function(index, value) {
      $("#compChoice" + index).css("background-color", value);
    });
  }

});






