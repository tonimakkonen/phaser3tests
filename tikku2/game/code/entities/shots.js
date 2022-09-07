
"use strict";

function shotCreate(type, xpos, ypos, xvel, yvel, player, game) {

  var group
  var newShot

  if (player == PLAYER_BLUE) group = groupBlueShots
  else if (player == PLAYER_RED) group = groupRedShots
  else throw "bad player: " + player

  var props = configShots.get(type);
  if (props == null) throw "bad shot type: " + type

  newShot = group.create(xpos, ypos, props.graph)
  if (props.leftRight && xvel < 0) newShot.setFlipX(true)
  newShot.x_props = props
  newShot.x_player = player
  newShot.setVelocity(xvel, yvel)
  newShot.setGravity(0, 300)
  return newShot
}

function shotDestroy(shot, game) {
  if (shot.x_alreadyDead) return
  shot.x_alreadyDead = true

  const p = shot.x_props
  if (p.death) {
    const d = p.death
    if (d.spawn) {
      for (var i = 0; i < d.spawn.count; i++) {
        const vx = d.spawn.speed * Math.cos(Math.random()*Math.PI*2)
        const vy = d.spawn.speed * Math.sin(Math.random()*Math.PI*2)
        shotCreate(d.spawn.type, shot.x, shot.y, vx, vy, shot.x_player, game)
      }
    }
  }

  shotRelease(shot)
}

function shotRelease(shot) {
  shot.destroy()
}

function shotHandleDef(def, x, y, player, game) {
  for (var i = 0; i < def.count; i++) {
    const ra = Math.random()*Math.PI*2
    const vx = def.speed * Math.cos(ra)
    const vy = def.speed * Math.sin(ra)
    shotCreate(def.type, x, y, vx, vy, player, game)
  }
}

function shotAi(shot, game) {
  if (shot.x_alreadyDead) return
  if (shot.x < 0 || shot.x > CONFIG_WIDTH) shot.destroy()
}
