
"use strict";

function enemyCreate(game, enemyType, x, y) {

  var info = ENEMIES.get(enemyType);
  if (!info) throw 'Unknown enemy type: ' + enemyType;
  var graph = GRAPHS.get(info.graph);
  if (!graph) throw 'Unkown graph: ' + info.graph;

  var newEnemy = groupEnemies.create(x, y, graph.name);
  listEnemies.push(newEnemy);
  newEnemy.setDepth(Z_ACTION);

  // Add some variables
  newEnemy.xType = enemyType;
  newEnemy.xInfo = info;
  newEnemy.xGraph = graph;
  newEnemy.xHealth = info.health;
  newEnemy.xRandom = Math.random(); // E.g. sway effects and such
  newEnemy.xLastJump = 0;
  newEnemy.xLastShot1 = 0.0;
  newEnemy.xLastShot2 = 0.0;


  newEnemy.setCollideWorldBounds(true);

  // Set properties based on movement modes
  if (info.moveBounce) {
    newEnemy.setBounce(0.4, 0.4);
  } else if (info.moveWalk) {
    newEnemy.setBounce(0.1, 0.1);
  } else if (info.moveFloat) {
    newEnemy.setBounce(0.8, 0.8);
  } else {
    throw 'No movement type defined: ' + info;
  }

  // For any constant animations, just set it playing here
  // Other enemies change their animation based on behaviour
  if (graph.type == GRAPH_TYPE_ANIM_3) {
    newEnemy.anims.play(graph.name + '_anim');
  }

}

function enemyHandleLogic(game, enemy, curTime) {

  if (enemy.xHealth <= 0.0) {
    console.log('killed enemy');
    return false; // Kill this enemy
  }

  // TODO: Do better
  if (player == null) {
    return true;
  }

  // Towards player
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  var len = Math.sqrt(dx*dx + dy*dy);
  if (len == 0) len = 1.0; // NaN guard
  const dx1 = dx / len;
  const dy1 = dy / len;

  // If too far away, just freeze enemies
  if (Math.abs(dx) > 80*16 || Math.abs(dy) > 80*9) {
    enemy.setGravity(0, 0);
    enemy.setVelocity(0, 0);
    return true;
  }

  // Handle different movement modes
  if(enemy.xInfo.moveFloat) {
    enemyHandleFloatMove(game, enemy, curTime, enemy.xInfo.moveFloat, dx, dy);
  }
  if (enemy.xInfo.moveBounce) {
    enemyHandleBounceMove(game, enemy, enemy.xInfo.moveBounce, dx, dy);
  }
  if (enemy.xInfo.moveWalk) {
    enemyHandleWalkMove(game, enemy, enemy.xInfo.moveWalk, dx, dy);
  }
  if (enemy.xInfo.moveJump) {
    enemyHandleJump(game, enemy, enemy.xInfo.moveJump, dx, dy);
  }

  // Handle firing
  if (enemy.xInfo.shoot1) enemyHandleShot(game, enemy, enemy.xInfo.shoot1, 1, dx1, dy1);
  if (enemy.xInfo.shoot2) enemyHandleShot(game, enemy, enemy.xInfo.shoot2, 2, dx1, dy1);


  return true;
}

function enemyHandleFloatMove(game, enemy, curTime, move, dx, dy) {

  const acc = move.maxSpeed * move.alpha;

  const dl = Math.sqrt(dx*dx + dy*dy);
  if (dl < 0.001) dl = 1; // NaN guard
  const dx1 = dx / dl;
  const dy1 = dy / dl;
  const vx = enemy.body.velocity.x;
  const vy = enemy.body.velocity.y;

  var desireX = 0.0;
  var desireY = 0.0;

  if (move.above) {
    if (dy < move.minDistance) {
      desireY = -acc;
    } else if (dy > move.maxDistance) {
      desireY = acc;
    }
    if (dx < -move.margin) {
      desireX = -acc;
    } else if (dx > move.margin) {
      desireX = acc;
    }
  } else if (move.towards) {
    if (dl < move.minDistance) {
      desireX = -acc * dx1;
      desireY = -acc * dy1;
    } else if (dl > move.maxDistance) {
      desireX = acc * dx1;
      desireY = acc * dy1;
    }
  } else {
    throw 'No float mode defined: ' + move;
  }

  desireX += move.sway * acc * Math.cos(3.14 * (curTime / 1000.0 + enemy.xRandom));
  desireY += move.sway * acc * Math.sin(3.14 * (curTime / 1000.0 + enemy.xRandom));



  enemy.setGravity(desireX - move.alpha * vx, desireY - move.alpha * vy);
}

function enemyHandleBounceMove(game, enemy, move, dx, dy) {
  // TODO:
  enemy.setGravity(0, 400);
}

function enemyHandleWalkMove(game, enemy, move, dx, dy) {
  // TODO:
  enemy.setGravity(dx > 0 ? 100 : -100, 400);
}

// Handle jump
function enemyHandleJump(game, enemy, move, dx, dy) {
  if (dy < 0 && enemy.body.blocked.down && game.time.now - enemy.xLastJump > move.delay) { // only jump if above
    enemy.setVelocityY(-move.velocity);
    enemy.xLastJump = game.time.now;
  }
}

function enemyDealDamage(game, enemy, amount, type) {

}

function enemyHandleShot(game, enemy, info, type, dx1, dy1) {
  var last = type == 1 ? enemy.xLastShot1 : enemy.xLastShot2;
  const now = game.time.now;
  if (now >= last + info.time) {
    shotShoot(game, false, info.type, enemy.x, enemy.y, dx1, dy1);
    type == 1 ? enemy.xLastShot1 = now : enemy.xLastShot2 = now;
  }
}
