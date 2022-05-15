const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

//logging middleware
app.use(morgan("dev"));

//parsing middleware
app.use(express.json());

app.use("/auth", require("./auth"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

module.exports = app;
