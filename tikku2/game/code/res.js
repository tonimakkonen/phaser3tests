
"use strict";

function resLoadResources(game) {

  // tile to be walked on
  game.load.image('tile', 'graph/tile.png');

  // load unit resources
  for (const [key, value] of configUnits) {
    console.log(key)
    game.load.image('blue_' + value.graph, 'graph/blue_' + value.graph + '.png')
    game.load.image('red_' + value.graph, 'graph/red_' + value.graph + '.png')
  }

}
