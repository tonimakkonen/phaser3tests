
"use strict";

function enemyHandleLogic(game, enemy) {

  // Just do some logic for now. Gravitate enemies towards player
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const dl = Math.sqrt(dx*dx + dy*dy);
  const dx1 = dx / dl;
  const dy1 = dy / dl;

  const vx = enemy.body.velocity.x;
  const vy = enemy.body.velocity.y;
  const v = Math.sqrt(vx*vx + vy*vy);

  var desireX = 0.0;
  var desireY = 0.0;

  if (dl < 160) {
    desireX = -100.0 * dx1;
    desireY = -100.0 * dy1;
  } else if (dl < 220) {
    // we are ok being at zero here
  } else if (dl < 80*15) {
    desireX = 80.0 * dx1;
    desireY = 80.0 * dy1;
  }

  enemy.setGravity(desireX - 1 * vx, desireY - 1 * vy);

  return true;
}
