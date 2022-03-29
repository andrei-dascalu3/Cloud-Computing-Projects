const express = require("express");
const path = require("path");
const uploadImage = require("./uploadImage");
const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
  console.log(process.env.PORT);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});

//SAMPLE CODE TO TEST THE UPLOAD OF AN IMAGE

// const bucketName = 'image-files-hw3';
// const testImagePath = path.join(__dirname, 'ronaldo2.png');
// uploadImage(bucketName, testImagePath).catch(console.error);