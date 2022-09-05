
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
      UNIT_OUTPOST
    ]
  }
)
configRaces.set(
  RACE_BUG,
  {
    base: UNIT_BUG_BASE,
    build: [
      UNIT_HATCHERY
    ]
  }
)
configRaces.set(
  RACE_ALIEN,
  {
    base: UNIT_ALIEN_BASE,
    build: [
    ]
  }
)
