
// Handle player movement

function mageHandlePlayerMovement() {

  var ld = input_a.isDown;
  var rd = input_d.isDown;
  var jump = input_space.isDown;
  var tdown = player.body.touching.down;
  var tleft = player.body.touching.left;
  var tright = player.body.touching.right;


  var moveLeft = ld && !rd && !tleft;
  var moveRight = rd && !ld && !tright;

  var grav = 200;

  if (moveLeft) {
    player.setGravityX(-300);
    //player.setVelocityX(-300);
  } else if (moveRight) {
    player.setGravityX(300);
    //player.setVelocityX(300);
  } else {
    player.setGravityX(0);
    //player.setVelocityX(0);
  }

  if (jump && tdown) {
    player.setVelocityY(-500);
  }


}
