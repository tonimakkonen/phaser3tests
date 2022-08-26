
"use strict";

function unitCreate(type, xpos, ypos, player, game)
{

    var group;
    var graphName;
    var newUnit;

    if (player == PLAYER_BLUE) {
        group = groupBlueUnits;
        graphName = 'blue_';
    } else if (player == PLAYER_RED) {
        group = groupRedUnits;
        graphName = 'red_';
    } else {
        console.error('bad player: ' + player);
        return;
    }
    var props = configUnits.get(type);
    if (props == null) {
        console.error('Unknown unit type: ' + type);
        return;
    }
    graphName += props.graph;
    newUnit = group.create(xpos, ypos, graphName);
    newUnit.x_player = player;
    newUnit.x_type = type;
    newUnit.x_health = props.health;
    newUnit.x_lastShot = game.time.now;
    newUnit.x_lastJump = game.time.now;
    newUnit.x_props = props;
    if (props.building) {
        newUnit.setImmovable(true);
        newUnit.x_health_bar = game.add.rectangle(xpos, ypos-props.width/2, props.width*0.75, 2, 0x00ff00);
        newUnit.x_health_bar.alpha = 0.25;
        newUnit.x_health_bar.setDepth(1);
    } else {
          newUnit.setGravity(0, 300);
          newUnit.setBounce(0.2);
    }
    return newUnit;
}

function unitAi(unit, game) {
  var toEnemy = unit.x_player == PLAYER_BLUE ? 1 : -1;
  var props = unit.x_props;

  // handle movement and jumps only every 5 th tick so that it's less random
  unit.setVelocityX(toEnemy*props.velocity);

  unitHandleJump(unit, game);
  unitHandleShot(unit, game);
}

function unitHandleJump(unit, game) {
  var p = unit.x_props
  if (p.jump) {
    if (p.jump.feetOnGround && unit.body.touching.down || !p.jump.feetOnGround) {
      if (game.time.now > unit.x_lastJump + p.jump.time) {
        unit.x_lastJump = game.time.now
        if (Math.random() < p.jump.prob) {
          unit.setVelocityY(unit.body.velocity.y - p.jump.speed)
        }
      }
    }
  }
}

function unitHandleShot(unit, game) {
  var toEnemy = unit.x_player == PLAYER_BLUE ? 1 : -1;
  var props = unit.x_props;
  if (props.shoot) {
    var shoot = props.shoot;
    if (game.time.now > unit.x_lastShot + shoot.time) {
      unit.x_lastShot = game.time.now;
      var vel = shoot.speed
      var a = Math.PI * (shoot.amin + Math.random()*(shoot.amax - shoot.amin))/180.0
      var vx = toEnemy * Math.cos(a) * vel
      var vy = -Math.sin(a) * vel
      shotCreate(shoot.type, unit.x, unit.y, vx + unit.body.velocity.x, vy + unit.body.velocity.y, unit.x_player, game)
    }
  }
}

function unitHit(unit, shot, game) {
  unit.x_health -= shot.x_props.damage
  if (unit.x_health <= 0) {
    unitDestroy(unit, game)
  }
}

function unitDestroy(unit, game) {
  if (unit.x_alreadyDead) return
  unit.x_alreadyDead = true
  unit.destroy()
}
