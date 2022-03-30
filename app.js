const express = require("express");
const { Gstore, instances } = require("gstore-node");
const { Datastore } = require("@google-cloud/datastore");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const textToSpeech = require("./utils/text-to-speech");
const uploadImage = require("./utils/uploadImage");
const speechToText = require("./utils/speech-to-text");
const translate = require("./utils/translation");

//database:
const gstore = new Gstore();
const datastore = new Datastore({
  keyFilename: "./credentials/datastore-API-v2.json",
});
gstore.connect(datastore);
instances.set("unique-id", gstore);
const postController = require("./controllers/post.controller");

//app routing
const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.redirect("/index");
});

app.get("/index", (_, res) => {
  res.render("index");
});

app.post("/post", (req, res, _) => {
  const imgData = req.body.image.replace(/^data:image\/png;base64,/, "");
  var data = Buffer.from(imgData, "base64");

  const uniqueId = uuidv4();
  uploadImage("image-files-hw3", data, uniqueId)
    .then((_) => {
      const imgURL = `https://storage.googleapis.com/image-files-hw3/${uniqueId}.png`;
      res.redirect(307, `/final-post?imageURL=${imgURL}`);
    })
    .catch(console.error);
});

app.post("/final-post", postController.createPost);

app.get("/other-posts", postController.getPosts);

app.get("/audio-text", async (req, res) => {
  const content = req.query.content;

  textToSpeech(content)
    .then((audioContent) => {
      var data = audioContent.toString("base64");
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});

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
