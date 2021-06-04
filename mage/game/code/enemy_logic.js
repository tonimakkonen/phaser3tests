
"use strict";

function enemyCreate(game, enemyType, x, y) {

  var info = ENEMIES.get(enemyType);
  if (!info) throw 'Unknown enemy type: ' + enemyType;
  var graph = GRAPHS.get(info.graph);
  if (!graph) throw 'Unkown graph: ' + info.graph;

  var newEnemy = enemyGroup.create(x, y, graph.name);
  enemyList.push(newEnemy);

  // Add some variables
  newEnemy.xType = enemyType;
  newEnemy.xInfo = info;
  newEnemy.xGraph = graph;
  newEnemy.xHealth = info.health;

  newEnemy.setCollideWorldBounds(true);

  // Set properties based on movement modes
  if (info.moveBounce) {
    newEnemy.setBounce(0.4, 0.4);
  } else if (info.moveWalk) {
    console.log('created enemy with walk');
    newEnemy.setBounce(0.1, 0.1);
  } else if (info.moveFloat) {
    newEnemy.setBounce(0.8, 0.8);
  } else {
    throw 'No movement type defined: ' + info;
  }

}

function enemyHandleLogic(game, enemy) {

  // Towards player
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;

  // If too far away, just freeze enemies
  if (Math.abs(dx) > 80*16 || Math.abs(dy) > 80*16) {
    enemy.setGravity(0, 0);
    enemy.setVelocity(0, 0);
    return true;
  }

  if(enemy.xInfo.moveFloat) {
    enemyHandleFloatMove(game, enemy, enemy.xInfo.moveFloat, dx, dy);
  } else if (enemy.xInfo.moveBounce) {
    enemyHandleBounceMove(game, enemy, enemy.xInfo.moveBounce, dx, dy);
  } else if (enemy.xInfo.moveWalk) {
    enemyHandleWalkMove(game, enemy, enemy.xInfo.moveWalk, dx, dy);
  } else {
    throw 'no movement defined';
  }

  return true;
}

function enemyHandleFloatMove(game, enemy, move, dx, dy) {
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
}

function enemyHandleBounceMove(game, enemy, move, dx, dy) {
  // TODO:
  enemy.setGravity(0, 400);
}

function enemyHandleWalkMove(game, enemy, move, dx, dy) {
  // TODO:
  enemy.setGravity(dx > 0 ? 100 : -100, 400);
}
