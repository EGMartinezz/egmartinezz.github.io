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

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    switch (event.which){
      case KEY.LEFT:
      console.log("Left key pressed");
      break;
    case KEY.UP:
      console.log("Up key pressed");
      break;
    case KEY.RIGHT:
      console.log("Right key pressed");
      break;
    case KEY.DOWN:
      console.log("Down key pressed");
      break;
    default:
      console.log("Other key pressed:", event.which);
    };
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.x += walker.xSpeed;
    walker.y += walker.ySpeed; 
  }
  
  function redrawGameItem() {
    $("walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
  }

  function newFrame(){
    repositionGameItem();
    redrawGameItem();
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
