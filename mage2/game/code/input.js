
"use strict";

var inputA;
var inputS;
var inputD;
var inputW;
var inputSpace;
var inputTab;
var inputPageUp;
var inputPageDown;

var inputLeftClickLast = false;
var inputLeftClick = false;
var inputRightClickLast = false;
var inputRightClick = false;
var inputTabClickLast = false;
var inputTabClick = false;

function inputInitialize(game) {

  // Allow right clicks
  game.input.mouse.disableContextMenu();

  // Set default cursor (why do I need to do it like this?)
  game.input.setDefaultCursor('url(imgs/mage_cursor.cur), pointer');

  inputA = game.input.keyboard.addKey('A');
  inputS = game.input.keyboard.addKey('S');
  inputD = game.input.keyboard.addKey('D');
  inputW = game.input.keyboard.addKey('W');
  inputSpace = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  inputTab = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
  inputPageUp = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP);
  inputPageDown = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);

}

function inputUpdate(game) {
  const curLeft = game.input.activePointer.leftButtonDown();
  if (curLeft && !inputLeftClickLast) {
    inputLeftClick = true;
  } else {
    inputLeftClick = false;
  }
  inputLeftClickLast = curLeft;

  const curRight = game.input.activePointer.rightButtonDown();
  if (curRight && !inputRightClickLast) {
    inputRightClick = true;
  } else {
    inputRightClick = false;
  }
  inputRightClickLast = curRight;

  const curTab = inputTab.isDown;
  if (curTab && !inputTabClickLast) {
    inputTabClick = true;
  } else {
    inputTabClick = false;
  }
  inputTabClickLast = curTab;
}
