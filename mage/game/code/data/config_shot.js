
"use strict";

const SHOT_ICE        = 1;
const SHOT_ELECTRIC   = 2;
const SHOT_FIRE       = 3;
const SHOT_TREE       = 4;
const SHOT_FIRE_STORM = 5;


var SHOTS = new Map();

// TODO: Gravity and velocity

SHOTS.set(
  SHOT_ICE,
  {
    graph: GRAPH_ICE_SHOT,
    damage: 10,
    type: MAGIC_TYPE_WATER,
    velocity: 400,
    grav: 1.0
  }
)

SHOTS.set(
  SHOT_ELECTRIC,
  {
    graph: GRAPH_ELECTRIC_SHOT,
    damage: 20,
    type: MAGIC_TYPE_AIR,
    velocity: 600,
    grav: 0.0,
    bounce: { count: 5, amount: 0.9 }
  }
)

SHOTS.set(
  SHOT_FIRE,
  {
    graph: GRAPH_FIRE_SHOT,
    damage: 20,
    type: MAGIC_TYPE_FIRE,
    velocity: 600,
    grav: 0.5
  }
)

SHOTS.set(
  SHOT_TREE,
  {
    graph: GRAPH_TREE_SHOT,
    damage: 25,
    type: MAGIC_TYPE_EARTH,
    velocity: 250,
    grav: 0.8,
    duration: 2000
  }
)

SHOTS.set(
  SHOT_FIRE_STORM,
  {
    graph: GRAPH_FIRE_STORM_SHOT,
    damage: 25,
    type: MAGIC_TYPE_FIRE,
    velocity: 400,
    grav: 0.5,
    spawn: { type: SHOT_FIRE, amount: 20, velocity: 0.5}
  }
)
