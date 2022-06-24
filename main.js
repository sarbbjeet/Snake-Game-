"use strict";
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "static")));
httpServer.listen(port, () => {
  console.log(`http server is listening on port= ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
