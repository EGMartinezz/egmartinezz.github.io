(function (window, createjs, opspark, _) {
  // Variable declarations for libraries and the game engine
  const draw = opspark.draw; // library for drawing using createJS
  const physikz = opspark.racket.physikz; // library for defining physics properties like velocity
  const engine = opspark.V6().activateResize(); // game engine for actively rendering + running the game's mechanics
  const canvas = engine.getCanvas(); // object for referencing the height / width of the window
  const stage = engine.getStage(); // object to hold all visual components

  // load some sounds for the demo - play sounds using: createjs.Sound.play("wall");
  createjs.Sound.on("fileload", handleLoadComplete);
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds(
    [
      { src: "hit.ogg", id: "hit" },
      { src: "wall.ogg", id: "wall" },
    ],
    "assets/sounds/"
  );

  function handleLoadComplete(event) {
    console.log("sounds loaded");
  }

  engine
    .addTickHandlers(update) // establish the update function as the callback for every timer tick
    .activateTick();

  // Variable declarations for the paddles and the ball which are drawn using createJS (see bower_components/opspark-draw/draw.js)
  const paddlePlayer = createPaddle();
  const paddleCPU = createPaddle({
    x: canvas.width - 20,
    y: canvas.height - 100,
  });
  const ball = draw.circle(20, "#540606");

  // set initial properties for the paddles
  paddlePlayer.yVelocity = 0;
  paddleCPU.yVelocity = 6;

  // set initial properties for the ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = 5;
  ball.yVelocity = 5;

  // Score variables
  let playerScore = 0;
  let cpuScore = 0;

  // Create score text fields
  const txtPlayerScore = draw.textfield("Player Score: 0", "20px Arial", "#666", "center");
  txtPlayerScore.x = canvas.width / 4;
  txtPlayerScore.y = 20;
  const txtCPUScore = draw.textfield("CPU Score: 0", "20px Arial", "#666", "center");
  txtCPUScore.x = canvas.width * 3 / 4;
  txtCPUScore.y = 20;

  // add the paddles, ball, and score text fields to the view
  stage.addChild(paddlePlayer, paddleCPU, ball, txtPlayerScore, txtCPUScore);

  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("keydown", onKeyDown);

  // when an Arrow key is pressed down, set the paddle in motion
  function onKeyDown(event) {
    if (event.key === "ArrowUp") {
      paddlePlayer.yVelocity = -5;
    } else if (event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 5;
    }
  }

  // when either the Arrow Up or Arrow Down key are released, stop the paddle from moving
  function onKeyUp(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 0;
    }
  }

  function update(event) {
    const boundsCPU = paddleCPU.getBounds();
    const widthCPU = boundsCPU.width;
    const heightCPU = boundsCPU.height;
    const midCPU = heightCPU / 2;
    const boundsPlayer = paddlePlayer.getBounds();
    const widthPlayer = paddlePlayer.width;
    const heightPlayer = paddlePlayer.height;

    // Ball movement: the xVelocity and yVelocity is the distance the ball moves per update
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    // Player movement //
    paddlePlayer.y += paddlePlayer.yVelocity;
    if (paddlePlayer.y < 0) {
      paddlePlayer.y = 0;
    }
    if (paddlePlayer.y > canvas.height - paddlePlayer.height) {
      paddlePlayer.y = canvas.height - heightPlayer;
    }

    // AI movement: CPU follows ball //
    if ((paddleCPU.y + midCPU) < (ball.y - 14)) {
      paddleCPU.y += paddleCPU.yVelocity;
    } else if ((paddleCPU.y + midCPU) > (ball.y + 14)) {
      paddleCPU.y -= paddleCPU.yVelocity;
    }

    // bounce the ball off the top
    if (ball.y < 0) {
      ball.y = 0; 
      ball.yVelocity *= -1; 
      createjs.Sound.play("wall");
    }

    // bounce the ball off the bottom
    if (ball.y > canvas.height - 20) {
      ball.y = canvas.height - 20;
      ball.yVelocity *= -1;
      createjs.Sound.play("wall");
    }

    // bounce the ball off each of the paddles
    if (ball.x + 20 > paddleCPU.x && ball.y > paddleCPU.y && ball.y < paddleCPU.y + paddleCPU.height) {
      ball.x = paddleCPU.x - 20; 
      ball.xVelocity *= -1;
      createjs.Sound.play("hit");
    }

    if (ball.x - 20 < paddlePlayer.x + paddlePlayer.width && ball.y > paddlePlayer.y && ball.y < paddlePlayer.y + paddlePlayer.height) {
      ball.x = paddlePlayer.x + paddlePlayer.width + 20;
      ball.xVelocity *= -1;
      createjs.Sound.play("hit");
    }

    // check if ball goes out of bounds
    if (ball.x < 0) {
      console.log('CPU scores!');
      cpuScore++;
      txtCPUScore.text = `CPU Score: ${cpuScore}`;
      resetBall();
    } else if (ball.x > canvas.width) {
      console.log('Player scores!');
      playerScore++;
      txtPlayerScore.text = `Player Score: ${playerScore}`;
      resetBall();
    }
  }

  // helper function to reset the ball
  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xVelocity = Math.random() > 0.5 ? 5 : -5;
    ball.yVelocity = Math.random() > 0.5 ? 5 : -5;
  }

  // helper function that wraps the draw.rect function for easy paddle making
  function createPaddle({
    width = 20,
    height = 100,
    x = 0,
    y = 0,
    color = "#CCC",
  } = {}) {
    const paddle = draw.rect(width, height, color);
    paddle.x = x;
    paddle.y = y;
    return paddle;
  }
})(window, window.createjs, window.opspark, window._);