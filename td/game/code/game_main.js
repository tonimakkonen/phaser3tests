
"use strict"

// Phaser3 game config
var config = {
  type: Phaser.AUTO,
  width: CONFIG_WIDTH,
  height: CONFIG_HEIGHT,
  parent: 'gamediv',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: 'gamediv',
    width: CONFIG_WIDTH,
    height: CONFIG_HEIGHT
  },
}

var gameSingleton = new Phaser.Game(config);

var test = null

function preload() {
  resLoad(this)
}

function create() {

  // Add path
  for (var dist = 0; dist < PATH_TOTAL_DIST; dist += 50) {
    const p = pathGetSmooth(dist)
    this.add.sprite(p.x, p.y, 'dot')
  }

  const p0 = pathGetExact(0)
  test = this.add.sprite(p0.x, p0.y, 'TODO')
}

function update() {

  const dist = 100 * this.time.now / 1000
  const p = pathGetSmooth(dist)
  test.setPosition(p.x, p.y)
}
