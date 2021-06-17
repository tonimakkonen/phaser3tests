
var edCamX = 0;
var edCamY = 0;

const EDITOR_TOOL_ERASE         = 1;
const EDITOR_TOOL_GROUND        = 10;
const EDITOR_TOOL_PLAYER_START  = 20;

// Set up default tools
var edToolLeft = EDITOR_TOOL_GROUND;
var edToolRight = EDITOR_TOOL_ERASE;
var edToolLeftOption = LAYER_GROUND;
var edToolRightOption = 0;

// Temp objects
var edGrid = null;
var edToolBoxObjects = [];
var edPlayerStart = null;

// Start editor
function stateStartEditor(game) {

  // Create the blueprint map if empty
  if (mapBlueprint == null) {
    mapBlueprint = mapCreateEmpty(40, 20);
  }

  edObjects = new Array(mapBlueprint.tiles.length);

  const w = mapBlueprint.x*80;
  const h = mapBlueprint.y*80;
  edGrid = game.add.grid(w / 2, h / 2, w, h, 80, 80, null, 0, 0x0000ff, 1);
  edGrid.setDepth(10);

  // Add player start
  edPlayerStart = game.add.image(mapBlueprint.playerStartX*80.0 + 40, mapBlueprint.playerStartY*80.0 + 40.0, 'player');
  edPlayerStart.setDepth(5);

  // Set up toolbox objects
  edAddToolBox(game.add.rectangle(settingWidth / 2.0, settingHeight / 2.0, settingWidth - 160.0, settingHeight - 160.0, 0xffff00), 0.5);
  edAddToolBox(game.add.text(160.0 + 20.0, 480.0, 'Try map'), 1.0);
}

function edAddToolBox(tbo, alpha) {
  tbo.setDepth(20);
  tbo.setAlpha(alpha);
  tbo.setScrollFactor(0.0, 0.0);
  edToolBoxObjects.push(tbo);
}

// Run editor
function stateHandleEditor(game) {

  // TODO: Make speed
  if (inputA.isDown) edCamX -= 20;
  if (inputD.isDown) edCamX += 20;
  if (inputW.isDown) edCamY -= 20;
  if (inputS.isDown) edCamY += 20;
  if (edCamX < 0) edCamX = 0;
  if (edCamY < 0) edCamY = 0;
  if (edCamX > mapBlueprint.x * 80) edCamX = mapBlueprint.x * 80;
  if (edCamY > mapBlueprint.y * 80) edCamY = mapBlueprint.y * 80;
  game.cameras.main.centerOn(edCamX, edCamY);

  // Tab or not
  if (inputTab.isDown) {
    edToolBoxObjects.forEach(o => o.setVisible(true));
    return editorHandleTab(game);
  } else {
    // make all objects invisible
    edToolBoxObjects.forEach(o => o.setVisible(false));
    return editorHandleEdit(game);
  }
}

// When moving away from editor
function editorClose(game) {
  edGrid.destroy();
  edToolBoxObjects.forEach(o => o.destroy());
  edToolBoxObjects = [];
  edPlayerStart.destroy();
  edPlayerStart = null;
  
  // TODO: have map objects separately
  for (var px = 0; px < mapBlueprint.x; px++) {
    for (var py = 0; py < mapBlueprint.y; py++) {
      editorDestroyTile(game, mapBlueprint, px, py);
    }
  }
}

function editorHandleTab(game) {
  const wx = game.input.mousePointer.x - 80.0;
  const wy = game.input.mousePointer.y - 80.0;
  const gx = Math.floor(wx / 80.0);
  const gy = Math.floor(wy / 80.0);

  if (game.input.activePointer.leftButtonDown()) {
    if (gy == 6) {
      editorClose(game);
      return GAME_MODE_PLAYING;
    }
  }

  return GAME_MODE_MAP_EDITOR;
}

function editorHandleEdit(game) {
  const wx = game.cameras.main.worldView.x + game.input.mousePointer.x;
  const wy = game.cameras.main.worldView.y + game.input.mousePointer.y;
  const gx = Math.floor(wx / 80.0);
  const gy = Math.floor(wy / 80.0);

  if (gx >= 0 && gx < mapBlueprint.x && gy >= 0 && gy < mapBlueprint.y) {
    const lastState = mapBlueprint.tiles[gx + gy*mapBlueprint.x];
    if (game.input.activePointer.leftButtonDown()) {
      editorApplyTool(game, mapBlueprint, gx, gy, edToolLeft, edToolLeftOption);
    }
    if (game.input.activePointer.rightButtonDown()) {
      editorApplyTool(game, mapBlueprint, gx, gy, edToolRight, edToolRightOption);
    }
  }

  return GAME_MODE_MAP_EDITOR;
}

// Called when mouse button down
function editorApplyTool(game, map, px, py, toolType, toolOption) {
  if (toolType == EDITOR_TOOL_ERASE) {
    editorApplyErase(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_GROUND) {
    editorApplyAddGround(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_PLAYER_START) {
    editorApplyPlayerStart(game, map, px, py);
  } else {
    throw 'Unknown tool type: ' + toolType;
  }
}

function editorApplyErase(game, map, px, py, type) {
  // TODO: Support different options and different layers
  const lastState = map.tiles[px + py*map.x];
  if (lastState != 0) {
    map.tiles[px + py*map.x] = 0;
    editorRedoTiles(game, map, px, py);
  }
}

function editorApplyAddGround(game, map, px, py, type) {
  const lastState = map.tiles[px + py*map.x];
  if (lastState == 0) {
    map.tiles[px + py*map.x] = 1;
    editorRedoTiles(game, map, px, py);
  }
}

function editorApplyPlayerStart(game, map, px, py) {
  map.playerStartX = px;
  map.playerStartY = py;
  edPlayerStart.setPosition(px * 80.0 + 40.0, py * 80.0 + 40.0);
}


// Redo all tiles around this tile
function editorRedoTiles(game, map, px, py) {
  editorRedoTile(game, map, px, py);
  if (px > 0) editorRedoTile(game, map, px - 1, py);
  if (px < map.x - 1) editorRedoTile(game, map, px + 1, py);
  if (py > 0) editorRedoTile(game, map, px, py - 1);
  if (py < map.y - 1) editorRedoTile(game, map, px, py + 1);
}

function editorDestroyTile(game, map, px, py) {
  var list = map.tilesTemp[px + py*map.x];
  list.forEach(s => s.destroy());
  list.splice(0, list.length);
}

function editorRedoTile(game, map, px, py) {
  editorDestroyTile(game, map, px, py);
  mapCreateSingleTile(game, map, px, py, map.tilesTemp[px + py*map.x]);
}
