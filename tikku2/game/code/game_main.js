
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

var gameState = undefined;

var blueGold = undefined;
var redGold = undefined;
var blueTeam = undefined;
var redTeam = undefined;
var blueAi = undefined;
var redAi = undefined;

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

  groupBlocks = this.physics.add.staticGroup()

  groupBlueUnits = this.physics.add.group()
  groupRedUnits = this.physics.add.group()
  groupBlueShots = this.physics.add.group()
  groupRedShots = this.physics.add.group()

  this.physics.add.collider(groupBlueUnits, groupBlocks)
  this.physics.add.collider(groupRedUnits,  groupBlocks)
  this.physics.add.collider(groupBlueUnits, groupRedUnits)

  this.physics.add.overlap(groupBlueShots, groupRedUnits, callbackUnitHit, null, this)
  this.physics.add.overlap(groupRedShots, groupBlueUnits, callbackUnitHit, null, this)
  this.physics.add.overlap(groupBlueShots, groupBlocks, callbackShotHitGround, null, this)
  this.physics.add.overlap(groupRedShots, groupBlocks, callbackShotHitGround, null, this)

  // create tiles
  mapCreate(this)

}

function update() {

  if (!gameState) {
    gameState = GAME_STATE_MAIN_MENU
    modeMainMenuStart(this)
  } else if (gameState == GAME_STATE_MAIN_MENU) {
    modeMainMenuUpdate(this)
  } else {
    throw "Unkown game state: " + gameState
  }


  // Run unit AI
  groupBlueUnits.children.each(function(unit) { unitAi(unit, this) }, this)
  groupRedUnits.children.each(function(unit) { unitAi(unit, this) }, this)

}

function callbackUnitHit(shot, unit) {
  if (shot.x_alreadyDead) return
  if (unit.x_alreadyDead) return
  shotDestroy(shot, this)
  unitHit(unit, shot, this)
}

function callbackShotHitGround(shot, block) {
  shotDestroy(shot, this)
}
