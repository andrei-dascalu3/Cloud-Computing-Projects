const express = require("express");
const { Gstore, instances } = require('gstore-node');
const {Datastore} = require('@google-cloud/datastore');
const path = require("path");

const textToSpeech = require('./utils/text-to-speech');
const uploadImage = require("./utils/uploadImage");

//database:
const gstore = new Gstore();
const datastore = new Datastore({keyFilename: './credentials/datastore-API.json'});
gstore.connect(datastore);
instances.set('unique-id', gstore);
const postController = require('./controllers/post.controller');

//app routing
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

app.get("/posts", postController.getPosts);

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
