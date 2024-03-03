// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './';

// Variables for image classification
let uploadedImage;

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classify again!
    classifyVideo();
}

// Function to handle file upload
function uploadFile() {
    let uploadInput = document.getElementById('uploadInput');
    let file = uploadInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = createImg(event.target.result, 'uploaded image');
            uploadedImage.hide();
            classifyImage(uploadedImage);
        };
        reader.readAsDataURL(file);
    }
}

// Function to classify the uploaded image
function classifyImage(img) {
    classifier.classify(img, uploadResult);
}

// Function to handle the classification result
function uploadResult(error, results) {
    let resultDiv = document.getElementById('resultDiv');
    if (error) {
        resultDiv.innerText = "Error: " + error;
    } else {
        // Display classification results
        resultDiv.innerHTML = "<p><strong>Classification Results:</strong></p>";
        for (let i = 0; i < results.length; i++) {
            resultDiv.innerHTML += "<p>" + results[i].label + ": " + nf(results[i].confidence * 100, 2) + "%</p>";
        }
    }
}
