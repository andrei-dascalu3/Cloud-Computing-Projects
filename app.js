const express = require("express");
const { Gstore, instances } = require('gstore-node');
const {Datastore} = require('@google-cloud/datastore');
const path = require("path");

const textToSpeech = require('./utils/text-to-speech');
const uploadImage = require("./utils/uploadImage");
const speechToText = require("./utils/speech-to-text");

//database:
const gstore = new Gstore();
const datastore = new Datastore({keyFilename: './credentials/datastore-API.json'});
gstore.connect(datastore);
instances.set('unique-id', gstore);
const postController = require('./controllers/post.controller');

//app routing
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/index", (req, res, next) => {
  res.render("index");
  console.log(process.env.PORT);
});

app.get("/other-posts", (req, res, next) => {
  res.render("other-posts");
  console.log(process.env.PORT);
});

app.get("/posts", postController.getPosts);

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
