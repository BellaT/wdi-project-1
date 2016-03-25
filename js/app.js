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

var computerArray = [];


function colorSelect() {
  var colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange'];
  for (var i = 0; i < 4; i++) {
    var selectedColor = colors[Math.floor(Math.random()*colors.length)];
    computerArray.push(selectedColor);
  }

  console.log(computerArray);
}

colorSelect();











});



