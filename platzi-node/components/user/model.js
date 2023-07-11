const moongose = require("mongoose");

const Schema = moongose.Schema;

const mySchema = new Schema({
  name: String,
});

const model = moongose.model("User", mySchema);

module.exports = model;