// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './';

// Variables for image classification
let uploadedImage;

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    // Setup canvas if needed
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
    classifier.classify(img, gotResult);
}

// Function to handle the classification result
function gotResult(error, results) {
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
