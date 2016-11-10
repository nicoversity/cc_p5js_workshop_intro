/*
 * sketch.js
 *
 * Project: Creative coding using p5.js - Workshop: An introduction to creative coding using p5.js
 *
 * Supported p5.js version: 0.4.20
 *
 * Author: Nico Reski
 * Web: http://reski.nicoversity.com
 * Twitter: @nicoversity
 */

// declare object/instance
var myBall;

function setup() {
  createCanvas(1024, 768);  // setup our canvas to draw in
  frameRate(60);            // setup the frame rate in FPS (frames per second)

  // create (instantiate) object (instance) of Ball class
  myBall = new Ball();

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
  if(myBall.isMoving)
  {
    // calculate new x coordinate of the ball
    var newXPos = myBall.x + myBall.movementStep;

    // move ball to new position
    myBall.moveTo(newXPos, myBall.y);

    // let the ball bounce between the application window's borders
    // if ball's x position (considering its radius) is outside right border OR left border
    if ( (myBall.x > width - myBall.diameter/2) || (myBall.x < 0 + myBall.diameter/2) )
    {
      myBall.movementStep *= -1;
      print("!!! BOUNCE !!!")
    }
  }

  // draw the object of class Ball
  myBall.draw();

  // draw application feedback
  drawApplicationFeedback();
}


function keyTyped() {

  // check for typed key
  switch (key) {

    // reverse ball's moving state
    case 'x':
      myBall.isMoving = !myBall.isMoving;
      break;

    // increase ball's diameter
    case 'w':
      myBall.diameter += myBall.diameterStep;
      break;

    // decrease ball's diameter
    case 's':
      myBall.diameter -= myBall.diameterStep;
      break;

    // do nothing
    default:
      break;
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


function mousePressed() {

  // only toggle ball's following state if it is currently not moving
  if(!myBall.isMoving)
  {
    // calculate distance between mouse position and ball object
    var distance = dist(myBall.x, myBall.y, mouseX, mouseY);

    // if distance is less than the ball's radius (diameter/2): clicked inside the ball
    if(distance < myBall.diameter/2)
    {
      // toggle between mouse following state
      myBall.isFollowing = !myBall.isFollowing;

      // change ball's colors randomly
      myBall.color.randomize();
      myBall.strokeColor.randomize();
    }
  }

  // prevent default
  return false;
}


function mouseMoved() {

  // move ball object to the current mouse position
  if(myBall.isFollowing)
  {
    myBall.moveTo(mouseX, mouseY);
  }

  // prevent default
  return false;
}


// ---
// Ball class
// ---
function Ball() {
  // this. notation for declaring class properties and functions

  // using random(min, max) in order to randomize the initial ball's state

  // class properties
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 50);
  this.diameterStep = 5;
  this.isMoving = false;
  this.movementStep = 4;
  this.isFollowing = false;
  this.color = new Color();
  this.strokeColor = new Color();

  // movement function
  this.moveTo = function(xDestiny, yDestiny) {
    this.x = xDestiny;
    this.y = yDestiny;
  }

  // function to draw the ballPosY
  this.draw = function() {

    // start a new drawing state
    push();

    // enable "fill"-flag and set color
    fill(this.color.r, this.color.g, this.color.b);

    // set figure outline via stroke
    stroke(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b);
    //noStroke();

    // draw an ellipse
    ellipse(this.x, this.y, this.diameter, this.diameter);

    // restore original drawing state
    pop();
  }
};

// ---
// Simple RGB Color class
// ---
function Color() {

  // random color on instantition
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  // function to change the color according to a set of arguments
  this.setColor = function(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
  }

  // function to change the color randomly
  this.randomize = function() {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
};
