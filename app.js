const express = require("express");
const { Gstore, instances } = require("gstore-node");
const { Datastore } = require("@google-cloud/datastore");
const bodyParser = require("body-parser");
const stream = require('stream');
const fs = require('fs');
const path = require("path");

const textToSpeech = require("./utils/text-to-speech");
const uploadImage = require("./utils/uploadImage");
const speechToText = require("./utils/speech-to-text");
const translate = require("./utils/translation");

//database:
const gstore = new Gstore();
const datastore = new Datastore({
  keyFilename: "./credentials/datastore-API.json",
});
gstore.connect(datastore);
instances.set("unique-id", gstore);
const postController = require("./controllers/post.controller");

//app routing
const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.redirect("/index");
});

app.get("/index", (req, res, next) => {
  res.render("index");
});

app.post("/post", (req, res, next) => {
  const imgData = req.body.image.replace(/^data:image\/png;base64,/, "");;
  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(imgData, 'base64'));
  uploadImage('image-files-hw3', bufferStream);
  res.end();
  //res.redirect("/final-post");
});

//app.post("/final-post", postController.createPost);

app.get("/other-posts", postController.getPosts);

app.get("/translated-text", (req, res) => {
  const content = req.query.content;
  translate(content)
    .then((translatedContent) => res.json(translatedContent))
    .catch((err) => res.status(400).json(err));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});

// const text = 'Salut intunecime, prietenul meu vechi... Vino aici intunecime, intunecime.';
// translate.translate(text);

//speechToText.speechToText();

// const text = "This function converts a text to an audioF file. Have fun!";
// textToSpeech.textToSpeech(text);

//SAMPLE CODE TO TEST THE UPLOAD OF AN IMAGE

// const bucketName = 'image-files-hw3';
// const testImagePath = path.join(__dirname, 'clown.png');
// uploadImage(bucketName, testImagePath).catch(console.error);
