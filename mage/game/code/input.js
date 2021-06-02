
var input_a;
var input_s;
var input_d;
var input_w;
var input_space;

function mageInitializeInput(game) {

  // Allow right clicks
  game.input.mouse.disableContextMenu();

  // Set fullscreen button
  game.input.keyboard.on('keydown-' + 'F10', function (event) { this.scale.startFullscreen(); }, game);

  // Set default cursor (why do I need to do it like this?)
  game.input.setDefaultCursor('url(imgs/aim.cur), pointer');

  input_a = game.input.keyboard.addKey('A');
  input_s = game.input.keyboard.addKey('S');
  input_d = game.input.keyboard.addKey('D');
  input_w = game.input.keyboard.addKey('W');
  input_space = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}
