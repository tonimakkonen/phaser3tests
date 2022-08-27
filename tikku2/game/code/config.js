
"use strict";

const CONFIG_WIDTH = 1200;
const CONFIG_HEIGHT = 800;

const GAME_STATE_MAIN_MENU = 1
const GAME_STATE_BLUE_BUY = 2
const GAME_STATE_RED_BUY = 3
const GAME_STATE_COMBAT = 4
const GAME_STATE_WIN = 5

const PLAYER_BLUE = 1
const PLAYER_RED = 2

const AI_HUMAN = 1;
const AI_NORMAL = 2;
const AI_DIFFICULT = 3;

const TEAM_HUMAN = 1;
const TEAM_BUG = 2;
const TEAM_ALIEN = 3;

const SHOT_LASER = 1
const SHOT_SLIME = 2

const UNIT_SOLDIER = 1
const UNIT_BUG = 2

var configTeams = new Map();

configTeams.set(
  TEAM_HUMAN,
  {}
)
configTeams.set(
  TEAM_BUG,
  {}
)
configTeams.set(
  TEAM_ALIEN,
  {}
)


var configShots = new Map();

configShots.set(
  SHOT_LASER,
  {
    graph: 'shot_laser',
    damage: 3,
  }
)

configShots.set(
  SHOT_SLIME,
  {
    graph: 'shot_slime',
    damage: 3,
  }
)

var configUnits = new Map();

configUnits.set(
  UNIT_SOLDIER,
  {
    graph: 'soldier',
    health: 5,
    velocity: 40,
    jump: {
      feetOnGround: true,
      time: 500,
      prob: 0.25,
      speed: 230
    },
    shoot: {
        type: SHOT_LASER,
        amin: 5,
        amax: 30,
        speed: 300,
        time: 900
    }
  }
);

configUnits.set(
  UNIT_BUG,
  {
    graph: 'bug',
    health: 2,
    velocity: 50,
    jump: {
      feetOnGround: false,
      time: 200,
      prob: 0.6,
      speed: 80
    },
    shoot: {
        type: SHOT_SLIME,
        amin: 30,
        amax: 45,
        speed: 100,
        time: 500
    }
  }
);
