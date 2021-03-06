
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

function preload() {
  this.load.image('test_image', 'imgs/mountains.png');
  this.load.audio('test_music', 'sound/music.mp3');
}

function create() {

  // Allow right clicks
  this.input.mouse.disableContextMenu();

  this.input.keyboard.on('keydown-' + 'F10', function (event) { this.scale.startFullscreen(); }, this);

  //this.scale.startFullscreen();

  this.add.image(setting_width/2, setting_height/2, 'test_image');

  this.sound.play('test_music');

}

function update() {

}
