(function(window, createjs) {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  createjs.Ticker.framerate = 60;

  const bg = new createjs.Shape();
  bg.graphics
    .beginFill("rgba(100, 6, 6, 1)")
    .drawCircle(250, 250, 250); 

  const eyeContainer = new createjs.Container(); 
  eyeContainer.x = 200;
  eyeContainer.y = 200;

  const leftEye = new createjs.Shape(); 
  const rightEye = new createjs.Shape();

  leftEye.graphics
    .beginFill("rgba(250, 162, 162, 1)")
    .drawRoundRect(-80, -10, 80, 20, 5); 

  rightEye.graphics
    .beginFill("rgba(250, 162, 162, 1)")
    .drawRoundRect(40, -10, 80, 20, 5); 

  eyeContainer.addChild(leftEye, rightEye);
  stage.addChild(bg, eyeContainer);

  stage.update();

  let tickHandler = createjs.Ticker.on("tick", onTick); 
  let blinkTimer = 0;
  let areEyesOpen = true;
  let leftEyeHeight = 20;
  let rightEyeHeight = 20;

  function onTick(event){
    update(event);
  }

  function update(event){
    blinkTimer++;

    if (areEyesOpen && blinkTimer > 120) {
      areEyesOpen = false;
      blinkTimer = 0;
    } else if (!areEyesOpen && blinkTimer > 15) {
      areEyesOpen = true;
      blinkTimer = 0;
    }

    if (areEyesOpen) {
      leftEyeHeight += 1;
      if (leftEyeHeight > 20) {
        leftEyeHeight = 20;
      }
      rightEyeHeight += 1;
      if (rightEyeHeight > 20) {
        rightEyeHeight = 20;
      }
    } else {
      leftEyeHeight -= 1;
      if (leftEyeHeight < 0) {
        leftEyeHeight = 0;
      }
      rightEyeHeight -= 1;
      if (rightEyeHeight < 0) {
        rightEyeHeight = 0;
      }
    }

    leftEye.graphics.clear();
    leftEye.graphics
      .beginFill("rgba(250, 162, 162, 1)")
      .drawRoundRect(-80, -10 + (20 - leftEyeHeight) / 2, 80, leftEyeHeight, 5); 

    rightEye.graphics.clear();
    rightEye.graphics
      .beginFill("rgba(250, 162, 162, 1)")
      .drawRoundRect(40, -10 + (20 - rightEyeHeight) / 2, 80, rightEyeHeight, 5); 

    stage.update();
  }

}(window, window.createjs));