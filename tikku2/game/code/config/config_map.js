
"use strict";

var configMapBase = []
var configMap = []

// Add some basic
configMapBase.push({ x: 2, y: 0})
configMapBase.push({ x: 3, y: 0})
configMapBase.push({ x: 4, y: 0})
configMapBase.push({ x: 5, y: 0})
configMapBase.push({ x: 6, y: 0})
configMapBase.push({ x: 7, y: 0})
configMapBase.push({ x: 8, y: 0})
configMapBase.push({ x: 8, y: 0})
configMapBase.push({ x: 9, y: 0})
configMapBase.push({ x: 10, y: 0})

configMapBase.push({ x: 9, y: 2})
configMapBase.push({ x: 10, y: 2})

configMapBase.push({ x: 0, y: 4})
configMapBase.push({ x: 1, y: 4})
configMapBase.push({ x: 2, y: 4})
configMapBase.push({ x: 3, y: 4})
configMapBase.push({ x: 4, y: 4})

configMapBase.push({ x: 8, y: 5})
configMapBase.push({ x: 9, y: 5})

configMapBase.push({ x: 0, y: 7})
configMapBase.push({ x: 1, y: 7})
configMapBase.push({ x: 2, y: 7})
configMapBase.push({ x: 3, y: 7})

// Make actual mapCreate
for (const mt of configMapBase) {
  const x = mt.x
  const y = mt.y
  configMap.push( { x: x, y: y, player: PLAYER_BLUE } )
  configMap.push( { x: 34 - x, y: y, player: PLAYER_RED } )
}


// Create the walkable map
function mapCreate(game) {
  for (var i = 0; i < CONFIG_WIDTH/CONFIG_BLOCK; i++) {
      groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*1.5, 'tile')
  }

  for (var i = 0; i < 6; i++) {
    groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*5.5, 'tile')
    groupBlocks.create(CONFIG_WIDTH - i*CONFIG_BLOCK - CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*5.5, 'tile')
  }
  for (var i = 5; i < 7; i++) {
    groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*4.5, 'tile')
    groupBlocks.create(CONFIG_WIDTH - i*CONFIG_BLOCK - CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*4.5, 'tile')
  }

  for (var i = 9; i < 11; i++) {
    groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*3.5, 'tile')
    groupBlocks.create(CONFIG_WIDTH - i*CONFIG_BLOCK - CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*3.5, 'tile')
  }
  for (var i = 0; i < 5; i++) {
    groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*8.5, 'tile')
    groupBlocks.create(CONFIG_WIDTH - i*CONFIG_BLOCK - CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*8.5, 'tile')
  }
  for (var i = 8; i < 10; i++) {
    groupBlocks.create(i*CONFIG_BLOCK + CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*6.5, 'tile')
    groupBlocks.create(CONFIG_WIDTH - i*CONFIG_BLOCK - CONFIG_BLOCK/2, CONFIG_HEIGHT - CONFIG_BLOCK*6.5, 'tile')
  }

  //groupBlocks.create(4*40 + 20, 800-20-2*40, 'tile')
  //groupBlocks.create(16*40 + 20, 800-20-2*40, 'tile')
  //groupBlocks.create(20*40 + 20, 800-20-2*40, 'tile')
  //groupBlocks.create(30*40 + 20, 800-20-2*40, 'tile')
}
