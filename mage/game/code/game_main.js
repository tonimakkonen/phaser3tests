
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
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: 'gamediv',
    width: settingWidth,
    height: settingHeight
  },
};

// Game singletons

var gameSingleton = new Phaser.Game(config);
var gameMode = GAME_MODE_NONE;

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
var lastShot = 0; // TODO
var playerHealth = 100.0;

// TODO: Where do these need to be?
var uiHealthBar = null;


// Current map blueprint
// Used by editor or by
var mapBlueprint = null;

// Run local storage
storageLoad();

////////////////////////
// Phaser 3 functions //
////////////////////////

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
  this.physics.add.collider(groupBlocks, groupPickups);
  this.physics.add.collider(groupBlocks, groupPlayerShots, mainShotHitWall, null, this);
  this.physics.add.collider(groupBlocks, groupEnemyShots, mainShotHitWall, null, this);

  this.physics.add.overlap(groupPlayerShots, groupEnemies, mainShotHitEnemy, null, this);
  this.physics.add.overlap(groupEnemyShots, groupPlayer, mainShotHitPlayer, null, this);
  this.physics.add.overlap(groupPickups, groupPlayer, mainCollectedPickup, null, this);



  // TODO
  //var music = this.sound.add('test_music');
  //music.setLoop(true);
  //music.play();

}

function update() {

  // Update input
  // TODO: Does phaser have these in a better fashion?
  inputUpdate(this);

  var newMode = gameMode;
  if (gameMode == GAME_MODE_NONE) {
    newMode = GAME_MODE_MAIN_MENU;
  } else if (gameMode == GAME_MODE_MAIN_MENU) {
    newMode = stateHandleMainMenu(this);
  } else if (gameMode == GAME_MODE_PLAYING) {
    newMode = stateHandlePlay(this);
  } else if (gameMode == GAME_MODE_MAP_EDITOR) {
    newMode = stateHandleEditor(this);
  }

  // Change state
  if (newMode != gameMode) {
    gameMode = newMode;
    if (gameMode == GAME_MODE_MAIN_MENU) {
      stateStartMainMenu(this);
    } else if (gameMode == GAME_MODE_PLAYING) {
      stateStartPlay(this);
    } else if (gameMode == GAME_MODE_MAP_EDITOR) {
      stateStartEditor(this);
    }
  }

}

// Just use these function to relay messages to the right place

function mainShotHitEnemy(shot, enemy) {
  shotHitEnemy(this, shot, enemy);
}

function mainShotHitPlayer(shot, _pl) {
  shotHitPlayer(this, shot);
}

function mainShotHitWall(wall, shot) {
  shotHitWall(this, shot);
}

function mainCollectedPickup(pickup, _pl) {
  pickupCollect(this, pickup);
}
