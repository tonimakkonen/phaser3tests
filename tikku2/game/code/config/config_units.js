
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

const UNIT_FACTORY = 15
const UNIT_BUGGY = 16

const UNIT_BURROW = 17
const UNIT_CRAWLER = 18
const UNIT_FIRE_BURROW = 19
const UNIT_FIRE_LARVA = 20

const UNIT_SPIDER_ASSEMBLY = 21
const UNIT_FIRE_SPIDER = 22

const UNIT_FIRE_SPITTER = 23


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
    },
    death: {
      splatter: {
        graph: 'splatter_red',
        count: 4,
        speed: 100,
        time: 400
      }
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
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 4,
        speed: 100,
        time: 200
      }
    }
  }
)

configUnits.set(
  UNIT_ALIEN,
  {
    graph: 'alien',
    health: 9,
    velocity: 50,
    mass: 1.5,
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
    help: 'Build Outpost: trains soldiers',
    health: 40,
    building: true,
    width: 40,
    cost: 150,
    spawn: {
      unit: UNIT_SOLDIER,
      time: 8000
    },
    death: {
      splatter: {
        graph: 'splatter_metal',
        count: 6,
        speed: 200,
        time: 1500
      }
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
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 6,
        speed: 200,
        time: 1500
      }
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
    },
    death: {
      splatter: {
        graph: 'splatter_metal',
        count: 6,
        speed: 200,
        time: 1500
      }
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
      },
      splatter: {
        graph: 'splatter_green',
        count: 6,
        speed: 200,
        time: 1500
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

configUnits.set(
  UNIT_FACTORY,
  {
    graph: 'factory',
    name: 'Factory',
    help: 'Build Factory: creates attack buggys',
    health: 40,
    building: true,
    width: 40,
    cost: 350,
    spawn: {
      unit: UNIT_BUGGY,
      time: 11000
    },
    death: {
      splatter: {
        graph: 'splatter_metal',
        count: 6,
        speed: 200,
        time: 1500
      }
    }
  }
)

configUnits.set(
  UNIT_BUGGY,
  {
    graph: 'buggy',
    health: 9,
    velocity: 70,
    mass: 2,
    height: 30,
    shoot: {
        type: SHOT_LASER,
        amin: 5,
        amax: 45,
        speed: 300,
        time: 1100
    },
    death: {
      spawn: {
        type: UNIT_SOLDIER,
        count: 1
      },
      splatter: {
        graph: 'splatter_metal',
        count: 3,
        speed: 100,
        time: 400
      }
    }
  }
)

configUnits.set(
  UNIT_BURROW,
  {
    graph: 'burrow',
    name: 'Burrow',
    help: 'Mutate Burrow: spawn crawlers',
    health: 40,
    heal: 10,
    building: true,
    width: 40,
    cost: 340,
    spawn: {
      unit: UNIT_CRAWLER,
      time: 11000
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 6,
        speed: 200,
        time: 1500
      }
    }
  }
)

configUnits.set(
  UNIT_CRAWLER,
  {
    graph: 'crawler',
    health: 30,
    velocity: 50,
    mass: 2,
    shoot: {
        type: SHOT_SLIME,
        amin: 2,
        amax: 30,
        speed: 300,
        time: 800
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 4,
        speed: 150,
        time: 400
      }
    }
  }
)

configUnits.set(
  UNIT_FIRE_BURROW,
  {
    graph: 'fire_burrow',
    name: 'Fire Burrow',
    help: 'Mutate Fire Burrow: spawn fire larvas',
    health: 40,
    heal: 10,
    building: true,
    width: 40,
    cost: 400,
    spawn: {
      unit: UNIT_FIRE_LARVA,
      time: 13000
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 6,
        speed: 200,
        time: 1500
      }
    }
  }
)

configUnits.set(
  UNIT_FIRE_LARVA,
  {
    graph: 'fire_larva',
    health: 8,
    velocity: 40,
    mass: 2,
    shoot: {
        type: SHOT_FIRE_BALL,
        amin: 30,
        amax: 60,
        speed: 380,
        time: 2500
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 4,
        speed: 150,
        time: 400
      }
    }
  }
)

configUnits.set(
  UNIT_SPIDER_ASSEMBLY,
  {
    graph: 'spider_assembly',
    name: 'Spider Assembly',
    help: 'Construct Spider Assembly: creates fire spiders',
    health: 40,
    heal: 10,
    building: true,
    width: 40,
    cost: 300,
    spawn: {
      unit: UNIT_FIRE_SPIDER,
      time: 4500
    }
  }
)

configUnits.set(
  UNIT_FIRE_SPIDER,
  {
    graph: 'fire_spider',
    health: 3,
    velocity: 40,
    shoot: {
        type: SHOT_FIRE,
        amin: 0,
        amax: 45,
        speed: 200,
        time: 1000
    },
    jump: {
      feetOnGround: true,
      time: 500,
      prob: 0.2,
      speed: 350
    },
    death: {
      splatter: {
        graph: 'splatter_metal',
        count: 2,
        speed: 100,
        time: 200
      }
    }
  }
)

configUnits.set(
  UNIT_FIRE_SPITTER,
  {
    graph: 'fire_spitter',
    name: 'Fire Spitter',
    help: 'Mutate Fire Spitter: AA and artillery role',
    health: 60,
    building: true,
    width: 40,
    cost: 200,
    shoot: {
        type: SHOT_FIRE,
        amin: 30,
        amax: 60,
        speed: 400,
        time: 1200
    },
    death: {
      splatter: {
        graph: 'splatter_green',
        count: 6,
        speed: 200,
        time: 1500
      }
    }
  }
)
