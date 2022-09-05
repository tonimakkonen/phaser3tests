
"use strict";

var buyPlayer = undefined;
var buyDone = []

function stateBuyUpdate(game) {

  if (!buyPlayer) {
    buyInit(game)
    return
  }

  buttonLogic(buyDone)

}

function buyInit(game) {
  // TODO Take turns to start
  buyPlayer = PLAYER_BLUE
  buyCreateBuyButtons(buyPlayer, game)
}

function buyCreateBuyButtons(player, game) {

  const bh = CONFIG_BLOCK - 10
  const dbh = CONFIG_WIDTH * 0.15
  const dby = CONFIG_HEIGHT - CONFIG_BLOCK*0.5

  // Create turn done button
  var doneButton
  if (player == PLAYER_BLUE) {
    doneButton = buttonAddClickButton(CONFIG_WIDTH*0.25, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game)
  } else if (player == PLAYER_RED) {
    doneButton = buttonAddClickButton(CONFIG_WIDTH*0.75, dby, dbh, bh, 'Next turn', undefined, () => buyPressTurnDone(game), game)
  } else {
    throw "Unkown player: " + player
  }
  buyDone = [doneButton]
}

function buyDestroyButtons() {
  buttonDestroyList(buyDone)
  buyDone = []
}

function buyPressTurnDone(game) {
  // TODO: Is this safe..
  buyDestroyButtons()
  if (buyPlayer == PLAYER_BLUE) {
    buyPlayer = PLAYER_RED
    buyCreateBuyButtons(buyPlayer, game)
  } else {
    gameState = GAME_STATE_COMBAT
    buyPlayer = undefined
  }

}
