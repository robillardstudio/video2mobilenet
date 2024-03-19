// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

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
        exact: "environment"
      }
    }
  }
  
  capture = createCapture(constraints);
  
  capture.hide();

  // hatch();
  // hatch();
  // circles(20*f);

  // Create a camera input
  // video = createCapture(VIDEO);
  // video.hide()
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  resultsP = createP('Loading model and video...');
  resultsP.style('font-size', '128px');
  classifier = ml5.imageClassifier('MobileNet', capture, modelReady);
}

function draw() {
  
     //image(capture, 0, 0);

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
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  // resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  resultsP.html(results[0].label);
  classifyVideo();
}

// random hatchings
function hatch(){
  var y_pos = random(height-80);
  for (var i = 0; i < 50; i++){
    var x_1 = randomGaussian(200,30);
    line(x_1, y_pos, x_1, y_pos+80);
  }
}

// random circles
function circles(d){
  var delta1;
  var delta2;
  var pos_x = random(width);
  var pos_y = random(height);
  for (var i = 0; i<20; i++){
    delta1 = random(50);
    delta2 = random(50);
    delta3  = random(10,30);
    ellipse(pos_x+delta1, pos_y+delta2, d+delta3, d+delta3);
  }
}
