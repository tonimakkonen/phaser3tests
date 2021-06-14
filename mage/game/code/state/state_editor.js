
var edCamX = 0;
var edCamY = 0;
var edObjects = []; // The phaser3 objects attached to each tile

function stateStartEditor(game) {

  if (mapBlueprint == null) {
    mapBlueprint = mapCreateEmpty(40, 20);
  }

  edObjects = new Array(mapBlueprint.tiles.length);

  const w = mapBlueprint.x*80;
  const h = mapBlueprint.y*80;
  var grid = game.add.grid(w / 2, h / 2, w, h, 80, 80, null, 0, 0x0000ff, 1);
  grid.setDepth(10);

  //game.cameras.main.setBounds(-1000,-1000, mapBlueprint.x*80, mapBlueprint.y*80);
}



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

  //
  const wx = game.cameras.main.worldView.x + game.input.mousePointer.x;
  const wy = game.cameras.main.worldView.y + game.input.mousePointer.y;
  const gx = Math.floor(wx / 80.0);
  const gy = Math.floor(wy / 80.0);

  if (gx >= 0 && gx < mapBlueprint.x && gy >= 0 && gy < mapBlueprint.y) {
    const lastState = mapBlueprint.tiles[gx + gy*mapBlueprint.x];
    if (game.input.activePointer.leftButtonDown()) {
      if (lastState == 0) {
        mapBlueprint.tiles[gx + gy*mapBlueprint.x] = 1;
        console.log('added a tile');
      }
    }
  }

  return GAME_MODE_MAP_EDITOR;
}
