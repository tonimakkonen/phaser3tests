
"use strict";

const RACE_HUMAN = 1
const RACE_BUG = 2
const RACE_ALIEN = 3

var configRaces = new Map();

configRaces.set(
  RACE_HUMAN,
  {
    base: UNIT_HUMAN_BASE,
    build: [UNIT_OUTPOST, UNIT_FORT, UNIT_FACTORY, UNIT_ASSEMBLY, UNIT_FIGHTER_BASE],
    roleProtected: [UNIT_OUTPOST, UNIT_FACTORY, UNIT_ASSEMBLY, UNIT_FIGHTER_BASE],
    roleMiddle: [UNIT_FORT, UNIT_OUTPOST, UNIT_FACTORY, UNIT_ASSEMBLY],
    roleEdge: [UNIT_FORT],
    roleUpperEdge: [UNIT_FORT],
    roleUpper: [UNIT_OUTPOST, UNIT_FACTORY, UNIT_ASSEMBLY, UNIT_FIGHTER_BASE],
    roleFront: [UNIT_FORT, UNIT_OUTPOST, UNIT_FACTORY, UNIT_ASSEMBLY],
    gameWinners: [UNIT_FACTORY, UNIT_ASSEMBLY]
  }
)
configRaces.set(
  RACE_BUG,
  {
    base: UNIT_BUG_BASE,
    build: [UNIT_HATCHERY, UNIT_BUG_WALL, UNIT_FIRE_SPITTER, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST, UNIT_DRAGONBUG_NEST],
    roleProtected: [UNIT_HATCHERY, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST, UNIT_DRAGONBUG_NEST],
    roleMiddle: [UNIT_HATCHERY, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST],
    roleEdge: [UNIT_BUG_WALL],
    roleUpperEdge: [UNIT_BUG_WALL, UNIT_FIRE_SPITTER],
    roleUpper: [UNIT_HATCHERY, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST, UNIT_FIRE_SPITTER, UNIT_DRAGONBUG_NEST],
    roleFront: [UNIT_HATCHERY, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST, UNIT_FIRE_SPITTER],
    gameWinners: [UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_DRAGONBUG_NEST]
  }
)
configRaces.set(
  RACE_ALIEN,
  {
    base: UNIT_ALIEN_BASE,
    build: [UNIT_MONUMENT, UNIT_FF_GENERATOR, UNIT_SPIDER_ASSEMBLY, UNIT_WATCHER],
    roleProtected: [UNIT_MONUMENT, UNIT_SPIDER_ASSEMBLY],
    roleMiddle: [UNIT_MONUMENT, UNIT_SPIDER_ASSEMBLY, UNIT_FF_GENERATOR],
    roleEdge: [UNIT_MONUMENT],
    roleUpperEdge: [UNIT_MONUMENT, UNIT_WATCHER],
    roleUpper: [UNIT_MONUMENT, UNIT_SPIDER_ASSEMBLY, UNIT_WATCHER, UNIT_FF_GENERATOR],
    roleFront: [UNIT_WATCHER],
    gameWinners: [UNIT_MONUMENT]
  }
)
