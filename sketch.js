// Gaëtan Robillard
// Reading, stacking (video2mobilenet), 2024.

// Only works on mobilephone devices with front camera ("environment")
// The code takes the cam as input and outputs the classification as html text

let classifier;
let video;
let resultsP;
let capture;

function setup() {
  createCanvas(displayWidth, displayHeight);
  var constraints = {
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
  classifier = ml5.imageClassifier('MobileNet', capture, modelReady);
}

function draw() {
  background(255); // Clear the background
  
  // Display the capture, centered at the top
  let captureWidth = 240;
  let captureHeight = 320;
  let x = (width - captureWidth) / 2;
  let y = 0;
  
  image(capture, x, y, captureWidth, captureHeight); // Draw the capture at the specified location and size

}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by confidence.
  // resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  resultsP.html(results[0].label);
  // classifyVideo();
}