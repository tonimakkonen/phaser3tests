
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
        console.error('bad player type');
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

  // handle shooting
}
