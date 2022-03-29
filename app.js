const express = require("express");
const path = require("path");
const textToSpeech = require('./text-to-speech');
const uploadImage = require("./uploadImage");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get("/index", (req, res, next) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
  console.log(process.env.PORT);
});

app.get("/other-posts", (req, res, next) => {
  res.sendFile(path.join(__dirname) + "/views/other-posts.html");
  console.log(process.env.PORT);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});


// const text = "This function converts a text to an audioF file. Have fun!";
// textToSpeech.textToSpeech(text);



//SAMPLE CODE TO TEST THE UPLOAD OF AN IMAGE

// const bucketName = 'image-files-hw3';
// const testImagePath = path.join(__dirname, 'clown.png');
// uploadImage(bucketName, testImagePath).catch(console.error);
