
"use strict"

// TODO: Add waiting periods etc
// TODO: A shit ton of logic

function aiBuyUpdate(buyPlayer, game) {

  // run 4 actions each turn and buy random shit
  for (var i = 0; i < 4; i++) {
    const grid = aiBuySelectRandomGrid(buyPlayer)
    console.log(grid)
    if (grid == null) return true
    const list = aiBuyGetList(grid)
    const building = list[Math.floor(Math.random() * list.length)]
    console.log(building)

    const bp = configUnits.get(building)
    if (!bp) throw "could not find building props: " + building

    const gold = playerGetGold(buyPlayer)
    const cost = bp.cost
    if (gold >= cost) {
        playerAddGold(buyPlayer, -cost)
        const x = (grid.x + 0.5) * CONFIG_BLOCK
        const y = CONFIG_HEIGHT - (grid.y + 2.5)*CONFIG_BLOCK
        const newBuilding = unitCreate(building, x, y, buyPlayer, grid, game)
        grid.building = newBuilding
    }
  }

  return true
}

function aiBuySelectRandomGrid(player) {
  var options = []
  for (const grid of map) {
    if (grid.player == player && grid.building == undefined) options.push(grid)
  }
  if(options.length == 0) return null
  return options[Math.floor(Math.random() * options.length)]
}

function aiBuyGetList(grid) {
  const race = playerGetRace(grid.player)
  const rp = configRaces.get(race)
  return rp.build
}
