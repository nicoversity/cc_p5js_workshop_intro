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

  // enable "fill"-flag and set color
  fill(255, 245, 0);

  // set figure outline via stroke
  stroke(236, 50, 135);
  //noStroke();

  // draw the object of class Ball
  myBall.draw();

  // draw application feedback
  drawApplicationFeedback();
}


function keyTyped() {

  // check if the typed key was 'x' (ASCII code 120),
  // and if so, reverse the ball's moving state

  // if (keyCode == 120) {  // check keycode
  if (key == 'x') {         // check key
    myBall.isMoving = !myBall.isMoving;
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


// ---
// Ball class
// ---
function Ball() {
  // this. notation for declaring class properties and functions

  // class properties
  this.x = 300;
  this.y = 200;
  this.diameter = 25;
  this.isMoving = false;
  this.movementStep = 4;

  // declaration of a movement function
  this.moveTo = function(xDestiny, yDestiny) {
    this.x = xDestiny;
    this.y = yDestiny;
  }

  // declaration of a function to draw the ballPosY
  this.draw = function() {
    // draw an ellipse
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
};
