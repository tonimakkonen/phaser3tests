
"use strict";

// Handle player movement

function playerHandleLogic(game, curTime) {

  if (player == null) return;

  var ld = inputA.isDown;
  var rd = inputD.isDown;
  var jump = inputSpace.isDown;
  var tdown = player.body.touching.down;

  var moveLeft = ld && !rd;
  var moveRight = rd && !ld;

  const vx = player.body.velocity.x;
  const vy = player.body.velocity.y;

  if (moveLeft && vx > -500) {
    player.setGravityX(-700 - 2.0*vx);
    //player.setVelocityX(-300);
  } else if (moveRight && vx < 500) {
    player.setGravityX(700 - 2.0*vx);
    //player.setVelocityX(300);
  } else {
    player.setGravityX(-2.0 * vx);
    //player.setVelocityX(0);
  }

  var grav = 400;

  if (jump && tdown) {
    player.setVelocityY(vy-240);
  }
  if (jump) {
    if (vy < -120) {
      grav = 100;
    } else {
      grav = 400;
    }

  }
  player.setGravityY(grav);

  // Shoot (move elsewhere)
  if (game.input.activePointer.leftButtonDown() && curTime - lastShot > 250) {
    shoot(game);
    lastShot = curTime;
  }


}

// TODO: move elsewhere
function shoot(game) {

  var dx = game.cameras.main.worldView.x + game.input.mousePointer.x - player.x;
  var dy = game.cameras.main.worldView.y + game.input.mousePointer.y - player.y;
  var len = Math.sqrt(dx*dx + dy*dy);
  dx = dx / len;
  dy = dy / len;


  var newShot = shotGroup.create(player.x, player.y, 'shot_ice');
  newShot.setVelocity(dx*500, dy*500);
  newShot.setBounce(0.8, 0.8);
  newShot.setGravity(0, 100);
}
