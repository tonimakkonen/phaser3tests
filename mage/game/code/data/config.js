
"use strict";

//////////////////////////////////////////////////
// All the different types of graphic resources //
//////////////////////////////////////////////////

// Just one image
const GRAPH_TYPE_SINGLE = 1;

// Tiled sprite with 4 frames (2 left and 2 right)
// Creates 'left' and 'right' animations
// Requires sizeX and sizeY to be defined
const GRAPH_TYPE_LEFT_RIGHT = 2;

////////////////////
// All the graphs //
////////////////////


const GRAPH_PLAYER = 1;
const GRAPH_FOREST_MONSTER = 2;


var GRAPHS = new Map();

GRAPHS.set(
  GRAPH_PLAYER,
  {
    location: 'imgs/player.png',
    name: 'player',
    type: GRAPH_TYPE_SINGLE,
  }
);

GRAPHS.set(
  GRAPH_FOREST_MONSTER,
  {
    location: 'imgs/monsters/forest_monster.png',
    name: 'enemy_forest_monster',
    type: GRAPH_TYPE_LEFT_RIGHT,
    sizeX: 40,
    sizeY: 40
  }
);


///////////////////////////////
// All different enemy types //
///////////////////////////////


const ENEMY_FOREST_MONSTER  = 1;
const ENEMY_BURNING         = 2;
const ENEMY_ELECTRIC        = 3;


var ENEMIES = new Map();

ENEMIES.set(
  ENEMY_FOREST_MONSTER,
  {
    graph: GRAPH_FOREST_MONSTER
  }
);