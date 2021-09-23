
"use strict";

var playerProgress = {
  skills: [],
  spellBooks: 0
}

var playerStats = playerStatsZero();

function playerStatsZero() {
  return {
    healthRegen: 0.0,
    manaRegen: 2.5,
    airDef: 0.0,
    waterDef: 0.0,
    fireDef: 0.0,
    earthDef: 0.0,
    spells: [],
  }
}

function playerUpdateStats() {
  playerStats = playerStatsZero();
  for (var i = 0; playerProgress.skills.length; i++) {
    const cs = playerProgress.skills[i];
    if (cs.spell) playerStats.spells.push(cs.spell);
  }
}

// Reset player stats when e.g. dying
function playerStatsReset() {

}

// Set random player stats (used for testing basically)
function playerStatsSetRandom() {
}

function playerStatsGetInitialSpell() {
  // TODO
  return null;
}
