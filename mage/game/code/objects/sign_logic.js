
"use strict"

function signDestroyAll(game) {
  // TODO:
}

function signCreate(game, sign, px, py) {
  const cx = (px + 0.5) * 80.0;
  const cy = (py + 0.5) * 80.0;
  const im = game.add.image(cx, cy, 'special_sign');
  im.setDepth(-0.001);
}

function signRead(game, sign) {
  console.log('reading sign');
}

function signLogic(game) {

}
