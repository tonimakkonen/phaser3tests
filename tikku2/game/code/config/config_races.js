
"use strict";

const RACE_HUMAN = 1
const RACE_BUG = 2
const RACE_ALIEN = 3

var configRaces = new Map();

configRaces.set(
  RACE_HUMAN,
  {
    base: UNIT_HUMAN_BASE,
    build: [
      UNIT_OUTPOST, UNIT_FORT, UNIT_FACTORY, UNIT_ASSEMBLY
    ]
  }
)
configRaces.set(
  RACE_BUG,
  {
    base: UNIT_BUG_BASE,
    build: [
      UNIT_HATCHERY, UNIT_BUG_WALL, UNIT_FIRE_SPITTER, UNIT_BURROW, UNIT_FIRE_BURROW, UNIT_FLYER_NEST
    ]
  }
)
configRaces.set(
  RACE_ALIEN,
  {
    base: UNIT_ALIEN_BASE,
    build: [
      UNIT_MONUMENT, UNIT_FF_GENERATOR, UNIT_SPIDER_ASSEMBLY, UNIT_WATCHER
    ]
  }
)
