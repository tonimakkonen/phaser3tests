
"use strict";

const EDITOR_TOOL_ERASE         = 1;
const EDITOR_TOOL_GROUND        = 2;
const EDITOR_TOOL_PLAYER_START  = 3;
const EDITOR_TOOL_ENEMY         = 4;
const EDITOR_TOOL_PICKUP        = 5;
const EDITOR_TOOL_DECORATION    = 6;

const EDITOR_ERASE_ALL          = 1;

const EDITOR_SPECIAL_TRY        = 1;

// Just add all tool options manually
var EDITOR_MENU = new Set();

// Top row
EDITOR_MENU.add({x: 0, y: 0, tool: EDITOR_TOOL_PLAYER_START, image: 'player'});

EDITOR_MENU.add({x: 2, y: 0, tool: EDITOR_TOOL_ERASE, option: EDITOR_ERASE_ALL,  image: 'ui_eraser_all'});

// Second row, ground options
EDITOR_MENU.add({x: 0, y: 1, tool: EDITOR_TOOL_GROUND, option: LAYER_GROUND, image: 'ground_full'});

// Decorations

// Enemies
EDITOR_MENU.add({x: 0, y: 2, tool: EDITOR_TOOL_ENEMY, option: ENEMY_FOREST_MONSTER, image: 'enemy_forest_monster'});
EDITOR_MENU.add({x: 1, y: 2, tool: EDITOR_TOOL_ENEMY, option: ENEMY_BURNING_MONSTER, image: 'enemy_burning_monster'});
EDITOR_MENU.add({x: 2, y: 2, tool: EDITOR_TOOL_ENEMY, option: ENEMY_ELECTRIC_MONSTER, image: 'enemy_electric_monster'});

EDITOR_MENU.add({x: 0, y: 6, special: EDITOR_SPECIAL_TRY, text: 'Try'});

// Pickups

// Current camera position
var edCamX = 0;
var edCamY = 0;

// Tool options currently selected
var edToolLeft = EDITOR_TOOL_GROUND;
var edToolRight = EDITOR_TOOL_ERASE;
var edToolLeftOption = LAYER_GROUND;
var edToolRightOption = 0;
var edLeftSelectPos = {x: 0, y: 1}; // TODO
var edRightSelectPos = {x: 3, y: 0};

// Temp phaser3 objects
var edGrid = null;          // grid
var edToolBoxObjects = [];  // all in tool box (that you open with tab)
var edLeftSelect = null;    // left select in tool box
var edRightSelect = null;   // right select in tool box
var edPlayerStart = null;   // player start
var edTiles = [];           // tiles for each tile
var edEnemies = [];         //  enemies for each tile
var edPickups = [];         //  pickups for each tile
var edDecorations = [];     //  decorations for each tile


// Start editor
function stateStartEditor(game) {

  // Create the blueprint map if not present
  if (mapBlueprint == null) {
    mapBlueprint = mapCreateEmpty(40, 20);
  }

  // Create all phaser objects related to the map
  editorCreateAllFromMap(game, mapBlueprint);

  // Create grid and other UI phaser3 objects
  const w = mapBlueprint.x*80;
  const h = mapBlueprint.y*80;
  edGrid = game.add.grid(w / 2, h / 2, w, h, 80, 80, null, 0, 0x0000ff, 1);
  edGrid.setDepth(10);
  editorAddToolBox(game.add.rectangle(settingWidth / 2.0, settingHeight / 2.0, settingWidth - 160.0, settingHeight - 160.0, 0xffffff), 0.25);
  edLeftSelect = editorAddToolBox(game.add.rectangle(edLeftSelectPos.x * 80.0 + 40.0 + 80.0, edLeftSelectPos.y * 80.0 + 40.0 + 80.0, 60, 60, 0xff0000), 0.5);
  edRightSelect = editorAddToolBox(game.add.rectangle(edRightSelectPos.x * 80.0 + 40.0 + 80.0, edRightSelectPos.y * 80.0 + 40.0 + 80.0, 60, 60, 0x00ff00), 0.5);
  EDITOR_MENU.forEach(mo => editorAddMenuOption(game, mo) );
}

