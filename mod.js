const express = require("express");

const app = express();

app.use(express.static("dist"));

const port = process.env.PORT || 9000;

app.listen(port);