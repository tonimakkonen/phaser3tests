
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

var game = new Phaser.Game(config);

var player;
var blocks;

function preload() {
  loadResources(this);
}

function create() {

  // Set up input
  mageInitializeInput(this);


  // capture cursors
  cursors = this.input.keyboard.createCursorKeys();




  // Dummy code for now
  var map_width = 5; // how many screens
  var map_height = 2;
  var tiles_x = 1280 / 80;
  var tiles_y = 720 / 80;
  var map_xpix = map_width * 1280;
  var map_ypix = map_height * 720;

  this.physics.world.setBounds(0, 0, map_xpix, map_xpix);


  // TODO move elsewhere
  var bg = this.add.image(setting_width/2, setting_height/2, 'bg0');
  bg.setScrollFactor(0.0, 0.0);

  var bg3 = this.add.image(setting_width*0.5, setting_height-480/2, 'bg2');
  bg3.setScrollFactor(0.05, 0.0);
  bg3 = this.add.image(setting_width*1.5, setting_height-480/2, 'bg2');
  bg3.setScrollFactor(0.05, 0.0);

  //var bg2 = this.add.image(setting_width/2, setting_height - 160/2 - 80, 'bg1');
  //bg2.setScrollFactor(0.15, 0.15);
  //bg2 = this.add.image(setting_width*1.5, setting_height - 160/2 - 80, 'bg1');
  //bg2.setScrollFactor(0.15, 0.15);

  //var bg4 = this.add.image(setting_width/2, setting_height - 160/2, 'bg3');
  //bg4.setScrollFactor(0.25, 0.25);
  //bg4 = this.add.image(setting_width*1.5, setting_height - 160/2, 'bg3');
  //bg4.setScrollFactor(0.25, 0.25);



  this.sound.play('test_music');

  // Create dummy player and sopme blocks
  player = this.physics.add.sprite(100, 450, 'player');
  player.setGravity(0, 400);
  player.setCollideWorldBounds(true);

  blocks = this.physics.add.staticGroup();
  for (var i = 0; i < map_width*tiles_x; i++) {
    var py = tiles_y*map_height - 1;
    blocks.create(i*80 + 40, py*80 + 40, 'block');
  }

  for (var i = 0; i < 80; i++) {
    var rx = Math.floor(Math.random()*tiles_x*map_width);
    var ry = Math.floor(Math.random()*(tiles_y*map_height - 1));
    blocks.create(rx*80 + 40, ry*80 + 40, 'block');
  }

  this.physics.add.collider(player, blocks);

  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, map_width*1280, map_height*720);

}

function update() {

  if (input_a.isDown)
  {
      player.setVelocityX(-500);
  }
  else if (input_d.isDown)
  {
      player.setVelocityX(500);
  }
  else
  {
      player.setVelocityX(0);
  }

  if (input_space.isDown && player.body.touching.down)
  {
      player.setVelocityY(-600);
  }

}
