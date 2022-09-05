
"use strict";

var buyPlayer = undefined;
var buyButtons = []
var buySelectionButtons = []
var buyInSelection = false

function stateBuyUpdate(game) {
  if (!buyPlayer) stateBuyStart(game)
  if (buyInSelection) buttonLogic(buySelectionButtons)
  else buttonLogic(buyButtons)
}

function stateBuyStart(game) {

  goldUpdateText(game)

  buyPlayer = PLAYER_BLUE
  buyCreateBuyButtons(buyPlayer, game)
}

function stateBuyEnd(game) {

}

// First level button cretion

function buyCreateBuyButtons(player, game) {

  // done button and main basde button
  const bh = CONFIG_BLOCK - 10
  const dbh = CONFIG_WIDTH * 0.15
  const dby = CONFIG_HEIGHT - CONFIG_BLOCK*0.5
  if (player == PLAYER_BLUE) {
    buyButtons.push(buttonAddClickButton(CONFIG_WIDTH*0.25, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game))
  } else if (player == PLAYER_RED) {
    buyButtons.push(buttonAddClickButton(CONFIG_WIDTH*0.75, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game))
  } else {
    throw "Unkown player: " + player
  }

  // grid buttons
  for (const grid of configMap) {
    if (grid.player != player) continue
    const x = (grid.x + 0.5) * CONFIG_BLOCK
    const y = CONFIG_HEIGHT - (grid.y + 2.5)*CONFIG_BLOCK
    const w = CONFIG_BLOCK - 5
    buyButtons.push(buttonAddGridButton(x, y, w, w, (button) => buyPressGrid(grid, button, game), game))
  }
}

function buyDestroyButtons() {
  buttonDestroyList(buyButtons)
  buyButtons = []
}

// first level button presses

function buyPressTurnDone(game) {
  buyDestroyButtons(buyButtons)
  console.log("pressed done button!")
  if (buyPlayer == PLAYER_BLUE) {
    buyPlayer = PLAYER_RED
    buyCreateBuyButtons(buyPlayer, game)
  } else {
    gameState = GAME_STATE_COMBAT
    buyPlayer = undefined
  }
}

function buyPressGrid(grid, button, game) {
  console.log("pressed grid button!")
  buttonSetColorList(buyButtons, buttonDisabledColor)
  buttonSetColor(button, buttonSelectecColor)
  buyCreateSelectionButtons(grid, game)
  buyInSelection = true
}

// second level buttons

function buyCreateSelectionButtons(grid, game) {
  buySelectionButtons.push(
    buttonAddClickButton(400, 400, 200, 30, 'Cancel', undefined, (button) => buyPressCancel(), game)
  )
}

function buyDestroySelectionButtons() {
  buttonDestroyList(buySelectionButtons)
}

function buyPressCancel() {
  console.log("pressed cancel")
  buyDestroySelectionButtons()
  buyInSelection = false
  buttonSetColorList(buyButtons, buttonColor)
}
