// Stacking (video2mobilenet)
// Gaëtan Robillard, 2024.
//***************************//
// A code that should work on mobile phone devices with front camera whith parameter "environment"
// What it does: 
// - loads deep learning model with ml5 API
// - takes the cam as input.
// - outputs classification as html text
// More to do:
// - switch "user" and "environment" camera
// - hide or show the capture

let classifier;
let canvas ;
let video;
let resultsP;
let capture;
let constraints;

function preload() {
  //Models available are: 'MobileNet', 'Darknet' and 'Darknet-tiny','DoodleNet'...
  classifier = ml5.imageClassifier('MobileNet'); //
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  
  // Switch camera
  constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "user" //user or environment
      }
    }
  }
  
  // camera input
  capture = createCapture(constraints);

  resultsP = createP('Loading model and video...');
  resultsP.style('font-size', '128px');
  resultsP.position(10, 500);

  checkbox = createCheckbox('switch user/environment camera', false);
  checkbox.position(10, 600);

  // checkboxH = createCheckbox('hide capture', false);
  // checkboxH.position(10, 110);
}

function draw() {
  // background(255); // Clear the background

  whichCam();
  // hide();

  // Display the capture, centered at the top
  let captureWidth = 240;
  let captureHeight = 320;
  let x = (width - captureWidth) / 2;
  let y = 0;

  image(capture, x, y, captureWidth, captureHeight); // Draw the capture at the specified location and size

  classifier.classify(capture, gotResult);
}

function hide() {


}

function whichCam(){
  checkbox.changed(switchCamera);
}

// Function to handle camera switch based on checkbox state
function switchCamera() {
  // Check if checkbox is checked, then switch to 'environment' or 'user'
  let newFacingMode = checkbox.checked() ? "environment" : "user";
  console.log("Switching camera to: ", newFacingMode);

  // Update constraints with the new facingMode
  constraints.video.facingMode.exact = newFacingMode;

  // Stop the previous capture and start a new one with updated constraints
  capture.remove(); // Remove the existing capture
  capture = createCapture(constraints); // Create new capture with updated constraints
  capture.hide();
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by confidence.
  // resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  resultsP.html(results[0].label);
}