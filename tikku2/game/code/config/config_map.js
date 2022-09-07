
"use strict";

var configMapBase = []
var map = []

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

configMapBase.push({ x: 6, y: 3})

configMapBase.push({ x: 0, y: 4})
configMapBase.push({ x: 1, y: 4})
configMapBase.push({ x: 2, y: 4})
configMapBase.push({ x: 3, y: 4})
configMapBase.push({ x: 4, y: 4})
configMapBase.push({ x: 5, y: 4})

configMapBase.push({ x: 8, y: 5})
configMapBase.push({ x: 9, y: 5})

configMapBase.push({ x: 0, y: 7})
configMapBase.push({ x: 1, y: 7})
configMapBase.push({ x: 2, y: 7})
configMapBase.push({ x: 3, y: 7})
configMapBase.push({ x: 4, y: 7})

function mapGetX(gridx) {
  return (gridx + 0.5) * CONFIG_BLOCK
}

function mapGetY(gridy) {
   return CONFIG_HEIGHT - (grid.y + 2.5)*CONFIG_BLOCK
}

function mapCreate(game) {

  for (const mt of configMapBase) {
    const x = mt.x
    const y = mt.y
    map.push( { x: x, y: y, player: PLAYER_BLUE } )
    map.push( { x: 34 - x, y: y, player: PLAYER_RED } )
  }

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

}
