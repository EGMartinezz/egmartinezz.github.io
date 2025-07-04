/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40
  }
  
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0, 
    xSpeed: 0,
    ySpeed: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  switch (event.which){
    case KEY.LEFT:
      walker.xSpeed = -5;
      break;
    case KEY.UP:
      walker.ySpeed = -5;
      break;
    case KEY.RIGHT:
      walker.xSpeed = 5;
      break;
    case KEY.DOWN:
      walker.ySpeed = 5;
      break;
    default:
      console.log("Other key pressed:", event.which);
  };
}

function handleKeyUp(event) {
  switch (event.which) {
    case KEY.LEFT:
    case KEY.RIGHT:
      walker.xSpeed = 0;
      break;
    case KEY.UP:
    case KEY.DOWN:
      walker.ySpeed = 0;
      break;
    default:
      console.log("Other key released:", event.which);
  }
}



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
  walker.x += walker.xSpeed;
  walker.y += walker.ySpeed;
  console.log("walker.x:", walker.x);
}

function redrawGameItem() {
  $("#walker").css("left", walker.x + "px");
  $("#walker").css("top", walker.y + "px");
  console.log("left:", $("#walker").css("left"));
}

function wallCollision() {
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  if (walker.x < 0) {
    walker.x = 0;
  }
  else if (walker.x > boardWidth - $("#walker").width()) {
    walker.x = boardWidth - $("#walker").width();
  }

  if (walker.y < 0) {
    walker.y = 0;
  }
  else if (walker.y > boardHeight - $("#walker").height()) {
    walker.y = boardHeight - $("#walker").height();
  }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
} 