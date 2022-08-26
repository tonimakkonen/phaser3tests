
"use strict"

var buttons = [];


function modeMainMenuStart(game) {

  blueTeam = TEAM_HUMAN
  redTeam = TEAM_HUMAN
  redAi = AI_HUMAN
  blueAi = AI_HUMAN

  // set up
  game.add.text(200, 200, 'foo bar', 'color', 0xffffff)
}

function mmAddButton(x, y, text, selected, game) {
  var color = select ? '0xff0000' : '0xffffff'
  var text = game.add.text(x, y, text, 'color', color)
}

function modeMainMenuUpdate(game) {
  if(this.input.mousePointer.isDown) {

  }
  // this.input.mousePointer.x / y

}

function mmEnd(game) {

}
