
"use strict";


const UNIT_HUMAN_BASE = 1
const UNIT_BUG_BASE = 2
const UNIT_ALIEN_BASE = 3

const UNIT_SOLDIER = 4
const UNIT_BUG = 5
const UNIT_ALIEN = 6

const UNIT_OUTPOST = 7
const UNIT_HATCHERY = 8
const UNIT_MONUMENT = 10

const UNIT_FORT = 11
const UNIT_BUG_WALL = 12
const UNIT_FF_GENERATOR = 13
const UNIT_FF = 14


///////////
// UNITS //
///////////

var configUnits = new Map();

configUnits.set(
  UNIT_HUMAN_BASE,
  {
    graph: 'human_base',
    name: 'Human base',
    base: true,
    building: true,
    width: 80,
    health: 250,
    spawn: {
      unit: UNIT_SOLDIER,
      time: 5000
    }
  }
)

configUnits.set(
  UNIT_BUG_BASE,
  {
    graph: 'bug_base',
    name: 'Bug base',
    base: true,
    building: true,
    width: 80,
    health: 250,
    heal: 25,
    spawn: {
      unit: UNIT_BUG,
      time: 4000
    }
  }
)

configUnits.set(
  UNIT_ALIEN_BASE,
  {
    graph: 'alien_base',
    name: 'Alien base',
    base: true,
    building: true,
    width: 80,
    health: 400,
    spawn: {
      unit: UNIT_ALIEN,
      time: 9000
    }
  }
)

configUnits.set(
  UNIT_SOLDIER,
  {
    graph: 'soldier',
    health: 5,
    velocity: 60,
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
        speed: 200,
        time: 900
    }
  }
)

configUnits.set(
  UNIT_BUG,
  {
    graph: 'bug',
    health: 3,
    velocity: 70,
    jump: {
      feetOnGround: false,
      time: 200,
      prob: 0.65,
      speed: 80,
      below: CONFIG_BLOCK*2
    },
    shoot: {
        type: SHOT_SLIME,
        amin: 30,
        amax: 45,
        speed: 150,
        time: 1100
    }
  }
)

configUnits.set(
  UNIT_ALIEN,
  {
    graph: 'alien',
    health: 9,
    velocity: 50,
    shoot: {
        type: SHOT_LASER,
        amin: 5,
        amax: 45,
        speed: 250,
        time: 900
    }
  }
)

configUnits.set(
  UNIT_OUTPOST,
  {
    graph: 'outpost',
    name: 'Outpost',
    help: 'Build Outpost: spawns soldiers',
    health: 40,
    building: true,
    width: 40,
    cost: 150,
    spawn: {
      unit: UNIT_SOLDIER,
      time: 8000
    }
  }
)

configUnits.set(
  UNIT_HATCHERY,
  {
    graph: 'hatchery',
    name: 'Hatchery',
    help: 'Mutate Hatchery: spawns bugs',
    health: 40,
    building: true,
    width: 40,
    cost: 120,
    heal: 10,
    spawn: {
      unit: UNIT_BUG,
      time: 6000
    }
  }
)

configUnits.set(
  UNIT_MONUMENT,
  {
    graph: 'monument',
    name: 'Monument',
    help: 'Construct Monument: summons aliens',
    health: 60,
    building: true,
    width: 40,
    cost: 200,
    spawn: {
      unit: UNIT_ALIEN,
      time: 9000
    }
  }
)

configUnits.set(
  UNIT_FORT,
  {
    graph: 'Fort',
    name: 'Fort',
    help: 'Build Fort: strong defensive structure',
    health: 100,
    building: true,
    width: 40,
    cost: 100,
    shoot: {
        type: SHOT_LASER,
        amin: 5,
        amax: 45,
        speed: 300,
        time: 700
    }
  }
)

configUnits.set(
  UNIT_BUG_WALL,
  {
    graph: 'bug_wall',
    name: 'Bug wall',
    help: 'Mutate Bug Wall: releases bugs when breached',
    health: 50,
    building: true,
    width: 40,
    cost: 60,
    heal: 10,
    death: {
      spawn: {
        type: UNIT_BUG,
        count: 5
      }
    }
  }
)

configUnits.set(
  UNIT_FF_GENERATOR,
  {
    graph: 'ff_generator',
    name: 'Forcefield Generator',
    help: 'Construct Forcefield Generator: defences a large area',
    health: 20,
    building: true,
    width: 40,
    cost: 200,
    spawn: {
      unit: UNIT_FF,
      time: 0,
      radius: CONFIG_BLOCK*4,
      count: 30,
      maxTimes: 1
    }
  }
)

configUnits.set(
  UNIT_FF,
  {
    graph: 'ff',
    health: 6,
    immovable: true
  }
)
