const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
  console.log(process.env.PORT);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (_) => {
  console.log(`App deployed at Port ${PORT}`);
});
