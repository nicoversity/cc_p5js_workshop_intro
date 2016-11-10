/*
 * 01_beforeRefactoringBall.js
 *
 * Project: Creative coding using p5.js - Workshop: An introduction to creative coding using p5.js
 *
 * Supported p5.js version: 0.4.20
 *
 * Author: Nico Reski
 * Web: http://reski.nicoversity.com
 * Twitter: @nicoversity
 */

// ball related properties
var ballPosX;       // x coordinate of the ball's position
var ballPosY;       // y coordinate of the ball's position
var ballDiameter;   // diameter of the ball
var ballIsMoving;   // indicates the moving state of the ball
var movementStep;   // indicates how much the ball is moving in one update cycle

function setup() {
  createCanvas(1024, 768);  // setup our canvas to draw in
  frameRate(60);            // setup the frame rate in FPS (frames per second)

  // setup ball related properties
  ballPosX = 300;
  ballPosY = 200;
  ballDiameter = 25;
  ballIsMoving = false;
  movementStep = 4;

  // trigger notification in console
  print("p5 setup!");
}


function draw() {

  // clear canvas
  // Note: IMPORTANT to do that manually! openFrameworks does it automatically for you!
  clear();

  // setup background intensity (R,G,B arguments are also valid)
  background(230);

  // if ball is supposed to move: update it's position
  if(ballIsMoving)
  {
    // calculate new x coordinate of the ball
    ballPosX += movementStep;

    // let the ball bounce between the application window's borders
    // if ball's x position (considering its radius) is outside right border OR left border
    if ( (ballPosX > width - ballDiameter/2) || (ballPosX < 0 + ballDiameter/2) )
    {
      movementStep *= -1;
      print("!!! BOUNCE !!!")
    }
  }

  // enable "fill"-flag and set color
  fill(255, 245, 0);

  // set figure outline via stroke
  stroke(236, 50, 135);
  //noStroke();

  // draw an ellipse
  ellipse(ballPosX, ballPosY, ballDiameter, ballDiameter);

  // draw application feedback
  drawApplicationFeedback();
}


function keyTyped() {

  // check if the typed key was 'x' (ASCII code 120),
  // and if so, reverse the ball's moving state

  // if (keyCode == 120) {  // check keycode
  if (key == 'x') {         // check key
    ballIsMoving = !ballIsMoving;
  }
}


function drawApplicationFeedback() {

  // setup text color, stroke and size
  fill(236, 50, 135);
  noStroke();
  textSize(14);

  // display text about current framerate at position x,y
  // Note: frameRate() with no arguments returns the current frame rate (FPS)
  // Note: nf() is a utility function to format numbers ->
  // 3 digits to the left of the decimal point, 1 digit to the right of the decimal point
  text("FPS = " + nf(frameRate(),3,1), 10, 18);

  // display current coordinates of the mouse
  text("Mouse x|y: " + mouseX + " | " + mouseY, 110, 18);

  // display last pressed key and its ASCII key code
  text(key + " = " + keyCode, 280, 18);
}
