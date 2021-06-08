
"use strict";

// Phaser3 game config
var config = {
  type: Phaser.AUTO,
  width: settingWidth,
  height: settingHeight,
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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'gamediv',
    width: settingWidth,
    height: settingHeight
  },
};

// Game singletons

var gameSingleton = new Phaser.Game(config);
var gameMode = GAME_MODE_PLAYING;

var groupBlocks;
var groupPlayer;
var groupEnemies;
var groupPlayerShots;
var groupEnemyShots;
var groupPickups;
var listMapObjects = []; // All the current map objects to be deleted..
var listEnemies = []; // List of all enemies


// TODO: Think about player properties
var player = null;
var lastShot = 0;


function preload() {
  resLoadResources(this);
}

function create() {

  resCreateAnimations(this);
  inputInitialize(this);

  // Set up phaser3 wiring
  groupBlocks = this.physics.add.staticGroup();
  groupPlayer = this.physics.add.group();
  groupEnemies = this.physics.add.group();
  groupPlayerShots = this.physics.add.group();
  groupEnemyShots = this.physics.add.group();
  groupPickups = this.physics.add.group();

  this.physics.add.collider(groupBlocks, groupPlayer);
  this.physics.add.collider(groupBlocks, groupEnemies);

  // TODO: Add callbacks
  this.physics.add.collider(groupBlocks, groupPlayerShots, mainShotHitWall, null, this);
  this.physics.add.collider(groupBlocks, groupEnemyShots, mainShotHitWall, null, this);

  this.physics.add.overlap(groupPlayerShots, groupEnemies, mainShotHitEnemy, null, this);
  this.physics.add.overlap(groupEnemyShots, groupPlayer, mainShotHitPlayer, null, this);

  // Create a dummy map
  var map = mapCreateDummy();
  mapInitialize(this, map);

}

function update() {

  var curTime = this.time.now;

  if (gameMode == GAME_MODE_MAIN_MENU) {
    stateHandleMainMenu(this, curTime);
  } else if (gameMode == GAME_MODE_PLAYING) {
    stateHandlePlay(this, curTime);
  } else if (gameMode == GAME_MODE_MAP_EDITOR) {
    stateHandleEditor(this, curTime);
  }

}

// Just use these function to relay messages to the right place
function mainShotHitEnemy(shot, enemy) {
  shotHitEnemy(this, shot, enemy);
}

function mainShotHitPlayer(shot, pl) {
  shotHitPlayer(this, shot);
}

function mainShotHitWall(wall, shot) {
  shotHitWall(this, shot);
}
