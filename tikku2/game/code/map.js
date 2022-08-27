
"use strict"

function mapCreate(game) {
  // TODO: 
  for (var i = 0; i < 1200/40; i++) {
      groupBlocks.create(i*40 + 20, 800-20, 'tile')
  }

  groupBlocks.create(4*40 + 20, 800-20-2*40, 'tile')
  groupBlocks.create(16*40 + 20, 800-20-2*40, 'tile')
  groupBlocks.create(20*40 + 20, 800-20-2*40, 'tile')
  groupBlocks.create(30*40 + 20, 800-20-2*40, 'tile')
}
