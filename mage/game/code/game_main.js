
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
var player;
var blocks;
var shots;
var enemies;

// TODO rethink
var lastShot = 0;

function preload() {
  resLoadResources(this);
}

function create() {

  resCreateAnimations(this);

  //this.physics.arcade.tile_bias = 40;

  // Set up input
  mageInitializeInput(this);

  // TODO move elsewhere
  var bg = this.add.image(setting_width/2, setting_height/2, 'bg0');
  bg.setScrollFactor(0.0, 0.0);

  this.sound.play('test_music');


  // capture cursors
  cursors = this.input.keyboard.createCursorKeys();

  var map_y = 18;
  var map_x = 80;
  var map_walk = new Array(map_x*map_y).fill(0);




  // Dummy code for now
  this.physics.world.setBounds(0, 0, map_x*80, map_y*80);







  // Create dummy player and sopme blocks
  player = this.physics.add.sprite(100, 450, 'player');
  player.setGravity(0, 400);
  player.setCollideWorldBounds(true);
  player.setBounce(0.0, 0.0);

  shots = this.physics.add.group();
  enemies = this.physics.add.group();

  blocks = this.physics.add.staticGroup();

  for (var i = 0; i < map_x; i++) {
    var py = map_y - 1;
    map_walk[i + py*map_x] = 1;
  }

  for (var i = 5; i < map_y; i++) {
    map_walk[8 + i*map_x] = 1;
  }

  for (var i = 0; i < 240; i++) {
    var px = Math.floor(Math.random()*map_x);
    var py = Math.floor(Math.random()*(map_y - 1));
    map_walk[px + py*map_x] = 1;
  }

  // Add sprites
  for (var px = 0; px < map_x; px++) {
    for (var py = 0; py < map_y; py++) {
      if (map_walk[px+py*map_x] == 1) {
        this.add.sprite(px*80 + 40, py*80 + 40, 'block_free');
      }
    }
  }

  createMapBlocks(this, map_walk, map_x, map_y, 80, 80, blocks);

  // TODO: Move this elsewhere

  // Add blocks

  this.physics.add.collider(player, blocks);
  this.physics.add.collider(shots, blocks);
  this.physics.add.collider(enemies, blocks);
  this.physics.add.collider(enemies, shots);

  this.physics.add.collider(player, enemies);

  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, map_x*80, map_y*80);

  for (var i = 0; i < 30; i++) {
    var newEnemy = enemies.create(Math.random()*map_x*80, Math.random()*map_y*80, 'enemy1');
    newEnemy.setVelocity(Math.random()*100 - 50, Math.random()*100 - 50);
    newEnemy.setBounce(0.5, 0.5);
    newEnemy.setCollideWorldBounds(true);
  }
  for (var i = 0; i < 30; i++) {
    var newEnemy = enemies.create(Math.random()*map_x*80, Math.random()*map_y*80, 'enemy2');
    newEnemy.setVelocity(Math.random()*100 - 50, Math.random()*100 - 50);
    newEnemy.setBounce(1.0, 1.0);
    newEnemy.setCollideWorldBounds(true);
    newEnemy.setGravity(0, 0);
  }


  for (var i = 0; i < 30; i++) {
    var newEnemy = enemies.create(Math.random()*map_x*80, Math.random()*map_y*80, 'enemy_forest_monster');
    newEnemy.setVelocity(Math.random()*100 - 50, Math.random()*100 - 50);
    newEnemy.setBounce(0.1, 0.1);
    newEnemy.setCollideWorldBounds(true);
    newEnemy.setGravity(0, 400);
    newEnemy.anims.play('left', true);
    //if (i % 2 == 1) newEnemy.anims.play('kakka', true);
  }

}

function update() {

  mageHandlePlayerMovement();

  // Shoot (move elsewhere)
  var curTime = this.time.now;
  if (this.input.mousePointer.isDown && curTime - lastShot > 250) {
    shoot(this);
    lastShot = curTime;
  }


}

// TODO: move elsewhere
function shoot(game) {

  var dx = game.cameras.main.worldView.x + game.input.mousePointer.x - player.x;
  var dy = game.cameras.main.worldView.y + game.input.mousePointer.y - player.y;
  var len = Math.sqrt(dx*dx + dy*dy);
  dx = dx / len;
  dy = dy / len;


  var newShot = shots.create(player.x, player.y, 'shot');
  newShot.setVelocity(dx*500, dy*500);
  newShot.setBounce(0.8, 0.8);
  newShot.setGravity(0, 100);
}
