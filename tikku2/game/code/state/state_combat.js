
"use strict"

const COMBAT_LEN = 10

var combatStart = undefined
var combatText = undefined

function stateCombatUpdate(game) {

  if (!combatStart) stateCombatStart(game)

  // Update text
  combatUpdateText(game)

  // If we are done with this combat turn
  if (game.time.now > combatStart + COMBAT_LEN * 1000.0) {
    gameState = GAME_STATE_BUY
    stateCombatEnd()
    return
  }

  // Run unit AI
  groupBlueUnits.children.each(function(unit) { unitAi(unit, game) }, game)
  groupRedUnits.children.each(function(unit) { unitAi(unit, game) }, game)
  // Shot logic
  groupBlueShots.children.each(function(shot) { shotAi(shot, game) }, game)
  groupRedShots.children.each(function(shot) { shotAi(shot, game) }, game)
}

function stateCombatStart(game) {
  combatStart = game.time.now
  combatText = game.add.text(CONFIG_WIDTH*0.5, CONFIG_HEIGHT - CONFIG_BLOCK*0.5, "Blaa", {'color': '#FFFFFF'})
  combatText.setOrigin(0.5, 0.5)
}

function stateCombatEnd() {
  combatStart = undefined
  if (combatText) combatText.destroy()

  // destroy all units and all shots
}

function combatUpdateText(game) {
  const secsElapsed= (game.time.now - combatStart) / 1000.0
  var secsRemaining = Math.floor(COMBAT_LEN - secsElapsed)
  if (secsRemaining < 0) secsRemaining = 0
  combatText.setText("Combat: " + secsRemaining)

}
