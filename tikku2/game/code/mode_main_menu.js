
"use strict"

const mmButtonWidth = CONFIG_WIDTH / 6.0
const mmButtonHeight = 20.0
const mmSelectedButton = 0x8888ff
const mmButton = 0x44bbcc

var mmUi = []
var mmButtons = []
var mmDone = false

function modeMainMenuStart(game) {

  mmDone = false
  blueTeam = TEAM_HUMAN
  redTeam = TEAM_HUMAN
  redAi = AI_HUMAN
  blueAi = AI_HUMAN

  // Add buttons for team selection
  const blueRow = CONFIG_WIDTH * 0.25
  const redRow = CONFIG_WIDTH * 0.75
  const delta = mmButtonWidth * 0.5 + 15
  mmUi.push(game.add.text(blueRow, 70, 'Blue player settings').setOrigin(0.5, 0.5))
  mmUi.push(game.add.text(blueRow - delta, 100, 'Race').setOrigin(0.5, 0.5))
  mmUi.push(game.add.text(blueRow + delta, 100, 'Player/AI').setOrigin(0.5, 0.5))
  mmAddButton(blueRow - delta, 130, "Human", true, () => { blueTeam = TEAM_HUMAN }, game)
  mmAddButton(blueRow - delta, 160, "Bug", false,() => { blueTeam = TEAM_BUG }, game)
  mmAddButton(blueRow - delta, 190, "Alien", false, () => { blueTeam = TEAM_ALIEN }, game)
  mmAddButton(blueRow + delta, 130, "Player", true, () => { blueAi = AI_HUMAN }, game)
  mmAddButton(blueRow + delta, 160, "AI", false,() => { blueAi = AI_NORMAL }, game)
  mmAddButton(blueRow + delta, 190, "AI (difficult)", false, () => { blueAi = AI_DIFFICULT }, game)

  mmUi.push(game.add.text(redRow, 70, 'Red player settings').setOrigin(0.5, 0.5))
  mmUi.push(game.add.text(redRow - delta, 100, 'Race').setOrigin(0.5, 0.5))
  mmUi.push(game.add.text(redRow + delta, 100, 'Player/AI').setOrigin(0.5, 0.5))
  mmAddButton(redRow - delta, 130, "Human", true, () => { redTeam = TEAM_HUMAN }, game)
  mmAddButton(redRow - delta, 160, "Bug", false,() => { redTeam = TEAM_BUG }, game)
  mmAddButton(redRow - delta, 190, "Alien", false, () => { redTeam = TEAM_ALIEN }, game)
  mmAddButton(redRow + delta, 130, "Player", true, () => { redAi = AI_HUMAN }, game)
  mmAddButton(redRow + delta, 160, "AI", false,() => { redAi = AI_NORMAL }, game)
  mmAddButton(redRow + delta, 190, "AI (difficult)", false, () => { redAi = AI_DIFFICULT }, game)

  mmAddButton(CONFIG_WIDTH * 0.5, 250, "Start game", false, () => { mmDone = true }, game)

}

function mmAddButton(x, y, text, selected, func, game) {
  var rect = game.add.rectangle(x, y, mmButtonWidth, mmButtonHeight, selected ? mmSelectedButton : mmButton);
  var text = game.add.text(x, y, text, {'color': '#000000'})
  text.setOrigin(0.5, 0.5)
  var nb = {
    x: x,
    y: y,
    rect: rect,
    text: text,
    func: func
  }
  mmButtons.push(nb)
}

function modeMainMenuUpdate(game) {
  const mx = game.input.mousePointer.x
  const my = game.input.mousePointer.y
  if(game.input.mousePointer.isDown) {
    mmButtons.forEach((button, i) => {
      if(mx > button.x - mmButtonWidth/2 && mx < button.x + mmButtonWidth/2 && my > button.y - mmButtonHeight/2 && my < button.y + mmButtonHeight/2) {
        button.rect.fillColor = mmSelectedButton
        button.func()
      }
    });
  }

  if (mmDone) {
    // TODO: Move to game mode
  }


}

function mmEnd(game) {
  // TODO: Delete phaser3 objects no longer needed
}