function editorAddMenuOption(game, mo) {
  const cx = mo.x * 80.0 + 40.0 + 80.0;
  const cy = mo.y * 80.0 + 40.0 + 80.0;
  if (mo.image) {
    editorAddToolBox(game.add.image(cx, cy, mo.image), 0.75);
  } else if (mo.text) {
    var text = game.add.text(cx, cy, mo.text).setOrigin(0.5);
    editorAddToolBox(text, 0.75);
  } else {
    throw 'Bad menu option: ' + mo;
  }
}

// Util method to add a tool box object
function editorAddToolBox(tbo, alpha) {
  tbo.setDepth(20);
  tbo.setAlpha(alpha);
  tbo.setScrollFactor(0.0, 0.0);
  edToolBoxObjects.push(tbo);
  return tbo;
}

// Run editor
function stateHandleEditor(game) {

  // Movement is always on
  if (inputA.isDown) edCamX -= 20;
  if (inputD.isDown) edCamX += 20;
  if (inputW.isDown) edCamY -= 20;
  if (inputS.isDown) edCamY += 20;
  if (edCamX < 0) edCamX = 0;
  if (edCamY < 0) edCamY = 0;
  if (edCamX > mapBlueprint.x * 80) edCamX = mapBlueprint.x * 80;
  if (edCamY > mapBlueprint.y * 80) edCamY = mapBlueprint.y * 80;
  game.cameras.main.centerOn(edCamX, edCamY);

  // In tool menu or not
  if (inputTab.isDown) {
    edToolBoxObjects.forEach(o => o.setVisible(true));
    return editorHandleTab(game);
  } else {
    edToolBoxObjects.forEach(o => o.setVisible(false));
    return editorHandleEdit(game);
  }
}

// When moving away from editor
function editorClose(game) {
  edGrid.destroy();
  edToolBoxObjects.forEach(o => o.destroy());
  edToolBoxObjects = [];
  edLeftSelect = null;
  edRightSelect = null;
  edPlayerStart.destroy();
  edPlayerStart = null;
  editorDestroyAllMapObjects();
}

