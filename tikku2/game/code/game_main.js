
"use strict";

// Phaser3 game config
var config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 800,
  parent: 'gamediv',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: 'gamediv',
    width: 1600,
    height: 800
  },
};

var gameSingleton = new Phaser.Game(config);

var groupBlocks;
var groupBlueUnits;
var groupRedUnits;
var groupBlueShots;
var groupRedShots;

////////////////////////
// Phaser 3 functions //
////////////////////////

function preload() {
  resLoadResources(this);

}

function create() {

  groupBlocks = this.physics.add.staticGroup();

  groupBlueUnits = this.physics.add.group();
  groupRedUnits = this.physics.add.group();
  groupBlueShots = this.physics.add.group();
  groupRedShots = this.physics.add.group();

  this.physics.add.collider(groupBlueUnits, groupBlocks);
  this.physics.add.collider(groupRedUnits,  groupBlocks);
  this.physics.add.collider(groupBlueUnits, groupRedUnits);

  this.physics.add.overlap(groupBlueShots, groupRedUnits, callbackUnitHit, null, this);
  this.physics.add.overlap(groupRedShots, groupBlueUnits, callbackUnitHit, null, this);
  this.physics.add.overlap(groupBlueShots, groupBlocks, callbackShotHitGround, null, this);
  this.physics.add.overlap(groupRedShots, groupBlocks, callbackShotHitGround, null, this);

  // create tiles
  for (var i = 0; i < 1600/40; i++) {
      groupBlocks.create(i*40 + 20, 800-20, 'tile');
  }

}

var debugLastSpawn = 0;

function update() {

  // TODO: Just dummy unit creation
  if (this.input.mousePointer.isDown) {
    if (this.time.now > debugLastSpawn + 100) {
      debugLastSpawn = this.time.now;
      var mx = this.input.mousePointer.x;
      var my = this.input.mousePointer.y;
      if (mx < 800) {
        unitCreate(UNIT_SOLDIER, mx, my, PLAYER_BLUE, this)
      } else {
        unitCreate(UNIT_SOLDIER, mx, my, PLAYER_RED, this)
      }
    }
  }

  // Run unit AI
  groupBlueUnits.children.each(function(unit) { unitAi(unit, this) }, this);
  groupRedUnits.children.each(function(unit) { unitAi(unit, this) }, this);

}

function callbackUnitHit(shot, unit) {

}

function callbackShotHitGround(shot, block) {

}
