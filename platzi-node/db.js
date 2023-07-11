"use strict";

const db = require("mongoose");

db.Promise = global.Promise;
async function connect(uri) {
  // "mongodb+srv://Yoshi:yoshi@mydb.rk8laua.mongodb.net/?retryWrites=true&w=majority";

  await db
    .connect(uri, {
      dbName: "mydb",
    })
    .then(() => {
      console.log("Mongodb is connected");
    })
    .catch((error) => {
      console.log(`[error in connection]: ${error}`);
    });
}

module.exports = connect;