function editorHandleTab(game) {
  const wx = game.input.mousePointer.x - 80.0;
  const wy = game.input.mousePointer.y - 80.0;
  const gx = Math.floor(wx / 80.0);
  const gy = Math.floor(wy / 80.0);

  var toolOn = null;
  EDITOR_MENU.forEach(em => {
    if (gx == em.x && gy == em.y) {
      toolOn = em;
    }
  });

  if (toolOn == null) return GAME_MODE_MAP_EDITOR;
  if (game.input.activePointer.leftButtonDown()) {
    edToolLeft = toolOn.tool;
    edToolLeftOption = toolOn.option;
    edLeftSelectPos = {x: toolOn.x, y: toolOn.y};
    edLeftSelect.setPosition(toolOn.x * 80.0 + 40.0 + 80.0, toolOn.y * 80.0 + 40.0 + 80.0);
  }
  if (game.input.activePointer.rightButtonDown()) {
    edToolRight = toolOn.tool;
    edToolRightOption = toolOn.option;
    edRightSelectPos = {x: toolOn.x, y: toolOn.y};
    edRightSelect.setPosition(toolOn.x * 80.0 + 40.0 + 80.0, toolOn.y * 80.0 + 40.0 + 80.0);
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
  var changes;
  if (toolType == EDITOR_TOOL_ERASE) {
    changes = editorApplyErase(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_GROUND) {
    changes = editorApplyAddGround(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_PLAYER_START) {
    changes = editorApplyPlayerStart(game, map, px, py);
  } else if (toolType == EDITOR_TOOL_ENEMY) {
    editorApplyEnemy(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_PICKUP) {
    editorApplyPickup(game, map, px, py, toolOption);
  } else if (toolType == EDITOR_TOOL_DECORATION) {
    editorApplyDecoration(game, map, px, py, toolOption);
  } else {
    throw 'Unknown tool type: ' + toolType;
  }

   // Save the map in local storage to avoid missing up on changes
  if (changes) {
    storageSaveMap();
  }
}

///////////
// Tools //
///////////

function editorApplyErase(game, map, px, py, type) {
  var changes = false;
  // erase ground
  const lastState = map.tiles[px + py*map.x];
  if (lastState != 0) {
    map.tiles[px + py*map.x] = 0;
    editorRedoTiles(game, map, px, py);
    changes = true;
  }

  // erase enemies
  // erase pickups

  return changes;
}

function editorApplyAddGround(game, map, px, py, type) {
  const lastState = map.tiles[px + py*map.x];
  if (lastState == 0) {
    map.tiles[px + py*map.x] = 1;
    editorRedoTiles(game, map, px, py);
    return true;
  }
  return false;
}

function editorApplyPlayerStart(game, map, px, py) {
  if (px != map.playerStartX || py != map.playerStartY) {
    map.playerStartX = px;
    map.playerStartY = py;
    edPlayerStart.setPosition(px * 80.0 + 40.0, py * 80.0 + 40.0);
    return true;
  }
  return false;
}

function editorApplyEnemy(game, map, px, py, option) {
  const index = px + py*map.x;
  if (map.tiles[index] != 0) return false;
  const lastValue = map.enemies[index];
  if (option != lastValue) {
    map.enemies[index] = option;
    editorUpdateEnemy(game, map, px, py);
    return true;
  }
  return false;
}

function editorApplyPickup(game, map, px, py, option) {
  return false;
}

function editorApplyDecoration(game, map, px, py, option) {
  return false;
}

//////////////////////
// Map modification //
//////////////////////

// Set up all phaser3 objects to represent the map
function editorCreateAllFromMap(game, map) {
  edTiles = Array.from(Array(mapBlueprint.tiles.length), () => []);
  edEnemies = Array(mapBlueprint.tiles.length);
  edPickups = Array(mapBlueprint.tiles.length);
  edDecorations = Array(mapBlueprint.tiles.length);
  for (var px = 0; px < map.x; px++) {
    for (var py = 0; py < map.y; py++) {
      mapCreateSingleTile(game, map, px, py, edTiles[px + py*map.x]);
      editorUpdateEnemy(game, map, px, py);
      editorUpdatePickup(game, map, px, py);
      editorUpdateDecoration(game, map, px, py);
    }
  }
  edPlayerStart = game.add.image(mapBlueprint.playerStartX*80.0 + 40, mapBlueprint.playerStartY*80.0 + 40.0, 'player');
  edPlayerStart.setDepth(5);
}

// Destroy all map objects
function editorDestroyAllMapObjects() {
  for (var px = 0; px < mapBlueprint.x; px++) {
    for (var py = 0; py < mapBlueprint.y; py++) {
      editorDestroyTile(game, mapBlueprint, px, py);
    }
  }
  edTiles = [];
  edEnemies = [];
  edPickups = [];
  edDecorations = [];
}

// Redo all tiles around this tile wrt. to the ground
function editorRedoTiles(game, map, px, py) {
  editorRedoTile(game, map, px, py);
  if (px > 0) editorRedoTile(game, map, px - 1, py);
  if (px < map.x - 1) editorRedoTile(game, map, px + 1, py);
  if (py > 0) editorRedoTile(game, map, px, py - 1);
  if (py < map.y - 1) editorRedoTile(game, map, px, py + 1);
}

// Destroy all ground tiles from a given position
function editorDestroyTile(game, map, px, py) {
  var list = edTiles[px + py*map.x];
  list.forEach(s => s.destroy());
  list.splice(0, list.length);
}

// redo all tiles for a given position
function editorRedoTile(game, map, px, py) {
  editorDestroyTile(game, map, px, py);
  mapCreateSingleTile(game, map, px, py, edTiles[px + py*map.x]);
}

function editorUpdateEnemy(game, map, px, py) {
  editorUpdateSingle(game, map, edEnemies, map.enemies, ENEMIES, px, py);
}

function editorUpdatePickup(game, map, px, py) {
  editorUpdateSingle(game, map, edPickups, map.pickups, PICKUPS, px, py);
}

function editorUpdateDecoration(game, map, px, py) {
  // TODO: Use map features for this
  //editorUpdateSingle(game, map, edDecorations, map.decorations, DECORATIONS, px, py);
}

function editorUpdateSingle(game, map, existing, mapList, type, px, py) {
  const index = px + py*map.x;
  if (existing[index]) {
    existing[index].destroy();
    existing[index] = null;
  }
  const needed = mapList[index];
  if (needed != 0) {
    const graph = GRAPHS.get(type.get(needed).graph);
    existing[index] = game.add.image(px * 80.0 + 40.0, py * 80.0 + 40.0, graph.name);
  }
}
