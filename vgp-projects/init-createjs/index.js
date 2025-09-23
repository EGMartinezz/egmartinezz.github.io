(function(window, createjs) {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  createjs.Ticker.framerate = 60;

  const bg = new createjs.Shape();
  bg.graphics
    .beginFill("rgba(100, 6, 6, 1)")
    .drawCircle(250, 250, 250); 

  const faceContainer = new createjs.Container(); 
  faceContainer.x = 0;
  faceContainer.y = 0;

  const leftEye = new createjs.Shape(); 
  const rightEye = new createjs.Shape();
  const mouth = new createjs.Shape();

  leftEye.graphics
    .beginFill("rgba(250, 162, 162, 1)")
    .drawRoundRect(120, 140, 80, 20, 5); 

  rightEye.graphics
    .beginFill("rgba(250, 162, 162, 1)")
    .drawRoundRect(300, 140, 80, 20, 5); 

  stage.addChild(bg, leftEye, rightEye, mouth);

  stage.update();

  let tickHandler = createjs.Ticker.on("tick", onTick); 
  let blinkTimer = 0;
  let areEyesOpen = true;
  let leftEyeHeight = 20;
  let rightEyeHeight = 20;
  let lookX = 0;
  let lookY = 0;
  let targetX = 0;
  let targetY = 0;

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

    lookX += (targetX - lookX) / 10;
    lookY += (targetY - lookY) / 10;

    if (Math.random() < 0.01) {
      targetX = Math.random() * 100 - 50;
      targetY = Math.random() * 50 - 25;
    }

    leftEye.graphics.clear();
    leftEye.graphics
      .beginFill("rgba(250, 162, 162, 1)")
      .drawRoundRect(120 + lookX / 5, 140 + lookY / 5 + (20 - leftEyeHeight) / 2, 80, leftEyeHeight, 5); 

    rightEye.graphics.clear();
    rightEye.graphics
      .beginFill("rgba(250, 162, 162, 1)")
      .drawRoundRect(300 + lookX / 5, 140 + lookY / 5 + (20 - rightEyeHeight) / 2, 80, rightEyeHeight, 5); 

    mouth.graphics.clear();
    mouth.graphics
      .beginFill("rgba(250, 162, 162, 1)")
      .drawRoundRect(200 + lookX / 5, 230 + lookY / 5, 80, 10, 5)
      .moveTo(200 + lookX / 5, 240 + lookY / 5)
      .curveTo(240 + lookX / 5, 250 + lookY / 5, 280 + lookX / 5, 240 + lookY / 5);

      bg.graphics.clear();
      bg.graphics
      .beginFill("rgba(100, 6, 6, 1)")
      .drawCircle(250 + lookX, 250 + lookY, 250);
      
    stage.update();
  }

}(window, window.createjs)); 