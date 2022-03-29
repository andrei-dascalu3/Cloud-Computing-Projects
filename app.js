const express = require("express");
const path = require("path");
const textToSpeech = require('./utils/text-to-speech');
const uploadImage = require("./utils/uploadImage");
const speechToText = require("./utils/speech-to-text");
const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
  console.log(process.env.PORT);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});


speechToText.speechToText();

// const text = "This function converts a text to an audioF file. Have fun!";
// textToSpeech.textToSpeech(text);



//SAMPLE CODE TO TEST THE UPLOAD OF AN IMAGE

// const bucketName = 'image-files-hw3';
// const testImagePath = path.join(__dirname, 'clown.png');
// uploadImage(bucketName, testImagePath).catch(console.error);
