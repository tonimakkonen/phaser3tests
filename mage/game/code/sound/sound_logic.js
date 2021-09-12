
"use strict";

var soundRequests = new Set();

function soundRequest(game, key) {
  soundRequests.add(key);
}

function soundEnvRequest(game, key, x, y) {

}

function soundHandleLogic(game) {
  soundRequests.forEach(key => {
    // TODO: Volume
    game.sound.play(key);
  });
  soundRequests.clear();
}
