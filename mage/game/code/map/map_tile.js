
"use strict";

// In this file we handle map tile creation



// Create single coordinates
// TODO: This needs to be tweaked a lot
function mapCreateSingleTile(game, map, px, py, list) {
  if (px < 0 || py < 0 || px >= map.x && py >= map.y) throw new 'Bad px, py: ' + px + ', ' + py;

  const tile = map.tiles[px+py*map.x];
  if (tile == 0) return;

  const layer = LAYERS.get(tile);
  if (!layer) throw 'Bad layer type: ' + tile;

  // Center coordinates
  const cx = px*80 + 40;
  const cy = py*80 + 40;
  const dx = 20;
  const dy = 20;

  // TODO: Suppurt different layer types
  const onLeft = px == 0 || map.tiles[(px-1)+py*map.x] == 1;
  const onRight = px == map.x -1 || map.tiles[(px+1)+py*map.x] == 1;
  const onTop = py == 0 || map.tiles[px+(py-1)*map.x] == 1;
  const onBottom = py == map.y - 1 || map.tiles[px+(py+1)*map.x] == 1;


  if (map.tiles[px+py*map.x] == 1) {
    // top left part
    if (onLeft) {
      list.push(game.add.sprite(cx - dx, cy - dy, 'ground_full').setDepth(layer.zBlock));
    } else {
      list.push(game.add.sprite(cx - dx, cy - dy, 'ground_left').setDepth(layer.zBlock));
    }
    // top right part
    if (onRight) {
      list.push(game.add.sprite(cx + dx, cy - dy, 'ground_full').setDepth(layer.zBlock));
    } else {
      list.push(game.add.sprite(cx + dx, cy - dy, 'ground_right').setDepth(layer.zBlock));
    }
    // bottom left
    if (onLeft && onBottom) {
      list.push(game.add.sprite(cx - dx, cy + dy, 'ground_full').setDepth(layer.zBlock));
    } else if (onLeft) {
      list.push(game.add.sprite(cx - dx, cy + dy, 'ground_bottom').setDepth(layer.zBlock));
    } else if(onBottom) {
      list.push(game.add.sprite(cx - dx, cy + dy, 'ground_left').setDepth(layer.zBlock));
    } else {
      list.push(game.add.sprite(cx - dx, cy + dy, 'ground_bottomleft').setDepth(layer.zBlock));
    }
    // bottom right
    if (onRight && onBottom) {
      list.push(game.add.sprite(cx + dx, cy + dy, 'ground_full').setDepth(layer.zBlock));
    } else if (onRight) {
      list.push(game.add.sprite(cx + dx, cy + dy, 'ground_bottom').setDepth(layer.zBlock));
    } else if (onBottom) {
      list.push(game.add.sprite(cx + dx, cy + dy, 'ground_right').setDepth(layer.zBlock));
    } else {
      list.push(game.add.sprite(cx + dx, cy + dy, 'ground_bottomright').setDepth(layer.zBlock));
    }

    // Add top layer
    if (!onTop) {
      var image = game.add.sprite(cx, cy - 2.0 * dy, 'ground_top');
      image.setDepth(layer.zTop);
      list.push(image);
    }

    // Randoms
    // TODO: Remove random
    /*
    const rx = Math.random()*10.0 - 5.0;
    const ry = Math.random()*10.0 - 5.0;
    if (Math.random() < 0.15) {
      var im = game.add.sprite(cx + rx, cy + ry, 'ground_r0');
      im.rotation = Math.random()*Math.PI;
      list.push(im);
    } else if (Math.random() < 0.15) {
      var im = game.add.sprite(cx + rx, cy + ry, 'ground_r1');
      im.rotation = Math.random()*Math.PI;
      list.push(im);
    }
    */
  }
}

function mapHandleTopLayer(game, map, px, py, ) {

}

function mapHandleSymmetricLayer() {

}

// Continue this same tile to whatever direction
// This happens if..
// * the same tile is in that direction
// * the map boundary
// * a tile that has a higher z value
function mapContinueSame(map, tile, px, py, dx, dy) {
  if (px < 0 || px < 0 || px >= map.x || py >= map.y) throw 'Bad px, py: ' + px + ', ' + py;
  if ((dx != -1 && dx != 1) || (dy != -1 && dy != 1)) throw 'Bad dx, dy: ' + dx + ', ' + dy;
  const nx = px + dx;
  const ny = py + dy;
  // oustide
  if (nx < 0 || ny < 0 || nx >= map.x || ny >= map.y) return true;
  const ot = map.tiles[nx + ny*map.x];
  if (ot == 0) return false; // empty
  if (ot == tile) return true; // same tile
  // check z value
  const ttd = LAYERS.get(tile);
  const otd = LAYERS.get(ot);
  if (!ttd) throw 'Bad layer type?: ' + tile;
  if (!otd) throw 'Bad layer type?: ' + ot;
  return ttd.zInternal < otd.zInternal;
}
