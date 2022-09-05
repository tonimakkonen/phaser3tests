
"use strict";

var buyPlayer = undefined
var buyFirstButtons = []
var buySelectionButtons = []
var buySelectionUi = []
var buyInSelection = false

function stateBuyUpdate(game) {
  if (!buyPlayer) stateBuyStart(game)
  if (buyInSelection) buttonLogic(buySelectionButtons)
  else buttonLogic(buyFirstButtons)
}

function stateBuyStart(game) {
  goldUpdateText(game)
  buyPlayer = PLAYER_BLUE
  buyCreateFirstButtons(buyPlayer, game)
}


// First level button cretion

function buyCreateFirstButtons(player, game) {

  // done button and main base button
  const bh = CONFIG_BLOCK - 10
  const dbh = CONFIG_WIDTH * 0.15
  const dby = CONFIG_HEIGHT - CONFIG_BLOCK*0.5
  const bbw = CONFIG_BLOCK * 2 - 10
  if (player == PLAYER_BLUE) {
    buyFirstButtons.push(
      buttonAddClickButton(CONFIG_WIDTH*0.25, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game)
    )
    buyFirstButtons.push(
      buttonAddGridButton(blueBase.x, blueBase.y, bbw, bbw, (button) => buyPressBaseButton(button, blueBase, game), game)
    )
  } else if (player == PLAYER_RED) {
    buyFirstButtons.push(
      buttonAddClickButton(CONFIG_WIDTH*0.75, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game)
    )
    buyFirstButtons.push(
      buttonAddGridButton(redBase.x, redBase.y, bbw, bbw, (button) => buyPressBaseButton(button, redBase, game), game)
    )
  } else {
    throw "Unkown player: " + player
  }

  // grid buttons
  for (const grid of configMap) {
    if (grid.player != player) continue
    const x = (grid.x + 0.5) * CONFIG_BLOCK
    const y = CONFIG_HEIGHT - (grid.y + 2.5)*CONFIG_BLOCK
    const w = CONFIG_BLOCK - 10
    buyFirstButtons.push(buttonAddGridButton(x, y, w, w, (button) => buyPressGrid(grid, button, game), game))
  }
}

function buyDestroyButtons() {
  buttonDestroyList(buyFirstButtons)
  buyFirstButtons = []
}

// first level button presses

function buyPressTurnDone(game) {
  buyDestroyButtons(buyFirstButtons)
  if (buyPlayer == PLAYER_BLUE) {
    buyPlayer = PLAYER_RED
    buyCreateFirstButtons(buyPlayer, game)
  } else {
    gameState = GAME_STATE_COMBAT
    buyPlayer = undefined
  }
}

function buyPressBaseButton(button, base, game) {
  buttonSetColorList(buyFirstButtons, buttonDisabledColor)
  buttonSetColor(button, buttonSelectecColor)
  buyCreateBuildingButtons(base, game)
  buyInSelection = true
}

function buyPressGrid(grid, button, game) {
  buttonSetColorList(buyFirstButtons, buttonDisabledColor)
  buttonSetColor(button, buttonSelectecColor)
  buyCreateSelectionButtons(grid, game)
  buyInSelection = true
}

// second level buttons

function buyCreateBuildingButtons(building, game) {
  const p = building.x_props
  const allowSell = !p.base
  // name + health, sell, empty cancel
  const rows = 3 + allowSell ? 1 : 0
  const cx = CONFIG_WIDTH / 2
  const r0 = 50
  const dy = 40
  const header = p.name + " [" + Math.floor(building.x_health) + " / " + p.health + "]"
  buySelectionUi.push(game.add.text(cx, r0, header, { color: '#ffffff' }).setOrigin(0.5, 0.5))
  buySelectionButtons.push(buttonAddClickButton(cx, r0 + dy, 200, 30, 'Cancel', undefined, (button) => buyPressCancel(), game))
}

function buyCreateEmptyButtons(grid, game) {

}

function buyCreateSelectionButtons(grid, game) {
  buySelectionButtons.push(
    buttonAddClickButton(400, 400, 200, 30, 'Cancel', undefined, (button) => buyPressCancel(), game)
  )
}

function buyDestroySelectionButtons() {
  buttonDestroyList(buySelectionButtons)
  for (const po of buySelectionUi) po.destroy()
  buySelectionUi = []
}

function buyPressCancel() {
  buyDestroySelectionButtons()
  buyInSelection = false
  buttonSetColorList(buyFirstButtons, buttonColor)
}
