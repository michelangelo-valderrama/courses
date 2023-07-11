"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");
const router = require("./network/routes");

db("mongodb+srv://Yoshi:yoshi@mydb.rk8laua.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());
app.use("/", express.static("public"));

router(app);

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});
