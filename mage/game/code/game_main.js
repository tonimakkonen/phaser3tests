
"use strict";

// Typical HD (720p) resolution. Should work on most devices
var setting_width = 1280;
var setting_height = 720;

var config = {
  type: Phaser.AUTO,
  width: setting_width,
  height: setting_height,
  parent: 'gamediv',
  physics: {
    default: 'arcade',
    arcade: {
      tileBias: 160,
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
    width: setting_width,
    height: setting_height
  },
};

var gameSingleton = new Phaser.Game(config);

// TODO: Go trough..
var player = null;
var playerGroup;
var blockGroup;
var enemyGroup; // The enemy group
var shotGroup;
var enemyList = []; // List of all enemies
var lastShot = 0;

function preload() {
  resLoadResources(this);
}

function create() {

  resCreateAnimations(this);
  inputInitialize(this);

  // Set up phaser3 wiring
  playerGroup = this.physics.add.group();
  blockGroup = this.physics.add.staticGroup();
  shotGroup = this.physics.add.group();
  enemyGroup = this.physics.add.group();

  this.physics.add.collider(playerGroup, blockGroup);
  this.physics.add.collider(enemyGroup, blockGroup);
  this.physics.add.collider(shotGroup, blockGroup);

  this.physics.add.overlap(shotGroup, enemyGroup, shotHitEnemy, null, this);
  //this.physics.add.collider(enemyGroup, enemyGroup);
  //this.physics.add.collider(playerGroup, enemyGroup);

  // Create a dummy map
  var map = mapCreateDummy();
  mapInitialize(this, map);

}

function update() {

  var curTime = this.time.now;

  playerHandleLogic(this, curTime);

  // Handle all enemy logic
  for (var i = enemyList.length - 1; i >= 0; i--) {
    var enemy = enemyList[i];
    const alive = enemyHandleLogic(this, enemy, curTime);
    if (!alive) {
      enemy.destroy();
      enemyList.splice(i, 1);
      enemyGroup.remove(enemy);
    }
  }

}

function shotHitEnemy(shot, enemy) {
  shot.destroy();
  enemy.xHealth -= 20; // handle enemy destruction in enemy logic?
  console.log(enemy.xHealth);
}
