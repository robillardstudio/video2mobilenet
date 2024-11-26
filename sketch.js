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
        exact: "environment" //user or environment
      }
    }
  }
  
  // camera input
  capture = createCapture(constraints);

  resultsP = createP('Loading model and video...');
  resultsP.style('font-size', '128px');
  resultsP.position(10, 500);
}

function draw() {
  // background(255); // Clear the background

  // hide();

  // Display the capture, centered at the top
  let captureWidth = 240;
  let captureHeight = 320;
  let x = (width - captureWidth) / 2;
  let y = 0;

  image(capture, x, y, captureWidth, captureHeight); // Draw the capture at the specified location and size

  classifier.classify(capture, gotResult);
}


// When we get a result
function gotResult(results) {
  // The results are in an array ordered by confidence.
  // resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  resultsP.html(results[0].label);
}
