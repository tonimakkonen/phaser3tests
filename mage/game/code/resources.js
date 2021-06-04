
"use strict";

function resLoadResources(game) {

  // Load all resources
  GRAPHS.forEach(
    (value, key) => {
      if (value.type == GRAPH_TYPE_SINGLE) {
        resLoadSingle(game, value);
      } else if (value.type == GRAPH_TYPE_LEFT_RIGHT) {
        resLoadLeftRight(game, value);
      } else {
        throw 'Unkown graph type: ' + value.type;
      }
    }
  );

  // Images

  // bg images
  game.load.image('bg0', 'imgs/bg0.png');
  game.load.image('bg1', 'imgs/bg1.png');
  game.load.image('bg2', 'imgs/bg2.png');
  game.load.image('bg3', 'imgs/bg3.png');

  // Projectiles and similar
  game.load.image('shot', 'imgs/shot.png');

  // UI and similar
  game.load.image('aim', 'imgs/aim.png');

  // TODO
  game.load.image('enemy1', 'imgs/enemy1.png');
  game.load.image('enemy2', 'imgs/enemy2.png');


  game.load.image('block', 'imgs/block_full.png');
  game.load.image('block_grass', 'imgs/block_grass.png');
  game.load.image('block_free', 'imgs/block_free.png');

  // TODO: set up animations

  // Sound
  game.load.audio('test_music', 'sound/music.mp3', true);
}

// Load single image
function resLoadSingle(game, value) {
  game.load.image(value.name, value.location);
}

// Load image with 4 frames for left right
function resLoadLeftRight(game, value) {
  game.load.spritesheet(
    value.name,
    value.location,
    { frameWidth: value.sizeX, frameHeight: value.sizeY }
  );
}

//
function resCreateAnimations(game) {
  GRAPHS.forEach(
    (value, key) => {
      if (value.type == GRAPH_TYPE_SINGLE) {
        // no animations
      } else if (value.type == GRAPH_TYPE_LEFT_RIGHT) {
        resCreateLeftRightAnim(game, value);
      } else {
        throw 'Unkown graph type: ' + value.type;
      }
    }
  );
}

function resCreateLeftRightAnim(game, value) {
  // Create animations
  game.anims.create({
    key: 'left',
    frames: game.anims.generateFrameNumbers(value.name, { start: 0, end: 1 }),
    frameRate: 4,
    repeat: -1
  });
  game.anims.create({
    key: 'right',
    frames: game.anims.generateFrameNumbers(value.name, { start: 2, end: 3 }),
    frameRate: 4,
    repeat: -1
  });
}
