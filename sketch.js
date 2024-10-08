// Gaëtan Robillard
// Reading, stacking (video2mobilenet), 2024.

// Only works on mobilephone devices with front camera ("environment")
// The code takes the cam as input and outputs the classification as html text

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
  capture.hide();

  resultsP = createP('Loading model and video...');
  resultsP.style('font-size', '128px');

  checkbox = createCheckbox('switch rear/front camera', false);
  checkbox.position(10, 90);
  checkbox.changed(switchCamera);
}

function draw() {
  // background(255); // Clear the background
  
  // Display the capture, centered at the top
  let captureWidth = 240;
  let captureHeight = 320;
  let x = (width - captureWidth) / 2;
  let y = 0;
  
  image(capture, x, y, captureWidth, captureHeight); // Draw the capture at the specified location and size
  classifier.classify(capture, gotResult);
}

// Function to handle camera switch based on checkbox state
function switchCamera() {
  // Check if checkbox is checked, then switch to 'environment' or 'user'
  let newFacingMode = checkbox.checked() ? "environment" : "user";

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