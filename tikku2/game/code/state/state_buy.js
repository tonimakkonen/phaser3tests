
"use strict";

var buyPlayer = undefined
var buyFirstButtons = []
var buySelectionButtons = []
var buySelectionDisabledButtons = []
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
  if (grid.building) buyCreateBuildingButtons(grid.building, game)
  else buyCreateBuyButtons(grid, game)
  buyInSelection = true
}

// second level buttons

function buyCreateBuildingButtons(building, game) {
  const p = building.x_props
  const allowSell = !p.base
  // name + health, sell, empty cancel
  const cx = CONFIG_WIDTH / 2
  const r0 = 50
  const dy = 40
  const header = p.name + ' [ ' + Math.floor(building.x_health) + ' / ' + p.health + ' ]'

  buySelectionUi.push(game.add.text(cx, r0, header, { color: '#ffffff' }).setOrigin(0.5, 0.5))
  var row = 1
  if (allowSell) {
    buySelectionButtons.push(buttonAddClickButton(cx, r0 + dy*row, 200, 30, 'Sell for ' + p.cost/2, undefined, () => buyPressSell(building), game))
    row += 1
  }
  buySelectionButtons.push(buttonAddClickButton(cx, r0 + dy*(row + 1), 200, 30, 'Cancel', undefined, () => buyPressCancel(), game))
}

function buyCreateBuyButtons(grid, game) {
  var race
  if (grid.player == PLAYER_BLUE) {
    race = blueRace
  } else if (grid.player == PLAYER_RED) {
    race = redRace
  }
  else throw "Unkown player in grid: " + grid.player

  const rp = configRaces.get(race)
  if(!rp) throw "Could not find race: " + rp

  const cx = CONFIG_WIDTH / 2
  const r0 = 50
  const dy = 40

  const buyList = rp.build
  for (var i = 0; i < buyList.length; i++) {
    const unitType = buyList[i]
    buyHandleCreatingBuySelection(cx, r0 + dy*i, grid, unitType, game)
  }
  buySelectionButtons.push(buttonAddClickButton(cx, r0 + dy*(1 + buyList.length), 200, 30, 'Cancel', undefined, (button) => buyPressCancel(), game))
}

function buyHandleCreatingBuySelection(x, y, grid, unitType, game) {

  const bp = configUnits.get(unitType)
  if (!bp) throw "Could not find unit props for: " + unitType

  var gold
  var graphBase
  if (grid.player == PLAYER_BLUE) {
    gold = blueGold
    graphBase = 'blue_'
  } else {
    gold = redGold
    graphBase = 'red_'
  }

  if (gold >= bp.cost) {
    buySelectionButtons.push(
      buttonAddBuyButton(x, y, 700, 30, bp.cost, bp.help, graphBase + bp.graph, () => buyPressBuy(grid, unitType, game), game)
    )
  } else {
    const b = buttonAddBuyButton(x, y, 700, 30, bp.cost, bp.help, graphBase + bp.graph, () => {}, game)
    buttonSetColor(b, CONFIG_BUTTON_DISABLED_COLOR)
    buySelectionDisabledButtons.push(b)
  }
}

function buyPressSell(building, game) {
  const p = building.x_props
  if (building.x_player == PLAYER_BLUE) blueGold += p.cost / 2
  else redGold += p.cost / 2
  goldUpdateText()
  unitRelease(building)
  buyPressCancel()
}

function buyPressBuy(grid, unitType, game) {
  const bp = configUnits.get(unitType)
  if (!bp) throw "Could not find unit props for: " + unitType
  const player = grid.player
  const x = (grid.x + 0.5) * CONFIG_BLOCK
  const y = CONFIG_HEIGHT - (grid.y + 2.5)*CONFIG_BLOCK
  const newBuilding = unitCreate(unitType, x, y, player, grid, game)
  grid.building = newBuilding
  if (player == PLAYER_BLUE) blueGold -= bp.cost
  else redGold -= bp.cost
  goldUpdateText(game)
  buyPressCancel()
}

function buyPressCancel() {
  buttonDestroyList(buySelectionButtons)
  buySelectionButtons = []
  buttonDestroyList(buySelectionDisabledButtons)
  buySelectionDisabledButtons = []
  for (const po of buySelectionUi) po.destroy()
  buySelectionUi = []
  buttonSetColorList(buyFirstButtons, buttonColor)
  buyInSelection = false
}
