
"use strict";

const PLAYER_BLUE = 1;
const PLAYER_RED = 2;


const UNIT_SOLDIER = 1;

var configUnits = new Map();

configUnits.set(
  UNIT_SOLDIER,
  {
    graph: 'soldier',
    health: 5,
    velocity: 100,
    }
);
