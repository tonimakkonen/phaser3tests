
"use strict";

// Create a dummy map
function mapCreateDummy() {
  var mapY = 18;
  var mapX = 80;
  var tiles = new Array(mapX*mapY).fill(0);

  for (var i = 0; i < mapX; i++) {
    var py = mapY - 1;
    tiles[i + py*mapX] = 1;
  }

  for (var i = 0; i < 200; i++) {
    var px = Math.floor(Math.random()*mapX);
    var py = Math.floor(Math.random()*(mapY - 1));
    tiles[px + py*mapX] = 1;
  }

  return { tiles: tiles, x: mapX, y: mapY}

}

// Create all the map objects
function mapInitialize(game, map) {

  // Add BG images
  var bg = game.add.image(setting_width/2, setting_height/2, 'bg0');
  bg.setScrollFactor(0.0, 0.0);

  // Add Blocks
  for (var px = 0; px < map.x; px++) {
    for (var py = 0; py < map.y; py++) {
      if (map.tiles[px+py*map.x] == 1) {
        var image = game.add.sprite(px*80 + 40, py*80 + 40, 'block_free');
      }
    }
  }
  createMapBlocks(game, map.tiles, map.x, map.y, 80, 80, blockGroup);

  // Add enemies
  for (var i = 0; i < 40; i++) {
    enemyCreate(game, ENEMY_ELECTRIC, Math.random()*map.x*80, Math.random()*map.y*80);
  }

  // Create player
  player = playerGroup.create(100, 450, 'player');
  player.setGravity(0, 400);
  player.setCollideWorldBounds(true);
  player.setBounce(0.0, 0.0);


  game.physics.world.setBounds(0, 0, map.x*80, map.y*80);
  game.cameras.main.startFollow(player);
  game.cameras.main.setBounds(0, 0, map.x*80, map.y*80);
}

// Create "blocks" responsible for blocking the player
function createMapBlocks(game, mapArray, mapX, mapY, tileX, tileY, group) {

  const MARGIN = 2; // TODO

  var list = [];

  // Run horizontally for each row
  for (var py = 0; py < mapY; py++) {
    // Gather consecutive blocks with length longer than one
    var indices = mapRunLine(mapArray, py*mapX, 1, mapX);
    for (var i = 0; i < indices.length / 2; i++) {
      var start = indices[i*2];
      var end = indices[i*2 + 1];
      var width = tileX * (end-start + 1);
      var height = tileY;
      var centerX = 0.5*tileX*(end + start) + tileX*0.5;
      var centerY = py*tileY + 0.5*tileY;
      var newRect = game.add.rectangle(centerX, centerY, width - MARGIN, height, 0xff0000);
      newRect.setAlpha(0.25);
      newRect.visible = false;
      group.add(newRect);
      list.push(newRect);
    }
  }

  // Run vertically for each column
  for (var px = 0; px < mapX; px++) {
    // Gather consecutive blocks with length longer than one
    var indices = mapRunLine(mapArray, px, mapX, mapY);
    for (var i = 0; i < indices.length / 2; i++) {
      var start = indices[i*2];
      var end = indices[i*2 + 1];
      var width = tileX;
      var height = tileY* (end-start + 1);
      var centerX = px*tileX + 0.5*tileX;
      var centerY = 0.5*tileY*(end + start) + tileY*0.5;
      var newRect = game.add.rectangle(centerX, centerY, width, height - MARGIN, 0xff0000);
      newRect.setAlpha(0.15);
      newRect.visible = false;
      group.add(newRect);
      list.push(newRect);
    }
  }

  // Add singles
  for (var px = 0; px < mapX; px++) {
    for (var py = 0; py < mapY; py++) {
      if (
        mapIsBlocked(mapArray[(px)+(py)*mapX])
        && (px == 0 || !mapIsBlocked(mapArray[(px-1)+(py)*mapX]))
        && (px == mapX -1 || !mapIsBlocked(mapArray[(px+1)+(py)*mapX]))
        && (py == 0 || !mapIsBlocked(mapArray[(px)+(py-1)*mapX]))
        && (py == mapY - 1 || !mapIsBlocked(mapArray[(px)+(py+1)*mapX]))
      ) {
        var cx = px*tileX + tileX*0.5;
        var cy = py*tileY + tileY*0.5;
        var newRect = game.add.rectangle(cx, cy, tileX, tileY, 0xff0000);
        newRect.setAlpha(0.15);
        newRect.visible = false;
        group.add(newRect);
        list.push(newRect);
      }
    }
  }

  console.log('Number of blocking rects: ' + list.length);

}


// Run a line horizontally or vertically
function mapRunLine(mapArray, startIndex, stride, count) {
  var list = []; // array with even number of elements indicating start and end index of block
  var curStart = -1;
  var curOnBlock = false;
  var nowOn;
  var i;
  for (i = 0; i < count; i++) {
    var curIndex = startIndex + i*stride;
    nowOn = mapIsBlocked(mapArray[curIndex]); // TODO: Change this to be a more generic check
    if (nowOn && !curOnBlock) curStart = i;
    if (!nowOn && curOnBlock) addToListIfLongerThanOne(list, curStart, i - 1);
    curOnBlock = nowOn;
  }

  // If we end a block at the edge of the map
  if (nowOn) addToListIfLongerThanOne(list, curStart, i - 1);

  return list;
}

function addToListIfLongerThanOne(list, start, end) {
  if (end - start > 0) {
    list.push(start);
    list.push(end);
  }
}

function mapIsBlocked(value) {
  return value == 1;
}
