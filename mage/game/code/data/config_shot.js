
"use strict";

const SHOT_WATER       = 1;
const SHOT_ELECTRIC    = 2;
const SHOT_FIRE        = 3;
const SHOT_TREE        = 4;
const SHOT_FIRE_STORM  = 5;
const SHOT_AIR_PUNCH   = 6;
const SHOT_ICE         = 7;
const SHOT_SMALL_WATER = 8;


var SHOTS = new Map();

SHOTS.set(
  SHOT_WATER,
  {
    graph: GRAPH_WATER_SHOT,
    damage: 10,
    type: MAGIC_TYPE_WATER,
    spawn: { type: SHOT_SMALL_WATER, amount: 4, velocity: 0.5},
    velocity: 500,
    grav: 1.0,
    punch: 0.3
  }
)

SHOTS.set(
  SHOT_SMALL_WATER,
  {
    graph: GRAPH_SMALL_WATER_SHOT,
    damage: 3,
    type: MAGIC_TYPE_WATER,
    velocity: 400,
    grav: 1.0
  }
)

SHOTS.set(
  SHOT_ICE,
  {
    graph: GRAPH_ICE_SHOT,
    damage: 25,
    type: MAGIC_TYPE_WATER,
    velocity: 600,
    grav: 0.2,
    freeze: 5000.0
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
    grav: 0.5,
    punch: 0.1
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
    duration: 2000,
    punch: 0.1
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
    spawn: { type: SHOT_FIRE, amount: 20, velocity: 0.5},
    punch: 0.2
  }
)

SHOTS.set(
  SHOT_AIR_PUNCH,
  {
    graph: GRAPH_AIR_PUNCH_SHOT,
    damage: 10,
    type: MAGIC_TYPE_AIR,
    velocity: 600,
    grav: 0.0,
    punch: 0.7
  }
)
