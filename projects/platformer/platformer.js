$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    // drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
createPlatform(0, 190, 1040, 14)
createPlatform(750, 350, 1040, 14) 
createPlatform(350, 450, 350, 14) 
createPlatform(0, 550, 350, 14) 
createPlatform(350, 700, 350, 14) 
createPlatform(200, 145, 20, 60) 
createPlatform(450, 145, 20, 60) 
createPlatform(720, 145, 20, 60) 
createPlatform(1000, 300, 20, 60) 
createPlatform(1200, 300, 20, 60) 
createPlatform(450, 400, 20, 60) 
createPlatform(190, 500, 20, 60)
createPlatform(500, 650, 20, 60) 

    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
createCollectable('ghost', 320, 150) 
createCollectable('ghost', 570, 150) 
createCollectable('ghost', 873, 150) 
createCollectable('ghost', 1300, 310) 
createCollectable('ghost', 873, 310) 
createCollectable('ghost', 570, 410) 
createCollectable('ghost', 400, 410) 
createCollectable('ghost', 60, 510)      
createCollectable('ghost', 60, 700)
createCollectable('ghost', 570, 660) 
createCollectable('ghost', 873, 700)
createCollectable('ghost', 1300, 700)  

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)
createCannon('top', 140, 950)  
createCannon('top', 395, 1000) 
createCannon('top', 650, 1000) 
createCannon('top', 950, 1000) 
createCannon('bottom', 1100, 1000)

    
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
