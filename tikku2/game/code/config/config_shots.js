
const SHOT_LASER = 1
const SHOT_SLIME = 2
const SHOT_FIRE = 3
const SHOT_FIRE_BALL = 4

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

configShots.set(
  SHOT_FIRE,
  {
    graph: 'shot_fire',
    damage: 3,
  }
)

configShots.set(
  SHOT_FIRE_BALL,
  {
    graph: 'shot_fire_ball',
    damage: 5,
    death: {
      spawn: {
        type: SHOT_FIRE,
        count: 6,
        speed: 300
      }
    }
  }
)
