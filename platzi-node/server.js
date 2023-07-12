"use strict";

const config = require("./config");

const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");

const bodyParser = require("body-parser");
const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

db(config.dbUri);

app.use(cors());
app.use(express.json());
app.use(config.publicRoute, express.static("public"));

socket.connect(server);
router(app);

server.listen(config.port, () => {
  console.log(`Server listening on ${config.host}:${config.port}`);
});
